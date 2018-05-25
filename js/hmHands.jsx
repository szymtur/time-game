import React from 'react';


class MinutesAndHoursHands extends React.Component{
    render(){
        let hourDeg = this.props.hour * 30 + this.props.minute * (360/720);
        let minuteDeg = this.props.minute * 6 + this.props.second * (360/3600);

    return( 
            <div>
                <div style={{transform: `rotate(${hourDeg}deg)`}} className="hour-hand"></div>
                <div style={{transform: `rotate(${minuteDeg}deg`}} className="minute-hand"></div>
            </div>
        )                           
    }
}

export default MinutesAndHoursHands;