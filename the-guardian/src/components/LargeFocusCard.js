import React from 'react';
import '../App.css';
import {pickAnImage, getKickerPhrase} from './MediumCard';

export default function LargeFocusCard(props) {
    //props is an array of 4 news items. The first item needs to accompany an image.

    let newsImg=pickAnImage(this.imageStore);

    let kickerFont=this.kicker;

    switch (props.length) {
        case 4:
            // case of array of 4 news items
            
            let headAndTail1=getKickerPhrase(props[0].webTitle);
            let headAndTail2=getKickerPhrase(props[1].webTitle);
            let headAndTail3=getKickerPhrase(props[2].webTitle);
            let headAndTail4=getKickerPhrase(props[3].webTitle);

            return (
                <div className='largeFocusCardContainer'>

                    <div className='largeFocusCardMajorHeadlineBox'>
                        <p><span style={kickerFont}>{headAndTail1.head}</span>{headAndTail1.tail}</p>  
                    </div>
                    <div className='largeFocusCardImgBox'>
                        <img className='largeFocusCardImg' src={newsImg} />
                    </div>

                    <div className='largeFocusCardMinorHeadlineBox'>
                        <div className='largeFocusCardHeadlineBox'>
                        <hr className='newsItemLine' />
                            <p><span style={kickerFont}>{headAndTail2.head}</span>{headAndTail2.tail}</p>  
                        </div>
                        <div className='largeFocusCardHeadlineBox'>
                        <hr className='newsItemLine' />
                            <p><span style={kickerFont}>{headAndTail3.head}</span>{headAndTail3.tail}</p>  
                        </div>
                        <div className='largeFocusCardHeadlineBox'>
                        <hr className='newsItemLine' />
                            <p><span style={kickerFont}>{headAndTail4.head}</span>{headAndTail4.tail}</p>  
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
