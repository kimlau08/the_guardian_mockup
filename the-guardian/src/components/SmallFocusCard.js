import React from 'react';
import '../App.css';
import {pickAnImage, getKickerPhrase} from './MediumCard';

export default function SmallFocusCard(props) {
    //props is an array of 2 news items. The first item needs to accompany an image.

    let newsImg=pickAnImage(this.imageStore);

    let kickerFont=this.kicker;

    switch (props.length) {
        case 2: {
            // case of array of 2 small news items
            let headAndTail1=getKickerPhrase(props[0].webTitle);
            let headAndTail2=getKickerPhrase(props[1].webTitle);

            return (
                <div className='smallFocusCardContainer'>
                    <div className='smallFocusCardImgBox'>
                        <img className='smallFocusCardImg' src={newsImg} />
                    </div>
                    <div className='smallFocusCardHeadlineBox'>
                    </div>
                    <div className='smallFocusCardHeadlineBox'>
                        <p><span style={kickerFont}>{headAndTail1.head}</span>{headAndTail1.tail}</p>  
                        <p><span style={kickerFont}>{headAndTail2.head}</span>{headAndTail2.tail}</p>  
                    </div>
                </div>
            )
        }
        case 1: {
            // Case of array of 1 small news items. Render in case of exception case
            let headAndTail1=getKickerPhrase(props[0].webTitle);
            
            return (
                <div className='smallFocusCardContainer'>
                    <div className='smallFocusCardImgBox'>
                        <img className='smallFocusCardImg' src={newsImg} />
                    </div>
                    <div className='smallFocusCardHeadlineBox'>
                        <p><span style={kickerFont}>{headAndTail1.head}</span>{headAndTail1.tail}</p>  
                    </div>
                </div>
            ) 
        }
        default:
    }
}
