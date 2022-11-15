import {
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {
    ReactNode,
    useState
} from "react";
import {
    ExpandLess,
    ExpandMore
} from '@mui/icons-material';
import { Link } from "react-router-dom";


type MenuGroupProps = {
    open?: boolean,
    title?: string,
    leading?: ReactNode,
    children?: ReactNode
};

const styles = {
    collapse: {
        backgroundColor: '#e0e0e0'
    }
};

export function MenuGroup(props: MenuGroupProps) {
    const [open, setOpen] = useState(props.open);

    const handleClick = () => setOpen(!open);

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClick} selected={open}>
                    <ListItemIcon>
                        {props.leading}
                    </ListItemIcon>
                    <ListItemText primary={props.title} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit sx={styles.collapse}>
                <List component="div" disablePadding>
                    {props.children}
                </List>
            </Collapse>
        </>
    );
}


type MenuItemProps = {
    title: string,
    leadingIcon: ReactNode,
    to: string,
    initialPadding?: boolean | false
};

export function MenuItem(props: MenuItemProps) {
    return (
        <ListItemButton sx={props.initialPadding ? { pl: 4 } : {}} component={Link} to={props.to}>
            <ListItemIcon>
                {props.leadingIcon}
            </ListItemIcon>
            <ListItemText primary={props.title} />
        </ListItemButton>
    );
}