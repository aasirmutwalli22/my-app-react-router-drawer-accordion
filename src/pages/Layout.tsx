import {
    Apps,
    Contacts,
    Home,
    Logout,
    Menu,
    Note,
    Person,
    Settings
} from '@mui/icons-material';

import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListSubheader,
    Toolbar,
    Typography
} from '@mui/material';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { MenuGroup, MenuItem } from '../components/Menu';

const drawerWidth = 240;

const styles = {
    app: {
        display: 'flex',
    },
    appBar: {
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
    },
    drawerButton: {
        mr: 2,
        display: {
            sm: 'none',
        },
    },
    nav: {
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 }
    },
    main: {
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` }
    },
    permanentDrawer: {
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    },
    temporaryDrawer: {
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    }
};

export default function Layout() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    return (
        <Box sx={styles.app}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={styles.appBar}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start"
                        onClick={handleDrawerToggle} sx={styles.drawerButton}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={styles.nav} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <TemporaryDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <PermanentDrawer />
            </Box>
            <Box component="main" sx={styles.main}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

function PermanentDrawer() {
    return (
        <Drawer variant="permanent" sx={styles.permanentDrawer} open>
            <NavDrawer />
        </Drawer>
    );
}

function TemporaryDrawer(props: any) {
    return (
        <Drawer
            variant="temporary"
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={styles.temporaryDrawer}>
            <NavDrawer />
        </Drawer>
    );
}

function NavDrawer() {
    const NavLinks = [
        { title: "Home", to: "/", leadingIcon: <Home /> },
        { title: "Blogs", to: "/blogs", leadingIcon: <Note /> },
        { title: "Contacts", to: "/contact", leadingIcon: <Contacts /> },
    ];

    return (
        <div>
            <Toolbar />
            <Divider />
            <List >
                {/* <ListSubheader>Department</ListSubheader> */}
                <MenuGroup key={1} title='Department' leading={<Apps />}>
                    {
                        NavLinks.map((link, index) => <MenuItem
                            key={index}
                            title={link.title}
                            leadingIcon={link.leadingIcon}
                            to={link.to}
                            initialPadding={true} />)
                    }
                </MenuGroup>
                <MenuGroup key={2} title='Account' leading={<Person />}>
                    <MenuItem key={21} title='Sign out' leadingIcon={<Logout />} to="/logout" initialPadding={true} />
                    <MenuItem key={22} title='Profile' leadingIcon={<Settings />} to="/profile" initialPadding={true} />
                </MenuGroup>
                <Divider />
                <ListSubheader>Account</ListSubheader>
                <MenuItem key={3} title='Profile' leadingIcon={<Settings />} to="/profile" initialPadding={false} />
            </List>
        </div>
    );
}

