import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListItemAvatar } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { ListItemSecondaryAction } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '679px',
        width: '100%',
        '& span': {
            color: '#112D32',
            fontSize: '18px',
        }
    },
    avatar: {
        color: '#254E58',
    },
}));

const PhonesList = ({ contacts, setContacts }) => {

    const classes = useStyles();

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
        }else {
            const removedItem = newTasks.splice(id, 1);
            newTasks.push(removedItem[0]);
        }
        setContacts(newTasks);
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
                    <ListItemText className={classes.text}>{el.name}</ListItemText>
                    <ListItemText className={classes.text}>{el.phone}</ListItemText>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={(e) => favoriteElementHandler(e, key)}>
                            {
                                el.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                            }
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon onClick={(e) => deleteElementHandler(e, key)} />
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