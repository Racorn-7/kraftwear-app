import React, {useContext} from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {makeStyles, withStyles} from "@material-ui/core/styles";
import '../../css/AddressContainer.css'
import UserContext from "../../Context/UserContext";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NameModal from "../Settings/SettingModals/NameModal";


const useStyles = makeStyles((theme) => ({
    root: {
        cursor: 'pointer',
        color: '#ADB1BC',
        marginLeft: '55%',
        Top: '5%',

    },
}));


const NameSettingInput = () =>{
    const { userName } = useContext(UserContext);
    //const classes = useStyles();

    return(
        <div className='AddressBoxInput'>
            <title>Name</title>
            <div className='centerBox'>
                <span className='SettingInput'>{userName}</span>
            </div>
            <div className='boxIcon'>
                <NameModal/>
            </div>
        </div>
    )
};

export default NameSettingInput