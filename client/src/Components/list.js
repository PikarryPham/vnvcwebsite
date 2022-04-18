import React, {useState} from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Item from 'antd/lib/list/Item';

const ListData =[
    { label: "Vaccine cho người trưởng thành" },
    { label: "Vaccine cho phụ nữ chuẩn bị trước mang thai"},
    { label: "Vaccine cho trẻ em"},
    { label: "Vaccine cho trẻ tiền học đường"},
    { label: "Vaccine cho tuổi vị thành niên và thanh niên"},
];

export default function NestedList() {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(-1)

    const handleClick = (index) => {
        setSelected(index);
        setOpen(!open); 

    };

    return (
        <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //     <ListSubheader component="div" id="nested-list-subheader">
        //         Mua đặt giữ vaccine theo yêu cầu
        //     </ListSubheader>
        // }
        >

        {ListData.map((item, index) => (<>
            <ListItemButton onClick={() => handleClick(index)} selected={selected === index}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {open && selected===index ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open && index===selected} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                    <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                </ListItemButton>
                </List>
            </Collapse>
        </>))}

        </List>
    );
}
