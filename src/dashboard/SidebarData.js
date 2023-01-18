import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
const sidebar_data = [
    {
        name: "Home",
        icon: <HomeIcon></HomeIcon>,
    },
    {
        name: "Menu",
        icon: <MenuBookIcon></MenuBookIcon>,
    },
    {
        name: "Dishes",
        icon: <RestaurantMenuIcon></RestaurantMenuIcon>,
    },
    {
        name: "Orders",
        icon: <AssessmentIcon></AssessmentIcon>,
    },
    {
        name: "Analysis",
        icon: <TimelineIcon></TimelineIcon>,
    },
    {
        name: "Settings",
        icon: <SettingsIcon></SettingsIcon>
    }
];


export default sidebar_data