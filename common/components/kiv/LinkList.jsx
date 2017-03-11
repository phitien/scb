import React from 'react';

import LinkNode from './LinkNode.jsx';

export default class LinkList extends React.Component {

    render() {
        // console.log('LinkList - '+this.props.data);
        var linkNodes = this.props.data.map(function(link) {
            // console.log('link text '+link.text);
            return (
                <LinkNode href={link.href}>{link.text}</LinkNode>
            );
        });
        return (
            <div className="linkList col-xs-12">
                {linkNodes}
            </div>
        );
    }
}
