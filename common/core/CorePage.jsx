import React from 'react';
import CoreComponent from './CoreComponent';

export default class CorePage extends CoreComponent {
    get containerClassName() {return this.props.containerClassName !== undefined ? this.props.containerClassName : 'container'}
    get spinner() {return (<div className='spinner'><img src='/public/static/images/balls.gif'/></div>)}
    get isLoading() {return this.props.renderer.isLoading}
    get isBlockingScreen() {return this.props.renderer.isBlockingScreen}
    get pageLoadingIndicator() {
        if (this.isBlockingScreen) return (<div className='viewport-overlay'>{this.spinner}</div>)
        if (this.isLoading) return this.spinner
    }
    get content() {return this.props.renderer.content}
    get sidebar() {
        return <div className='sidebar'>
            {this.props.renderer.sidebar}
        </div>
    }
}
