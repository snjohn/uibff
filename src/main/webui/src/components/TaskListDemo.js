import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { RadioButton } from 'primereact/radiobutton';
import { ToggleButton } from 'primereact/togglebutton';
import { TabView, TabPanel } from 'primereact/tabview';
import { AutoComplete } from 'primereact/autocomplete';

import CustomerService from '../service/CustomerService';
import CountryService from '../service/CountryService';
import "../assets/styles/tasklist.css";

const TaskListDemo = () => {
    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [action, setAction] = useState(null);
    const [toggleValue, setToggleValue] = useState(false);
    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [countries, setCountries] = useState([]);

    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'];
    const customerService = new CustomerService();
    const countryservice = new CountryService();

    useEffect(() => {
        setAction("complete");
        customerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
        });
        initFilters1();

        countryservice.getCountries().then(data => setCountries(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

    const searchCountry = (event) => {
        setTimeout(() => {
            let _filteredCountries;
            if (!event.query.trim().length) {
                _filteredCountries = [...countries];
            }
            else {
                _filteredCountries = countries.filter((country) => {
                    return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }

            setFilteredCountries(_filteredCountries);
        }, 250);
    }

    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
    };

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="assets/demo/images/flags/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} width={30} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">
                    {rowData.country.name}
                </span>
            </React.Fragment>
        );
    };

    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    };

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>;
    };

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    };

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    };

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData) => {
        return <span className={`customer-badge status-${rowData.status}`}>{rowData.status}</span>;
    };

    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    };

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '.5rem' }}></ProgressBar>;
    };

    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        );
    };

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-pink-500 pi-times-circle': !rowData.verified })}></i>;
    };

    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />;
    };

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

    const handleChange = (event) => {
        if (event.target.value === "complete") {
            setSelectedCountry1("");
        }
        setAction(event.target.value);
    };

    return (
        <>
        <div className="card">
            <TabView>
                <TabPanel header="My Task List">
                <div className="col-12">
                    <DataTable
                        value={customers1}
                        paginator
                        className="p-datatable-gridlines"
                        size='small'
                        showGridlines
                        rows={5}
                        dataKey="id"
                        filters={filters1}
						scrollable scrollHeight="400px"
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                    >
                        <Column field="name" header="Task Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                        <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                        <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                        <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                        <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                        <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                    </DataTable>
                </div>

            </TabPanel>
            <TabPanel header="My Team Task List">
            <div className="col-12">

                    <DataTable
                        value={customers1}
                        paginator
                        className="p-datatable-gridlines"
                        size='small'
                        showGridlines
                        rows={5}
                        dataKey="id"
                        filters={filters1}
						scrollable scrollHeight="400px"
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                    >
                        <Column field="name" header="Task Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                        <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                        <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                        <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                        <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                        <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                    </DataTable>

            </div>
            </TabPanel>
            </TabView>
            </div>
            <div className="col-12">
                <div className="card">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                        <h5>Task Details</h5>
                            <div className="card">
                                <div className="grid formgrid">
                                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <p>Task Id</p>
                                        <p>Task Name</p>
                                        <p>Task Owner</p>
                                        <p>Task Create Date</p>
                                        <p>Task Due Date</p>
                                        <p>Process</p>
                                    </div>
                                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <p>1e34-349843-a873f</p>
                                        <p>Review Document</p>
                                        <p>Simon John</p>
                                        <p>12-Jan-2024</p>
                                        <p>16-Jan-2024</p>
                                        <p>RFC Approval</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <h5>Actions</h5>
                            <div className="card">
                            <div className="grid formgrid">
                                <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                                    <div className="field-radiobutton">
                                        <RadioButton inputId="complete" name="action" value="complete" onChange={handleChange} checked={action === 'complete'} />
                                        <label htmlFor="complete">Complete</label>
                                    </div>
                                    <div className="field-radiobutton">
                                        <RadioButton inputId="reassign" name="action" value="reassign" onChange={(e) => setAction(e.value)} checked={action === 'reassign'} />
                                        <label htmlFor="reassign">Re-assign</label>
                                    </div>
                                    <div className="field-radiobutton">
                                        <RadioButton inputId="delegate" name="action" value="delegate" onChange={(e) => setAction(e.value)} checked={action === 'delegate'} />
                                        <label htmlFor="delegate">Delegate</label>
                                    </div>
                                </div>
                                <div id="container" className="col-12 mb-2 lg:col-6 lg:mb-0">
                                    <div id="copyright" className="field">
                                        <label htmlFor="user">User</label>
                                        <AutoComplete id="user" disabled={action==='complete'} value={selectedCountry1} suggestions={filteredCountries} completeMethod={searchCountry} field="name" onChange={(e) => setSelectedCountry1(e.value)} aria-label="Countries" dropdownAriaLabel="Select Country" />
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="card">
                                <div className="grid formgrid">
                                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <ToggleButton checked={toggleValue} onChange={(e) => setToggleValue(e.value)} onLabel="Claim" offLabel="Unclaim" />
                                    </div>
                                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <Button label="Proceed"></Button>
                                    </div>
                                    <div className="col-12 mb-2 lg:col-4 lg:mb-0">
                                        <Button label="Cancel"></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
	);
};
export default TaskListDemo;