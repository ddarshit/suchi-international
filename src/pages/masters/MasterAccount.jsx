import React,{useEffect, useState} from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';
import styled from 'styled-components';
 

export const MasterAccount = () => {

    const formConfig = [
        
        { field: 'acc_type_id', headerName: 'Select Account Type', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true, },
        { field: 'type_of_acc', headerName: 'Type of Account', width: 180, editable: true, active: true },
        { field: 'client_id', headerName: 'Select Client Id', width: 180, type: "singleSelect", valueOptions: [], editable: true, active: true },
        // { field: 'isActive', headerName: '', type: "number", align: "start", headerAlign: 'start', width: 0, editable: true },
        {
            field: 'added_by',
            headerName: 'Added By',
            width: 180,
        },

        {
            field: 'modified_by',
            headerName: 'Modified By',
            width: 180,
        },
        {
            field: 'added_date',
            headerName: 'Added Date',
            type: "date",
            width: 180,
        },
        {
            field: 'modified_date',
            headerName: 'Modified Date',
            type: "date",
            width: 180,
        },

    ];

    const data = [
        {
            id: 1,
            acc_type_id: "psr",
            type_of_acc: "Fancy Bowl",
            client_id: 20,
            added_by: "kssjsjjs",
            modified_by: "jjsjjd",
            added_date: new Date(0),
            modified_date: new Date(0),
        },
        {
            id: 2,
            acc_type_id: "zbc",
            type_of_acc: "Fancy Bowl",
            client_id: 10,
            added_by: "kssjsjjs",
            modified_by: "jjsjjd",
            added_date: new Date(0),
            modified_date: new Date(0),
        },
    ]

    const [loadformConfig, setFormConfig] = useState(formConfig);
    const initialFormState = {
        name: '',
        alias: '',
    };

    useEffect(() => {
        const fetchValueOptions = async () => {
            try {
                const updatedFormConfig = [...formConfig];

                const singleSelectFields = updatedFormConfig.filter(
                    (field) => field.type === 'singleSelect'
                );

                for (const field of singleSelectFields) {
                    const data = await getCategory();

                    field.valueOptions = data.map((item) => ({
                        value: item.id,
                        label: item.value,
                    }));
                }

                setFormConfig(updatedFormConfig);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchValueOptions();
    }, []);

    const [formState, setFormState] = useState(initialFormState);
    const [open, setOpen] = useState(false);
    const handleChange = (field, value) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        console.log(formState)
    };

    const handleSave = (e) => {
        e.preventDefault()
        // Perform the save action with the formState data
        console.log(formState);
    };

    const toggleForm= ()=> {
        setOpen(!open);
      }

    return (
        <div style={{width: "75%",position: "fixed"}} >
            <MasterTable toggleForm={toggleForm} column={formConfig} data={data} title="Account" />
            <DynamicFormDialog
                title="Add Account"
                open={open}
                handleClose={()=>{setOpen(!open)}}
                formState={formState}
                handleChange={handleChange}
                handleSave={handleSave}
                formConfig={loadformConfig}
            />
        </div>
    )
}
