import './SeasonDisplay.css'
import React from 'react'
/*
const getSeason = (lat, month) => {
    if(month>2 && month<9) {
        return lat > 0 ? 'summer' : 'winter'
    } else {
        return lat > 0 ? 'winter' : 'summer'
    }
}

const SeasonDisplay = props => {
    const season = getSeason(props.lat, new Date ().getMonth())
    const text = season === 'winter' ? 'Burr, it is chilly!' : 'We should go to the beach!'
    const icon = season === 'winter' ? 'snowflake' : 'sun'
    return ( 
    <div>
        <i className = {`${icon} icon`} />
        <h1>{text}</h1>
        <i className = {`${icon} icon`} />
        </div>
    )
}
*/
//this is a better way of coding what is above. It will do the same thing, but it has more concise and readable code. The two ternary expressions above can be simplified by creating a new object that include key value pairs for winter and summer to include the respective text and icons.

const seasonConfig = {
    winter: {
        text: "Brrrrrr! It's cold!!!!",
        iconName: 'snowflake'
    },
    summer: {
        text: "Let's go to the Beach!",
        iconName: 'sun'
    }
}

const getSeason = (lat, month) => {
    if(month>2 && month<9) {
        return lat > 0 ? 'summer' : 'winter'
    } else {
        return lat > 0 ? 'winter' : 'summer'
    }
}

const SeasonDisplay = props => {
   const season = getSeason(props.lat, new Date ().getMonth())
   const {text, iconName} = seasonConfig[season] //here we destructure text and iconName from seasonConfig at [season]
    return ( 
    <div className = {`season-display ${season}`}>
        <i className = {`icon-left massive ${iconName} icon`} />
        <h1>{text}</h1>
        <i className = {`icon-right massive ${iconName} icon`} />
    </div>
    )
}

export default SeasonDisplay