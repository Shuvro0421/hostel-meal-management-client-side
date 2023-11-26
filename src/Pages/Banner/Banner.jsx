import React, { useState, useEffect } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import HeaderTitles from '../HeaderTitles/HeaderTitles';
import Packages from '../Packages/Packages';
import TabsComponent from '../Tab/TabsComponent';



const Banner = () => {
    const TEXTS = [
        'Enjoy your meal with great taste',
        'Have a healthy meal like home',
        'Purchase meal at a cheaper price',
        'Create your own meal'];
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        const intervalId = setInterval(
            () => setIndex((index) => index + 1),
            4000, // every 3 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://media-cdn.tripadvisor.com/media/photo-s/16/9e/cf/0f/snapchat-1296103265-largejpg.jpg',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/fe/ab/fc/food-is-weell-prepared.jpg?w=700&h=-1&s=1',
        'https://i.ytimg.com/vi/b8DjMH9834o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA5DN_WeFesw_VBuGY9BW8oA5Zjnw'
        // Add more image URLs as needed
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div>
            {/* banner start */}
            <div className="relative min-h-screen">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : ''
                            }`}
                        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
                    ></div>
                ))}
                <div className="absolute top-0 left-0 w-full h-full bg-opacity-80 bg-black"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-neutral-content z-10">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold merienda text-yellow-400">Hostel Meal Management</h1>
                        <p className="mb-5 text-xl">
                            <TextTransition className='w-full flex items-center justify-center text-center' springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition>
                        </p>
                        <input type="text" placeholder="Find your meal...." className="input text-yellow-400 placeholder-yellow-400 input-bordered bg-transparent input-warning w-full max-w-xs" />
                    </div>
                </div>
            </div>
            {/* banner end */}
            <HeaderTitles heading={'Our Meals'}></HeaderTitles>
            {/* tab start */}
            <TabsComponent></TabsComponent>
            {/* tab end */}
            {/* package start */}
            <HeaderTitles heading={'Our Packages'}></HeaderTitles>
            <Packages></Packages>
            {/* package end */}
        </div>
    );
};

export default Banner;
