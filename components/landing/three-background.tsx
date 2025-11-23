"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const ParticleField = () => {
    const count = 2000;
    const mesh = useRef<THREE.Points>(null!);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20; // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
        }
        return positions;
    }, [count]);

    const particlesSpeed = useMemo(() => {
        const speeds = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            speeds[i] = Math.random() * 0.02 + 0.005;
        }
        return speeds;
    }, [count]);

    useFrame((state) => {
        const { mouse } = state;
        const positions = mesh.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            // Basic upward movement
            positions[i * 3 + 1] += particlesSpeed[i];

            // Reset if goes too high
            if (positions[i * 3 + 1] > 10) {
                positions[i * 3 + 1] = -10;
                positions[i * 3] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            }

            // Mouse interaction
            const x = positions[i * 3];
            const y = positions[i * 3 + 1];

            // Simple parallax/avoidance based on mouse
            // Convert mouse to world space roughly
            const mouseX = mouse.x * 10;
            const mouseY = mouse.y * 10;

            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 3) {
                const force = (3 - dist) * 0.01;
                positions[i * 3] += dx * force;
                positions[i * 3 + 1] += dy * force;
            }
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;

        // Gentle rotation of the whole system
        mesh.current.rotation.y += 0.001;
        mesh.current.rotation.z += 0.0005;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#4f46e5" // Indigo-600
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

export const ThreeBackground = () => {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]} // Handle high DPI screens
            >
                <ParticleField />
            </Canvas>
        </div>
    );
};
