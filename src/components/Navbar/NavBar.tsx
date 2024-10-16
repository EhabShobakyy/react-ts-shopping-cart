import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "../../pages/HomePage";
import About from "../../pages/AboutPage";
import Store from "../../pages/StorePage";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useEffect } from "react";
import CartModal from "../Modals/SideBar";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Store", path: "/store" },
];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // Modal open/close state
  const [modalOpen, setModalOpen] = React.useState(false);
  // GET SELECTED OR UPDATED FROM STORE
  const selectedProduct = useSelector((state: RootState) => state.counter);
  // Handlers to open/close the modal
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // HANDLE NAVBAR IN MOBILE SCREENS
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // GET TOTTAL NUMBERS OF SELECTED ITEM
  const totalQuantity = Object.values(selectedProduct.items).reduce(
    (accumulator: number, item: any) => {
      return accumulator + item.quantity;
    },
    0
  ); // Initial value of accumulator is 0

  useEffect(() => {
    console.log("StoreItemCom", totalQuantity);
  });

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Button variant="contained" sx={{ my: 2, width: "75px" }}>
        <ShoppingCartIcon />
      </Button>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: "#fff" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "end",
              display: { xs: "none", sm: "flex" },
              width: "75px",
            }}
          >
            <Button
              onClick={handleModalOpen} // Open modal when button is clicked
              sx={{
                backgroundColor: "transparent",
                borderRadius: "50px",
                border: "1px solid white",
                color: "white",
                position: "relative",
                "&:hover": {
                  backgroundColor: "white",
                  border: "1px solid #1976d2",
                  color: "#1976d2",
                },
              }}
            >
              <ShoppingCartIcon />
              <Box
                sx={{
                  backgroundColor: "red",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50px",
                  position: "absolute",
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "white",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%,25%)",
                }}
              >
                {totalQuantity}
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box sx={{ width: "100%" }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Box>
      <CartModal modalOpen={modalOpen} handleModalClose={handleModalClose} />
    </Box>
  );
}
