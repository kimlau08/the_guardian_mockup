import React from 'react';
import '../App.css';

export function pickAnImage(imageStore) { //return an image randomly and remove from imageStore
    let idx=Math.floor(Math.random(imageStore.length));
    let pickedImage=imageStore[idx];
    imageStore.splice(idx, 1);      //remove selected image from imageStore

    return pickedImage;
}

export function getKickerPhrase(headline) {
    //A kicker is everything before a colon. if there is no colon, it returns the first 3 words.
    let str=headline.split(':');
    if (str.length<2) {  //there is no colon in the headline
        let wordCnt=3 //use the first 3 words as kicker
        let kicker=headline.split(' ').splice(0, wordCnt).join(' ')+"\ ";  //first 3 words with additional space
        let rest=headline.split(' ').splice(wordCnt, headline.length).join(' ');  //the rest
        return {head: kicker, tail: rest};
    } else {
        let kicker=str[0]+'/';  //the part before colon with additional '/'
        let rest=str.splice(1, str.length).join(':'); //the rest
        return {head: kicker, tail: rest};
    }
}

export default function MediumCard(props) {

    let newsImg=pickAnImage(this.imageStore);
    
    let kickerFont=this.kicker;
    let headAndTail=getKickerPhrase(props.webTitle);

    return (
        <div className='mediumCardContainer'>
            <hr className='newsItemLine' />
            <div className='mediumCardImgBox'>
                <img className='mediumCardImg' src={newsImg} />
            </div>
            <div className='mediumCardHeadlineBox'>
                <p><span style={kickerFont}>{headAndTail.head}</span>{headAndTail.tail}</p>
                {/* <p>{props.webTitle}</p> */}
            </div>
        </div>
    )
}
