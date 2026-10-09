import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, Upload, Heart, Sparkles, Check, Zap, Shield, BatteryCharging } from 'lucide-react';
import { PRODUCT_COLORS } from '../data/productData';
import { KosnoraLogo } from './KosnoraLogo';

interface InteractiveCaseViewerProps {
  onSelectPlan?: () => void;
  selectedColorId?: string;
  onColorChange?: (colorId: string) => void;
}

const PRESET_LOOKS = [
  {
    id: 'cinza',
    label: 'CINZA',
    tag: 'Classic',
    icon: Sparkles,
    imageSrc: 'https://i.postimg.cc/m24tHsKv/Whats-App-Image-2026-10-09-at-02-56-11.jpg',
    description: 'Titanium Gray finish with NFC e-ink display',
  },
  {
    id: 'preta',
    label: 'PRETA',
    tag: 'Stealth',
    icon: Sparkles,
    imageSrc: 'https://i.postimg.cc/CMqq8J51/Whats-App-Image-2026-10-07-at-00-11-55.jpg',
    description: 'Obsidian Black finish with NFC e-ink display',
  },
  {
    id: 'rosa',
    label: 'ROSA',
    tag: 'Vibrant',
    icon: Heart,
    imageSrc: 'https://i.postimg.cc/pVFFjkrr/Whats-App-Image-2026-10-09-at-02-44-27.jpg',
    description: 'Soft Pink finish with NFC e-ink display',
  },
  {
    id: 'branca',
    label: 'BRANCA',
    tag: 'Minimal',
    icon: Sparkles,
    imageSrc: 'https://i.postimg.cc/kGKRdML9/Whats-App-Image-2026-10-09-at-02-47-31.jpg',
    description: 'Cloud White finish with NFC e-ink display',
  },
  {
    id: 'laranja',
    label: 'LARANJA',
    tag: 'Bold',
    icon: Zap,
    imageSrc: 'https://i.postimg.cc/66vvZzqT/Whats-App-Image-2026-10-09-at-02-52-19.jpg',
    description: 'Sunset Orange finish with NFC e-ink display',
  },
];

export const InteractiveCaseViewer: React.FC<InteractiveCaseViewerProps> = ({
  onSelectPlan,
  selectedColorId: externalColorId,
  onColorChange,
}) => {
  const [internalColorId, setInternalColorId] = useState('cinza');
  const activeColorId = externalColorId || internalColorId;
  const activeColor = PRODUCT_COLORS.find((c) => c.id === activeColorId) || PRODUCT_COLORS[0];

  const [activeLookId, setActiveLookId] = useState('cinza');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleColorSelect = (id: string) => {
    setInternalColorId(id);
    if (onColorChange) onColorChange(id);
  };

  const handlePresetSelect = (lookId: string) => {
    if (lookId === activeLookId && !customImage) return;
    setIsUpdating(true);
    setTimeout(() => {
      setActiveLookId(lookId);
      setCustomImage(null);
      setIsUpdating(false);
    }, 320);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIsUpdating(true);
        setTimeout(() => {
          setCustomImage(reader.result as string);
          setActiveLookId('custom');
          setIsUpdating(false);
        }, 320);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentDisplayImage = customImage
    ? customImage
    : PRESET_LOOKS.find((l) => l.id === activeLookId)?.imageSrc || PRESET_LOOKS[0].imageSrc;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-[#08090D] border-2 border-neutral-800/90 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Background Subtle Purple Ambient Lighting */}
      <div
        className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: '#A855F7' }}
      />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-[150px] opacity-20 bg-[#7E22CE] pointer-events-none" />

      {/* Top Banner inside simulator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C084FC] shadow-[0_0_8px_#C084FC]" />
          <span className="text-white font-bold tracking-widest font-sans">KOSNORA SMART LAB</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-sans">
          <span className="text-neutral-400">NFC INDUCTION: <strong className="text-[#C084FC]">ONLINE</strong></span>
          <span className="text-neutral-400">BATTERY: <strong className="text-white">0% (NEVER NEEDED)</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left column: Realistic Smart Case Rendering */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          <div
            className="relative w-[285px] sm:w-[315px] aspect-[9/18.5] rounded-[50px] p-3.5 transition-all duration-500 shadow-2xl"
            style={{
              backgroundColor: activeColor.hex,
              boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.95), inset 0 2px 3px rgba(255, 255, 255, 0.2)',
            }}
          >
            {/* Case Outer Chassis */}
            <div className="relative w-full h-full rounded-[42px] bg-neutral-900 border border-neutral-700/80 overflow-hidden flex flex-col justify-between p-3">
              {/* iPhone Pro Triple Camera Armor Cutout */}
              <div className="w-24 h-24 rounded-3xl bg-neutral-950 border border-neutral-700 p-2 shadow-inner relative z-20 self-start ml-1 mt-1">
                <div className="grid grid-cols-2 gap-2 h-full">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-neutral-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-neutral-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 border border-neutral-600 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-200/90 shadow-sm" />
                    <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 border border-neutral-600" />
                  </div>
                </div>
              </div>

              {/* The Smart Display Screen on the Back */}
              <div className="absolute inset-x-5 top-32 bottom-12 rounded-2xl overflow-hidden bg-neutral-950 border-2 border-neutral-800 shadow-2xl flex items-center justify-center group">
                <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                  <img
                    src={currentDisplayImage}
                    alt="KOSNORA Smart Screen Display"
                    className={`w-full h-full object-contain bg-neutral-950 transition-all duration-300 ${
                      isUpdating ? 'opacity-25 scale-95 blur-xs filter grayscale' : 'opacity-95 scale-100'
                    }`}
                  />

                  {/* E-ink textured screen glare & protective film overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />

                  {/* Updating Animation Overlay simulating NFC Beam Refresh */}
                  {isUpdating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xs">
                      <RefreshCw className="w-9 h-9 text-[#C084FC] animate-spin mb-2" />
                      <span className="text-[11px] font-black tracking-widest text-[#C084FC] uppercase font-mono">
                        NFC BEAM SYNCING...
                      </span>
                    </div>
                  )}

                  {/* Badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/85 backdrop-blur-md text-[9px] font-black text-neutral-300 tracking-wider font-mono border border-neutral-700/60">
                    INK NFC SCREEN
                  </div>
                </div>
              </div>

              {/* Brand Logo debossed on bottom */}
              <div className="w-full flex items-center justify-center py-0.5 z-10 opacity-75">
                <KosnoraLogo size="sm" className="h-4.5" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-neutral-400 font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#C084FC] shadow-[0_0_6px_#C084FC]" />
            <span>5-Minute Passive NFC Refresh · 100% Battery-Free</span>
          </div>
        </div>

        {/* Right column: Interactive Controls & Aggressive Value Driver */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#A855F7]/15 border border-[#A855F7]/40 text-[#C084FC] font-black text-[11px] tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 fill-[#C084FC]" />
              <span>INTERACTIVE SIMULATOR</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              YOUR MOOD CHANGES.<br />
              YOUR CASE SHOULD TOO.
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
              Why carry the exact same phone case every single day? Test the switch in real-time below, or drop your own image onto the case right now.
            </p>
          </div>

          {/* Color Selector */}
          <div className="mb-6 pb-6 border-b border-neutral-800">
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
              1. Choose Case Finish: <span className="text-white font-black">{activeColor.name}</span>
            </label>
            <div className="flex items-center gap-3">
              {PRODUCT_COLORS.map((color) => {
                const isSelected = activeColorId === color.id;
                return (
                  <button
                    key={color.id}
                    onClick={() => handleColorSelect(color.id)}
                    className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-transform focus:outline-none cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[#C084FC] ring-offset-2 ring-offset-neutral-950 scale-110 shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                    title={color.name}
                  >
                    <span
                      className={`w-9 h-9 rounded-full border ${color.borderClass} shadow-md`}
                      style={{ backgroundColor: color.hex }}
                    />
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 absolute ${
                          color.hex === '#EAEAEA' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Look Switcher */}
          <div className="space-y-3 mb-6">
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-400">
              2. Switch The Case Vibe:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {PRESET_LOOKS.map((look) => {
                const Icon = look.icon;
                const isSelected = activeLookId === look.id && !customImage;
                return (
                  <button
                    key={look.id}
                    onClick={() => handlePresetSelect(look.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 border-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                        : 'bg-neutral-950/80 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected ? 'bg-gradient-to-r from-[#9333EA] to-[#A855F7] text-white shadow-sm' : 'bg-neutral-900 text-neutral-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-black tracking-wide truncate">{look.label}</div>
                      <div className="text-[10px] text-neutral-400 truncate">{look.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Photo Upload */}
            <div className="pt-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`w-full py-3.5 px-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2.5 text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                  customImage
                    ? 'border-[#A855F7] bg-[#A855F7]/10 text-[#C084FC] shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                    : 'border-neutral-700 hover:border-[#A855F7] bg-neutral-900/60 text-neutral-300 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>
                  {customImage
                    ? 'Custom Photo Active! Click to Test Another'
                    : 'Upload Your Photo to Test on the Case'}
                </span>
              </button>
            </div>
          </div>

          {/* Bold Primary CTA */}
          {onSelectPlan && (
            <button
              onClick={onSelectPlan}
              className="w-full py-4.5 px-6 rounded-xl bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#7E22CE] hover:brightness-110 text-white font-black text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>GET YOUR KOSNORA CASE</span>
              <span className="text-xs font-bold text-neutral-200">— FROM $59.90</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
