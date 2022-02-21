import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import '../../css/AddressContainer.css'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from "@material-ui/core/TextField";
import PsyButton from "./PsyButton";
import { AddAddress } from "../../Functions/liveDBfunctions";
import UserContext from '../../Context/UserContext';
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
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

const AddButton = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [firstLine, setFirstLine] = useState(null);
    const [postcode, setPostCode] = useState(null);
    const [city, setCity] = useState(null);
    const [addName, setAddName] = useState(null);
    const { user } = useContext(UserContext);
    const [isBilling, setIsBilling] = useState(true);
    const [isDeliver, setIsDeliver] = useState(true);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        AddAddress(user, addName, firstLine, city, postcode, isBilling, isDeliver);
        handleClose();
    }

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    }


    return (
        <li className='buttonItem'>
            <div className="AddressBox">
                <button className='AddButton' onClick={() => { handleOpen() }}>+</button>
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
                        <div className={`${classes.paper} AddButtonSettingsModal`}>
                            <h2 id="transition-modal-title">Add Address</h2>

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
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={(e) => handleInputChange(e, setAddName)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Add Line 1"
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={(e) => handleInputChange(e, setFirstLine)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Postcode"
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={(e) => handleInputChange(e, setPostCode)}
                            />
                            <TextField
                                id="outlined-basic"
                                label="City"
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
                                    (firstLine && city && postcode && addName) ?
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
        </li>
    )

};

export default AddButton;



