import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

const ItemBill = ({ma, ten, gia, phongbenh}) => {
    return (
    <Card>
        <CardContent>
            <div style ={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight:300, height: 70}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style = {{fontWeight: 'bold', fontSize: '1.25rem', color: '#2a388f'}}>
                    {ten}
                </Typography>
            </div>
            <div style ={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight:300, height: 92}}>
                <Typography sx={{ fontSize: '1rem' }} color="text.secondary" gutterBottom style = {{fontSize: '1rem', color: '#59595'}}>
                    {phongbenh}
                </Typography>
            </div>
            <div style ={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight:300, height: 30, paddingTop: '10px', textAlign: 'right'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <span style={{color: '#2a388f', fontWeight: 'bold'}}>{gia} VND</span>
                </Typography>
            </div>
                <div>
                </div>
        </CardContent>
    </Card>
    );
}

export default ItemBill;