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
            infoBox: this.strings.startCaption,
            buttonsArr: [],
            hour: 0,
            minute: 0,
            second: 0,
            result: '',
            disabled: false,
            counter: this.props.start,
        }

        click = (event) => {
            if(event.target.id == this.state.result) {
                clearInterval(this.id);
                this.setState({
                    infoBox: this.strings.goodAnswer,
                    disabled: true,
                })
            }
            else if(event.target.id != this.state.result) {
                clearInterval(this.id);
                this.setState({
                    infoBox: this.strings.wrongAnswer,
                    disabled: true,
                })
            }
        }

        clickStart = () => {
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
            this.state.result = `${this.state.hour}:${this.state.minute}`

            let tempArr = [];
            tempArr.push(this.state.result);
                 
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
       
            randomResults(tempArr);
            shuffle(tempArr);  
            this.state.buttonsArr = tempArr;
		}
		
        counter() {
            if(this.id > 0) {
                clearInterval(this.id)
            }

            this.setState({
                counter: this.props.start
            })

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
            let buttons = this.state.buttonsArr.map( (el, i) => {
                return (  
                    <button 
                        className={"button"} 
                        onClick={this.click} 
                        disabled={this.state.disabled}
                        style={{color: this.state.disabled && 'red' }} 
                        key={i} 
                        id={el}> {el}
                    </button>
                )
            });

            let startButton = (
				<button
					className={"start-btn"} 
					onClick={this.clickStart.bind(this)} 
					style={{display: this.state.disabled ? 'block' : 'none' }} 
				>start</button>
            )

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
                        buttons={buttons} 
                        startButton={startButton}
                    />
                </div>
            )
        }
    }

    const App = () => <Clock start={5} />

    ReactDOM.render(
        <App />, document.getElementById('app')
    );
});