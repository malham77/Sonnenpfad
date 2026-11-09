import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowDown, MessageCircle, Compass } from "lucide-react";

interface Hero3DProps {
  onExploreClick: () => void;
  onPlanClick: () => void;
  onWhatsAppClick: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({
  onExploreClick,
  onPlanClick,
  onWhatsAppClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    // Three.js ambient particles & golden atmospheric haze
    if (!canvasMountRef.current) return;

    const mount = canvasMountRef.current;
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // Check for software WebGL guard
    const isSoftwareGl = (() => {
      const gl = document.createElement("canvas").getContext("webgl2");
      if (!gl) return true;
      const ext = gl.getExtension("WEBGL_debug_renderer_info");
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x171a17, 0.0015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Warm African sunlight atmosphere particles (golden dust motes)
    const particleCount = isSoftwareGl ? 80 : 350;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    const particleColors = new Float32Array(particleCount * 3);

    const goldColor = new THREE.Color(0xd99a00);
    const sunColor = new THREE.Color(0xf4b41a);
    const sandColor = new THREE.Color(0xd9c8a6);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 500;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 300;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 300;

      particleScales[i] = Math.random() * 2 + 0.8;

      const mixedColor = Math.random() > 0.5 ? goldColor : Math.random() > 0.5 ? sunColor : sandColor;
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(particleScales, 1));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Procedural circle particle texture to avoid any 404
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(244, 180, 26, 0.8)");
      gradient.addColorStop(1, "rgba(244, 180, 26, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 4,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xf4b41a, 0.6);
    scene.add(ambientLight);

    let animationFrameId: number;
    let targetCameraX = 0;
    let targetCameraY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
      targetCameraX = x * 22;
      targetCameraY = -y * 14;
    };

    window.addEventListener("mousemove", handlePointerMove);

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow drift of golden motes
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += Math.sin(elapsed + i) * 0.08 + 0.03;
        if (positions[i * 3 + 1] > 150) {
          positions[i * 3 + 1] = -150;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Smooth camera interpolation
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCameraX, 2.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCameraY, 2.5, delta);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleMotionChange);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  // Parallax offsets calculated for desktop (reduced if reduced motion is requested)
  const factor = prefersReducedMotion ? 0 : 1;
  const p1 = { x: mousePos.x * 6 * factor, y: mousePos.y * 4 * factor };
  const p2 = { x: mousePos.x * 12 * factor, y: mousePos.y * 8 * factor };
  const p3 = { x: mousePos.x * 18 * factor, y: mousePos.y * 12 * factor };
  const p4 = { x: mousePos.x * 24 * factor, y: mousePos.y * 16 * factor };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#171A17]"
      aria-label="Welcome Hero"
    >
      {/* LAYER 1: Distant Rwenzori Mountains & Sky Horizon */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out will-change-transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85')`,
          transform: `translate3d(${p1.x}px, ${p1.y}px, 0)`
        }}
      />

      {/* LAYER 2: Golden African Sunlight Atmospheric Scrim & Light Gradients */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: `
            radial-gradient(circle at 50% 35%, rgba(244, 180, 26, 0.22) 0%, rgba(7, 63, 39, 0.45) 55%, rgba(23, 26, 23, 0.88) 95%),
            linear-gradient(to bottom, rgba(7, 63, 39, 0.4) 0%, rgba(23, 26, 23, 0.3) 50%, rgba(23, 26, 23, 0.98) 100%)
          `,
          transform: `translate3d(${p2.x}px, ${p2.y}px, 0)`
        }}
      />

      {/* LAYER 3: Wildlife Silhouettes & Middle Savannah/Mist Depth */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-40 mix-blend-screen pointer-events-none transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=80')`,
          transform: `translate3d(${p3.x}px, ${p3.y}px, 0)`
        }}
      />

      {/* LAYER 4: 3D WebGL Atmosphere Canvas (Floating golden dust motes) */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      />

      {/* Bottom Vignette & Gradient for Seamless Content Bleed */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#171A17] via-[#171A17]/80 to-transparent pointer-events-none z-10" />

      {/* LAYER 5: Typography, Brand Promise & CTAs */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${p4.x * 0.4}px, ${p4.y * 0.4}px, 0)`
        }}
      >
        {/* Subtle Editorial Top Kicker */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-[#D99A00]" />
          <span className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-[#F4B41A]">
            Welcome to the Pearl of Africa
          </span>
          <span className="h-px w-8 bg-[#D99A00]" />
        </div>

        {/* Large Cinematic Hero Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F7F4EC] leading-[1.08] mb-6 text-balance drop-shadow-md">
          Discover Uganda. <br />
          <span className="italic font-light text-[#F4B41A]">Follow the Path</span> to Adventure.
        </h1>

        {/* Hero Copy */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#F7F4EC]/85 font-light leading-relaxed mb-10 text-balance">
          Journey through wild savannahs, ancient rainforests, legendary rivers and vibrant communities with Sonnenpfad Safaris Uganda Ltd.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 bg-[#073F27] hover:bg-[#0a4d30] text-[#F7F4EC] text-xs md:text-sm font-semibold uppercase tracking-[0.2em] border border-[#D99A00]/60 rounded-none shadow-xl hover:border-[#F4B41A] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Explore Safaris</span>
            <Compass className="w-4 h-4 text-[#F4B41A] group-hover:rotate-45 transition-transform duration-300" />
          </button>

          <button
            onClick={onPlanClick}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#F7F4EC]/10 text-[#F7F4EC] text-xs md:text-sm font-semibold uppercase tracking-[0.2em] border border-[#F7F4EC]/30 hover:border-[#D99A00] rounded-none transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Plan My Journey</span>
          </button>

          <button
            onClick={onWhatsAppClick}
            className="w-full sm:w-auto px-6 py-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#F7F4EC] text-xs md:text-sm font-medium tracking-wider border border-[#25D366]/40 hover:border-[#25D366] rounded-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            title="Chat directly with Sonnenpfad Safaris on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span className="text-[#F7F4EC]">+256 773 333108</span>
          </button>
        </div>
      </div>

      {/* Refined Animated Scroll Indicator */}
      <button
        onClick={onExploreClick}
        aria-label="Scroll to introduction"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#D99A00] hover:text-[#F4B41A] transition-colors cursor-pointer group"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#F7F4EC]/60 group-hover:text-[#F4B41A] transition-colors">
          Scroll
        </span>
        <div className="w-5 h-8 border border-[#D99A00]/60 rounded-full flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#F4B41A] rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
};
