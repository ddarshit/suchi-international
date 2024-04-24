import React,{useEffect, useState} from 'react';
import { getCategory } from '../../services/handlers/get_dropdowns';
import DynamicFormDialog from '../../components/dynamic_form_dialogue';
import MasterTable from '../../components/master_table';

const MasterTransaction = () => {
    const formConfig = [  
        { field: 'credit_debit', headerName: 'Credit/Debit', width: 200, editable: true, active: true },
        { field: 'amt', headerName: 'Amount', width: 200, editable: true, active: true },
        { field: 'date', headerName: 'Transaction Date', type: 'date', width: 200, editable: true, active: true },
        { field: 'invoice', headerName: 'Invoice', width: 200, type: "number", editable: true, active: true },
        { field: 'type_of_transaction_id', headerName: 'Select Type of Transaction', width: 200, type: "singleSelect", valueOptions: [], editable: true, active: true },
        { field: 'isActive', headerName: '', type: "number", align: "start", headerAlign: 'start', width: 0, editable: true },
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
            credit_debit: "credit",
            amt: "Fancy Bowl",
            date: new Date(0),
            invoice: 20,
            type_of_transaction_id: 20,
            added_by: "kssjsjjs",
            modified_by: "jjsjjd",
            added_date: new Date(0),
            modified_date: new Date(0),
        },
        {
            id: 2,
            credit_debit: "credit",
            amt: "Fancy Bowl",
            date: new Date(0),
            invoice: 20,
            type_of_transaction_id: 20,
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
        <div style={{width: "75%",position: "fixed"}}>
            <MasterTable toggleForm={toggleForm} column={formConfig} data={data} title="Transaction" />
            <DynamicFormDialog
                title="Add transaction"
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

export default MasterTransaction