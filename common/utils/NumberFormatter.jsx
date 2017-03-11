import numeral from 'numeral';
import _ from 'lodash';

const formatCurrency = money => {
    // console.log(money);
    if(!money || isNaN(money) || (typeof money == 'undefined')){
        return "N/A";
    }else if(!isFinite(money)){
        return "N/A";
    }
    return numeral(money).format('0,0[.][00]');
};

const formatCurrencyFloat = money => {
    // console.log(money);
    if(!money || isNaN(money) || (typeof money == 'undefined')){
        return "N/A";
    }else if(!isFinite(money)){
        return "N/A";
    }
    return numeral(money).format('0,0.00');
};

const formatNumber = (number,num_of_decimal) => {
    if(!number || isNaN(number)){
        return "N/A";
    }else{
        return Number(number).toFixed(num_of_decimal);
    }
};

const formatCurrency2 = money => {
    if(!money || isNaN(money) || (typeof money == 'undefined')){
        return "N/A";
    }
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const toNumeral = value => {
    var type = typeof value;
    var n;

    if (type === 'object' || type === 'function' || type === 'boolean') {
        return null;
    }

    n = numeral(value);
    if (n.value() === 0 && (value !== 0 || value !== '0')) {
        return null;
    }

    return n;
};

const formatMoney = amount => {
    if (!!amount && !_.isEmpty(amount)) {
        // console.debug('converting money');
        const num = numeral(amount).format('0,0');
        return num;
    } else if (!isNaN(amount)) {
        const num = numeral(amount).format('0,0');
        return num;
    }

    return '0';
}

export {
    formatCurrency,
    formatCurrencyFloat,
    formatCurrency2,
    toNumeral,
    formatMoney
}
