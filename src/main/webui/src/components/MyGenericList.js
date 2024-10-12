import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import "../assets/styles/tasklist.css";

const MyGenericList = ({items, item, columns, onSelectionChange, confirmDeleteItem, deleteItem, deleteItemDialog, hideDeleteItemDialog, resetItem}) => {

    const actionBodyTemplate2 = (rowData) => {
        return (
            <>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteItem(rowData)} />
            </>
        );
    };

    const deleteItemDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteItemDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteItem} />
        </>
    );

    const header = (
        <div className="h-3rem item-container">
            <span className="item-left"> <i className="pi pi-list" style={{ fontSize: '1.5rem' }}></i> &nbsp;<h5>Product List</h5></span>
            <Button icon="pi pi-plus" className="item-right" style={{ width: "130px", height: "40px",}} onClick={resetItem} >New Product</Button> 
        </div>
    );

    return (
        <div className="card">
            <DataTable
                value={items}
                selectionMode="single"
                selection={item}
                onSelectionChange={onSelectionChange}
                paginator
                header={header}
                stripedRows
                size='small'
                showGridlines
                rows={5}
                dataKey="pkId"
        //                        filters={filters1}
                scrollable scrollHeight="400px"
        //                        loading={loading1}
                responsiveLayout="scroll"
                emptyMessage="No items found."
            >
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} 
                        filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }}/>
                ))}
                <Column header="Action" body={actionBodyTemplate2}></Column>
            </DataTable>
            
            <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                <div className="flex align-items-center justify-content-center">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {item && (
                        <span>
                            Are you sure you want to delete <b>{item.itemid}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    )
};
export default MyGenericList;
