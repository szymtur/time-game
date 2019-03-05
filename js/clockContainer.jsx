import React from 'react';

class DialLines extends React.Component {
    render() {
        let dialLinesArray = [];

        for (let i = 0; i < 60; i++) {
            dialLinesArray.push(<div style={{transform: `rotate(${6*i}deg)` }} className={'dial-dot'} key={i}></div>)
        }

        return (
			<div className="dial-dots">
				{dialLinesArray}
			</div>
		)
    }
}

class ClockHands extends React.Component {
    render() {
        let hourDeg = this.props.hour * 30 + this.props.minute * (360/720);
        let minuteDeg = this.props.minute * 6 + this.props.second * (360/3600);

    	return ( 
            <div className="clock-hands">
                <div style={{transform: `rotate(${hourDeg}deg)`}} className="hour-hand"></div>
                <div style={{transform: `rotate(${minuteDeg}deg`}} className="minute-hand"></div>
            </div>
        )                           
    }
}

class ClockContainer extends React.Component {
	render() {
		return (
			<div className="clock-container">
				<div className="clock">
					<div className={"counter-box"}><span>00:{this.props.counter < 10 ? '0' + this.props.counter : this.props.counter}</span></div>
					<div className="dot"></div>
					<ClockHands 
						hour={this.props.hour} 
						minute={this.props.minute} 
						second={this.props.second} 
					/>
					<div className="hours">
						<span className="hour-3">3</span>
						<span className="hour-6">6</span>
						<span className="hour-9">9</span>
						<span className="hour-12">12</span>
					</div>
					<DialLines />
				</div>
			</div>
		)
	}
}

export default ClockContainer;