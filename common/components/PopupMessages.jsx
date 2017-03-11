import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Alert } from 'react-bootstrap';
import { removePopupMessage } from 'apps/business_vault/actions/PopupMessageAction';
import { TransitionMotion, spring, presets } from 'react-motion';

class PopupMessage extends Component {
    constructor(props) {
        super(props);
        this.onClick = (id) => {
            return () => {
                console.log(id);
                this.props.dispatch(removePopupMessage({ id }));
            }
        }
    }

    componentDidMount() {
        const id = this.props.content.id;
        const displayDuration = this.props.content.displayDuration;

        setTimeout(() => {
            this.onClick(id)();
        }, displayDuration * 1000);
    }

    render() {
        const { id, content, messageType, displayDuration } = { ...this.props.content };
        const className = this.props.class ? this.props.class : '';
        return (
            <div className = { `bv-popup-message-wrapper ${className}` } style = { this.props.style }>
                <div className = 'bv-popup-message'>
                    <p className = 'bv-popup-message-content'>
                        { content }
                    </p>
                    <div className = 'bv-popup-message-close' onClick = { this.onClick(id).bind(this) }>
                        <i className = 'fa fa-times-circle' aria-hidden='true'></i>
                    </div>
                </div>
            </div>
        );
    }
}

class PopupMessages extends Component {
    constructor(props) {
        super(props);
    }

    getDefaultStyles() {
        return this.props.messageList.map(e => {
            return {
                data: { ...e },
                key: e.id,
                style: {
                    height: 0,
                    paddingBottom: 0,
                    opacity: 0
                }
            };
        });
    }

    getStyles() {
        return this.props.messageList.map(e => {
            return {
                data: { ...e },
                key: e.id,
                style: {
                    height: spring(100, presets.gentle),
                    opacity: spring(1, presets.gentle),
                    paddingBottom: spring(15, presets.gentle)
                }
            };
        });
    }

    willEnter() {
        return {
          height: 0,
          opacity: 0,
          paddingBottom: 0
        };
    }

    willLeave() {
        return {
          height: spring(0),
          opacity: spring(0),
          paddingBottom: spring(0)
        };
    }

    render() {
        return (
            <div className = 'bv-popup-message-container'>
                <TransitionMotion
                    defaultStyles = { this.getDefaultStyles.bind(this)() }
                    styles = { this.getStyles.bind(this)() }
                    willLeave = { this.willLeave }
                    willEnter = { this.willEnter }
                >
                    {
                        styles => {
                            return (
                                <div className = 'bv-popup-message-group'>
                                    {
                                        styles.map(({ key, data, style }) => {
                                            const e = { ...data };
                                            return (<PopupMessage key = { key } content = { e } style = { style } dispatch = { this.props.dispatch }/>);
                                        })
                                    }
                                </div>
                            );
                        }
                    }
                </TransitionMotion>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messageList: state.popupMessages
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    };
}

PopupMessages = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopupMessages);

export default PopupMessages;
