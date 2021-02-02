import React, { useState } from 'react';
import PhonesList from './PhonesList';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { sortList } from '../helpers';
import { deleteDuplicates } from '../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
        fontWeight: '600',
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
    },
    disclaimer: {
        fontSize: '12px',
        textAlign: 'left',
    },
}));

const AddForm = () => {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState({
        phoneError: '',
        emptyFieldError: '',
    });
    const { register, handleSubmit } = useForm();

    const isValidHandler = (data) => {
        const phoneReg = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        if (!data.name || !data.phone) {
            setError({ ...error, emptyFieldError: 'Please fill in all the fields' })
            return false;
        } else if (!phoneReg.test(data.phone)) {
            setError({
                ...error,
                phoneError: 'Please use proper pattern 123-456-7899',
                emptyFieldError: ''
            });
            return false;
        } else {
            setError({ ...error, phoneError: '', emptyFieldError: '' });
            return true;
        }
    };

    const onSubmit = (data, e) => {
        e.preventDefault();
        const isValid = isValidHandler(data);
        if (isValid) {
            setContacts(prevState => {
                const stateRes = [...prevState, { ...data, isFavorite: false }];
                const res = deleteDuplicates(stateRes, 'name');
                const num = deleteDuplicates(res, 'phone');

                const getFavorite = num.filter(el => el.isFavorite).sort(sortList);
                const getNotFavorite = num.filter(el => !el.isFavorite).sort(sortList);

                const concatResult = [...getFavorite, ...getNotFavorite]

                return concatResult;
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
                    <Box>
                        <TextField
                            inputRef={register}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            name="name"

                        />
                    </Box>
                    <Box>
                        <TextField
                            inputRef={register}
                            id="outlined-basic"
                            label="Phone: 123-456-7899"
                            variant="outlined"
                            name="phone" />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}>
                        Add
                    </Button>
                </form>
                {error.phoneError &&
                    <Typography className={classes.errorMessage}>
                        {error.phoneError}
                    </Typography>}
                {error.emptyFieldError &&
                    <Typography className={classes.errorMessage}>
                        {error.emptyFieldError}
                    </Typography>
                }
                <Typography className={classes.disclaimer}>*Duplicate values are not included in the list </Typography>
            </Card>
            <PhonesList
                contacts={contacts}
                setContacts={setContacts}
            />
        </Box>
    )
};

export default AddForm;