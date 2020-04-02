import React, { Component } from 'react';
import '../App.css';

export default class MediumCard extends Component {
    constructor(props) {
        super(props);

        this.state={
            imagePath : this.props.imagePath,
            headline : this.props.headline,

/* ???????????????????????????????? */ 
            stanfirst: "",
            highlight: "",
            media: ""
        }
    }

    render() {
        return (
            <div className='mediumCardContainer'>
                <div className='mediumCardImgBox'>
                    <img className='mediumCardImg' src={this.state.imagePath} />
                </div>
                <div className='mediumCardHeadlineBox'>
                    <p>{this.state.headline}</p>
                </div>
            </div>
        )
    }
}