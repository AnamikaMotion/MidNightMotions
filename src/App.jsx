import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, Film, 
  Layers, Palette, Gamepad2, Send, X, 
  CheckCircle2, ChevronRight, RefreshCw, Trophy, 
  Zap, Clapperboard, Menu, Video, Wand2
} from 'lucide-react';

// --- INITIAL PORTFOLIO DATA (STRICTLY 2D, VFX, LOGO & TITLE MOTION) ---
const PORTFOLIO_PROJECTS = [
  {
    id: 'fluid-shape-morph',
    title: 'Liquid Dynamic Typography',
    category: '2D Motion',
    software: ['After Effects', 'Illustrator'],
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    duration: '00:08 min',
    fps: '60 FPS',
    renderTime: '1.5 hrs',
    client: 'Vogue Motion Studio',
    description: 'Smooth liquid shape-morphic kinetic typography title sequence for a luxury brand reveal. Built using vector shape layers, custom speed graphs, and wave distort expressions.',
    breakdown: [
      'Custom path keyframing with fine-tuned speed graph curves',
      'Overlapping liquid wave dynamics via AE Wave Warp & Turbulence',
      'Vector asset preparation in Adobe Illustrator with clean layer grouping'
    ]
  },
  {
    id: 'neon-logo-reveal',
    title: 'Cyber Neon Logo Reveal',
    category: 'Logo Motion',
    software: ['After Effects', 'Photoshop'],
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    duration: '00:06 min',
    fps: '60 FPS',
    renderTime: '1 hr',
    client: 'Pulse Gaming Studio',
    description: 'Electric neon stroke animation with reactive sound waves and glowing flare overlays. Features frame-by-frame electrical spark accents.',
    breakdown: [
      'Trim Paths and stroke offset expressions for circuit wiring',
      'Audio amplitude keyframe conversion for bass-synced glows',
      'Hand-drawn 2D electric spark overlays in Photoshop'
    ]
  },
  {
    id: 'quantum-vfx-composite',
    title: 'Quantum Portal VFX Sequence',
    category: 'VFX & Compositing',
    software: ['After Effects', 'Premiere Pro'],
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    duration: '00:22 min',
    fps: '30 FPS',
    renderTime: '4 hrs',
    client: 'SciFi Realm Channel',
    description: 'Live-action footage composite integrated with 2D particle energy rings, heat distortion ripples, and planar tracking visual effects.',
    breakdown: [
      '2D Planar Motion Tracking for seamless energy ring attachment',
      'Custom particle vortex simulation using Trapcode Particular',
      'Color pass blending and realistic lens bloom in AE'
    ]
  },
  {
    id: 'cosmic-title-intro',
    title: 'Cosmic Odyssey Title Sequence',
    category: 'Title Sequences',
    software: ['After Effects', 'Premiere Pro'],
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
    duration: '00:45 min',
    fps: '24 FPS',
    renderTime: '2 hrs',
    client: 'Nebula Filmworks',
    description: 'Cinematic film intro title sequence featuring deep space particle fog, optical lens flares, and rhythm-synced typography.',
    breakdown: [
      'Optical flare engines combined with chromatic lens refraction',
      'Typography pacing locked to music stems using beat markers',
      'Final master assembly and color grading in Premiere Pro'
    ]
  },
  {
    id: 'holo-ui-hud',
    title: 'Futuristic HUD UI Interface',
    category: 'VFX & Compositing',
    software: ['After Effects', 'Illustrator'],
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    duration: '00:18 min',
    fps: '60 FPS',
    renderTime: '2.5 hrs',
    client: 'AeroSpace Next',
    description: 'Complex Sci-Fi Heads-Up Display (HUD) interface motion showcasing telemetry rings, digital readouts, and holographic wave meters.',
    breakdown: [
      'Modular vector assets constructed in Illustrator',
      'Nested AE pre-comps driven by slider control expressions',
      'CRT scanline, subtle chromatic aberration, and glow pass'
    ]
  },
  {
    id: 'lottie-app-onboarding',
    title: 'Lottie Micro-Interactions',
    category: '2D Motion',
    software: ['After Effects', 'Illustrator'],
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    duration: '00:05 min',
    fps: '60 FPS',
    renderTime: '0.5 hrs',
    client: 'Fintech Mobile App',
    description: 'Lightweight Lottie SVG vector animations for mobile onboarding, featuring smooth icon morphing, checkmark bounces, and progress loaders.',
    breakdown: [
      'Clean vector stroke rigging compatible with Bodymovin plugin',
      'Optimized shape math for lightweight JSON file exports',
      'Interactive state previews for mobile developer handoff'
    ]
  }
];

// --- SOFTWARE HUB DATA (STRICTLY 2D PIPELINE) ---
const SOFTWARE_DATA = {
  ae: {
    id: 'ae',
    name: 'Adobe After Effects',
    role: '2D Motion Design, Lottie & Compositing Core',
    icon: Sparkles,
    color: 'from-purple-600 to-indigo-600',
    accentColor: '#A855F7',
    experience: '5+ Years Active Mastery',
    highlights: [
      'Complex Keyframe Velocity Graphing & Ease Curves',
      'Expression Scripting (Looping, Wiggle, Index Offset)',
      '2D Character Rigging (Duct, Duik Bassel, RubberHose)',
      'Lottie JSON Vector Motion Exporting (Bodymovin)'
    ],
    description: 'After Effects is my main motion design powerhouse where vector artwork comes alive. From sleek UI Lottie animations to complex kinetic typography and VFX compositing, I leverage deep expression scripting and keyframe precision.'
  },
  premiere: {
    id: 'premiere',
    name: 'Adobe Premiere Pro',
    role: 'Cinematic Video Assembly & Sound Design',
    icon: Film,
    color: 'from-violet-600 to-fuchsia-600',
    accentColor: '#D946EF',
    experience: '5 Years Video Assembly',
    highlights: [
      'Rhythmic Audio Beat Syncing & Sound FX Mixdown',
      'Lumetri Color Wheels & Cinematic LUT Grading',
      'Multi-track Cutting & Smooth Speed Ramping',
      'Broadcast-ready Codec Exports (H.264, ProRes, WebM)'
    ],
    description: 'Where motion graphics find their timing and audio beat. I use Premiere Pro for reel editing, sound design mixdowns, color grading passes, and polishing final video deliverables.'
  },
  illustrator: {
    id: 'illustrator',
    name: 'Adobe Illustrator',
    role: 'Vector Graphics & Motion Asset Preparation',
    icon: Palette,
    color: 'from-amber-500 to-orange-600',
    accentColor: '#F97316',
    experience: '6 Years Vector Craft',
    highlights: [
      'Clean Vector Layer Structuring for AE Import',
      'Custom Icon & Logo Vectorization',
      'Kinetic Typography Styleframes & Layout Systems',
      'Scalable SVG Path Preparation'
    ],
    description: 'Flawless 2D animation starts with organized vector design. I craft clean, scalable vector styleframes in Illustrator, structuring layers perfectly for instant After Effects rigging.'
  },
  photoshop: {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    role: 'Frame-by-Frame Accents & Texture Design',
    icon: Wand2,
    color: 'from-cyan-500 to-blue-600',
    accentColor: '#06B6D4',
    experience: '6 Years Image Design',
    highlights: [
      'Frame-by-Frame Hand-Drawn Cell Accent Animation',
      'Matte Background Compositing & Plate Cleanup',
      'High-Resolution Texture Map Creation',
      'Color Storyboarding & Styleframe Prep'
    ],
    description: 'Essential for frame-by-frame 2D accents and background matte prep. I use Photoshop to paint custom textures, clean background plates, and sketch cel animation overlays.'
  }
};

// --- MASCOT TRIVIA TIPS ---
const MASCOT_TRIVIA = [
  "Tip: Press F9 in After Effects to instantly apply Easy Ease to your selected keyframes!",
  "Hi! I'm Mochi, Anamika's 2D robotic companion! Move your mouse to see me look around!",
  "Did you know? Lottie JSON files keep mobile vector animations under 50KB for super quick app loading!",
  "Try playing the Snake Game below! Absorb glowing shapes to beat your high score!",
  "Speed Graph Pro-Tip: Pull keyframe handles close together for fast pop-ins with smooth deceleration!"
];

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'software', 'game'
  const [selectedSoftware, setSelectedSoftware] = useState('ae');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Showreel Player State
  const [isPlayingShowreel, setIsPlayingShowreel] = useState(false);
  const [isMutedShowreel, setIsMutedShowreel] = useState(true);

  // Mascot "Mochi" State
  const [mascotMood, setMascotMood] = useState('idle'); // 'idle', 'happy', 'amazed', 'gaming'
  const [mascotSpeech, setMascotSpeech] = useState("Hey! Welcome to Anamika's 2D Motion Design Studio!");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Tracking for Mascot Eyes
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Mascot Speech Rotation
  const triggerNewMascotTip = () => {
    const randomTip = MASCOT_TRIVIA[Math.floor(Math.random() * MASCOT_TRIVIA.length)];
    setMascotSpeech(randomTip);
    setMascotMood('happy');
    setTimeout(() => setMascotMood('idle'), 3000);
  };

  // Filter Projects
  const filteredProjects = filterCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* Background Motion Particle Canvas */}
      <MotionCanvasBg />

      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0B0F19]/80 border-b border-slate-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 p-[2px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-wider bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent block">
                ANAMIKA'S
              </span>
              <span className="text-xs font-semibold tracking-widest text-cyan-400 block -mt-1">
                MIDNIGHT MOTION
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
            <NavButton 
              active={activeTab === 'home'} 
              onClick={() => setActiveTab('home')}
              icon={<Clapperboard className="w-4 h-4" />}
              label="2D Showcase"
            />
            <NavButton 
              active={activeTab === 'software'} 
              onClick={() => setActiveTab('software')}
              icon={<Layers className="w-4 h-4" />}
              label="2D Toolstack"
            />
            <NavButton 
              active={activeTab === 'game'} 
              onClick={() => { setActiveTab('game'); setMascotMood('gaming'); }}
              icon={<Gamepad2 className="w-4 h-4" />}
              label="Arcade Game"
            />
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsContactOpen(true)}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-full group bg-gradient-to-br from-cyan-500 to-fuchsia-600 group-hover:from-cyan-500 group-hover:to-fuchsia-600 hover:text-white text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 transition-all"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-[#0B0F19] rounded-full group-hover:bg-opacity-0 flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white" />
                Let's Connect
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0F172A] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
            <button
              onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${activeTab === 'home' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-300'}`}
            >
              <Clapperboard className="w-5 h-5" /> 2D Showcase & Work
            </button>
            <button
              onClick={() => { setActiveTab('software'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${activeTab === 'software' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-300'}`}
            >
              <Layers className="w-5 h-5" /> 2D Software Toolstack
            </button>
            <button
              onClick={() => { setActiveTab('game'); setMascotMood('gaming'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium ${activeTab === 'game' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-300'}`}
            >
              <Gamepad2 className="w-5 h-5" /> Snake Arcade Game
            </button>
            <button
              onClick={() => { setIsContactOpen(true); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold"
            >
              <Send className="w-4 h-4" /> Get In Touch
            </button>
          </div>
        )}
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* TAB 1: HOME / 2D SHOWCASE */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            
            {/* Hero Section */}
            <section className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0B0F19] border border-slate-800 p-6 md:p-12 overflow-hidden shadow-2xl">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
                    <Sparkles className="w-3.5 h-3.5" /> 2D Motion Graphic Designer & VFX Artist
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                    Breathing Life into <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-500 bg-clip-text text-transparent">2D Motion & VFX</span>.
                  </h1>

                  <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
                    Welcome to my creative motion studio. I specialize in fluid 2D vector animation, logo reveals, kinetic typography title sequences, and VFX compositing using After Effects and Premiere Pro.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#showreel"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('showreel')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform"
                    >
                      <Play className="w-4 h-4 fill-current" /> Watch 2D Reel
                    </a>
                    
                    <button
                      onClick={() => setActiveTab('software')}
                      className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-colors"
                    >
                      <Layers className="w-4 h-4 text-cyan-400" /> 2D Software Tools
                    </button>
                  </div>

                  {/* Highlights Stat Counters */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
                    <div>
                      <div className="text-2xl font-bold text-white">40+</div>
                      <div className="text-xs text-slate-400">2D Projects</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-cyan-400">60 FPS</div>
                      <div className="text-xs text-slate-400">Fluid Speed Graph</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-fuchsia-400">100%</div>
                      <div className="text-xs text-slate-400">Keyframe Precision</div>
                    </div>
                  </div>
                </div>

                {/* Hero Feature Visual Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-md aspect-square rounded-2xl p-1 bg-gradient-to-br from-cyan-500/30 via-slate-800 to-fuchsia-500/30 shadow-2xl group">
                    <div className="w-full h-full bg-[#0F172A] rounded-xl overflow-hidden relative flex flex-col justify-between p-6">
                      
                      {/* Ambient Glow */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl"></div>

                      <div className="flex items-center justify-between z-10">
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-800/50">
                          2D_ANIMATION_STUDIO
                        </span>
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                        </div>
                      </div>

                      {/* Center Graphical Display */}
                      <div className="my-auto text-center space-y-3 z-10">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 animate-pulse">
                          <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                            <Video className="w-9 h-9 text-cyan-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white">Anamika Motion</h3>
                          <p className="text-xs text-slate-400">After Effects • Premiere Pro • Illustrator</p>
                        </div>
                      </div>

                      {/* Timeline Overlay Widget */}
                      <div className="z-10 bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-2">
                        <div className="flex justify-between text-[10px] font-mono text-slate-400">
                          <span>00:00:08</span>
                          <span className="text-cyan-400">KEYFRAME PREVIEW OK</span>
                          <span>00:00:30</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
                          <div className="w-3/4 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full"></div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECTION: CINEMATIC 2D SHOWREEL */}
            <section id="showreel" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Film className="w-4 h-4" /> Feature Presentation
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">2026 2D Motion Design Showreel</h2>
                </div>
                <p className="text-slate-400 text-sm max-w-md">
                  A high-energy compilation of vector logo reveals, kinetic typography, HUD interface motion, and sci-fi compositing.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
                {/* Embedded Showreel Mock Visual Container */}
                <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
                  
                  {/* Motion Graphic Preview */}
                  <img 
                    src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop" 
                    alt="2D Showreel Preview"
                    className={`w-full h-full object-cover transition-transform duration-700 ${isPlayingShowreel ? 'scale-105 filter brightness-110' : 'scale-100 opacity-70'}`}
                  />

                  {/* Motion Wave Overlay when Playing */}
                  {isPlayingShowreel && (
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
                      <div className="w-full flex items-center justify-between text-xs text-cyan-400 font-mono">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          PLAYING 2D MOTION REEL
                        </span>
                        <div className="flex items-end gap-1 h-6">
                          {[40, 80, 30, 90, 60, 100, 45, 75, 95, 50, 85].map((h, idx) => (
                            <div 
                              key={idx} 
                              className="w-1 bg-cyan-400 rounded-full animate-pulse" 
                              style={{ height: `${h}%`, animationDelay: `${idx * 0.1}s` }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Center Play Overlay */}
                  <button
                    onClick={() => setIsPlayingShowreel(!isPlayingShowreel)}
                    className="absolute z-20 w-20 h-20 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/50 hover:scale-110 transition-all"
                  >
                    {isPlayingShowreel ? (
                      <Pause className="w-8 h-8 fill-current" />
                    ) : (
                      <Play className="w-8 h-8 fill-current ml-1" />
                    )}
                  </button>
                </div>

                {/* Player Bottom Control Bar */}
                <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlayingShowreel(!isPlayingShowreel)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
                    >
                      {isPlayingShowreel ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>

                    <button 
                      onClick={() => setIsMutedShowreel(!isMutedShowreel)}
                      className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
                    >
                      {isMutedShowreel ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                    </button>

                    <span className="text-xs font-mono text-slate-400">
                      00:45 / 01:30
                    </span>
                  </div>

                  {/* Technical Tags */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      After Effects
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      Vector Motion
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">
                      60 FPS
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION: PORTFOLIO WORKS WITH CATEGORY FILTERING */}
            <section className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4" /> Selected Portfolio
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">2D & VFX Projects</h2>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
                  {['All', '2D Motion', 'Logo Motion', 'VFX & Compositing', 'Title Sequences'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        filterCategory === cat
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Artwork Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                        
                        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-cyan-400 border border-slate-800">
                          {project.category}
                        </div>

                        <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 border border-slate-800">
                          {project.duration}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 border-t border-slate-800/50 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        {project.software.map((sw, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {sw}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: SOFTWARE HUB (STRICTLY 2D SOFTWARE) */}
        {activeTab === 'software' && (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5" /> 2D Toolstack & Creative Pipeline
              </div>
              <h2 className="text-3xl font-extrabold text-white">2D Software Hub</h2>
              <p className="text-slate-400 text-sm">
                Explore my production pipeline across industry-standard motion design and compositing suites.
              </p>
            </div>

            {/* Software Selector Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.values(SOFTWARE_DATA).map((sw) => {
                const IconComponent = sw.icon;
                const isSelected = selectedSoftware === sw.id;
                return (
                  <button
                    key={sw.id}
                    onClick={() => setSelectedSoftware(sw.id)}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500 shadow-xl shadow-cyan-500/10 scale-102'
                        : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${sw.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base">{sw.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{sw.role}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected Software Deep Dive Card */}
            {SOFTWARE_DATA[selectedSoftware] && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden shadow-2xl">
                <div 
                  className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: SOFTWARE_DATA[selectedSoftware].accentColor }}
                ></div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${SOFTWARE_DATA[selectedSoftware].color} flex items-center justify-center text-white shadow-lg`}>
                      {React.createElement(SOFTWARE_DATA[selectedSoftware].icon, { className: 'w-8 h-8' })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{SOFTWARE_DATA[selectedSoftware].name}</h3>
                      <p className="text-sm text-cyan-400 font-medium">{SOFTWARE_DATA[selectedSoftware].role}</p>
                    </div>
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
                    {SOFTWARE_DATA[selectedSoftware].experience}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-7 space-y-4">
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Workflow Overview</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {SOFTWARE_DATA[selectedSoftware].description}
                    </p>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Core Technical Mastery</h4>
                    <div className="space-y-2">
                      {SOFTWARE_DATA[selectedSoftware].highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SNAKE ARCADE GAME */}
        {activeTab === 'game' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs font-semibold">
                <Gamepad2 className="w-3.5 h-3.5" /> HTML5 Canvas Mini Game
              </div>
              <h2 className="text-3xl font-extrabold text-white">Cyber Snake & Cute Shapes</h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Guide the neon motion snake to absorb glowing geometric vector shapes!
              </p>
            </div>

            {/* Embedded Snake Game Component */}
            <SnakeGame mascotMood={mascotMood} setMascotMood={setMascotMood} />
          </div>
        )}

      </main>

      {/* --- FLOATING 2D ROBOTIC MASCOT ("MOCHI") --- */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none sm:pointer-events-auto">
        
        {/* Mascot Speech Bubble */}
        <div className="mb-3 max-w-xs bg-slate-900/95 border border-cyan-500/30 text-slate-200 p-3.5 rounded-2xl rounded-br-none shadow-2xl text-xs space-y-2 backdrop-blur-md animate-fade-in relative">
          <p className="leading-relaxed">{mascotSpeech}</p>
          <button
            onClick={triggerNewMascotTip}
            className="text-[10px] text-cyan-400 font-bold hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Next Tip
          </button>
        </div>

        {/* Mascot Robot Graphic Container */}
        <button
          onClick={() => {
            setMascotMood(mascotMood === 'happy' ? 'idle' : 'happy');
            setMascotSpeech("Beep boop! Thanks for checking out my 2D motion portfolio!");
          }}
          className="group relative focus:outline-none"
          title="Click Mochi the Mascot!"
        >
          <div className="w-20 h-20 bg-slate-900/90 border-2 border-cyan-400/80 rounded-2xl p-2 shadow-2xl shadow-cyan-500/30 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform">
            <MochiMascotSVG mousePos={mousePos} mood={mascotMood} />
          </div>
          
          {/* Online Indicator Glow */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
          </span>
        </button>
      </div>

      {/* --- ARTWORK DETAIL MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Header Close */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden shrink-0">
              <img
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto">
              
              {/* Technical Spec Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Client / Studio</span>
                  <span className="text-white font-semibold">{selectedProject.client}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Frame Rate</span>
                  <span className="text-cyan-400 font-semibold">{selectedProject.fps}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Render Time</span>
                  <span className="text-fuchsia-400 font-semibold">{selectedProject.renderTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Duration</span>
                  <span className="text-white font-semibold">{selectedProject.duration}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Project Summary</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedProject.description}</p>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Workflow Breakdown</h4>
                <div className="space-y-2">
                  {selectedProject.breakdown.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                      <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
              >
                Close Breakdown
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- CONTACT MODAL --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold">
                <Send className="w-3.5 h-3.5" /> Contact Studio
              </div>
              <h3 className="text-2xl font-bold text-white">Let's Collaborate</h3>
              <p className="text-xs text-slate-400">
                Have a 2D motion graphics project, logo reveal, or video edit in mind? Drop a line!
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent to Anamika."); setIsContactOpen(false); }} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Creative Director"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="director@studio.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Project Scope</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Tell me about your 2D animation or motion graphic needs..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 mt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 text-center sm:flex sm:items-center sm:justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            © 2026 <span className="text-slate-300 font-semibold">Anamika's Midnight Motion</span>. All rights reserved.
          </div>
          <div className="flex justify-center gap-6 text-slate-400">
            <span className="hover:text-cyan-400 cursor-pointer">After Effects</span>
            <span className="hover:text-cyan-400 cursor-pointer">Premiere Pro</span>
            <span className="hover:text-cyan-400 cursor-pointer">2D Vector Motion</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

// --- NAV BUTTON HELPER ---
function NavButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
        active
          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// --- MASCOT "MOCHI" SVG GRAPHIC COMPONENT ---
function MochiMascotSVG({ mousePos, mood }) {
  const eyeX = Math.min(Math.max((mousePos.x - window.innerWidth / 2) / 40, -4), 4);
  const eyeY = Math.min(Math.max((mousePos.y - window.innerHeight / 2) / 40, -3), 3);

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Head Body */}
      <rect x="15" y="20" width="70" height="60" rx="18" fill="#0F172A" stroke="#06B6D4" strokeWidth="3" />
      
      {/* Antenna */}
      <line x1="50" y1="20" x2="50" y2="8" stroke="#06B6D4" strokeWidth="3" />
      <circle cx="50" cy="6" r="4" fill={mood === 'gaming' ? '#E11D48' : '#06B6D4'} className="animate-pulse" />

      {/* Screen Visor */}
      <rect x="23" y="28" width="54" height="34" rx="10" fill="#020617" stroke="#1E293B" strokeWidth="2" />

      {/* Robot Eyes (Eye Tracking) */}
      <g transform={`translate(${eyeX}, ${eyeY})`}>
        {mood === 'happy' ? (
          <>
            <path d="M 33 42 Q 38 36 43 42" stroke="#06B6D4" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 57 42 Q 62 36 67 42" stroke="#06B6D4" strokeWidth="3" fill="none" strokeLinecap="round" />
          </>
        ) : mood === 'amazed' ? (
          <>
            <circle cx="38" cy="42" r="5" fill="#E02424" />
            <circle cx="62" cy="42" r="5" fill="#E02424" />
          </>
        ) : mood === 'gaming' ? (
          <>
            <rect x="33" y="39" width="10" height="6" rx="2" fill="#3B82F6" />
            <rect x="57" y="39" width="10" height="6" rx="2" fill="#3B82F6" />
          </>
        ) : (
          <>
            <circle cx="38" cy="42" r="4" fill="#06B6D4" />
            <circle cx="62" cy="42" r="4" fill="#06B6D4" />
          </>
        )}
      </g>

      {/* Mouth */}
      {mood === 'happy' ? (
        <path d="M 42 53 Q 50 60 58 53" stroke="#06B6D4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <line x1="43" y1="54" x2="57" y2="54" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
      )}

      {/* Cheek Blush */}
      <circle cx="28" cy="50" r="3" fill="#F43F5E" opacity="0.5" />
      <circle cx="72" cy="50" r="3" fill="#F43F5E" opacity="0.5" />
    </svg>
  );
}

// --- DYNAMIC BACKGROUND CANVAS ---
function MotionCanvasBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: Math.random() > 0.5 ? '#06B6D4' : '#A855F7'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.25;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}

// --- EMBEDDED HTML5 CANVAS SNAKE & CUTE SHAPES GAME ---
function SnakeGame({ mascotMood, setMascotMood }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const snakeRef = useRef([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ]);
  const dirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 5, y: 5, type: 'circle' });

  const GRID_SIZE = 20;
  const TILE_COUNT = 20;

  const spawnFood = () => {
    const types = ['circle', 'star', 'cube'];
    foodRef.current = {
      x: Math.floor(Math.random() * TILE_COUNT),
      y: Math.floor(Math.random() * TILE_COUNT),
      type: types[Math.floor(Math.random() * types.length)]
    };
  };

  const startGame = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    dirRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    spawnFood();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
      switch (e.key) {
        case 'ArrowUp':
          if (dirRef.current.y !== 1) dirRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          if (dirRef.current.y !== -1) dirRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
          if (dirRef.current.x !== 1) dirRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
          if (dirRef.current.x !== -1) dirRef.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      const snake = [...snakeRef.current];
      const head = {
        x: snake[0].x + dirRef.current.x,
        y: snake[0].y + dirRef.current.y
      };

      if (
        head.x < 0 ||
        head.x >= TILE_COUNT ||
        head.y < 0 ||
        head.y >= TILE_COUNT ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        setMascotMood('idle');
        return;
      }

      snake.unshift(head);

      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore((prev) => {
          const nextScore = prev + 10;
          if (nextScore > highScore) setHighScore(nextScore);
          return nextScore;
        });
        spawnFood();
      } else {
        snake.pop();
      }

      snakeRef.current = snake;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#1E293B';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < TILE_COUNT; i++) {
          ctx.beginPath();
          ctx.moveTo(i * GRID_SIZE, 0);
          ctx.lineTo(i * GRID_SIZE, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i * GRID_SIZE);
          ctx.lineTo(canvas.width, i * GRID_SIZE);
          ctx.stroke();
        }

        snake.forEach((seg, idx) => {
          ctx.fillStyle = idx === 0 ? '#06B6D4' : '#0891B2';
          ctx.shadowBlur = idx === 0 ? 10 : 0;
          ctx.shadowColor = '#06B6D4';
          ctx.fillRect(
            seg.x * GRID_SIZE + 1,
            seg.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
          );
        });

        const food = foodRef.current;
        ctx.fillStyle = '#F43F5E';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#F43F5E';

        const fx = food.x * GRID_SIZE + GRID_SIZE / 2;
        const fy = food.y * GRID_SIZE + GRID_SIZE / 2;

        ctx.beginPath();
        if (food.type === 'circle') {
          ctx.arc(fx, fy, GRID_SIZE / 2 - 2, 0, Math.PI * 2);
        } else if (food.type === 'cube') {
          ctx.fillRect(food.x * GRID_SIZE + 3, food.y * GRID_SIZE + 3, GRID_SIZE - 6, GRID_SIZE - 6);
        } else {
          ctx.arc(fx, fy, GRID_SIZE / 2 - 1, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }, 120);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, highScore]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-6 relative">
      
      {/* Score Header */}
      <div className="flex items-center justify-between w-full max-w-md bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800 text-sm">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-slate-400">High Score:</span>
          <span className="text-white font-bold">{highScore}</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Score:</span>
          <span className="text-cyan-400 font-bold">{score}</span>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-slate-950">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="block max-w-full h-auto"
        />

        {(!gameStarted || gameOver) && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
            <Gamepad2 className="w-12 h-12 text-cyan-400 animate-bounce" />
            <div>
              <h3 className="text-2xl font-extrabold text-white">
                {gameOver ? 'Game Over!' : 'Ready to Play?'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Use your keyboard arrow keys to guide the neon motion snake!
              </p>
            </div>

            <button
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:scale-105 transition-transform"
            >
              {gameOver ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Direction Controls */}
      <div className="grid grid-cols-3 gap-2 w-48 sm:hidden">
        <div></div>
        <button
          onClick={() => { if (dirRef.current.y !== 1) dirRef.current = { x: 0, y: -1 }; }}
          className="p-3 bg-slate-800 text-white rounded-xl text-center font-bold"
        >
          ▲
        </button>
        <div></div>
        <button
          onClick={() => { if (dirRef.current.x !== 1) dirRef.current = { x: -1, y: 0 }; }}
          className="p-3 bg-slate-800 text-white rounded-xl text-center font-bold"
        >
          ◀
        </button>
        <button
          onClick={() => { if (dirRef.current.y !== -1) dirRef.current = { x: 0, y: 1 }; }}
          className="p-3 bg-slate-800 text-white rounded-xl text-center font-bold"
        >
          ▼
        </button>
        <button
          onClick={() => { if (dirRef.current.x !== -1) dirRef.current = { x: 1, y: 0 }; }}
          className="p-3 bg-slate-800 text-white rounded-xl text-center font-bold"
        >
          ▶
        </button>
      </div>

    </div>
  );
}
