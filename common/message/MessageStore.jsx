import CoreStore from '../stores/CoreStore.jsx';
import MessageConstants from './MessageConstants';
class MessageStore extends CoreStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this));
        this.messageGroup = {
            // messageClass:'',
            // messages: [],
        }
        this.succeeded = false;
    }
    get messages() {
        return this.messageGroup;
    }

    _registerToActions(action) {
        switch(action.actionType) {
            case MessageConstants.ADD_MESSAGE:
            // console.log(action);
            var type = action.type;
            if (type) {
                if (!this.messageGroup[type]) {
                    this.messageGroup[type] = {};
                    this.messageGroup[type].messages = [];
                }
                var messageGroupElement = this.messageGroup[type];
                if (action.clearMessage) {
                    messageGroupElement.messages = [];
                }
                if (messageGroupElement.messageClass !== action.messageClass)
                    messageGroupElement.messages = [];


                messageGroupElement.messages.push(action.message);
                messageGroupElement.messageClass = action.messageClass;
                if (action.messageClass === 'success') {
                    this.succeeded = true;
                } else {
                    this.succeeded = false;
                }
                this.messageGroup[type] = messageGroupElement;

                this.emitChange();
            }
            break;
            case MessageConstants.ADD_MESSAGES:
            // if(action.clearMessages){
            //   this.messageGroup.messages = [];
            // }
            // if(action.messages)
            // {
            //   var context =  this;
            //   action.messages.map(function(msg,i){
            //       context.messageGroup.messages.push(msg);
            //   });

            //   this.messageGroup.messageClass = action.messageClass + " message-af";
            //   this.emitChange();
            // }

            break;
            case MessageConstants.CLEAR_MESSAGES:
            // console.log("clear message");
            var type=action.type;
            if(type){
                if(this.messageGroup[type]){
                    this.messageGroup[type] = {};
                }
            }else{
                this.messageGroup = {};
            }
            // this.messageGroup.messages = [];
            this.emitChange();
            break;
            default:
            break;
        };
    }

}

export default new MessageStore();
