import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MovingCarModel({ containerRef }) {
    const carRef = useRef();

    useEffect(() => {
        if (!containerRef.current) return;

        let ctx = gsap.context(() => {
            if (!carRef.current) return;

            gsap.to(carRef.current.rotation, {
                y: Math.PI * 2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                }
            });
        });

        return () => ctx.revert();
    }, [containerRef]);

    return (
        // Simple mock box representation of your vehicle chassis
        <mesh ref={carRef} castShadow receiveShadow position={[0, 0.5, 0]}>
            <boxGeometry args={[2.5, 1, 4.5]} />
            <meshStandardMaterial color="#00ffcc" roughness={0.1} metalness={0.8} />
        </mesh>
    );
}

export default function CarCanvas() {
    const localContainerRef = useRef(null);

    return (
        <div
            ref={localContainerRef}
            className="w-full h-full absolute inset-0 bg-transparent overflow-hidden"
        >
            <Canvas
                // 1. FIXED: Set shadows to a clean true/boolean structure
                shadows={true}
                // 2. FIXED: Configure the underlying WebGL context object directly.
                // We set shadowMapType to 1 (which maps explicitly to Basic/PCFShadowMap) 
                // to bypass the automatic legacy fallback triggers.
                gl={{
                    antialias: true,
                    shadowMapType: 1
                }}
                camera={{ position: [0, 2.5, 6.5], fov: 45 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 15, 10]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />

                <MovingCarModel containerRef={localContainerRef} />

                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2.1}
                    minPolarAngle={Math.PI / 4}
                />
            </Canvas>
        </div>
    );
}