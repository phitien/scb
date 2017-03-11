/* @flow weak */

import _ from 'lodash';

// recursively modify the keys of a plain object
const traversal = conversion => instance => {
    // console.error('traversal invoked');
    if (_.isArray(instance)) {
        return _.map(instance, traversal(conversion));
    }
    if (typeof instance === 'object') {
        return _(instance).mapValues(value => traversal(conversion)(value)).
                           mapKeys((value, key) => conversion(key)).
                           value();
    }
    return instance;
};

// recursively modify the values of a plain object
const recModifyValue = conversion => data => {
    if (_.isPlainObject(data)) {
        return _(data).mapValues(value => recModifyValue(conversion)(value)).
                       value();
    } else if (_.isArray(data)) {
        return _.map(data, recModifyValue(conversion));
    }
    return conversion(data);
};

const toCamelCase = traversal(_.camelCase);
const toSnakeCase = traversal(_.snakeCase);
const removeNulls = recModifyValue(val => val==null?{}:val);

const unflatten = obj => {
    const unflattened = {};
    _.forOwn(obj, (val, key) => {
        _.set(unflattened, key, val);
    });

    return unflattened;
};

export {
    toCamelCase,
    toSnakeCase,
    unflatten,
    removeNulls
    /*     test */
};
