import React from 'react';
import CoreComponent from './CoreComponent';

export default class CoreSection extends CoreComponent {
    get mainClassName() {
        return 'section';
    }
    get heading() {
        if (this.props.heading) {
            return (<div className='heading'>{this.props.heading}</div>)
        }
    }
    render() {
        return (
            <div className={this.className}>
                {this.heading}
                {this.props.children}
            </div>
        );
    }
}
