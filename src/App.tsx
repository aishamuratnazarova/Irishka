import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Gift, 
  Trash2, 
  CheckCircle, 
  Flame, 
  PartyPopper,
  ArrowDown
} from 'lucide-react';

import { products } from './data';
import { CategoryName } from './types';
import BirthdayLetter from './components/BirthdayLetter';
import ProductCard from './components/ProductCard';
import Confetti from './components/Confetti';
import MusicPlayer from './components/MusicPlayer';
import { SparklesCore } from './components/ui/sparkles';
import { SparklesText } from './components/ui/sparkles-text';
import { Button, LiquidButton, MetalButton } from './components/ui/button';
import { getDirectImageUrl } from './lib/utils';
import { LampDemo } from './components/Lamp';

export default function App() {
  const [activeTab, setActiveTab] = useState<CategoryName>('Шмот');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Confetti triggering states
  const [confettiActive, setConfettiActive] = useState(false);
  const [burstCoords, setBurstCoords] = useState<{ x: number; y: number } | undefined>(undefined);
  
  // Modal for final checkout approval
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Reference for scrolling to the product grid
  const listSectionRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = (e?: React.MouseEvent) => {
    if (e) {
      setBurstCoords({ x: e.clientX, y: e.clientY });
    } else {
      setBurstCoords(undefined);
    }
    setConfettiActive(false);
    // Use timeout to guarantee re-render of active confetti
    setTimeout(() => {
      setConfettiActive(true);
    }, 50);
  };

  const handleToggleFavorite = (productId: string, e: React.MouseEvent) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (!exists) {
        // Thrill sound / visual feel when adding to wish pile
        triggerConfetti(e);
        return [...prev, productId];
      }
      return prev.filter((id) => id !== productId);
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const scrollToGrid = () => {
    if (listSectionRef.current) {
      listSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter products by currently active tab
  const filteredProducts = products.filter((p) => p.category === activeTab);

  // Retrieve actual proudct objects that are favorited
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 selection:bg-rose-100 selection:text-rose-700 relative pb-24">
      
      {/* Dynamic Background subtle ambient circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-[400px] h-[400px] bg-rose-50/20 rounded-full blur-3xl pointer-events-none" />

      {/* Embedded synthesized ambient music player */}
      <MusicPlayer />

      {/* Global Interactive Confetti Core */}
      <Confetti 
        active={confettiActive} 
        onComplete={() => setConfettiActive(false)} 
        x={burstCoords?.x} 
        y={burstCoords?.y} 
      />

      {/* HERO / WELCOME HEADER SECTION */}
      <header className="relative pt-12 md:pt-16 pb-8 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          {/* Decorative floating balloon / crown indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50/60 border border-rose-100 rounded-full text-rose-400 font-medium text-xs tracking-wider uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5 text-editorial-pink animate-pulse" />
            <span>Slay-ный сюрприз для тебя</span>
          </div>

          <SparklesText
            text="С Днем Рождения!"
            className="font-display text-5xl md:text-6xl italic font-normal text-editorial-pink drop-shadow-xs mb-4 leading-tight"
            colors={{ first: "#F2A7B5", second: "#FFC2D1" }}
          />

          {/* Sparkles Core Visual Surprise */}
          <div className="w-full max-w-[40rem] h-28 relative mx-auto my-4 overflow-hidden rounded-2xl flex flex-col items-center justify-center">
            {/* Gradients */}
            <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-rose-300 to-transparent h-[2px] w-4/5 blur-xs" />
            <div className="absolute inset-x-12 top-0 bg-gradient-to-r from-transparent via-[#F2A7B5] to-transparent h-px w-4/5" />
            <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-amber-200 to-transparent h-[4px] w-1/2 blur-xs" />
            <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-amber-200 to-transparent h-px w-1/2" />

            {/* Core component */}
            <div className="w-full h-full absolute inset-0">
              <SparklesCore
                id="headerSparkles"
                background="transparent"
                minSize={0.8}
                maxSize={2.0}
                particleDensity={240}
                className="w-full h-full"
                particleColor="#F2A7B5"
                speed={0.8}
              />
            </div>
            
            <p className="relative z-10 font-display text-sm md:text-base italic text-stone-500/90 tracking-wide select-none">
              Пусть в твоей душе всегда сияют маленькие (или большие тут как сама хочешь) звезды ✨
            </p>

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-[#FDFBF7] [mask-image:radial-gradient(300px_100px_at_bottom,transparent_20%,white)] mix-blend-multiply"></div>
          </div>

          <p className="max-w-xl mx-auto text-stone-500 font-sans text-xs sm:text-sm tracking-widest uppercase leading-relaxed px-2">
            Маленький гид по твоим желаниям: здесь — идеи, на что можно потратить подарок с удовольствием.
          </p>
        </motion.div>
      </header>

      {/* INTERACTIVE ENVELOPE / GREETING LETTER MODULE */}
      <section className="relative z-20 px-4 mb-20">
        <BirthdayLetter onOpenWishlist={scrollToGrid} triggerConfetti={triggerConfetti} />
      </section>

      {/* WISHLIST GRID CORE CONTROLS */}
      <main 
        ref={listSectionRef} 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-500"
      >
        <div className="text-center mb-10 relative">
          {/* Sparkles background layer */}
          <div className="absolute inset-x-0 -top-10 bottom-0 pointer-events-none opacity-80 h-32 overflow-hidden">
            <SparklesCore
              id="gridHeaderSparkles"
              background="transparent"
              minSize={0.6}
              maxSize={1.6}
              particleDensity={140}
              className="w-full h-full"
              particleColor="#F2A7B5"
              speed={0.6}
            />
          </div>
          <h2 className="font-display text-3xl font-bold text-stone-800 mb-2 flex items-center justify-center gap-2 relative z-10">
            <span>Идеи для вдохновения</span>
            <Gift className="w-5 h-5 text-editorial-pink animate-bounce" />
          </h2>
          <p className="text-stone-400 text-xs tracking-wider uppercase font-light relative z-10">
            Выбирай то, что откликается в сердце
          </p>
        </div>

        {/* CUTE TABS LIST */}
        <div className="flex justify-center mb-12 border-b border-stone-200/50">
          <nav className="flex justify-center gap-6 md:gap-12 pb-px overflow-x-auto scrollbar-hide w-full max-w-2xl px-2">
            {(['Шмот', 'Чилл', 'Другое'] as CategoryName[]).map((tab) => {
              const isActive = activeTab === tab;
              const isStyleTab = tab === 'Шмот';
              const isBeautyTab = tab === 'Чилл';
              
              const icon = isStyleTab ? '🧥' : isBeautyTab ? '✨' : '⛺';

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn pb-3 text-xs md:text-sm font-bold tracking-tight uppercase border-b-2 transition-all duration-300 shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-editorial-pink text-stone-900 font-semibold'
                      : 'border-transparent text-stone-400 hover:text-stone-600'
                  }`}
                >
                  <span className="mr-1.5">{icon}</span>
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* MAIN 3-COLUMN RESPONSIVE LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* FLOATING ACTION WISHLIST MODULE */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-24 z-30 max-w-sm md:w-96 bg-white border border-rose-100 shadow-2xl p-6 rounded-3xl"
            style={{
              boxShadow: '0 20px 50px -12px rgba(242, 167, 181, 0.35)',
            }}
          >
            <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-editorial-pink animate-ping" />
                <h4 className="font-display font-bold text-stone-800 text-sm">Ваш выбор ({favorites.length})</h4>
              </div>
              <button
                onClick={clearFavorites}
                className="text-stone-400 hover:text-red-500 transition-colors duration-200 text-xs flex items-center gap-1 font-mono"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Очистить</span>
              </button>
            </div>

            {/* List scrollable box representing selected items */}
            <div className="max-h-40 overflow-y-auto mb-4 space-y-2 pr-1">
              {favoriteProducts.map((p) => (
                <div key={p.id} className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <img src={getDirectImageUrl(p.image)} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-stone-700 truncate">{p.title}</p>
                    <p className="text-[10px] text-stone-400 font-mono tracking-wider">{p.category}</p>
                  </div>
                  <button
                    onClick={(e) => handleToggleFavorite(p.id, e)}
                    className="text-stone-300 hover:text-editorial-pink p-1 shrink-0"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current text-editorial-pink" />
                  </button>
                </div>
              ))}
            </div>

            {/* Final checkout claim action */}
            <div className="w-full flex justify-center mt-2">
              <MetalButton
                variant="primary"
                onClick={() => {
                  triggerConfetti();
                  setIsSubmitModalOpen(true);
                }}
                className="w-80 h-12 uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <PartyPopper className="w-4 h-4 text-white shrink-0" />
                <span>Утвердить мой выбор! 🎉</span>
              </MetalButton>
            </div>
          </motion.div>
        )}
      </main>

      {/* DETAILED PREMIUM VISUAL HIGHLIGHTS & COSMIC LAMP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Lamp container showing glowing dynamic lighting */}
        <LampDemo />
      </section>

      {/* MODAL SUCCESS GREETING WINDOW */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full border border-rose-50 text-center relative overflow-hidden"
              style={{
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.2)',
              }}
            >
              {/* Decorative top ribbon */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-200 via-editorial-pink to-peach-200" />

              <div className="h-16 w-16 bg-rose-50 text-editorial-pink rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-100">
                <CheckCircle className="w-8 h-8 stroke-[1.5]" />
              </div>

              <h2 className="font-display text-2xl font-bold text-stone-900 mb-4">
                Прекрасный выбор! 🥂✨
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                Эти потрясающие вещи идеально подчеркнут твой уникальный шарм, подарят тепло и сделают жизнь еще красивее! Самое время побаловать себя и забрать свои подарки! ❤️
              </p>

              <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100/40 text-left mb-6 space-y-2">
                <span className="text-[10px] font-bold text-editorial-pink uppercase tracking-wider block">Твой список покупок:</span>
                <div className="max-h-24 overflow-y-auto space-y-1 text-xs text-stone-700 font-medium">
                  {favoriteProducts.map((p, idx) => (
                    <div key={p.id} className="flex items-center gap-1.5">
                      <span className="text-editorial-pink">✨</span>
                      <span>{p.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="w-full py-3 bg-stone-800 hover:bg-stone-950 text-white font-medium rounded-xl transition-all duration-200"
              >
                Вернуться к просмотру
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER WISH WITH LOVE */}
      <footer className="mt-24 border-t border-gray-100 py-10 px-12 bg-white/50 max-w-7xl mx-auto rounded-3xl shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-1">From your best friends with love</p>
            <p className="text-2xl font-display italic text-editorial-pink">Будь счастлива каждый день! ✨</p>
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-editorial-pink/10 flex items-center justify-center text-editorial-pink text-base cursor-pointer hover:scale-110 transition-transform duration-300">♥</div>
            <div className="w-10 h-10 rounded-full bg-editorial-pink/10 flex items-center justify-center text-editorial-pink text-base cursor-pointer hover:scale-110 transition-transform duration-300">🎂</div>
            <div className="w-10 h-10 rounded-full bg-editorial-pink/10 flex items-center justify-center text-editorial-pink text-base cursor-pointer hover:scale-110 transition-transform duration-300">🥂</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
