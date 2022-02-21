import React from 'react'

/**
* 
*/
const Avatar = props => {
    return (
        <div className="Avatar">
            <img
                className="AvatarImg"
                alt="Avatar"
                src={props.src_1}
                srcSet={`${props.src_1} 1x, ${props.src_2} 2x`}
            />
        </div>
    )
}

export default Avatar
