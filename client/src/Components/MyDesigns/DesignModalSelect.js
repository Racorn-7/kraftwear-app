import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PsyButton from "../_ReusableComponents/PsyButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import PageContext from "../../Context/PageContext";
import DesignListItemModal from "./DesignListItemModal";
import { default as ListM } from "../_ReusableComponents/List";
import RadioGroup from "@material-ui/core/RadioGroup";
import UserContext from "../../Context/UserContext";
import { addProductToCart } from "../../Functions/liveDBfunctions";



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(4),
        minWidth: 120,
    },
}));

export default function DesignModalForm() {
    const classes = useStyles();
    const { designs, stock, setCart } = useContext(PageContext);
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);

    const [clothingType, setClothingType] = useState(null);
    const [size, setSize] = useState(null);
    const [selectedDesignID, setSelectedDesignID] = useState(null);
    const [material, setMaterial] = useState(null);
    const [color, setColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const ownDesignsList = designs.map(design => {
        return <DesignListItemModal
            design={design}
            keyVal={design._id}
            key={design._id}
        />
    });

    const handleSubmit = () => {
        //1. assemble new product object
        const newProduct = {
            productType: { name: clothingType },
            size: size,
            design: selectedDesignID,
            garmentType: material,
            color: color,
            qtty: quantity
        };
        console.log(newProduct);
        
        //2. create new productLine and save it to DB        
        addProductToCart(user, newProduct, setCart);
        //Once done:
        handleClose();
    };

    const handleChangeQuantity = (event) => {
        setQuantity(Number(event.target.value) || 1);
    };
    const handleChangeSDesign = (event) => {
        setSelectedDesignID(event.target.value);
    };
    const handleChangeCloth = (event) => {
        setClothingType(event.target.value);
    };

    const handleChangeMaterial = (event) => {
        setMaterial(event.target.value);
    };
    const handleChangeSize = (event) => {
        setSize(event.target.value);
    };

    const handleChangeColor = (event) => {
        setColor(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //pre-render menu item components - productType options
    const renderDropDownArray = (stringKey) => {
        return (stock[stringKey]) ?
            stock[stringKey].map(
                item => {
                    return <MenuItem key={item} value={item}>{item}</MenuItem>
                }
            )
            :
            null;
    }

    //check if all inputs are set, if not return an error message
    const inputErrorMsg = () => {
        if (!selectedDesignID) return "Select a design"
        else if (!clothingType) return "Select the product type"
        else if (!material) return "Select a material"
        else if (!size) return "Select the size"
        else if (!color) return "Select the color"
        else return null;
    }

    return (
        <div>
            <PsyButton
                onClick={handleClickOpen}
                className="NewProdWithMyDesBtn"
                text="Add with design from my designs"
            />
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Create Product With My Designs</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <List component="nav" className={classes.root}>
                            <ListItem>
                                <RadioGroup row aria-label="position" name="chosenDesign" onChange={handleChangeSDesign} value={selectedDesignID}>
                                    <ListM
                                        title="My Designs" subtitle="All that you made"
                                        itemsArray={ownDesignsList}
                                        messageIfEmpty="You don't have any designs yet"
                                    />
                                </RadioGroup>
                            </ListItem>
                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-dialog-select-label">Product</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={clothingType || ""}
                                        onChange={handleChangeCloth}
                                        input={<Input />}
                                    >
                                        {renderDropDownArray("productType")}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-dialog-select-label">Material</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={material || ""}
                                        //defaultValue={(stock.garmentType)?stock.garmentType[0]:""}
                                        onChange={handleChangeMaterial}
                                        input={<Input />}
                                    >
                                        {renderDropDownArray("garmentType")}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-dialog-select-label">Size</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={size || ""}
                                        //defaultValue={'M'}
                                        onChange={handleChangeSize}
                                        input={<Input />}
                                    >
                                        {renderDropDownArray("size")}
                                    </Select>
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-dialog-select-label">Quantity</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={quantity || ""}
                                        defaultValue={1}
                                        onChange={handleChangeQuantity}
                                        input={<Input />}
                                    >
                                        {(Array.from(new Array(50), (val, index) => index + 1)).map(
                                            item => {
                                                return <MenuItem key={item} value={item}>{item}</MenuItem>
                                            }
                                        )}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-dialog-select-label">Color</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={color || ""}
                                        onChange={handleChangeColor}
                                        input={<Input />}
                                    >
                                        {renderDropDownArray("color")}
                                    </Select>
                                </FormControl>
                            </ListItem>
                        </List>
                    </form>
                </DialogContent>
                <DialogActions>
                    <PsyButton
                        onClick={handleClose}
                        className="NewProdWithMyDesBtn"
                        text="Cancel"
                    />
                    {
                        (inputErrorMsg()) ?
                            <p style={{ width: "50%", textAlign: "center" }}>{inputErrorMsg()}</p>
                            :
                            <PsyButton
                                onClick={handleSubmit}
                                className="NewProdWithMyDesBtn"
                                text="Add to cart"
                            />
                    }

                </DialogActions>
            </Dialog>
        </div>
    );
}