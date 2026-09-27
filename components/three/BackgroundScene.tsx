"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

export default function BackgroundScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Check performance preferences
    const reducedMotion = prefersReducedMotion();
    const isMobile = isTouchDevice() || window.innerWidth < 768;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080a, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for all rotating objects
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Technological Core (Icosahedron Wireframe + Inner Solid Nucleus)
    const coreGeo = new THREE.IcosahedronGeometry(isMobile ? 1.1 : 1.4, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWire = new THREE.Mesh(coreGeo, coreWireMat);
    mainGroup.add(coreWire);

    const innerGeo = new THREE.OctahedronGeometry(isMobile ? 0.7 : 0.9, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.15,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 2. Outer Gyroscopic Rings
    const ringGeo = new THREE.TorusGeometry(isMobile ? 1.7 : 2.1, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Cyber Horizon Grid
    const gridHelper = new THREE.GridHelper(30, 30, 0x00f0ff, 0x161e2e);
    gridHelper.position.y = -3.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.22;
    scene.add(gridHelper);

    // 4. Floating Particle Constellation Field
    const particleCount = isMobile ? 200 : reducedMotion ? 150 : 650;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Custom circular particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(0, 240, 255, 1)");
      grad.addColorStop(0.4, "rgba(56, 189, 248, 0.6)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // 5. Interactive Click Shockwave Ring
    const shockwaveGeo = new THREE.RingGeometry(0.1, 0.15, 48);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.position.set(0, 0, 2);
    scene.add(shockwaveMesh);
    let shockwaveScale = 0.1;
    let shockwaveOpacity = 0;

    // Lighting (ambient + subtle point lights)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 10);
    pointLight.position.set(2, 3, 2);
    scene.add(pointLight);

    // Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let lastScrollY = 0;
    let scrollVelocity = 0;
    let isVisible = true;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      shockwaveMesh.position.set(normX * 3.5, normY * 3.5, 2.5);
      shockwaveScale = 0.1;
      shockwaveOpacity = 0.8;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      scrollVelocity = Math.abs(scrollY - lastScrollY);
      lastScrollY = scrollY;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      // Animate shockwave
      if (shockwaveOpacity > 0.01) {
        shockwaveScale += 0.12;
        shockwaveOpacity *= 0.92;
        shockwaveMesh.scale.set(shockwaveScale, shockwaveScale, shockwaveScale);
        shockwaveMat.opacity = shockwaveOpacity;
      }

      // Base rotation + velocity boost + mouse influence
      if (!reducedMotion) {
        const speedMultiplier = 1 + scrollVelocity * 0.05;
        coreWire.rotation.x = elapsedTime * 0.15 * speedMultiplier;
        coreWire.rotation.y = elapsedTime * 0.22 * speedMultiplier;

        innerMesh.rotation.x = -elapsedTime * 0.2 * speedMultiplier;
        innerMesh.rotation.z = elapsedTime * 0.18 * speedMultiplier;

        ring1.rotation.z = elapsedTime * 0.12;
        ring2.rotation.x = elapsedTime * 0.09;

        particles.rotation.y = elapsedTime * 0.03 + mouseX * 0.2;
        particles.rotation.x = -elapsedTime * 0.02 + mouseY * 0.2;

        // Subtle camera / group parallax
        mainGroup.rotation.y = mouseX * 0.25;
        mainGroup.rotation.x = -mouseY * 0.25;

        // Grid horizon movement with scroll
        gridHelper.position.z = (elapsedTime * 0.5) % 1.25;
        gridHelper.rotation.y = mouseX * 0.1;

        // Section depth parallax based on scroll
        const scrollFactor = scrollY * 0.0006;
        mainGroup.position.y = -scrollFactor * 0.8;
        mainGroup.position.z = Math.sin(scrollFactor * 0.5) * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js geometries and materials
      coreGeo.dispose();
      coreWireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      gridHelper.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      shockwaveGeo.dispose();
      shockwaveMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
