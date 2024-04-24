import React, { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import TestPic from '../../assests/github.jpg'
import TestPic1 from '../../assests/loginPic.png'

register();

const Imageslider = () => {
    // const swiperElRef = useRef(null);

    // useEffect(() => {
    //     // listen for Swiper events using addEventListener
    //     swiperElRef.current.addEventListener('progress', (e) => {
    //         const [swiper, progress] = e.detail;
    //         console.log(progress);
    //     });

    //     swiperElRef.current.addEventListener('slidechange', (e) => {
    //         console.log('slide changed');
    //     });
    // }, []);

    return (
        <div>
            <swiper-container
                // ref={swiperElRef}
                slides-per-view="1"
                navigation="true"
                pagination="true"
                loop="true"
                style={{
                    width: 500, 
                    height: 400,
                    backgroundColor: 'skyblue'
                }}
            >
                <swiper-slide>
                    <img src={TestPic} alt="pic" />
                </swiper-slide>
                <swiper-slide>
                    <img src={TestPic} alt="pic" />
                </swiper-slide>
                <swiper-slide>
                    <img src={TestPic1} alt="pic" />
                </swiper-slide>
                <swiper-slide>
                    <img src={TestPic1} alt="pic" />
                </swiper-slide>
            </swiper-container>
        </div>
    )
}

export default Imageslider