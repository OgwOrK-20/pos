import React from 'react'
import { ListItemButton, ListItemIcon, ListItemText, ListItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { userLogOut } from '../actions/index'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return { user: state.user }
}
function LogOutButton(props) {
    const { userLogOut } = props

    return <React.Fragment>
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: props.open ? 'initial' : 'center',
                    px: 2.5,

                }}
                onClick={userLogOut}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: props.open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={"Log Out"} sx={{ opacity: props.open ? 1 : 0 }} />
            </ListItemButton>
        </ListItem>
    </React.Fragment>
}

export default connect(mapStateToProps, { userLogOut })(LogOutButton)