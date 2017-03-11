import React from 'react'
import BaseComponent from 'common/components/listview/BaseComponent'
import ContentHeader from 'common/components/listview/ContentHeader'
import ContentBody from 'common/components/listview/ContentBody'
import ContentFooter from 'common/components/listview/ContentFooter'

export default class Content extends BaseComponent {
    get mainClassName() {return 'list-view-content'}

    render() {
        if (this.isNotATable === true) {
            return (
                <div className={this.className}>
                    <ContentHeader {...this.properties}/>
                    <ContentBody {...this.properties}/>
                    <ContentFooter {...this.properties}/>
                    <div className='clearfix'></div>
                </div>
            )
        }
        return (
            <div className={this.className}>
                <table>
                    <ContentHeader {...this.properties}/>
                    <ContentBody {...this.properties}/>
                    <ContentFooter {...this.properties}/>
                </table>
            </div>
        )
    }
}
