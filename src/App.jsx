import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Palette, Layers, Film, Cpu, ExternalLink, ArrowLeft, ArrowRight,
  Github, Twitter, Linkedin, Mail, Menu, X, Share2, Check, ZoomIn, Info
} from 'lucide-react';

// ==========================================
// PORTFOLIO DATA (Preserved & Enhanced)
// ==========================================
const portfolioItems = [
  {
    id: 1,
    slug: 'neon-cyberpunk-metropolis',
    title: 'Neon Cyberpunk Metropolis',
    category: 'Digital Painting',
    software: ['Photoshop', 'Krita'],
    softwareCategory: 'photoshop',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    description: 'High-detail digital painting exploring dystopian cityscapes, volumetric lighting, and neon reflections created for concept key art.',
    date: '2024'
  },
  {
    id: 2,
    slug: 'midnight-motion-key-art',
    title: 'Midnight Motion Key Art',
    category: 'Key Visual & Motion',
    software: ['After Effects', 'Photoshop'],
    softwareCategory: 'after-effects',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'Branding key visual showcasing fluid motion dynamics, kinetic energy, and rich dark obsidian aesthetic.',
    date: '2024'
  },
  {
    id: 3,
    slug: 'kinetic-typography-teaser',
    title: 'Kinetic Typography Teaser',
    category: 'Motion Graphics',
    software: ['After Effects', 'Premiere Pro'],
    softwareCategory: 'after-effects',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    description: 'Experimental title sequence and typography dynamics crafted with expressions and precise audio synchronization.',
    date: '2024'
  },
  {
    id: 4,
    slug: 'vector-brand-identity-suite',
    title: 'Vector Brand Identity Suite',
    category: 'Vector & Identity',
    software: ['Illustrator'],
    softwareCategory: 'illustrator',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
    description: 'Minimalist logo mark and scalable brand identity guidelines built using precise geometric vector grids.',
    date: '2024'
  },
  {
    id: 5,
    slug: 'generative-workflow-concept',
    title: 'Generative Node Concept',
    category: 'AI Pipeline Concept',
    software: ['ComfyUI', 'Photoshop'],
    softwareCategory: 'comfyui',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1200&q=80',
    description: 'Hybrid creative pipeline blending custom ComfyUI ControlNet node workflows with manual digital retouching.',
    date: '2024'
  },
  {
    id: 6,
    slug: 'surreal-nocturne-landscape',
    title: 'Surreal Nocturne Landscape',
    category: 'Digital Painting',
    software: ['Photoshop', 'Krita'],
    softwareCategory: 'photoshop',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    description: 'Atmospheric dark landscape study focusing on subtle color harmonies and midnight moonlight interplay.',
    date: '2023'
  }
];

const softwareCategories = [
  {
    id: 'photoshop',
    name: 'Photoshop',
    path: '/photoshop',
    icon: Palette,
    tagline: 'Digital Painting & Composite Matte Art',
    description: 'Raster image editing, advanced compositing, color grading, and concept matte artwork.',
    color: '#2D5BFF'
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    path: '/illustrator',
    icon: Layers,
    tagline: 'Vector Graphics & Precision Identity',
    description: 'Scalable vector branding, geometric logo design, icon systems, and crisp typographic layouts.',
    color: '#CCFF00'
  },
  {
    id: 'comfyui',
    name: 'ComfyUI',
    path: '/comfyui',
    icon: Cpu,
    tagline: 'Generative AI Node Workflows',
    description: 'Custom node-based diffusion pipelines, ControlNet conditioning, and hybrid generative art.',
    color: '#2D5BFF'
  },
  {
    id: 'after-effects',
    name: 'After Effects',
    path: '/after-effects',
    icon: Film,
    tagline: 'Motion Design & Visual Effects',
    description: '2D motion graphics, kinetic typography, visual effects, and dynamic UI animations.',
    color: '#CCFF00'
  }
];

// ==========================================
// CUTE 2D ROBOTIC MASCOT COMPONENT ("MOTI")
// ==========================================
function RoboticMascot() {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [speechIndex, setSpeechIndex] = useState(0);

  const dialogueList = [
    "ComfyUI node connected! ⚡",
    "Exporting 4K motion graphics... 🎬",
    "Vector curves looking sharp! ✨",
    "Photoshop layers in sync! 🎨",
    "Welcome to Midnight Motion! 🌌"
  ];

  if (!isVisible) return null;

  const handleMascotClick = () => {
    setSpeechIndex((prev) => (prev + 1) % dialogueList.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Dialogue Tooltip */}
      <div 
        className={`mb-3 px-3.5 py-2 rounded-xl bg-[#141622] border border-[#2D5BFF]/30 text-xs text-[#F3F4F6] shadow-xl transition-all duration-300 transform origin-bottom-right flex items-center gap-2 ${
          isHovered ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-90 translate-y-1'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
        <span className="font-mono">{dialogueList[speechIndex]}</span>
      </div>

      {/* Robot Mascot SVG */}
      <div className="relative group cursor-pointer" onClick={handleMascotClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {/* Dismiss Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
          className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-[#0A0B10] border border-gray-700 text-gray-400 hover:text-white flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
          title="Hide Mascot"
        >
          ×
        </button>

        <div className="w-16 h-16 relative animate-[bounce_4s_infinite_ease-in-out]">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(45,91,255,0.25)]">
            {/* Antenna */}
            <line x1="50" y1="20" x2="50" y2="10" stroke="#2D5BFF" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="8" r="4" fill="#CCFF00" className="animate-pulse" />

            {/* Head */}
            <rect x="25" y="20" width="50" height="38" rx="10" fill="#141622" stroke="#2D5BFF" strokeWidth="3" />

            {/* Visor Screen */}
            <rect x="30" y="26" width="40" height="24" rx="6" fill="#0A0B10" />

            {/* Eyes */}
            {isHovered ? (
              <>
                <path d="M 36 38 Q 41 33 46 38" fill="none" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" />
                <path d="M 54 38 Q 59 33 64 38" fill="none" stroke="#CCFF00" strokeWidth="3" strokeLinecap="round" />
              </>
            ) : (
              <>
                <circle cx="40" cy="38" r="4" fill="#2D5BFF">
                  <animate attributeName="r" values="4;4;0.5;4" keyTimes="0;0.9;0.95;1" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="38" r="4" fill="#2D5BFF">
                  <animate attributeName="r" values="4;4;0.5;4" keyTimes="0;0.9;0.95;1" dur="3s" repeatCount="indefinite" />
                </circle>
              </>
            )}

            {/* Body */}
            <rect x="30" y="60" width="40" height="30" rx="8" fill="#141622" stroke="#2D5BFF" strokeWidth="3" />
            <circle cx="50" cy="75" r="5" fill="#CCFF00" />
            <rect x="36" y="82" width="28" height="2" fill="#2D5BFF" rx="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MAIN PORTFOLIO APPLICATION
// ==========================================
export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedModalImage, setSelectedModalImage] = useState(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path) => {
    setCurrentPath(path);
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      // Graceful fallback for sandboxed iframe blob origins
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Route Parser
  const renderContent = () => {
    // 1. Individual Artwork Route: /artwork/:slug
    if (currentPath.startsWith('/artwork/')) {
      const slug = currentPath.replace('/artwork/', '');
      const artwork = portfolioItems.find((item) => item.slug === slug);

      if (!artwork) {
        return (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl font-bold text-[#F3F4F6] mb-3">Artwork Not Found</h2>
            <p className="text-gray-400 mb-6 max-w-md">The requested artwork URL does not exist or has been moved.</p>
            <button
              onClick={() => handleNavigate('/')}
              className="px-6 py-2.5 rounded-lg bg-[#2D5BFF] text-white font-medium hover:bg-[#2D5BFF]/80 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Return to Portfolio
            </button>
          </div>
        );
      }

      const currentIndex = portfolioItems.findIndex((item) => item.slug === slug);
      const prevArtwork = portfolioItems[(currentIndex - 1 + portfolioItems.length) % portfolioItems.length];
      const nextArtwork = portfolioItems[(currentIndex + 1) % portfolioItems.length];

      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Top Breadcrumb */}
          <button
            onClick={() => handleNavigate('/')}
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#CCFF00] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Portfolio Home
          </button>

          {/* Main Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#141622] rounded-2xl border border-gray-800 p-6 md:p-8 overflow-hidden shadow-2xl">
            {/* Image Section */}
            <div className="lg:col-span-7 relative group rounded-xl overflow-hidden bg-[#0A0B10] flex items-center justify-center">
              <img 
                src={artwork.image} 
                alt={artwork.title} 
                className="w-full h-auto max-h-[600px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
              <button
                onClick={() => setSelectedModalImage(artwork.image)}
                className="absolute top-4 right-4 p-2.5 rounded-lg bg-[#0A0B10]/80 backdrop-blur-md text-white hover:text-[#CCFF00] transition-colors"
                title="Expand Fullscreen"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2D5BFF]/20 text-[#2D5BFF] border border-[#2D5BFF]/40">
                    {artwork.category}
                  </span>
                  <span className="text-xs text-gray-500">{artwork.date}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-[#F3F4F6] mb-4 tracking-tight">
                  {artwork.title}
                </h1>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {artwork.description}
                </p>

                {/* Software Stack Badges */}
                <div className="mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">Software & Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {artwork.software.map((tool) => (
                      <span key={tool} className="px-3 py-1.5 rounded-md bg-[#0A0B10] text-xs font-mono text-[#F3F4F6] border border-gray-800">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#0A0B10] border border-gray-700 text-xs font-medium text-gray-300 hover:text-white hover:border-[#2D5BFF] transition-all flex items-center gap-2"
                >
                  {copied ? <Check size={14} className="text-[#CCFF00]" /> : <Share2 size={14} />}
                  {copied ? 'Link Copied!' : 'Share Artwork'}
                </button>

                <button
                  onClick={() => handleNavigate(`/${artwork.softwareCategory}`)}
                  className="px-4 py-2 rounded-lg bg-[#2D5BFF]/10 text-[#2D5BFF] text-xs font-medium hover:bg-[#2D5BFF]/20 transition-all"
                >
                  More in {artwork.softwareCategory} →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Next/Prev Pagination */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => handleNavigate(`/artwork/${prevArtwork.slug}`)}
              className="p-4 rounded-xl bg-[#141622] border border-gray-800 hover:border-[#2D5BFF] transition-all text-left flex items-center gap-3 group"
            >
              <ArrowLeft size={18} className="text-gray-400 group-hover:text-[#2D5BFF] transition-colors" />
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-500 block">Previous</span>
                <span className="text-sm font-medium text-[#F3F4F6] group-hover:text-[#2D5BFF] transition-colors line-clamp-1">{prevArtwork.title}</span>
              </div>
            </button>

            <button
              onClick={() => handleNavigate(`/artwork/${nextArtwork.slug}`)}
              className="p-4 rounded-xl bg-[#141622] border border-gray-800 hover:border-[#2D5BFF] transition-all text-right flex items-center justify-end gap-3 group"
            >
              <div>
                <span className="text-[10px] uppercase font-mono text-gray-500 block">Next</span>
                <span className="text-sm font-medium text-[#F3F4F6] group-hover:text-[#2D5BFF] transition-colors line-clamp-1">{nextArtwork.title}</span>
              </div>
              <ArrowRight size={18} className="text-gray-400 group-hover:text-[#2D5BFF] transition-colors" />
            </button>
          </div>
        </div>
      );
    }

    // 2. Dedicated Category Routes: /photoshop, /illustrator, /comfyui, /after-effects
    const matchingCategory = softwareCategories.find((cat) => cat.path === currentPath);
    if (matchingCategory) {
      const categoryArtworks = portfolioItems.filter((item) => item.softwareCategory === matchingCategory.id);
      const CategoryIcon = matchingCategory.icon;

      return (
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header Banner */}
          <div className="mb-10 p-8 rounded-2xl bg-[#141622] border border-gray-800 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
              <CategoryIcon size={240} strokeWidth={1} />
            </div>
            <button
              onClick={() => handleNavigate('/')}
              className="mb-4 inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#CCFF00] transition-colors"
            >
              <ArrowLeft size={14} /> Back to All Software Categories
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-[#2D5BFF]/20 text-[#2D5BFF]">
                <CategoryIcon size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#F3F4F6]">{matchingCategory.name}</h1>
            </div>
            <p className="text-gray-300 max-w-2xl text-sm leading-relaxed mt-2">{matchingCategory.description}</p>
          </div>

          {/* Artwork Grid for Category */}
          {categoryArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryArtworks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigate(`/artwork/${item.slug}`)}
                  className="group bg-[#141622] rounded-xl border border-gray-800 hover:border-[#2D5BFF] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-video bg-[#0A0B10]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent opacity-60" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-mono text-[#CCFF00] tracking-wider uppercase block mb-1">{item.category}</span>
                    <h3 className="text-lg font-bold text-[#F3F4F6] group-hover:text-[#2D5BFF] transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-xs mt-2 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#141622] rounded-xl border border-dashed border-gray-800">
              <p className="text-gray-400 text-sm">No dedicated showcase artwork uploaded yet for this software category.</p>
            </div>
          )}
        </div>
      );
    }

    // 3. Homepage Route: /
    if (currentPath === '/' || currentPath === '') {
      return (
        <main className="max-w-6xl mx-auto px-4 py-8 space-y-20">
          {/* Hero & Brand Section */}
          <section className="text-center py-12 md:py-20 relative">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141622] border border-[#2D5BFF]/30 text-xs font-mono text-[#CCFF00] mb-6">
              <Sparkles size={14} /> Creative Visual & Motion Designer
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#F3F4F6] tracking-tight mb-6">
              Anamika's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5BFF] to-[#CCFF00]">Midnight Motion</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-300 text-sm md:text-base leading-relaxed mb-8">
              Crafting immersive visual experiences across raster digital painting, scalable vector identities, motion graphics, and generative AI node pipelines.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button 
                onClick={() => {
                  document.getElementById('portfolio-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#2D5BFF] text-white font-medium text-sm hover:bg-[#2D5BFF]/80 transition-all shadow-lg shadow-[#2D5BFF]/20"
              >
                Explore Selected Works
              </button>
              <button 
                onClick={() => {
                  document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-[#141622] text-gray-300 border border-gray-800 font-medium text-sm hover:text-white hover:border-gray-700 transition-all"
              >
                About & Software Stack
              </button>
            </div>
          </section>

          {/* Software Categories Navigation Cards */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#F3F4F6]">Primary Toolset & Dedicated Category Pages</h2>
              <span className="text-xs font-mono text-gray-500">Click to filter</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {softwareCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleNavigate(cat.path)}
                    className="p-5 rounded-xl bg-[#141622] border border-gray-800 hover:border-[#2D5BFF] transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-[#0A0B10] flex items-center justify-center text-[#2D5BFF] group-hover:text-[#CCFF00] transition-colors mb-4 border border-gray-800">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-bold text-[#F3F4F6] text-base group-hover:text-[#2D5BFF] transition-colors">{cat.name}</h3>
                      <p className="text-gray-400 text-xs mt-1 leading-relaxed">{cat.tagline}</p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-gray-500 group-hover:text-[#CCFF00] transition-colors">
                      View Category →
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Selected Portfolio Grid */}
          <section id="portfolio-grid" className="space-y-6">
            <h2 className="text-2xl font-bold text-[#F3F4F6]">Selected Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigate(`/artwork/${item.slug}`)}
                  className="group bg-[#141622] rounded-xl border border-gray-800 hover:border-[#2D5BFF] transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative overflow-hidden aspect-video bg-[#0A0B10]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B10] via-transparent opacity-60" />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-mono text-[#CCFF00] tracking-wider uppercase block mb-1">{item.category}</span>
                    <h3 className="text-lg font-bold text-[#F3F4F6] group-hover:text-[#2D5BFF] transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-xs mt-2 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Refined About Section */}
          <section id="about-section" className="p-8 md:p-12 rounded-2xl bg-[#141622] border border-gray-800 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono text-[#CCFF00] uppercase tracking-widest">About Anamika</span>
              <h2 className="text-3xl font-bold text-[#F3F4F6]">Creative Designer & Motion Artist</h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                Specializing in digital visual concepts, vector identities, kinetic typography, and experimental AI workflows. Combining precise technical tool mastery with midnight artistic flair.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase text-gray-400 mb-4 tracking-wider">Proficient Software Suite</h3>
              <div className="flex flex-wrap gap-2">
                {['Photoshop', 'Illustrator', 'After Effects', 'Premiere Pro', 'ComfyUI', 'Krita', 'Digital Painting'].map((skill) => (
                  <span key={skill} className="px-3.5 py-2 rounded-lg bg-[#0A0B10] border border-gray-800 text-xs font-mono text-[#F3F4F6]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>
      );
    }

    // 4. Fallback 404 Route
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold text-[#F3F4F6] mb-3">404 - Page Not Found</h2>
        <p className="text-gray-400 mb-6 max-w-md">The route <code className="text-[#CCFF00] font-mono">{currentPath}</code> does not exist.</p>
        <button
          onClick={() => handleNavigate('/')}
          className="px-6 py-2.5 rounded-lg bg-[#2D5BFF] text-white font-medium hover:bg-[#2D5BFF]/80 transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Return to Portfolio
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0B10] text-[#F3F4F6] font-sans selection:bg-[#2D5BFF] selection:text-white flex flex-col justify-between">
      {/* HEADER & NAVIGATION */}
      <header className="sticky top-0 z-30 bg-[#0A0B10]/90 backdrop-blur-md border-b border-gray-800/80 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo / Brand */}
          <button 
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2D5BFF] to-[#141622] flex items-center justify-center border border-[#2D5BFF]/40 text-[#CCFF00] font-black text-sm">
              M
            </div>
            <div>
              <span className="font-bold text-base text-[#F3F4F6] tracking-tight group-hover:text-[#2D5BFF] transition-colors block leading-none">
                Anamika's
              </span>
              <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase block mt-0.5">
                Midnight Motion
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
            <button 
              onClick={() => handleNavigate('/')}
              className={`transition-colors ${currentPath === '/' ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'}`}
            >
              /home
            </button>
            {softwareCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavigate(cat.path)}
                className={`transition-colors ${currentPath === cat.path ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'}`}
              >
                /{cat.id}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-800 mt-3 flex flex-col gap-3 font-mono text-xs">
            <button
              onClick={() => handleNavigate('/')}
              className="text-left py-1.5 text-gray-300 hover:text-[#CCFF00]"
            >
              /home
            </button>
            {softwareCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavigate(cat.path)}
                className="text-left py-1.5 text-gray-300 hover:text-[#CCFF00]"
              >
                /{cat.id}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* DYNAMIC CONTENT CONTAINER */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {selectedModalImage && (
        <div 
          className="fixed inset-0 z-50 bg-[#0A0B10]/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedModalImage(null)}
        >
          <img 
            src={selectedModalImage} 
            alt="Expanded view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
          <button 
            onClick={() => setSelectedModalImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-[#141622] text-white hover:text-[#CCFF00] border border-gray-800"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* FLOATING ROBOTIC MASCOT */}
      <RoboticMascot />

      {/* FOOTER */}
      <footer className="border-t border-gray-800/80 bg-[#0A0B10] py-8 px-4 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div>
            © {new Date().getFullYear()} Anamika's Midnight Motion. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => handleNavigate('/photoshop')} className="hover:text-gray-300">Photoshop</button>
            <button onClick={() => handleNavigate('/illustrator')} className="hover:text-gray-300">Illustrator</button>
            <button onClick={() => handleNavigate('/comfyui')} className="hover:text-gray-300">ComfyUI</button>
            <button onClick={() => handleNavigate('/after-effects')} className="hover:text-gray-300">After Effects</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

