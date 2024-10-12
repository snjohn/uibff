import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import "../assets/styles/tasklist.css";

import UserService from '../service/UserService';

const MyUserListDemo = () => {

    let emptyUser = {
        pkid: '',
        userid: '',
        email: '',
        firstname: '',
        lastname: '',
        rate: 0
    };

    const [user, setUser] = useState(emptyUser);
    const [users, setUsers] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [mode, setMode] = useState("new");

    const toast = useRef(null);
    
    const userService = new UserService();
    const fetchUsers = () => {
    //    userService.getUsersLocal().then((data) => {
        userService.getUsersRemote().then((data) => {
            setUsers(data);
            setLoading1(false);
        });
    };

    useEffect(() => {
        fetchUsers();
        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            userid: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            firstname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            lastname: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            rate: { value: null, matchMode: FilterMatchMode.BETWEEN }
        });
    };

    const editUser = (user) => {
        setUser({ ...user });
        setMode("edit");
    };

    const resetUser = () => {
        setUser(emptyUser);
        setMode("new");
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = () => {
        let _users = users.filter((val) => val.id !== user.pkid);
        setUsers(_users);
        setDeleteUserDialog(false);
        resetUser();
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    };

    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </>
    );

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(rowData)} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteUser(rowData)} />
                </span>
            </React.Fragment>
        );
    };

    const handleCreateUpdateItem = async (event) => {
        event.preventDefault();
        if (!user) {
          return;
        }    
        try {
            (mode==="edit")? 
                await userService.updateUser(user.pkid,user):
                await userService.createUser(user);
          fetchUsers();
          setUser(emptyUser);
        } catch (error) {
          console.error('Error updating item:', error);
        }
    };
    
    const changeSelection = (event) => {
        setUser(event.value);
        setMode("edit");
    }

    const actionBodyTemplate2 = (rowData) => {
        return (
            <>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteUser(rowData)} />
            </>
        );
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    };

    /*Better approach to handle input change use below common function
    https://devsmitra.medium.com/react-best-practices-and-patterns-to-reduce-code-part-3-543b8cef9954
    And use the function as below
    return (
        <form>
            <input type="text" name="name" onChange={onInputChange2} />
            <input type="text" name="email" onChange={onInputChange2} />
        </form>
    );
    
    const onInputChange2 = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };
    */
   
    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };
    
    const header = (
        <div className="h-3rem item-container">
            <span className="item-left"> <i className="pi pi-list" style={{ fontSize: '1.5rem' }}></i> &nbsp;<h5>Product List</h5></span>
            <Button icon="pi pi-plus" className="item-right" style={{ width: "130px", height: "40px",}} onClick={resetUser} >New Product</Button> 
        </div>
    );

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <DataTable
                        value={users}
                        selectionMode="single"
                        selection={user}
                        onSelectionChange={changeSelection}
                        paginator
                        header={header}
                        stripedRows
                        size='small'
                        showGridlines
                        rows={5}
                        dataKey="pkid"
                        filters={filters1}
						scrollable scrollHeight="400px"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No users found."
                    >
                        <Column field="userid" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="email" header="Email" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="firstname" header="First Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="lastname" header="Last Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Action" body={actionBodyTemplate2}></Column>
                    </DataTable>
                    
                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && (
                                <span>
                                    Are you sure you want to delete <b>{user.userid}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
		
            <div className="col-12">
                <form onSubmit={handleCreateUpdateItem}>
                    <TabView>
                        <TabPanel header="Header I">
							<div className="col-12">
 
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="userid">UserId</label>
                                        <InputText id="userid" type="text" value={user.userid} onChange={(e) => onInputChange(e, 'userid')}/>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="email">Email</label>
                                        <InputText id="email" type="text" value={user.email} onChange={(e) => onInputChange(e, 'email')}/>
                                    </div>
                                    <div className="field col-12">
                                        <label htmlFor="firstname">First Name</label>
                                        <InputText id="firstname" type="text" value={user.firstname} onChange={(e) => onInputChange(e, 'firstname')}/>
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="lastname">Last Name</label>
                                        <InputText id="lastname" type="text" value={user.lastname} onChange={(e) => onInputChange(e, 'lastname')}/>
                                    </div>
                                </div>
 
 							</div>
                        </TabPanel>
                        <TabPanel header="Header II">
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                        <TabPanel header="Header III">
                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt
                                in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                                minus.
                            </p>
                        </TabPanel>
                    </TabView>
                    <div className="card">
                        <div className="formgroup-inline">
                            <div className="field">
                                <Button type="submit" label={(mode==="edit")?"Update":"Create"}></Button>
                            </div>
                            <div className="field">
                                <Button label="Cancel" onClick={resetUser}></Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
		</div>
	);
};
export default MyUserListDemo;