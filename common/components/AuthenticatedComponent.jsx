import React from 'react';
import AuthStore from 'apps/authentication/stores/AuthStore';

export default (ComposedComponent) => {
    return class AuthenticatedComponent extends React.Component {

        static willTransitionTo(transition) {
            if (!AuthStore.isLoggedIn()) {
                transition.redirect('/login');
            }
        }

        constructor() {
            super();
            this.state = this._getLoginState();
        }

        _getLoginState() {
            return {
                userLoggedIn: AuthStore.isLoggedIn(),
                /* user: AuthStore.user,
                jwt: AuthStore.jwt */
                token: AuthStore.token
            };
        }

        componentDidMount() {
            this.changeListener = this._onChange.bind(this);
            AuthStore.addChangeListener(this.changeListener);
        }

        _onChange() {
            this.setState(this._getLoginState());
        }

        componentWillUnmount() {
            AuthStore.removeChangeListener(this.changeListener);
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    token={this.state.token}
                    userLoggedIn={this.state.userLoggedIn} />);
                }
            };
        };
