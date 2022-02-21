/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import DesignThumbnailImage_1x from '../../img/t-shirt_002.png'
import Card from './Card'


/**
* 
*/
const FeatureColumn = (props) => {
    const count = props.count || 1;

    const renderCards = () => {
        let cardsArray = [];

        //TODO get these from DB
        for (let i = 0; i < count; i++) {
            cardsArray.push(
                <Card
                    key={`HomeRightThumb${i}`}//change it to unique value!!
                    image={DesignThumbnailImage_1x}
                    title={`Design ${i + 1}`}
                    onClick={() => console.log('open design')}
                />
            )
        }
        return cardsArray
    }

    return (
        <div className="FeatureColumn">
            {renderCards()}
        </div>
    )
}

export default FeatureColumn