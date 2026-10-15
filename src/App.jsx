import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, Sparkles, 
  Layers, Palette, Cpu, Film, ExternalLink, ChevronRight, X, 
  Sliders, Download, Mail, ArrowUpRight, Check, Heart, Eye, 
  Code2, Info, RefreshCw, Zap, Move, Smile, Star, Circle, Compass,
  Monitor, Smartphone, PenTool, MousePointer
} from 'lucide-react';

/* ==========================================================================
   EASY EDITING SYSTEM — CENTRAL PORTFOLIO CONFIGURATION DATA
   Visual creatives can edit all content, projects, colors, and links right here!
   ========================================================================== */

const PORTFOLIO_DATA = {
  studio: {
    name: "MIDNIGHT MOTION",
    tagline: "Premium Creative Portfolio & Motion Design Studio",
    headline: "DESIGN THAT\nMOVES YOU.",
    subheadline: "Exploring graphic design, illustration, motion, and AI-powered creativity through bold visual storytelling.",
    availability: "Available for Q3/Q4 Creative Commissions",
    location: "Global / Remote Studio",
    email: "hello@midnightmotion.design",
    socials: {
      behance: "https://behance.net",
      dribbble: "https://dribbble.net",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      vimeo: "https://vimeo.com"
    }
  },

  // Color design tokens (driven by CSS custom properties in <style>)
  colors: {
    obsidian: "#0A0B10", // 60% Main
    electricBlue: "#2D5BFF", // 30% Accent
    acidLime: "#CCFF00", // 10% CTA / Focus
    offWhite: "#F3F4F6", // Primary Text
    darkSurface: "#12141F",
    cardSurface: "#181A2A"
  },

  categories: [
    { id: 'all', name: 'All Work' },
    { id: 'photoshop', name: 'Photoshop & Design' },
    { id: 'illustrator', name: 'Vector & Illustrator' },
    { id: 'aftereffects', name: 'After Effects & Motion' },
    { id: 'premiere', name: 'Premiere & Video' },
    { id: 'comfyui', name: 'ComfyUI & AI Art' },
    { id: 'krita', name: 'Krita & 2D Anim' },
    { id: 'painting', name: 'Digital Painting' }
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'NEO-TOKYO CYBER BLOB',
      category: 'aftereffects',
      categoryLabel: 'After Effects & Motion',
      software: ['After Effects', 'Illustrator', 'Krita'],
      year: '2026',
      featured: true,
      description: 'Fluid 2D character animation exploring futuristic character physics and vibrant color dynamics in motion.',
      coverSvgType: 'blob-character',
      videoDuration: '0:14',
      fps: '60 FPS',
      renderTime: '1h 12m',
      client: 'Self-Directed Experiment',
      details: 'Created with vector shape layers and customized rigid-body spring dynamics. Features organic blob morphing and custom expression loops.'
    },
    {
      id: 'proj-2',
      title: 'SYNTHETIC DREAMS VOL. 04',
      category: 'comfyui',
      categoryLabel: 'ComfyUI & AI Art',
      software: ['ComfyUI', 'Photoshop', 'Krita'],
      year: '2026',
      featured: true,
      description: 'AI-assisted procedural visual artwork guided by custom ControlNet vector sketches and manual paint overlays.',
      coverSvgType: 'ai-matrix',
      videoDuration: '0:22',
      fps: '30 FPS',
      renderTime: '45m',
      client: 'Creative Exploration',
      details: 'A hybrid workflow combining custom hand-drawn character silhouettes with node-based generative latent diffusion synthesis.'
    },
    {
      id: 'proj-3',
      title: 'ACID BOT KINETIC SYSTEM',
      category: 'illustrator',
      categoryLabel: 'Vector & Illustrator',
      software: ['Illustrator', 'Photoshop'],
      year: '2025',
      featured: true,
      description: 'Minimalist 2D character system created entirely from geometric primitives, flat gradients, and high-contrast lines.',
      coverSvgType: 'vector-robot',
      videoDuration: 'Static',
      fps: 'Vector',
      renderTime: 'Instant',
      client: 'Brand Identity Concept',
      details: 'Built with strict geometric grid systems in Illustrator. Features scalable vector components and interchangeable expression kits.'
    },
    {
      id: 'proj-4',
      title: 'KINETIC TYPO DISRUPT',
      category: 'aftereffects',
      categoryLabel: 'After Effects & Motion',
      software: ['After Effects', 'Premiere Pro'],
      year: '2025',
      featured: false,
      description: 'Expressive editorial motion design experiment exploring rhythmic typography synchronized to electronic beats.',
      coverSvgType: 'kinetic-typo',
      videoDuration: '0:30',
      fps: '60 FPS',
      renderTime: '2h 05m',
      client: 'Motion Branding Test',
      details: 'Custom text animators combined with frame-by-frame glitch accents and custom offset audio timing.'
    },
    {
      id: 'proj-5',
      title: 'LO-FI CELESTIAL ODYSSEY',
      category: 'krita',
      categoryLabel: 'Krita & 2D Anim',
      software: ['Krita', 'After Effects'],
      year: '2025',
      featured: false,
      description: 'Hand-drawn frame-by-frame 2D animation sequence featuring cute stars, floating planets, and cosmic critters.',
      coverSvgType: 'celestial-2d',
      videoDuration: '0:18',
      fps: '24 FPS',
      renderTime: '3h 40m',
      client: 'Personal Narrative',
      details: 'Animated entirely on ones and twos in Krita, using custom textured brushes and final composite glow in After Effects.'
    },
    {
      id: 'proj-6',
      title: 'ELECTRIC HORIZON TRAILER',
      category: 'premiere',
      categoryLabel: 'Premiere & Video',
      software: ['Premiere Pro', 'After Effects', 'Photoshop'],
      year: '2025',
      featured: false,
      description: 'High-energy fast-paced promo video edit featuring sound design integration, visual rhythm matching, and color grading.',
      coverSvgType: 'video-timeline',
      videoDuration: '0:45',
      fps: '60 FPS',
      renderTime: '1h 50m',
      client: 'Showcase Reel',
      details: 'Precision beat-matched edit featuring custom graphic overlays, speed ramping, and spatial audio mastering.'
    },
    {
      id: 'proj-7',
      title: 'OBSIDIAN ECHO CANVAS',
      category: 'painting',
      categoryLabel: 'Digital Painting',
      software: ['Krita', 'Photoshop'],
      year: '2026',
      featured: false,
      description: 'Atmospheric dark digital painting blending flat graphic shapes with subtle painterly textures and moody focal lighting.',
      coverSvgType: 'digital-paint',
      videoDuration: 'Static',
      fps: 'Raster HD',
      renderTime: 'N/A',
      client: 'Gallery Submission',
      details: 'High-resolution digital illustration rendered with custom edge brushes, focusing on values and atmospheric depth.'
    },
    {
      id: 'proj-8',
      title: 'SURREAL GRAPHIC POSTERS',
      category: 'photoshop',
      categoryLabel: 'Photoshop & Design',
      software: ['Photoshop', 'Illustrator'],
      year: '2025',
      featured: false,
      description: 'Series of bold editorial posters inspired by Swiss visual design and modern Tokyo neon graphic design aesthetics.',
      coverSvgType: 'poster-art',
      videoDuration: 'Static',
      fps: 'Raster HD',
      renderTime: 'N/A',
      client: 'Poster Series',
      details: 'Experimental poster layout series exploring negative space, oversized typography, and duotone photo manipulation.'
    }
  ],

  showreel: {
    title: "MIDNIGHT MOTION SHOWREEL 2026",
    subtitle: "A curated 60fps compilation of motion graphics, 2D character animation, kinetic typography, and visual experiments.",
    stats: [
      { label: "FRAME RATE", value: "60 FPS ULTRA" },
      { label: "COMPOSITING", value: "AFTER EFFECTS" },
      { label: "CHARACTER RIGS", value: "FLAT 2D VECTOR" },
      { label: "AUDIO SYNC", value: "SAMPLE-ACCURATE" }
    ]
  },

  skills: [
    { name: "After Effects & Motion Design", level: 92, category: "Motion", icon: "Film" },
    { name: "Illustrator & Vector Art", level: 95, category: "Design", icon: "PenTool" },
    { name: "Photoshop & Graphic Design", level: 90, category: "Design", icon: "Palette" },
    { name: "Premiere Pro & Video Editing", level: 85, category: "Video", icon: "Film" },
    { name: "ComfyUI & AI Workflows", level: 82, category: "AI Art", icon: "Cpu" },
    { name: "Krita & 2D Frame Animation", level: 88, category: "Animation", icon: "Sparkles" },
    { name: "Digital Painting & Storyboarding", level: 84, category: "Art", icon: "Palette" }
  ],

  studioStats: [
    { value: "100%", label: "Vector Precision" },
    { value: "60FPS", label: "Smooth Motion" },
    { value: "7+", label: "Creative Tools" },
    { value: "24/7", label: "Creative Passion" }
  ]
};

export default function App() {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState('work');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mouse tracker for mascot interactivity
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track cursor relative to window
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalized coordinates (-1 to 1)
    const nx = (clientX / innerWidth) * 2 - 1;
    const ny = (clientY / innerHeight) * 2 - 1;
    setMousePos({ x: nx, y: ny });
  };

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return PORTFOLIO_DATA.projects;
    return PORTFOLIO_DATA.projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div 
      className="min-h-screen bg-[#0A0B10] text-[#F3F4F6] font-montserrat selection:bg-[#CCFF00] selection:text-[#0A0B10] relative overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Style Injection for Strict Brand Colors */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        
        :root {
          --color-obsidian: ${PORTFOLIO_DATA.colors.obsidian};
          --color-electric: ${PORTFOLIO_DATA.colors.electricBlue};
          --color-acid: ${PORTFOLIO_DATA.colors.acidLime};
          --color-offwhite: ${PORTFOLIO_DATA.colors.offWhite};
          --color-dark-surface: ${PORTFOLIO_DATA.colors.darkSurface};
          --color-card-surface: ${PORTFOLIO_DATA.colors.cardSurface};
        }

        body {
          font-family: 'Montserrat', sans-serif;
          background-color: var(--color-obsidian);
          color: var(--color-offwhite);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0A0B10;
        }
        ::-webkit-scrollbar-thumb {
          background: #2D5BFF;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #CCFF00;
        }

        /* Pulse glow animations */
        @keyframes subtleGlow {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(45, 91, 255, 0.4)); }
          50% { filter: drop-shadow(0 0 22px rgba(204, 255, 0, 0.6)); }
        }

        .animate-glow {
          animation: subtleGlow 4s infinite ease-in-out;
        }

        /* Smooth blob morphing */
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-15px) rotate(5deg) scale(1.03); }
        }

        .animate-float-blob {
          animation: floatBlob 6s infinite ease-in-out;
        }

        .clip-slant {
          clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
        }
      `}</style>

      {/* FIXED NAVIGATION HEADER */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#0A0B10]/90 backdrop-blur-md border-b border-[#2D5BFF]/20 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with Animated Mascot */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#2D5BFF] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform border border-[#CCFF00]/40">
              <CuteMascotLogo mousePos={mousePos} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-white flex items-center gap-1.5">
                MIDNIGHT <span className="text-[#CCFF00]">MOTION</span>
              </span>
              <span className="text-[9px] tracking-widest text-[#2D5BFF] uppercase font-bold">Creative Studio</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 bg-[#12141F]/80 px-6 py-2.5 rounded-full border border-[#2D5BFF]/30 backdrop-blur-sm">
            {[
              { id: 'work', label: 'WORK' },
              { id: 'showreel', label: 'SHOWREEL' },
              { id: 'playground', label: 'PLAYGROUND' },
              { id: 'skills', label: 'SKILLS' },
              { id: 'about', label: 'ABOUT' },
              { id: 'contact', label: 'CONTACT' }
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setActiveTab(link.id)}
                className={`text-xs font-semibold tracking-wider transition-colors relative py-1 ${activeTab === link.id ? 'text-[#CCFF00]' : 'text-gray-300 hover:text-white'}`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CCFF00] rounded-full animate-pulse" />
                )}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Easy Edit Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditorOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#2D5BFF]/20 hover:bg-[#2D5BFF]/40 border border-[#2D5BFF] text-[#F3F4F6] text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
              title="Easy Editing Guide & JSON Config"
            >
              <Sliders size={14} className="text-[#CCFF00]" />
              <span className="hidden sm:inline">EASY EDIT GUIDE</span>
            </button>

            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-[#CCFF00] text-[#0A0B10] font-bold text-xs tracking-wider hover:bg-[#b8e600] transition-all hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              LET'S TALK
            </a>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-[#12141F] text-white border border-[#2D5BFF]/30"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Layers size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A0B10]/95 border-b border-[#2D5BFF]/30 px-6 py-6 flex flex-col gap-4 animate-fadeIn">
            {[
              { id: 'work', label: 'WORK' },
              { id: 'showreel', label: 'SHOWREEL' },
              { id: 'playground', label: 'PLAYGROUND' },
              { id: 'skills', label: 'SKILLS' },
              { id: 'about', label: 'ABOUT' },
              { id: 'contact', label: 'CONTACT' }
            ].map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-sm font-bold tracking-wider py-2 border-b border-white/5 ${activeTab === link.id ? 'text-[#CCFF00]' : 'text-gray-300'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden border-b border-[#2D5BFF]/20">
        {/* Background Grid & Electric Blue Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(#2D5BFF_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2D5BFF]/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141F] border border-[#2D5BFF]/40 text-[#CCFF00] text-xs font-semibold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
              <span>{PORTFOLIO_DATA.studio.availability}</span>
            </div>

            {/* Oversized Headline */}
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[0.95]">
              DESIGN THAT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5BFF] via-white to-[#CCFF00]">
                MOVES YOU.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-normal leading-relaxed pt-2">
              {PORTFOLIO_DATA.studio.subheadline}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <a
                href="#work"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#CCFF00] text-[#0A0B10] font-extrabold text-sm tracking-wider hover:bg-[#b8e600] transition-all hover:shadow-[0_0_30px_rgba(204,255,0,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <span>EXPLORE MY WORK</span>
                <ChevronRight size={18} />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#12141F] hover:bg-[#181A2A] border-2 border-[#2D5BFF] text-white font-bold text-sm tracking-wider transition-all hover:border-[#CCFF00] flex items-center justify-center gap-2"
              >
                <span>LET'S CONNECT</span>
                <ArrowUpRight size={18} className="text-[#CCFF00]" />
              </a>
            </div>

            {/* Dynamic Studio Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 w-full border-t border-white/10 mt-6">
              {PORTFOLIO_DATA.studioStats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#CCFF00]">{stat.value}</span>
                  <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Cute Interactive 2D Vector Hero Artwork */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <HeroInteractiveVector mousePos={mousePos} />
          </div>

        </div>
      </section>

      {/* PORTFOLIO GRID SECTION */}
      <section id="work" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[#2D5BFF] font-bold text-xs tracking-widest uppercase mb-2">
              <Sparkles size={14} className="text-[#CCFF00]" />
              <span>SELECTED PROJECTS & EXPERIMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              CREATIVE <span className="text-[#CCFF00]">PORTFOLIO</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 max-w-xl">
            {PORTFOLIO_DATA.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#CCFF00] text-[#0A0B10] shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                    : 'bg-[#12141F] text-gray-300 hover:text-white hover:bg-[#181A2A] border border-[#2D5BFF]/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-[#12141F] rounded-2xl overflow-hidden border border-[#2D5BFF]/20 hover:border-[#CCFF00] transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col shadow-xl relative"
            >
              {/* Card Cover Visual Component */}
              <div className="h-64 bg-[#0A0B10] relative overflow-hidden flex items-center justify-center p-6 border-b border-white/5">
                <ProjectCoverArtwork type={project.coverSvgType} title={project.title} />

                {/* Top Badge: Category */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-[#0A0B10]/80 backdrop-blur-md text-[#CCFF00] border border-[#CCFF00]/30 text-[10px] font-bold tracking-wider uppercase">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Top Right Badge: Duration or Format */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2 py-0.5 rounded bg-[#2D5BFF]/80 backdrop-blur-md text-white text-[10px] font-mono">
                    {project.videoDuration}
                  </span>
                </div>

                {/* Hover Play/Expand Overlay */}
                <div className="absolute inset-0 bg-[#2D5BFF]/30 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#CCFF00] text-[#0A0B10] flex items-center justify-center font-bold shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye size={24} />
                  </div>
                </div>
              </div>

              {/* Card Content Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono">
                    <span>{project.year}</span>
                    <span>{project.fps}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#CCFF00] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 font-normal line-clamp-2 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Software tags */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                  {project.software.map((sw, i) => (
                    <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#181A2A] text-gray-300 border border-white/5">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-[#12141F] rounded-2xl border border-dashed border-gray-700">
            <p className="text-gray-400">No projects found in this category.</p>
          </div>
        )}

      </section>

      {/* MOTION SHOWREEL SECTION */}
      <section id="showreel" className="py-24 bg-[#0A0B10] border-b border-[#2D5BFF]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-[#2D5BFF]/20 text-[#CCFF00] text-xs font-bold tracking-widest uppercase border border-[#2D5BFF]/40 inline-block mb-3">
              CINEMATIC MOTION SHOWREEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              2026 MOTION <span className="text-[#2D5BFF]">SHOWCASE</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-4">
              {PORTFOLIO_DATA.showreel.subtitle}
            </p>
          </div>

          {/* Interactive Custom Motion Player */}
          <MotionShowreelPlayer showreelData={PORTFOLIO_DATA.showreel} />

        </div>
      </section>

      {/* INTERACTIVE CUTE SHAPE PLAYGROUND */}
      <section id="playground" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[#CCFF00] font-bold text-xs tracking-widest uppercase mb-2">
              <Smile size={16} />
              <span>INTERACTIVE CANVAS EXPERIMENT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              CUTE SHAPE <span className="text-[#2D5BFF]">PLAYGROUND</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md">
            Click anywhere on the canvas to spawn cute geometric characters. Drag them around, change expressions, and experiment with fluid 2D physics!
          </p>
        </div>

        {/* Interactive Sandbox Canvas */}
        <InteractiveShapePlayground />
      </section>

      {/* SKILLS & SOFTWARE MATRIX */}
      <section id="skills" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5">
            <span className="text-[#2D5BFF] font-bold text-xs tracking-widest uppercase">DISCIPLINARY STACK</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-2 mb-6">
              SOFTWARE & <br /><span className="text-[#CCFF00]">TOOLKIT</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              A hybrid visual workflow combining traditional vector art precision, frame-by-frame character animation, advanced After Effects compositing, and cutting-edge ComfyUI AI synthesis.
            </p>

            <div className="p-6 rounded-2xl bg-[#12141F] border border-[#2D5BFF]/30 space-y-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Zap size={16} className="text-[#CCFF00]" />
                HYBRID WORKFLOW PHILOSOPHY
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every project leverages hand-crafted vector layouts and fluid frame dynamics, enhanced by algorithmic rendering tools when speed and experimental art direction require it.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {PORTFOLIO_DATA.skills.map((skill, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#12141F] border border-white/5 hover:border-[#2D5BFF]/40 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#CCFF00]">{skill.level}% PROFICIENCY</span>
                </div>
                <div className="w-full h-2.5 bg-[#0A0B10] rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#2D5BFF] to-[#CCFF00] rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2D5BFF]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="aspect-square rounded-3xl bg-[#12141F] border-2 border-[#2D5BFF]/40 p-8 relative overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(#2D5BFF_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
              <CuteMascotLogo mousePos={mousePos} isLarge={true} />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#CCFF00] font-bold text-xs tracking-widest uppercase">ABOUT MIDNIGHT MOTION</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              CRAFTING ART THAT <span className="text-[#2D5BFF]">RESONATES.</span>
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              I am an independent digital artist, creative developer, and motion designer. My work sits at the intersection of bold vector graphics, cute character design, fluid keyframe mechanics, and experimental digital art.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Whether keyframing custom typography, rigging 2D vector characters, or orchestrating AI-assisted visual pipelines, I focus on international-level art direction, minimal dark aesthetics, and delightful interactivity.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-[#2D5BFF] text-white font-bold text-xs tracking-wider hover:bg-[#2046d6] transition-all"
              >
                START A PROJECT
              </a>
              <button
                onClick={() => alert("Resume/Deck download triggered!")}
                className="px-6 py-3 rounded-xl bg-[#12141F] border border-white/20 text-white font-bold text-xs tracking-wider hover:bg-[#181A2A] flex items-center gap-2"
              >
                <Download size={14} className="text-[#CCFF00]" />
                DOWNLOAD CAPABILITIES DECK
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12141F] rounded-3xl border-2 border-[#2D5BFF]/30 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5BFF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#CCFF00] font-bold text-xs tracking-widest uppercase">LET'S WORK TOGETHER</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                LET'S MAKE SOMETHING <span className="text-[#2D5BFF]">BOLD.</span>
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Have an upcoming motion campaign, visual identity project, or creative experiment? Send a message and let's bring it to life.
              </p>

              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-gray-300 font-mono text-sm">
                  <Mail size={16} className="text-[#CCFF00]" />
                  <span>{PORTFOLIO_DATA.studio.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Compass size={16} className="text-[#2D5BFF]" />
                  <span>{PORTFOLIO_DATA.studio.location}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0A0B10] border-t border-[#2D5BFF]/20 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white tracking-wider">MIDNIGHT <span className="text-[#CCFF00]">MOTION</span></span>
            <span className="text-gray-600">|</span>
            <span>© 2026 All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a href={PORTFOLIO_DATA.studio.socials.behance} target="_blank" rel="noreferrer" className="hover:text-[#CCFF00] transition-colors">BEHANCE</a>
            <a href={PORTFOLIO_DATA.studio.socials.dribbble} target="_blank" rel="noreferrer" className="hover:text-[#CCFF00] transition-colors">DRIBBBLE</a>
            <a href={PORTFOLIO_DATA.studio.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[#CCFF00] transition-colors">INSTAGRAM</a>
            <a href={PORTFOLIO_DATA.studio.socials.vimeo} target="_blank" rel="noreferrer" className="hover:text-[#CCFF00] transition-colors">VIMEO</a>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* EASY EDITING & CONFIGURATION MODAL */}
      {isEditorOpen && (
        <EasyEditorModal
          portfolioData={PORTFOLIO_DATA}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 1: CUTE MASCOT LOGO & ARTWORK
   Interactive 2D vector character with expressive moving eyes
   ========================================================================== */

function CuteMascotLogo({ mousePos, isLarge = false }) {
  // Eye tracking offsets
  const eyeX = (mousePos?.x || 0) * (isLarge ? 8 : 4);
  const eyeY = (mousePos?.y || 0) * (isLarge ? 8 : 4);

  return (
    <div className={`relative ${isLarge ? 'w-64 h-64' : 'w-full h-full'} flex items-center justify-center`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]"
      >
        {/* Main Cute Blob Body */}
        <path
          d="M 50,100 C 40,40 160,40 150,100 C 160,160 40,160 50,100 Z"
          fill="#2D5BFF"
          stroke="#CCFF00"
          strokeWidth="6"
        />

        {/* Cute Ears/Horns */}
        <path d="M 60,55 L 45,25 L 75,45 Z" fill="#CCFF00" />
        <path d="M 140,55 L 155,25 L 125,45 Z" fill="#CCFF00" />

        {/* Outer Eye Sockets */}
        <circle cx="75" cy="90" r="18" fill="#0A0B10" />
        <circle cx="125" cy="90" r="18" fill="#0A0B10" />

        {/* Interactive Pupils following mouse */}
        <circle cx={75 + eyeX} cy={90 + eyeY} r="8" fill="#CCFF00" />
        <circle cx={125 + eyeX} cy={90 + eyeY} r="8" fill="#CCFF00" />

        {/* Eye Shine Highlights */}
        <circle cx={78 + eyeX} cy={87 + eyeY} r="3" fill="#FFFFFF" />
        <circle cx={128 + eyeX} cy={87 + eyeY} r="3" fill="#FFFFFF" />

        {/* Cheeks */}
        <ellipse cx="60" cy="112" rx="8" ry="5" fill="#FF5588" opacity="0.8" />
        <ellipse cx="140" cy="112" rx="8" ry="5" fill="#FF5588" opacity="0.8" />

        {/* Cute Smile */}
        <path
          d="M 85,115 Q 100,130 115,115"
          fill="none"
          stroke="#F3F4F6"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 2: HERO INTERACTIVE VECTOR ARTWORK
   Asymmetric vector visual with floating blobs, stars, and animated shapes
   ========================================================================== */

function HeroInteractiveVector({ mousePos }) {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
      {/* Outer Floating Decorative Elements */}
      <div className="absolute top-4 left-4 w-12 h-12 bg-[#CCFF00] rounded-xl rotate-12 animate-bounce opacity-80 flex items-center justify-center text-[#0A0B10] font-extrabold text-xs">
        2D
      </div>

      <div className="absolute bottom-10 left-8 w-16 h-16 rounded-full border-4 border-[#2D5BFF] animate-spin border-t-transparent pointer-events-none" style={{ animationDuration: '8s' }} />

      <div className="absolute top-10 right-10 text-[#CCFF00] animate-pulse">
        <Star size={36} fill="#CCFF00" />
      </div>

      {/* Main Canvas Illustration */}
      <div className="w-full h-full rounded-3xl bg-[#12141F] border-2 border-[#2D5BFF]/40 p-6 shadow-[0_0_50px_rgba(45,91,255,0.25)] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#2D5BFF_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />

        {/* Center Mascot */}
        <div className="w-72 h-72 relative z-10 animate-float-blob">
          <CuteMascotLogo mousePos={mousePos} isLarge={true} />
        </div>

        {/* Floating Code/FPS Badges */}
        <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-lg bg-[#0A0B10]/90 border border-[#CCFF00]/40 text-[#CCFF00] text-[11px] font-mono font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
          <span>60 FPS VECTOR ENGINE</span>
        </div>

        <div className="absolute top-6 left-6 px-3 py-1.5 rounded-lg bg-[#2D5BFF] text-white text-[11px] font-bold tracking-wider">
          AFTER EFFECTS & KRA
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 3: DYNAMIC COVER ARTWORK GENERATOR
   Generates distinctive vector visuals for each portfolio project card
   ========================================================================== */

function ProjectCoverArtwork({ type, title }) {
  switch (type) {
    case 'blob-character':
      return (
        <svg viewBox="0 0 200 200" className="w-36 h-36">
          <circle cx="100" cy="100" r="70" fill="#2D5BFF" opacity="0.2" />
          <path d="M 60,100 Q 100,30 140,100 T 60,100 Z" fill="#2D5BFF" stroke="#CCFF00" strokeWidth="4" />
          <circle cx="85" cy="90" r="8" fill="#CCFF00" />
          <circle cx="115" cy="90" r="8" fill="#CCFF00" />
          <path d="M 85,115 Q 100,125 115,115" fill="none" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      );
    case 'ai-matrix':
      return (
        <svg viewBox="0 0 200 200" className="w-36 h-36">
          <rect x="30" y="30" width="140" height="140" rx="16" fill="#12141F" stroke="#2D5BFF" strokeWidth="3" />
          <line x1="30" y1="100" x2="170" y2="100" stroke="#CCFF00" strokeWidth="2" strokeDasharray="6,6" />
          <circle cx="100" cy="100" r="40" fill="none" stroke="#2D5BFF" strokeWidth="4" />
          <circle cx="100" cy="100" r="10" fill="#CCFF00" />
        </svg>
      );
    case 'vector-robot':
      return (
        <svg viewBox="0 0 200 200" className="w-36 h-36">
          <rect x="50" y="60" width="100" height="80" rx="12" fill="#2D5BFF" stroke="#CCFF00" strokeWidth="4" />
          <rect x="70" y="80" width="20" height="15" fill="#0A0B10" />
          <rect x="110" y="80" width="20" height="15" fill="#0A0B10" />
          <line x1="100" y1="20" x2="100" y2="60" stroke="#CCFF00" strokeWidth="4" />
          <circle cx="100" cy="20" r="8" fill="#CCFF00" />
        </svg>
      );
    case 'kinetic-typo':
      return (
        <div className="font-extrabold text-3xl text-center tracking-tighter text-[#CCFF00] leading-none select-none">
          MOVE<br />
          <span className="text-white">TYPE</span><br />
          <span className="text-[#2D5BFF]">2026</span>
        </div>
      );
    default:
      return (
        <svg viewBox="0 0 200 200" className="w-32 h-32">
          <polygon points="100,20 170,180 30,180" fill="#2D5BFF" opacity="0.6" stroke="#CCFF00" strokeWidth="4" />
          <circle cx="100" cy="110" r="25" fill="#CCFF00" />
        </svg>
      );
  }
}

/* ==========================================================================
   SUB-COMPONENT 4: MOTION SHOWREEL CUSTOM PLAYER
   Cinematic showcase with simulated playback scrubbers, stats & controls
   ========================================================================== */

function MotionShowreelPlayer({ showreelData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');

  // Toggle play animation loop simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#12141F] rounded-3xl border-2 border-[#2D5BFF]/40 overflow-hidden shadow-[0_0_60px_rgba(45,91,255,0.2)]">
      {/* Video Screen Area */}
      <div className="relative aspect-video bg-[#0A0B10] flex items-center justify-center overflow-hidden group">
        
        {/* Animated Visual Canvas Graphic inside Player */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-[#2D5BFF]/20 blur-2xl animate-pulse" />
          <div className="relative z-10 text-center space-y-4">
            <div className="w-28 h-28 mx-auto rounded-full bg-[#2D5BFF] border-4 border-[#CCFF00] flex items-center justify-center shadow-2xl">
              <Film size={48} className="text-[#CCFF00] animate-bounce" />
            </div>
            <div className="font-mono text-xs font-bold text-[#CCFF00] tracking-widest uppercase">
              {isPlaying ? 'PLAYING SHOWREEL @ 60 FPS' : 'SHOWREEL PAUSED'}
            </div>
          </div>
        </div>

        {/* Overlay Play Button when paused */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute z-20 px-8 py-4 rounded-2xl bg-[#CCFF00] text-[#0A0B10] font-extrabold text-sm tracking-wider flex items-center gap-3 shadow-[0_0_30px_rgba(204,255,0,0.6)] hover:scale-105 transition-transform"
          >
            <Play size={20} fill="#0A0B10" />
            <span>PLAY SHOWREEL</span>
          </button>
        )}

        {/* Top Player Watermark */}
        <div className="absolute top-4 left-4 z-10 font-mono text-[11px] text-gray-400 bg-[#0A0B10]/80 px-3 py-1 rounded-md border border-white/10">
          MIDNIGHT_SHOWREEL_2026.MP4
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 sm:p-6 bg-[#0A0B10] border-t border-[#2D5BFF]/30 space-y-4">
        
        {/* Scrub Bar */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-gray-400">00:{(Math.floor(progress * 0.45)).toString().padStart(2, '0')}</span>
          <div
            className="flex-1 h-2 bg-[#12141F] rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(pct);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#2D5BFF] to-[#CCFF00] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-mono text-xs text-gray-400">00:45</span>
        </div>

        {/* Playback Buttons & Speed Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl bg-[#2D5BFF] text-white hover:bg-[#CCFF00] hover:text-[#0A0B10] transition-colors"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={() => setProgress(0)}
              className="p-2.5 rounded-xl bg-[#12141F] text-gray-300 hover:text-white border border-white/10"
              title="Reset"
            >
              <RotateCcw size={18} />
            </button>

            <div className="flex items-center gap-1 bg-[#12141F] px-2 py-1 rounded-lg border border-white/10">
              {['0.5x', '1.0x', '1.5x'].map(spd => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${playbackSpeed === spd ? 'bg-[#CCFF00] text-[#0A0B10]' : 'text-gray-400 hover:text-white'}`}
                >
                  {spd}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="hidden md:flex items-center gap-6 font-mono text-[11px] text-gray-400">
            {showreelData.stats.map((st, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-[#CCFF00] font-bold">{st.label}:</span>
                <span className="text-white">{st.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 5: INTERACTIVE CUTE SHAPE PLAYGROUND
   HTML5 Canvas sandbox where users spawn, drag, & express cute vector shapes
   ========================================================================== */

function InteractiveShapePlayground() {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([
    { id: 1, x: 150, y: 150, radius: 40, color: '#2D5BFF', expression: 'happy', label: 'BLOBBY' },
    { id: 2, x: 350, y: 200, radius: 45, color: '#CCFF00', expression: 'wink', label: 'LIME STAR' },
    { id: 3, x: 550, y: 160, radius: 35, color: '#FF5588', expression: 'surprised', label: 'PINKY' }
  ]);
  const [selectedColor, setSelectedColor] = useState('#2D5BFF');
  const [activeExpression, setActiveExpression] = useState('happy');

  // Spawn new shape on user canvas click
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newShape = {
      id: Date.now(),
      x,
      y,
      radius: Math.floor(Math.random() * 20) + 35,
      color: selectedColor,
      expression: activeExpression,
      label: `SHAPE ${shapes.length + 1}`
    };

    setShapes(prev => [...prev, newShape]);
  };

  // Render shapes to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize canvas
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = 360;

    // Clear background
    ctx.fillStyle = '#0A0B10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(45, 91, 255, 0.15)';
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

    // Render each cute shape
    shapes.forEach(shape => {
      ctx.save();
      ctx.translate(shape.x, shape.y);

      // Body Circle
      ctx.fillStyle = shape.color;
      ctx.beginPath();
      ctx.arc(0, 0, shape.radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer Stroke
      ctx.strokeStyle = '#F3F4F6';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#0A0B10';
      ctx.beginPath();
      ctx.arc(-shape.radius * 0.3, -shape.radius * 0.1, 5, 0, Math.PI * 2);
      ctx.arc(shape.radius * 0.3, -shape.radius * 0.1, 5, 0, Math.PI * 2);
      ctx.fill();

      // Mouth according to expression
      ctx.strokeStyle = '#0A0B10';
      ctx.lineWidth = 3;
      ctx.beginPath();
      if (shape.expression === 'happy') {
        ctx.arc(0, shape.radius * 0.1, 10, 0, Math.PI);
      } else if (shape.expression === 'surprised') {
        ctx.arc(0, shape.radius * 0.2, 6, 0, Math.PI * 2);
      } else {
        ctx.moveTo(-8, shape.radius * 0.2);
        ctx.lineTo(8, shape.radius * 0.2);
      }
      ctx.stroke();

      ctx.restore();
    });
  }, [shapes, selectedColor, activeExpression]);

  return (
    <div className="bg-[#12141F] rounded-3xl border-2 border-[#2D5BFF]/30 p-6 space-y-6">
      
      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0A0B10] p-4 rounded-2xl border border-white/5">
        
        {/* Color Palette Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400">SELECT COLOR:</span>
          {['#2D5BFF', '#CCFF00', '#FF5588', '#00E5FF', '#F3F4F6'].map(col => (
            <button
              key={col}
              onClick={() => setSelectedColor(col)}
              className={`w-7 h-7 rounded-full transition-transform ${selectedColor === col ? 'scale-125 ring-2 ring-white' : 'hover:scale-110'}`}
              style={{ backgroundColor: col }}
            />
          ))}
        </div>

        {/* Expression Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-400">EXPRESSION:</span>
          {['happy', 'surprised', 'wink'].map(exp => (
            <button
              key={exp}
              onClick={() => setActiveExpression(exp)}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-colors ${activeExpression === exp ? 'bg-[#CCFF00] text-[#0A0B10]' : 'bg-[#181A2A] text-gray-300'}`}
            >
              {exp}
            </button>
          ))}
        </div>

        {/* Clear Canvas */}
        <button
          onClick={() => setShapes([])}
          className="px-3.5 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/30 border border-red-500/30"
        >
          CLEAR CANVAS
        </button>
      </div>

      {/* Canvas Element */}
      <div className="relative rounded-2xl overflow-hidden border border-[#2D5BFF]/40 cursor-crosshair">
        <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full block" />
        <div className="absolute bottom-3 right-3 bg-[#0A0B10]/80 px-3 py-1 rounded-md text-[10px] font-mono text-gray-400 border border-white/10">
          TOTAL SHAPES: {shapes.length} | CLICK CANVAS TO SPAWN
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 6: CONTACT FORM WITH INSTANT PREVIEW
   ========================================================================== */

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', budget: '$1k - $3k', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#0A0B10] p-8 rounded-2xl border border-[#CCFF00]/40 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#CCFF00] text-[#0A0B10] flex items-center justify-center mx-auto">
          <Check size={28} />
        </div>
        <h3 className="text-2xl font-bold text-white">PROJECT INQUIRY RECEIVED!</h3>
        <p className="text-sm text-gray-300">
          Thank you <span className="text-[#CCFF00] font-bold">{formData.name}</span>. We will review your brief and respond to <span className="text-white font-mono">{formData.email}</span> within 24 hours.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 rounded-xl bg-[#2D5BFF] text-white text-xs font-bold"
        >
          SEND ANOTHER BRIEF
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">YOUR NAME</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Alex Rivera"
            className="w-full px-4 py-3 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#CCFF00] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">EMAIL ADDRESS</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="alex@studio.com"
            className="w-full px-4 py-3 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#CCFF00] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1">ESTIMATED BUDGET RANGE</label>
        <select
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#CCFF00] focus:outline-none"
        >
          <option value="Under $1k">Under $1,000 USD</option>
          <option value="$1k - $3k">$1,000 – $3,000 USD</option>
          <option value="$3k - $10k">$3,000 – $10,000 USD</option>
          <option value="$10k+">$10,000+ USD</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1">PROJECT DETAILS / BRIEF</label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Tell us about your visual goals, motion graphic needs, or timeline..."
          className="w-full px-4 py-3 rounded-xl bg-[#0A0B10] border border-white/10 text-white text-sm focus:border-[#CCFF00] focus:outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-[#CCFF00] text-[#0A0B10] font-extrabold text-sm tracking-wider hover:bg-[#b8e600] transition-all shadow-[0_0_20px_rgba(204,255,0,0.3)]"
      >
        SEND PROJECT BRIEF
      </button>
    </form>
  );
}

/* ==========================================================================
   SUB-COMPONENT 7: PROJECT DETAIL MODAL
   ========================================================================== */

function ProjectDetailModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0B10]/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12141F] border-2 border-[#2D5BFF] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#0A0B10] text-gray-400 hover:text-white border border-white/10"
        >
          <X size={20} />
        </button>

        {/* Modal Visual Area */}
        <div className="h-64 bg-[#0A0B10] rounded-2xl flex items-center justify-center relative overflow-hidden mb-6 border border-white/10">
          <ProjectCoverArtwork type={project.coverSvgType} title={project.title} />
        </div>

        {/* Project Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-[#2D5BFF] text-white text-xs font-bold uppercase">
              {project.categoryLabel}
            </span>
            <span className="font-mono text-xs text-[#CCFF00]">{project.year}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">{project.title}</h2>
          <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>

          <div className="p-4 rounded-xl bg-[#0A0B10] border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider">CREATIVE BREAKDOWN</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{project.details}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-[#0A0B10] border border-white/5">
              <span className="block text-[10px] text-gray-500 font-bold">CLIENT</span>
              <span className="text-xs text-white font-semibold">{project.client}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0A0B10] border border-white/5">
              <span className="block text-[10px] text-gray-500 font-bold">FRAME RATE</span>
              <span className="text-xs text-[#CCFF00] font-mono">{project.fps}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0A0B10] border border-white/5">
              <span className="block text-[10px] text-gray-500 font-bold">DURATION</span>
              <span className="text-xs text-white font-mono">{project.videoDuration}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0A0B10] border border-white/5">
              <span className="block text-[10px] text-gray-500 font-bold">RENDER TIME</span>
              <span className="text-xs text-white font-mono">{project.renderTime}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ==========================================================================
   SUB-COMPONENT 8: EASY EDITING & CONFIGURATION GUIDE MODAL
   Allows client/visual artist to review and copy the exact JSON config structure
   ========================================================================== */

function EasyEditorModal({ portfolioData, onClose }) {
  const [copied, setCopied] = useState(false);

  
    navigator.clipboard.writeText(JSON.stringify(portfolioData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0B10]/95 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#12141F] border-2 border-[#CCFF00] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Sliders className="text-[#CCFF00]" size={24} />
            <div>
              <h2 className="text-xl font-extrabold text-white">EASY CONTENT EDITING SYSTEM</h2>
              <p className="text-xs text-gray-400">Zero-code rebuild required! Update text, projects, and colors directly in `PORTFOLIO_DATA`.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-[#0A0B10] text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#0A0B10] border border-[#2D5BFF]/30 space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#2D5BFF] text-white text-xs font-bold flex items-center justify-center">1</span>
            <h4 className="text-xs font-bold text-white">LOCATE CONFIG OBJECT</h4>
            <p className="text-[11px] text-gray-400">Open <code className="text-[#CCFF00]">App.jsx</code> and find the <code className="text-[#CCFF00]">PORTFOLIO_DATA</code> constant at the top.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B10] border border-[#2D5BFF]/30 space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#2D5BFF] text-white text-xs font-bold flex items-center justify-center">2</span>
            <h4 className="text-xs font-bold text-white">MODIFY PROJECTS & TEXT</h4>
            <p className="text-[11px] text-gray-400">Add or edit projects inside the <code className="text-[#CCFF00]">projects: [...]</code> array. Update titles, software tags, and categories easily.</p>
          </div>

          <div className="p-4 rounded-xl bg-[#0A0B10] border border-[#2D5BFF]/30 space-y-2">
            <span className="w-6 h-6 rounded-full bg-[#2D5BFF] text-white text-xs font-bold flex items-center justify-center">3</span>
            <h4 className="text-xs font-bold text-white">CUSTOMIZE COLORS</h4>
            <p className="text-[11px] text-gray-400">Change hex values inside <code className="text-[#CCFF00]">colors</code> to instantly adapt the entire studio color palette.</p>
          </div>
        </div>

        {/* JSON Preview Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#CCFF00] font-mono">LIVE CENTRAL CONFIGURATION DATA (JSON)</span>
            <button
              onClick={handleCopyConfig}
              className="px-3 py-1 rounded bg-[#2D5BFF] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#2046d6]"
            >
              {copied ? <Check size={14} /> : <Code2 size={14} />}
              <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY CONFIG JSON'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-[#0A0B10] text-[#CCFF00] text-xs font-mono max-h-72 overflow-y-auto border border-white/10 leading-relaxed">
            {JSON.stringify(portfolioData, null, 2)}
          </pre>
        </div>

      </div>
    </div>
  );
}


export default App;
