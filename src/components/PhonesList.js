import React, { useState } from 'react';
import { sortList } from '../helpers';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListItemSecondaryAction } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '679px',
        width: '100%',
        '& span': {
            color: '#112D32',
            fontSize: '18px',
            '&:hover': {
                opacity: '.8',
            },
        },
        '& .MuiListItemText-root': {
            minWidth: '239px',
            maxWidth: '239px',
        },
        '& .MuiListItem-root': {
            flexWrap: 'wrap',
        },
        '& .MuiBox-root': {
            flex: '3',
            marginTop: '10px',
            marginLeft: '10px',
            minWidth: '239px',
            maxWidth: '239px',
        },
        "@media (max-width: 660px)": {
            '& .MuiBox-root': {
                marginLeft: '53px',
            }
        }
    },
    avatar: {
        color: '#254E58',
    },
    text: {
        cursor: 'pointer',
    },
    "@media (max-width: 660px)": {
        phoneNumber: {
            marginLeft: '53px',
        },
    }
}));

const PhonesList = ({ contacts, setContacts }) => {

    const classes = useStyles();
    const [edit, setEdit] = useState({});
    const [fields, setFields] = useState({});

    const deleteElementHandler = (e, id) => {
        e.preventDefault();
        const newTasks = [...contacts];
        newTasks.splice(id, 1);
        setContacts(newTasks);
    };

    const favoriteElementHandler = (e, id) => {
        e.preventDefault();
        const newTasks = [...contacts];
        newTasks[id].isFavorite = !newTasks[id].isFavorite;
        if (newTasks[id].isFavorite) {
            const removedItem = newTasks.splice(id, 1);
            newTasks.unshift(removedItem[0]);
        } else {
            const removedItem = newTasks.splice(id, 1);
            newTasks.push(removedItem[0]);
        }

        const getFavorite = newTasks.filter(el => el.isFavorite).sort(sortList);
        const getNotFavorite = newTasks.filter(el => !el.isFavorite).sort(sortList);

        const concatResult = [...getFavorite, ...getNotFavorite]

        setContacts(concatResult);
    };

    const editFieldOpen = (e, id, fieldName) => {
        e.preventDefault();
        const item = e.currentTarget.getAttribute('index');
        if (Number(item) === id) {
            setEdit({ ...edit, [`${fieldName}_${id}`]: !edit[`${fieldName}_${id}`] });
        }
    };

    const editHandler = (e, key, fieldName) => {
        setFields({ ...fields, [`${fieldName}_${key}`]: e.target.value });
    }

    const saveHandler = (index, fieldName, editFieldName, value) => {
        const newTasks = [...contacts];
        contacts[index][editFieldName] = fields[`${fieldName}_${index}`] || value;
        setContacts(newTasks);
        setEdit({ ...edit, [`${editFieldName}_${index}`]: !edit[`${editFieldName}_${index}`] });
    };

    const addNewItem = () => {
        return contacts.map((el, key) => {
            return (
                <ListItem key={key}>
                    <ListItemAvatar>
                        <Avatar>
                            <EmojiPeopleIcon className={classes.avatar} />
                        </Avatar>
                    </ListItemAvatar>
                    {
                        !edit[`name_${key}`] ?
                            <ListItemText
                                className={classes.text}
                                index={key}
                                onClick={e => editFieldOpen(e, key, 'name')}
                                flex='2'
                            >
                                {el.name}
                            </ListItemText> :
                            <>
                                <TextField
                                    defaultValue={el.name}
                                    onChange={e => { editHandler(e, key, 'field_name') }}
                                />
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => { saveHandler(key, 'field_name', 'name', [el.name]) }}
                                >
                                    <CheckIcon />
                                </IconButton>
                            </>
                    }
                    {
                        !edit[`phone_${key}`] ?
                            <ListItemText
                                className={clsx(classes.text, classes.phoneNumber)}
                                index={key}
                                onClick={e => editFieldOpen(e, key, 'phone')}
                                flex='1'
                            >
                                {el.phone}
                            </ListItemText> :
                            <Box>
                                <TextField
                                    defaultValue={el.phone}
                                    onChange={e => { editHandler(e, key, 'field_phone') }}
                                />
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => { saveHandler(key, 'field_phone', 'phone', [el.phone]) }} >
                                    <CheckIcon />
                                </IconButton>
                            </Box>
                    }
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={(e) => favoriteElementHandler(e, key)}>
                            {
                                el.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                            }
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={(e) => deleteElementHandler(e, key)}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });
    }

    return (
        <List className={classes.root}>
            {
                contacts && addNewItem()
            }
        </List>
    )
};

export default PhonesList;