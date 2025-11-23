"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  
  attribute float aSpeed;
  attribute float aOffset;
  attribute vec3 aColor;
  
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;
    
    // Tunnel effect: Move along Z axis
    // We use the instance matrix to position initially, but we'll override z in shader
    vec4 instancePos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    
    // Slow down speed significantly (0.1x)
    float zPos = instancePos.z + (uTime * aSpeed * 2.0); 
    
    // Loop z position
    float tunnelLength = 100.0;
    zPos = mod(zPos, tunnelLength) - 50.0; // Range -50 to 50
    
    // Subtle curve/warp
    float zProgress = (zPos + 50.0) / tunnelLength; // 0 to 1
    vec2 warp = uMouse * 2.0 * pow(zProgress, 2.0); // Reduced warp strength
    
    vec3 finalPos = instancePos.xyz;
    finalPos.z = zPos;
    finalPos.xy += warp;
    
    // Apply local vertex position (the streak shape)
    vec4 modelPosition = vec4(finalPos + pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    
    vColor = aColor;
    
    // Smoother fade out at ends
    float dist = abs(zPos);
    vAlpha = 1.0 - smoothstep(10.0, 45.0, dist);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Soft glow from center of the streak
    // We can use UVs if we had them, but for simple streaks we can just use color
    
    // Very subtle opacity
    float strength = 0.4; // Reduced base opacity
    gl_FragColor = vec4(vColor, vAlpha * strength);
  }
`;

const Tunnel = () => {
    const mesh = useRef<THREE.InstancedMesh>(null!);
    const count = 1500; // Increased count for density but thinner

    const { attributes, uniforms } = useMemo(() => {
        const speeds = new Float32Array(count);
        const offsets = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        const colorPalette = [
            new THREE.Color("#1e1b4b"), // Very Dark Indigo
            new THREE.Color("#312e81"), // Dark Indigo
            new THREE.Color("#172554"), // Dark Blue
            new THREE.Color("#1e3a8a"), // Blue 900
        ];

        for (let i = 0; i < count; i++) {
            speeds[i] = Math.random() * 0.2 + 0.1; // Slower speeds
            offsets[i] = Math.random() * 100;

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        }

        return {
            attributes: {
                aSpeed: speeds,
                aOffset: offsets,
                aColor: colors,
            },
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
            }
        };
    }, []);

    useFrame((state) => {
        const { clock, mouse } = state;
        const material = mesh.current.material as THREE.ShaderMaterial;
        if (material.uniforms) {
            material.uniforms.uTime.value = clock.getElapsedTime();
            material.uniforms.uMouse.value.lerp(
                new THREE.Vector2(mouse.x, mouse.y),
                0.02 // Slower mouse reaction
            );
        }
    });

    useEffect(() => {
        if (!mesh.current) return;

        const tempObject = new THREE.Object3D();

        for (let i = 0; i < count; i++) {
            const radius = 10 + Math.random() * 20; // Wider tunnel
            const angle = Math.random() * Math.PI * 2;
            const z = (Math.random() - 0.5) * 100;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            tempObject.position.set(x, y, z);
            tempObject.rotation.z = angle;
            tempObject.rotation.x = Math.PI / 2;

            const length = Math.random() * 10 + 5; // Longer lines
            tempObject.scale.set(0.02, length, 1); // Very thin lines

            tempObject.updateMatrix();
            mesh.current.setMatrixAt(i, tempObject.matrix);
        }
        mesh.current.instanceMatrix.needsUpdate = true;
    }, []);

    return (
        <instancedMesh
            ref={mesh}
            args={[undefined, undefined, count]}
        >
            <planeGeometry args={[1, 1]}>
                <instancedBufferAttribute
                    attach="attributes-aSpeed"
                    args={[attributes.aSpeed, 1]}
                />
                <instancedBufferAttribute
                    attach="attributes-aOffset"
                    args={[attributes.aOffset, 1]}
                />
                <instancedBufferAttribute
                    attach="attributes-aColor"
                    args={[attributes.aColor, 3]}
                />
            </planeGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
            />
        </instancedMesh>
    );
};

export const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 45 }} // Narrower FOV for depth
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Tunnel />
                <fog attach="fog" args={['#02040a', 20, 60]} />
            </Canvas>
        </div>
    );
};
