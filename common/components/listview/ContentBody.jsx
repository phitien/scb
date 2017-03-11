import React from 'react'
import BaseComponent from 'common/components/listview/BaseComponent'
import ContentNoItem from 'common/components/listview/ContentNoItem'
import ContentBodyRow from 'common/components/listview/ContentBodyRow'

export default class ContentBody extends BaseComponent {
    get mainClassName() {return 'tbl-body list-view-content-body'}

    renderListViewNoItem = () => <ContentNoItem {...this.properties}/>
    render() {
        if (this.rendererHas('renderListViewBody'))
            return this.renderer.renderListViewBody()
        if (this.hasNoItem) return this.renderListViewNoItem()
        let numItems = this.numItems
        if (this.isNotATable === true) {
            return (<div className={this.className}>
                {this.results.map((item, i) =>
                    <ContentBodyRow key={i} {...this.properties}
                        rowdata={item}
                        rowindex={i}/>)}
            </div>)
        }
        return (<tbody className={this.className}>
            {this.results.map((item, i) =>
                <ContentBodyRow key={i} {...this.properties}
                    rowdata={item}
                    rowindex={i}/>)}
        </tbody>)
    }
}
