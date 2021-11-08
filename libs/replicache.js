var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/mod.ts
__export(exports, {
  Replicache: () => Replicache,
  TransactionClosedError: () => TransactionClosedError
});

// node_modules/lodash-es/_freeGlobal.js
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal_default = freeGlobal;

// node_modules/lodash-es/_root.js
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal_default || freeSelf || Function("return this")();
var root_default = root;

// node_modules/lodash-es/_Symbol.js
var Symbol2 = root_default.Symbol;
var Symbol_default = Symbol2;

// node_modules/lodash-es/_getRawTag.js
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
var nativeObjectToString = objectProto.toString;
var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var getRawTag_default = getRawTag;

// node_modules/lodash-es/_objectToString.js
var objectProto2 = Object.prototype;
var nativeObjectToString2 = objectProto2.toString;
function objectToString(value) {
  return nativeObjectToString2.call(value);
}
var objectToString_default = objectToString;

// node_modules/lodash-es/_baseGetTag.js
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
}
var baseGetTag_default = baseGetTag;

// node_modules/lodash-es/isObjectLike.js
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_default = isObjectLike;

// node_modules/lodash-es/isArray.js
var isArray = Array.isArray;
var isArray_default = isArray;

// node_modules/lodash-es/isObject.js
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_default = isObject;

// node_modules/lodash-es/isFunction.js
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_default(value)) {
    return false;
  }
  var tag = baseGetTag_default(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_default = isFunction;

// node_modules/lodash-es/_coreJsData.js
var coreJsData = root_default["__core-js_shared__"];
var coreJsData_default = coreJsData;

// node_modules/lodash-es/_isMasked.js
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var isMasked_default = isMasked;

// node_modules/lodash-es/_toSource.js
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var toSource_default = toSource;

// node_modules/lodash-es/_baseIsNative.js
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto2 = Function.prototype;
var objectProto3 = Object.prototype;
var funcToString2 = funcProto2.toString;
var hasOwnProperty2 = objectProto3.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject_default(value) || isMasked_default(value)) {
    return false;
  }
  var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource_default(value));
}
var baseIsNative_default = baseIsNative;

// node_modules/lodash-es/_getValue.js
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
var getValue_default = getValue;

// node_modules/lodash-es/_getNative.js
function getNative(object, key) {
  var value = getValue_default(object, key);
  return baseIsNative_default(value) ? value : void 0;
}
var getNative_default = getNative;

// node_modules/lodash-es/_WeakMap.js
var WeakMap = getNative_default(root_default, "WeakMap");
var WeakMap_default = WeakMap;

// node_modules/lodash-es/_baseCreate.js
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject_default(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var baseCreate_default = baseCreate;

// node_modules/lodash-es/_copyArray.js
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var copyArray_default = copyArray;

// node_modules/lodash-es/_defineProperty.js
var defineProperty = function() {
  try {
    var func = getNative_default(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var defineProperty_default = defineProperty;

// node_modules/lodash-es/_arrayEach.js
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var arrayEach_default = arrayEach;

// node_modules/lodash-es/_isIndex.js
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var isIndex_default = isIndex;

// node_modules/lodash-es/_baseAssignValue.js
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty_default) {
    defineProperty_default(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var baseAssignValue_default = baseAssignValue;

// node_modules/lodash-es/eq.js
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_default = eq;

// node_modules/lodash-es/_assignValue.js
var objectProto4 = Object.prototype;
var hasOwnProperty3 = objectProto4.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue_default(object, key, value);
  }
}
var assignValue_default = assignValue;

// node_modules/lodash-es/_copyObject.js
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue_default(object, key, newValue);
    } else {
      assignValue_default(object, key, newValue);
    }
  }
  return object;
}
var copyObject_default = copyObject;

// node_modules/lodash-es/isLength.js
var MAX_SAFE_INTEGER2 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
}
var isLength_default = isLength;

// node_modules/lodash-es/isArrayLike.js
function isArrayLike(value) {
  return value != null && isLength_default(value.length) && !isFunction_default(value);
}
var isArrayLike_default = isArrayLike;

// node_modules/lodash-es/_isPrototype.js
var objectProto5 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
  return value === proto;
}
var isPrototype_default = isPrototype;

// node_modules/lodash-es/_baseTimes.js
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var baseTimes_default = baseTimes;

// node_modules/lodash-es/_baseIsArguments.js
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
}
var baseIsArguments_default = baseIsArguments;

// node_modules/lodash-es/isArguments.js
var objectProto6 = Object.prototype;
var hasOwnProperty4 = objectProto6.hasOwnProperty;
var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
var isArguments = baseIsArguments_default(function() {
  return arguments;
}()) ? baseIsArguments_default : function(value) {
  return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_default = isArguments;

// node_modules/lodash-es/stubFalse.js
function stubFalse() {
  return false;
}
var stubFalse_default = stubFalse;

// node_modules/lodash-es/isBuffer.js
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root_default.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse_default;
var isBuffer_default = isBuffer;

// node_modules/lodash-es/_baseIsTypedArray.js
var argsTag2 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag2 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
}
var baseIsTypedArray_default = baseIsTypedArray;

// node_modules/lodash-es/_baseUnary.js
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var baseUnary_default = baseUnary;

// node_modules/lodash-es/_nodeUtil.js
var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
var freeProcess = moduleExports2 && freeGlobal_default.process;
var nodeUtil = function() {
  try {
    var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeUtil_default = nodeUtil;

// node_modules/lodash-es/isTypedArray.js
var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
var isTypedArray_default = isTypedArray;

// node_modules/lodash-es/_arrayLikeKeys.js
var objectProto7 = Object.prototype;
var hasOwnProperty5 = objectProto7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex_default(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var arrayLikeKeys_default = arrayLikeKeys;

// node_modules/lodash-es/_overArg.js
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var overArg_default = overArg;

// node_modules/lodash-es/_nativeKeys.js
var nativeKeys = overArg_default(Object.keys, Object);
var nativeKeys_default = nativeKeys;

// node_modules/lodash-es/_baseKeys.js
var objectProto8 = Object.prototype;
var hasOwnProperty6 = objectProto8.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype_default(object)) {
    return nativeKeys_default(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty6.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var baseKeys_default = baseKeys;

// node_modules/lodash-es/keys.js
function keys(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
}
var keys_default = keys;

// node_modules/lodash-es/_nativeKeysIn.js
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var nativeKeysIn_default = nativeKeysIn;

// node_modules/lodash-es/_baseKeysIn.js
var objectProto9 = Object.prototype;
var hasOwnProperty7 = objectProto9.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject_default(object)) {
    return nativeKeysIn_default(object);
  }
  var isProto = isPrototype_default(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty7.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var baseKeysIn_default = baseKeysIn;

// node_modules/lodash-es/keysIn.js
function keysIn(object) {
  return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
}
var keysIn_default = keysIn;

// node_modules/lodash-es/_nativeCreate.js
var nativeCreate = getNative_default(Object, "create");
var nativeCreate_default = nativeCreate;

// node_modules/lodash-es/_hashClear.js
function hashClear() {
  this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
  this.size = 0;
}
var hashClear_default = hashClear;

// node_modules/lodash-es/_hashDelete.js
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var hashDelete_default = hashDelete;

// node_modules/lodash-es/_hashGet.js
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto10 = Object.prototype;
var hasOwnProperty8 = objectProto10.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate_default) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty8.call(data, key) ? data[key] : void 0;
}
var hashGet_default = hashGet;

// node_modules/lodash-es/_hashHas.js
var objectProto11 = Object.prototype;
var hasOwnProperty9 = objectProto11.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
}
var hashHas_default = hashHas;

// node_modules/lodash-es/_hashSet.js
var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
  return this;
}
var hashSet_default = hashSet;

// node_modules/lodash-es/_Hash.js
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear_default;
Hash.prototype["delete"] = hashDelete_default;
Hash.prototype.get = hashGet_default;
Hash.prototype.has = hashHas_default;
Hash.prototype.set = hashSet_default;
var Hash_default = Hash;

// node_modules/lodash-es/_listCacheClear.js
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var listCacheClear_default = listCacheClear;

// node_modules/lodash-es/_assocIndexOf.js
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_default(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var assocIndexOf_default = assocIndexOf;

// node_modules/lodash-es/_listCacheDelete.js
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var listCacheDelete_default = listCacheDelete;

// node_modules/lodash-es/_listCacheGet.js
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var listCacheGet_default = listCacheGet;

// node_modules/lodash-es/_listCacheHas.js
function listCacheHas(key) {
  return assocIndexOf_default(this.__data__, key) > -1;
}
var listCacheHas_default = listCacheHas;

// node_modules/lodash-es/_listCacheSet.js
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf_default(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var listCacheSet_default = listCacheSet;

// node_modules/lodash-es/_ListCache.js
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear_default;
ListCache.prototype["delete"] = listCacheDelete_default;
ListCache.prototype.get = listCacheGet_default;
ListCache.prototype.has = listCacheHas_default;
ListCache.prototype.set = listCacheSet_default;
var ListCache_default = ListCache;

// node_modules/lodash-es/_Map.js
var Map2 = getNative_default(root_default, "Map");
var Map_default = Map2;

// node_modules/lodash-es/_mapCacheClear.js
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash_default(),
    "map": new (Map_default || ListCache_default)(),
    "string": new Hash_default()
  };
}
var mapCacheClear_default = mapCacheClear;

// node_modules/lodash-es/_isKeyable.js
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var isKeyable_default = isKeyable;

// node_modules/lodash-es/_getMapData.js
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var getMapData_default = getMapData;

// node_modules/lodash-es/_mapCacheDelete.js
function mapCacheDelete(key) {
  var result = getMapData_default(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var mapCacheDelete_default = mapCacheDelete;

// node_modules/lodash-es/_mapCacheGet.js
function mapCacheGet(key) {
  return getMapData_default(this, key).get(key);
}
var mapCacheGet_default = mapCacheGet;

// node_modules/lodash-es/_mapCacheHas.js
function mapCacheHas(key) {
  return getMapData_default(this, key).has(key);
}
var mapCacheHas_default = mapCacheHas;

// node_modules/lodash-es/_mapCacheSet.js
function mapCacheSet(key, value) {
  var data = getMapData_default(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var mapCacheSet_default = mapCacheSet;

// node_modules/lodash-es/_MapCache.js
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear_default;
MapCache.prototype["delete"] = mapCacheDelete_default;
MapCache.prototype.get = mapCacheGet_default;
MapCache.prototype.has = mapCacheHas_default;
MapCache.prototype.set = mapCacheSet_default;
var MapCache_default = MapCache;

// node_modules/lodash-es/_arrayPush.js
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var arrayPush_default = arrayPush;

// node_modules/lodash-es/_getPrototype.js
var getPrototype = overArg_default(Object.getPrototypeOf, Object);
var getPrototype_default = getPrototype;

// node_modules/lodash-es/_stackClear.js
function stackClear() {
  this.__data__ = new ListCache_default();
  this.size = 0;
}
var stackClear_default = stackClear;

// node_modules/lodash-es/_stackDelete.js
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var stackDelete_default = stackDelete;

// node_modules/lodash-es/_stackGet.js
function stackGet(key) {
  return this.__data__.get(key);
}
var stackGet_default = stackGet;

// node_modules/lodash-es/_stackHas.js
function stackHas(key) {
  return this.__data__.has(key);
}
var stackHas_default = stackHas;

// node_modules/lodash-es/_stackSet.js
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache_default) {
    var pairs = data.__data__;
    if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache_default(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var stackSet_default = stackSet;

// node_modules/lodash-es/_Stack.js
function Stack(entries) {
  var data = this.__data__ = new ListCache_default(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear_default;
Stack.prototype["delete"] = stackDelete_default;
Stack.prototype.get = stackGet_default;
Stack.prototype.has = stackHas_default;
Stack.prototype.set = stackSet_default;
var Stack_default = Stack;

// node_modules/lodash-es/_baseAssign.js
function baseAssign(object, source) {
  return object && copyObject_default(source, keys_default(source), object);
}
var baseAssign_default = baseAssign;

// node_modules/lodash-es/_baseAssignIn.js
function baseAssignIn(object, source) {
  return object && copyObject_default(source, keysIn_default(source), object);
}
var baseAssignIn_default = baseAssignIn;

// node_modules/lodash-es/_cloneBuffer.js
var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var cloneBuffer_default = cloneBuffer;

// node_modules/lodash-es/_arrayFilter.js
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var arrayFilter_default = arrayFilter;

// node_modules/lodash-es/stubArray.js
function stubArray() {
  return [];
}
var stubArray_default = stubArray;

// node_modules/lodash-es/_getSymbols.js
var objectProto12 = Object.prototype;
var propertyIsEnumerable2 = objectProto12.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable2.call(object, symbol);
  });
};
var getSymbols_default = getSymbols;

// node_modules/lodash-es/_copySymbols.js
function copySymbols(source, object) {
  return copyObject_default(source, getSymbols_default(source), object);
}
var copySymbols_default = copySymbols;

// node_modules/lodash-es/_getSymbolsIn.js
var nativeGetSymbols2 = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
  var result = [];
  while (object) {
    arrayPush_default(result, getSymbols_default(object));
    object = getPrototype_default(object);
  }
  return result;
};
var getSymbolsIn_default = getSymbolsIn;

// node_modules/lodash-es/_copySymbolsIn.js
function copySymbolsIn(source, object) {
  return copyObject_default(source, getSymbolsIn_default(source), object);
}
var copySymbolsIn_default = copySymbolsIn;

// node_modules/lodash-es/_baseGetAllKeys.js
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
}
var baseGetAllKeys_default = baseGetAllKeys;

// node_modules/lodash-es/_getAllKeys.js
function getAllKeys(object) {
  return baseGetAllKeys_default(object, keys_default, getSymbols_default);
}
var getAllKeys_default = getAllKeys;

// node_modules/lodash-es/_getAllKeysIn.js
function getAllKeysIn(object) {
  return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
}
var getAllKeysIn_default = getAllKeysIn;

// node_modules/lodash-es/_DataView.js
var DataView2 = getNative_default(root_default, "DataView");
var DataView_default = DataView2;

// node_modules/lodash-es/_Promise.js
var Promise2 = getNative_default(root_default, "Promise");
var Promise_default = Promise2;

// node_modules/lodash-es/_Set.js
var Set2 = getNative_default(root_default, "Set");
var Set_default = Set2;

// node_modules/lodash-es/_getTag.js
var mapTag2 = "[object Map]";
var objectTag2 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag2 = "[object Set]";
var weakMapTag2 = "[object WeakMap]";
var dataViewTag2 = "[object DataView]";
var dataViewCtorString = toSource_default(DataView_default);
var mapCtorString = toSource_default(Map_default);
var promiseCtorString = toSource_default(Promise_default);
var setCtorString = toSource_default(Set_default);
var weakMapCtorString = toSource_default(WeakMap_default);
var getTag = baseGetTag_default;
if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
  getTag = function(value) {
    var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag2;
        case mapCtorString:
          return mapTag2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag2;
        case weakMapCtorString:
          return weakMapTag2;
      }
    }
    return result;
  };
}
var getTag_default = getTag;

// node_modules/lodash-es/_initCloneArray.js
var objectProto13 = Object.prototype;
var hasOwnProperty10 = objectProto13.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty10.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var initCloneArray_default = initCloneArray;

// node_modules/lodash-es/_Uint8Array.js
var Uint8Array2 = root_default.Uint8Array;
var Uint8Array_default = Uint8Array2;

// node_modules/lodash-es/_cloneArrayBuffer.js
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
  return result;
}
var cloneArrayBuffer_default = cloneArrayBuffer;

// node_modules/lodash-es/_cloneDataView.js
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var cloneDataView_default = cloneDataView;

// node_modules/lodash-es/_cloneRegExp.js
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var cloneRegExp_default = cloneRegExp;

// node_modules/lodash-es/_cloneSymbol.js
var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var cloneSymbol_default = cloneSymbol;

// node_modules/lodash-es/_cloneTypedArray.js
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var cloneTypedArray_default = cloneTypedArray;

// node_modules/lodash-es/_initCloneByTag.js
var boolTag2 = "[object Boolean]";
var dateTag2 = "[object Date]";
var mapTag3 = "[object Map]";
var numberTag2 = "[object Number]";
var regexpTag2 = "[object RegExp]";
var setTag3 = "[object Set]";
var stringTag2 = "[object String]";
var symbolTag = "[object Symbol]";
var arrayBufferTag2 = "[object ArrayBuffer]";
var dataViewTag3 = "[object DataView]";
var float32Tag2 = "[object Float32Array]";
var float64Tag2 = "[object Float64Array]";
var int8Tag2 = "[object Int8Array]";
var int16Tag2 = "[object Int16Array]";
var int32Tag2 = "[object Int32Array]";
var uint8Tag2 = "[object Uint8Array]";
var uint8ClampedTag2 = "[object Uint8ClampedArray]";
var uint16Tag2 = "[object Uint16Array]";
var uint32Tag2 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag2:
      return cloneArrayBuffer_default(object);
    case boolTag2:
    case dateTag2:
      return new Ctor(+object);
    case dataViewTag3:
      return cloneDataView_default(object, isDeep);
    case float32Tag2:
    case float64Tag2:
    case int8Tag2:
    case int16Tag2:
    case int32Tag2:
    case uint8Tag2:
    case uint8ClampedTag2:
    case uint16Tag2:
    case uint32Tag2:
      return cloneTypedArray_default(object, isDeep);
    case mapTag3:
      return new Ctor();
    case numberTag2:
    case stringTag2:
      return new Ctor(object);
    case regexpTag2:
      return cloneRegExp_default(object);
    case setTag3:
      return new Ctor();
    case symbolTag:
      return cloneSymbol_default(object);
  }
}
var initCloneByTag_default = initCloneByTag;

// node_modules/lodash-es/_initCloneObject.js
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
}
var initCloneObject_default = initCloneObject;

// node_modules/lodash-es/_baseIsMap.js
var mapTag4 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike_default(value) && getTag_default(value) == mapTag4;
}
var baseIsMap_default = baseIsMap;

// node_modules/lodash-es/isMap.js
var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
var isMap_default = isMap;

// node_modules/lodash-es/_baseIsSet.js
var setTag4 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike_default(value) && getTag_default(value) == setTag4;
}
var baseIsSet_default = baseIsSet;

// node_modules/lodash-es/isSet.js
var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
var isSet_default = isSet;

// node_modules/lodash-es/_baseClone.js
var CLONE_DEEP_FLAG = 1;
var CLONE_FLAT_FLAG = 2;
var CLONE_SYMBOLS_FLAG = 4;
var argsTag3 = "[object Arguments]";
var arrayTag2 = "[object Array]";
var boolTag3 = "[object Boolean]";
var dateTag3 = "[object Date]";
var errorTag2 = "[object Error]";
var funcTag3 = "[object Function]";
var genTag2 = "[object GeneratorFunction]";
var mapTag5 = "[object Map]";
var numberTag3 = "[object Number]";
var objectTag3 = "[object Object]";
var regexpTag3 = "[object RegExp]";
var setTag5 = "[object Set]";
var stringTag3 = "[object String]";
var symbolTag2 = "[object Symbol]";
var weakMapTag3 = "[object WeakMap]";
var arrayBufferTag3 = "[object ArrayBuffer]";
var dataViewTag4 = "[object DataView]";
var float32Tag3 = "[object Float32Array]";
var float64Tag3 = "[object Float64Array]";
var int8Tag3 = "[object Int8Array]";
var int16Tag3 = "[object Int16Array]";
var int32Tag3 = "[object Int32Array]";
var uint8Tag3 = "[object Uint8Array]";
var uint8ClampedTag3 = "[object Uint8ClampedArray]";
var uint16Tag3 = "[object Uint16Array]";
var uint32Tag3 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag3] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject_default(value)) {
    return value;
  }
  var isArr = isArray_default(value);
  if (isArr) {
    result = initCloneArray_default(value);
    if (!isDeep) {
      return copyArray_default(value, result);
    }
  } else {
    var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
    if (isBuffer_default(value)) {
      return cloneBuffer_default(value, isDeep);
    }
    if (tag == objectTag3 || tag == argsTag3 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject_default(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag_default(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack_default());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet_default(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_default(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach_default(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var baseClone_default = baseClone;

// node_modules/lodash-es/cloneDeep.js
var CLONE_DEEP_FLAG2 = 1;
var CLONE_SYMBOLS_FLAG2 = 4;
function cloneDeep(value) {
  return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
}
var cloneDeep_default = cloneDeep;

// src/asserts.ts
function assertString(v) {
  assertType(v, "string");
}
function assertNumber(v) {
  assertType(v, "number");
}
function assertType(v, t) {
  if (typeof v !== t) {
    throwInvalidType(v, t);
  }
}
function assertObject(v) {
  if (v === null) {
    throwInvalidType(v, "object");
  }
  assertType(v, "object");
}
function assertArray(v) {
  if (!Array.isArray(v)) {
    throwInvalidType(v, "array");
  }
}
function invalidType(v, t) {
  let s = "Invalid type: ";
  if (v === null || v === void 0) {
    s += v;
  } else {
    s += `${typeof v} \`${v}\``;
  }
  return s + `, expected ${t}`;
}
function throwInvalidType(v, t) {
  throw new Error(invalidType(v, t));
}
function assertNotNull(v) {
  if (v === null) {
    throw new Error("Expected non-null value");
  }
}
function assertInstanceof(v, t) {
  if (!(v instanceof t)) {
    throw new Error(`Expected instanceof ${t.name}`);
  }
}
function assertUint8Array(v) {
  assertInstanceof(v, Uint8Array);
}

// src/json.ts
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
      return false;
  }
  a = a;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (Array.isArray(b)) {
    return false;
  }
  a = a;
  b = b;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  for (const key of aKeys) {
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }
  return true;
}
function deepClone(value) {
  return cloneDeep_default(value);
}
function assertJSONValue(v) {
  switch (typeof v) {
    case "boolean":
    case "number":
    case "string":
      return;
    case "object":
      if (v === null) {
        return;
      }
      if (Array.isArray(v)) {
        return assertJSONArray(v);
      }
      return assertJSONObject(v);
  }
  throwInvalidType(v, "JSON value");
}
function assertJSONObject(v) {
  for (const val of Object.values(v)) {
    if (val !== void 0) {
      assertJSONValue(val);
    }
  }
}
function assertJSONArray(v) {
  for (let i = 0; i < v.length; i++) {
    const val = v[i];
    if (val !== void 0) {
      assertJSONValue(val);
    }
  }
}

// src/http-request.ts
async function httpRequest(request) {
  const response = await fetch(request);
  const httpStatusCode = response.status;
  const errorMessage = httpStatusCode === 200 ? "" : await response.text();
  return {
    response,
    httpRequestInfo: {
      httpStatusCode,
      errorMessage
    }
  };
}

// src/pusher.ts
var defaultPusher = async (request) => {
  return (await httpRequest(request)).httpRequestInfo;
};
var PushError = class extends Error {
  constructor(cause) {
    super("Failed to push");
    this.name = "PushError";
    this.cause = cause;
  }
};

// src/puller.ts
function assertPullResponse(v) {
  if (typeof v !== "object" || v === null) {
    throw new Error("PullResponse must be an object");
  }
  const v2 = v;
  if (v2.cookie !== void 0) {
    assertJSONValue(v2.cookie);
  }
  assertNumber(v2.lastMutationID);
  assertPatchOperations(v2.patch);
}
var defaultPuller = async (request) => {
  const { httpRequestInfo, response } = await httpRequest(request);
  if (httpRequestInfo.httpStatusCode !== 200) {
    return {
      httpRequestInfo
    };
  }
  return {
    response: await response.json(),
    httpRequestInfo
  };
};
function assertPatchOperations(p) {
  assertArray(p);
  for (const item of p) {
    assertPatchOperation(item);
  }
}
function assertPatchOperation(p) {
  assertObject(p);
  switch (p.op) {
    case "put":
      assertString(p.key);
      assertJSONValue(p.value);
      break;
    case "del":
      assertString(p.key);
      break;
    case "clear":
      break;
    default:
      throw new Error(`unknown patch op \`${p.op}\`, expected one of \`put\`, \`del\`, \`clear\``);
  }
}
var PullError = class extends Error {
  constructor(cause) {
    super("Failed to pull");
    this.name = "PullError";
    this.cause = cause;
  }
};

// src/scan-options.ts
function toDbScanOptions(options) {
  if (!options) {
    return {};
  }
  let key;
  let exclusive;
  let primary;
  let secondary;
  if (options.start) {
    ({ key, exclusive } = options.start);
    if (options.indexName) {
      if (typeof key === "string") {
        secondary = key;
      } else {
        secondary = key[0];
        primary = key[1];
      }
    } else {
      primary = key;
    }
  }
  return {
    prefix: options.prefix,
    startSecondaryKey: secondary,
    startKey: primary,
    startExclusive: exclusive,
    limit: options.limit,
    indexName: options.indexName
  };
}

// src/transaction-closed-error.ts
var TransactionClosedError = class extends Error {
  constructor() {
    super("Transaction is closed");
  }
};
function throwIfClosed(tx) {
  if (tx.closed) {
    throw new TransactionClosedError();
  }
}

// src/async-iterable-to-array.ts
async function asyncIterableToArray(it) {
  const arr = [];
  for await (const v of it) {
    arr.push(v);
  }
  return arr;
}

// node_modules/hash-wasm/dist/index.esm.js
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
var Mutex = class {
  constructor() {
    this.mutex = Promise.resolve();
  }
  lock() {
    let begin = () => {
    };
    this.mutex = this.mutex.then(() => new Promise(begin));
    return new Promise((res) => {
      begin = res;
    });
  }
  dispatch(fn) {
    return __awaiter(this, void 0, void 0, function* () {
      const unlock = yield this.lock();
      try {
        return yield Promise.resolve(fn());
      } finally {
        unlock();
      }
    });
  }
};
var _a;
function getGlobal() {
  if (typeof globalThis !== "undefined")
    return globalThis;
  if (typeof self !== "undefined")
    return self;
  if (typeof window !== "undefined")
    return window;
  return global;
}
var globalObject = getGlobal();
var nodeBuffer = (_a = globalObject.Buffer) !== null && _a !== void 0 ? _a : null;
var textEncoder = globalObject.TextEncoder ? new globalObject.TextEncoder() : null;
function hexCharCodesToInt(a, b) {
  return (a & 15) + (a >> 6 | a >> 3 & 8) << 4 | (b & 15) + (b >> 6 | b >> 3 & 8);
}
function writeHexToUInt8(buf, str) {
  const size = str.length >> 1;
  for (let i = 0; i < size; i++) {
    const index = i << 1;
    buf[i] = hexCharCodesToInt(str.charCodeAt(index), str.charCodeAt(index + 1));
  }
}
function hexStringEqualsUInt8(str, buf) {
  if (str.length !== buf.length * 2) {
    return false;
  }
  for (let i = 0; i < buf.length; i++) {
    const strIndex = i << 1;
    if (buf[i] !== hexCharCodesToInt(str.charCodeAt(strIndex), str.charCodeAt(strIndex + 1))) {
      return false;
    }
  }
  return true;
}
var alpha = "a".charCodeAt(0) - 10;
var digit = "0".charCodeAt(0);
function getDigestHex(tmpBuffer, input, hashLength) {
  let p = 0;
  for (let i = 0; i < hashLength; i++) {
    let nibble = input[i] >>> 4;
    tmpBuffer[p++] = nibble > 9 ? nibble + alpha : nibble + digit;
    nibble = input[i] & 15;
    tmpBuffer[p++] = nibble > 9 ? nibble + alpha : nibble + digit;
  }
  return String.fromCharCode.apply(null, tmpBuffer);
}
var getUInt8Buffer = nodeBuffer !== null ? (data) => {
  if (typeof data === "string") {
    const buf = nodeBuffer.from(data, "utf8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }
  if (nodeBuffer.isBuffer(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.length);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
  throw new Error("Invalid data type!");
} : (data) => {
  if (typeof data === "string") {
    return textEncoder.encode(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  }
  throw new Error("Invalid data type!");
};
var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64Lookup = new Uint8Array(256);
for (let i = 0; i < base64Chars.length; i++) {
  base64Lookup[base64Chars.charCodeAt(i)] = i;
}
function getDecodeBase64Length(data) {
  let bufferLength = Math.floor(data.length * 0.75);
  const len = data.length;
  if (data[len - 1] === "=") {
    bufferLength -= 1;
    if (data[len - 2] === "=") {
      bufferLength -= 1;
    }
  }
  return bufferLength;
}
function decodeBase64(data) {
  const bufferLength = getDecodeBase64Length(data);
  const len = data.length;
  const bytes = new Uint8Array(bufferLength);
  let p = 0;
  for (let i = 0; i < len; i += 4) {
    const encoded1 = base64Lookup[data.charCodeAt(i)];
    const encoded2 = base64Lookup[data.charCodeAt(i + 1)];
    const encoded3 = base64Lookup[data.charCodeAt(i + 2)];
    const encoded4 = base64Lookup[data.charCodeAt(i + 3)];
    bytes[p] = encoded1 << 2 | encoded2 >> 4;
    p += 1;
    bytes[p] = (encoded2 & 15) << 4 | encoded3 >> 2;
    p += 1;
    bytes[p] = (encoded3 & 3) << 6 | encoded4 & 63;
    p += 1;
  }
  return bytes;
}
var MAX_HEAP = 16 * 1024;
var WASM_FUNC_HASH_LENGTH = 4;
var wasmMutex = new Mutex();
var wasmModuleCache = new Map();
function WASMInterface(binary, hashLength) {
  return __awaiter(this, void 0, void 0, function* () {
    let wasmInstance = null;
    let memoryView = null;
    let initialized = false;
    if (typeof WebAssembly === "undefined") {
      throw new Error("WebAssembly is not supported in this environment!");
    }
    const writeMemory = (data, offset = 0) => {
      memoryView.set(data, offset);
    };
    const getMemory = () => memoryView;
    const getExports = () => wasmInstance.exports;
    const setMemorySize = (totalSize) => {
      wasmInstance.exports.Hash_SetMemorySize(totalSize);
      const arrayOffset = wasmInstance.exports.Hash_GetBuffer();
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      memoryView = new Uint8Array(memoryBuffer, arrayOffset, totalSize);
    };
    const getStateSize = () => {
      const view = new DataView(wasmInstance.exports.memory.buffer);
      const stateSize = view.getUint32(wasmInstance.exports.STATE_SIZE, true);
      return stateSize;
    };
    const loadWASMPromise = wasmMutex.dispatch(() => __awaiter(this, void 0, void 0, function* () {
      if (!wasmModuleCache.has(binary.name)) {
        const asm = decodeBase64(binary.data);
        const promise = WebAssembly.compile(asm);
        wasmModuleCache.set(binary.name, promise);
      }
      const module2 = yield wasmModuleCache.get(binary.name);
      wasmInstance = yield WebAssembly.instantiate(module2, {});
    }));
    const setupInterface = () => __awaiter(this, void 0, void 0, function* () {
      if (!wasmInstance) {
        yield loadWASMPromise;
      }
      const arrayOffset = wasmInstance.exports.Hash_GetBuffer();
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      memoryView = new Uint8Array(memoryBuffer, arrayOffset, MAX_HEAP);
    });
    const init3 = (bits = null) => {
      initialized = true;
      wasmInstance.exports.Hash_Init(bits);
    };
    const updateUInt8Array = (data) => {
      let read = 0;
      while (read < data.length) {
        const chunk = data.subarray(read, read + MAX_HEAP);
        read += chunk.length;
        memoryView.set(chunk);
        wasmInstance.exports.Hash_Update(chunk.length);
      }
    };
    const update = (data) => {
      if (!initialized) {
        throw new Error("update() called before init()");
      }
      const Uint8Buffer = getUInt8Buffer(data);
      updateUInt8Array(Uint8Buffer);
    };
    const digestChars = new Uint8Array(hashLength * 2);
    const digest = (outputType, padding = null) => {
      if (!initialized) {
        throw new Error("digest() called before init()");
      }
      initialized = false;
      wasmInstance.exports.Hash_Final(padding);
      if (outputType === "binary") {
        return memoryView.slice(0, hashLength);
      }
      return getDigestHex(digestChars, memoryView, hashLength);
    };
    const save = () => {
      if (!initialized) {
        throw new Error("save() can only be called after init() and before digest()");
      }
      const stateOffset = wasmInstance.exports.Hash_GetState();
      const stateLength = getStateSize();
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      const internalState = new Uint8Array(memoryBuffer, stateOffset, stateLength);
      const prefixedState = new Uint8Array(WASM_FUNC_HASH_LENGTH + stateLength);
      writeHexToUInt8(prefixedState, binary.hash);
      prefixedState.set(internalState, WASM_FUNC_HASH_LENGTH);
      return prefixedState;
    };
    const load2 = (state) => {
      if (!(state instanceof Uint8Array)) {
        throw new Error("load() expects an Uint8Array generated by save()");
      }
      const stateOffset = wasmInstance.exports.Hash_GetState();
      const stateLength = getStateSize();
      const overallLength = WASM_FUNC_HASH_LENGTH + stateLength;
      const memoryBuffer = wasmInstance.exports.memory.buffer;
      if (state.length !== overallLength) {
        throw new Error(`Bad state length (expected ${overallLength} bytes, got ${state.length})`);
      }
      if (!hexStringEqualsUInt8(binary.hash, state.subarray(0, WASM_FUNC_HASH_LENGTH))) {
        throw new Error("This state was written by an incompatible hash implementation");
      }
      const internalState = state.subarray(WASM_FUNC_HASH_LENGTH);
      new Uint8Array(memoryBuffer, stateOffset, stateLength).set(internalState);
      initialized = true;
    };
    const isDataShort = (data) => {
      if (typeof data === "string") {
        return data.length < MAX_HEAP / 4;
      }
      return data.byteLength < MAX_HEAP;
    };
    let canSimplify = isDataShort;
    switch (binary.name) {
      case "argon2":
      case "scrypt":
        canSimplify = () => true;
        break;
      case "blake2b":
      case "blake2s":
        canSimplify = (data, initParam) => initParam <= 512 && isDataShort(data);
        break;
      case "blake3":
        canSimplify = (data, initParam) => initParam === 0 && isDataShort(data);
        break;
      case "xxhash64":
      case "xxhash3":
      case "xxhash128":
        canSimplify = () => false;
        break;
    }
    const calculate = (data, initParam = null, digestParam = null) => {
      if (!canSimplify(data, initParam)) {
        init3(initParam);
        update(data);
        return digest("hex", digestParam);
      }
      const buffer = getUInt8Buffer(data);
      memoryView.set(buffer);
      wasmInstance.exports.Hash_Calculate(buffer.length, initParam, digestParam);
      return getDigestHex(digestChars, memoryView, hashLength);
    };
    yield setupInterface();
    return {
      getMemory,
      writeMemory,
      getExports,
      setMemorySize,
      init: init3,
      update,
      digest,
      save,
      load: load2,
      calculate,
      hashLength
    };
  });
}
var mutex$l = new Mutex();
var mutex$k = new Mutex();
var uint32View = new DataView(new ArrayBuffer(4));
var mutex$j = new Mutex();
var mutex$i = new Mutex();
var mutex$h = new Mutex();
var mutex$g = new Mutex();
var mutex$f = new Mutex();
var mutex$e = new Mutex();
var mutex$d = new Mutex();
var mutex$c = new Mutex();
var mutex$b = new Mutex();
var mutex$a = new Mutex();
var mutex$9 = new Mutex();
var name$9 = "sha512";
var data$9 = "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";
var hash$9 = "a5d1ca7c";
var wasmJson$9 = {
  name: name$9,
  data: data$9,
  hash: hash$9
};
var mutex$8 = new Mutex();
var mutex$7 = new Mutex();
function createSHA512() {
  return WASMInterface(wasmJson$9, 64).then((wasm) => {
    wasm.init(512);
    const obj = {
      init: () => {
        wasm.init(512);
        return obj;
      },
      update: (data) => {
        wasm.update(data);
        return obj;
      },
      digest: (outputType) => wasm.digest(outputType),
      save: () => wasm.save(),
      load: (data) => {
        wasm.load(data);
        return obj;
      },
      blockSize: 128,
      digestSize: 64
    };
    return obj;
  });
}
var mutex$6 = new Mutex();
var mutex$5 = new Mutex();
var seedBuffer$2 = new ArrayBuffer(8);
var mutex$4 = new Mutex();
var seedBuffer$1 = new ArrayBuffer(8);
var mutex$3 = new Mutex();
var seedBuffer = new ArrayBuffer(8);
var mutex$2 = new Mutex();
var mutex$1 = new Mutex();
var mutex = new Mutex();

// src/hash.ts
var BYTE_LENGTH = 20;
var charTable = "0123456789abcdefghijklmnopqrstuv";
var Hash2 = class {
  constructor(sum) {
    this._sum = sum;
  }
  static of(sum) {
    if (!hasher) {
      throw new Error("Hash.of() requires await initHasher");
    }
    const buf = hasher.init().update(sum).digest("binary");
    return new Hash2(buf.subarray(0, BYTE_LENGTH));
  }
  isEmpty() {
    for (const i of this._sum) {
      if (i !== 0) {
        return false;
      }
    }
    return true;
  }
  toString() {
    return encode(this._sum);
  }
  static empty() {
    return new Hash2(new Uint8Array(BYTE_LENGTH));
  }
  static parse(s) {
    const sum = decode(s);
    return new Hash2(sum);
  }
};
function encode(plain) {
  let i = 0;
  let shiftIndex = 0;
  let digit2 = 0;
  let encoded = "";
  while (i < BYTE_LENGTH) {
    const current = plain[i];
    if (shiftIndex > 3) {
      digit2 = current & 255 >> shiftIndex;
      shiftIndex = (shiftIndex + 5) % 8;
      digit2 = digit2 << shiftIndex | (i + 1 < BYTE_LENGTH ? plain[i + 1] : 0) >> 8 - shiftIndex;
      i++;
    } else {
      digit2 = current >> 8 - (shiftIndex + 5) & 31;
      shiftIndex = (shiftIndex + 5) % 8;
      if (shiftIndex === 0) {
        i++;
      }
    }
    encoded += charTable[digit2];
  }
  return encoded;
}
function decode(encoded) {
  let shiftIndex = 0;
  let plainChar = 0;
  let plainPos = 0;
  const decoded = new Uint8Array(BYTE_LENGTH);
  for (let i = 0; i < encoded.length; i++) {
    const plainDigit = charCodeToNum(encoded.charCodeAt(i));
    if (shiftIndex <= 3) {
      shiftIndex = (shiftIndex + 5) % 8;
      if (shiftIndex === 0) {
        decoded[plainPos++] = plainChar | plainDigit;
        plainChar = 0;
      } else {
        plainChar |= 255 & plainDigit << 8 - shiftIndex;
      }
    } else {
      shiftIndex = (shiftIndex + 5) % 8;
      decoded[plainPos++] = plainChar | 255 & plainDigit >>> shiftIndex;
      plainChar = 255 & plainDigit << 8 - shiftIndex;
    }
  }
  return decoded;
}
function charCodeToNum(cc) {
  return cc - (cc <= 57 ? 48 : 87);
}
var hasherPromise;
var hasher;
async function initHasher() {
  if (!hasherPromise) {
    hasherPromise = createSHA512();
    hasher = await hasherPromise;
  }
  return hasherPromise;
}

// src/dag/chunk.ts
var Chunk = class {
  constructor(hash, data, meta = []) {
    this.hash = hash;
    this.data = data;
    this.meta = meta;
  }
  static new(data, refs) {
    const hash = Hash2.of(JSON.stringify(data));
    return new Chunk(hash.toString(), data, refs);
  }
  static read(hash, data, refs) {
    return new Chunk(hash, data, refs);
  }
};
function assertMeta(v) {
  if (!Array.isArray(v)) {
    throw new Error("Meta must be an array");
  }
  for (const e of v) {
    assertString(e);
  }
}

// src/dag/key.ts
function chunkDataKey(hash) {
  return `c/${hash}/d`;
}
function chunkMetaKey(hash) {
  return `c/${hash}/m`;
}
function chunkRefCountKey(hash) {
  return `c/${hash}/r`;
}
function headKey(name) {
  return `h/${name}`;
}

// node_modules/flatbuffers/mjs/constants.js
var SIZEOF_INT = 4;
var FILE_IDENTIFIER_LENGTH = 4;
var SIZE_PREFIX_LENGTH = 4;

// node_modules/flatbuffers/mjs/utils.js
var int32 = new Int32Array(2);
var float32 = new Float32Array(int32.buffer);
var float64 = new Float64Array(int32.buffer);
var isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;

// node_modules/flatbuffers/mjs/long.js
var Long = class {
  constructor(low, high) {
    this.low = low | 0;
    this.high = high | 0;
  }
  static create(low, high) {
    return low == 0 && high == 0 ? Long.ZERO : new Long(low, high);
  }
  toFloat64() {
    return (this.low >>> 0) + this.high * 4294967296;
  }
  equals(other) {
    return this.low == other.low && this.high == other.high;
  }
};
Long.ZERO = new Long(0, 0);

// node_modules/flatbuffers/mjs/encoding.js
var Encoding;
(function(Encoding2) {
  Encoding2[Encoding2["UTF8_BYTES"] = 1] = "UTF8_BYTES";
  Encoding2[Encoding2["UTF16_STRING"] = 2] = "UTF16_STRING";
})(Encoding || (Encoding = {}));

// node_modules/flatbuffers/mjs/byte-buffer.js
var ByteBuffer = class {
  constructor(bytes_) {
    this.bytes_ = bytes_;
    this.position_ = 0;
  }
  static allocate(byte_size) {
    return new ByteBuffer(new Uint8Array(byte_size));
  }
  clear() {
    this.position_ = 0;
  }
  bytes() {
    return this.bytes_;
  }
  position() {
    return this.position_;
  }
  setPosition(position) {
    this.position_ = position;
  }
  capacity() {
    return this.bytes_.length;
  }
  readInt8(offset) {
    return this.readUint8(offset) << 24 >> 24;
  }
  readUint8(offset) {
    return this.bytes_[offset];
  }
  readInt16(offset) {
    return this.readUint16(offset) << 16 >> 16;
  }
  readUint16(offset) {
    return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
  }
  readInt32(offset) {
    return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
  }
  readUint32(offset) {
    return this.readInt32(offset) >>> 0;
  }
  readInt64(offset) {
    return new Long(this.readInt32(offset), this.readInt32(offset + 4));
  }
  readUint64(offset) {
    return new Long(this.readUint32(offset), this.readUint32(offset + 4));
  }
  readFloat32(offset) {
    int32[0] = this.readInt32(offset);
    return float32[0];
  }
  readFloat64(offset) {
    int32[isLittleEndian ? 0 : 1] = this.readInt32(offset);
    int32[isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
    return float64[0];
  }
  writeInt8(offset, value) {
    this.bytes_[offset] = value;
  }
  writeUint8(offset, value) {
    this.bytes_[offset] = value;
  }
  writeInt16(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
  }
  writeUint16(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
  }
  writeInt32(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
    this.bytes_[offset + 2] = value >> 16;
    this.bytes_[offset + 3] = value >> 24;
  }
  writeUint32(offset, value) {
    this.bytes_[offset] = value;
    this.bytes_[offset + 1] = value >> 8;
    this.bytes_[offset + 2] = value >> 16;
    this.bytes_[offset + 3] = value >> 24;
  }
  writeInt64(offset, value) {
    this.writeInt32(offset, value.low);
    this.writeInt32(offset + 4, value.high);
  }
  writeUint64(offset, value) {
    this.writeUint32(offset, value.low);
    this.writeUint32(offset + 4, value.high);
  }
  writeFloat32(offset, value) {
    float32[0] = value;
    this.writeInt32(offset, int32[0]);
  }
  writeFloat64(offset, value) {
    float64[0] = value;
    this.writeInt32(offset, int32[isLittleEndian ? 0 : 1]);
    this.writeInt32(offset + 4, int32[isLittleEndian ? 1 : 0]);
  }
  getBufferIdentifier() {
    if (this.bytes_.length < this.position_ + SIZEOF_INT + FILE_IDENTIFIER_LENGTH) {
      throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
    }
    let result = "";
    for (let i = 0; i < FILE_IDENTIFIER_LENGTH; i++) {
      result += String.fromCharCode(this.readInt8(this.position_ + SIZEOF_INT + i));
    }
    return result;
  }
  __offset(bb_pos, vtable_offset) {
    const vtable = bb_pos - this.readInt32(bb_pos);
    return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
  }
  __union(t, offset) {
    t.bb_pos = offset + this.readInt32(offset);
    t.bb = this;
    return t;
  }
  __string(offset, opt_encoding) {
    offset += this.readInt32(offset);
    const length = this.readInt32(offset);
    let result = "";
    let i = 0;
    offset += SIZEOF_INT;
    if (opt_encoding === Encoding.UTF8_BYTES) {
      return this.bytes_.subarray(offset, offset + length);
    }
    while (i < length) {
      let codePoint;
      const a = this.readUint8(offset + i++);
      if (a < 192) {
        codePoint = a;
      } else {
        const b = this.readUint8(offset + i++);
        if (a < 224) {
          codePoint = (a & 31) << 6 | b & 63;
        } else {
          const c = this.readUint8(offset + i++);
          if (a < 240) {
            codePoint = (a & 15) << 12 | (b & 63) << 6 | c & 63;
          } else {
            const d = this.readUint8(offset + i++);
            codePoint = (a & 7) << 18 | (b & 63) << 12 | (c & 63) << 6 | d & 63;
          }
        }
      }
      if (codePoint < 65536) {
        result += String.fromCharCode(codePoint);
      } else {
        codePoint -= 65536;
        result += String.fromCharCode((codePoint >> 10) + 55296, (codePoint & (1 << 10) - 1) + 56320);
      }
    }
    return result;
  }
  __union_with_string(o, offset) {
    if (typeof o === "string") {
      return this.__string(offset);
    }
    return this.__union(o, offset);
  }
  __indirect(offset) {
    return offset + this.readInt32(offset);
  }
  __vector(offset) {
    return offset + this.readInt32(offset) + SIZEOF_INT;
  }
  __vector_len(offset) {
    return this.readInt32(offset + this.readInt32(offset));
  }
  __has_identifier(ident) {
    if (ident.length != FILE_IDENTIFIER_LENGTH) {
      throw new Error("FlatBuffers: file identifier must be length " + FILE_IDENTIFIER_LENGTH);
    }
    for (let i = 0; i < FILE_IDENTIFIER_LENGTH; i++) {
      if (ident.charCodeAt(i) != this.readInt8(this.position() + SIZEOF_INT + i)) {
        return false;
      }
    }
    return true;
  }
  createLong(low, high) {
    return Long.create(low, high);
  }
  createScalarList(listAccessor, listLength) {
    const ret = [];
    for (let i = 0; i < listLength; ++i) {
      if (listAccessor(i) !== null) {
        ret.push(listAccessor(i));
      }
    }
    return ret;
  }
  createObjList(listAccessor, listLength) {
    const ret = [];
    for (let i = 0; i < listLength; ++i) {
      const val = listAccessor(i);
      if (val !== null) {
        ret.push(val.unpack());
      }
    }
    return ret;
  }
};

// src/dag/generated/meta/meta.ts
var Meta = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsMeta(bb, obj) {
    return (obj || new Meta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsMeta(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new Meta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  refs(index, optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
  }
  refsLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startMeta(builder) {
    builder.startObject(1);
  }
  static addRefs(builder, refsOffset) {
    builder.addFieldOffset(0, refsOffset, 0);
  }
  static createRefsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startRefsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endMeta(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishMetaBuffer(builder, offset) {
    builder.finish(offset);
  }
  static finishSizePrefixedMetaBuffer(builder, offset) {
    builder.finish(offset, void 0, true);
  }
  static createMeta(builder, refsOffset) {
    Meta.startMeta(builder);
    Meta.addRefs(builder, refsOffset);
    return Meta.endMeta(builder);
  }
};

// src/dag/read.ts
var Read = class {
  constructor(kv) {
    this._kvr = kv;
  }
  async hasChunk(hash) {
    return await this._kvr.has(chunkDataKey(hash));
  }
  async getChunk(hash) {
    const data = await this._kvr.get(chunkDataKey(hash));
    if (data === void 0) {
      return void 0;
    }
    const refsVal = await this._kvr.get(chunkMetaKey(hash));
    let refs;
    if (refsVal !== void 0) {
      assertMeta(refsVal);
      refs = refsVal;
    } else {
      refs = [];
    }
    return Chunk.read(hash, data, refs);
  }
  async getHead(name) {
    const data = await this._kvr.get(headKey(name));
    if (data === void 0) {
      return void 0;
    }
    assertString(data);
    return data;
  }
  close() {
    this._kvr.release();
  }
};
function metaFromFlatbuffer(data) {
  const buf = new ByteBuffer(data);
  const meta = Meta.getRootAsMeta(buf);
  const length = meta.refsLength();
  const refs = [];
  for (let i = 0; i < length; i++) {
    refs.push(meta.refs(i));
  }
  return refs;
}

// src/dag/write.ts
var Write = class {
  constructor(kvw) {
    this._newChunks = new Set();
    this._changedHeads = new Map();
    this._kvw = kvw;
  }
  read() {
    return new Read(this._kvw);
  }
  async putChunk(c) {
    const { hash, data, meta } = c;
    const key = chunkDataKey(hash);
    const p1 = this._kvw.put(key, data);
    let p2;
    if (meta.length > 0) {
      p2 = this._kvw.put(chunkMetaKey(hash), meta);
    }
    this._newChunks.add(hash);
    await p1;
    await p2;
  }
  setHead(name, hash) {
    return this._setHead(name, hash);
  }
  removeHead(name) {
    return this._setHead(name, void 0);
  }
  async _setHead(name, hash) {
    const oldHash = await this.read().getHead(name);
    const hk = headKey(name);
    let p1;
    if (hash === void 0) {
      p1 = this._kvw.del(hk);
    } else {
      p1 = this._kvw.put(hk, hash);
    }
    const v = this._changedHeads.get(name);
    if (v === void 0) {
      this._changedHeads.set(name, { new: hash, old: oldHash });
    } else {
      v.new = hash;
    }
    await p1;
  }
  async commit() {
    await this.collectGarbage();
    await this._kvw.commit();
  }
  async collectGarbage() {
    const newHeads = [];
    const oldHeads = [];
    for (const changedHead of this._changedHeads.values()) {
      oldHeads.push(changedHead.old);
      newHeads.push(changedHead.new);
    }
    for (const n of newHeads) {
      if (n !== void 0) {
        await this.changeRefCount(n, 1);
      }
    }
    for (const o of oldHeads) {
      if (o !== void 0) {
        await this.changeRefCount(o, -1);
      }
    }
    const ps = [];
    for (const hash of this._newChunks) {
      const count = await this.getRefCount(hash);
      if (count === 0) {
        ps.push(this.removeAllRelatedKeys(hash, false));
      }
    }
    await Promise.all(ps);
  }
  async changeRefCount(hash, delta) {
    const oldCount = await this.getRefCount(hash);
    const newCount = oldCount + delta;
    if (oldCount === 0 && delta === 1 || oldCount === 1 && delta === -1) {
      const meta = await this._kvw.get(chunkMetaKey(hash));
      if (meta !== void 0) {
        assertMeta(meta);
        const ps = meta.map((ref) => this.changeRefCount(ref, delta));
        await Promise.all(ps);
      }
    }
    if (newCount === 0) {
      await this.removeAllRelatedKeys(hash, true);
    } else {
      await this.setRefCount(hash, newCount);
    }
  }
  async setRefCount(hash, count) {
    const refCountKey = chunkRefCountKey(hash);
    if (count === 0) {
      await this._kvw.del(refCountKey);
    } else {
      await this._kvw.put(refCountKey, count);
    }
  }
  async getRefCount(hash) {
    const value = await this._kvw.get(chunkRefCountKey(hash));
    if (value === void 0) {
      return 0;
    }
    assertNumber(value);
    if (value < 0 || value > 65535 || value !== (value | 0)) {
      throw new Error(`Invalid ref count ${value}. We expect the value to be a Uint16`);
    }
    return value;
  }
  async removeAllRelatedKeys(hash, updateMutatedChunks) {
    await Promise.all([
      this._kvw.del(chunkDataKey(hash)),
      this._kvw.del(chunkMetaKey(hash)),
      this._kvw.del(chunkRefCountKey(hash))
    ]);
    if (updateMutatedChunks) {
      this._newChunks.delete(hash);
    }
  }
  close() {
    this._kvw.release();
  }
};
function fromLittleEndian(buf) {
  if (buf.length !== 2) {
    throw new Error("Ref count must be 2 bytes");
  }
  return buf[0] | buf[1] << 8;
}

// src/dag/store.ts
var Store = class {
  constructor(kv) {
    this._kv = kv;
  }
  async read() {
    return new Read(await this._kv.read());
  }
  async withRead(fn) {
    return this._kv.withRead((kvr) => fn(new Read(kvr)));
  }
  async write() {
    return new Write(await this._kv.write());
  }
  async withWrite(fn) {
    return this._kv.withWrite((kvw) => fn(new Write(kvw)));
  }
  async close() {
    await this._kv.close();
  }
};

// src/prolly/string-compare.ts
function stringCompare(a, b) {
  if (a === b) {
    return 0;
  }
  if (a < b) {
    return -1;
  }
  return 1;
}

// src/prolly/generated/leaf/leaf-entry.ts
var LeafEntry = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsLeafEntry(bb, obj) {
    return (obj || new LeafEntry()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsLeafEntry(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new LeafEntry()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  key(index) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
  }
  keyLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  keyArray() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  val(index) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
  }
  valLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  valArray() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startLeafEntry(builder) {
    builder.startObject(2);
  }
  static addKey(builder, keyOffset) {
    builder.addFieldOffset(0, keyOffset, 0);
  }
  static createKeyVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(data[i]);
    }
    return builder.endVector();
  }
  static startKeyVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static addVal(builder, valOffset) {
    builder.addFieldOffset(1, valOffset, 0);
  }
  static createValVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(data[i]);
    }
    return builder.endVector();
  }
  static startValVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static endLeafEntry(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createLeafEntry(builder, keyOffset, valOffset) {
    LeafEntry.startLeafEntry(builder);
    LeafEntry.addKey(builder, keyOffset);
    LeafEntry.addVal(builder, valOffset);
    return LeafEntry.endLeafEntry(builder);
  }
};

// src/prolly/generated/leaf/leaf.ts
var Leaf = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsLeaf(bb, obj) {
    return (obj || new Leaf()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsLeaf(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new Leaf()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  entries(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? (obj || new LeafEntry()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  entriesLength() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startLeaf(builder) {
    builder.startObject(1);
  }
  static addEntries(builder, entriesOffset) {
    builder.addFieldOffset(0, entriesOffset, 0);
  }
  static createEntriesVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startEntriesVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endLeaf(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishLeafBuffer(builder, offset) {
    builder.finish(offset);
  }
  static finishSizePrefixedLeafBuffer(builder, offset) {
    builder.finish(offset, void 0, true);
  }
  static createLeaf(builder, entriesOffset) {
    Leaf.startLeaf(builder);
    Leaf.addEntries(builder, entriesOffset);
    return Leaf.endLeaf(builder);
  }
};

// src/utf8.ts
var textEncoder2 = new TextEncoder();
var textDecoder = new TextDecoder();
function decode2(bytes) {
  return textDecoder.decode(bytes);
}

// src/prolly/map.ts
var ProllyMap = class {
  constructor(entries) {
    this._isReadonly = true;
    this._pendingChangedKeys = new Set();
    this._entries = entries;
  }
  get _readonlyEntries() {
    return this._entries;
  }
  get _mutableEntries() {
    if (this._isReadonly) {
      this._isReadonly = false;
      this._entries = [...this._entries];
    }
    return this._entries;
  }
  static async load(hash, read) {
    const chunk = await read.getChunk(hash);
    if (chunk === void 0) {
      throw new Error(`Chunk not found: ${hash}`);
    }
    return fromChunk(chunk);
  }
  has(key) {
    return binarySearch(key, this._readonlyEntries) >= 0;
  }
  get(key) {
    const index = binarySearch(key, this._readonlyEntries);
    if (index < 0) {
      return void 0;
    }
    return this._readonlyEntries[index][1];
  }
  put(key, val) {
    const entries = this._mutableEntries;
    const index = binarySearch(key, entries);
    if (index >= 0) {
      entries[index] = [key, val];
    } else {
      entries.splice(-index - 1, 0, [key, val]);
    }
    this._pendingChangedKeys.add(key);
  }
  del(key) {
    const index = binarySearch(key, this._readonlyEntries);
    if (index >= 0) {
      this._mutableEntries.splice(index, 1);
      this._pendingChangedKeys.add(key);
    }
  }
  entries() {
    return this._entries.values();
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  async flush(write) {
    const entries = this._entries;
    this._isReadonly = true;
    const chunk = Chunk.new(entries, []);
    this._pendingChangedKeys.clear();
    await write.putChunk(chunk);
    return chunk.hash;
  }
  static changedKeys(am, bm) {
    const itA = am.entries();
    const itB = bm.entries();
    const keys2 = [];
    let a = itA.next();
    let b = itB.next();
    for (; ; ) {
      if (a.done && b.done) {
        break;
      }
      if (a.done && !b.done) {
        keys2.push(b.value[0]);
        b = itB.next();
      } else if (!a.done && b.done) {
        keys2.push(a.value[0]);
        a = itA.next();
      } else if (!a.done && !b.done) {
        const ord = stringCompare(a.value[0], b.value[0]);
        switch (ord) {
          case -1:
            keys2.push(a.value[0]);
            a = itA.next();
            break;
          case 0:
            if (!deepEqual(a.value[1], b.value[1])) {
              keys2.push(a.value[0]);
            }
            a = itA.next();
            b = itB.next();
            break;
          case 1:
            keys2.push(b.value[0]);
            b = itB.next();
            break;
        }
      }
    }
    return keys2;
  }
  pendingChangedKeys() {
    const keys2 = [...this._pendingChangedKeys];
    return keys2.sort((a, b) => stringCompare(a[0], b[0]));
  }
};
function fromChunk(chunk) {
  const entries = chunk.data;
  assertEntries(entries);
  validateKeys(entries);
  return new ProllyMap(entries);
}
function validateKeys(entries) {
  const seen = new Set();
  for (let i = 0; i < entries.length - 1; i++) {
    const entry = entries[i];
    const next = entries[i + 1];
    if (entry[0] === next[0] || seen.has(entry[0])) {
      throw new Error("duplicate key");
    }
    if (entry[0] > next[0]) {
      throw new Error("unsorted key");
    }
    seen.add(entry[0]);
  }
}
function assertEntry(v) {
  assertArray(v);
  if (v.length !== 2) {
    throw new Error("Invalid entry length");
  }
  assertString(v[0]);
  assertJSONValue(v[1]);
}
function assertEntries(v) {
  assertArray(v);
  for (const e of v) {
    assertEntry(e);
  }
}
function binarySearch(key, entries) {
  let size = entries.length;
  if (size === 0) {
    return -1;
  }
  let base = 0;
  while (size > 1) {
    const half = Math.floor(size / 2);
    const mid = base + half;
    const entry2 = entries[mid];
    const cmp2 = stringCompare(entry2[0], key);
    base = cmp2 > 0 ? base : mid;
    size -= half;
  }
  const entry = entries[base];
  const cmp = stringCompare(entry[0], key);
  if (cmp === 0) {
    return base;
  }
  const index = base + (cmp === -1 ? 1 : 0);
  return -index - 1;
}
function entriesFromFlatbuffer(data) {
  const buf = new ByteBuffer(data);
  const root2 = Leaf.getRootAsLeaf(buf);
  const entries = [];
  for (let i = 0; i < root2.entriesLength(); i++) {
    const entry = root2.entries(i);
    const keyArray = entry.keyArray();
    assertNotNull(keyArray);
    const key = decode2(keyArray);
    const valArray = entry.valArray();
    assertNotNull(valArray);
    const val = JSON.parse(decode2(valArray));
    entries.push([key, val]);
  }
  return entries;
}

// src/db/generated/commit/local-meta.ts
var LocalMeta = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsLocalMeta(bb, obj) {
    return (obj || new LocalMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsLocalMeta(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new LocalMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  mutationId() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint64(this.bb_pos + offset) : this.bb.createLong(0, 0);
  }
  mutatorName(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  mutatorArgsJson(index) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
  }
  mutatorArgsJsonLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  mutatorArgsJsonArray() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  originalHash(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startLocalMeta(builder) {
    builder.startObject(4);
  }
  static addMutationId(builder, mutationId) {
    builder.addFieldInt64(0, mutationId, builder.createLong(0, 0));
  }
  static addMutatorName(builder, mutatorNameOffset) {
    builder.addFieldOffset(1, mutatorNameOffset, 0);
  }
  static addMutatorArgsJson(builder, mutatorArgsJsonOffset) {
    builder.addFieldOffset(2, mutatorArgsJsonOffset, 0);
  }
  static createMutatorArgsJsonVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(data[i]);
    }
    return builder.endVector();
  }
  static startMutatorArgsJsonVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static addOriginalHash(builder, originalHashOffset) {
    builder.addFieldOffset(3, originalHashOffset, 0);
  }
  static endLocalMeta(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createLocalMeta(builder, mutationId, mutatorNameOffset, mutatorArgsJsonOffset, originalHashOffset) {
    LocalMeta.startLocalMeta(builder);
    LocalMeta.addMutationId(builder, mutationId);
    LocalMeta.addMutatorName(builder, mutatorNameOffset);
    LocalMeta.addMutatorArgsJson(builder, mutatorArgsJsonOffset);
    LocalMeta.addOriginalHash(builder, originalHashOffset);
    return LocalMeta.endLocalMeta(builder);
  }
};

// src/db/generated/commit/index-change-meta.ts
var IndexChangeMeta = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsIndexChangeMeta(bb, obj) {
    return (obj || new IndexChangeMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsIndexChangeMeta(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new IndexChangeMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  lastMutationId() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint64(this.bb_pos + offset) : this.bb.createLong(0, 0);
  }
  static startIndexChangeMeta(builder) {
    builder.startObject(1);
  }
  static addLastMutationId(builder, lastMutationId) {
    builder.addFieldInt64(0, lastMutationId, builder.createLong(0, 0));
  }
  static endIndexChangeMeta(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createIndexChangeMeta(builder, lastMutationId) {
    IndexChangeMeta.startIndexChangeMeta(builder);
    IndexChangeMeta.addLastMutationId(builder, lastMutationId);
    return IndexChangeMeta.endIndexChangeMeta(builder);
  }
};

// src/db/generated/commit/snapshot-meta.ts
var SnapshotMeta = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsSnapshotMeta(bb, obj) {
    return (obj || new SnapshotMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsSnapshotMeta(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new SnapshotMeta()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  lastMutationId() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readUint64(this.bb_pos + offset) : this.bb.createLong(0, 0);
  }
  cookieJson(index) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
  }
  cookieJsonLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  cookieJsonArray() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startSnapshotMeta(builder) {
    builder.startObject(2);
  }
  static addLastMutationId(builder, lastMutationId) {
    builder.addFieldInt64(0, lastMutationId, builder.createLong(0, 0));
  }
  static addCookieJson(builder, cookieJsonOffset) {
    builder.addFieldOffset(1, cookieJsonOffset, 0);
  }
  static createCookieJsonVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(data[i]);
    }
    return builder.endVector();
  }
  static startCookieJsonVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static endSnapshotMeta(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createSnapshotMeta(builder, lastMutationId, cookieJsonOffset) {
    SnapshotMeta.startSnapshotMeta(builder);
    SnapshotMeta.addLastMutationId(builder, lastMutationId);
    SnapshotMeta.addCookieJson(builder, cookieJsonOffset);
    return SnapshotMeta.endSnapshotMeta(builder);
  }
};

// src/db/generated/commit/meta-typed.ts
var MetaTyped;
(function(MetaTyped3) {
  MetaTyped3[MetaTyped3["NONE"] = 0] = "NONE";
  MetaTyped3[MetaTyped3["IndexChangeMeta"] = 1] = "IndexChangeMeta";
  MetaTyped3[MetaTyped3["LocalMeta"] = 2] = "LocalMeta";
  MetaTyped3[MetaTyped3["SnapshotMeta"] = 3] = "SnapshotMeta";
})(MetaTyped || (MetaTyped = {}));

// src/db/generated/commit/meta.ts
var Meta2 = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsMeta(bb, obj) {
    return (obj || new Meta2()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsMeta(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new Meta2()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  basisHash(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  typedType() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : MetaTyped.NONE;
  }
  typed(obj) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
  }
  static startMeta(builder) {
    builder.startObject(4);
  }
  static addBasisHash(builder, basisHashOffset) {
    builder.addFieldOffset(1, basisHashOffset, 0);
  }
  static addTypedType(builder, typedType) {
    builder.addFieldInt8(2, typedType, MetaTyped.NONE);
  }
  static addTyped(builder, typedOffset) {
    builder.addFieldOffset(3, typedOffset, 0);
  }
  static endMeta(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createMeta(builder, basisHashOffset, typedType, typedOffset) {
    Meta2.startMeta(builder);
    Meta2.addBasisHash(builder, basisHashOffset);
    Meta2.addTypedType(builder, typedType);
    Meta2.addTyped(builder, typedOffset);
    return Meta2.endMeta(builder);
  }
};

// src/db/generated/commit/index-definition.ts
var IndexDefinition = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsIndexDefinition(bb, obj) {
    return (obj || new IndexDefinition()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsIndexDefinition(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new IndexDefinition()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  name(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  keyPrefix(index) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
  }
  keyPrefixLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  keyPrefixArray() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  jsonPointer(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startIndexDefinition(builder) {
    builder.startObject(3);
  }
  static addName(builder, nameOffset) {
    builder.addFieldOffset(0, nameOffset, 0);
  }
  static addKeyPrefix(builder, keyPrefixOffset) {
    builder.addFieldOffset(1, keyPrefixOffset, 0);
  }
  static createKeyPrefixVector(builder, data) {
    builder.startVector(1, data.length, 1);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt8(data[i]);
    }
    return builder.endVector();
  }
  static startKeyPrefixVector(builder, numElems) {
    builder.startVector(1, numElems, 1);
  }
  static addJsonPointer(builder, jsonPointerOffset) {
    builder.addFieldOffset(2, jsonPointerOffset, 0);
  }
  static endIndexDefinition(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createIndexDefinition(builder, nameOffset, keyPrefixOffset, jsonPointerOffset) {
    IndexDefinition.startIndexDefinition(builder);
    IndexDefinition.addName(builder, nameOffset);
    IndexDefinition.addKeyPrefix(builder, keyPrefixOffset);
    IndexDefinition.addJsonPointer(builder, jsonPointerOffset);
    return IndexDefinition.endIndexDefinition(builder);
  }
};

// src/db/generated/commit/index-record.ts
var IndexRecord = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsIndexRecord(bb, obj) {
    return (obj || new IndexRecord()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsIndexRecord(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new IndexRecord()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  definition(obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? (obj || new IndexDefinition()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  valueHash(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startIndexRecord(builder) {
    builder.startObject(2);
  }
  static addDefinition(builder, definitionOffset) {
    builder.addFieldOffset(0, definitionOffset, 0);
  }
  static addValueHash(builder, valueHashOffset) {
    builder.addFieldOffset(1, valueHashOffset, 0);
  }
  static endIndexRecord(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createIndexRecord(builder, definitionOffset, valueHashOffset) {
    IndexRecord.startIndexRecord(builder);
    IndexRecord.addDefinition(builder, definitionOffset);
    IndexRecord.addValueHash(builder, valueHashOffset);
    return IndexRecord.endIndexRecord(builder);
  }
};

// src/db/generated/commit/commit.ts
var Commit = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsCommit(bb, obj) {
    return (obj || new Commit()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsCommit(bb, obj) {
    bb.setPosition(bb.position() + SIZE_PREFIX_LENGTH);
    return (obj || new Commit()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  meta(obj) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? (obj || new Meta2()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  valueHash(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  indexes(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? (obj || new IndexRecord()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  indexesLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startCommit(builder) {
    builder.startObject(3);
  }
  static addMeta(builder, metaOffset) {
    builder.addFieldOffset(0, metaOffset, 0);
  }
  static addValueHash(builder, valueHashOffset) {
    builder.addFieldOffset(1, valueHashOffset, 0);
  }
  static addIndexes(builder, indexesOffset) {
    builder.addFieldOffset(2, indexesOffset, 0);
  }
  static createIndexesVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startIndexesVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endCommit(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishCommitBuffer(builder, offset) {
    builder.finish(offset);
  }
  static finishSizePrefixedCommitBuffer(builder, offset) {
    builder.finish(offset, void 0, true);
  }
  static createCommit(builder, metaOffset, valueHashOffset, indexesOffset) {
    Commit.startCommit(builder);
    Commit.addMeta(builder, metaOffset);
    Commit.addValueHash(builder, valueHashOffset);
    Commit.addIndexes(builder, indexesOffset);
    return Commit.endCommit(builder);
  }
};

// src/db/commit.ts
var DEFAULT_HEAD_NAME = "main";
var MetaTyped2;
(function(MetaTyped3) {
  MetaTyped3[MetaTyped3["NONE"] = 0] = "NONE";
  MetaTyped3[MetaTyped3["IndexChange"] = 1] = "IndexChange";
  MetaTyped3[MetaTyped3["Local"] = 2] = "Local";
  MetaTyped3[MetaTyped3["Snapshot"] = 3] = "Snapshot";
})(MetaTyped2 || (MetaTyped2 = {}));
var Commit2 = class {
  constructor(chunk) {
    this.chunk = chunk;
  }
  get meta() {
    return this.chunk.data.meta;
  }
  isLocal() {
    return this.meta.type === 2;
  }
  isSnapshot() {
    return this.meta.type === 3;
  }
  isIndexChange() {
    return this.meta.type === 1;
  }
  get valueHash() {
    return this.chunk.data.valueHash;
  }
  get mutationID() {
    const meta = this.meta;
    switch (meta.type) {
      case 1:
      case 3:
        return meta.lastMutationID;
      case 2:
        return meta.mutationID;
    }
  }
  get nextMutationID() {
    return this.mutationID + 1;
  }
  get indexes() {
    return this.chunk.data.indexes;
  }
  static async localMutations(fromCommitHash, dagRead) {
    const commits = await Commit2.chain(fromCommitHash, dagRead);
    return commits.filter((c) => c.isLocal());
  }
  static async baseSnapshot(hash, dagRead) {
    let commit = await Commit2.fromHash(hash, dagRead);
    while (!commit.isSnapshot()) {
      const meta = commit.meta;
      const basisHash = meta.basisHash;
      if (basisHash === null) {
        throw new Error(`Commit ${commit.chunk.hash} has no basis`);
      }
      commit = await Commit2.fromHash(basisHash, dagRead);
    }
    return commit;
  }
  static snapshotMetaParts(c) {
    const m = c.meta;
    if (m.type === 3) {
      return [m.lastMutationID, m.cookieJSON];
    }
    throw new Error("Snapshot meta expected");
  }
  static async chain(fromCommitHash, dagRead) {
    let commit = await Commit2.fromHash(fromCommitHash, dagRead);
    const commits = [];
    while (!commit.isSnapshot()) {
      const meta = commit.meta;
      const basisHash = meta.basisHash;
      if (basisHash === null) {
        throw new Error(`Commit ${commit.chunk.hash} has no basis`);
      }
      commits.push(commit);
      commit = await Commit2.fromHash(basisHash, dagRead);
    }
    commits.push(commit);
    return commits;
  }
  static async fromHash(hash, dagRead) {
    const chunk = await dagRead.getChunk(hash);
    if (!chunk) {
      throw new Error(`Missing commit for ${hash}`);
    }
    return fromChunk2(chunk);
  }
};
function assertIndexChangeMeta(v) {
  assertNumber(v.lastMutationID);
}
function assertLocalMeta(v) {
  assertNumber(v.mutationID);
  assertString(v.mutatorName);
  if (!v.mutatorName) {
    throw new Error("Missing mutator name");
  }
  assertJSONValue(v.mutatorArgsJSON);
  if (v.originalHash !== null) {
    assertString(v.originalHash);
  }
}
function assertSnapshot(v) {
  assertNumber(v.lastMutationID);
  assertJSONValue(v.cookieJSON);
}
function assertMeta2(v) {
  assertObject(v);
  if (v.basisHash !== null) {
    assertString(v.basisHash);
  }
  assertNumber(v.type);
  switch (v.type) {
    case 1:
      assertIndexChangeMeta(v);
      break;
    case 2:
      assertLocalMeta(v);
      break;
    case 3:
      assertSnapshot(v);
      break;
    default:
      throw new Error(`Invalid enum value ${v.type}`);
  }
}
function assertIndexDefinition(v) {
  assertObject(v);
  assertString(v.name);
  assertString(v.keyPrefix);
  assertString(v.jsonPointer);
}
function assertIndexRecord(v) {
  assertObject(v);
  assertIndexDefinition(v.definition);
  assertString(v.valueHash);
}
var RefType;
(function(RefType2) {
  RefType2[RefType2["Strong"] = 0] = "Strong";
  RefType2[RefType2["Weak"] = 1] = "Weak";
})(RefType || (RefType = {}));
function newLocal(basisHash, mutationID, mutatorName, mutatorArgsJSON, originalHash, valueHash, indexes) {
  const localMeta = {
    type: 2,
    basisHash,
    mutationID,
    mutatorName,
    mutatorArgsJSON,
    originalHash
  };
  return newImpl(asRef(basisHash, 0), localMeta, asRef(valueHash, 0), asRef(originalHash, 1), indexes);
}
function newSnapshot(basisHash, lastMutationID, cookieJSON, valueHash, indexes) {
  const snapshotMeta = {
    type: 3,
    basisHash,
    lastMutationID,
    cookieJSON
  };
  return newImpl(asRef(basisHash, 1), snapshotMeta, asRef(valueHash, 0), null, indexes);
}
function newIndexChange(basisHash, lastMutationID, valueHash, indexes) {
  const indexChangeMeta = {
    type: 1,
    basisHash,
    lastMutationID
  };
  return newImpl(asRef(basisHash, 0), indexChangeMeta, asRef(valueHash, 0), null, indexes);
}
function fromChunk2(chunk) {
  validateChunk(chunk);
  return new Commit2(chunk);
}
function asRef(h, t) {
  if (h === null) {
    return null;
  }
  return { t, h };
}
async function newImpl(basisHash, meta, valueHash, originalHash, indexes) {
  const refs = [valueHash, basisHash, originalHash];
  const strongRefs = refs.filter((r) => r && r.t === 0).map((r) => r.h);
  for (const index of indexes) {
    strongRefs.push(index.valueHash);
  }
  const data = {
    meta,
    valueHash: valueHash.h,
    indexes
  };
  const chunk = Chunk.new(data, strongRefs);
  return new Commit2(chunk);
}
function assertCommitData(v) {
  assertObject(v);
  assertMeta2(v.meta);
  assertString(v.valueHash);
  assertArray(v.indexes);
  for (const index of v.indexes) {
    assertIndexRecord(index);
  }
}
function validateChunk(chunk) {
  const { data } = chunk;
  assertCommitData(data);
  const seen = new Set();
  for (const index of data.indexes) {
    const { name } = index.definition;
    if (seen.has(name)) {
      throw new Error(`Duplicate index ${name}`);
    }
    seen.add(name);
  }
}
function commitDataFromFlatbuffer(data) {
  var _a2;
  const buf = new ByteBuffer(data);
  const commitFB = Commit.getRootAsCommit(buf);
  const metaFB = commitFB.meta();
  assertNotNull(metaFB);
  const meta = metaFromFlatbuffer2(metaFB);
  const valueHash = commitFB.valueHash();
  assertString(valueHash);
  const indexes = [];
  const length = commitFB.indexesLength();
  for (let i = 0; i < length; i++) {
    const indexFB = commitFB.indexes(i);
    assertNotNull(indexFB);
    const definitionFB = indexFB.definition();
    assertNotNull(definitionFB);
    const name = definitionFB.name();
    assertString(name);
    const keyPrefixArray = definitionFB.keyPrefixArray();
    assertNotNull(keyPrefixArray);
    const keyPrefix = decode2(keyPrefixArray);
    const jsonPointer = (_a2 = definitionFB.jsonPointer()) != null ? _a2 : "";
    assertString(jsonPointer);
    const definition = {
      name,
      keyPrefix,
      jsonPointer
    };
    const valueHash2 = indexFB.valueHash();
    assertNotNull(valueHash2);
    const index = {
      definition,
      valueHash: valueHash2
    };
    indexes.push(index);
  }
  return {
    meta,
    valueHash,
    indexes
  };
}
function metaFromFlatbuffer2(metaFB) {
  const basisHash = metaFB.basisHash();
  switch (metaFB.typedType()) {
    case MetaTyped.NONE:
      throw new Error("Invalid meta type");
    case MetaTyped.IndexChangeMeta:
      return indexChangeMetaFromFlatbuffer(metaFB, basisHash);
    case MetaTyped.LocalMeta:
      return localMetaFromFlatbuffer(metaFB, basisHash);
    case MetaTyped.SnapshotMeta:
      return snapshotMetaFromFlatbuffer(metaFB, basisHash);
  }
}
function indexChangeMetaFromFlatbuffer(fb, basisHash) {
  const indexChangeMetaFB = fb.typed(new IndexChangeMeta());
  return {
    type: 1,
    basisHash,
    lastMutationID: indexChangeMetaFB.lastMutationId().toFloat64()
  };
}
function localMetaFromFlatbuffer(fb, basisHash) {
  const localMetaFB = fb.typed(new LocalMeta());
  const mutatorName = localMetaFB.mutatorName();
  if (!mutatorName) {
    throw new Error("Missing mutator name");
  }
  const mutatorArgsJSONArray = localMetaFB.mutatorArgsJsonArray();
  assertNotNull(mutatorArgsJSONArray);
  return {
    type: 2,
    basisHash,
    mutationID: localMetaFB.mutationId().toFloat64(),
    mutatorName,
    mutatorArgsJSON: JSON.parse(decode2(mutatorArgsJSONArray)),
    originalHash: localMetaFB.originalHash()
  };
}
function snapshotMetaFromFlatbuffer(fb, basisHash) {
  const snapshotMetaFB = fb.typed(new SnapshotMeta());
  const cookieJSONArray = snapshotMetaFB.cookieJsonArray();
  assertNotNull(cookieJSONArray);
  return {
    type: 3,
    basisHash,
    lastMutationID: snapshotMetaFB.lastMutationId().toFloat64(),
    cookieJSON: JSON.parse(decode2(cookieJSONArray))
  };
}

// src/resolver.ts
function resolver() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

// src/rw-lock.ts
var Lock = class {
  constructor() {
    this._lockP = null;
  }
  async lock() {
    const previous = this._lockP;
    const { promise, resolve } = resolver();
    this._lockP = promise;
    await previous;
    return resolve;
  }
  withLock(f) {
    return run(this.lock(), f);
  }
};
var RWLock = class {
  constructor() {
    this._lock = new Lock();
    this._writeP = null;
    this._readP = [];
  }
  read() {
    return this._lock.withLock(async () => {
      await this._writeP;
      const { promise, resolve } = resolver();
      this._readP.push(promise);
      return resolve;
    });
  }
  withRead(f) {
    return run(this.read(), f);
  }
  async write() {
    return await this._lock.withLock(async () => {
      await this._writeP;
      await Promise.all(this._readP);
      const { promise, resolve } = resolver();
      this._writeP = promise;
      this._readP = [];
      return resolve;
    });
  }
  withWrite(f) {
    return run(this.write(), f);
  }
};
async function run(p, f) {
  const release = await p;
  try {
    return await f();
  } finally {
    release();
  }
}

// src/db/index.ts
var Index = class {
  constructor(meta, map) {
    this._rwLock = new RWLock();
    this.meta = meta;
    this._map = map;
  }
  async withMap(dagRead, cb) {
    if (!this._map) {
      await this._rwLock.withWrite(async () => {
        return this._map = await ProllyMap.load(this.meta.valueHash, dagRead);
      });
    }
    return this._rwLock.withRead(() => cb(this._map));
  }
  flush(write) {
    return this._rwLock.withWrite(() => {
      if (this._map) {
        return this._map.flush(write);
      }
      return this.meta.valueHash;
    });
  }
  clear() {
    return this._rwLock.withWrite(() => {
      this._map = new ProllyMap([]);
    });
  }
};
function indexValue(index, op, key, val, jsonPointer) {
  for (const entry of getIndexKeys(key, val, jsonPointer)) {
    switch (op) {
      case IndexOperation.Add:
        index.put(entry, val);
        break;
      case IndexOperation.Remove:
        index.del(entry);
        break;
    }
  }
}
function getIndexKeys(primary, value, jsonPointer) {
  const target = evaluateJSONPointer(value, jsonPointer);
  if (target === void 0) {
    throw new Error(`No value at path: ${jsonPointer}`);
  }
  const values = [];
  if (Array.isArray(target)) {
    target.forEach((v) => values.push(v));
  } else {
    values.push(target);
  }
  const strings = [];
  for (const value2 of values) {
    if (typeof value2 === "string") {
      strings.push(value2);
    } else {
      throw new Error("Unsupported target type");
    }
  }
  return strings.map((secondary) => encodeIndexKey([secondary, primary]));
}
var KEY_VERSION_0 = "\0";
var KEY_SEPARATOR = "\0";
function encodeIndexKey(indexKey) {
  const secondary = indexKey[0];
  const primary = indexKey[1];
  if (secondary.includes("\0")) {
    throw new Error("Secondary key cannot contain null byte");
  }
  return KEY_VERSION_0 + secondary + KEY_SEPARATOR + primary;
}
function encodeIndexScanKey(secondary, primary, exclusive) {
  let k = encodeIndexKey([secondary, primary || ""]);
  let smallestLegalValue = "\0";
  if (primary === void 0) {
    k = k.slice(0, k.length - 1);
    smallestLegalValue = "";
  }
  if (exclusive) {
    k += smallestLegalValue;
  }
  return k;
}
function decodeIndexKey(encodedIndexKey) {
  if (encodedIndexKey[0] !== KEY_VERSION_0) {
    throw new Error("Invalid version");
  }
  const versionLen = KEY_VERSION_0.length;
  const separatorLen = KEY_SEPARATOR.length;
  const separatorOffset = encodedIndexKey.indexOf(KEY_SEPARATOR, versionLen);
  if (separatorOffset === -1) {
    throw new Error("Invalid formatting");
  }
  const secondary = encodedIndexKey.slice(versionLen, separatorOffset);
  const primary = encodedIndexKey.slice(separatorOffset + separatorLen);
  return [secondary, primary];
}
function evaluateJSONPointer(value, pointer) {
  function parseIndex(s) {
    if (s.startsWith("+") || s.startsWith("0") && s.length !== 1) {
      return void 0;
    }
    return parseInt(s, 10);
  }
  if (pointer === "") {
    return value;
  }
  if (!pointer.startsWith("/")) {
    return void 0;
  }
  const tokens = pointer.split("/").slice(1).map((x) => x.replace(/~1/g, "/").replace(/~0/g, "~"));
  let target = value;
  for (const token of tokens) {
    let targetOpt;
    if (Array.isArray(target)) {
      const i = parseIndex(token);
      if (i === void 0) {
        return void 0;
      }
      targetOpt = target[i];
    } else if (target === null) {
      return void 0;
    } else if (typeof target === "object") {
      target = target;
      targetOpt = target[token];
    }
    if (targetOpt === void 0) {
      return void 0;
    }
    target = targetOpt;
  }
  return target;
}
var IndexOperation;
(function(IndexOperation2) {
  IndexOperation2[IndexOperation2["Add"] = 0] = "Add";
  IndexOperation2[IndexOperation2["Remove"] = 1] = "Remove";
})(IndexOperation || (IndexOperation = {}));

// src/prolly/peek-iterator.ts
var PeekIterator = class {
  constructor(iter) {
    this._peeked = void 0;
    this._iter = iter;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    if (this._peeked !== void 0) {
      const p = this._peeked;
      this._peeked = void 0;
      return p;
    }
    return this._iter.next();
  }
  peek() {
    if (this._peeked !== void 0) {
      return this._peeked;
    }
    return this._peeked = this._iter.next();
  }
};

// src/db/iter-util.ts
function* takeWhile(fn, it) {
  for (const item of it) {
    if (fn(item)) {
      yield item;
    } else {
      break;
    }
  }
}
function* take(count, it) {
  for (const item of it) {
    if (count <= 0) {
      break;
    }
    yield item;
    --count;
  }
}

// src/db/scan.ts
var ScanResultType;
(function(ScanResultType2) {
  ScanResultType2[ScanResultType2["Error"] = 0] = "Error";
  ScanResultType2[ScanResultType2["Item"] = 1] = "Item";
})(ScanResultType || (ScanResultType = {}));
function* scan(map, opts) {
  const indexScan = opts.indexName !== void 0;
  for (const entry of scanRaw(map, opts)) {
    if (indexScan) {
      try {
        const decoded = decodeIndexKey(entry[0]);
        const secondary = decoded[0];
        const primary = decoded[1];
        yield {
          type: 1,
          item: {
            key: primary,
            secondaryKey: secondary,
            val: entry[1]
          }
        };
      } catch (e) {
        yield { type: 0, error: e };
      }
    } else {
      yield {
        type: 1,
        item: {
          key: entry[0],
          secondaryKey: "",
          val: entry[1]
        }
      };
    }
  }
}
function convert(source) {
  var _a2, _b, _c, _d;
  let prefix;
  if (source.prefix !== void 0) {
    if (source.indexName !== void 0) {
      prefix = encodeIndexScanKey(source.prefix, void 0, false);
    } else {
      prefix = source.prefix;
    }
  }
  let startKey;
  if (source.indexName !== void 0) {
    startKey = encodeIndexScanKey((_a2 = source.startSecondaryKey) != null ? _a2 : "", source.startKey === void 0 ? void 0 : source.startKey, (_b = source.startExclusive) != null ? _b : false);
  } else {
    let sk = (_c = source.startKey) != null ? _c : "";
    if ((_d = source.startExclusive) != null ? _d : false) {
      sk += "\0";
    }
    startKey = sk;
  }
  return {
    prefix,
    startKey,
    limit: source.limit,
    indexName: source.indexName
  };
}
function scanRaw(map, opts) {
  var _a2;
  const it = new PeekIterator(map.entries());
  const prefix = opts.prefix !== void 0 ? opts.prefix : "";
  let fromKey = prefix;
  const { startKey } = opts;
  if (startKey !== void 0) {
    if (startKey > fromKey) {
      fromKey = startKey;
    }
  }
  while (!it.peek().done) {
    const key = it.peek().value[0];
    if (key >= fromKey) {
      break;
    }
    it.next();
  }
  return take((_a2 = opts.limit) != null ? _a2 : Infinity, takeWhile((item) => item[0].startsWith(prefix), it));
}

// src/db/read.ts
var Read2 = class {
  constructor(dagRead, map, indexes) {
    this._dagRead = dagRead;
    this._map = map;
    this._indexes = indexes;
  }
  has(key) {
    return this._map.has(key);
  }
  get(key) {
    return this._map.get(key);
  }
  async scan(opts, callback) {
    const optsInternal = convert(opts);
    if (optsInternal.indexName !== void 0) {
      const name = optsInternal.indexName;
      const idx = this._indexes.get(name);
      if (idx === void 0) {
        throw new Error(`Unknown index name: ${name}`);
      }
      await idx.withMap(this._dagRead, (map) => {
        for (const item of scan(map, optsInternal)) {
          callback(item);
        }
      });
    } else {
      for (const item of scan(this._map, optsInternal)) {
        callback(item);
      }
    }
  }
  close() {
    this._dagRead.close();
  }
  asRead() {
    return this;
  }
};
var WhenceType;
(function(WhenceType2) {
  WhenceType2[WhenceType2["Head"] = 0] = "Head";
  WhenceType2[WhenceType2["Hash"] = 1] = "Hash";
})(WhenceType || (WhenceType = {}));
function whenceHead(name) {
  return {
    type: 0,
    name
  };
}
function whenceHash(hash) {
  return {
    type: 1,
    hash
  };
}
async function fromWhence(whence, dagRead) {
  const [, basis, map] = await readCommit(whence, dagRead);
  const indexex = readIndexes(basis);
  return new Read2(dagRead, map, indexex);
}
async function readCommit(whence, read) {
  let hash;
  switch (whence.type) {
    case 1:
      hash = whence.hash;
      break;
    case 0: {
      const h = await read.getHead(whence.name);
      if (h === void 0) {
        throw new Error(`Unknown head: ${whence.name}`);
      }
      hash = h;
      break;
    }
  }
  const commit = await Commit2.fromHash(hash, read);
  const map = await ProllyMap.load(commit.valueHash, read);
  return [hash, commit, map];
}
function readIndexes(commit) {
  const m = new Map();
  for (const index of commit.indexes) {
    m.set(index.definition.name, new Index(index, void 0));
  }
  return m;
}

// src/db/write.ts
var MetaType;
(function(MetaType2) {
  MetaType2[MetaType2["IndexChange"] = 0] = "IndexChange";
  MetaType2[MetaType2["Local"] = 1] = "Local";
  MetaType2[MetaType2["Snapshot"] = 2] = "Snapshot";
})(MetaType || (MetaType = {}));
var Write2 = class {
  constructor(dagWrite, map, basis, meta, indexes) {
    this._dagWrite = dagWrite;
    this.map = map;
    this._basis = basis;
    this._meta = meta;
    this.indexes = indexes;
  }
  static async newLocal(whence, mutatorName, mutatorArgs, originalHash, dagWrite) {
    const [, basis, map] = await readCommit(whence, dagWrite.read());
    const mutationID = basis.nextMutationID;
    const indexes = readIndexes(basis);
    return new Write2(dagWrite, map, basis, {
      type: 1,
      mutatorName,
      mutatorArgs,
      mutationID,
      originalHash
    }, indexes);
  }
  static async newSnapshot(whence, mutationID, cookie, dagWrite, indexes) {
    const [, basis, map] = await readCommit(whence, dagWrite.read());
    return new Write2(dagWrite, map, basis, { type: 2, lastMutationID: mutationID, cookie }, indexes);
  }
  static async newIndexChange(whence, dagWrite) {
    const [, basis, map] = await readCommit(whence, dagWrite.read());
    const lastMutationID = basis.mutationID;
    const indexes = readIndexes(basis);
    return new Write2(dagWrite, map, basis, { type: 0, lastMutationID }, indexes);
  }
  asRead() {
    return new Read2(this._dagWrite.read(), this.map, this.indexes);
  }
  isRebase() {
    return this._meta.type === 1 && this._meta.originalHash !== null;
  }
  async put(lc, key, val) {
    if (this._meta.type === 0) {
      throw new Error("Not allowed");
    }
    const oldVal = this.map.get(key);
    if (oldVal !== void 0) {
      await updateIndexes(lc, this.indexes, this._dagWrite, IndexOperation.Remove, key, oldVal);
    }
    await updateIndexes(lc, this.indexes, this._dagWrite, IndexOperation.Add, key, val);
    this.map.put(key, val);
  }
  async del(lc, key) {
    if (this._meta.type === 0) {
      throw new Error("Not allowed");
    }
    const oldVal = this.map.get(key);
    if (oldVal !== void 0) {
      await updateIndexes(lc, this.indexes, this._dagWrite, IndexOperation.Remove, key, oldVal);
    }
    this.map.del(key);
  }
  async clear() {
    if (this._meta.type === 0) {
      throw new Error("Not allowed");
    }
    this.map = new ProllyMap([]);
    const ps = [];
    for (const idx of this.indexes.values()) {
      ps.push(idx.clear());
    }
    await Promise.all(ps);
  }
  async createIndex(lc, name, keyPrefix, jsonPointer) {
    var _a2;
    if (this._meta.type === 1) {
      throw new Error("Not allowed");
    }
    const definition = {
      name,
      keyPrefix,
      jsonPointer
    };
    const index = this.indexes.get(name);
    if (index) {
      const oldDefintion = index.meta.definition;
      if (oldDefintion.name === name && oldDefintion.keyPrefix === keyPrefix && oldDefintion.jsonPointer === jsonPointer) {
        return;
      } else {
        throw new Error("Index exists with different definition");
      }
    }
    const indexMap = new ProllyMap([]);
    for (const entry of scanRaw(this.map, {
      prefix: keyPrefix,
      limit: void 0,
      startKey: void 0,
      indexName: void 0
    })) {
      try {
        indexValue(indexMap, IndexOperation.Add, entry[0], entry[1], jsonPointer);
      } catch (e) {
        (_a2 = lc.info) == null ? void 0 : _a2.call(lc, "Not indexing value", entry[1], ":", e);
      }
    }
    this.indexes.set(name, new Index({
      definition,
      valueHash: ""
    }, indexMap));
  }
  async dropIndex(name) {
    if (this._meta.type === 1) {
      throw new Error("Not allowed");
    }
    if (!this.indexes.delete(name)) {
      throw new Error(`No such index: ${name}`);
    }
  }
  async commit(headName) {
    const [hash] = await this.commitWithChangedKeys(headName, false);
    return hash;
  }
  async commitWithChangedKeys(headName, generateChangedKeys) {
    const valueChangedKeys = generateChangedKeys ? this.map.pendingChangedKeys() : [];
    const valueHash = await this.map.flush(this._dagWrite);
    const indexRecords = [];
    const keyChanges = new Map();
    if (valueChangedKeys.length > 0) {
      keyChanges.set("", valueChangedKeys);
    }
    for (const [name, index] of this.indexes) {
      {
        const indexChangedKeys = await index.withMap(this._dagWrite.read(), (map) => map.pendingChangedKeys());
        if (indexChangedKeys.length > 0) {
          keyChanges.set(name, indexChangedKeys);
        }
      }
      const valueHash2 = await index.flush(this._dagWrite);
      const indexRecord = {
        definition: index.meta.definition,
        valueHash: valueHash2
      };
      indexRecords.push(indexRecord);
    }
    const basisHash = this._basis ? this._basis.chunk.hash : null;
    let commit;
    const meta = this._meta;
    switch (meta.type) {
      case 1: {
        const { mutationID, mutatorName, mutatorArgs, originalHash } = meta;
        commit = await newLocal(basisHash, mutationID, mutatorName, mutatorArgs, originalHash, valueHash, indexRecords);
        break;
      }
      case 2: {
        const { lastMutationID, cookie } = meta;
        commit = await newSnapshot(basisHash, lastMutationID, cookie, valueHash, indexRecords);
        break;
      }
      case 0: {
        const { lastMutationID } = meta;
        if (this._basis !== void 0) {
          if (this._basis.mutationID !== lastMutationID) {
            throw new Error("Index change must not change mutationID");
          }
          if (this._basis.valueHash !== valueHash) {
            throw new Error("Index change must not change valueHash");
          }
        }
        commit = await newIndexChange(basisHash, lastMutationID, valueHash, indexRecords);
        break;
      }
    }
    await this._dagWrite.putChunk(commit.chunk);
    await this._dagWrite.setHead(headName, commit.chunk.hash);
    await this._dagWrite.commit();
    return [commit.chunk.hash, keyChanges];
  }
  close() {
    this._dagWrite.close();
  }
};
async function updateIndexes(lc, indexes, dagWrite, op, key, val) {
  for (const idx of indexes.values()) {
    if (key.startsWith(idx.meta.definition.keyPrefix)) {
      await idx.withMap(dagWrite.read(), (map) => {
        var _a2;
        try {
          indexValue(map, op, key, val, idx.meta.definition.jsonPointer);
        } catch (e) {
          (_a2 = lc.info) == null ? void 0 : _a2.call(lc, "Not indexing value", val, ":", e);
        }
      });
    }
  }
}
async function initDB(dagWrite, headName) {
  const w = new Write2(dagWrite, new ProllyMap([]), void 0, { type: 2, lastMutationID: 0, cookie: null }, new Map());
  return await w.commit(headName);
}

// src/db/root.ts
function getRoot(store, headName) {
  return store.withRead(async (read) => {
    const head = await read.getHead(headName);
    if (head === void 0) {
      throw new Error(`No head found for ${headName}`);
    }
    return head;
  });
}

// src/sync/uuid.ts
function uuid() {
  const numbers = new Uint8Array(36);
  crypto.getRandomValues(numbers);
  return uuidFromNumbers(numbers);
}
var UuidElements;
(function(UuidElements2) {
  UuidElements2[UuidElements2["Random09AF"] = 0] = "Random09AF";
  UuidElements2[UuidElements2["Random89AB"] = 1] = "Random89AB";
  UuidElements2[UuidElements2["Hyphen"] = 2] = "Hyphen";
  UuidElements2[UuidElements2["Version"] = 3] = "Version";
})(UuidElements || (UuidElements = {}));
var UUID_V4_FORMAT = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  0,
  2,
  3,
  0,
  0,
  0,
  2,
  1,
  0,
  0,
  0,
  2,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];
function uuidFromNumbers(random_numbers) {
  return UUID_V4_FORMAT.map((kind, i) => {
    switch (kind) {
      case 0:
        return (random_numbers[i] & 15).toString(16);
      case 1:
        return ((random_numbers[i] & 3) + 8).toString(16);
      case 3:
        return "4";
      case 2:
        return "-";
    }
  }).join("");
}

// src/sync/client-id.ts
var CID_KEY = "sys/cid";
async function init(store) {
  const cid = await store.withRead((r) => r.get(CID_KEY));
  if (cid !== void 0) {
    assertString(cid);
    return cid;
  }
  const uuid2 = uuid();
  await writeClientID(store, uuid2);
  return uuid2;
}
function writeClientID(s, uuid2) {
  return s.withWrite(async (wt) => {
    await wt.put(CID_KEY, uuid2);
    await wt.commit();
  });
}

// src/repm-invoker.ts
function assertHTTPRequestInfo(v) {
  if (typeof v !== "object" || v === null || typeof v.httpStatusCode !== "number" || typeof v.errorMessage !== "string") {
    throw new Error("Invalid HTTPRequestInfo");
  }
}

// src/sync/js-request.ts
function callJSRequest(func, url, body, auth, requestID) {
  const init3 = {
    headers: {
      "Content-type": "application/json",
      "Authorization": auth,
      "X-Replicache-RequestID": requestID
    },
    body: JSON.stringify(body),
    method: "POST"
  };
  const request = new Request(url, init3);
  return func(request);
}

// src/sync/sync-head-name.ts
var SYNC_HEAD_NAME = "sync";

// src/sync/patch.ts
async function apply(lc, dbWrite, patch2) {
  for (const p of patch2) {
    switch (p.op) {
      case "put": {
        await dbWrite.put(lc, p.key, p.value);
        break;
      }
      case "del":
        await dbWrite.del(lc, p.key);
        break;
      case "clear":
        await dbWrite.clear();
        break;
    }
  }
}

// src/sync/pull.ts
var PULL_VERSION = 0;
async function beginPull(clientID, beginPullReq, puller, requestID, store, lc) {
  var _a2, _b;
  const { pullURL, pullAuth, schemaVersion } = beginPullReq;
  const baseSnapshot = await store.withRead(async (dagRead) => {
    const mainHeadHash = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (!mainHeadHash) {
      throw new Error("Internal no main head found");
    }
    return await Commit2.baseSnapshot(mainHeadHash, dagRead);
  });
  const [baseLastMutationID, baseCookie] = Commit2.snapshotMetaParts(baseSnapshot);
  const pullReq = {
    clientID,
    cookie: baseCookie,
    lastMutationID: baseSnapshot.mutationID,
    pullVersion: PULL_VERSION,
    schemaVersion
  };
  (_a2 = lc.debug) == null ? void 0 : _a2.call(lc, "Starting pull...");
  const pullStart = Date.now();
  const [pullResp, httpRequestInfo] = await puller.pull(pullReq, pullURL, pullAuth, requestID);
  (_b = lc.debug) == null ? void 0 : _b.call(lc, `...Pull ${pullResp ? "complete" : "failed"} in `, Date.now() - pullStart, "ms");
  if (!pullResp) {
    return {
      httpRequestInfo,
      syncHead: "",
      requestID
    };
  }
  return await store.withWrite(async (dagWrite) => {
    var _a3, _b2, _c;
    const dagRead = dagWrite.read();
    const mainHeadPostPull = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (mainHeadPostPull === void 0) {
      throw new Error("Main head disappeared");
    }
    const baseSnapshotPostPull = await Commit2.baseSnapshot(mainHeadPostPull, dagRead);
    if (baseSnapshot.chunk.hash !== baseSnapshotPostPull.chunk.hash) {
      throw new Error("Overlapping syncs JSLogInfo");
    }
    if (pullResp.lastMutationID < baseLastMutationID) {
      throw new Error(`base lastMutationID ${baseLastMutationID} is > than client view lastMutationID ${pullResp.lastMutationID}; ignoring client view`);
    }
    if (pullResp.patch.length === 0 && pullResp.lastMutationID === baseLastMutationID && ((_a3 = pullResp.cookie) != null ? _a3 : null) === baseCookie) {
      const syncHead = "";
      return {
        httpRequestInfo,
        syncHead,
        requestID
      };
    }
    const chain = await Commit2.chain(mainHeadPostPull, dagRead);
    const indexRecords = (_b2 = chain.find((c) => c.mutationID <= pullResp.lastMutationID)) == null ? void 0 : _b2.indexes;
    if (!indexRecords) {
      throw new Error("Internal invalid chain");
    }
    const dbWrite = await Write2.newSnapshot(whenceHash(baseSnapshot.chunk.hash), pullResp.lastMutationID, (_c = pullResp.cookie) != null ? _c : null, dagWrite, new Map());
    for (const m of indexRecords) {
      const def = m.definition;
      await dbWrite.createIndex(lc, def.name, def.keyPrefix, def.jsonPointer);
    }
    await apply(lc, dbWrite, pullResp.patch);
    const commitHash = await dbWrite.commit(SYNC_HEAD_NAME);
    return {
      httpRequestInfo: {
        httpStatusCode: 200,
        errorMessage: ""
      },
      syncHead: commitHash,
      requestID
    };
  });
}
async function maybeEndPull(store, lc, maybeEndPullReq) {
  return await store.withWrite(async (dagWrite) => {
    const dagRead = dagWrite.read();
    const syncHeadHash = await dagRead.getHead(SYNC_HEAD_NAME);
    if (syncHeadHash === void 0) {
      throw new Error("Missing sync head");
    }
    if (syncHeadHash !== maybeEndPullReq.syncHead) {
      throw new Error("Wrong sync head JSLogInfo");
    }
    const syncSnapshot = await Commit2.baseSnapshot(syncHeadHash, dagRead);
    const mainHeadHash = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (mainHeadHash === void 0) {
      throw new Error("Missing main head");
    }
    const mainSnapshot = await Commit2.baseSnapshot(mainHeadHash, dagRead);
    const meta = syncSnapshot.meta;
    const syncSnapshotBasis = meta.basisHash;
    if (syncSnapshot === null) {
      throw new Error("Sync snapshot with no basis");
    }
    if (syncSnapshotBasis !== mainSnapshot.chunk.hash) {
      throw new Error("Overlapping syncs JSLogInfo");
    }
    let pending = await Commit2.localMutations(mainHeadHash, dagRead);
    const syncHead = await Commit2.fromHash(syncHeadHash, dagRead);
    pending = pending.filter((c) => c.mutationID > syncHead.mutationID);
    pending.reverse();
    const changedKeys = new Map();
    if (pending.length > 0) {
      const replayMutations = [];
      for (const c of pending) {
        let name;
        let args;
        if (c.isLocal()) {
          const lm = c.meta;
          name = lm.mutatorName;
          args = lm.mutatorArgsJSON;
        } else {
          throw new Error("pending mutation is not local");
        }
        replayMutations.push({
          id: c.mutationID,
          name,
          args: deepClone(args),
          original: c.chunk.hash
        });
      }
      return {
        syncHead: syncHeadHash,
        replayMutations,
        changedKeys
      };
    }
    const mainHead = await Commit2.fromHash(mainHeadHash, dagRead);
    const [mainHeadMap, syncHeadMap] = await Promise.all([
      ProllyMap.load(mainHead.valueHash, dagRead),
      ProllyMap.load(syncHead.valueHash, dagRead)
    ]);
    const valueChangedKeys = ProllyMap.changedKeys(mainHeadMap, syncHeadMap);
    if (valueChangedKeys.length > 0) {
      changedKeys.set("", valueChangedKeys);
    }
    await addChangedKeysForIndexes(mainHead, syncHead, dagRead, changedKeys);
    await Promise.all([
      dagWrite.setHead(DEFAULT_HEAD_NAME, syncHeadHash),
      dagWrite.removeHead(SYNC_HEAD_NAME)
    ]);
    await dagWrite.commit();
    if (lc.debug) {
      const [oldLastMutationID, oldCookie] = Commit2.snapshotMetaParts(mainSnapshot);
      const [newLastMutationID, newCookie] = Commit2.snapshotMetaParts(syncSnapshot);
      lc.debug("Successfully pulled new snapshot w/last_mutation_id={} (prev. {}), cookie={} (prev. {}), and value_hash={} (prev. {}).", newLastMutationID, oldLastMutationID, newCookie, oldCookie, syncHead.valueHash, mainSnapshot.valueHash);
    }
    return {
      syncHead: syncHeadHash,
      replayMutations: [],
      changedKeys
    };
  });
}
var JSPuller = class {
  constructor(puller) {
    this._puller = puller;
  }
  async pull(pullReq, url, auth, requestID) {
    const { clientID, cookie, lastMutationID, pullVersion, schemaVersion } = pullReq;
    const body = { clientID, cookie, lastMutationID, pullVersion, schemaVersion };
    try {
      const res = await callJSRequest(this._puller, url, body, auth, requestID);
      assertResult(res);
      return [res.response, res.httpRequestInfo];
    } catch (e) {
      throw new PullError(e);
    }
  }
};
function assertResult(v) {
  if (typeof v !== "object" || v === null) {
    throw new Error("Expected result to be an object");
  }
  if (v.response !== void 0) {
    assertPullResponse(v.response);
  }
  assertHTTPRequestInfo(v.httpRequestInfo);
}
async function addChangedKeysForIndexes(mainCommit, syncCommit, read, changedKeysMap) {
  function allKeys(oldMap) {
    return Array.from(oldMap.entries(), (entry) => entry[0]);
  }
  const oldIndexes = readIndexes(mainCommit);
  const newIndexes = readIndexes(syncCommit);
  for (const [oldIndexName, oldIndex] of oldIndexes) {
    await oldIndex.withMap(read, async (oldMap) => {
      const newIndex = newIndexes.get(oldIndexName);
      if (newIndex !== void 0) {
        const changedKeys = await newIndex.withMap(read, async (newMap) => {
          return ProllyMap.changedKeys(oldMap, newMap);
        });
        newIndexes.delete(oldIndexName);
        if (changedKeys.length > 0) {
          changedKeysMap.set(oldIndexName, changedKeys);
        }
      } else {
        const changedKeys = allKeys(oldMap);
        if (changedKeys.length > 0) {
          changedKeysMap.set(oldIndexName, changedKeys);
        }
      }
    });
  }
  for (const [newIndexName, newIndex] of newIndexes) {
    await newIndex.withMap(read, async (newMap) => {
      const changedKeys = allKeys(newMap);
      if (changedKeys.length > 0) {
        changedKeysMap.set(newIndexName, allKeys(newMap));
      }
    });
  }
}

// src/sync/push.ts
var PUSH_VERSION = 0;
function convert2(lm) {
  return {
    id: lm.mutationID,
    name: lm.mutatorName,
    args: lm.mutatorArgsJSON
  };
}
async function push(requestID, store, lc, clientID, pusher, req) {
  var _a2, _b;
  const pending = await store.withRead(async (dagRead) => {
    const mainHeadHash = await dagRead.getHead(DEFAULT_HEAD_NAME);
    if (!mainHeadHash) {
      throw new Error("Internal no main head");
    }
    return await Commit2.localMutations(mainHeadHash, dagRead);
  });
  pending.reverse();
  let httpRequestInfo = void 0;
  if (pending.length > 0) {
    const pushMutations = [];
    for (const commit of pending) {
      if (commit.isLocal()) {
        pushMutations.push(convert2(commit.meta));
      } else {
        throw new Error("Internal non local pending commit");
      }
    }
    const pushReq = {
      clientID,
      mutations: pushMutations,
      pushVersion: PUSH_VERSION,
      schemaVersion: req.schemaVersion
    };
    (_a2 = lc.debug) == null ? void 0 : _a2.call(lc, "Starting push...");
    const pushStart = Date.now();
    const reqInfo = await pusher.push(pushReq, req.pushURL, req.pushAuth, requestID);
    httpRequestInfo = reqInfo;
    (_b = lc.debug) == null ? void 0 : _b.call(lc, "...Push complete in ", Date.now() - pushStart, "ms");
  }
  return httpRequestInfo;
}
var JSPusher = class {
  constructor(pusher) {
    this._pusher = pusher;
  }
  async push(pushReq, url, auth, requestID) {
    const { clientID, mutations, pushVersion, schemaVersion } = pushReq;
    const body = { clientID, mutations, pushVersion, schemaVersion };
    try {
      const res = await callJSRequest(this._pusher, url, body, auth, requestID);
      assertHTTPRequestInfo(res);
      return res;
    } catch (e) {
      throw new PushError(e);
    }
  }
};

// src/sync/request-id.ts
var sessionID = "";
function getSessionID() {
  if (sessionID === "") {
    const buf = new Uint8Array(4);
    crypto.getRandomValues(buf);
    sessionID = Array.from(buf, (x) => x.toString(16)).join("");
  }
  return sessionID;
}
var REQUEST_COUNTERS = new Map();
function newRequestID(clientID) {
  let counter = REQUEST_COUNTERS.get(clientID);
  if (!counter) {
    REQUEST_COUNTERS.set(clientID, 0);
    counter = 0;
  } else {
    counter++;
    REQUEST_COUNTERS.set(clientID, counter);
  }
  return `${clientID}-${getSessionID()}-${counter}`;
}

// src/logger.ts
function getLogger(prefix, level) {
  const logger = {};
  const impl = (name) => (...args) => console[name](...prefix, ...args);
  switch (level) {
    case "debug":
      logger.debug = impl("debug");
    case "info":
      logger.info = impl("info");
    case "error":
      logger.error = impl("error");
  }
  return logger;
}
var LogContext = class {
  constructor(level = "info", s = "") {
    this.debug = void 0;
    this.info = void 0;
    this.error = void 0;
    this._s = s;
    const impl = (name) => (...args) => console[name](this._s, ...args);
    switch (level) {
      case "debug":
        this.debug = impl("debug");
      case "info":
        this.info = impl("info");
      case "error":
        this.error = impl("error");
    }
  }
  addContext(key, value) {
    return new LogContext(this._logLevel, `${this._s}${key}=${value} `);
  }
  get _logLevel() {
    return this.debug ? "debug" : this.info ? "info" : "error";
  }
};

// src/migrate/migrate-0-to-1.ts
var VERSION_KEY = "sys/storage-format-version";
async function currentVersion(read) {
  const v = await read.get(VERSION_KEY);
  if (v === void 0) {
    return 0;
  }
  assertNumber(v);
  return v;
}
async function setCurrentVersion(version, write) {
  return write.put(VERSION_KEY, version);
}
async function migrateClientID(write) {
  const v = await write.get(CID_KEY);
  if (v === void 0) {
    return;
  }
  assertUint8Array(v);
  const clientID = decode2(v);
  await write.put(CID_KEY, clientID);
}
async function migrateHead(name, write, pending) {
  const hash = await migrateHeadKeyValue(name, write, pending);
  if (hash !== void 0) {
    await migrateCommit(hash, write, pending);
  }
}
async function migrateHeadKeyValue(name, write, pending) {
  const key = headKey(name);
  if (pending.has(key)) {
    return void 0;
  }
  pending.add(key);
  const v = await write.get(key);
  if (v === void 0) {
    return void 0;
  }
  assertUint8Array(v);
  const ref = decode2(v);
  await write.put(key, ref);
  return ref;
}
function migrateWeakCommit(hash, write, pending) {
  return migrateMaybeWeakCommit(hash, write, pending, true);
}
async function migrateCommit(hash, write, pending) {
  return migrateMaybeWeakCommit(hash, write, pending, false);
}
async function migrateMaybeWeakCommit(hash, write, pending, allowHashToBeWeak) {
  const key = chunkDataKey(hash);
  if (pending.has(key)) {
    return;
  }
  pending.add(key);
  const buf = await write.get(chunkDataKey(hash));
  if (buf === void 0 && allowHashToBeWeak) {
    return;
  }
  assertUint8Array(buf);
  const ps = [];
  ps.push(migrateMetaKeyValue(hash, write, pending), migrateRefCountKeyValue(hash, write, pending));
  const commitData = commitDataFromFlatbuffer(buf);
  const commit = new Commit2(Chunk.new(commitData, []));
  ps.push(migrateProllyMap(commit.valueHash, write, pending));
  if (commit.meta.basisHash) {
    ps.push(migrateWeakCommit(commit.meta.basisHash, write, pending));
  }
  if (commit.isLocal() && commit.meta.originalHash) {
    ps.push(migrateWeakCommit(commit.meta.originalHash, write, pending));
  }
  for (const index of commit.indexes) {
    ps.push(migrateProllyMap(index.valueHash, write, pending));
  }
  ps.push(write.put(key, commitData));
  await Promise.all(ps);
}
async function migrateMetaKeyValue(ref, write, pending) {
  const key = chunkMetaKey(ref);
  if (pending.has(key)) {
    return;
  }
  pending.add(key);
  const v = await write.get(key);
  if (v === void 0) {
    return;
  }
  assertUint8Array(v);
  const refs = metaFromFlatbuffer(v);
  await write.put(chunkMetaKey(ref), refs);
}
async function migrateRefCountKeyValue(hash, write, pending) {
  const key = chunkRefCountKey(hash);
  if (pending.has(key)) {
    return;
  }
  pending.add(key);
  const v = await write.get(key);
  if (v === void 0) {
    return;
  }
  assertUint8Array(v);
  const count = fromLittleEndian(v);
  await write.put(chunkRefCountKey(hash), count);
}
async function migrateProllyMap(hash, write, pending) {
  const key = chunkDataKey(hash);
  if (pending.has(key)) {
    return;
  }
  pending.add(key);
  const v = await write.get(key);
  assertUint8Array(v);
  const entries = entriesFromFlatbuffer(v);
  await Promise.all([
    write.put(chunkDataKey(hash), entries),
    migrateRefCountKeyValue(hash, write, pending)
  ]);
}
async function migrate0to1(write) {
  const pending = new Set();
  await Promise.all([
    migrateClientID(write),
    migrateHead(DEFAULT_HEAD_NAME, write, pending),
    migrateHead(SYNC_HEAD_NAME, write, pending),
    setCurrentVersion(1, write)
  ]);
}

// src/migrate/migrate.ts
async function migrate(store) {
  const v = await store.withRead(currentVersion);
  if (v === 0) {
    await store.withWrite(async (w) => {
      await migrate0to1(w);
      await w.commit();
    });
  }
}

// src/embed/connection.ts
var isTesting = false;
var testLog = [];
function logCall(name, ...args) {
  testLog.push({ name, args });
}
var connections = new Map();
var transactionCounter = 0;
function getConnection(dbName) {
  const connection = connections.get(dbName);
  if (!connection) {
    throw new Error(`Database "${dbName}" is not open`);
  }
  return connection;
}
var transactionsMap = new Map();
function getTransaction(transactionID, map) {
  const val = map.get(transactionID);
  if (!val) {
    throw new Error(`Transaction ${transactionID} is not open`);
  }
  return val;
}
function getWriteTransaction(transactionID, map) {
  const { txn, lc } = getTransaction(transactionID, map);
  if (txn instanceof Read2) {
    throw new Error("Transaction is read-only");
  }
  return { txn, lc };
}
async function open(dbName, kvStore, level) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("open", dbName);
  const lc = new LogContext(level).addContext("db", dbName);
  const lc2 = lc.addContext("rpc", "open");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", kvStore, level);
  if (dbName === "") {
    throw new Error("dbName must be non-empty");
  }
  if (connections.has(dbName)) {
    throw new Error(`Database "${dbName}" has already been opened. Please close it before opening it again`);
  }
  await migrate(kvStore);
  const dagStore = new Store(kvStore);
  const clientID = await init(kvStore);
  await init2(dagStore);
  connections.set(dbName, { store: dagStore, clientID, lc });
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", clientID);
  return clientID;
}
async function close(dbName) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("close", dbName);
  const connection = connections.get(dbName);
  if (!connection) {
    return;
  }
  const lc = connection.lc.addContext("rpc", "close");
  (_a2 = lc.debug) == null ? void 0 : _a2.call(lc, "->");
  const { store } = connection;
  await store.close();
  connections.delete(dbName);
  (_b = lc.debug) == null ? void 0 : _b.call(lc, "<- elapsed=", Date.now() - start, "ms");
}
async function init2(dagStore) {
  await dagStore.withWrite(async (dagWrite) => {
    const head = await dagWrite.read().getHead(DEFAULT_HEAD_NAME);
    if (!head) {
      await initDB(dagWrite, DEFAULT_HEAD_NAME);
    }
  });
}
async function openReadTransaction(dbName) {
  isTesting && logCall("openReadTransaction", dbName);
  const { store, lc } = getConnection(dbName);
  return openReadTransactionImpl(lc.addContext("rpc", "openReadTransaction"), store, transactionsMap);
}
async function openWriteTransaction(dbName, name, args, rebaseOpts) {
  isTesting && logCall("openWriteTransaction", dbName, name, args, rebaseOpts);
  const { store, lc } = getConnection(dbName);
  return openWriteTransactionImpl(lc.addContext("rpc", "openWriteTransaction"), store, transactionsMap, name, args, rebaseOpts);
}
async function openWriteTransactionImpl(lc, store, transactions, name, args, rebaseOpts) {
  var _a2, _b, _c, _d;
  const start = Date.now();
  (_a2 = lc.debug) == null ? void 0 : _a2.call(lc, "->", store, transactions, name, args, rebaseOpts);
  let txn;
  const lockStart = Date.now();
  (_b = lc.debug) == null ? void 0 : _b.call(lc, "Waiting for write lock...");
  const dagWrite = await store.write();
  (_c = lc.debug) == null ? void 0 : _c.call(lc, "...Write lock acquired in", Date.now() - lockStart, "ms");
  let ok = false;
  try {
    let whence;
    let originalHash = null;
    if (rebaseOpts === void 0) {
      whence = whenceHead(DEFAULT_HEAD_NAME);
    } else {
      await validateRebase(rebaseOpts, dagWrite.read(), name, args);
      whence = whenceHash(rebaseOpts.basis);
      originalHash = rebaseOpts.original;
    }
    txn = await Write2.newLocal(whence, name, args, originalHash, dagWrite);
    ok = true;
  } finally {
    if (!ok) {
      dagWrite.close();
    }
  }
  const transactionID = transactionCounter++;
  transactions.set(transactionID, { txn, lc });
  (_d = lc.debug) == null ? void 0 : _d.call(lc, "<- elapsed=", Date.now() - start, "ms, result=", transactionID);
  return transactionID;
}
async function openReadTransactionImpl(lc, store, transactions) {
  var _a2, _b;
  const start = Date.now();
  (_a2 = lc.debug) == null ? void 0 : _a2.call(lc, "->", store, transactions);
  const dagRead = await store.read();
  const txn = await fromWhence(whenceHead(DEFAULT_HEAD_NAME), dagRead);
  const transactionID = transactionCounter++;
  transactions.set(transactionID, { txn, lc });
  (_b = lc.debug) == null ? void 0 : _b.call(lc, "<- elapsed=", Date.now() - start, "ms, result=", transactionID);
  return transactionID;
}
async function openIndexTransaction(dbName) {
  var _a2, _b, _c, _d;
  const start = Date.now();
  isTesting && logCall("openIndexTransaction", dbName);
  const transactionID = transactionCounter++;
  const connection = getConnection(dbName);
  const lc = connection.lc.addContext("rpc", "openIndexTransaction").addContext("txid", transactionID);
  (_a2 = lc.debug) == null ? void 0 : _a2.call(lc, "->");
  const { store } = connection;
  let txn;
  const lockStart = Date.now();
  (_b = lc.debug) == null ? void 0 : _b.call(lc, "Waiting for write lock...");
  const dagWrite = await store.write();
  (_c = lc.debug) == null ? void 0 : _c.call(lc, "...Write lock acquired in", Date.now() - lockStart, "ms");
  let ok = false;
  try {
    txn = await Write2.newIndexChange(whenceHead(DEFAULT_HEAD_NAME), dagWrite);
    ok = true;
  } finally {
    if (!ok) {
      dagWrite.close();
    }
  }
  transactionsMap.set(transactionID, { txn, lc });
  (_d = lc.debug) == null ? void 0 : _d.call(lc, "<- elapsed=", Date.now() - start, "ms, result=", transactionID);
  return transactionID;
}
async function validateRebase(opts, dagRead, mutatorName, _args) {
  const syncHeadHash = await dagRead.getHead(SYNC_HEAD_NAME);
  if (syncHeadHash !== opts.basis) {
    throw new Error(`WrongSyncHeadJSLogInfo: sync head is ${syncHeadHash}, transaction basis is ${opts.basis}`);
  }
  const [, original] = await readCommit(whenceHash(opts.original), dagRead);
  if (original.isLocal()) {
    const lm = original.meta;
    if (lm.mutatorName !== mutatorName) {
      throw new Error(`Inconsistent mutator: original: ${lm.mutatorName}, request: ${mutatorName}`);
    }
  } else {
    throw new Error("Internal programmer error: Commit is not a local commit");
  }
  const [, basis] = await readCommit(whenceHash(opts.basis), dagRead);
  if (basis.nextMutationID !== original.mutationID) {
    throw new Error(`Inconsistent mutation ID: original: ${original.mutationID}, next: ${basis.nextMutationID}`);
  }
}
async function commitTransaction(transactionID, generateChangedKeys) {
  isTesting && logCall("commitTransaction", transactionID, generateChangedKeys);
  return commitImpl(transactionsMap, transactionID, generateChangedKeys);
}
async function commitImpl(transactionsMap2, transactionID, generateChangedKeys) {
  var _a2, _b;
  const start = Date.now();
  const { txn, lc } = getWriteTransaction(transactionID, transactionsMap2);
  const lc2 = lc.addContext("rpc", "commitTransaction");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", generateChangedKeys);
  transactionsMap2.delete(transactionID);
  if (txn instanceof Read2) {
    throw new Error("Transaction is read-only");
  }
  const headName = txn.isRebase() ? SYNC_HEAD_NAME : DEFAULT_HEAD_NAME;
  const [hash, changedKeys] = await txn.commitWithChangedKeys(headName, generateChangedKeys);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result.ref=", hash, ", result.changedKeys=", changedKeys);
  return { ref: hash, changedKeys };
}
async function closeTransaction(transactionID) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("closeTransaction", transactionID);
  const { txn, lc } = getTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "closeTransaction");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->");
  txn.close();
  transactionsMap.delete(transactionID);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms");
}
async function getRoot2(dbName, headName = DEFAULT_HEAD_NAME) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("getRoot", dbName, headName);
  const { store, lc } = getConnection(dbName);
  const lc2 = lc.addContext("rpc", "getRoot");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", headName);
  const result = await getRoot(store, headName);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", result);
  return result;
}
function has(transactionID, key) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("has", transactionID, key);
  const { txn, lc } = getTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "has");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", key);
  const result = txn.asRead().has(key);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", result);
  return result;
}
function get(transactionID, key, shouldClone) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("get", transactionID, key);
  const { txn, lc } = getTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "get");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", key);
  const value = txn.asRead().get(key);
  const result = value && (shouldClone ? deepClone(value) : value);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", result);
  return result;
}
async function scan2(transactionID, scanOptions, receiver, shouldClone) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("scan", transactionID, scanOptions, receiver);
  const { txn, lc } = getTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "scan");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", scanOptions);
  await txn.asRead().scan(scanOptions, (sr) => {
    if (sr.type === ScanResultType.Error) {
      throw sr.error;
    }
    const { val, key, secondaryKey } = sr.item;
    receiver(key, secondaryKey, shouldClone ? deepClone(val) : val);
  });
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms");
}
async function put(transactionID, key, value) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("put", transactionID, key, value);
  const { txn, lc } = getWriteTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "put");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", key, value);
  await txn.put(lc2, key, deepClone(value));
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms");
}
async function del(transactionID, key) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("del", transactionID, key);
  const { txn, lc } = getWriteTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "del");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", key);
  const had = await txn.asRead().has(key);
  await txn.del(lc, key);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", had);
  return had;
}
async function createIndex(transactionID, name, keyPrefix, jsonPointer) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("createIndex", transactionID, name, keyPrefix, jsonPointer);
  const { txn, lc } = getWriteTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "createIndex");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", name, keyPrefix, jsonPointer);
  await txn.createIndex(lc, name, keyPrefix, jsonPointer);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms");
}
async function dropIndex(transactionID, name) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("dropIndex", transactionID, name);
  const { txn, lc } = getWriteTransaction(transactionID, transactionsMap);
  const lc2 = lc.addContext("rpc", "dropIndex");
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", name);
  await txn.dropIndex(name);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms");
}
async function maybeEndPull2(dbName, requestID, syncHead) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("maybeEndPull", dbName, requestID, syncHead);
  const connection = getConnection(dbName);
  const { store, lc } = connection;
  const lc2 = lc.addContext("rpc", "maybeEndPull").addContext("request_id", requestID);
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", syncHead);
  const result = await maybeEndPull(store, lc2, { requestID, syncHead });
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", result);
  return result;
}
async function tryPush(dbName, req) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("tryPush", dbName, req);
  const connection = getConnection(dbName);
  const { clientID, store, lc } = connection;
  const requestID = newRequestID(clientID);
  const lc2 = lc.addContext("rpc", "tryPush").addContext("request_id", requestID);
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", req);
  const jsPusher = new JSPusher(req.pusher);
  const result = await push(requestID, store, lc2, clientID, jsPusher, req);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", result);
  return result;
}
async function beginPull2(dbName, req) {
  var _a2, _b;
  const start = Date.now();
  isTesting && logCall("beginPull", dbName, req);
  const connection = getConnection(dbName);
  const { clientID, store, lc } = connection;
  const requestID = newRequestID(clientID);
  const lc2 = lc.addContext("rpc", "beginPull").addContext("request_id", requestID);
  (_a2 = lc2.debug) == null ? void 0 : _a2.call(lc2, "->", req);
  const jsPuller = new JSPuller(req.puller);
  const result = await beginPull(clientID, req, jsPuller, requestID, store, lc2);
  (_b = lc2.debug) == null ? void 0 : _b.call(lc2, "<- elapsed=", Date.now() - start, "ms, result=", result);
  return result;
}

// src/scan-iterator.ts
var VALUE = 0;
var KEY = 1;
var ENTRY = 2;
var ScanResult2 = class {
  constructor(...args) {
    this._args = args;
  }
  [Symbol.asyncIterator]() {
    return this.values();
  }
  values() {
    return new AsyncIterableIteratorToArrayWrapper(this._newIterator(VALUE));
  }
  keys() {
    return new AsyncIterableIteratorToArrayWrapper(this._newIterator(KEY));
  }
  entries() {
    return new AsyncIterableIteratorToArrayWrapper(this._newIterator(ENTRY));
  }
  toArray() {
    return this.values().toArray();
  }
  _newIterator(kind) {
    return scanIterator(kind, ...this._args);
  }
};
var AsyncIterableIteratorToArrayWrapper = class {
  constructor(it) {
    this._it = it;
    this.next = (v) => it.next(v);
    this.return = it.return ? (v) => it.return(v) : void 0;
    this.throw = it.throw ? (v) => it.throw(v) : void 0;
  }
  toArray() {
    return asyncIterableToArray(this._it);
  }
  [Symbol.asyncIterator]() {
    return this._it[Symbol.asyncIterator]();
  }
};
async function* scanIterator(kind, options, getTransaction2, shouldCloseTransaction, shouldClone) {
  const transaction = await getTransaction2();
  throwIfClosed(transaction);
  try {
    const items = await load(kind, options, transaction.id, shouldClone);
    for (const item of items) {
      yield item;
    }
  } finally {
    if (shouldCloseTransaction && !transaction.closed) {
      transaction.close();
    }
  }
}
async function load(kind, options, transactionID, shouldClone) {
  const items = [];
  const key = (primaryKey, secondaryKey) => (options == null ? void 0 : options.indexName) !== void 0 ? [secondaryKey, primaryKey] : primaryKey;
  const receiver = (primaryKey, secondaryKey, value) => {
    switch (kind) {
      case VALUE:
        items.push(value);
        return;
      case KEY:
        items.push(key(primaryKey, secondaryKey));
        return;
      case ENTRY:
        items.push([key(primaryKey, secondaryKey), value]);
    }
  };
  await scan2(transactionID, toDbScanOptions(options), receiver, shouldClone);
  return items;
}

// src/transactions.ts
var ReadTransactionImpl = class {
  constructor(dbName, openResponse) {
    this._transactionId = -1;
    this._closed = false;
    this._shouldClone = false;
    this._dbName = dbName;
    this._openResponse = openResponse;
  }
  async get(key) {
    throwIfClosed(this);
    return get(this._transactionId, key, this._shouldClone);
  }
  async has(key) {
    throwIfClosed(this);
    return has(this._transactionId, key);
  }
  async isEmpty() {
    throwIfClosed(this);
    let empty = true;
    await scan2(this._transactionId, { limit: 1 }, () => empty = false, false);
    return empty;
  }
  scan(options) {
    return new ScanResult2(options, () => this, false, this._shouldClone);
  }
  get id() {
    return this._transactionId;
  }
  get closed() {
    return this._closed;
  }
  async open() {
    await this._openResponse;
    this._transactionId = await openReadTransaction(this._dbName);
  }
  async close() {
    this._closed = true;
    return await closeTransaction(this._transactionId);
  }
};
var SubscriptionTransactionWrapper = class {
  constructor(tx) {
    this._keys = new Set();
    this._scans = [];
    this._tx = tx;
  }
  isEmpty() {
    this._scans.push({});
    return this._tx.isEmpty();
  }
  get(key) {
    this._keys.add(key);
    return this._tx.get(key);
  }
  has(key) {
    this._keys.add(key);
    return this._tx.has(key);
  }
  scan(options) {
    this._scans.push(toDbScanOptions(options));
    return this._tx.scan(options);
  }
  get keys() {
    return this._keys;
  }
  get scans() {
    return this._scans;
  }
};
var WriteTransactionImpl = class extends ReadTransactionImpl {
  constructor(dbName, openResponse, name, args, rebaseOpts) {
    super(dbName, openResponse);
    this._shouldClone = true;
    this._name = name;
    this._args = args;
    this._rebaseOpts = rebaseOpts;
  }
  async put(key, value) {
    throwIfClosed(this);
    await put(this.id, key, value);
  }
  async del(key) {
    throwIfClosed(this);
    return await del(this.id, key);
  }
  async commit(generateChangedKeys) {
    this._closed = true;
    return await commitTransaction(this.id, generateChangedKeys);
  }
  async open() {
    await this._openResponse;
    this._transactionId = await openWriteTransaction(this._dbName, this._name, this._args, this._rebaseOpts);
  }
};
var IndexTransactionImpl = class extends ReadTransactionImpl {
  async createIndex(options) {
    var _a2, _b;
    throwIfClosed(this);
    await createIndex(this.id, options.name, (_b = (_a2 = options.prefix) != null ? _a2 : options.keyPrefix) != null ? _b : "", options.jsonPointer);
  }
  async dropIndex(name) {
    throwIfClosed(this);
    await dropIndex(this.id, name);
  }
  async commit() {
    this._closed = true;
    return await commitTransaction(this.id, false);
  }
  async open() {
    await this._openResponse;
    this._transactionId = await openIndexTransaction(this._dbName);
  }
};

// src/sleep.ts
function sleep(ms) {
  if (ms === 0) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

// src/connection-loop.ts
var MIN_DELAY_MS = 30;
var MAX_DELAY_MS = 6e4;
var ConnectionLoop = class {
  constructor(delegate) {
    this._pendingResolver = resolver();
    this._closed = false;
    this._waitingConnectionResolve = void 0;
    this._delegate = delegate;
    this.run();
  }
  close() {
    this._closed = true;
  }
  send() {
    var _a2, _b;
    (_b = (_a2 = this._delegate).debug) == null ? void 0 : _b.call(_a2, "send");
    this._pendingResolver.resolve();
  }
  async run() {
    const sendRecords = [];
    let recoverResolver = resolver();
    let lastSendTime;
    let counter = 0;
    const delegate = this._delegate;
    const { debug } = delegate;
    let delay = 0;
    debug == null ? void 0 : debug("Starting connection loop");
    while (!this._closed) {
      debug == null ? void 0 : debug(didLastSendRequestFail(sendRecords) ? "Last request failed. Trying again" : "Waiting for a send");
      const races = [this._pendingResolver.promise];
      const t = delegate.watchdogTimer;
      if (t !== null) {
        races.push(sleep(t));
      }
      await Promise.race(races);
      if (this._closed)
        break;
      debug == null ? void 0 : debug("Waiting for debounce");
      await sleep(delegate.debounceDelay);
      if (this._closed)
        break;
      debug == null ? void 0 : debug("debounced");
      this._pendingResolver = resolver();
      if (counter >= delegate.maxConnections) {
        debug == null ? void 0 : debug("Too many request in flight. Waiting until one finishes...");
        await this._waitUntilAvailableConnection();
        if (this._closed)
          break;
        debug == null ? void 0 : debug("...finished");
      }
      if (counter > 0 || didLastSendRequestFail(sendRecords)) {
        delay = computeDelayAndUpdateDurations(delay, delegate, sendRecords);
        debug == null ? void 0 : debug(didLastSendRequestFail(sendRecords) ? "Last connection errored. Sleeping for" : "More than one outstanding connection (" + counter + "). Sleeping for", delay, "ms");
      } else {
        delay = 0;
      }
      const clampedDelay = Math.min(delegate.maxDelayMs, Math.max(delegate.minDelayMs, delay));
      if (lastSendTime !== void 0) {
        const timeSinceLastSend = Date.now() - lastSendTime;
        if (clampedDelay > timeSinceLastSend) {
          await Promise.race([
            sleep(clampedDelay - timeSinceLastSend),
            recoverResolver.promise
          ]);
          if (this._closed)
            break;
        }
      }
      counter++;
      (async () => {
        const start = Date.now();
        let ok;
        try {
          lastSendTime = start;
          debug == null ? void 0 : debug("Sending request");
          ok = await delegate.invokeSend();
          debug == null ? void 0 : debug("Send returned", ok);
        } catch (e) {
          debug == null ? void 0 : debug("Send failed", e);
          ok = false;
        }
        if (this._closed) {
          debug == null ? void 0 : debug("Closed after invokeSend");
          return;
        }
        debug == null ? void 0 : debug("Request done", { duration: Date.now() - start, ok });
        sendRecords.push({ duration: Date.now() - start, ok });
        if (recovered(sendRecords)) {
          recoverResolver.resolve();
          recoverResolver = resolver();
        }
        counter--;
        this._connectionAvailable();
        if (!ok) {
          this._pendingResolver.resolve();
        }
      })();
    }
  }
  _connectionAvailable() {
    if (this._waitingConnectionResolve) {
      const resolve = this._waitingConnectionResolve;
      this._waitingConnectionResolve = void 0;
      resolve();
    }
  }
  _waitUntilAvailableConnection() {
    const { promise, resolve } = resolver();
    this._waitingConnectionResolve = resolve;
    return promise;
  }
};
var CONNECTION_MEMORY_COUNT = 9;
function computeDelayAndUpdateDurations(delay, delegate, sendRecords) {
  const { length } = sendRecords;
  if (length === 0) {
    return delay;
  }
  const { ok } = sendRecords[sendRecords.length - 1];
  const { maxConnections, minDelayMs } = delegate;
  if (!ok) {
    return delay === 0 ? minDelayMs : delay * 2;
  }
  if (length > 1) {
    const previous = sendRecords[sendRecords.length - 2];
    while (sendRecords.length > CONNECTION_MEMORY_COUNT) {
      sendRecords.shift();
    }
    if (ok && !previous.ok) {
      return minDelayMs;
    }
  }
  const med = median(sendRecords.filter(({ ok: ok2 }) => ok2).map(({ duration }) => duration));
  return med / maxConnections | 0;
}
function median(values) {
  values.sort();
  const { length } = values;
  const half = length >> 1;
  if (length % 2 === 1) {
    return values[half];
  }
  return (values[half - 1] + values[half]) / 2;
}
function didLastSendRequestFail(sendRecords) {
  return sendRecords.length > 0 && !sendRecords[sendRecords.length - 1].ok;
}
function recovered(sendRecords) {
  return sendRecords.length > 1 && !sendRecords[sendRecords.length - 2].ok && sendRecords[sendRecords.length - 1].ok;
}

// src/connection-loop-delegates.ts
var ConnectionLoopDelegateImpl = class {
  constructor(rep, invokeSend, logger) {
    this.maxConnections = 1;
    this.rep = rep;
    this.invokeSend = invokeSend;
    this.logger = logger;
  }
  get maxDelayMs() {
    return this.rep.requestOptions.maxDelayMs;
  }
  get minDelayMs() {
    return this.rep.requestOptions.minDelayMs;
  }
  get debug() {
    return this.logger.debug;
  }
};
var PullDelegate = class extends ConnectionLoopDelegateImpl {
  constructor() {
    super(...arguments);
    this.debounceDelay = 0;
  }
  get watchdogTimer() {
    return this.rep.pullInterval;
  }
};
var PushDelegate = class extends ConnectionLoopDelegateImpl {
  constructor() {
    super(...arguments);
    this.watchdogTimer = null;
  }
  get debounceDelay() {
    return this.rep.pushDelay;
  }
};

// src/subscriptions.ts
function keyMatchesSubscription(subscription, indexName, changedKey) {
  if (indexName === "" && subscription.keys.has(changedKey)) {
    return true;
  }
  for (const scanOpts of subscription.scans) {
    if (scanOptionsMatchesKey(scanOpts, indexName, changedKey)) {
      return true;
    }
  }
  return false;
}
function scanOptionsMatchesKey(scanOpts, changeIndexName, changedKey) {
  const { indexName, prefix, startKey, startExclusive, startSecondaryKey } = scanOpts;
  if (!indexName) {
    if (changeIndexName) {
      return false;
    }
    if (!prefix && !startKey) {
      return true;
    }
    if (prefix && !changedKey.startsWith(prefix)) {
      return false;
    }
    if (startKey && (startExclusive && changedKey <= startKey || changedKey < startKey)) {
      return false;
    }
    return true;
  }
  if (changeIndexName !== indexName) {
    return false;
  }
  if (!prefix && !startKey && !startSecondaryKey) {
    return true;
  }
  const [changedKeySecondary, changedKeyPrimary] = decodeIndexKey(changedKey);
  if (prefix) {
    if (!changedKeySecondary.startsWith(prefix)) {
      return false;
    }
  }
  if (startSecondaryKey && (startExclusive && changedKeySecondary <= startSecondaryKey || changedKeySecondary < startSecondaryKey)) {
    return false;
  }
  if (startKey && (startExclusive && changedKeyPrimary <= startKey || changedKeyPrimary < startKey)) {
    return false;
  }
  return true;
}
function* subscriptionsForChangedKeys(subscriptions, changedKeysMap) {
  outer:
    for (const subscription of subscriptions) {
      for (const [indexName, changedKeys] of changedKeysMap) {
        for (const key of changedKeys) {
          if (keyMatchesSubscription(subscription, indexName, key)) {
            yield subscription;
            continue outer;
          }
        }
      }
    }
}
function* subscriptionsForIndexDefinitionChanged(subscriptions, name) {
  for (const subscription of subscriptions) {
    if (subscription.scans.some((opt) => opt.indexName === name)) {
      yield subscription;
    }
  }
}

// src/kv/write-impl-base.ts
var deleteSentinel = Symbol();
var WriteImplBase = class {
  constructor(read) {
    this._pending = new Map();
    this._read = read;
  }
  async has(key) {
    switch (this._pending.get(key)) {
      case void 0:
        return this._read.has(key);
      case deleteSentinel:
        return false;
      default:
        return true;
    }
  }
  async get(key) {
    const v = this._pending.get(key);
    switch (v) {
      case deleteSentinel:
        return void 0;
      case void 0:
        return this._read.get(key);
      default:
        return v;
    }
  }
  async put(key, value) {
    this._pending.set(key, value);
  }
  async del(key) {
    this._pending.set(key, deleteSentinel);
  }
  release() {
    this._read.release();
  }
};

// src/kv/mem-store.ts
var MemStore = class {
  constructor() {
    this._map = new Map();
    this._rwLock = new RWLock();
  }
  async read() {
    const release = await this._rwLock.read();
    return new ReadImpl(this._map, release);
  }
  async withRead(fn) {
    let read;
    try {
      read = await this.read();
      return await fn(read);
    } finally {
      read == null ? void 0 : read.release();
    }
  }
  async write() {
    const release = await this._rwLock.write();
    return new WriteImpl(this._map, release);
  }
  async withWrite(fn) {
    let write;
    try {
      write = await this.write();
      return await fn(write);
    } finally {
      write == null ? void 0 : write.release();
    }
  }
  async close() {
  }
};
var ReadImpl = class {
  constructor(map, relase) {
    this._map = map;
    this.release = relase;
  }
  async has(key) {
    return this._map.has(key);
  }
  async get(key) {
    return this._map.get(key);
  }
};
var WriteImpl = class extends WriteImplBase {
  constructor(map, release) {
    super(new ReadImpl(map, release));
    this._map = map;
  }
  async commit() {
    this._pending.forEach((value, key) => {
      if (value === deleteSentinel) {
        this._map.delete(key);
      } else {
        this._map.set(key, value);
      }
    });
    this._pending.clear();
    this.release();
  }
};

// src/kv/idb-store.ts
var RELAXED = { durability: "relaxed" };
var OBJECT_STORE = "chunks";
var WriteState;
(function(WriteState2) {
  WriteState2[WriteState2["OPEN"] = 0] = "OPEN";
  WriteState2[WriteState2["COMMITTED"] = 1] = "COMMITTED";
  WriteState2[WriteState2["ABORTED"] = 2] = "ABORTED";
})(WriteState || (WriteState = {}));
var IDBStore = class {
  constructor(name) {
    this._db = openDatabase(name);
  }
  async read() {
    const db6 = await this._db;
    return readImpl(db6);
  }
  async withRead(fn) {
    const db6 = await this._db;
    return fn(readImpl(db6));
  }
  async write() {
    const db6 = await this._db;
    return writeImpl(db6);
  }
  async withWrite(fn) {
    const db6 = await this._db;
    return fn(writeImpl(db6));
  }
  async close() {
    (await this._db).close();
  }
};
var ReadImpl2 = class {
  constructor(tx) {
    this._tx = tx;
  }
  async has(key) {
    return await wrap(objectStore(this._tx).count(key)) > 0;
  }
  get(key) {
    return wrap(objectStore(this._tx).get(key));
  }
  release() {
  }
};
var WriteImpl2 = class extends WriteImplBase {
  constructor(tx) {
    super(new ReadImpl2(tx));
    this._txState = 0;
    this._tx = tx;
    this._onTxEnd = this._addTransactionListeners();
  }
  async _addTransactionListeners() {
    const tx = this._tx;
    const p = new Promise((resolve, reject) => {
      tx.onabort = () => resolve(2);
      tx.oncomplete = () => resolve(1);
      tx.onerror = () => reject(tx.error);
    });
    this._txState = await p;
  }
  async commit() {
    if (this._pending.size === 0) {
      return;
    }
    const store = objectStore(this._tx);
    const ps = Array.from(this._pending, ([key, val]) => {
      if (val === deleteSentinel) {
        return wrap(store.delete(key));
      }
      return wrap(store.put(val, key));
    });
    await Promise.all(ps);
    await this._onTxEnd;
    if (this._txState === 2) {
      throw new Error("Transaction aborted");
    }
  }
  release() {
  }
};
function writeImpl(db6) {
  const tx = db6.transaction(OBJECT_STORE, "readwrite", RELAXED);
  return new WriteImpl2(tx);
}
function readImpl(db6) {
  const tx = db6.transaction(OBJECT_STORE, "readonly");
  return new ReadImpl2(tx);
}
function objectStore(tx) {
  return tx.objectStore(OBJECT_STORE);
}
async function openDatabase(name) {
  const req = indexedDB.open(name);
  req.onupgradeneeded = () => {
    const db6 = req.result;
    db6.createObjectStore(OBJECT_STORE);
    db6.onversionchange = () => db6.close();
  };
  return wrap(req);
}
function wrap(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// src/replicache.ts
var httpStatusUnauthorized = 401;
var storageKeyName = (name) => `/replicache/root/${name}`;
var MAX_REAUTH_TRIES = 8;
var emptySet = new Set();
var Replicache = class {
  constructor(options = {}) {
    this._closed = false;
    this._online = true;
    this._root = Promise.resolve(void 0);
    this._mutatorRegistry = new Map();
    this._pushCounter = 0;
    this._pullCounter = 0;
    this._broadcastChannel = void 0;
    this._subscriptions = new Set();
    this._pendingSubscriptions = new Set();
    this._hasPendingSubscriptionRuns = false;
    this.onSync = null;
    this.getPullAuth = null;
    this.getPushAuth = null;
    this.getAuth = null;
    this.onOnlineChange = null;
    this._onStorage = (e) => {
      const { key, newValue } = e;
      if (newValue && key === storageKeyName(this.name)) {
        const { root: root2, changedKeys, index } = JSON.parse(newValue);
        this._onBroadcastMessage({
          root: root2,
          changedKeys: new Map(changedKeys),
          index
        });
      }
    };
    var _a2, _b;
    const {
      name = "default",
      logLevel = "info",
      pullAuth,
      pullURL = "",
      pushAuth,
      auth,
      pushDelay = 10,
      pushURL = "",
      schemaVersion = "",
      pullInterval = 6e4,
      useMemstore = false,
      mutators = {},
      requestOptions = {},
      puller = defaultPuller,
      pusher = defaultPusher,
      experimentalKVStore
    } = options;
    this.auth = (_b = (_a2 = auth != null ? auth : pullAuth) != null ? _a2 : pushAuth) != null ? _b : "";
    this.pullURL = pullURL;
    this.pushURL = pushURL;
    this.name = name;
    this.schemaVersion = schemaVersion;
    this.pullInterval = pullInterval;
    this.pushDelay = pushDelay;
    this._useMemstore = useMemstore;
    this.puller = puller;
    this.pusher = pusher;
    this._store = experimentalKVStore || (this._useMemstore ? new MemStore() : new IDBStore(this.name));
    const { promise, resolve } = resolver();
    this._openResponse = promise;
    this._openResolve = resolve;
    const { minDelayMs = MIN_DELAY_MS, maxDelayMs = MAX_DELAY_MS } = requestOptions;
    this._requestOptions = { maxDelayMs, minDelayMs };
    this._pullConnectionLoop = new ConnectionLoop(new PullDelegate(this, () => this._invokePull(), getLogger(["PULL"], logLevel)));
    this._pushConnectionLoop = new ConnectionLoop(new PushDelegate(this, () => this._invokePush(MAX_REAUTH_TRIES), getLogger(["PUSH"], logLevel)));
    this._logLevel = logLevel;
    this._logger = getLogger([], logLevel);
    this.mutate = this._registerMutators(mutators);
    this._clientIDPromise = this._open();
  }
  get requestOptions() {
    return this._requestOptions;
  }
  async _open() {
    await closingInstances.get(this.name);
    await initHasher();
    const openResponse = await open(this.name, this._store, this._logLevel);
    this._openResolve(openResponse);
    if (hasBroadcastChannel) {
      this._broadcastChannel = new BroadcastChannel(storageKeyName(this.name));
      this._broadcastChannel.onmessage = (e) => this._onBroadcastMessage(e.data);
    } else {
      window.addEventListener("storage", this._onStorage);
    }
    this._root = this._getRoot();
    await this._root;
    this.pull();
    this._push();
    return openResponse;
  }
  get clientID() {
    return this._clientIDPromise;
  }
  get online() {
    return this._online;
  }
  get closed() {
    return this._closed;
  }
  async close() {
    var _a2;
    this._closed = true;
    const { promise, resolve } = resolver();
    closingInstances.set(this.name, promise);
    await this._openResponse;
    const p = close(this.name);
    this._pullConnectionLoop.close();
    this._pushConnectionLoop.close();
    if (this._broadcastChannel) {
      this._broadcastChannel.close();
      this._broadcastChannel = void 0;
    } else {
      window.removeEventListener("storage", this._onStorage);
    }
    for (const subscription of this._subscriptions) {
      (_a2 = subscription.onDone) == null ? void 0 : _a2.call(subscription);
    }
    this._subscriptions.clear();
    await p;
    closingInstances.delete(this.name);
    resolve();
  }
  async _getRoot() {
    if (this._closed) {
      return void 0;
    }
    await this._openResponse;
    return await getRoot2(this.name);
  }
  async _onBroadcastMessage(data) {
    const { changedKeys, index } = data;
    const changedKeysSubs = subscriptionsForChangedKeys(this._subscriptions, changedKeys);
    const indexSubs = index ? subscriptionsForIndexDefinitionChanged(this._subscriptions, index) : [];
    const subscriptions = new Set();
    for (const s of changedKeysSubs) {
      subscriptions.add(s);
    }
    for (const s of indexSubs) {
      subscriptions.add(s);
    }
    await this._fireSubscriptions(subscriptions, false);
  }
  _broadcastChange(root2, changedKeys, index) {
    if (this._broadcastChannel) {
      const data = { root: root2, changedKeys, index };
      this._broadcastChannel.postMessage(data);
    } else {
      const data = { root: root2, changedKeys: [...changedKeys.entries()], index };
      localStorage[storageKeyName(this.name)] = JSON.stringify(data);
    }
  }
  async _checkChange(root2, changedKeys) {
    const currentRoot = await this._root;
    if (root2 !== void 0 && root2 !== currentRoot) {
      this._root = Promise.resolve(root2);
      this._broadcastChange(root2, changedKeys, void 0);
      await this._fireOnChange(changedKeys);
    }
  }
  get(key) {
    return this.query((tx) => tx.get(key));
  }
  has(key) {
    return this.query((tx) => tx.has(key));
  }
  isEmpty() {
    return this.query((tx) => tx.isEmpty());
  }
  scan(options) {
    return new ScanResult2(options, async () => {
      const tx = new ReadTransactionImpl(this.name, this._openResponse);
      await tx.open();
      return tx;
    }, true, false);
  }
  async createIndex(def) {
    await this._indexOp((tx) => tx.createIndex(def));
    await this._indexDefinitionChanged(def.name);
  }
  async dropIndex(name) {
    await this._indexOp((tx) => tx.dropIndex(name));
    await this._indexDefinitionChanged(name);
  }
  async _indexOp(f) {
    const tx = new IndexTransactionImpl(this.name, this._openResponse);
    try {
      await tx.open();
      await f(tx);
    } finally {
      await tx.commit();
    }
  }
  async _maybeEndPull(beginPullResult) {
    if (this._closed) {
      return;
    }
    let { syncHead } = beginPullResult;
    const { requestID } = beginPullResult;
    const { replayMutations, changedKeys } = await maybeEndPull2(this.name, requestID, syncHead);
    if (!replayMutations || replayMutations.length === 0) {
      await this._checkChange(syncHead, changedKeys);
      return;
    }
    for (const mutation of replayMutations) {
      syncHead = await this._replay(syncHead, mutation.original, mutation.name, mutation.args);
    }
    await this._maybeEndPull({ ...beginPullResult, syncHead });
  }
  async _replay(basis, original, name, args) {
    var _a2, _b;
    let mutatorImpl = this._mutatorRegistry.get(name);
    if (!mutatorImpl) {
      (_b = (_a2 = this._logger).error) == null ? void 0 : _b.call(_a2, `Unknown mutator ${name}`);
      mutatorImpl = async () => {
      };
    }
    const res = await this._mutate(name, mutatorImpl, args, { basis, original }, true);
    return res.ref;
  }
  async _invokePull() {
    return await this._wrapInOnlineCheck(async () => {
      try {
        this._changeSyncCounters(0, 1);
        const beginPullResult = await this._beginPull(MAX_REAUTH_TRIES);
        if (!beginPullResult.ok) {
          return false;
        }
        if (beginPullResult.syncHead !== "") {
          await this._maybeEndPull(beginPullResult);
        }
      } finally {
        this._changeSyncCounters(0, -1);
      }
      return true;
    }, "Pull");
  }
  async _wrapInOnlineCheck(f, name) {
    var _a2, _b, _c;
    let online = true;
    try {
      return await f();
    } catch (e) {
      if (e instanceof PushError || e instanceof PullError) {
        online = false;
      }
      (_b = (_a2 = this._logger).info) == null ? void 0 : _b.call(_a2, `${name} returned: ${e}`);
      return false;
    } finally {
      if (this._online !== online) {
        this._online = online;
        (_c = this.onOnlineChange) == null ? void 0 : _c.call(this, online);
      }
    }
  }
  async _invokePush(maxAuthTries) {
    return await this._wrapInOnlineCheck(async () => {
      var _a2, _b;
      let pushResponse;
      try {
        this._changeSyncCounters(1, 0);
        await this._openResponse;
        pushResponse = await tryPush(this.name, {
          pushURL: this.pushURL,
          pushAuth: this.auth,
          schemaVersion: this.schemaVersion,
          pusher: this.pusher
        });
      } finally {
        this._changeSyncCounters(-1, 0);
      }
      const httpRequestInfo = pushResponse;
      if (httpRequestInfo) {
        const reauth = checkStatus(httpRequestInfo, "push", this.pushURL, this._logger);
        if (reauth && (this.getAuth || this.getPushAuth)) {
          if (maxAuthTries === 0) {
            (_b = (_a2 = this._logger).info) == null ? void 0 : _b.call(_a2, "Tried to reauthenticate too many times");
            return false;
          }
          const auth = await (this.getAuth ? this.getAuth() : this.getPushAuth());
          if (auth !== null && auth !== void 0) {
            this.auth = auth;
            return await this._invokePush(maxAuthTries - 1);
          }
        }
        return httpRequestInfo.httpStatusCode === 200;
      }
      return true;
    }, "Push");
  }
  _push() {
    this._pushConnectionLoop.send();
  }
  pull() {
    this._pullConnectionLoop.send();
  }
  async _beginPull(maxAuthTries) {
    var _a2, _b;
    await this._openResponse;
    const beginPullResponse = await beginPull2(this.name, {
      pullAuth: this.auth,
      pullURL: this.pullURL,
      schemaVersion: this.schemaVersion,
      puller: this.puller
    });
    const { httpRequestInfo, syncHead, requestID } = beginPullResponse;
    const reauth = checkStatus(httpRequestInfo, "pull", this.pullURL, this._logger);
    if (reauth && (this.getAuth || this.getPullAuth)) {
      if (maxAuthTries === 0) {
        (_b = (_a2 = this._logger).info) == null ? void 0 : _b.call(_a2, "Tried to reauthenticate too many times");
        return { requestID, syncHead: "", ok: false };
      }
      let auth;
      try {
        this._changeSyncCounters(0, -1);
        auth = await (this.getAuth ? this.getAuth() : this.getPullAuth());
      } finally {
        this._changeSyncCounters(0, 1);
      }
      if (auth !== null && auth !== void 0) {
        this.auth = auth;
        return await this._beginPull(maxAuthTries - 1);
      }
    }
    return { requestID, syncHead, ok: httpRequestInfo.httpStatusCode === 200 };
  }
  _changeSyncCounters(pushDelta, pullDelta) {
    this._pushCounter += pushDelta;
    this._pullCounter += pullDelta;
    const delta = pushDelta + pullDelta;
    const counter = this._pushCounter + this._pullCounter;
    if (delta === 1 && counter === 1 || counter === 0) {
      const syncing = counter > 0;
      Promise.resolve().then(() => {
        var _a2;
        return (_a2 = this.onSync) == null ? void 0 : _a2.call(this, syncing);
      });
    }
  }
  async _fireOnChange(changedKeys) {
    const subscriptions = subscriptionsForChangedKeys(this._subscriptions, changedKeys);
    await this._fireSubscriptions(subscriptions, false);
  }
  async _indexDefinitionChanged(name) {
    const subscriptions = subscriptionsForIndexDefinitionChanged(this._subscriptions, name);
    await this._fireSubscriptions(subscriptions, false);
    this._broadcastChange(await this._root, new Map(), name);
  }
  async _fireSubscriptions(subscriptions, skipEqualsCheck) {
    var _a2;
    const subs = [...subscriptions];
    if (subs.length === 0) {
      return;
    }
    const results = await this.query(async (tx) => {
      const promises = subs.map(async (s) => {
        try {
          const stx = new SubscriptionTransactionWrapper(tx);
          const value = await s.body(stx);
          s.keys = stx.keys;
          s.scans = stx.scans;
          return { ok: true, value };
        } catch (error) {
          return { ok: false, error };
        }
      });
      return await Promise.all(promises);
    });
    for (let i = 0; i < subs.length; i++) {
      const s = subs[i];
      const result = results[i];
      if (result.ok) {
        const { value } = result;
        if (skipEqualsCheck || !deepEqual(value, s.lastValue)) {
          s.lastValue = value;
          s.onData(value);
        }
      } else {
        (_a2 = s.onError) == null ? void 0 : _a2.call(s, result.error);
      }
    }
  }
  subscribe(body, {
    onData,
    onError,
    onDone
  }) {
    const s = {
      body,
      onData,
      onError,
      onDone,
      lastValue: void 0,
      keys: emptySet,
      scans: []
    };
    this._subscriptions.add(s);
    this._scheduleInitialSubscriptionRun(s);
    return () => {
      this._subscriptions.delete(s);
    };
  }
  async _scheduleInitialSubscriptionRun(s) {
    this._pendingSubscriptions.add(s);
    if (!this._hasPendingSubscriptionRuns) {
      this._hasPendingSubscriptionRuns = true;
      await Promise.resolve();
      this._hasPendingSubscriptionRuns = false;
      const subscriptions = [...this._pendingSubscriptions];
      this._pendingSubscriptions.clear();
      await this._fireSubscriptions(subscriptions, true);
    }
  }
  async query(body) {
    const tx = new ReadTransactionImpl(this.name, this._openResponse);
    await tx.open();
    try {
      return await body(tx);
    } finally {
      closeIgnoreError(tx);
    }
  }
  register(name, mutatorImpl) {
    this._mutatorRegistry.set(name, mutatorImpl);
    return this._register(name, mutatorImpl);
  }
  _register(name, mutatorImpl) {
    this._mutatorRegistry.set(name, mutatorImpl);
    return async (args) => (await this._mutate(name, mutatorImpl, args, void 0, false)).result;
  }
  _registerMutators(regs) {
    const rv = Object.create(null);
    for (const k in regs) {
      rv[k] = this._register(k, regs[k]);
    }
    return rv;
  }
  async _mutate(name, mutatorImpl, args, rebaseOpts, isReplay) {
    if (this._hasPendingSubscriptionRuns) {
      await Promise.resolve();
    }
    let result;
    const tx = new WriteTransactionImpl(this.name, this._openResponse, name, deepClone(args != null ? args : null), rebaseOpts);
    await tx.open();
    try {
      result = await mutatorImpl(tx, args);
    } catch (ex) {
      closeIgnoreError(tx);
      throw ex;
    }
    const { ref, changedKeys } = await tx.commit(!isReplay);
    if (!isReplay) {
      this._pushConnectionLoop.send();
      await this._checkChange(ref, changedKeys);
    }
    return { result, ref };
  }
};
function checkStatus(data, verb, serverURL, logger) {
  var _a2;
  const { httpStatusCode, errorMessage } = data;
  if (errorMessage || httpStatusCode >= 400) {
    (_a2 = logger.error) == null ? void 0 : _a2.call(logger, `Got error response from server (${serverURL}) doing ${verb}: ${httpStatusCode}` + (errorMessage ? `: ${errorMessage}` : ""));
  }
  return httpStatusCode === httpStatusUnauthorized;
}
var hasBroadcastChannel = typeof BroadcastChannel !== "undefined";
async function closeIgnoreError(tx) {
  try {
    await tx.close();
  } catch (ex) {
    console.error("Failed to close transaction", ex);
  }
}
var closingInstances = new Map();
/*!
 * hash-wasm (https://www.npmjs.com/package/hash-wasm)
 * (c) Dani Biro
 * @license MIT
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/**
 * @license
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="es" -o ./`
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
