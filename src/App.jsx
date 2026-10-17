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
  Info
} from 'lucide-react';

// --- PORTFOLIO DATA (2D MOTION DESIGN & VFX) ---
const PORTFOLIO_ITEMS = [
  {
    id: 'cyber-title-sequence',
    title: 'Neon Cyberpunk Title Sequence',
    category: 'Title Sequences',
    software: ['After Effects', 'Photoshop'],
    client: 'CyberMedia Studios',
    duration: '0:45',
    fps: 60,
    renderTime: '1.5 hrs',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    description: 'Dynamic kinetic typography integrated with custom glitched vector overlays and neon color grading.',
    details: 'Utilized custom expression selectors in Adobe After Effects for glitch text animations, paired with frame-by-frame Photoshop brush overlays for organic cyber textures.'
  },
  {
    id: 'fluid-logo-animation',
    title: 'Organic Fluid Logo Motion',
    category: 'Logo Motion',
    software: ['After Effects', 'Illustrator'],
    client: 'Aura Organic Brand',
    duration: '0:15',
    fps: 30,
    renderTime: '25 mins',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    description: 'Smooth vector morphing and fluid liquid dynamics animation created entirely with 2D shape layers.',
    details: 'Crafted with complex path morphing techniques and custom speed graphs in After Effects for ultra-smooth easing curves.'
  },
  {
    id: 'vfx-sci-fi-hud',
    title: 'Sci-Fi HUD Compositing & Tracking',
    category: 'VFX & Compositing',
    software: ['After Effects', 'Premiere Pro'],
    client: 'FutureTech Labs',
    duration: '1:10',
    fps: 60,
    renderTime: '2.2 hrs',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    description: 'Planar tracking and UI HUD element compositing onto live-action video footage with color match.',
    details: 'Executed 3D camera tracking in After Effects, compositing multi-pass HUD layers with glow dissipation and optical flare accents.'
  },
  {
    id: 'character-walk-cycle',
    title: '2D Vector Character Walk Cycle',
    category: '2D Motion',
    software: ['After Effects', 'Illustrator'],
    client: 'Indie Game Studio',
    duration: '0:30',
    fps: 24,
    renderTime: '40 mins',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    description: 'Rigged vector character walk animation featuring natural secondary motion and expressive keyframing.',
    details: 'Rigged using Duik Angela in AE, featuring custom limb IK structures and subtle cloth secondary bounce dynamics.'
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
    badge: 'Core Tool',
    tagline: 'Motion Graphics, Rigging & Compositing',
    stats: { projects: '120+', mastery: '98%', keyTech: 'Duik, Expressions, Lottie' },
    description: 'My primary powerhouse for 2D animation, kinetic typography, character rigging, and high-end compositing.',
    features: ['Expression-driven automation', 'Vector character rigging with Duik', 'Lottie JSON exports for Web & Apps', 'Glitch & VFX compositing']
  },
  {
    id: 'premiere-pro',
    name: 'Premiere Pro',
    icon: Video,
    badge: 'Video Editing',
    tagline: 'Timeline Editing & Sound Design',
    stats: { projects: '85+', mastery: '92%', keyTech: 'Lumetri Color, Essential Sound' },
    description: 'Essential for high-pacing video edit sequences, audio beat-syncing, color grading, and showreel assembly.',
    features: ['Precision video trimming & pacing', 'Multitrack sound design & SFX', 'Lumetri cinematic color grading', 'Dynamic Link with After Effects']
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    icon: PenTool,
    badge: 'Vector Art',
    tagline: 'Illustration & Asset Preparation',
    stats: { projects: '150+', mastery: '95%', keyTech: 'Vector Paths, Layer Prep' },
    description: 'Where all 2D motion graphics begin—building ultra-clean vector assets structured specifically for AE animation.',
    features: ['Clean path layout for path-morphing', 'Strict layer hierarchy for quick rigging', 'Custom icon & logo vector creation', 'Scalable UI components']
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    icon: ImageIcon,
    badge: 'Asset Prep',
    tagline: 'Frame-by-Frame Brush Accents',
    stats: { projects: '90+', mastery: '90%', keyTech: 'Hand-drawn FX, Textures' },
    description: 'Used for texture matte creation, photo-manipulation asset prep, and frame-by-frame brush accents.',
    features: ['Hand-drawn frame-by-frame accents', 'Seamless texture generation', 'Matte extraction & retouching', 'Storyboard sketch design']
  }
];

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedSoftware, setSelectedSoftware] = useState(SOFTWARE_DATA[0].id);
  const [activeArtwork, setActiveArtwork] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Mascot ("Mochi") States
  const [mascotMood, setMascotMood] = useState('idle'); // idle, happy, amazed, gaming
  const [mascotTipIndex, setMascotTipIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const mascotTips = [
    "Hi, I'm Mochi! Welcome to Anamika's Motion Realm!",
    "Tip: Smooth easing graphs make 2D motion feel organic!",
    "Check out my Snake & Shapes Game down below!",
    "All software tabs feature my favorite motion workflows!"
  ];

  // Showreel Video Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Snake Game States
  const canvasRef = useRef(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Track Mouse Coordinates for Mascot Eyes
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Filtered Portfolio Items
  const filteredPortfolio = activeTab === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeTab);

  const categories = ['All', '2D Motion', 'Logo Motion', 'VFX & Compositing', 'Title Sequences'];

  // --- SNAKE & SHAPES CANVAS GAME LOGIC ---
  const directionRef = useRef('RIGHT');
  const snakeRef = useRef([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const foodRef = useRef({ x: 15, y: 10, type: 'star' });
  const gridSize = 20;
  const tileCount = 20;

  const spawnFood = () => {
    const types = ['star', 'cube', 'orb'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    return {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
      type: randomType
    };
  };

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

      // Wall Collision Check
      if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        setGameOver(true);
        setGameRunning(false);
        setMascotMood('idle');
        return;
      }

      // Self Collision Check
      for (let segment of snakeRef.current) {
        if (head.x === segment.x && head.y === segment.y) {
          setGameOver(true);
          setGameRunning(false);
          setMascotMood('idle');
          return;
        }
      }

      const newSnake = [head, ...snakeRef.current];

      // Food Collision
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

      // Draw Canvas Frame
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      ctx.fillStyle = '#0F121D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines
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

      // Draw Food
      const food = foodRef.current;
      const fx = food.x * gridSize + gridSize / 2;
      const fy = food.y * gridSize + gridSize / 2;

      ctx.fillStyle = '#CCFF00';
      ctx.shadowColor = '#CCFF00';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(fx, fy, gridSize / 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Snake
      snakeRef.current.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#CCFF00' : '#2D5BFF';
        ctx.fillRect(
          segment.x * gridSize + 1,
          segment.y * gridSize + 1,
          gridSize - 2,
          gridSize - 2
        );
      });
    }, 110);

    return () => clearInterval(gameInterval);
  }, [gameRunning, highScore]);

  // Handle D-Pad mobile touches
  const setMobileDirection = (dir) => {
    if (!gameRunning) return;
    if (dir === 'UP' && directionRef.current !== 'DOWN') directionRef.current = 'UP';
    if (dir === 'DOWN' && directionRef.current !== 'UP') directionRef.current = 'DOWN';
    if (dir === 'LEFT' && directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
    if (dir === 'RIGHT' && directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#F3F4F6] font-sans antialiased overflow-x-hidden selection:bg-[#CCFF00] selection:text-[#0A0B10]">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#0A0B10]/80 border-b border-[#2D5BFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#2D5BFF] to-[#CCFF00] p-[2px] flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-[#0A0B10] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#CCFF00]" />
              </div>
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight block text-[#F3F4F6]">
                ANAMIKA'S
              </span>
              <span className="text-xs tracking-widest text-[#2D5BFF] font-semibold uppercase block -mt-1">
                Midnight Motion
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#showreel" className="hover:text-[#CCFF00] transition-colors">Showreel</a>
            <a href="#portfolio" className="hover:text-[#CCFF00] transition-colors">Portfolio</a>
            <a href="#software" className="hover:text-[#CCFF00] transition-colors">Software Hub</a>
            <a href="#game" className="hover:text-[#CCFF00] transition-colors flex items-center gap-1.5 text-[#CCFF00]">
              <Gamepad2 className="w-4 h-4" /> Canvas Game
            </a>
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-[#2D5BFF] hover:bg-[#2D5BFF]/80 text-[#F3F4F6] font-semibold transition-all shadow-lg shadow-[#2D5BFF]/20 hover:scale-[1.02] active:scale-95"
            >
              Let's Connect
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#151824] text-[#F3F4F6] hover:text-[#CCFF00] border border-[#2D5BFF]/30"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0A0B10]/95 backdrop-blur-xl border-b border-[#2D5BFF]/30 px-4 pt-4 pb-6 space-y-4">
            <a
              href="#showreel"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg hover:bg-[#151824] hover:text-[#CCFF00]"
            >
              Showreel
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg hover:bg-[#151824] hover:text-[#CCFF00]"
            >
              Portfolio
            </a>
            <a
              href="#software"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg hover:bg-[#151824] hover:text-[#CCFF00]"
            >
              Software Hub
            </a>
            <a
              href="#game"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-lg bg-[#2D5BFF]/10 text-[#CCFF00] border border-[#CCFF00]/30"
            >
              Canvas Game
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="w-full text-center py-3 rounded-lg bg-[#2D5BFF] text-[#F3F4F6] font-semibold"
            >
              Let's Connect
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION WITH 2D MASCOT "MOCHI" --- */}
      <header className="relative pt-12 pb-20 md:pt-20 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glow Spheres */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#2D5BFF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151824] border border-[#2D5BFF]/40 text-xs font-semibold text-[#CCFF00]">
              <Zap className="w-3.5 h-3.5" /> 2D Motion Graphic Designer & Compositor
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Crafting High-Pacing <br />
              <span className="bg-gradient-to-r from-[#2D5BFF] via-[#5C82FF] to-[#CCFF00] bg-clip-text text-transparent">
                2D Motion Graphics
              </span> & Visuals.
            </h1>

            <p className="text-base sm:text-lg text-[#F3F4F6]/70 max-w-2xl leading-relaxed">
              Welcome to <strong className="text-[#F3F4F6]">Anamika's Midnight Motion</strong>. Specialized in dynamic kinetic typography, fluid vector morphing, clean UI explainer animations, and high-impact title sequences.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#portfolio"
                className="px-6 py-3.5 rounded-xl bg-[#2D5BFF] hover:bg-[#2D5BFF]/80 text-[#F3F4F6] font-bold flex items-center gap-2 shadow-lg shadow-[#2D5BFF]/25 transition-all hover:scale-105"
              >
                Explore Works <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#showreel"
                className="px-6 py-3.5 rounded-xl bg-[#151824] hover:bg-[#1E2336] text-[#F3F4F6] font-semibold border border-[#2D5BFF]/30 flex items-center gap-2 transition-all"
              >
                Watch Showreel <Play className="w-4 h-4 text-[#CCFF00]" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive 2D Mascot "Mochi" */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Mascot Tip Bubble */}
            <div
              onClick={() => setMascotTipIndex((prev) => (prev + 1) % mascotTips.length)}
              className="cursor-pointer mb-4 px-4 py-2.5 rounded-2xl bg-[#151824] border border-[#CCFF00]/40 text-xs text-[#F3F4F6] shadow-xl flex items-center gap-2 hover:border-[#CCFF00] transition-colors"
            >
              <Info className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>{mascotTips[mascotTipIndex]}</span>
            </div>

            {/* Mascot Body (SVG Interactive) */}
            <div
              onMouseEnter={() => setMascotMood('happy')}
              onMouseLeave={() => setMascotMood('idle')}
              onClick={() => setMascotMood('amazed')}
              className="w-64 h-64 sm:w-72 sm:h-72 relative cursor-pointer group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2D5BFF]/30 to-[#CCFF00]/20 blur-2xl group-hover:scale-110 transition-transform" />

              <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-2xl">
                {/* Robot Antenna */}
                <line x1="100" y1="40" x2="100" y2="20" stroke="#2D5BFF" strokeWidth="4" strokeLinecap="round" />
                <circle x1="100" cy="18" r="6" fill="#CCFF00" className="animate-pulse" />

                {/* Robot Head */}
                <rect x="40" y="40" width="120" height="90" rx="20" fill="#151824" stroke="#2D5BFF" strokeWidth="3" />
                
                {/* Screen Display */}
                <rect x="50" y="52" width="100" height="66" rx="12" fill="#0A0B10" stroke="#2D5BFF" strokeWidth="1.5" />

                {/* Interactive Pupil Coordinates */}
                {(() => {
                  const pupilOffsetX = Math.min(Math.max((mousePos.x - window.innerWidth / 2) / 40, -6), 6);
                  const pupilOffsetY = Math.min(Math.max((mousePos.y - window.innerHeight / 2) / 40, -4), 4);

                  return (
                    <g>
                      {/* Left Eye Socket */}
                      <circle cx="75" cy="80" r="14" fill="#1E2336" stroke="#2D5BFF" strokeWidth="1" />
                      <circle cx={75 + pupilOffsetX} cy={80 + pupilOffsetY} r={mascotMood === 'amazed' ? '8' : '6'} fill="#CCFF00" />

                      {/* Right Eye Socket */}
                      <circle cx="125" cy="80" r="14" fill="#1E2336" stroke="#2D5BFF" strokeWidth="1" />
                      <circle cx={125 + pupilOffsetX} cy={80 + pupilOffsetY} r={mascotMood === 'amazed' ? '8' : '6'} fill="#CCFF00" />
                    </g>
                  );
                })()}

                {/* Mouth Expressions */}
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

                {/* Neck & Shoulders */}
                <rect x="85" y="130" width="30" height="12" fill="#1E2336" rx="3" />
                <path d="M 50 160 Q 100 142 150 160 L 160 185 L 40 185 Z" fill="#151824" stroke="#2D5BFF" strokeWidth="2" />
              </svg>
            </div>

            <div className="mt-3 text-center">
              <span className="text-sm font-bold text-[#F3F4F6]">MOCHI</span>
              <span className="text-xs text-[#F3F4F6]/50 block">Interactive Assistant</span>
            </div>
          </div>

        </div>
      </header>

      {/* --- SHOWREEL SECTION --- */}
      <section id="showreel" className="py-16 bg-[#0F121D] border-y border-[#2D5BFF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#CCFF00]">Visual Highlights</span>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#F3F4F6] mt-1">2D Motion Design Showreel</h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#F3F4F6]/60">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> 60 FPS Master</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#CCFF00]" /> High Bitrate</span>
            </div>
          </div>

          {/* Video Container */}
          <div className="relative rounded-2xl overflow-hidden bg-[#151824] border border-[#2D5BFF]/30 aspect-video shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80"
              alt="Anamika Motion Showreel Cover"
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 filter brightness-75' : 'group-hover:scale-102'}`}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent to-transparent opacity-80" />

            {/* Center Play Button Toggle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-[#2D5BFF] hover:bg-[#CCFF00] text-[#F3F4F6] hover:text-[#0A0B10] flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
            </div>

            {/* Video Controls Bar */}
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
          <p className="text-sm text-[#F3F4F6]/60">Filter through recent 2D animation projects, title sequences, and compositing shots.</p>
        </div>

        {/* Filter Categories */}
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

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveArtwork(item)}
              className="group bg-[#151824] rounded-2xl overflow-hidden border border-[#2D5BFF]/20 hover:border-[#2D5BFF] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Media Aspect Container */}
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

                {/* Card Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-lg font-bold text-[#F3F4F6] group-hover:text-[#CCFF00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F3F4F6]/60 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Tools */}
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
            <p className="text-sm text-[#F3F4F6]/60">Deep dive into my primary design software stack and specialized techniques.</p>
          </div>

          {/* Software Tabs Switcher */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {SOFTWARE_DATA.map((sw) => {
              const IconComp = sw.icon;
              const isSelected = selectedSoftware === sw.id;
              return (
                <button
                  key={sw.id}
                  onClick={() => setSelectedSoftware(sw.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#2D5BFF] border-[#2D5BFF] text-[#F3F4F6] shadow-lg shadow-[#2D5BFF]/30'
                      : 'bg-[#151824] border-[#2D5BFF]/20 text-[#F3F4F6]/70 hover:bg-[#1E2336]'
                  }`}
                >
                  <IconComp className={`w-6 h-6 shrink-0 ${isSelected ? 'text-[#CCFF00]' : 'text-[#2D5BFF]'}`} />
                  <div>
                    <span className="text-sm font-bold block">{sw.name}</span>
                    <span className="text-[10px] opacity-75">{sw.badge}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Software Detailed Content */}
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
            
            {/* Game Info Panel */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2D5BFF]/20 text-[#CCFF00] text-xs font-bold border border-[#CCFF00]/30">
                <Gamepad2 className="w-4 h-4" /> Canvas Arcade Game
              </div>

              <h2 className="text-3xl font-black text-[#F3F4F6]">Snake & Cute Shapes</h2>
              <p className="text-sm text-[#F3F4F6]/70 leading-relaxed">
                Need a creative break? Play the custom HTML5 Canvas Snake arcade game directly inside my portfolio! Collect glowing shape targets to build up your high score.
              </p>

              {/* Score Display */}
              <div className="flex items-center gap-6 pt-2">
                <div className="bg-[#0A0B10] px-4 py-3 rounded-xl border border-[#2D5BFF]/30 min-w-[110px]">
                  <span className="text-[10px] text-[#F3F4F6]/50 block font-bold uppercase">Current Score</span>
                  <span className="text-2xl font-black text-[#CCFF00]">{score}</span>
                </div>
                <div className="bg-[#0A0B10] px-4 py-3 rounded-xl border border-[#2D5BFF]/30 min-w-[110px]">
                  <span className="text-[10px] text-[#F3F4F6]/50 block font-bold uppercase">High Score</span>
                  <span className="text-2xl font-black text-[#2D5BFF]">{highScore}</span>
                </div>
              </div>

              {/* Controls Notice */}
              <div className="text-xs text-[#F3F4F6]/50 flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-[#0A0B10] border border-[#2D5BFF]/30 text-[#F3F4F6] font-mono">WASD / ARROWS</span>
                <span>or Touch D-Pad to steer</span>
              </div>

              {!gameRunning && (
                <button
                  onClick={startGame}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2D5BFF] hover:bg-[#2D5BFF]/80 text-[#F3F4F6] font-bold shadow-lg shadow-[#2D5BFF]/30 flex items-center justify-center gap-2 transition-all"
                >
                  {gameOver ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {gameOver ? 'Play Again' : 'Start Game'}
                </button>
              )}
            </div>

            {/* Canvas Game Frame */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#2D5BFF]/40 bg-[#0F121D] shadow-2xl">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={400}
                  className="max-w-full h-auto block"
                />

                {/* Start Overlay */}
                {!gameRunning && !gameOver && (
                  <div className="absolute inset-0 bg-[#0A0B10]/85 backdrop-blur-sm flex flex-col items-center justify-center space-y-4 p-6 text-center">
                    <Trophy className="w-12 h-12 text-[#CCFF00] animate-bounce" />
                    <h3 className="text-xl font-bold text-[#F3F4F6]">Canvas Snake & Shapes</h3>
                    <button
                      onClick={startGame}
                      className="px-6 py-2.5 rounded-lg bg-[#2D5BFF] text-[#F3F4F6] text-sm font-bold"
                    >
                      Press Start
                    </button>
                  </div>
                )}

                {/* Game Over Overlay */}
                {gameOver && (
                  <div className="absolute inset-0 bg-[#0A0B10]/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 p-6 text-center">
                    <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest">Game Over</span>
                    <h3 className="text-2xl font-black text-[#F3F4F6]">Final Score: {score}</h3>
                    <button
                      onClick={startGame}
                      className="px-6 py-2.5 rounded-lg bg-[#2D5BFF] text-[#F3F4F6] text-sm font-bold flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Try Again
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Touch D-Pad Controls */}
              {gameRunning && (
                <div className="mt-4 grid grid-cols-3 gap-2 w-48 lg:hidden">
                  <div />
                  <button onClick={() => setMobileDirection('UP')} className="p-3 rounded-lg bg-[#2D5BFF] text-white font-bold text-center">▲</button>
                  <div />
                  <button onClick={() => setMobileDirection('LEFT')} className="p-3 rounded-lg bg-[#2D5BFF] text-white font-bold text-center">◄</button>
                  <button onClick={() => setMobileDirection('DOWN')} className="p-3 rounded-lg bg-[#2D5BFF] text-white font-bold text-center">▼</button>
                  <button onClick={() => setMobileDirection('RIGHT')} className="p-3 rounded-lg bg-[#2D5BFF] text-white font-bold text-center">►</button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* --- ARTWORK DETAIL MODAL --- */}
      {activeArtwork && (
        <div className="fixed inset-0 z-50 bg-[#0A0B10]/90 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto flex items-center justify-center">
          <div className="bg-[#151824] rounded-2xl max-w-3xl w-full border border-[#2D5BFF]/40 overflow-hidden relative shadow-2xl my-8">
            
            <button
              onClick={() => setActiveArtwork(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0A0B10]/80 text-[#F3F4F6] hover:text-[#CCFF00] border border-[#2D5BFF]/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video relative bg-[#0A0B10]">
              <img src={activeArtwork.thumbnail} alt={activeArtwork.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider">{activeArtwork.category}</span>
                <h3 className="text-2xl font-black text-[#F3F4F6] mt-1">{activeArtwork.title}</h3>
              </div>

              <p className="text-sm text-[#F3F4F6]/80 leading-relaxed">{activeArtwork.details}</p>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0A0B10] border border-[#2D5BFF]/20 text-xs">
                <div>
                  <span className="text-[#F3F4F6]/50 block">Client</span>
                  <span className="font-bold text-[#F3F4F6]">{activeArtwork.client}</span>
                </div>
                <div>
                  <span className="text-[#F3F4F6]/50 block">Frame Rate</span>
                  <span className="font-bold text-[#CCFF00]">{activeArtwork.fps} FPS</span>
                </div>
                <div>
                  <span className="text-[#F3F4F6]/50 block">Render Time</span>
                  <span className="font-bold text-[#2D5BFF]">{activeArtwork.renderTime}</span>
                </div>
                <div>
                  <span className="text-[#F3F4F6]/50 block">Duration</span>
                  <span className="font-bold text-[#F3F4F6]">{activeArtwork.duration}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveArtwork(null)}
                  className="px-6 py-2.5 rounded-lg bg-[#2D5BFF] text-[#F3F4F6] text-xs font-bold"
                >
                  Close Inspection
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- CONTACT MODAL --- */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0B10]/90 backdrop-blur-xl p-4 overflow-y-auto flex items-center justify-center">
          <div className="bg-[#151824] rounded-2xl max-w-md w-full border border-[#2D5BFF]/40 p-6 sm:p-8 relative shadow-2xl">
            
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#F3F4F6]/60 hover:text-[#CCFF00]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-[#F3F4F6] mb-2">Let's Create Together</h3>
            <p className="text-xs text-[#F3F4F6]/60 mb-6">Have a motion graphics project, title sequence, or inquiry? Reach out directly!</p>

            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent."); setContactModalOpen(false); }} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#F3F4F6]/70 mb-1 font-semibold">Your Name</label>
                <input required type="text" placeholder="John Doe" className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B10] border border-[#2D5BFF]/30 text-[#F3F4F6] focus:border-[#CCFF00] outline-none" />
              </div>
              <div>
                <label className="block text-[#F3F4F6]/70 mb-1 font-semibold">Email Address</label>
                <input required type="email" placeholder="john@example.com" className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B10] border border-[#2D5BFF]/30 text-[#F3F4F6] focus:border-[#CCFF00] outline-none" />
              </div>
              <div>
                <label className="block text-[#F3F4F6]/70 mb-1 font-semibold">Project Details</label>
                <textarea required rows={4} placeholder="Describe your motion graphic needs..." className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0B10] border border-[#2D5BFF]/30 text-[#F3F4F6] focus:border-[#CCFF00] outline-none resize-none" />
              </div>
              <button type="submit" className="w-full py-3 rounded-lg bg-[#2D5BFF] hover:bg-[#2D5BFF]/80 text-[#F3F4F6] font-bold text-sm shadow-lg shadow-[#2D5BFF]/30">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="bg-[#0A0B10] border-t border-[#2D5BFF]/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#F3F4F6]/50">
          <div>
            <span className="font-bold text-[#F3F4F6] text-sm block">Anamika's Midnight Motion</span>
            <span>© 2026 Anamika Motion. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/AnamikaMotion/MidNightMotions" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-[#151824] hover:text-[#CCFF00] border border-[#2D5BFF]/20">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#151824] hover:text-[#CCFF00] border border-[#2D5BFF]/20">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#151824] hover:text-[#CCFF00] border border-[#2D5BFF]/20">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-[#151824] hover:text-[#CCFF00] border border-[#2D5BFF]/20">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
