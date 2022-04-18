import React from 'react';
import {Button} from '@material-ui/core/';

function BotonInicial(params) {
    console.log(params)
    return (
    <Button 
        variant="contained" 
        color="secondary" 
        style= {{padding: "20px"}} 
        onClick={params.handler}
    >
    {params.label}
    </Button>
    );
}

export default BotonInicial;