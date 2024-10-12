import React, { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import "../assets/styles/tasklist.css";

const MyGenericForm = ({ schema, item, mode, selectOptions, onSubmit }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        defaultValues: item,
    });

    // const onInputChange = (e, name) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _item = { ...item };
    //     _item[`${name}`] = val;

    //     setItem(_item);
    // };

    const formRef = useRef(null);
  // Initialize form data when the component loads
    useEffect(() => {
        const initialData = {...item};

        if (formRef.current) {
            Object.keys(initialData).forEach((field) => {
                if (formRef.current.elements[field]) {
                    formRef.current.elements[field].value = initialData[field];
                }
            });
        }
    }, []);


    const renderFormControl = (key, field) => {
        let full = "field col-12";
        let half = "field col-12 md:col-6";
        let quart = "field col-12 md:col-3";

        switch (field.type) {
            case 'text':
            case 'email':
            case 'number':
            case 'password':
                return (
                    <div key={key} className={field.class}>
                        <label htmlFor={field}>{field.label}</label>
                        <InputText
                            {...register(key, field.validation)}
                            type={field.type}
                            name={key}
                            id={key}
                            value={item[key]}
                        />
                        {errors[key] && (<span>{errors[key].message}</span>)}
                    </div>
                );
            case 'textarea':
                return (
                    <div key={key} className={field.class}>
                        <label htmlFor={field}>{field.label}</label>
                        <InputTextarea
                            {...register(key, field.validation)}
                            name={key}
                            id={field}
                            value={item}
                        />
                        {errors[key] && (<span>{errors[key].message}</span>)}
                    </div>
                );
            case 'select':
                return (
                    <div key={key} className={field.class}>
                        <label>{field.label}</label>
                        <Dropdown {...register(key, field.validation)} 
                            name={key}
                            value={item[key]} 
                            // onChange={(e) => setDropdownValue(e.value)} 
					        options={field.options} 
                            optionLabel={field.label} 
                            placeholder="Select Gender">
                        </Dropdown>


                        {/* <Dropdown {...register(key, field.validation)} name={key}>
                            {field.options && field.options.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                            {selectOptions[key] && selectOptions[key].map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Dropdown> */}
                        {errors[key] && (<span>{errors[key].message}</span>)}
                    </div>
                );
            case 'radio':
                return (
                    <div key={key} className={field.class}>
                        <label>{field.label}</label>
                        <div className='card'>
                            <div className="grid">
                                {field.options && field.options.map((option, index) => (
                                    <div className="col-12 md:col-1">
                                        <div className="field-radiobutton">
                                            <RadioButton 
                                                {...register(key, field.validation)}
                                                inputId={option.value} 
                                                name={key} 
                                                value={option.value} 
                                            />
                                            <label htmlFor={option.value}>{option.label}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {errors[key] && (<span>{errors[key].message}</span>)}
                    </div>
                );
            case 'checkbox':
                return (
                    <div key={key} className={field.class}>
                        <label>{field.label}</label>
                        <div className="flex flex-wrap justify-content-center gap-3">
                        {field.options.map((category) => {
                            return (
                                    <div key={category.value} className="flex align-items-center">
                                        <Checkbox {...register(key, field.validation)}
                                            inputId={category.value} 
                                            name={key} value={category} 
                                            
                                        />
                                        <label htmlFor={category.value} className="ml-2">{category.value}</label>
                                    </div>
                            );
                        })}
                        </div>
                        {errors[key] && (<span>{errors[key].message}</span>)}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Render form controls dynamically */}
            <div className="p-fluid formgrid grid">
                {Object.entries(schema).map(([key, field]) =>
                    renderFormControl(key, field)
                )}
            </div>
            {/* <button type="submit" disabled={isSubmitting}>Submit</button> */}
            <div className="card">
                <div className="formgroup-inline">
                    <div className="field">
                        <Button type="submit" label={(mode==="edit")?"Update":"Create"}></Button>
                    </div>
                    <div className="field">
                        <Button label="Cancel" onClick={reset}></Button>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default MyGenericForm;
