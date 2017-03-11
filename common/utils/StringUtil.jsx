export const limitString = (value,limit) => {
    if(value.length > limit){
        value = value.substring(0,limit) + '...';
    }
    return value;
};
