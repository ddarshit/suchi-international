import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { MainListItems } from "./nav_items";
import { useMediaQuery } from "@mui/material";
import { Toolbar, AppBar, Button } from "@mui/material";
import { Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import MasterList from "../pages/master/master_list";

const mdTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#673ab7",
          // backgroundColor: "white",
          color: "#fff",
          // color: "#673ab7",
        },
      },
    },
  },
  typography: {
    fontFamily: ["poppins", "cursive"].join(","),
  },
});



function NavBar() {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(isMdScreen);

  const handleToggleDrawer = () => {
    if (!isMdScreen) {
      setOpen(!open);
    }
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            transition: "width 300ms",
            background: '#fafafa',
            // background: '#673ab7',
          }}
        >
          <Toolbar>
            {isMdScreen ? (
              <IconButton
                // color="inherit"
                aria-label="open drawer"
                onClick={handleToggleDrawer}
                edge="start"
                sx={{ display: "none" }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleToggleDrawer}
                edge="start"
                sx={{ color: '#673ab7' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography sx={{ ml: { md: 0, sm: 0 }, }} align="center" variant="h6" color='#673ab7' fontWeight='bold' fontFamily='cursive'>
              Suchi International
            </Typography>

            <Button
              variant="contained"
              aria-label="open drawer"
              onClick={handleToggleDrawer}
              edge="end"
              sx={{
                ml: "auto", color: '#fff', backgroundColor: '#673ab7', 
                "&:hover": {
                  backgroundColor: "#7e57c2",
                  // color: "#673ab7",
                  // border: '2px solid #673ab7'
                },
              }}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <MuiDrawer
          variant={isMdScreen ? "permanent" : "temporary"}
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            width: "300px",
            flexShrink: 0,
            // backgroundColor: "#673ab7",
            // color: "white",
            ...(isMdScreen && {
              "& .MuiDrawer-paper": {
                width: "300px",
                boxSizing: "border-box",
              },
            }),
          }}
        >
          <Toolbar />
          <List>
            <MainListItems />
          </List>
        </MuiDrawer>
      </Box>
    </ThemeProvider>
  );
}

function Layout({ children }) {

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar />
      <Box
        component="main"
        sx={{
          flexGrow: 2,
          px: 4,
          // mb: 2,
          mt: 7,
          alignItems: "flex-start"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export const SideUi = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
}

export default function Dashboard() {
  return <NavBar />;
}
