import { Initializable } from "./Initializable.js";
import { get, set, del, createStore } from "../../libs/idb-keyval.js";

export class IdbBacked extends Initializable {
  #idbStore = createStore(this.constructor.name, `${this.constructor.name}Store`);
  #saveTimeout = null;
  #destroyed = false;
  #deleting = false;
  #saving = false;
  #serializedProperties = new Map();

  get idbStore() {
    return this.#idbStore
  }
  
  /**
   * initialize the callbacks for an Array.<IdbBacked> property
   * @param {IdbBacked} ExtendedIdbBackedClass 
   * @returns {SerializedCallbacks}
   */
  static Array(ExtendedIdbBackedClass) {
    return {
      /**
       * serialize the property
       * @param {IdbBacked} instance the instance of an IdbBacked class
       * @param {string} property the name of the property to be backed by idb
       * @returns {void}
       */
      serialize: (instance, property) => instance[property].map(prop => prop.id),
      /**
       * 
       * @param {IdbBacked} instance the instance of an IdbBacked class
       * @param {string} property the name of the property to be backed by idb
       * @param {any} propDetails the details of the property to be backed by idb
       * @returns 
       */
      deserialize: async (instance, property, propDetails) => await Promise.all(propDetails.map(
        /**
         * 
         * @param {string} propid the id of the property backed by idb
         * @returns {IdbBacked} an instance of an IdbBacked class
         */
        propid => new ExtendedIdbBackedClass(propid)).map(item => item.initialized)),
      destroy: (instance, property) => instance[property].forEach(prop => prop.dispatchEvent(new Event('destroy')))
    }
  }

  static Set(ExtendedIdbBackedClass) {
    return {
      serialize: (instance, property) => new Set(Array.from(instance[property]).map(prop => prop.id)),
      deserialize: async (instance, property, propDetails) => new Set(await Promise.all(Array.from(propDetails).map(propid => new ExtendedIdbBackedClass(propid)).map(item => item.initialized))),
      destroy: (instance, property) => instance[property].forEach(prop => prop.dispatchEvent(new Event('destroy')))
    }
  }

  constructor(id = crypto.randomUUID()) {
    super();
    this.id = id;
    get(id, this.#idbStore).then(details => {
      if(!details) throw new Error('no Room')
      return this.deserialize(details)
    }).then(() => {
      this.dispatchEvent(new Event('initialize'));
    }).catch(() => {
      return {};
    });
    this.#setupSerializedProperties();
    this.addEventListener('save', () => this.#save());
    this.addEventListener('destroy', () => this.#destroy());
  }

  //#region Private Accessors
  get #serializableKeys() {
    return Object.keys(this.constructor.serialized ?? {});
  }

  get #serializableProperties() {
    return this.constructor.serialized ?? {};
  }
  //#endregion

  //#region Public Accessors
  /**
   * @returns {Promise.<IdbBacked|undefined>} returns the instance if unable to delete, otherwise undefined
   */
  get deleted() {
    if(!this.#destroyed || !this.#deleting) return Promise.resolve(this);
    return new Promise(resolve => {
      this.addEventListener('deleted', () => resolve(undefined));
    })
  }

  /**
   * @returns {boolean}
   */
  get destroyed() {
    return this.#destroyed
  }

  /**
   * @returns {Promise.<IdbBacked>} returns the instance when the save is finished
   */
  get saved() {
    if(!this.#saving) return Promise.resolve(this);
    return new Promise(resolve => {
      this.addEventListener('saved', () => resolve(this));
    })
  }

  /**
   * @returns {Object} the class properties serialized
   */
  get serialized() {
    const properties = this.#serializableKeys;
    return {id: this.id, ...Object.fromEntries(properties.map(property => {
      if(this.#serializableProperties[property]?.serialize && this[property]) return [property, this.#serializableProperties[property].serialize(this, property)];
      return [property, this[property]];
    }))}
  }
  //#endregion

  //#region Private Methods
  #setupSerializedProperties() {
    const properties = this.#serializableKeys;
    for(const property of properties) {
      Object.defineProperty(this, property, {
        get() {
          return this.#serializedProperties.get(property);
        },
      
        set(value) {
          this.#serializedProperties.set(property, value);
          this.#save();
        }
      });
    }
  }

  #destroy() {
    this.#destroyed = true;
    this.#deleting = true;
    this.#serializableKeys.forEach(property => {
      if(this.#serializableProperties[property]?.destroy && this[property]) 
        this.#serializableProperties[property]?.destroy(this, property);
    });
    del(this.id, this.#idbStore).then(() => {
      this.dispatchEvent(new Event('deleted'));
      this.#deleting = false;
    });
  }

  #save() {
    this.#saving = true;
    clearTimeout(this.#saveTimeout);
    this.#saveTimeout = setTimeout(async () => {
      if(this.#destroyed) return;
      await set(this.id, this.serialized, this.#idbStore);
      this.#saving = false;
      this.dispatchEvent(new Event('saved'));
    }, 50)
  }
  //#endregion

  //#region Public Methods
  async deserialize(details) {
    if(!details) return;
    const properties = this.#serializableKeys;
    for(let property of properties) {
      if(this.#serializableProperties[property]?.deserialize && details[property]) {
        this[property] = await this.#serializableProperties[property].deserialize(this, property, details[property]);
      } else {
        this[property] = details[property];
      }
    }
  }
  //#endregion
}

/**
 * @typedef SerializedCallbacks
 * @property {Function} serialize the callback to run to effectively serialize the property
 * @property {Function} deserialize the callback to run to effectively deserialize the property
 * @property {Function} destroy the callback to run to effectively destroy the property
 */