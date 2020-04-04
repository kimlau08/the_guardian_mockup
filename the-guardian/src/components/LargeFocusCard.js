import React from 'react';
import '../App.css';
import {pickAnImage} from './MediumCard';

export default function LargeFocusCard(props) {
    //props is an array of 4 news items. The first item needs to accompany an image.

    let newsImg=pickAnImage();

    switch (props.length) {
        case 4:
            // case of array of 4 news items
            return (
                <div className='largeFocusCardContainer'>

                    <div className='largeFocusCardMajorHeadlineBox'>
                        <p>{props[0].webTitle}</p>
                    </div>
                    <div className='largeFocusCardImgBox'>
                        <img className='largeFocusCardImg' src={newsImg} />
                    </div>

                    <div className='largeFocusCardMinorHeadlineBox'>
                        <div className='largeFocusCardHeadlineBox'>
                            <p>{props[1].webTitle}</p>
                        </div>
                        <div className='largeFocusCardHeadlineBox'>
                            <p>{props[2].webTitle}</p>
                        </div>
                        <div className='largeFocusCardHeadlineBox'>
                            <p>{props[3].webTitle}</p>
                        </div>
                    </div>
                </div>
            )
            case 3:
                // case of array of 3 news items
                return ( 
                    <div></div>
                )
        case 2:
            // case of array of 2 news items
            return (
                <div></div>
            )
        case 1:
            // Case of array of 1 news items. Render in case of exception case
            return (
                <div></div>
            ) 
        default:
    }
}
