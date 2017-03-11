import React from 'react';

import Col from 'react-bootstrap';
import log from 'loglevel';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        // // log.debug(this.constructor.name, ' >>> constructor');
        this.state = {};
        this.state.formSubmissionResult = (<span>&nbsp;</span>);
    }
    componentWillMount() {
        // log.debug(this.constructor.name  + ' >>> componentWillMount');
        if (this.store && this.onStoreUpdated) this.store.removeChangeListener(this.onStoreUpdated);
    }
    componentDidMount() {
        // log.debug(this.constructor.name  + ' >>> componentDidMount');
        if (this.store && this.onStoreUpdated) this.store.addChangeListener(this.onStoreUpdated);
    }
    componentWillReceiveProps(nextProps) {
        // log.debug(this.constructor.name  + ' >>> componentWillReceiveProps: ', nextProps, this.props);
        // if (nextProps !== this.props) this.refresh();
    }
    componentWillUpdate(nextProps, nextState) {
        // log.debug(this.constructor.name  + ' >>> componentWillUpdate - nextProps: ', nextProps, ' nextState: ', nextState);
    }
    componentDidUpdate(prevProps, prevState) {
        // log.debug(this.constructor.name  + ' >>> componentWillReceiveProps - prevProps: ', prevProps, ' prevState: ', prevState);
    }
    componentWillUnmount() {
        // log.debug(this.constructor.name  + ' >>> componentWillUnmount');
        if (this.store && this.onStoreUpdated) this.store.removeChangeListener(this.onStoreUpdated);
    }
    refresh() {
        log.warn('child class should implement this');
    }

    renderComponent(component) {
        // // log.debug('renderComponent');
        try {
            if (component) return component;
            else return (<div className="cms-only blank">&nbsp;</div>);
        } catch (e) {
            log.error(e.stack);
            return (<div className="cms-only error">{e.stack}</div>);
        }
    }
    render() {
        // log.debug(this.constructor.name + ' >>> render');
        try {
            // var component = this.renderComponent();
            // console.log('component is', component);
            // var tmp = (<Col lg={this.weightLg} md={this.weightMd} sm={this.weightSm} xs={this.weightXs}>
            //     {this.renderComponent()}
            // </Col>);
            if (this.renderComponent()) return (this.renderComponent());
            else return (<div className="cms-only">&nbsp;</div>);
        } catch (e) {
            log.error(e.stack);
            return(<div className="cms-only error">{e.stack}</div>);
        }
    }
}
