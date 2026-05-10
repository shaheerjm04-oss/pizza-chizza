import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#050a14', 0.1);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setClearColor('#050a14', 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight('#00A3FF', 2);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Particles
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.008,
        color: '#00A3FF',
        transparent: true,
        opacity: 0.3,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // "Cheese Slices" (Triangular Prisms)
    const slices: THREE.Mesh[] = [];
    // Create a triangle geometry (Cylinder with 3 segments)
    const sliceGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 3);
    const sliceMaterial = new THREE.MeshPhongMaterial({
        color: '#00A3FF',
        transparent: true,
        opacity: 0.6,
        shininess: 100,
        emissive: '#003366'
    });

    for (let i = 0; i < 15; i++) {
        const slice = new THREE.Mesh(sliceGeometry, sliceMaterial);
        slice.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 5
        );
        slice.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        const scale = 0.5 + Math.random();
        slice.scale.set(scale, scale, scale);
        scene.add(slice);
        slices.push(slice);
    }

    camera.position.z = 4;

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX / window.innerWidth) - 0.5;
        mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.0005;
        
        slices.forEach((slice, i) => {
            slice.rotation.x += 0.005;
            slice.rotation.y += 0.005;
            // Float up and down
            slice.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
        });

        // Follow mouse smoothly
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        container.removeChild(renderer.domElement);
        // Clean up
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        sliceGeometry.dispose();
        sliceMaterial.dispose();
        renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{ opacity: 0.6 }}
    />
  );
};
