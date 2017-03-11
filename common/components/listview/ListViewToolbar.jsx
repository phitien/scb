import React from 'react'
import BaseComponent from 'common/components/listview/BaseComponent'

export default class ListViewToolbar extends BaseComponent {
    get mainClassName() {return 'list-view-toolbar'}
    get actions() {
        return {
            refresh: this.onRefresh,
            clear: this.onClear,
            filter: this.onFilter
        }
    }
    onClear(name, e) {
        this.store.clear()
        this.service.fetch(true)
        this.setState({filters: {}})
    }
    onRefresh(name, e) {
        this.service.fetch(true)
    }
    onFilter(name, e) {
        this.store.page = this.store.defaultPage
        var value = e.target.value
        if (e.target.type == 'checkbox' || e.target.type == 'radio') {
            value = e.target.checked
            if (value) {
                this.state.filters[name] = this.store.filter(name, value)
            }
            else {
                this.store.removeFilter(name)
                this.state.filters[name] = ''
            }
            this.setState({filters: this.state.filters})
            this.service.fetch(true)
        }
        else {
            this.state.filters[name] = this.store.filter(name, value)
            this.setState({filters: this.state.filters})
            this.service.fetch(true)
        }
    }
    renderChild = (child, i) => {
        var action = child.props.action
        var addonProps = {key: i}
        if (action && this.actions.hasOwnProperty(action)) {
            var name = child.props.name
            if (!child.props.onClick && (child.type == 'button' || (child.type == 'input' && child.type == 'button'))) {
                addonProps.onClick = this.actions[action].bind(this, name)
            }
            else if (!child.props.onChange && (child.type == 'input' || child.type == 'select')) {
                addonProps.onChange = this.actions[action].bind(this, name)
                var filters = this.state && this.state.filters ? this.state.filters : {}
                filters[name] = this.service.store.filter(name)
                this.state.filters = filters
                if (child.props.type == 'checkbox' || child.props.type == 'radio') {
                    addonProps.checked = this.state.filters[name] ? this.state.filters[name] : false
                }
                else {
                    addonProps.value = this.state.filters[name] ? this.state.filters[name] : ''
                }
            }
        }
        else if(child.props.children && typeof child.props.children == 'object') {
            if (child.props.children.length)
                addonProps.children = child.props.children.map((subchild, j) => this.renderChild(subchild, j))
            else
                addonProps.children = this.renderChild(child.props.children, 0)
        }
        return React.cloneElement(child, this.util.assign({}, child.props, addonProps))
    }
    render() {
        return (
            <div className={this.className}>
                {this.props.children.map((child, i) => this.renderChild(child, i))}
            </div>
        )
    }
}
