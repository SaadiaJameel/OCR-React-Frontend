import React from 'react';
import { Box, Button, Stack, Table, TableBody, TableCell, TableRow} from '@mui/material';
import { Delete, Edit, Send } from '@mui/icons-material';

const View = ({data}) => {
    return (
            <Box>
                <Stack direction='row' spacing={2} py={1} justifyContent='flex-end'>
                    <Button variant='outlined' endIcon={<Edit/>}>Edit</Button>
                    <Button variant='outlined' endIcon={<Delete/>}>Delete</Button>
                </Stack>
            <Table  sx={{border: '1px solid lightgray'}}>
                <TableBody>
                    <TableRow>
                        <TableCell>Name:</TableCell>
                        <TableCell>{data.name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Category:</TableCell>
                        <TableCell>{data.category}</TableCell>
                    </TableRow>
                    <TableRow>
                   <TableCell>City:</TableCell>
                        <TableCell>{data.city}</TableCell>
                    </TableRow>
                    <TableRow>
                   <TableCell>Address:</TableCell>
                        <TableCell>{data.address}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Contact No:</TableCell>
                        <TableCell>{data.contact_no? data.contact_no.replace(/\s/g, ''):""}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Created</TableCell>
                        <TableCell>{(data.createdAt.split("T"))[0]}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </Box>
    );
};

export default View;