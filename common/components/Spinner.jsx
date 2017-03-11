import React from 'react';

export default class Spinner extends React.Component {
    render() {
        if (!this.props.loaded) {
            return (
                <div className="spinner col-xs-12"><img src="/public/static/images/balls.gif" /></div>
            );
        } else {
            return (<div className="spinner hidden">&nbsp;</div>);
        }
    }
}
