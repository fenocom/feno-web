"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  
  varying vec2 vUv;

  void main() {
    // Rotate UVs for diagonal effect (-30 degrees)
    float angle = -0.52;
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 rotatedUv = rot * (vUv - 0.5) + 0.5;

    // Create repeating sharp beams
    // Layer 1: Main beams (Slower)
    float t1 = uTime * 0.05; // Slowed down
    float beams1 = fract(rotatedUv.x * 5.0 + t1);
    // Softer edge using wider smoothstep range
    beams1 = smoothstep(0.0, 0.3, beams1) * (1.0 - smoothstep(0.7, 1.0, beams1));
    
    // Layer 2: Thinner beams (Slower)
    float t2 = uTime * 0.08; // Slowed down
    float beams2 = fract(rotatedUv.x * 8.0 + t2 + 0.5);
    beams2 = smoothstep(0.0, 0.2, beams2) * (1.0 - smoothstep(0.3, 0.5, beams2));
    
    // Layer 3: Background ambient flow
    float t3 = uTime * 0.02;
    float beams3 = fract(rotatedUv.x * 3.0 - t3);
    beams3 = smoothstep(0.0, 0.5, beams3) * (1.0 - smoothstep(0.8, 1.0, beams3));

    // Combine layers
    float totalLight = beams1 * 0.5 + beams2 * 0.3 + beams3 * 0.2; // Reduced intensity
    
    // Add mouse interaction (local brightness boost)
    float dist = distance(vUv, uMouse);
    float mouseGlow = 1.0 - smoothstep(0.0, 0.6, dist);
    totalLight += mouseGlow * 0.15; // Reduced mouse glow

    // Color mapping
    // Core is NO LONGER white, but a lighter blue
    vec3 coreColor = vec3(0.4, 0.6, 0.9); // Soft Blue
    vec3 glowColor = uColor2; // Darker Cyan/Indigo
    vec3 baseColor = uColor1; // Dark background
    
    vec3 finalColor = mix(baseColor, glowColor, totalLight * 0.6); // 60% max intensity
    finalColor = mix(finalColor, coreColor, pow(totalLight, 3.0) * 0.3); // Reduced core intensity
    
    // Vignette
    float vignette = 1.0 - distance(vUv, vec2(0.5));
    vignette = smoothstep(0.0, 1.0, vignette);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const Rays = () => {
    const mesh = useRef<THREE.Mesh>(null!);
    const { viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uColor1: { value: new THREE.Color("#020617") }, // Slate 950
            uColor2: { value: new THREE.Color("#1e3a8a") }, // Blue 900 (Darker)
        }),
        []
    );

    useFrame((state) => {
        const { clock, pointer } = state;
        const material = mesh.current.material as THREE.ShaderMaterial;
        if (material.uniforms) {
            material.uniforms.uTime.value = clock.getElapsedTime();

            // Smooth mouse interpolation
            // Pointer is -1 to 1, convert to 0 to 1 for UVs
            const targetX = (pointer.x + 1) / 2;
            const targetY = (pointer.y + 1) / 2;

            material.uniforms.uMouse.value.lerp(
                new THREE.Vector2(targetX, targetY),
                0.05
            );
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                blending={THREE.NormalBlending} // Switch to Normal for solid background coverage
                depthWrite={false}
            />
        </mesh>
    );
};

export const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]}
            >
                <Rays />
            </Canvas>
        </div>
    );
};
