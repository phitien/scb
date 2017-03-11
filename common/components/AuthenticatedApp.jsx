import React from 'react';
import _ from 'lodash';
import AuthStore from 'apps/authentication/stores/AuthStore';
import BaseComponent from 'common/components/BaseComponent';
import { PropTypes } from 'react-router';

export default class AuthenticatedApp extends BaseComponent {
    constructor() {
        super();
        this.state.userLoggedIn = AuthStore.isLoggedIn();
        this.state.messages = []; //TODO link this to store
    }

    componentDidMount() {
        AuthStore.addChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        if (!AuthStore.isLoggedIn()) {
            this.context.history.replaceState(null, '/business-vault');
        } else {
            this.setState({
                userLoggedIn: AuthStore.isLoggedIn()
            });
        }
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange.bind(this));
    }

    renderMessages(showMsgBar) {
        const messageComps = _.map(this.state.messages, (msg, i)=> (<div key={i}>{msg}</div>));

        return (
            <div className={(showMsgBar?"in":"fade")+"  message-bar"}>
                <div className={"col-xs-12 panel panel-"+this.state.messageGroup.messageClass +" "+(this.state.messageGroup.messages.length>0?"":"hidden")}>
                    <Button bsStyle='link' className='close-btn' onClick={this.clearMessage.bind(this)}><i className="fa fa-times"></i></Button>
                    { messageComps }
                </div>
            </div>
        );
    }

    render() {
        var routeHandler = this.props.children;
        return (
            <div>
                {routeHandler}
            </div>
        );
    }
};
AuthenticatedApp.contextTypes = { history: PropTypes.history }
