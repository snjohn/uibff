import React, { useState, useEffect, useRef } from 'react';
import schema from '../schema/schema.js';
import MyGenericList from './MyGenericList.js';
import MyGenericForm from './MyGenericForm.js';
import UserService from '../service/UserService';
import "../assets/styles/tasklist.css";

// const MyCommonCrud = ({uri, init}) => {
    const MyCommonCrud = () => {

    let init = {
        pkId: 0,
        userid: '',
        email: '',
        firstname: '',
        lastname: '',
        rate: 0
    };
    let uri = "assets/demo/data/users.json";

    const colHdrName = (name) => {
        return name
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
        .replace(/^./, match => match.toUpperCase()); // Capitalize the first letter
    }
    
    const getColumnsFromData = (data) => {
        if (!data || data.length === 0) {
            return [];
        }
        const keys = Object.keys(data[0]);
        //return keys.map(key => ({ field: key, header: key.charAt(0).toUpperCase() + key.slice(1) }));
        return keys.map(key => ({ field: key, header: colHdrName(key)}));
    };
    
    const [items, setItems] = useState([init]);
    const [item, setItem] = useState(init);
    const [mode, setMode] = useState("new");
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState(getColumnsFromData([init]));
    const [deleteItemDialog, setDeleteItemDialog] = useState(false);

    const toast = useRef(null);
    const userService = new UserService();

    const fetchItems = async() => {
        try {
            const response = await fetch(uri);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setItems(data);
            setColumns(getColumnsFromData(data))
        } catch (error) {
            setError(error.message);
        }
    };  
    useEffect(() => {
        fetchItems();
    }, []);

    const [selectOptions, setSelectOptions] = useState({});
    useEffect(() => {
        const fetchOptions = async () => {
            const optionsPromises = Object.entries(schema)
                .filter(([_, field]) => field.type === 'select' && field.optionsEndpoint)
                .map(async ([key, field]) => {
                    try {
                        const response = await fetch(field.optionsEndpoint);
                        const data = await response.json();
                        return { [key]: data };
                    } catch (error) {
                        console.error(`Error fetching options for ${key}:`, error);
                        return { [key]: [] };
                    }
                });

            const optionsArray = await Promise.all(optionsPromises);
            const optionsObject = optionsArray.reduce((acc, options) => ({ ...acc, ...options }), {});
            setSelectOptions(optionsObject);
        };
        fetchOptions();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
     

    const resetItem = () => {
        setItem(init);
        setMode("reset");
    }

    const handleCreateUpdateItem = async (event) => {
        event.preventDefault();
        if (!item || mode==="reset") {
            return;
        }    
        try {
            (mode==="edit")? 
                await userService.updateUser(item.pkId,item):
                await userService.createUser(item);
            fetchItems();
            setItem(init);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleSelectionChange = (event) => {
        setItem(event.value);
        setMode("edit");
    }

    const confirmDeleteItem = (item) => {
        setItem(item);
        setDeleteItemDialog(true);
    };

    const hideDeleteItemDialog = () => {
        setDeleteItemDialog(false);
    };


    const deleteItem = () => {
        let _items = items.filter((val) => val.id !== item.pkId);
        setItems(_items);
        setDeleteItemDialog(false);
        resetItem();
    };

    const handleSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted data:', data);
        resetItem();
    };

    return (
        <div className="grid">
            <div className="col-12">
                <MyGenericList
                    items={items}
                    item={item}
                    columns={columns}
                    onSelectionChange={handleSelectionChange}
                    confirmDeleteItem={confirmDeleteItem}
                    deleteItem={deleteItem}
                    deleteItemDialog={deleteItemDialog}
                    hideDeleteItemDialog={hideDeleteItemDialog}
                    resetItem={resetItem}
                />
            </div>
            <div className="col-12">
                <div className="card">
                    <MyGenericForm
                        schema={schema}
                        item={item}
                        mode={mode}
                        selectOptions={selectOptions}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>

        </div>
	);
    
}
export default MyCommonCrud;