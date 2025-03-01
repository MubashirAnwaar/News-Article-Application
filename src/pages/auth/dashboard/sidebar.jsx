import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  CssBaseline,
} from "@mui/material";
import { Home, Info, ContactMail, ExpandLess, ExpandMore } from "@mui/icons-material";

const drawerWidth = 180;

const Sidebar = () => {
  const [openAbout, setOpenAbout] = useState(false);

  const handleAboutClick = () => {
    setOpenAbout(!openAbout);
  };

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        style={{ width: drawerWidth, flexShrink: 0 }}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        <List>
          <ListItem button>
            <ListItemIcon><Home /></ListItemIcon>
            <ListItemText primary="Home" sx={{ cursor: "pointer" }}/>
          </ListItem>

          {/* About Section with Submenu */}
          <ListItem button onClick={handleAboutClick} sx={{ cursor: "pointer" }}>
            <ListItemIcon><Info /></ListItemIcon>
            <ListItemText primary="About" />
            {openAbout ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAbout} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button style={{ paddingLeft: 70 }}>
                <ListItemText primary="Company" sx={{ cursor: "pointer" }}/>
              </ListItem>
              <ListItem button style={{ paddingLeft: 70 }}>
                <ListItemText primary="Team" sx={{ cursor: "pointer" }}/>
              </ListItem>
            </List>
          </Collapse>

          <ListItem button>
            <ListItemIcon><ContactMail /></ListItemIcon>
            <ListItemText primary="Contact"  sx={{ cursor: "pointer" }}/>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
