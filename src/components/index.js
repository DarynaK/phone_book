import React from 'react';
import AddForm from './form';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    title: {
        color: '#112D32',
    },
}));

const PhoneBook = () => {
    const classes = useStyles();
    return (
        <Grid>
            <Typography
                variant="h3"
                className={classes.title}>
                My UT Phone Book
            </Typography>
            <AddForm />
        </Grid>
    )
};

export default PhoneBook;