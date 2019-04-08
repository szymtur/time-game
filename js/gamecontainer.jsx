import React from 'react';

class GameContainer extends React.Component {
    render() {

        let answerButtons = this.props.answerButtonsArray.map( (element, index) => {
            return (
                <button
                    className={"button"} 
                    onClick={this.props.answerClick.bind(this)}
                    disabled={this.props.disabled}
                    style={{color: this.props.disabled && '#ff0000'}}
                    key={index}
                    id={element}
                >{element}
                </button>
            )
        });

        let startButton = (
            <button
                className={"button"}
                onClick={this.props.startClick.bind(this)}
                style={{display: this.props.disabled ? 'block' : 'none' }}
            >start
            </button>
        )

        return (
            <div className={"game-container"}>
                <div className={"info-box-container"}>
                    <h1>{this.props.infoBox}</h1>
                </div>
                <div className="answer-buttons">
                    <div className="answer-row">{answerButtons[0]}{answerButtons[1]}</div>
                    <div className="answer-row">{answerButtons[2]}{answerButtons[3]}</div>
                </div>
                <div className="start-button">{startButton}</div>
            </div>
        )
    }
}

export default GameContainer;
