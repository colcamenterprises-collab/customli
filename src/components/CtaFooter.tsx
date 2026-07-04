import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Hls from "hls.js";

const ctaVideoSrc = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

export function CtaFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(ctaVideoSrc);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = ctaVideoSrc;
    }

    return undefined;
  }, []);

  return (
    <section className="relative py-32 px-6 md:px-16 lg:px-24 text-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "200px", background: "linear-gradient(to bottom, black, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{ height: "200px", background: "linear-gradient(to top, black, transparent)" }}
      />
      <div className="relative z-10">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.85] max-w-3xl mx-auto mb-4">
          Your next website starts here.
        </h2>
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-xl mx-auto mb-8">
          Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <button
            className="liquid-glass-strong rounded-full px-6 py-3 text-sm font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-all font-body"
            type="button"
          >
            Book a Call
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button
            className="bg-white text-black rounded-full px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors font-body"
            type="button"
          >
            View Pricing
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <footer className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 font-body font-light text-xs">© 2026 Customli. All rights reserved.</p>
          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            <a className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors" href="#privacy">
              Privacy
            </a>
            <a className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors" href="#terms">
              Terms
            </a>
            <a className="text-white/40 hover:text-white/70 font-body font-light text-xs transition-colors" href="#contact">
              Contact
            </a>
          </nav>
        </footer>
      </div>
    </section>
  );
}
