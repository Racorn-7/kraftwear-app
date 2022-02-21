import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from "@material-ui/core/TextField";
import PsyButton from "../../_ReusableComponents/PsyButton";
import UserContext from "../../../Context/UserContext";
import { AddAddress } from "../../../Functions/liveDBfunctions";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
    root: {
        //right: '10%',
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

export default function EditModal(props) {
    const classes = useStyles();
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [addLineOne, setAddLineOne] = useState(props.address.addLineOne);
    const [postcode, setPostcode] = useState(props.address.postCode);
    const [city, setCity] = useState(props.address.city);
    const [isBilling, setIsBilling] = useState(props.address.billing);
    const [isDeliver, setIsDeliver] = useState(props.address.deliver);
    const [addName, setAddName] = useState(props.address.addName);
    const [isChanged, setIsChanged] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e, setter) => {
        if(!isChanged) setIsChanged(true);
        setter(e.target.value);
    }

    const handleSubmit = () => {
        AddAddress(user, addLineOne, city, postcode, isBilling, isDeliver);
        handleClose();
    }

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
                        <h2 id="transition-modal-title">Edit Address</h2>

                        <div className="AddressToggle">
                            <h2>Is it a billing address?</h2>
                            <FormControl>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={isBilling}
                                    onChange={(e) => handleInputChange(e, setIsBilling)}
                                    input={<Input />}
                                >
                                    <MenuItem value='true'>Yes</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="AddressToggle">
                            <h2>Is it a delivery address?</h2>
                            <FormControl>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={isDeliver}
                                    onChange={(e) => handleInputChange(e, setIsDeliver)}
                                    input={<Input />}
                                >
                                    <MenuItem value='true'>Yes</MenuItem>
                                    <MenuItem value='false'>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TextField
                                id="outlined-basic"
                                label="Add Name"
                                value={addName}
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={(e) => handleInputChange(e, setAddName)}
                            />
                        <TextField
                            id="outlined-basic"
                            label="Add Line 1"
                            value={addLineOne || ''}
                            className='AddressInfoContent'
                            variant="outlined"
                            onChange={(e) => handleInputChange(e, setAddLineOne)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="Postcode"
                            value={postcode || ''}
                            className='AddressInfoContent'
                            variant="outlined"
                            onChange={(e) => handleInputChange(e, setPostcode)}
                        />
                        <TextField
                            id="outlined-basic"
                            label="City"
                            value={city || ''}
                            className='AddressInfoContent'
                            variant="outlined"
                            onChange={(e) => handleInputChange(e, setCity)}
                        />
                        <div className="ModalButtonsContainer">
                                <PsyButton
                                    onClick={handleClose}
                                    text='Cancel'
                                    className='CancelBttn'
                                />
                                {
                                    (addLineOne && city && postcode && addName && isChanged) ?
                                        < PsyButton
                                            onClick={handleSubmit}
                                            text='Submit'
                                            className='SubmitBttn'
                                        />
                                        :
                                        <p>Please fill in all fields</p>
                                }
                            </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}