import { useEffect, useRef, useState } from "react";

const FRAMES = [
  { src: "/personaje-web-hero.png", x: 0, y: 0 },
  { src: "/personaje-web-izq-suave.png", x: -0.4, y: 0.04 },
  { src: "/personaje-web-der-suave.png", x: 0.4, y: 0.04 },
  { src: "/personaje-web-der.png", x: 0.68, y: 0.08 },
  { src: "/personaje-web-lado.png", x: 0.88, y: 0.12 },
  { src: "/personaje-web-perfil-der.png", x: 1.05, y: 0.16 },
  { src: "/personaje-web-perfil-izq.png", x: -1.05, y: 0.18 },
  { src: "/personaje-web-arriba.png", x: 0.02, y: 1 },
  { src: "/personaje-web-abajo.png", x: 0, y: -1 },
  { src: "/personaje-web-arriba-izq.png", x: -0.72, y: 0.8 },
  { src: "/personaje-web-arriba-der.png", x: 0.74, y: 0.8 },
  { src: "/personaje-web-abajo-izq.png", x: -0.7, y: -0.72 },
  { src: "/personaje-web-abajo-der.png", x: 0.74, y: -0.7 },
] as const;

const FRAME_COUNT = FRAMES.length;

function damp(current: number, target: number, velocity: { v: number }, smoothTime: number, dt: number) {
  const omega = 2 / Math.max(0.0001, smoothTime);
  const x = omega * dt;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity.v + omega * change) * dt;
  velocity.v = (velocity.v - omega * temp) * exp;
  return target + (change + temp) * exp;
}

function computeWeights(x: number, y: number, out: Float32Array) {
  let best = 0;
  let second = 1;
  let bestD = Infinity;
  let secondD = Infinity;

  for (let i = 0; i < FRAME_COUNT; i += 1) {
    const dx = FRAMES[i].x - x;
    const dy = (FRAMES[i].y - y) * 0.9;
    const d = Math.hypot(dx, dy);
    if (d < bestD) {
      second = best;
      secondD = bestD;
      best = i;
      bestD = d;
    } else if (d < secondD) {
      second = i;
      secondD = d;
    }
  }

  out.fill(0);
  const closeness = Math.max(0, 1 - (secondD - bestD) / 0.07);
  const secondW = closeness * closeness * 0.22;
  out[best] = 1 - secondW;
  out[second] = secondW;
}

function buildFragmentShader() {
  const uniforms = FRAMES.map((_, i) => `uniform sampler2D uMap${i};`).join("\n");
  const samples = FRAMES.map(
    (_, i) => `col += texture(uMap${i}, uv).rgb * uW[${i}];`,
  ).join("\n");

  return /* glsl */ `
    precision highp float;
    ${uniforms}
    uniform float uW[${FRAME_COUNT}];
    uniform vec4 uFrame;
    uniform float uEdge;
    in vec2 vUv;
    out vec4 fragColor;

    void main() {
      vec2 uv = uFrame.xy + vUv * uFrame.zw;
      vec3 col = vec3(0.0);
      ${samples}
      float fade = smoothstep(0.0, uEdge, vUv.x)
        * smoothstep(0.0, 0.045, vUv.y)
        * smoothstep(0.0, 0.04, 1.0 - vUv.y);
      fragColor = vec4(col, fade);
    }
  `;
}

const VERTEX_SHADER = /* glsl */ `
  precision highp float;
  uniform vec2 uLook;
  out vec2 vUv;
  void main() {
    vUv = uv;
    vec2 p = position.xy * 2.0;
    float z = p.x * uLook.x * 0.14 + p.y * uLook.y * 0.08;
    p *= 1.03;
    p /= 1.0 + z * 0.55;
    gl_Position = vec4(p, 0.0, 1.0);
  }
`;

export function LookAtPortrait() {
  const hostRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const anchor = anchorRef.current;
    if (!host || !anchor) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let disposed = false;
    let cleanup = () => {};

    const boot = async () => {
      const THREE = await import("three");
      if (disposed || !hostRef.current) return;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 20);
      camera.position.z = 3.4;

      const geometry = new THREE.PlaneGeometry(1, 1, 40, 40);
      const weights = new Float32Array(FRAME_COUNT);
      computeWeights(0, 0, weights);

      const loader = new THREE.TextureLoader();
      const textures = await Promise.all(FRAMES.map((frame) => loader.loadAsync(frame.src)));
      if (disposed) {
        textures.forEach((texture) => texture.dispose());
        geometry.dispose();
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }

      textures.forEach((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
      });

      const look = new THREE.Vector2(0, 0);
      const uniforms: Record<string, { value: unknown }> = {
        uW: { value: weights },
        uFrame: { value: new THREE.Vector4(0, 0, 1, 1) },
        uLook: { value: look },
        uEdge: { value: 0.18 },
      };
      textures.forEach((texture, index) => {
        uniforms[`uMap${index}`] = { value: texture };
      });

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: VERTEX_SHADER,
        fragmentShader: buildFragmentShader(),
        transparent: true,
        depthWrite: false,
        glslVersion: THREE.GLSL3,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const fit = () => {
        const width = Math.max(1, host.clientWidth);
        const height = Math.max(1, host.clientHeight);
        renderer.setSize(width, height, false);

        const imageAspect = 16 / 9;
        const containerAspect = width / height;
        const zoom = 1.28;
        let frameW = 1;
        let frameH = 1;
        if (containerAspect < imageAspect) frameW = containerAspect / imageAspect;
        else frameH = imageAspect / containerAspect;
        frameW /= zoom;
        frameH /= zoom;
        const frameX = (1 - frameW) * 0.5;
        const frameY = (1 - frameH) * 0.46;
        (uniforms.uFrame.value as { set: (x: number, y: number, z: number, w: number) => void }).set(
          frameX,
          frameY,
          frameW,
          frameH,
        );
        uniforms.uEdge.value = width / window.innerWidth > 0.92 ? 0.02 : 0.2;
      };

      fit();
      const resizeObserver = new ResizeObserver(fit);
      resizeObserver.observe(host);

      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      const velocityX = { v: 0 };
      const velocityY = { v: 0 };
      let pointing = false;
      let touching = false;
      let lastMove = 0;
      let visible = true;
      let last = performance.now();
      let frame = 0;

      const lookAt = (clientX: number, clientY: number) => {
        const rect = anchor.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.34;
        const nx = (clientX - cx) / (window.innerWidth * 0.33);
        const ny = (cy - clientY) / (window.innerHeight * 0.42);
        target.x = Math.tanh(nx) * 1.05;
        target.y = Math.tanh(ny) * 1.05;
      };

      const onPointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch") {
          if (!touching) return;
        } else if (!canHover) {
          return;
        }
        pointing = true;
        lastMove = performance.now();
        lookAt(event.clientX, event.clientY);
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.pointerType !== "touch") return;
        touching = true;
        pointing = true;
        lastMove = performance.now();
        lookAt(event.clientX, event.clientY);
      };

      const onPointerUp = (event: PointerEvent) => {
        if (event.pointerType !== "touch") return;
        touching = false;
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      window.addEventListener("pointerup", onPointerUp, { passive: true });
      window.addEventListener("pointercancel", onPointerUp, { passive: true });

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0.08 },
      );
      observer.observe(anchor);

      const loop = (now: number) => {
        frame = requestAnimationFrame(loop);
        const dt = Math.min(0.033, (now - last) / 1000);
        last = now;
        if (!visible) return;

        const idle = !pointing || (!touching && now - lastMove > 2400);
        const time = now / 1000;
        const aimX = idle ? Math.sin(time * 0.35) * 0.08 : target.x;
        const aimY = idle ? Math.sin(time * 0.27 + 0.6) * 0.05 : target.y;

        current.x = damp(current.x, aimX, velocityX, 0.28, dt);
        current.y = damp(current.y, aimY, velocityY, 0.32, dt);
        computeWeights(current.x, current.y, weights);

        look.set(current.x, current.y);
        renderer.render(scene, camera);
      };

      frame = requestAnimationFrame(loop);
      setReady(true);

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        geometry.dispose();
        material.dispose();
        textures.forEach((texture) => texture.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    void boot();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div ref={anchorRef} className="relative h-full w-full" aria-hidden>
      <img
        src="/personaje-web-hero.png"
        alt=""
        className={`absolute inset-0 h-full w-full object-cover object-[center_36%] transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <div ref={hostRef} className="absolute inset-0" />
    </div>
  );
}
