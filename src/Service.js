const AtomicsWait = (__waitBuffer, typedArray, index, value, timeout) => {
  if (timeout <= 0) return "timed-out";
  if (Atomics.load(typedArray, index) != value) return "not-equal";
  Atomics.store(__waitBuffer, 0, index);
  let end = timeout < Infinity ? performance.now() + timeout : Infinity;
  while (__waitBuffer[0] == index) {
    if (performance.now() > end) {
      return Atomics.compareExchange(__waitBuffer, 0, index, -1) != index
        ? "ok"
        : "timed-out";
    }
  }
  return "ok";
};

function decodeFromSharedBuffer(sharedBuffer, maxLength) {
  const decoder = new TextDecoder();
  const copyLength = Math.min(sharedBuffer.byteLength, maxLength);

  // Create a temporary ArrayBuffer and copy the contents of the shared buffer
  // into it.
  const tempBuffer = new ArrayBuffer(copyLength);
  const tempView = new Uint8Array(tempBuffer);

  let sharedView = new Uint8Array(sharedBuffer);
  if (sharedBuffer.byteLength != copyLength) {
    sharedView = sharedView.subarray(0, copyLength);
  }
  tempView.set(sharedView);

  return decoder.decode(tempBuffer);
}

export class Service extends EventTarget {
  constructor(serviceName, client = false) {
    super();
    this._channel = new BroadcastChannel(`service-${serviceName}`);
    console.log(window.crossOriginIsolated);
    if (client)
      return new Proxy(this, {
        get: (target, prop) => {
          const sendHostRequest = (property, payload) => {
            const waitBuffer = new Int32Array(new SharedArrayBuffer(4));
            const sharedBuffer = new Int32Array(new SharedArrayBuffer(1024));
            const message = {
              type: property,
              payload,
              waitBuffer,
              sharedBuffer,
            };
            console.log("posting", message);
            this._channel.postMessage(message);
            console.log("posted", performance.now());
            console.log(AtomicsWait(waitBuffer, sharedBuffer, 0, 0, 1000));
            console.log("waited", performance.now());
            const results = decodeFromSharedBuffer(
              sharedBuffer,
              sharedBuffer.byteLength
            );
            console.log(results);
            return results;
          };
          if (typeof this[prop] === "function") {
            return (...args) => {
              return sendHostRequest(prop, args);
            };
          }
          return sendHostRequest(prop);
        },
      });
    if (!client) {
      this.secretProp = crypto.randomUUID();
      this._channel.onmessage = (messageEvent) => {
        console.log(client, messageEvent.data);
        const { type, incomingPayload, waitBuffer, sharedBuffer } =
          messageEvent.data;
        document.querySelector(
          "#request-recieved"
        ).innerText = `request-recieved ${type} ${JSON.stringify(
          incomingPayload
        )}`;
        if (typeof this[type] === "function")
          sharedBuffer = new TextEncoder("utf-8").encode(
            JSON.stringify(this[type](...incomingPayload))
          );
        sharedBuffer = new TextEncoder("utf-8").encode(
          JSON.stringify(this[type])
        );
        Atomics.store(waitBuffer, 0, sharedBuffer.byteLength);
        Atomics.notify(waitBuffer, 1);
      };
    }
  }

  getProp(prop) {
    return this[prop];
  }

  fireEvent(eventName) {
    this.dispatchEvent(new Event(eventName));
  }
}
