import { useRef, useMemo, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { a, useSpring } from "@react-spring/three";

export default function PhotoShader({ url, position }) {
    const mesh = useRef();
    const texture = useLoader(THREE.TextureLoader, url);

    const [hovered, setHovered] = useState(false);


    const { pixelSize } = useSpring({
        pixelSize: hovered ? 200.0 : 20.0,
        config: { mass: 1, tension: 200, friction: 30 },
    });

    const uniforms = useMemo(
        () => ({
            uTexture: { value: texture },
            uPixelSize: { value: 20.0 },
        }),
        [texture]
    );

    useFrame(() => {
        uniforms.uPixelSize.value = pixelSize.get();
    });

    return (
        <a.mesh
            ref={mesh}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <planeGeometry args={[1.8, 1.8, 1.2, 1.2]} />
            <shaderMaterial
                uniforms={uniforms}
                vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
                fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uPixelSize;

          void main() {
            vec2 resolution = vec2(uPixelSize, uPixelSize);
            vec2 uv = floor(vUv * resolution) / resolution;
            vec4 color = texture2D(uTexture, uv);
            gl_FragColor = color;
          }
        `}
            />
        </a.mesh>
    );
}
