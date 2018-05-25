import React from 'react';

class DialLines extends React.Component{
    render(){
        let dialLinesArr= [];

        for (let i = 0; i < 60; i++) {
            dialLinesArr.push(<div style={{transform: `rotate(${6*i}deg)` }} className={'dial-lines'} key={i}></div>)
        }

        return <div>{dialLinesArr}</div>
    }
}

export default DialLines;