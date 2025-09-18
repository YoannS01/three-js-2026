import { Canvas, extend, useFrame } from "@react-three/fiber";
import PhotoShader from "./PhotoShader";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { useRef } from "react";

const photos = [
    import.meta.env.BASE_URL + "/images/retro_camera1.jpg",
    import.meta.env.BASE_URL + "/images/retro_game.jpg",
    import.meta.env.BASE_URL + "/images/retro_camera2.jpg",
    import.meta.env.BASE_URL + "/images/retro_radio.jpg",
    import.meta.env.BASE_URL + "/images/retro_camera3.jpg",
    import.meta.env.BASE_URL + "/images/retro_vinyles.jpg",
];



const PixelFadeShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
    `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        float size = 200.0; 
        st = floor(st * size) / size;
        float noise = step(0.5, fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453 + uTime));

        float fade = smoothstep(0.0, 0.6, st.y);
        gl_FragColor = vec4(vec3(noise * (1.0 - fade)), 1.0);
    }
  `
);

extend({ PixelFadeShaderMaterial });

function PixelBackground() {
    const ref = useRef();
    useFrame(({ clock }) => {
        if (ref.current) ref.current.uTime = clock.getElapsedTime();
    });

    return (
        <mesh>
            <planeGeometry args={[window.innerWidth / 100, 2]} />
            <pixelFadeShaderMaterial ref={ref} />
        </mesh>
    );
}

export default function Gallery() {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen w-full bg-black flex flex-col items-center justify-start pt-10 pb-5">
            <h1 className="text-white text-4xl md:text-4xl font-pixelify mb-5 text-center">
                Mes photos 100% retro !
            </h1>

            <div className="w-full h-[90vh] relative z-2">
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
                    {/* Fond visible */}
                    <color attach="background" args={["#111"]} />

                    {photos.map((url, i) => (
                        <PhotoShader
                            key={i}
                            url={url}
                            position={[
                                (i % 3) * 2 - 2, // X (3 colonnes)
                                -Math.floor(i / 3) * 2 + 1, // Y (2 lignes)
                                0,
                            ]}
                        />
                    ))}
                </Canvas>
            </div>

            <button
                onClick={() => navigate("/")}
                className="mt-10 mb-10 px-6 py-3 rounded-full bg-white text-black font-pixelify hover:bg-gray-200 transition z-10 relative"
            >
                Retour à l'accueil🚀
            </button>

            <div className="absolute bottom-0 left-0 w-full h-[200px] z-0">
                <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
                    <PixelBackground />
                </Canvas>
            </div>
        </section>
    );
}
