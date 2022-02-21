import React, { useContext, useEffect } from 'react'
import './MyDesigns.css'
import List from '../_ReusableComponents/List'
import PageContext from '../../Context/PageContext'
import DesignListItem from './DesignListItem'
import DesignListItemArtist from './DesignListItemArtist'
import {
    fetchOwnDesigns,
  } from '../../Functions/liveDBfunctions'
import UserContext from '../../Context/UserContext';
/**
* MY DESIGNS component
*/
const MyDesigns = (props) => {
    const {
        designs, setDesigns,
        artDesigns, setArtDesigns
    } = useContext(PageContext);
    const {user} = useContext(UserContext);

    //fetch designs on component mount - to get the latest
    useEffect(() => {
        fetchOwnDesigns(user, setDesigns);
        return () => {
            //
        }
    }, [user])

    //My designs - precomposed array of components
    const ownDesignsList = designs.map(design => {
        return <DesignListItem
            design={design}
            key={design._id}
        />
    });

    const artDesignsList = artDesigns.map(design => {
        return <DesignListItemArtist
            design={design}
            key={design._id}
        />
    });

    return (
        <div className="MyDesigns page">
            <div className="DesignsContainer">
                <List
                    title="My Designs" subtitle="All that you made"
                    itemsArray={ownDesignsList}
                    messageIfEmpty="You don't have any designs yet"
                />
                <List
                    title="Artist-made Designs" subtitle="All that you saved"
                    itemsArray={artDesignsList}
                    messageIfEmpty="This feature is coming soon"
                />
            </div>
            { /* <div className="bottomFader"></div> */}
            <div className="hangerFooter"></div>
        </div>
    )
}

export default MyDesigns
