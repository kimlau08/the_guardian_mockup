import React, { Component } from 'react';
import '../App.css';
import {pickAnImage} from './MediumCard';

export default function SmallFocusCard(props) {
    //props is an array of 2 news items. The first item needs to accompany an image.

    let newsImg=pickAnImage();

    switch (props.length) {
        case 2:
            // case of array of 2 small news items
            return (
                <div className='smallFocusCardContainer'>
                    <div className='smallFocusCardImgBox'>
                        <img className='smallFocusCardImg' src={newsImg} />
                    </div>
                    <div className='smallFocusCardHeadlineBox'>
                        <p>{props[0].webTitle}</p>
                    </div>
                    <div className='smallFocusCardHeadlineBox'>
                        <p>{props[1].webTitle}</p>
                    </div>
                </div>
            )
        case 1:
            // Case of array of 1 small news items. Render in case of exception case
            return (
                <div className='smallFocusCardContainer'>
                    <div className='smallFocusCardImgBox'>
                        <img className='smallFocusCardImg' src={newsImg} />
                    </div>
                    <div className='smallFocusCardHeadlineBox'>
                        <p>{props[0].webTitle}</p>
                    </div>
                </div>
            ) 
        default:
    }
}
