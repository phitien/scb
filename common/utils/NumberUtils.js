var checkValidBootstrapWeight = function (name, value) {
    var result = {};
    if (!value === parseInt(value, 10)) {
        result.msg = name + ' must be integer';
        // result.flag = false;
        return result;
    }
    else {
        if (parseInt(value) < 0 || value > 12) {
            result.msg = name + ' out of range 0-12';
            // result.flag = false;
            return result;
        }
    }
    result.valid = true;
    return result;
};
var checkValidViewPosition = function (name, value) {
    var result = {};
    if (!value === parseInt(value, 10)) {
        result.msg = name + ' must be integer';
        // result.flag = false;
        return result;
    }
    else {
        if (parseInt(value) < 1 || value > 100) {
            result.msg = name + ' out of required range 1-100';
            // result.flag = false;
            return result;
        }
    }
    result.valid = true;
    return result;
};

module.exports = {
    checkValidBootstrapWeight,
    checkValidViewPosition,
};
