"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { cn } from "@/lib/utils";

export interface RavineProps {
  speed?: number;
  steps?: number;
  stepScale?: number;
  scale?: number;
  height?: number;
  spread?: number;
  wallCurve?: number;
  fade?: number;
  cameraHeight?: number;
  tilt?: number;
  roll?: number;
  fov?: number;
  nearColor?: string;
  farColor?: string;
  brightness?: number;
  contrast?: number;
  grain?: number;
  paused?: boolean;
  dpr?: number;
  className?: string;
  children?: React.ReactNode;
}

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

#define MAX_STEPS 256
#define HIT_EPSILON 0.001

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform int uSteps;
uniform float uStepScale;
uniform float uScale;
uniform float uHeight;
uniform float uSpread;
uniform float uWallCurve;
uniform float uFade;
uniform float uCameraHeight;
uniform float uTilt;
uniform float uRoll;
uniform float uFov;
uniform vec3 uNear;
uniform vec3 uFar;
uniform float uBrightness;
uniform float uContrast;
uniform float uGrain;

const mat2 OCTAVE_TWIST = mat2(0.8, 0.6, -0.6, 0.8);

mat2 rotate(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

float ripple(vec2 p) {
  return sin(1.5 * p.x) * sin(1.5 * p.y);
}

void octave(inout vec2 p, inout float sum, float amplitude, float zoom) {
  sum += amplitude * (0.5 + 0.5 * ripple(p));
  p = OCTAVE_TWIST * p * zoom;
}

float terrainNoise(vec2 p) {
  float sum = 0.0;
  octave(p, sum, 0.5, 2.02);
  octave(p, sum, 0.25, 2.03);
  octave(p, sum, 0.125, 2.01);
  octave(p, sum, 0.0625, 2.04);
  sum += 0.015625 * (0.5 + 0.5 * ripple(p));
  return sum / 0.96875;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float canyon(vec3 p) {
  vec3 q = p + vec3(0.0, 0.0, uTime);
  float relief = terrainNoise(q.xz * uScale) * uHeight;
  float wall = pow(abs(q.x) * uSpread, uWallCurve) * 0.0000125;
  return max(q.y - relief * wall, 0.0);
}

float scene(vec3 p) {
  return canyon(p);
}

void main() {
  vec2 frag = vUv * uResolution;
  vec2 uv = (frag - 0.5 * uResolution) / uResolution.y;

  vec3 origin = vec3(uv + vec2(0.0, uCameraHeight), -1.0);
  vec3 dir = normalize(vec3(uv * uFov, 1.0));
  dir.zy = rotate(uTilt) * dir.zy;
  dir.xy = rotate(uRoll) * dir.xy;

  vec3 p = origin;
  int taken = 0;
  for (int i = 0; i < MAX_STEPS; i++) {
    if (i >= uSteps) break;
    taken = i;
    float jitter = (hash(p.xz) - 0.5) * uGrain;
    float d = scene(p + vec3(jitter));
    if (d < HIT_EPSILON) break;
    p += dir * d * uStepScale;
  }

  float tone = float(taken) / float(MAX_STEPS);
  tone = (tone - 0.5) * uContrast + 0.5;
  tone = clamp(tone * uBrightness, 0.0, 1.0);
  if (uFade > 0.0) {
    float travelled = distance(origin, p) / uFade;
    tone *= exp(-travelled * travelled);
  }

  gl_FragColor = vec4(mix(uNear, uFar, tone), 1.0);
}
`;

const clamp = (val: number, min: number, max: number) =>
  Math.min(max, Math.max(min, val));

const setMatColor = (target: THREE.Color, colorStr: string, fallback: string) => {
  try {
    target.set(colorStr);
  } catch {
    target.set(fallback);
  }
};

const createColor = (colorStr: string, fallback: string) => {
  const c = new THREE.Color();
  try {
    c.set(colorStr);
  } catch {
    c.set(fallback);
  }
  return c;
};

interface SceneProps {
  speed: number;
  steps: number;
  stepScale: number;
  scale: number;
  height: number;
  spread: number;
  wallCurve: number;
  fade: number;
  cameraHeight: number;
  tilt: number;
  roll: number;
  fov: number;
  nearColor: string;
  farColor: string;
  brightness: number;
  contrast: number;
  grain: number;
  paused: boolean;
}

function RavineScene({
  speed,
  steps,
  stepScale,
  scale,
  height,
  spread,
  wallCurve,
  fade,
  cameraHeight,
  tilt,
  roll,
  fov,
  nearColor,
  farColor,
  brightness,
  contrast,
  grain,
  paused,
}: SceneProps) {
  const meshRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);
  const { gl, size, invalidate } = useThree();

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uSteps: { value: 128 },
      uStepScale: { value: 0.5 },
      uScale: { value: 0.25 },
      uHeight: { value: 1 },
      uSpread: { value: 34 },
      uWallCurve: { value: 2.5 },
      uFade: { value: 35 },
      uCameraHeight: { value: 6 },
      uTilt: { value: 0.05 },
      uRoll: { value: 0.075 },
      uFov: { value: 1 },
      uNear: { value: createColor("#000000", "#000000") },
      uFar: { value: createColor("#ffffff", "#ffffff") },
      uBrightness: { value: 0.8 },
      uContrast: { value: 1 },
      uGrain: { value: 0.005 },
    }),
    []
  );

  useEffect(() => {
    const mat = meshRef.current;
    if (mat) {
      setMatColor(mat.uniforms.uNear.value, nearColor, "#000000");
      setMatColor(mat.uniforms.uFar.value, farColor, "#ffffff");
      invalidate();
    }
  }, [nearColor, farColor, invalidate]);

  useEffect(() => {
    invalidate();
  }, [
    steps,
    stepScale,
    scale,
    height,
    spread,
    wallCurve,
    fade,
    cameraHeight,
    tilt,
    roll,
    fov,
    brightness,
    contrast,
    grain,
    invalidate,
  ]);

  useFrame((_, delta) => {
    const mat = meshRef.current;
    if (!mat) return;
    if (!paused) {
      timeRef.current += Math.min(delta, 0.05) * speed * 2.5;
    }
    const dpr = gl.getPixelRatio();
    const u = mat.uniforms;
    u.uResolution.value.set(size.width * dpr, size.height * dpr);
    u.uTime.value = timeRef.current;
    u.uSteps.value = Math.round(clamp(steps, 32, 256));
    u.uStepScale.value = clamp(stepScale, 0.1, 1);
    u.uScale.value = Math.max(scale, 0.01);
    u.uHeight.value = height;
    u.uSpread.value = Math.max(spread, 0);
    u.uWallCurve.value = Math.max(wallCurve, 0.5);
    u.uFade.value = Math.max(fade, 0);
    u.uCameraHeight.value = cameraHeight;
    u.uTilt.value = tilt;
    u.uRoll.value = roll;
    u.uFov.value = Math.max(fov, 0.1);
    u.uBrightness.value = Math.max(brightness, 0);
    u.uContrast.value = Math.max(contrast, 0);
    u.uGrain.value = Math.max(grain, 0);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={meshRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Ravine({
  speed = 1,
  steps = 128,
  stepScale = 0.5,
  scale = 0.25,
  height = 1,
  spread = 34,
  wallCurve = 2.5,
  fade = 35,
  cameraHeight = 6,
  tilt = 0.05,
  roll = 0.075,
  fov = 1,
  nearColor = "#000000",
  farColor = "#ffffff",
  brightness = 0.8,
  contrast = 1,
  grain = 0.005,
  paused = false,
  dpr = 1,
  className,
  children,
}: RavineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const currentDpr = Math.min(
    typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    Math.max(dpr, 0.5)
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0">
        <Canvas
          orthographic
          dpr={currentDpr}
          frameloop={isVisible && !paused ? "always" : "demand"}
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: "high-performance",
          }}
        >
          <RavineScene
            speed={speed}
            steps={steps}
            stepScale={stepScale}
            scale={scale}
            height={height}
            spread={spread}
            wallCurve={wallCurve}
            fade={fade}
            cameraHeight={cameraHeight}
            tilt={tilt}
            roll={roll}
            fov={fov}
            nearColor={nearColor}
            farColor={farColor}
            brightness={brightness}
            contrast={contrast}
            grain={grain}
            paused={paused}
          />
        </Canvas>
      </div>
      {children ? <div className="relative z-10 h-full w-full">{children}</div> : null}
    </div>
  );
}
