import React from 'react'
import { useParams } from 'react-router-dom'
import { MasterProduct } from '../masters/master_product';
import { MasterRawMaterialCategory } from '../masters/master_rawmaterial_category';
import { MasterProductCategory } from '../masters/master_category'
import { SideUi } from '../../components/navbar'
import { MasterRawMaterialInventory } from '../masters/master_rawmaterial_inventory';
import { MasterBilling } from '../masters/master_billing';
import MasterStage from '../masters/MasterStage';
import MasterSubStage from '../masters/MasterSubStage';
import MasterClientDetail from '../masters/MasterClientDetail';
import MasterContactPerson from '../masters/MasterContactPerson';
import { MasterSupplier } from '../masters/master_supplier';
import { MasterEmployee } from '../masters/master_employee';
import { MasterAccount } from '../masters/MasterAccount';
import MasterTransaction from '../masters/MasterTransaction';
import MasterMachine from '../masters/MasterMachine';
import MasterDimension from '../masters/MasterDimension';
import MasterDimensionUnit from '../masters/MasterDimensionUnit';
import MasterContact from '../masters/master_contact';
import { MasterRawMaterialMaster } from '../masters/master_raw_material';

const RouteList = () => {
    const {name} = useParams(); 
    if(name === 'contact'){
        return <MasterContact />
    }  
    if(name === 'product-category'){
        return <MasterProductCategory />
    }
    if(name === 'product'){
        return <MasterProduct />
    }
    if(name === 'raw-material-category'){
        return <MasterRawMaterialCategory />
    }
    if(name === 'raw-material-inventory'){
        return <MasterRawMaterialInventory />
    }
    if(name === 'billing'){
        return <MasterBilling />
    }
    if(name === 'stages'){
        return <MasterStage />
    }
    if(name === 'sub-stages'){
        return <MasterSubStage />
    }
    if(name === 'client-details'){
        return <MasterClientDetail />
    }
    if(name === 'contact-person'){
        return <MasterContactPerson />
    }
    if(name==='supplier'){
        return <MasterSupplier />
    }
   
    if(name==='employee'){
        return <MasterEmployee />
    }
    if(name === 'account'){
        return <MasterAccount />
    }
    if(name === 'transaction'){
        return <MasterTransaction />
    }
   
    if(name === 'machine'){
        return <MasterMachine />
    }
    if(name === 'dimension'){
        return <MasterDimension />
    }
    if(name === 'dimension-unit'){
        return <MasterDimensionUnit />
    }
    if(name === 'raw-material-master'){
        return <MasterRawMaterialMaster />
    }
   
}

export default RouteList