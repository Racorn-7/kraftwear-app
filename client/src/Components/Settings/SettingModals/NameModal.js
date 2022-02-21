import React, { useContext, useState } from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import PsyButton from "../../_ReusableComponents/PsyButton";
import UserContext from "../../../Context/UserContext";
import { updateName } from "../../../Functions/liveDBfunctions";

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

export default function NameModal() {
    const classes = useStyles();
    const { user, setUserName } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [newNameFore, setNewNameFore] = useState('');
    const [newNameSur, setNewNameSur] = useState('');

    const handleNameForeChange = (e) => {
        setNewNameFore(e.target.value)
    };
    const handleNameSurChange = (e) => {
        setNewNameSur(e.target.value)
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        updateName(user, newNameFore, newNameSur, setUserName);
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
                        <h2 id="transition-modal-title">Change Name</h2>
                        <form className={classes.root} noValidate autoComplete="off" >
                            <TextField
                                id="outlined-basic"
                                label="Forename"
                                value={newNameFore || ""}
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={handleNameForeChange}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Surname"
                                value={newNameSur || ""}
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={handleNameSurChange}
                            />
                        </form>
                        <div className="ModalButtonsContainer">
                            <PsyButton
                                onClick={handleClose}
                                text='Cancel'
                                className='CancelBttn'
                            />
                            {
                                (newNameFore && newNameSur)?
                            <PsyButton
                                onClick={() => handleSubmit()}
                                text='Submit'
                                className='SubmitBttn'
                            />
                            :
                            <p>Please set both names</p>
}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}





