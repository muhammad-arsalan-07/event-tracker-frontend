import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#262626" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event Tracker
          </Typography>
          <Link to={"/dashboard"}>
            <Button sx={{color: "#fff", textDecoration: "underline"}}>
              Events List
            </Button>
          </Link>
          <Link to={"/saved"}>
            <Button sx={{color: "#fff", textDecoration: "underline"}}>
              Saved Events
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
