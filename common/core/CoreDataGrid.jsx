import React from 'react'
import CoreComponent from './CoreComponent'

export default class CoreDataGrid extends CoreComponent {
    get mainClassName() {return `core-data-grid ${this.gridClassName}`}
    get gridClassName() {return ''}
    get columns() {return this.props.columns}
    get title() {return this.props.title ? <tr className='title'><td colSpan={this.columns.length}>{this.props.title}</td></tr> : null}
    get header() {return <thead>
        {this.title}
        <tr>
            {this.columns.map((item,i) => <th key={i}>{item.name}</th>)}
        </tr>
    </thead>}
    get rowsCount() {return this.props.rowsCount}
    get rowGetter() {return this.props.rowGetter}
    get rows() {
        let rows = []
        for(var i=0;i<this.rowsCount;i++) rows.push(this.renderRow(i))
        return rows
    }
    onRowClick = (data,i) => e => {}
    onCellClick = (data,i,j) => e => {
        if (this.state.selectedRow == i && this.state.selectedCell == j) this.setState({selectedRow: null, selectedCell: null})
        else this.setState({selectedRow: i, selectedCell: j})
    }
    renderRow = (i) => {
        let data = this.rowGetter(i)
        return <tr key={i} onClick={this.onRowClick(data,i)}
            className={this.state.selectedRow==i ? 'selected' : ''}>{this.columns.map((item,j) => {
            return <td key={j} onClick={this.onCellClick(data,i,j)}
                className={this.state.selectedCell==j ? 'selected' : ''}
                >{data[item.key]}</td>
        })}</tr>
    }
    get body() {return <tbody>
        {this.rows}
    </tbody>}
    get current() {return 1}
    get footer() {return <tfoot><tr><td colSpan={this.columns.length}>
        <a className='prev'><span>{`<`}</span></a>
        <a className='current'><span>{this.current}</span></a>
        <a className='next'><span>{`>`}</span></a>
    </td></tr></tfoot>}
    render() {
        return <table className={this.className}>
            {this.header}
            {this.body}
            {this.footer}
        </table>
    }
}
