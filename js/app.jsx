import React from 'react';
import ReactDOM from 'react-dom';
import ClockContainer from '../js/clockContainer.jsx';
import GameContainer from '../js/gameContainer.jsx';
import InfoCaption from '../js/infoCaption.jsx';
import '../css/styles.css';
import '../css/responsive.css';

document.addEventListener('DOMContentLoaded', function() {

    class Clock extends React.Component {
		strings = {
			startCaption: 'WHAT TIME IS IT ?',
			goodAnswer: 'YEAH, GOOD ANSWER !',
			wrongAnswer: 'WRONG ANSWER !',
			timeIsUp: 'TIME IS UP !'
		}

        state = {
            hour: null,
            minute: null,
            second: null,
            goodAnswer: null,
			disabled: false,
			answerButtonsArray: [],
			counter: this.props.counterValue,
			infoBox: this.strings.startCaption
        }

        answerClick = (event) => {
            if(event.target.id == this.state.goodAnswer) {
                clearInterval(this.id);
                this.setState({
                    infoBox: this.strings.goodAnswer,
                    disabled: true,
                })
            }
            else if(event.target.id != this.state.goodAnswer) {
                clearInterval(this.id);
                this.setState({
                    infoBox: this.strings.wrongAnswer,
                    disabled: true,
                })
            }
        }

        startClick = () => {
            this.generator();
            this.counter();
            this.setState({
                infoBox: this.strings.startCaption,
                disabled: false,
            })
        }

        generator () {
            let randomHour = () => {
                const randomNumber = Math.floor(Math.random() * (12 - 1) + 1);
                let hour = 0;
                randomNumber.toString().length == 1 ? hour = `0${randomNumber}` : hour =`${randomNumber}`;
                return hour;
            }
            
            let randomMinute = () => {
                const randomNumber = Math.floor(Math.random() * 59);
                let minute = 0;
                randomNumber.toString().length == 1 ? minute = `0${randomNumber}` : minute = `${randomNumber}`;
                return minute;
            }

            this.state.hour = randomHour();
            this.state.minute = randomMinute();
            this.state.goodAnswer = `${this.state.hour}:${this.state.minute}`

            let tempArray = [];
            tempArray.push(this.state.goodAnswer);
                 
            let randomResults = (arr) => {
                let i=0;
                while(arr.length < 4 && i<1000) {
                    let randomResult = `${randomHour()}:${randomMinute()}`;
                    
                    if(arr.indexOf(randomResult) == -1){
                        arr.push(randomResult);
                    }
                    i++;
                }
            }

            let shuffle = (a) => {
                for (let i = a.length; i; i--) {
                    let j = Math.floor(Math.random() * i);
                    [a[i - 1], a[j]] = [a[j], a[i - 1]];
                }
            }
       
            randomResults(tempArray);
            shuffle(tempArray);  
            this.state.answerButtonsArray = tempArray;
		}
		
        counter() {
            if(this.id > 0) {
                clearInterval(this.id)
            }

            this.setState({
                counter: this.props.counterValue
            });

            this.id = setInterval(() => {
                this.setState({
                    counter: this.state.counter - 1
                }, () => {
                    if(this.state.counter === 0) {
                        clearInterval(this.id);
                        this.setState({
                            infoBox: this.strings.timeIsUp,
                            disabled: true,
                        })
                    }
                });
            }, 1000);
        }

        componentWillMount() {
            this.generator();
		}
		
		componentDidMount() {
            this.counter();
        }   

        componentWillUnmount() {
            clearInterval(this.id);
        }
        
        render() {
            return ( 
                <div className="main-container">
					<InfoCaption />
 					<ClockContainer 
						hour={this.state.hour} 
						minute={this.state.minute} 
						second={this.state.second}
						counter={this.state.counter} 						
					/>
                    <GameContainer
						infoBox={this.state.infoBox}
						disabled={this.state.disabled}
                        startClick={this.startClick}
						answerClick={this.answerClick}
                        answerButtonsArray={this.state.answerButtonsArray}
                    />
                </div>
            )
        }
    }

    const App = () => <Clock counterValue={30} />

    ReactDOM.render( <App />, document.getElementById('app') );
});