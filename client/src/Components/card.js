import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

// const person = { firstName: 'Robin', lastName: 'Wieruch' };

// localStorage.setItem('user', JSON.stringify(prson));

// const stringifiedPerson = localStorage.getItem('user');
// const personAsObjectAgain = JSON.parse(stringifiedPerson);

const BasicCard = ({ma, ten, gia, phongbenh, thongtin, isChoosen, onChoose}) => {
    return (
    <Card>
        <CardContent>
            <Container style={{backgroundImage: `url('https://vax.vnvc.vn/_nuxt/img/ImageVaccine_Item.e99c854.png')`,
    maxHeight: 900, height: 170}}>
            <div style ={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight:300, height: 70}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style = {{fontWeight: 'bold', fontSize: 24, color: '#032346'}}>
                    {ten}
                </Typography>
            </div>
            <div style ={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight:300, height: 40}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style = {{fontSize: 24, color: '#032346'}}>
                    {thongtin}
                </Typography>
            </div>
            <div style ={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight:300, height: 30}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <LocalOfferOutlinedIcon/>
                    <span style={{color: '#2a388f', fontWeight: 'bold'}}>{gia} VND</span>
                </Typography>
            </div>
                <div>
                </div>
            </Container>
        <Typography variant="h5" component="div">
            Phòng bệnh:
        </Typography>
        <Typography variant="body2" style={{height: "150px", overflow: "hidden", textOverflow: "ellipsis"}}>
            {phongbenh}
        </Typography>
        </CardContent>
        <CardActions>
            {
                isChoosen && <Button 
                    size="small" 
                    style = {{color: 'white', backgroundColor: '#2a388f', width: '100%'}} 
                    onClick={() => onChoose(ma)}>CHỌN</Button>
            }
            {
                !isChoosen && <Button 
                    size="small" 
                    style = {{color: '#2a388f', backgroundColor: 'white', width: '100%', border: "1px solid #2a388f"}} 
                    onClick={() => onChoose(ma)}>CHỌN</Button>
            }
            
        </CardActions>
    </Card>
    );
}

export default BasicCard;
