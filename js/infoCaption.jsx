import React from 'react';
import isMobile from "../js/isMobile.jsx";

class InfoCaption extends React.Component {
    render(){
		if (isMobile.any()) {
			return (
				<h1 className="info-caption">rotate your device to portrait position</h1>               
			)
		}
		else {
			return (
				<h1 className="info-caption">change your screen resolution</h1>               
			)
		}
	}
}

export default InfoCaption;