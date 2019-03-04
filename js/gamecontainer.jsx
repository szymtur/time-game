import React from 'react';

class GameContainer extends React.Component{
    render(){
        return(
            <div className={"game-container"}>
                <div className={"info-box-container"}>
                    <h1>{this.props.infoBox}</h1>
                </div>
				<div className="answer-buttons">
					<div className="answer-row">{this.props.buttons[0]}{this.props.buttons[1]}</div>
					<div className="answer-row">{this.props.buttons[2]}{this.props.buttons[3]}</div>
				</div>
                <div className="main-button">{this.props.startButton}</div>     
            </div>
        )
    }
}

export default GameContainer;
