import React from 'react'
import sidebar_data from './SidebarData'
import { ListItemButton, ListItemIcon, ListItemText, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
function SideBar(props) {
    return <React.Fragment>
        {sidebar_data.map((item) => {
            return <ListItem key={JSON.stringify(item.name)} disablePadding sx={{ display: 'block' }} component={Link} to={item.name}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: props.open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: props.open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} sx={{ opacity: props.open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        })}
    </React.Fragment>
}

export default SideBar