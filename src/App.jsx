import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Layers,
  Video,
  PenTool,
  Image as ImageIcon,
  CheckCircle2,
  ExternalLink,
  Github,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
  ChevronRight,
  Maximize2,
  RotateCcw,
  Gamepad2,
  Trophy,
  Zap,
  Eye,
  Info,
  Palette,
  Cpu,
  Brush
} from 'lucide-react';

// --- PORTFOLIO DATA (2D MOTION DESIGN & CREATIVE ART) ---
const PORTFOLIO_ITEMS = [
  {
    id: 'cyber-title-sequence',
    title: 'Neon Cyberpunk Title Sequence',
    category: 'Title Sequences',
    software: ['After Effects', 'Photoshop', 'Krita'],
    client: 'CyberMedia Studios',
    duration: '0:45',
    fps: 60,
    renderTime: '1.5 hrs',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    description: 'Dynamic kinetic typography integrated with custom glitched vector overlays and digital painting brushes.',
    details: 'Utilized custom expression selectors in Adobe After Effects for glitch text animations, paired with hand-painted textures in Krita and Photoshop brush overlays.'
  },
  {
    id: 'digital-painting-matte',
    title: 'Fantasy Environment Digital Painting',
    category: 'Digital Art',
    software: ['Krita', 'Photoshop', 'ComfyUI'],
    client: 'Creative Studio Project',
    duration: 'Static / 2D Pass',
    fps: 30,
    renderTime: 'Real-time',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    description: 'Concept digital artwork created with Krita custom brushes and refined through ComfyUI neural workflow enhancement.',
    details: 'Initial composition sketched in Krita, enhanced with ComfyUI node-based texture generation, and color-graded in Photoshop.'
  },
  {
    id: 'vfx-sci-fi-hud',
    title: 'Sci-Fi HUD Compositing & Tracking',
    category: 'VFX & Compositing',
    software: ['After Effects', 'Premiere Pro', 'Illustrator'],
    client: 'FutureTech Labs',
    duration: '1:10',
    fps: 60,
    renderTime: '2.2 hrs',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    description: 'Planar tracking and UI HUD element compositing onto live-action video footage with precise vector paths.',
    details: 'Designed vector elements in Illustrator, executed 3D camera tracking in After Effects, compositing multi-pass HUD layers with glow dissipation.'
  },
  {
    id: 'fluid-logo-animation',
    title: 'Organic Fluid Vector Logo Motion',
    category: 'Logo Motion',
    software: ['After Effects', 'Illustrator'],
    client: 'Aura Organic Brand',
    duration: '0:15',
    fps: 30,
    renderTime: '25 mins',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    description: 'Smooth vector morphing and fluid liquid dynamics animation created entirely with 2D shape layers.',
    details: 'Crafted with complex path morphing techniques and custom speed graphs in After Effects for ultra-smooth easing curves.'
  },
  {
    id: 'kinetic-typography',
    title: 'High-Energy Kinetic Typography',
    category: '2D Motion',
    software: ['After Effects', 'Premiere Pro'],
    client: 'Pulse Music Fest',
    duration: '0:50',
    fps: 60,
    renderTime: '45 mins',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    description: 'Rhythmic, beat-synced typography with aggressive glitch transitions and spatial kinetic movement.',
    details: 'Custom audio amplitude markers triggering text animator offsets and RGB splitting for punchy visual impact.'
  },
  {
    id: 'brand-explainer-motion',
    title: 'SaaS Platform Explainer Video',
    category: '2D Motion',
    software: ['After Effects', 'Illustrator', 'Premiere Pro'],
    client: 'CloudScale Inc',
    duration: '1:45',
    fps: 30,
    renderTime: '1.8 hrs',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    description: 'Minimalist UI animation breakdown illustrating complex data workflows in an engaging vector style.',
    details: 'Designed vector UI systems in Illustrator, animated with clean easing in AE, and mastered sound design in Premiere Pro.'
  }
];

// --- SOFTWARE HUB DATA ---
const SOFTWARE_DATA = [
  {
    id: 'after-effects',
    name: 'After Effects',
    icon: Layers,
    badge: 'Motion Graphics',
    tagline: '2D Animation & Compositing',
    stats: { projects: '120+', mastery: '98%', keyTech: 'Expressions, Rigging, Lottie' },
    description: 'Core tool for dynamic 2D motion graphics, kinetic typography, character rigging, and high-pacing video transitions.',
    features: ['Expression-driven animation automation', 'Vector character rigging', 'Lottie JSON web exports', 'High-end compositing & tracking']
  },
  {
    id: 'photoshop-krita',
    name: 'Photoshop & Krita',
    icon: Brush,
    badge: 'Digital Painting',
    tagline: 'Concept Art & Frame-by-Frame Accents',
    stats: { projects: '150+', mastery: '95%', keyTech: 'Custom Brushes, Layering' },
    description: 'Primary digital painting environments used for concept illustration, custom texture painting, asset preparation, and frame-by-frame accents.',
    features: ['Digital painting & sketch illustration', 'Frame-by-frame brush animations', 'Asset matte cutting & photo retouching', 'Custom texture brush generation']
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    icon: PenTool,
    badge: 'Vector Art',
    tagline: 'Precision Vector Layouts',
    stats: { projects: '140+', mastery: '96%', keyTech: 'Precision Paths, Layer Prep' },
    description: 'Crafting clean, scalable vector assets structured specifically for seamless path-morphing and rigging in After Effects.',
    features: ['Clean vector path layout', 'Layer hierarchy for quick motion rigging', 'Custom typography & iconography', 'Scalable UI components']
  },
  {
    id: 'comfyui',
    name: 'ComfyUI',
    icon: Cpu,
    badge: 'AI Creative Node',
    tagline: 'Node-Based Generative Workflows',
    stats: { projects: '60+', mastery: '88%', keyTech: 'ControlNet, Custom Nodes' },
    description: 'Integrating node-based AI pipelines to generate creative textures, iterate concept variations, and enhance digital artwork pipelines.',
    features: ['Node-based generative image pipelines', 'ControlNet precise pose guidance', 'Custom texture generation', 'AI-assisted concept brainstorming']
  },
  {
    id: 'premiere-pro',
    name: 'Premiere Pro',
    icon: Video,
    badge: 'Video Editing',
    tagline: 'Timeline Editing & Audio Sync',
    stats: { projects: '90+', mastery: '92%', keyTech: 'Lumetri, Essential Sound' },
    description: 'Timeline editing for showreel assembly, pacing refinement, audio beat synchronization, and final master renders.',
    features: ['Precision clip timing & pacing', 'Multitrack sound design & audio sync', 'Lumetri color grading', 'Dynamic Link with After Effects']
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedSoftware, setSelectedSoftware] = useState(SOFTWARE_DATA[0].id);
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Mascot ("Mochi") States
  const [mascotMood, setMascotMood] = useState('idle');
  const [mascotTipIndex, setMascotTipIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const mascotTips = [
    "Hi, I'm Mochi! Welcome to Anamika's Creative Realm!",
    "Combining digital painting with 2D motion yields ultra-unique visuals!",
    "Check out my Snake & Shapes Game down below!",
    "Explore the Software Hub to view Anamika's primary toolkit!"
  ];

  // Showreel States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Snake Game States
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredPortfolio = activeTab === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  const categories = ['All', '2D Motion', 'Digital Art', 'Logo Motion', 'VFX & Compositing', 'Title Sequences'];

  // Snake Game Logic
  const directionRef = useRef('RIGHT');
  const snakeRef = useRef([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const foodRef = useRef({ x: 15, y: 10 });
  const gridSize = 20;
  const tileCount = 20;

  const spawnFood = () => ({
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  });

  const handleGameKey = (e) => {
    if (!gameRunning) return;
    if (['ArrowUp', 'KeyW'].includes(e.code) && directionRef.current !== 'DOWN') directionRef.current = 'UP';
    if (['ArrowDown', 'KeyS'].includes(e.code) && directionRef.current !== 'UP') directionRef.current = 'DOWN';
    if (['ArrowLeft', 'KeyA'].includes(e.code) && directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
    if (['ArrowRight', 'KeyD'].includes(e.code) && directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
  };

  useEffect(() => {
    window.addEventListener('keydown', handleGameKey);
    return () => window.removeEventListener('keydown', handleGameKey);
  }, [gameRunning]);

  const startGame = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    directionRef.current = 'RIGHT';
    foodRef.current = spawnFood();
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
    setMascotMood('gaming');
  };

  useEffect(() => {
    if (!gameRunning) return;

    const gameInterval = setInterval(() => {
      const head = { ...snakeRef.current[0] };

      if (directionRef.current === 'UP') head.y -= 1;
      if (directionRef.current === 'DOWN') head.y += 1;
      if (directionRef.current === 'LEFT') head.x -= 1;
      if (directionRef.current === 'RIGHT') head.x += 1;

      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        setGameRunning(false);
        setMascotMood('idle');
        return;
      }

      for (let segment of snakeRef.current) {
        if (head.x === segment.x && head.y === segment.y) {
          setGameOver(true);
          setGameRunning(false);
          setMascotMood('idle');
          return;
        }
      }

      const newSnake = [head, ...snakeRef.current];

      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(prev => {
          const newScore = prev + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        foodRef.current = spawnFood();
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#0F121D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1E2336';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      const food = foodRef.current;
      ctx.fillStyle = '#CCFF00';
      ctx.shadowColor = '#CCFF00';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      snakeRef.current.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#CCFF00' : '#2D5BFF';
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
      });
    }, 110);

    return () => clearInterval(gameInterval);
  }, [gameRunning, highScore]);

  const setMobileDirection = (dir) => {
    if (!gameRunning) return;
    if (dir === 'UP' && directionRef.current !== 'DOWN') directionRef.current = 'UP';
    if (dir === 'DOWN' && directionRef.current !== 'UP') directionRef.current = 'DOWN';
    if (dir === 'LEFT' && directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
    if (dir === 'RIGHT' && directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#F3F4F6] font-sans antialiased overflow-x-hidden selection:bg-[#CCFF00] selection:text-[#0A0B10]">
      
      {/* --- REFINED HEADER & NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0B10]/90 border-b border-[#2D5BFF]/15 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3.5 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-[#151824] border border-[#2D5BFF]/40 flex items-center justify-center transition-all group-hover:border-[#CCFF00] group-hover:scale-105 shadow-sm">
              <Sparkles className="w-5 h-5 text-[#CCFF00] transition-transform group-hover:rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-wider text-[#F3F4F6] uppercase group-hover:text-[#CCFF00] transition-colors">
                Anamika's
              </span>
              <span className="text-[11px] tracking-widest text-[#2D5BFF] font-bold uppercase -mt-0.5">
                Midnight Motion
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#F3F4F6]/70">
            <a href="#about" className="hover:text-[#CCFF00] transition-colors py-1">About</a>
            <a href="#showreel" className="hover:text-[#CCFF00] transition-colors py-1">Showreel</a>
            <a href="#portfolio" className="hover:text-[#CCFF00] transition-colors py-1">Portfolio</a>
            <a href="#software" className="hover:text-[#CCFF00] transition-colors py-1">Software Hub</a>
            <a href="#game" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1.5 text-[#CCFF00] py-1">
              <Gamepad2 className="w-4 h-4" /> Arcade
            </a>
          </div>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#2D5BFF] hover:bg-[#2D5BFF]/85 text-[#F3F4F6] text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#2D5BFF]/20 hover:shadow-lg hover:shadow-[#2D5BFF]/30 active:scale-95"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-[#151824] text-[#F3F4F6] hover:text-[#CCFF00] border border-[#2D5BFF]/30 transition-colors focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0B10]/98 backdrop-blur-2xl border-b border-[#2D5BFF]/30 px-6 pt-4 pb-8 space-y-3">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#151824] hover:text-[#CCFF00] transition-colors"
            >
              About Me
            </a>
            <a
              href="#showreel"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#151824] hover:text-[#CCFF00] transition-colors"
            >
              Showreel
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#151824] hover:text-[#CCFF00] transition-colors"
            >
              Portfolio Works
            </a>
            <a
              href="#software"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#151824] hover:text-[#CCFF00] transition-colors"
            >
              Software Toolkit
            </a>
            <a
              href="#game"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-semibold bg-[#2D5BFF]/10 text-[#CCFF00] border border-[#CCFF00]/30"
            >
              Arcade Game
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="w-full text-center py-3.5 rounded-xl bg-[#2D5BFF] text-[#F3F4F6] font-bold text-xs uppercase tracking-wider mt-2 shadow-md shadow-[#2D5BFF]/20"
            >
              Let's Talk
            </button>
          </div>
        )}
      </nav>

      {/* --- REFINED ABOUT / HERO SECTION --- */}
      <section id="about" className="relative pt-12 pb-20 md:pt-20 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-12 left-10 w-96 h-96 bg-[#2D5BFF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Statement & Biography Column */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151824] border border-[#2D5BFF]/40 text-xs font-bold text-[#CCFF00] tracking-wide">
              <Zap className="w-3.5 h-3.5" /> Creative Designer & Motion Artist
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-[#F3F4F6]">
              Visual Design, <br />
              <span className="bg-gradient-to-r from-[#2D5BFF] via-[#5C82FF] to-[#CCFF00] bg-clip-text text-transparent">
                Digital Painting
              </span> & Motion.
            </h1>

            <p className="text-base sm:text-lg text-[#F3F4F6]/80 leading-relaxed font-normal max-w-2xl">
              Hello, I'm <strong className="text-[#F3F4F6]">Anamika</strong>—a passionate creative designer focused on crafting compelling visual stories. I bridge digital illustration, concept art, and high-pacing 2D animation using a versatile modern toolkit.
            </p>

            {/* Specialized Creative Toolkit Badges */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F3F4F6]/50 block">Core Creative Stack</span>
              <div className="flex flex-wrap gap-2">
                {['Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'ComfyUI', 'Krita', 'Digital Painting'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-[#151824] border border-[#2D5BFF]/25 text-xs font-medium text-[#F3F4F6]/90 hover:border-[#CCFF00]/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#portfolio"
                className="px-6 py-3.5 rounded-xl bg-[#2D5BFF] hover:bg-[#2D5BFF]/85 text-[#F3F4F6] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#2D5BFF]/20 transition-all hover:scale-[1.02] active:scale-95"
              >
                View Works <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#showreel"
                className="px-6 py-3.5 rounded-xl bg-[#151824] hover:bg-[#1E2336] text-[#F3F4F6] text-xs font-bold uppercase tracking-wider border border-[#2D5BFF]/30 flex items-center gap-2 transition-all hover:border-[#CCFF00]/40"
              >
                Watch Showreel <Play className="w-4 h-4 text-[#CCFF00]" />
              </a>
            </div>
          </div>

          {/* Interactive Mascot & Studio Card Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Interactive Tip Bubble */}
            <div
              onClick={() => setMascotTipIndex((prev) => (prev + 1) % mascotTips.length)}
              className="cursor-pointer mb-4 px-4 py-2.5 rounded-2xl bg-[#151824] border border-[#CCFF00]/40 text-xs text-[#F3F4F6] shadow-xl flex items-center gap-2 hover:border-[#CCFF00] transition-colors"
            >
              <Info className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>{mascotTips[mascotTipIndex]}</span>
            </div>

            {/* Mascot "Mochi" SVG */}
            <div
              onMouseEnter={() => setMascotMood('happy')}
              onMouseLeave={() => setMascotMood('idle')}
              onClick={() => setMascotMood('amazed')}
              className="w-64 h-64 sm:w-72 sm:h-72 relative cursor-pointer group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2D5BFF]/25 to-[#CCFF00]/15 blur-2xl group-hover:scale-110 transition-transform" />

              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-2xl">
                <line x1="100" y1="40" x2="100" y2="20" stroke="#2D5BFF" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="18" r="6" fill="#CCFF00" className="animate-pulse" />

                <rect x="40" y="40" width="120" height="90" rx="20" fill="#151824" stroke="#2D5BFF" strokeWidth="3" />
                <rect x="50" y="52" width="100" height="66" rx="12" fill="#0A0B10" stroke="#2D5BFF" strokeWidth="1.5" />

                {(() => {
                  const pupilOffsetX = Math.min(Math.max((mousePos.x - window.innerWidth / 2) / 40, -6), 6);
                  const pupilOffsetY = Math.min(Math.max((mousePos.y - window.innerHeight / 2) / 40, -4), 4);

                  return (
                    <g>
                      <circle cx="75" cy="80" r="14" fill="#1E2336" stroke="#2D5BFF" strokeWidth="1" />
                      <circle cx={75 + pupilOffsetX} cy={80 + pupilOffsetY} r={mascotMood === 'amazed' ? '8' : '6'} fill="#CCFF00" />

                      <circle cx="125" cy="80" r="14" fill="#1E2336" stroke="#2D5BFF" strokeWidth="1" />
                      <circle cx={125 + pupilOffsetX} cy={80 + pupilOffsetY} r={mascotMood === 'amazed' ? '8' : '6'} fill="#CCFF00" />
                    </g>
                  );
                })()}

                {mascotMood === 'happy' && (
                  <path d="M 80 102 Q 100 114 120 102" fill="none" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" />
                )}
                {mascotMood === 'amazed' && (
                  <circle cx="100" cy="104" r="6" fill="#CCFF00" />
                )}
                {mascotMood === 'gaming' && (
                  <rect x="80" y="100" width="40" height="5" rx="2" fill="#2D5BFF" />
                )}
                {mascotMood === 'idle' && (
                  <line x1="85" y1="104" x2="115" y2="104" stroke="#2D5BFF" strokeWidth="3" strokeLinecap="round" />
                )}

                <rect x="85" y="130" width="30" height="12" fill="#1E2336" rx="3" />
                <path d="M 50 160 Q 100 142 150 160 L 160 185 L 40 185 Z" fill="#151824" stroke="#2D5BFF" strokeWidth="2" />
              </svg>
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs font-bold tracking-wider uppercase text-[#F3F4F6]">Mochi • 2D Mascot</span>
              <span className="text-[11px] text-[#F3F4F6]/50 block">Interactive Studio Companion</span>
            </div>
          </div>

        </div>
      </section>

      {/* --- SHOWREEL SECTION --- */}
      <section id="showreel" className="py-16 bg-[#0F121D] border-y border-[#2D5BFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#CCFF00]">Visual Highlights</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#F3F4F6] mt-1">Creative Motion Showreel</h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#F3F4F6]/60">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> 60 FPS Master</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> High Bitrate</span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-[#151824] border border-[#2D5BFF]/30 aspect-video shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80"
              alt="Anamika Motion Showreel Cover"
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-75' : 'group-hover:scale-102'}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent opacity-80" />

            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-[#2D5BFF] hover:bg-[#CCFF00] text-[#F3F4F6] hover:text-[#0A0B10] flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#F3F4F6]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-[#0A0B10]/80 border border-[#2D5BFF]/40 text-[#CCFF00]">
                  {isPlaying ? 'PLAYING 0:42 / 1:30' : 'SHOWREEL 2026'}
                </span>
                {isPlaying && (
                  <div className="hidden sm:flex items-center gap-1">
                    <span className="w-1 h-4 bg-[#CCFF00] animate-bounce" />
                    <span className="w-1 h-6 bg-[#2D5BFF] animate-bounce delay-75" />
                    <span className="w-1 h-3 bg-[#CCFF00] animate-bounce delay-150" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-lg bg-[#0A0B10]/80 hover:bg-[#2D5BFF] border border-[#2D5BFF]/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#CCFF00]" />}
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- PORTFOLIO GALLERY SECTION --- */}
      <section id="portfolio" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#CCFF00]">Selected Creative Works</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F3F4F6]">Motion & Visual Portfolio</h2>
          <p className="text-sm text-[#F3F4F6]/60">Filter through recent 2D animations, digital paintings, concept art, and title sequences.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === cat
                  ? 'bg-[#2D5BFF] text-[#F3F4F6] shadow-lg shadow-[#2D5BFF]/30'
                  : 'bg-[#151824] text-[#F3F4F6]/70 hover:text-[#F3F4F6] hover:bg-[#1E2336] border border-[#2D5BFF]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveArtwork(item)}
              className="group bg-[#151824] rounded-2xl overflow-hidden border border-[#2D5BFF]/20 hover:border-[#2D5BFF] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video overflow-hidden bg-[#0A0B10]">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0A0B10]/80 backdrop-blur-md text-[10px] font-bold text-[#CCFF00] border border-[#CCFF00]/30">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-[#0A0B10]/80 text-[10px] font-mono text-[#F3F4F6]">
                    {item.duration}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-[#F3F4F6] group-hover:text-[#CCFF00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F3F4F6]/60 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#2D5BFF]/10 flex items-center justify-between text-[11px] text-[#F3F4F6]/50">
                <span>{item.software.join(' • ')}</span>
                <span className="text-[#2D5BFF] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Inspect Details <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- SOFTWARE HUB SECTION --- */}
      <section id="software" className="py-20 bg-[#0F121D] border-t border-[#2D5BFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#CCFF00]">Workflow & Toolkit</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F3F4F6]">Software Hub</h2>
            <p className="text-sm text-[#F3F4F6]/60">Deep dive into my design software stack across digital painting, motion graphics, and video compositing.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            {SOFTWARE_DATA.map((sw) => {
              const IconComp = sw.icon;
              const isSelected = selectedSoftware === sw.id;
              return (
                <button
                  key={sw.id}
                  onClick={() => setSelectedSoftware(sw.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#2D5BFF] border-[#2D5BFF] text-[#F3F4F6] shadow-lg shadow-[#2D5BFF]/30'
                      : 'bg-[#151824] border-[#2D5BFF]/20 text-[#F3F4F6]/70 hover:bg-[#1E2336]'
                  }`}
                >
                  <IconComp className={`w-5 h-5 shrink-0 ${isSelected ? 'text-[#CCFF00]' : 'text-[#2D5BFF]'}`} />
                  <div>
                    <span className="text-xs font-bold block">{sw.name}</span>
                    <span className="text-[10px] opacity-75">{sw.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {(() => {
            const currentSw = SOFTWARE_DATA.find(s => s.id === selectedSoftware);
            if (!currentSw) return null;
            return (
              <div className="bg-[#151824] rounded-2xl p-6 sm:p-8 border border-[#2D5BFF]/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-block px-3 py-1 rounded-md bg-[#2D5BFF]/20 text-[#CCFF00] border border-[#CCFF00]/30 text-xs font-bold">
                    {currentSw.tagline}
                  </div>
                  <h3 className="text-2xl font-black text-[#F3F4F6]">{currentSw.name} Workflow</h3>
                  <p className="text-sm text-[#F3F4F6]/70 leading-relaxed">{currentSw.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentSw.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#F3F4F6]">
                        <CheckCircle2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#0A0B10] p-6 rounded-xl border border-[#2D5BFF]/20 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-[#CCFF00] tracking-wider">Tool Metrics</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-[#1E2336]">
                      <span className="text-[#F3F4F6]/60">Projects Delivered</span>
                      <span className="font-bold text-[#F3F4F6]">{currentSw.stats.projects}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#1E2336]">
                      <span className="text-[#F3F4F6]/60">Workflow Proficiency</span>
                      <span className="font-bold text-[#CCFF00]">{currentSw.stats.mastery}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-[#F3F4F6]/60">Key Tech / Plugins</span>
                      <span className="font-bold text-[#2D5BFF]">{currentSw.stats.keyTech}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* --- INTERACTIVE CANVAS SNAKE & SHAPES GAME --- */}
      <section id="game" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#151824] rounded-3xl p-6 sm:p-10 border border-[#2D5BFF]/30 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5BFF]/20 text-[#CCFF00] text-xs font-bold border border-[#CCFF00]/30">
                <Gamepad2 className="w-4 h-4" /> Canvas Arcade Game
              </div>

              <h2 className="text-3xl font-black text-[#F3F4F6]">Snake & Cute Shapes</h2>
              <p className="text-sm text-[#F3F4F6]/70 leading-relaxed">
                Take a creative break! Play the custom HTML5 Canvas Snake arcade game directly inside my portfolio! Collect glowing shape targets to build up your high score.
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div

