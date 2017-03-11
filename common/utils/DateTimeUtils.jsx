import moment from 'moment';

const formatDatetime = (datetime, dtFormat) =>
    moment(datetime).format(dtFormat);

export {
    formatDatetime
};
