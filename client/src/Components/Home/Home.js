import React from 'react'
import FeatureColumn from '../_ReusableComponents/FeatureColumn'
import './Home.css'
import TshirtImg from '../../img/t-shirts.jpg'
import ArtistImg from '../../img/artist2.jpg'
import Card from '../_ReusableComponents/Card'
import { useHistory } from 'react-router-dom'
/**
* 
*/
const Home = (props) => {
    const history = useHistory();

    return (
        <div className="Home page">
            <div className="HomeLeft">
                <Card
                    image={TshirtImg}
                    to="designer"
                    title="Design Now"
                    onClick={() => history.push("/designer")}
                />
                <Card
                    image={ArtistImg}
                    to="designer"
                    title="Find Artist Made Designs"
                    onClick={() => history.push("/artbrowser")}
                />
            </div>
            <div className="HomeRight">
                <div className="HomeRigtTitle">
                    Home Left Title
                </div>
                <FeatureColumn count={10} />
            </div>
        </div>
    )
}

export default Home
