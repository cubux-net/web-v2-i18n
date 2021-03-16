// this is a part of `fast-deep-equal` https://github.com/epoberezkin/fast-deep-equal
// Copyright (c) 2017 Evgeny Poberezkin
// https://github.com/epoberezkin/fast-deep-equal/blob/master/LICENSE

exports.__esModule = true;
exports.default = isEqual;

function isEqual(a, b) {
  if (a === b) {
    return true;
  }

  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor) {
      return false;
    }

    if (Array.isArray(a)) {
      const length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (let i = length; i-- !== 0; ) {
        if (!isEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }

    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }

    const keys = Object.keys(a);
    const length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }

    for (let i = length; i-- !== 0; ) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }

    for (let i = length; i-- !== 0; ) {
      const key = keys[i];
      if (!isEqual(a[key], b[key])) {
        return false;
      }
    }

    return true;
  }

  return isNaN(a) && isNaN(b);
}
