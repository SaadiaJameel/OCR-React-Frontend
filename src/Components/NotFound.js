import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className='notfound'>
            <div class="circles">
            <p>404<br/>
            <small>PAGE NOT FOUND</small>
            </p>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
            <span class="circle big"></span>
            <span class="circle med"></span>
            <span class="circle small"></span>
        </div>
        </div>
    );
};

export default NotFound;