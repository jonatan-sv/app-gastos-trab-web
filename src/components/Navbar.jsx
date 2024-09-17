import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import logo from "../assets/logo.svg";
import profile from "../assets/pfp.svg";

export default function Navbar() {
  return (
    <AppBar
      position="static"
      //style={{ backgroundColor: "4E4E4E"}}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <img src={logo} width={200} height={70} alt="logo" />
          </Box>
          <Box sx={{ flexGrow: 0, ml: 2 }}>
            <Tooltip title="Você :)">
              <Avatar src={profile} />
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
