const addNewModal = ({ modal, data }) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'ADD_MODAL',
                modal,
                data,
            });
        }, 300);
    }
}

const removeModal = () => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_MODAL'
            });
        }, 300);
    }
}

export {
    addNewModal,
    removeModal
}
