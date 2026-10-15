import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, 
  Layers, Palette, Cpu, Film, ExternalLink, ChevronRight, X, 
  Sliders, Download, Mail, ArrowUpRight, Check, Heart, Eye, 
  Code2, Info, RefreshCw, Zap, Move, Smile, Star, Circle, Compass,
  Monitor, Smartphone, PenTool, MousePointer, Quote, Gamepad2
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
    quote: {
      text: "Animation is not the art of drawings that move, but the art of movements that are drawn.",
      author: "Norman McLaren"
    },
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
    { id: 'photoshop', name: 'Photoshop & Design' }
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
      client: 'Character Motion Experiment'
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
      client: 'Brand Mascot Concept'
    }
  ],

  skills: [
    { name: "After Effects & Motion Graphics", level: 95 },
    { name: "Illustrator & Cute Vector Art", level: 92 },
    { name: "Photoshop & Visual Design", level: 90 },
    { name: "Premiere Pro & Video Editing", level: 88 }
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
              <span className="font-extrabold text-sm sm:text-lg tracking-wider text-white flex items-center gap-1.5">
                Anamika's <span className="text-[#CCFF00]">MidNight Motion</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#2D5BFF] uppercase font-bold">Motion Graphic Designer</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 bg-[#12141F]/80 px-6 py-2.5 rounded-full border border-[#2D5BFF]/30 backdrop-blur-sm">
            {[
              { id: 'work', label: 'WORK' },
              { id: 'snake-game', label: 'SNAKE GAME & SHAPES' },
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
                <p className="text-xs italic text-gray-200 font-medium">"{PORTFOLIO_DATA.studio.quote.text}"</p>
                <span className="text-[10px] text-[#2D5BFF] font-bold uppercase mt-1 block">— {PORTFOLIO_DATA.studio.quote.author}</span>
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
                href="#snake-game"
                className="px-8 py-4 rounded-xl bg-[#12141F] border-2 border-[#2D5BFF] text-white font-bold text-xs tracking-wider hover:border-[#CCFF00] transition-all flex items-center gap-2"
              >
                <span>PLAY SNAKE GAME</span>
                <Gamepad2 size={16} className="text-[#CCFF00]" />
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

      {/* SNAKE RUN & CUTE SHAPES CANVAS GAME SECTION */}
      <section id="snake-game" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-[#CCFF00] font-bold text-xs tracking-widest uppercase mb-2">
            <Gamepad2 size={16} />
            <span>INTERACTIVE ARCADE MINI-GAME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            SNAKE RUN & <span className="text-[#2D5BFF]">CUTE SHAPES</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Arrow keys ka use karke Snake ko control karein, balls khayein, score badhayein, ya fir canvas par click karke cute shapes spawn karein!
          </p>
        </div>

        <CanvasSnakeGame />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
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

      {/* ABOUT ME SECTION */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[#CCFF00] font-bold text-xs tracking-widest uppercase">ABOUT ANAMIKA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              PASSIONATE <span className="text-[#2D5BFF]">MOTION DESIGNER</span>
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Hi, I am Anamika! A professional Motion Graphic Designer dedicated to turning static visual concepts into fluid, emotional storytelling under **Anamika's MidNight Motion** studio.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              My design workflow combines vector precision, cute 2D character physics, and rhythmic kinetic typography to build striking visual identities.
            </p>

            <div className="p-4 rounded-xl bg-[#12141F] border border-white/5 flex items-start gap-3 mt-4">
              <Quote size={18} className="text-[#CCFF00] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-200 italic font-medium">"{PORTFOLIO_DATA.studio.quote.text}"</p>
                <span className="text-[10px] text-[#2D5BFF] font-bold uppercase block mt-1">— {PORTFOLIO_DATA.studio.quote.author}</span>
              </div>
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
          <p className="text-xs text-gray-300">Have a motion graphic brief or creative project? Send an email and let's collaborate.</p>
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
   SUB-COMPONENTS: CUTE MASCOT & SNAKE/SHAPES CANVAS GAME
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

function CanvasSnakeGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [shapes, setShapes] = useState([
    { x: 120, y: 120, radius: 35, color: '#2D5BFF', expression: 'happy' },
    { x: 280, y: 180, radius: 40, color: '#CCFF00', expression: 'wink' },
    { x: 450, y: 100, radius: 35, color: '#FF5588', expression: 'surprised' }
  ]);

  // Snake state reference
  const snakeRef = useRef({
    body: [{ x: 100, y: 100 }, { x: 90, y: 100 }, { x: 80, y: 100 }],
    dir: 'RIGHT',
    food: { x: 200, y: 200 }
  });

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setShapes(prev => [
      ...prev,
      {
        x,
        y,
        radius: Math.floor(Math.random() * 15) + 30,
        color: ['#2D5BFF', '#CCFF00', '#FF5588', '#00E5FF'][Math.floor(Math.random() * 4)],
        expression: ['happy', 'wink', 'surprised'][Math.floor(Math.random() * 3)]
      }
    ]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const dir = snakeRef.current.dir;
      if (e.key === 'ArrowUp' && dir !== 'DOWN') snakeRef.current.dir = 'UP';
      if (e.key === 'ArrowDown' && dir !== 'UP') snakeRef.current.dir = 'DOWN';
      if (e.key === 'ArrowLeft' && dir !== 'RIGHT') snakeRef.current.dir = 'LEFT';
      if (e.key === 'ArrowRight' && dir !== 'LEFT') snakeRef.current.dir = 'RIGHT';
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let interval;
    if (gameRunning) {
      interval = setInterval(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const snake = snakeRef.current;

        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 340;

        // Move snake head
        let head = { ...snake.body[0] };
        if (snake.dir === 'UP') head.y -= 15;
        if (snake.dir === 'DOWN') head.y += 15;
        if (snake.dir === 'LEFT') head.x -= 15;
        if (snake.dir === 'RIGHT') head.x += 15;

        // Wrap around borders
        if (head.x < 0) head.x = canvas.width - 15;
        if (head.x >= canvas.width) head.x = 0;
        if (head.y < 0) head.y = canvas.height - 15;
        if (head.y >= canvas.height) head.y = 0;

        // Check food collision
        const dist = Math.hypot(head.x - snake.food.x, head.y - snake.food.y);
        if (dist < 20) {
          setScore(s => s + 1);
          snake.food = {
            x: Math.floor(Math.random() * (canvas.width - 40)) + 20,
            y: Math.floor(Math.random() * (canvas.height - 40)) + 20
          };
        } else {
          snake.body.pop();
        }

        snake.body.unshift(head);

        // Render Canvas
        ctx.fillStyle = '#0A0B10';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid
        ctx.strokeStyle = 'rgba(45, 91, 255, 0.1)';
        for (let x = 0; x < canvas.width; x += 30) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }

        // Draw cute background shapes
        shapes.forEach(s => {
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(0, 0, s.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#F3F4F6'; ctx.lineWidth = 2; ctx.stroke();
          ctx.restore();
        });

        // Draw food ball
        ctx.fillStyle = '#CCFF00';
        ctx.beginPath();
        ctx.arc(snake.food.x, snake.food.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10; ctx.shadowColor = '#CCFF00';

        // Draw Snake Body
        snake.body.forEach((seg, idx) => {
          ctx.fillStyle = idx === 0 ? '#CCFF00' : '#2D5BFF';
          ctx.beginPath();
          ctx.arc(seg.x, seg.y, 8, 0, Math.PI * 2);
          ctx.fill();
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameRunning, shapes]);

  return (
    <div className="bg-[#12141F] rounded-3xl border-2 border-[#2D5BFF]/30 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0A0B10] p-3.5 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#CCFF00] font-mono">SCORE: {score}</span>
          <span className="text-xs text-gray-400">| Use Arrow Keys to play Snake</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setGameRunning(!gameRunning)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold ${gameRunning ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-[#CCFF00] text-[#0A0B10]'}`}
          >
            {gameRunning ? 'PAUSE GAME' : 'START SNAKE GAME'}
          </button>
          <button
            onClick={() => setShapes([])}
            className="px-3 py-1.5 rounded-lg bg-[#181A2A] text-gray-300 text-xs font-bold"
          >
            CLEAR SHAPES
          </button>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-[#2D5BFF]/40 cursor-crosshair">
        <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full block" />
        {!gameRunning && (
          <div className="absolute inset-0 bg-[#0A0B10]/80 backdrop-blur-xs flex flex-col items-center justify-center space-y-3">
            <Gamepad2 size={40} className="text-[#CCFF00] animate-bounce" />
            <p className="text-sm font-bold text-white">Click "START SNAKE GAME" or click anywhere to spawn shapes!</p>
            <button
              onClick={() => setGameRunning(true)}
              className="px-6 py-2.5 rounded-xl bg-[#CCFF00] text-[#0A0B10] font-extrabold text-xs"
            >
              PLAY NOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
