import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera } from './Camera';

gsap.registerPlugin(ScrollTrigger);

const Scene = ({ progress }) => {
    const cameraRef = useRef(null);
    useFrame(() => { cameraRef.current.lookAt(0, 0, 0) });
    useEffect(() => {
        const updateCamPos = () => {
            const positions = [[3.5, 2.17, 3.7],
            [3.7, .6, 2.5],
            [2.3, .87, -4.2],
            [0, 2.5, 3.6]
            ];

            if (progress >= 1) {
                gsap.to(cameraRef.current.position, {
                    x: 0,
                    y: 2.5,
                    z: 3.6,
                    duration: 0.5,
                    ease: "power1.out",
                });
            } else {

                const segmentProgress = 1 / 3;
                const segmentIndex = Math.floor(progress / segmentProgress);

                const percentage = (progress % segmentProgress) / segmentProgress;
                const [startX, startY, startZ] = positions[segmentIndex];
                const [endX, endY, endZ] = positions[segmentIndex + 1];
                const x = startX + (endX - startX) * percentage;
                const y = startY + (endY - startY) * percentage;
                const z = startZ + (endZ - startZ) * percentage;

                gsap.to(cameraRef.current.position, {
                    x, y, z,
                    duration: .5,
                    ease: "power1.out",

                });
            }


        }
        updateCamPos()
    }, [progress, cameraRef.current]);




    return (
        <>

            <PerspectiveCamera
                ref={cameraRef}
                fov={60}
                near={0.1}
                far={10000}
                makeDefault
                position={[3.5, 2.17, 3.7]}
            />
            <Environment preset='city' />
            <Camera scale={[20, 20, 20]} />

        </>
    )
}

export default Scene;
