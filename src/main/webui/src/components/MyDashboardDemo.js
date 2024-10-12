//For Process dashboard
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';

//For Service dashboard
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';

import CustomerService from '../service/CustomerService';

//For Functional dashboard
import { DataView } from 'primereact/dataview';
import ProductService from '../service/ProductService';
import GaugeChart from "react-gauge-chart";


const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Complete',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: 'rgb(255, 205, 86)',
            borderColor: 'rgb(255, 205, 86)',
            tension: 0.4
        },
        {
            label: 'Pending',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.4
        }
    ]
};

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Target',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'Value',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

const pieData = {
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            data: [540, 325, 702, 421],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
        }
    ]
};

const polarData = {
    datasets: [
        {
            data: [11, 16, 7, 3],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
            label: 'My dataset'
        }
    ],
    labels: ['Blue', 'Purple', 'Orange', 'Green']
};

const doughnutData = {
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)']
        }
    ]
};

const radarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(54, 162, 235,0.2)',
            borderColor: 'rgba(54, 162, 235,1)',
            pointBackgroundColor: 'rgba(54, 162, 235,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255, 99, 132,0.2)',
            borderColor: 'rgba(255, 99, 132,1)',
            pointBackgroundColor: 'rgba(255, 99, 132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

const MyDashboardDemo = () => {

    //For Service dashboard
    const [customers1, setCustomers1] = useState(null);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [dataviewValue, setDataviewValue] = useState(null);

    const representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];
    const statuses = ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'];

    useEffect(() => {
        const productService = new ProductService();
        productService.getProducts().then((data) => setDataviewValue(data));

        const customerService = new CustomerService();
        customerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
        });

        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getCustomers = (data) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };

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

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        return (
            <React.Fragment>
                <img
                    alt={representative.name}
                    src={`assets/demo/images/avatar/${representative.image}`}
                    onError={(e) => (e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    width={32}
                    style={{ verticalAlign: 'middle' }}
                />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">
                    {representative.name}
                </span>
            </React.Fragment>
        );
    };

    const representativeFilterTemplate = (options) => {
        return (
            <>
                <div className="mb-3 text-bold">Agent Picker</div>
                <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </>
        );
    };

    const representativesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`assets/demo/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">
                    {option.name}
                </span>
            </div>
        );
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

    //For Process dashboard
    const [selectButtonValue1, setSelectButtonValue1] = useState(null);
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];
    const selectButtonValues1 = [
        { name: 'Instantaneous', code: 'inst' },
        { name: 'Trend', code: 'trend' },
    ];
    
    //For functional dashboard
    const itemTemplate = (data) => {
        if (!data) {
            return;
        }
        return dataviewGridItem(data);
    };

    const dataviewGridItem = (data) => {
        return (
            <div className="col-12 md:col-6">
                <div className="card ">
                    <h5 className="centerText">Linear Chart</h5>
                    <div className="text-center">
                        <img src={`assets/demo/images/product/${data.image}`} alt={data.name} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <TabView>
            <TabPanel header="Process">
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">Service</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">Process</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">Mode</label>
                            <SelectButton value={selectButtonValue1} onChange={(e) => setSelectButtonValue1(e.value)} options={selectButtonValues1} optionLabel="name" />
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="state">Aggregate Period</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                    </div>
                </div>

                <div className="grid p-fluid">
                    <div className="col-12 md:col-6 lg:col-6">
                        <div className="container">
                            <img src={`assets/demo/images/product/loan1.jpg`} height="100%" width="100%" alt='img'/>
                        </div>

                        <div className="card p-fluid">
                            <div className="formgrid grid">
                                <div className="field col">
                                    <label>Process Id: lascp:8:9e343-sh4993-2238</label><br/>
                                    <label>Total # of transactions: 7</label>
                            </div>
                                <div className="field col">
                                    <label># of active instances: 15</label><br/>
                                    <label>Revenue: Not Available</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="card">
                            <h5 className="centerText">Service Status</h5>
                            <Chart type="line" data={lineData} />
                        </div>
                        <div className="card">
                            <h5 className="centerText">Response Time</h5>
                            <div className="flex justify-content-center">
                                <GaugeChart
                                    id="gauge-chart1"
                                    nrOfLevels={3}
                                    colors={["green", "orange", "red"]}
                                    arcsLength={[0.3, 0.5, 0.2]}
                                    arcWidth={0.3}
                                    percent={0.75}
                                    textColor={'black'}
                                    // hideText={true} // If you want to hide the text
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                        <div className="card">
                            <h5 className="centerText">Activity Time</h5>
                            <Chart type="bar" data={barData} />
                        </div>
                        <div className="card">
                            <h5 className="centerText">Throughput</h5>
                            <div className="flex justify-content-center">
                                <GaugeChart
                                    id="gauge-chart2"
                                    nrOfLevels={3}
                                    colors={["green", "orange", "red"]}
                                    arcsLength={[0.3, 0.5, 0.2]}
                                    arcWidth={0.3}
                                    percent={0.75}
                                    textColor={'black'}
                                    // hideText={true} // If you want to hide the text
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel header="Functional">

                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-4">
                            <label htmlFor="state">User</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="state">Period</label>
                            <Dropdown id="state" value={dropdownItem} onChange={(e) => setDropdownItem(e.value)} options={dropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="state">Mode</label>
                            <SelectButton value={selectButtonValue1} onChange={(e) => setSelectButtonValue1(e.value)} options={selectButtonValues1} optionLabel="name" />
                        </div>
                    </div>


                    <div className="grid p-fluid">
                        <div className="col-12 md:col-6 lg:col-6">
                            <DataView value={dataviewValue} layout="grid" paginator rows={4} itemTemplate={itemTemplate} ></DataView>
                        </div>

                        <div className="col-12 md:col-6 lg:col-6">
                            <div className="container">
                                <img src={`assets/demo/images/product/loan1.jpg`} height="100%" width="100%" alt='img'/>
                            </div>

                            <div className="card p-fluid">
                                <div className="formgrid grid">
                                    <div className="field col flex justify-content-center">
                                        <Chart style={{ position: 'relative', width: '50%' }} type="pie" data={pieData} />
                                    </div>
                                    <div className="field col">
                                        <DataTable
                                            value={customers1}
                                            className="p-datatable-gridlines"
                                            size='small'
                                            scrollHeight={"150px"} 
                                            scrollable={true}
                                            dataKey="id"
                                            loading={loading1}
                                            responsiveLayout="scroll"
                                            emptyMessage="No customers found."
                                        >
                                            <Column field="name" header="Name" />
                                            <Column header="Date" dataType="date" />
                                            <Column header="Balance" dataType="numeric" />
                                        </DataTable>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </TabPanel>
            <TabPanel header="Service">
                <div className="col-12">
                    <DataTable
                        value={customers1}
                        paginator
                        className="p-datatable-gridlines"
                        size='small'
    //                    showGridlines
                        rows={5}
                        dataKey="id"
                        filters={filters1}
                        scrollable scrollHeight="400px"
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                    >
                        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />
                        <Column header="Date" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                        <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                        <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                        <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                        <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
                    </DataTable>
                    <TabView>
                        <TabPanel header="Process">
                            <div className="grid p-fluid">
                                <div className="col-12">
                                    <img src={`assets/demo/images/product/loan1.jpg`} height="100%" width="100%" alt='img'/>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Details">
                            <div className="col-12">
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </TabPanel>
        </TabView>
	);
};

export default MyDashboardDemo;
	