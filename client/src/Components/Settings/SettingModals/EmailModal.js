import React, { useContext, useState } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import PsyButton from "../../_ReusableComponents/PsyButton";
import UserContext from "../../../Context/UserContext";
import { updateEmail } from "../../../Functions/liveDBfunctions";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function EmailModal() {
    const classes = useStyles();
    const { user, setEmail } = useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);


    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
        setIsEmailValid(validateEmail(newEmail));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        updateEmail(user, newEmail, setEmail);
        handleClose();
    };

    

    return (
        <div>
            <EditOutlinedIcon fontSize='small' className={classes.root} onClick={() => { handleOpen() }} />
            <Modal
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Change E-Mail</h2>
                        <form className={classes.root} noValidate autoComplete="off" >
                            <TextField
                                id="outlined-basic"
                                label="E-Mail"
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={handleEmailChange}
                            />
                        </form>
                        <div className="ModalButtonsContainer">
                            <PsyButton
                                onClick={handleClose}
                                text='Cancel'
                                className='CancelBttn'
                            />
                            {
                                (newEmail && isEmailValid) ?
                                    <PsyButton
                                        onClick={handleSubmit}
                                        text='Submit'
                                        className='SubmitBttn'
                                    />
                                    :
                                    <p>Please provide a valid email</p>
                            }
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}





