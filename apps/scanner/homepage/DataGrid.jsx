import React from 'react'
import CoreSection from 'common/core/CoreSection'
import ScannerComponent from 'apps/scanner/components/Component'
import CoreDataGrid from 'common/core/CoreDataGrid'

export default class DataGrid extends ScannerComponent {
    render() {
        const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }]
        const rows = this.store.griddata
        const rowGetter = rowNumber => rows[rowNumber]
        return <CoreDataGrid
          columns={columns}
          rowGetter={rowGetter}
          rowsCount={rows.length}
          minHeight={500} />
    }
}
