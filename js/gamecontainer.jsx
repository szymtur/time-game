import React from 'react';

class GameContainer extends React.Component{
    render(){
        return(
            <div className={"game-container"}>
                <div className={"info-box-container"}>
                    <h1>{this.props.infoBox}</h1>
                </div>
                <div>{this.props.buttons}</div>
                <div>{this.props.startButton}</div>     
            </div>
        )
    }
}

export default GameContainer;
