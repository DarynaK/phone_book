import React, { useState } from 'react';
import PhonesList from './list';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& label.Mui-focused': {
            color: '#254E58',
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: '#254E58',
            },
        },
    },
    cardWrapper: {
        width: '100%',
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        padding: '2vh',
    },
    subTitle: {
        color: '#112D32',
        textAlign: 'left',
        marginLeft: '10px',
        textDecoration: 'underline',
    },
    submitButton: {
        height: '54px',
        width: '131px',
        backgroundColor: '#112D32',
        '&:hover': {
            backgroundColor: '#254E58',
        },
    },
    errorMessage: {
        color: '#800000',
        fontSize: '12px',
    }
}));

const AddForm = () => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState({
        phoneError: '',
        nameError: '',
    });
    const { register, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        e.preventDefault();
        const phoneReg = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        if (!data.phone) {
            setError({ ...error, phoneError: 'This field cannot be empty' })
        } else if (!phoneReg.test(data.phone)) {
            setError({ ...error, phoneError: 'Please use proper pattern 123-456-7899' })
        }
        else {
            setError({ ...error, phoneError: '' })
            setContacts(prevState => {
                return [...prevState, { ...data, isFavorite: false }]
            }
            );
            e.target[0].value = '';
            e.target[2].value = '';
        }
    };

    return (
        <Box className={classes.cardWrapper}>
            <Card className={classes.card}>
                <Typography className={classes.subTitle}>Add New Contact</Typography>
                <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        inputRef={register}
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        name="name"

                    />
                    <Box>
                        <TextField
                            inputRef={register}
                            id="outlined-basic"
                            label="Phone: 123-456-7899"
                            variant="outlined"
                            name="phone" />
                        {error.phoneError &&
                            <Typography className={classes.errorMessage}>
                                {error.phoneError}
                            </Typography>}
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}>
                        Add
                </Button>
                </form>
            </Card>
            <PhonesList
                contacts={contacts}
                setContacts={setContacts}
            />
        </Box>
    )
};

export default AddForm;