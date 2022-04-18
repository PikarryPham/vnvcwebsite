import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from "@material-ui/core/Grid";
import ItemBill from './itemBill';
import { useNavigate } from 'react-router-dom';

const Bill = ({listCard, listChoose}) => {
    let navigate = useNavigate();

    const regisVaccine = () => {
        const vaccineList = listCard.filter((value, index) => {
            return listChoose[index];
        });
        localStorage.setItem('vaccineList', JSON.stringify(vaccineList));
        navigate("/home");
    }

    return (
    <Card>
        <CardContent>
            <div style ={{overflow: 'hidden', textOverflow: 'ellipsis', maxHeight:300, height: 30, borderBottom: '1px solid rgb(212, 212, 212)'}}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <ShoppingCartOutlinedIcon/>
                    <span style={{color: '#2a388f', fontWeight: 'bold'}}>DANH SÁCH VACCINE CHỌN MUA</span>
                </Typography>
            </div>
            {
                !listChoose.includes(true) && <Container 
                    style={{
                        backgroundImage: `url('https://lh3.googleusercontent.com/kvuh1KhllYMhnkjPTLxJdgXuWiDnoq9Rg69HxKM6XiFtN4dbM4TRgljpjDzOohZ_FtTgWmf97BZkcbe9hR0z8Yn35YAaA78i0yd988e7f7Tu0GlBHRpbewDRDC5x5ZDbjEqvxp-CSAJfjU-YbGn9QrzIFZLuEYwRbFSzaaQgNLmYLXMcOfuouOaDJWfwOezci30wN6sgOZMPvdioutxYSvJfwzfXu6yaJSHNRL0DlxfGGmq-EHNeb607TnOTQqWclE5VlbMtCwiYCQx1jiRaMJT3dhSA1RqWG97PBxUdi_dxqF_45TWlgDPINfEj7pj6aMMd_YJVU__2X9aRHKVSkibl7TcYoCrU9ZMiVDPwMmPkQKubp-9-umNLlEfQ-oqvMF_ueGNGxqLf1WtwF0b7EKJiRPtd_DVIoLjjAoEPfYTiRuNTkjfh7tatHQvHSoYJn9B4AxIWaHG6oqu2wI9pVjlgMbn6VNv_C7XLw6JGXriqK8rjqdU89C00Z9AaNYro4IdsVQpkhT0sI7EAZqpgObctg5W-QlJyUmNrM-j7hVfeMCUnynhCPaQUlfOlUCSgXOniGi7z4vXhJRnUQeoUJzseMATVM-husr6Idcr7HnF8A7dzc09qk3P-wAx-BViMyc2oXvUhnEXTPtJkbDg7SsRhoKcu2oFC-HkAggplBV-6esAyuhW6sITw7QBQq8VEpd-02kEBXkVr7mPjsVhtrScpehtoWGXObZm6JOjA31aule-L0z-JFrYbRt15FJlUJE4z2Xlht95OHIL9QYTQEEq5xqyYRo2m1Q=w264-h182-no?authuser=0')`,
                        maxHeight: 900, 
                        height: 170, 
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'}}>
                            
                    </Container>
            }

            {
                listChoose.includes(true) && 
                listChoose.map((value, index) => {
                    if (value === true) {
                        return (
                            <ItemBill
                                ma={index} 
                                ten={listCard[index].Ten} 
                                gia={listCard[index].Gia}
                                phongbenh={listCard[index].PhongBenh} />
                        )
                    }
                })
            }  
        </CardContent>
        <CardActions>
            <Grid container justify="center">
                <Button size="small" style = {{color: 'white', backgroundColor: 'grey', width: '100%'}} onClick={regisVaccine}>ĐĂNG KÝ MŨI TIÊM</Button>
            </Grid>
        </CardActions>
    </Card>
    );
}

export default Bill;