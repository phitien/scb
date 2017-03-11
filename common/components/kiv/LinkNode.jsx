import React from 'react';

export default class LinkNode extends React.Component {

    render() {
        // console.log('LinkNode - '+this.props.children);
        return (
                <a className="col-xs-12" href={this.props.href}>{this.props.children.toString()}</a>
        );
    }
}
