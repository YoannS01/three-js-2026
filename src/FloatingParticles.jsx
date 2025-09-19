import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingParticles({ count = 150 }) {
    const points = useRef();

    // Génération des positions aléatoires avec un math random.
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    // Animation des particules avec rotation.
    useFrame(({ clock }) => {
        if (points.current) {
            points.current.rotation.y = clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={points} position={[0, 0, -5]}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={positions}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#ffffff"
                opacity={0.25}
                transparent
            />
        </points>
    );
}
