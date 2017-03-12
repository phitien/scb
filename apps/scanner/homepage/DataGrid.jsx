import React from 'react'
import CoreSection from '../../../common/core/CoreSection'
import CoreDataGrid from '../../../common/core/CoreDataGrid'
import ScannerComponent from '../components/Component'

export default class DataGrid extends ScannerComponent {
    render() {
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'col1', name: 'Col1' },
            { key: 'col2', name: 'Col2' },
            { key: 'col3', name: 'Col3' },
            { key: 'col4', name: 'Col4' },
            { key: 'col5', name: 'Col5' },
            { key: 'col6', name: 'Col6' },
            { key: 'col7', name: 'Col7' },
            { key: 'col8', name: 'Col8' },
            { key: 'col9', name: 'Col9' },
        ]
        const rows = this.store.griddata
        const rowGetter = rowNumber => rows[rowNumber]
        return <CoreDataGrid title='Sample data grid'
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={rows.length}
          minHeight={500} />
    }
}
