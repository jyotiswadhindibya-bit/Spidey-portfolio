import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Select all animatable elements
      const elements = sectionRef.current.querySelectorAll('.animate-element');
      
      // Stagger them fading directly upward
      tl.fromTo(elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Insert actual send behavior here later
    alert("Connection encrypted. Message transmitted!");
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative w-full min-h-[80vh] bg-[#030303] flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Intense Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[800px] h-[500px] bg-red-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50 transition-opacity duration-1000" />
      </div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Header Block */}
        <div className="mb-12 animate-element">
          <p className="text-red-500 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Deployment Ready ]
          </p>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white font-sans leading-none mb-8 drop-shadow-2xl">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white font-serif italic pr-2">Connect</span>
          </h2>
          <p className="text-gray-400 font-light text-xl tracking-wide leading-relaxed max-w-2xl mx-auto mb-12">
            I'm currently looking for new opportunities and collaborations. Whether you have a project in mind or just want to say hi, my network is always open.
          </p>

          {/* Central LinkedIn CTA */}
          <div className="flex justify-center">
            <a 
              href="https://www.linkedin.com/in/swadhin-dibya-jyoti-348176374/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group overflow-hidden rounded-full px-16 py-6 border border-red-500/30 bg-black text-white text-lg uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:scale-[1.05] hover:border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.1)] hover:shadow-[0_0_60px_rgba(239,68,68,0.4)]"
            >
              {/* Animated Inner Sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              
              <span className="relative z-10 flex items-center justify-center space-x-4">
                <span>Connect on LinkedIn</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="transform group-hover:translate-x-2 transition-transform duration-300">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Other Social Channels Footer */}
        <div className="animate-element mt-16 flex flex-wrap justify-center gap-10 border-t border-white/5 pt-12">
          {/* Email */}
          <a
            href="mailto:jyotiswadhindibya@gmail.com"
            className="flex items-center gap-3 text-gray-500 hover:text-white transition-all duration-300 group text-sm tracking-widest uppercase font-medium"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 group-hover:text-red-500 transition-colors duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            Email
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/jyotiswadhindibya-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-500 hover:text-white transition-all duration-300 group text-sm tracking-widest uppercase font-medium"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 group-hover:text-red-500 transition-colors duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            GitHub
          </a>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}
