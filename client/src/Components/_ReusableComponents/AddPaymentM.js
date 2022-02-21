import React, { useContext, useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import '../../css/AddressContainer.css'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from "@material-ui/core/TextField";
import PsyButton from "./PsyButton";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { AddPaymentMethod } from "../../Functions/liveDBfunctions";
import UserContext from "../../Context/UserContext";


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
    formControl: {
        marginRight: 10,
    },
    Title: {
        marginBottom: '5%',
    },
}));

const AddPaymentM = (props) => {
    const { user, setPayMethods } = useContext(UserContext);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [cardType, setCardType] = useState(null);
    const [cardNo, setCardNo] = useState(null);
    const [nameOnCard, setNameOnCard] = useState(null);
    const [payMethodName, setPayMethodName] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeCardType = (e) => {
        setCardType(e.target.value);
    };
    const handleChangeCardNo = (e) => {
        setCardNo(e.target.value)
    };
    const handleChangeNameOnCard = (e) => {
        setNameOnCard(e.target.value)
    };

    const handleChangePayMethodName =(e)=>{
        setPayMethodName(e.target.value)
    }

    const handleSubmit = () => {
        AddPaymentMethod(user, payMethodName, nameOnCard, cardNo, cardType, setPayMethods);
        handleClose()
    }

    const iscardNoValid = (cardno)=>{
        return (cardno.length == 16 && !isNaN(cardno))
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
                            <h2 className={classes.Title}>Add Pay Option</h2>
                            <FormControl className={classes.formControl}>
                                <label>Card Type</label>
                                <Select
                                    labelId="demo-dialog-select-label"
                                    id="demo-dialog-select"
                                    value={cardType || ""}
                                    onChange={handleChangeCardType}
                                    input={<Input />}
                                >
                                    <MenuItem value='visa'>Visa</MenuItem>
                                    <MenuItem value='master-card'>MasterCard</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="outlined-basic"
                                label="Payment method nickname"
                                value={payMethodName || ""}
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={handleChangePayMethodName}
                            />
                            <TextField
                                id="outlined-basic"
                                label="Name On Card"
                                value={nameOnCard || ""}
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={handleChangeNameOnCard}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Card No"
                                value={cardNo || ""}
                                className='AddressInfoContent'
                                variant="outlined"
                                onChange={handleChangeCardNo}
                            />
                            <div className="ModalButtonsContainer">
                                <PsyButton
                                    onClick={handleClose}
                                    text='Cancel'
                                    className='CancelBttn'
                                />
                                {
                                    (cardType && cardNo && nameOnCard && iscardNoValid(cardNo) && payMethodName) ?
                                    <PsyButton
                                        onClick={handleSubmit}
                                        text='Add'
                                        className='SubmitBttn'
                                    />
                                    :
                                    <p>Please provide valid details</p>
                                }
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </li>
    )

};

export default AddPaymentM;



