import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from '@mui/icons-material/Login';
import ReceiptLong from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CurrencyRupee from "@mui/icons-material/CurrencyRupeeRounded";
import LayersIcon from "@mui/icons-material/Layers";
import Typography from "@mui/material/Typography";
import { ListItem } from "@mui/material";
import { changeRoute } from "../features/navbarSlice";
import { KeyboardArrowUp, KeyboardArrowDown, Margin} from '@mui/icons-material';
import { Button } from '@mui/material'
import { NavLink } from "react-router-dom";
import { useState } from "react";


export const MainListItems = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  
  const mastersList = [ 

    { id: 1, name: "Account", link: 'account' },
    { id: 2, name: "Billing", link: 'billing' },
    { id: 3, name: "Client Details", link: 'client-details' },
    { id: 4, name: "Contact", link: 'contact' },   
    { id: 5, name: "Contact Person", link: 'contact-person' },
    { id: 6, name: "Dimension", link: 'dimension' },
    { id: 7, name: "Dimension Unit", link: 'dimension-unit' }, 
    { id: 8, name: "Employee", link: 'employee' },
    { id: 9, name: "Machine", link: 'machine' },
    { id: 10, name: "Product", link: 'product' },
    { id: 11, name: "Product Category", link: 'product-category' },
    { id: 12, name: "Raw Material Master", link: 'raw-material-master' },   
    { id: 13, name: "Raw Material Category", link: 'raw-material-category' },
    { id: 14, name: "Raw Material Inventory", link: 'raw-material-inventory' },
    { id: 15, name: "Stages", link: 'stages' },
    { id: 16, name: "Sub Stages", link: 'sub-stages' },
    { id: 17, name: "Supplier", link: 'supplier' },
    { id: 18, name: "Transaction", link: 'transaction' },
  
  ]

  const textColor = {
    color: "white",
  };

  
  const toggleArrow = () => {
    return isOpen ? (

      <KeyboardArrowUp sx={{ color: textColor.color }} />

    ) : (

      <KeyboardArrowDown sx={{ color: textColor.color }} />

    );
  };
  
  


  return (
    <React.Fragment>
      {/* <ListItem sx={{ paddingX: 2, paddingY: 2 }}>
        <Typography align="center" variant="h6">
          Suchi International
        </Typography>
      </ListItem> */}

      <ListItemButton
        component={NavLink}
        to="/"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2
        }}
      >
        <ListItemIcon>
          <DashboardIcon style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography  >
          Dashboard
        </Typography>
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/inventory"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}
      >
        <ListItemIcon>
          <LayersIcon style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography >Inventory</Typography>
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/Purchase Order"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}
      >
        <ListItemIcon>
          <PeopleIcon style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography >Purchase Order</Typography>
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/Purchase"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}
      >
        <ListItemIcon>
          <CurrencyRupee style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography >Purchase</Typography>
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/Reports"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}
      >
        <ListItemIcon>
          <BarChartIcon style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography >Reports</Typography>
      </ListItemButton>
      <ListItemButton
        component={NavLink}
        to="/Billing"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}
      >
        <ListItemIcon>
          <ReceiptLong style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography >Billing</Typography>
      </ListItemButton>
      <ListItemButton
      style={{overflowY: 'hidden'}}
      onClick={() => setIsOpen(!isOpen)}
        component={NavLink}
        to="/Masters"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}
      >
        <ListItemIcon>
          <LayersIcon style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography style={{paddingRight: 90}}>Masters</Typography>
        <Button> 
         {toggleArrow()}
        </Button>
      </ListItemButton>
{isOpen && 
                            mastersList.map((master) => 
                            <ListItemButton className="bg-white border-b hover:bg-gray-50 text-center"    
                            to={ "/Masters/"+master.link}
                             style={{lineHeight: "5px"}}>
                                <td className="px-6 py-4 font-medium text-white-900 whitespace-nowrap mx-11">
                                    {master.name}
                                </td>  
                            </ListItemButton>
                            )
                        }
  
      <ListItemButton
        component={NavLink}
        to="/Others"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}    
      >
        <ListItemIcon>
          <ArrowForward style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography >Others</Typography>
      </ListItemButton>

      <ListItemButton
        component={NavLink}
        to="/login"
        sx={{
          "&.active": {
            padding: 2,
            backgroundColor: "#9575cd",
            color: "white",

          },
          padding: 2,
        }}
      >
        <ListItemIcon>
          <LoginIcon style={{ color: "#fff" }}/>
        </ListItemIcon>
        <Typography  >
          Login
        </Typography>
      </ListItemButton>
      


    </React.Fragment>
  );
};
