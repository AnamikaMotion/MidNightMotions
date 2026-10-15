import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, 
  Layers, Palette, Cpu, Film, ExternalLink, ChevronRight, X, 
  Sliders, Download, Mail, ArrowUpRight, Check, Heart, Eye, 
  Code2, Info, RefreshCw, Zap, Move, Smile, Star, Circle, Compass,
  Monitor, Smartphone, PenTool, MousePointer, Quote
} from 'lucide-react';

/* ==========================================================================
   ANAMIKA'S MIDNIGHT MOTION — CENTRAL PORTFOLIO CONFIGURATION DATA
   ========================================================================== */

const PORTFOLIO_DATA = {
  studio: {
    name: "Anamika's MidNight Motion",
    tagline: "Motion Graphic Designer & Visual Storyteller",
    headline: "CRAFTING MOTION\nTHAT SPEAKS.",
    subheadline: "Bringing ideas to life through high-energy motion graphics, 2D vector character animation, kinetic typography, and bold visual design.",
    availability: "Open for Motion Graphics & Visual Commissions",
    location: "Global / Remote Studio",
    email: "hello@anamikamotion.design",
    quotes: [
      { text: "Animation is not the art of drawings that move, but the art of movements that are drawn.", author: "Norman McLaren" },
      { text: "Design is thinking made visual, but Motion is emotion made unforgettable.", author: "Anamika Patel" },
      { text: "Simplicity is about subtracting the obvious and adding the meaningful.", author: "John Maeda" }
    ],
    socials: {
      behance: "https://behance.net",
      dribbble: "https://dribbble.net",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      vimeo: "https://vimeo.com"
    }
  },

  colors: {
    obsidian: "#0A0B10",
    electricBlue: "#2D5BFF",
    acidLime: "#CCFF00",
    offWhite: "#F3F4F6",
    darkSurface: "#12141F",
    cardSurface: "#181A2A"
  },

  categories: [
    { id: 'all', name: 'All Work' },
    { id: 'aftereffects', name: 'After Effects & Motion' },
    { id: 'illustrator', name: 'Vector & Illustrator' },
    { id: 'photoshop', name: 'Photoshop & Design' },
    { id: 'premiere', name: 'Video & Editing' },
    { id: 'krita', name: '2D Frame Anim' }
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'CYBER BLOB 2D RIG',
      category: 'aftereffects',
      categoryLabel: 'After Effects & Motion',
      software: ['After Effects', 'Illustrator', 'Krita'],
      year: '2026',
      featured: true,
      description: 'Fluid 2D character animation with custom expression rigs and bouncy spring dynamics.',
      coverSvgType: 'blob-character',
      videoDuration: '0:14',
      fps: '60 FPS',
      client: 'Character Motion Experiment',
      details: 'Built in Illustrator and animated frame-by-frame using custom expression controllers in After Effects.'
    },
    {
      id: 'proj-2',
      title: 'ACID BOT KINETIC SYSTEM',
      category: 'illustrator',
      categoryLabel: 'Vector & Illustrator',
      software: ['Illustrator', 'Photoshop'],
      year: '2026',
      featured: true,
      description: 'Geometric 2D vector robot design using high-contrast neon tones and clean grid layouts.',
      coverSvgType: 'vector-robot',
      videoDuration: 'Static Vector',
      fps: 'Vector',
      client: 'Brand Mascot Concept',
      details: 'Precision vector illustration exploring cute shapes, flat shading, and modular facial expressions.'
    },
    {
      id: 'proj-3',
      title: 'TYPO DISRUPT MOTION',
      category: 'aftereffects',
      categoryLabel: 'After Effects & Motion',
      software: ['After Effects', 'Premiere Pro'],
      year: '2025',
      featured: false,
      description: 'Expressive kinetic typography synchronized to rhythmic beats and frame-by-frame glitch accents.',
      coverSvgType: 'kinetic-typo',
      videoDuration: '0:30',
      fps: '60 FPS',
      client: 'Motion Editorial Test',
      details: 'Fast-paced text animator setup combined with audio beat detection and chromatic aberration overlays.'
    }
  ],

  skills: [
    { name: "After Effects & Motion Graphics", level: 95 },
    { name: "Illustrator & Cute Vector Art", level: 92 },
    { name: "Photoshop & Visual Design", level: 90 },
    { name: "Premiere Pro & Video Editing", level: 88 },
    { name: "Krita & 2D Frame Animation", level: 85 }
  ]
};

export default function App() {
  const [activeTab, setActiveTab] = useState('work');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({ x: (clientX / innerWidth) * 2 - 1, y: (clientY / innerHeight) * 2 - 1 });
  };

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div 
      className="min-h-screen bg-[#0A0B10] text-[#F3F4F6] font-montserrat selection:bg-[#CCFF00] selection:text-[#0A0B10] relative overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Montserrat', sans-serif; background-color: #0A0B10; color: #F3F4F6; }
        @keyframes subtleGlow {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(45, 91, 255, 0.4)); }
          50% { filter: drop-shadow(0 0 22px rgba(204, 255, 0, 0.6)); }
        }
        .animate-glow { animation: subtleGlow 4s infinite ease-in-out; }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        .animate-float-blob { animation: floatBlob 5s infinite ease-in-out; }
      `}</style>

      {/* HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0A0B10]/90 backdrop-blur-md border-b border-[#2D5BFF]/20 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#2D5BFF] flex items-center justify-center border border-[#CCFF00]/40 group-hover:scale-105 transition-transform">
              <CuteMascotLogo mousePos={mousePos} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-white flex items-center gap-1.5">
                Anamika's <span className="text-[#CCFF00]">MidNight Motion</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#2D5BFF] uppercase font-bold">Motion Graphic Designer</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 bg-[#12141F]/80 px-6 py-2.5 rounded-full border border-[#2D5BFF]/30 backdrop-blur-sm">
            {[
              { id: 'work', label: 'WORK' },
              { id: 'playground', label: 'CUTE CANVAS GAME' },
              { id: 'skills', label: 'SKILLS' },
              { id: 'about', label: 'ABOUT ME' },
              { id: 'contact', label: 'CONTACT' }
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActiveTab(link.id)}
                className={`text-xs font-semibold tracking-wider transition-colors relative py-1 ${activeTab === link.id ? 'text-[#CCFF00]' : 'text-gray-300 hover:text-white'}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="px-4 py-2 rounded-lg bg-[#CCFF00] text-[#0A0B10] font-bold text-xs tracking-wider hover:bg-[#b8e600] transition-all"
          >
            LET'S TALK
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center border-b border-[#2D5BFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141F] border border-[#2D5BFF]/40 text-[#CCFF00] text-xs font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
              <span>{PORTFOLIO_DATA.studio.availability}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              CRAFTING MOTION <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5BFF] via-white to-[#CCFF00]">
                THAT SPEAKS.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              {PORTFOLIO_DATA.studio.subheadline}
            </p>

            <div className="p-4 rounded-2xl bg-[#12141F] border border-[#2D5BFF]/30 flex items-start gap-3 max-w-xl">
              <Quote className="text-[#CCFF00] shrink-0 mt-1" size={20} />
              <div>
                <p className="text-xs italic text-gray-200 font-medium">"{PORTFOLIO_DATA.studio.quotes[1].text}"</p>
                <span className="text-[10px] text-[#2D5BFF] font-bold uppercase mt-1 block">— {PORTFOLIO_DATA.studio.quotes[1].author}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="px-8 py-4 rounded-xl bg-[#CCFF00] text-[#0A0B10] font-extrabold text-xs tracking-wider hover:bg-[#b8e600] transition-all flex items-center gap-2"
              >
                <span>EXPLORE WORK</span>
                <ChevronRight size={16} />
              </a>

              <a
                href="#playground"
                className="px-8 py-4 rounded-xl bg-[#12141F] border-2 border-[#2D5BFF] text-white font-bold text-xs tracking-wider hover:border-[#CCFF00] transition-all flex items-center gap-2"
              >
                <span>PLAY CUTE GAME</span>
                <Smile size={16} className="text-[#CCFF00]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="w-full aspect-square max-w-md rounded-3xl bg-[#12141F] border-2 border-[#2D5BFF]/40 p-6 flex items-center justify-center relative overflow-hidden shadow-2xl">
              <div className="w-64 h-64 relative z-10 animate-float-blob">
                <CuteMascotLogo mousePos={mousePos} isLarge={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUTE SHAPE CANVAS GAME SECTION */}
      <section id="playground" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#CCFF00] font-bold text-xs tracking-widest uppercase mb-2">
            <Smile size={16} />
            <span>INTERACTIVE MINI GAME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            CUTE SHAPE <span className="text-[#2D5BFF]">PLAYGROUND</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Canvas par click karke cute geometric characters spawn karein aur unke expression & color change karein!
          </p>
        </div>

        <CuteShapeGame />
      </section>

      {/* PORTFOLIO WORK SECTION */}
      <section id="work" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[#2D5BFF] font-bold text-xs tracking-widest uppercase">PORTFOLIO</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              SELECTED <span className="text-[#CCFF00]">PROJECTS</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {PORTFOLIO_DATA.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#CCFF00] text-[#0A0B10]'
                    : 'bg-[#12141F] text-gray-300 border border-[#2D5BFF]/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-[#12141F] rounded-2xl overflow-hidden border border-[#2D5BFF]/20 hover:border-[#CCFF00] transition-all p-5 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] text-[#CCFF00] font-bold uppercase">{project.categoryLabel}</span>
                <h3 className="text-lg font-bold text-white mt-1">{project.title}</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/5">
                {project.software.map((sw, i) => (
                  <span key={i} className="text-[9px] px-2 py-0.5 rounded bg-[#181A2A] text-gray-300 border border-white/5">
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT ME & CREATIVE QUOTES */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[#CCFF00] font-bold text-xs tracking-widest uppercase">ABOUT ANAMIKA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              PASSIONATE <span className="text-[#2D5BFF]">MOTION DESIGNER</span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hi, I am Anamika! A passionate Motion Graphic Designer dedicated to turning static visual concepts into fluid, emotional storytelling.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              My creative process blends cute character graphics, rhythmic keyframe animation, vector grid layouts, and expressive motion kinetics to deliver impactful visual identity experiences.
            </p>

            <div className="space-y-3 pt-2">
              {PORTFOLIO_DATA.studio.quotes.map((q, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#12141F] border border-white/5 flex items-start gap-3">
                  <Quote size={16} className="text-[#CCFF00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-200 italic font-medium">"{q.text}"</p>
                    <span className="text-[10px] text-[#2D5BFF] font-bold uppercase block mt-1">— {q.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl bg-[#12141F] border-2 border-[#2D5BFF]/30 p-8 flex items-center justify-center relative overflow-hidden">
              <CuteMascotLogo mousePos={mousePos} isLarge={true} />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12141F] rounded-3xl border-2 border-[#2D5BFF]/30 p-8 text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[#CCFF00] font-bold text-xs tracking-widest uppercase">LET'S CONNECT</span>
          <h2 className="text-3xl font-extrabold text-white">START A PROJECT WITH ANAMIKA</h2>
          <p className="text-xs text-gray-300">Have a motion graphic brief or creative project? Send an email and let's bring it to life.</p>
          <a
            href={`mailto:${PORTFOLIO_DATA.studio.email}`}
            className="inline-block px-8 py-3.5 rounded-xl bg-[#CCFF00] text-[#0A0B10] font-extrabold text-xs tracking-wider"
          >
            {PORTFOLIO_DATA.studio.email}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-[#0A0B10] border-t border-[#2D5BFF]/20 text-xs text-gray-400 text-center">
        <span>© 2026 Anamika's MidNight Motion. All Rights Reserved.</span>
      </footer>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENTS: CUTE MASCOT & CANVAS GAME
   ========================================================================== */

function CuteMascotLogo({ mousePos, isLarge = false }) {
  const eyeX = (mousePos?.x || 0) * (isLarge ? 8 : 4);
  const eyeY = (mousePos?.y || 0) * (isLarge ? 8 : 4);

  return (
    <div className={`relative ${isLarge ? 'w-64 h-64' : 'w-full h-full'} flex items-center justify-center`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]">
        <path d="M 50,100 C 40,40 160,40 150,100 C 160,160 40,160 50,100 Z" fill="#2D5BFF" stroke="#CCFF00" strokeWidth="6" />
        <path d="M 60,55 L 45,25 L 75,45 Z" fill="#CCFF00" />
        <path d="M 140,55 L 155,25 L 125,45 Z" fill="#CCFF00" />
        <circle cx="75" cy="90" r="18" fill="#0A0B10" />
        <circle cx="125" cy="90" r="18" fill="#0A0B10" />
        <circle cx={75 + eyeX} cy={90 + eyeY} r="8" fill="#CCFF00" />
        <circle cx={125 + eyeX} cy={90 + eyeY} r="8" fill="#CCFF00" />
        <circle cx={78 + eyeX} cy={87 + eyeY} r="3" fill="#FFFFFF" />
        <circle cx={128 + eyeX} cy={87 + eyeY} r="3" fill="#FFFFFF" />
        <ellipse cx="60" cy="112" rx="8" ry="5" fill="#FF5588" opacity="0.8" />
        <ellipse cx="140" cy="112" rx="8" ry="5" fill="#FF5588" opacity="0.8" />
        <path d="M 85,115 Q 100,130 115,115" fill="none" stroke="#F3F4F6" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function CuteShapeGame() {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([
    { id: 1, x: 150, y: 140, radius: 40, color: '#2D5BFF', expression: 'happy' },
    { id: 2, x: 350, y: 160, radius: 45, color: '#CCFF00', expression: 'wink' },
    { id: 3, x: 550, y: 140, radius: 38, color: '#FF5588', expression: 'surprised' }
  ]);
  const [selectedColor, setSelectedColor] = useState('#2D5BFF');
  const [activeExpression, setActiveExpression] = useState('happy');

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes(prev => [
      ...prev,
      {
        id: Date.now(),
        x,
        y,
        radius: Math.floor(Math.random() * 15) + 35,
        color: selectedColor,
        expression: activeExpression
      }
    ]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 320;

    ctx.fillStyle = '#0A0B10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(45, 91, 255, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    shapes.forEach(s => {
      ctx.save();
      ctx.translate(s.x, s.y);

      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#F3F4F6';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#0A0B10';
      ctx.beginPath();
      ctx.arc(-s.radius * 0.3, -s.radius * 0.1, 5, 0, Math.PI * 2);
      ctx.arc(s.radius * 0.3, -s.radius * 0.1, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#0A0B10';
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (s.expression === 'happy') {
        ctx.arc(0, s.radius * 0.1, 10, 0, Math.PI);
      } else if (s.expression === 'surprised') {
        ctx.arc(0, s.radius * 0.2, 6, 0, Math.PI * 2);
      } else {
        ctx.moveTo(-8, s.radius * 0.2);
        ctx.lineTo(8, s.radius * 0.2);
      }
      ctx.stroke();

      ctx.restore();
    });
  }, [shapes, selectedColor, activeExpression]);

  return (
    <div className="bg-[#12141F] rounded-3xl border-2 border-[#2D5BFF]/30 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0A0B10] p-3.5 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400">COLOR:</span>
          {['#2D5BFF', '#CCFF00', '#FF5588', '#00E5FF'].map(col => (
            <button
              key={col}
              onClick={() => setSelectedColor(col)}
              className={`w-6 h-6 rounded-full ${selectedColor === col ? 'ring-2 ring-white scale-110' : ''}`}
              style={{ backgroundColor: col }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400">FACE:</span>
          {['happy', 'surprised', 'wink'].map(exp => (
            <button
              key={exp}
              onClick={() => setActiveExpression(exp)}
              className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase ${activeExpression === exp ? 'bg-[#CCFF00] text-[#0A0B10]' : 'bg-[#181A2A] text-gray-300'}`}
            >
              {exp}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShapes([])}
          className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold"
        >
          CLEAR
        </button>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-[#2D5BFF]/40 cursor-crosshair">
        <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full block" />
        <div className="absolute bottom-3 right-3 bg-[#0A0B10]/80 px-2.5 py-1 rounded text-[10px] font-mono text-gray-400">
          SPAWNED: {shapes.length} | CLICK CANVAS TO ADD
        </div>
      </div>
    </div>
  );
}
