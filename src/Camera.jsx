import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Camera(props) {
    const { nodes, materials } = useGLTF('/vintage_camera.glb')
    return (
        <group scale={[35, 35, 35]} {...props} dispose={null}>
            <group scale={0.01}>
                <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.camera_body_lens_0.geometry}
                        material={materials.body_lens}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.camera_lens_0.geometry}
                        material={materials.lens}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.camera_camera_body_0.geometry}
                        material={materials.camera_body}
                    />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.camera_strap_0.geometry}
                        material={materials.strap}
                    />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.strap_strap_0.geometry}
                    material={materials.strap}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={100}
                />
            </group>
        </group>
    )
}

useGLTF.preload('/vintage_camera.glb')