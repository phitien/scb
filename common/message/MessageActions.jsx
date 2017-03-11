import AppDispatcher from '../dispatchers/AppDispatcher.js';
import MessageConstants from './MessageConstants.jsx';

export default {
    addMessage: (type,message,messageClass) => {
        if(!type){
            type = MessageConstants.COMMON_MESSAGE;
        }
        AppDispatcher.dispatch({
            actionType: MessageConstants.ADD_MESSAGE,
            type: type,
            message: message,
            messageClass: messageClass
        });

    },
    addMessages: (type,messages,messageClass) => {
        if(!type){
            type = MessageConstants.COMMON_MESSAGE;
        }
        AppDispatcher.dispatch({
            actionType: MessageConstants.ADD_MESSAGES,
            type: type,
            messages: messages,
            messageClass: messageClass
        });

    },
    addSuccess: (type ,success, clear) => {
        if(!type){
            type = MessageConstants.COMMON_MESSAGE;
        }
        AppDispatcher.dispatch({
            actionType: MessageConstants.ADD_MESSAGE,
            type: type,
            message: success,
            messageClass: 'success',
            clearMessage: clear
        });
    },
    addError: (type, error, clear) => {
        if(!type){
            type = MessageConstants.COMMON_MESSAGE;
        }
        if(clear){
            AppDispatcher.dispatch({
                actionType: MessageConstants.ADD_MESSAGE,
                type: type,
                message: error,
                messageClass: 'danger',
                clearMessage: clear
            });
        }else{
            AppDispatcher.dispatch({
                actionType: MessageConstants.ADD_MESSAGE,
                type: type,
                message: error,
                messageClass: 'danger'
            });
        }


    },
    addErrors: (type,errors,clear) => {
        if(!type){
            type = MessageConstants.COMMON_MESSAGE;
        }
        AppDispatcher.dispatch({
            actionType: MessageConstants.ADD_MESSAGES,
            type: type,
            messages: errors,
            messageClass: 'danger',
            clearMessages: clear
        });

    },
    addWarning: (type,warning) => {
        if(!type){
            type = MessageConstants.COMMON_MESSAGE;
        }
        AppDispatcher.dispatch({
            actionType: MessageConstants.ADD_MESSAGE,
            type: type,
            message: warning,
            messageClass: 'warning'
        });

    },
    clearMessages: (type) => {
        if(!type){
            type = MessageConstants.COMMON_MESSAGE;
        }
        AppDispatcher.dispatch({
            type: type,
            actionType: MessageConstants.CLEAR_MESSAGES
        });
    }
}
