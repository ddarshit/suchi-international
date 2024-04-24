import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AddInventory from './pages/inventory/add_inventory';

import { SideUi } from './components/navbar';

import DashBoardTable from './pages/dashboard/dashboard_table';
import Filter from './components/filterUi';
import Purchase from './pages/purchase/purchase';
import Login from './components/Login';
// import MasterTable from './components/master_table';
import MasterList from './pages/master/master_list';
import RouteList from './pages/master/RouteList';
import ToastMsg from './components/ToastMsg';
import { ChangeStageTable } from './pages/inventory/change_table';
import ChangeStage from './pages/dashboard/change_stage';
import InventoryMaster from './pages/inventory/in';
import PurchaseOrder from './pages/purchase_order';

function App() {
  return (
    <React.Fragment>
      <ToastMsg />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SideUi><DashBoardTable /></SideUi>} />
          <Route path="/dashboard/change-stage" element={<SideUi><ChangeStage /></SideUi>} />
          <Route path='/inventory' element={<SideUi><InventoryMaster /></SideUi>} />
          <Route path="/Purchase Order" element={<SideUi><PurchaseOrder /></SideUi>} />
          <Route path='/Purchase' element={<SideUi><Purchase /></SideUi>} />
          <Route path="/Reports" element={<SideUi><AddInventory /></SideUi>} />
          <Route path='/Billing' element={<SideUi><Filter /></SideUi>} />
          <Route path="/Masters" element={<SideUi></SideUi>} />
          <Route path="/Masters/:name" element={ <SideUi><RouteList /></SideUi>} />
          <Route path='/Others' element={<SideUi><AddInventory /></SideUi>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
