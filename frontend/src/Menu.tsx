import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { SportsVolleyball } from "@mui/icons-material";
import { Link } from "react-router";

const APP_NAME = "VoleyOn";
const drawerWidth = 240;
const navItems = [{label: 'Torneos', path: '/torneos'}, {label: 'Acerca de', path: '/acerca-de'}];

export default function Menu() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>{APP_NAME}</Typography>
            <Divider/>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton sx={{textAlign: 'center'}} component={Link} to={item.path}>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <AppBar component="nav" position="static" sx={{minHeight: '64px', justifyContent: 'center'}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Link to={'/'}
                          style={{color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                        <SportsVolleyball sx={{mr: 1}}/>
                        <Typography variant="h6" noWrap sx={{mr: 2, fontWeight: 700}}>{APP_NAME}</Typography>
                    </Link>
                    <Box sx={{display: {xs: 'none', sm: 'flex'}, flexGrow: 1, justifyContent: 'flex-end'}}>
                        {navItems.map((item) => (
                            <Button key={item.label} sx={{color: '#fff'}} component={Link} to={item.path}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}