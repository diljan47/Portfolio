"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {
  BloomEffect,
  FXAAEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';

import styles from './ResendCube.module.css';

const CUBES_PER_SIDE = 3;

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

// Build the cube with instancing for fewer draw calls while preserving layer structure
function makeCubes() {
  const material = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 1.0,
    roughness: 0.02,
    envMapIntensity: 1.2
  });
  const numCubes = CUBES_PER_SIDE;
  const outerWrapper = new THREE.Object3D(); // This will hold the InstancedMesh
  const innerWrapper = new THREE.Object3D(); // This will hold the InstancedMesh

  // Use InstancedMesh for performance
  // Adaptive geometry complexity for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const segments = isMobile ? 3 : 5; // Slightly more segments for better quality
  const radius = isMobile ? 0.2 : 0.15;
  const geom = new RoundedBoxGeometry(1, 1, 1, segments, radius);
  const instancedMesh = new THREE.InstancedMesh(geom, material, numCubes * numCubes * numCubes);

  let i = 0;
  const offset = (numCubes - 1) / 2;
  const dummy = new THREE.Object3D(); // Helper object for setting instance matrices

  for (let x = 0; x < numCubes; x++) {
    for (let y = 0; y < numCubes; y++) {
      for (let z = 0; z < numCubes; z++) {
        dummy.position.set((x - offset) * 1.05, (y - offset) * 1.05, (z - offset) * 1.05); // Closer spacing
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i++, dummy.matrix);
      }
    }
  }
  instancedMesh.instanceMatrix.needsUpdate = true;
  innerWrapper.add(instancedMesh); // Add instanced mesh to inner wrapper

  outerWrapper.add(innerWrapper);
  outerWrapper.scale.set(0.74, 0.74, 0.74); // 30% smaller cube inside
  return outerWrapper;
}

const ResendCube: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;

    // Size
    const initialWidth = container.clientWidth > 0 ? container.clientWidth : 600;
    const initialHeight = container.clientHeight > 0 ? container.clientHeight : 600;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, initialWidth / initialHeight, 0.1, 1000);
    camera.position.z = 4;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const renderer = new THREE.WebGLRenderer({
      antialias: true, // Enable anti-aliasing for cleaner edges
      alpha: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: false,
      canvas: canvasRef.current,
    });
    // Performance optimization: Limit pixel ratio based on device performance
    const isMobile = window.innerWidth < 768;
    const maxPixelRatio = isMobile ? 1.2 : 2.0; // Slightly higher for better quality
    renderer.setPixelRatio(Math.min(maxPixelRatio, window.devicePixelRatio || 1));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(initialWidth, initialHeight);
    renderer.autoClear = false;
    renderer.shadowMap.enabled = false; // Disable shadows for performance
    renderer.shadowMap.type = THREE.BasicShadowMap;

    // Lights
    RectAreaLightUniformsLib.init();
    const rectLight1 = new THREE.RectAreaLight(0xffffff, 25, 20, 20); // Softer key light
    rectLight1.position.set(10, 15, 0);
    rectLight1.rotation.x = Math.PI * 1.5;
    rectLight1.rotation.y = Math.PI / 4;
    scene.add(rectLight1);

    const rectLight2 = new THREE.RectAreaLight(0xffffff, 10, 20, 20); // Balanced fill light
    rectLight2.position.set(0, -20, 0);
    rectLight2.rotation.x = Math.PI / 2;
    scene.add(rectLight2);

    // Add a subtle rim light for shine
    const rimLight = new THREE.RectAreaLight(0xffffff, 8, 15, 15);
    rimLight.position.set(-8, 0, 8);
    rimLight.rotation.y = Math.PI / 4;
    scene.add(rimLight);

    // Only add helpers in development
    if (process.env.NODE_ENV === 'development') {
      scene.add(new RectAreaLightHelper(rectLight1));
      scene.add(new RectAreaLightHelper(rectLight2));
      scene.add(new RectAreaLightHelper(rimLight));
    }

    // Cube
    const cube = makeCubes();
    scene.add(cube);

    // Postprocessing: Subtle bloom for beautiful reflections
    // Conditional post-processing for performance
    const isHighEndDevice = !isMobile && (window.devicePixelRatio || 1) >= 1.25;
    
    const bloomOptions = {
      luminanceThreshold: 0.7,
      luminanceSmoothing: 0.3,
      intensity: 0.6,
      radius: 0.12
    };
    const bloomEffect = new BloomEffect(bloomOptions);
    // Enhanced FXAA for better quality
    const fxaaEffect = new FXAAEffect();
    // Note: FXAAEffect properties are read-only in current version
    // The default settings provide good quality

    const composer = new EffectComposer(renderer);
    composer.setSize(initialWidth, initialHeight);
    composer.addPass(new RenderPass(scene, camera));

    // Only add bloom on high-end devices for performance
    if (isHighEndDevice) {
      composer.addPass(new EffectPass(camera, bloomEffect, fxaaEffect));
    } else {
      composer.addPass(new EffectPass(camera, fxaaEffect)); // Just anti-aliasing on mobile
    }

    // Animation and Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => { isDragging = true; };
    const handleMouseMove = (e: MouseEvent) => {
      const delta = { x: e.offsetX - previousMousePosition.x, y: e.offsetY - previousMousePosition.y };
      if (isDragging) {
        const dq = new THREE.Quaternion().setFromEuler(new THREE.Euler(toRadians(delta.y), toRadians(delta.x), 0, 'XYZ'));
        cube.quaternion.multiplyQuaternions(dq, cube.quaternion);
      }
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
    };
    const handleMouseUp = () => { isDragging = false; };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);

    // Rotate a random layer occasionally, as before
    const tRotate = (cubeToRotate: THREE.Object3D, delay: number) => {
      // Guard: no children to rotate
      if (!cubeToRotate || cubeToRotate.children.length === 0) return;
      if (Math.random() > 0.5) cubeToRotate.rotateY(Math.PI / 2); else cubeToRotate.rotateZ(Math.PI / 2);
      const sideIndex = Math.floor(Math.random() * cubeToRotate.children.length);
      const side = cubeToRotate.children[sideIndex];
      if (!side) return;
      const angles = { x: Math.random() > 0.5 ? -Math.PI : Math.PI, y: 0, z: 0 };
      const pause = Math.random() * 1000;
      const sideRotation = side.rotation as THREE.Euler;
      new TWEEN.Tween(sideRotation)
        .delay(pause)
        .to({ x: sideRotation.x + angles.x, y: sideRotation.y + angles.y, z: sideRotation.z + angles.z }, delay)
        .onComplete(() => setTimeout(() => tRotate(cubeToRotate, delay), pause))
        .start();
    };

    // Initial subtle auto rotation for outer wrapper
    const cubesRoot = cube.children[0]?.children[0];
    if (cubesRoot) {
      tRotate(cubesRoot as THREE.Object3D, 2000);
    }

    let animationFrameId: number;
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Frame rate limiting for performance
      const currentTime = performance.now();
      if (currentTime - lastTime < frameInterval) {
        return;
      }
      lastTime = currentTime;
      
      cube.children[0].rotation.x += 0.002; // Slower, more elegant rotation
      cube.children[0].rotation.y += 0.002;
      cube.children[0].rotation.z += 0.002;
      TWEEN.update();
      composer.render();
    };

    const stop = () => {
      cancelAnimationFrame(animationFrameId);
    };

    // Pause/resume on tab visibility change
    const onVisibilityChange = () => {
      if (document.hidden) { 
        cancelAnimationFrame(animationFrameId); 
      } else { 
        animate(); 
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Pause/resume on viewport intersection
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        animate(); 
      } else { 
        cancelAnimationFrame(animationFrameId); 
      }
    }, { threshold: 0.1 });
    intersectionObserver.observe(container);

    // Kick off once (it may immediately stop if offscreen)
    animate();

    // Throttled resize
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const w = container.clientWidth || initialWidth;
        const h = container.clientHeight || initialHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h); composer.setSize(w, h);
      });
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      stop();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) object.material.forEach(mat => mat.dispose());
            else (object.material as THREE.Material).dispose();
          }
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <canvas ref={canvasRef} />
      <div className={styles.godRaysWrapper}>
        <div className={styles.godRays}></div>
      </div>
    </div>
  );
};

export default ResendCube; 