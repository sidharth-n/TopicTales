import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';



function LandingPage() {

    const controls = useAnimation();

    useEffect(() => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.addEventListener('ended', (event) => {
                event.target.currentTime = 0;
                event.target.play();
            });
        }

        controls.start({
            opacity: 1,
            transition: { duration: 1 }
        });

        // Cleanup the event listener on unmount
        return () => {
            if (videoElement) {
                videoElement.removeEventListener('ended');
            }
        };
    }, [controls]);

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 0px 8px rgba(255,255,255,0.7)"
        },
        tap: {
            scale: 0.95
        }
    };

   

    const childVariants = {
        hidden: { opacity: 0, y: '50px' },
        show: { opacity: 1, y: '0' }
    };

    return (
        <motion.div className="overflow-x-hidden antialiased font-jakarta relative" initial={{ opacity: 0 }} animate={controls}>

            {/* Video Background */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-25"
                src="/src/Assets/videobg-5.mp4"
                type="video/mp4"
                autoPlay
                loop
                muted
                playsInline
            ></video>

            {/* HERO SECTION */}
            <motion.div className="relative flex items-center justify-center h-screen z-0 bg-opacity-0"  initial="hidden" animate="show">
                <motion.div className="container flex flex-col align-middle items-center justify-center max-w-4xl px-8 mx-auto text-center lg:text-left">
                    <motion.a href="/" className="flex items-center justify-center mb-16 pb-6" variants={childVariants}>
                        <motion.img src="https://imgtr.ee/images/2023/10/25/4bbbe29706b5fd46175b4a1eb048863b.png" alt="Landmark Logo" className="lg:h-8 md:h-7 h-7 " />
                    </motion.a>
                    <motion.h1 className="mb-4 text-4xl text-center font-black leading-tight lg:leading-tight text-slate-900 sm:text-6xl xl:mb-8" variants={childVariants}>
                        Wanna make Learning a Blast ? Try <span className="mb-6 text-4xl text-center font-black leading-sung text-indigo-500 sm:text-6xl xl:mb-8"> TopicTales</span>
                    </motion.h1>
                    <motion.p className="font-medium  mb-12 px-10 sm:px-24 text-center text-base text-gray-600 sm:text-lg xl:text-xl mb-12" variants={childVariants}>
                        TopicTales takes complex concepts and transforms them instantly into engaging tales tailored to topics with the power of AI.
                    </motion.p>
                    <motion.a href="/app"
                        className="self-center flex flex-row px-8 py-3.5 text-base font-bold text-slate-50 bg-indigo-500 border-t border-gray-200 rounded-xl shadow-xl sm:text-lg xl:text-xl"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Try Now 
                        <svg className='ml-1 fill-slate-50' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z"/></svg>
                    </motion.a>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

export default LandingPage;
