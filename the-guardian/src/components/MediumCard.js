import React, { Component } from 'react';
import '../App.css';
import imageStore from './ImagesStore';

function pickAnImage() { //return an image randomly and remove from imageStore
    let idx=Math.floor(Math.random(imageStore.length));
    let pickedImage=imageStore[idx];
    imageStore.splice(idx, 1);      //remove selected image from imageStore

    return pickedImage;
}

export default function MediumCard(props) {

    let newsImg=pickAnImage();

    return (
        <div className='mediumCardContainer'>
            <div className='mediumCardImgBox'>
                <img className='mediumCardImg' src={newsImg} />
            </div>
            <div className='mediumCardHeadlineBox'>
                <p>{props.webTitle}</p>
            </div>
        </div>
    )
}
