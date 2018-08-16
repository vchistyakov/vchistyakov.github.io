import React from 'react';
import Alert from 'react-s-alert';

export const Wrapper = Component => {
  return props => <Component {...props} />;
};

export function isEmpty(obj) {
  if (obj instanceof Array) {
    return obj.length === 0;
  } else {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }
}

export function isData(data) {
  if (!data || isEmpty(data)) {
    Alert.info('The data is missing', {
      position: 'top-right',
      effect: 'slide',
      beep: false,
      html: true,
      timeout: 4000,
      offset: 100
    });
  }
}

export const isFloat = val => {
  var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
  if (!floatRegex.test(val)) return false;

  val = parseFloat(val);
  if (isNaN(val)) return false;
  return true;
};

export const numericFilter = (filter, rv) => {
  let value = filter.value.replace(/\s/g, '');
  if (isFloat(value)) {
    return rv === parseFloat(value);
  } else {
    value = filter.value.replace(/\s/g, '');
    if (value.length <= 1) {
      return true;
    } else {
      if (value.length > 1 && value.includes('-')) {
        if (value.charAt(value.length - 1) === '-') {
          return true; //row[filter.id] == parseFloat(value.substring(0,value.length-1));
        } else {
          let values = value.split('-');
          if (parseFloat(values[1]) > parseFloat(values[0])) {
            let rowValue = rv;
            if (rowValue > parseFloat(values[0])) {
              if (rowValue < parseFloat(values[1])) {
                return rv;
              }
            }
          } else {
            return true;
          }
        }
      }
      if (value.charAt(0) === '>') {
        if (isFloat(value.substring(1))) {
          return rv > parseFloat(value.substring(1));
        } else {
          return true;
        }
      } else if (value.charAt(0) === '<') {
        if (isFloat(value.substring(1))) {
          return rv < parseFloat(value.substring(1));
        } else {
          return true;
        }
      }
    }
  }
};
