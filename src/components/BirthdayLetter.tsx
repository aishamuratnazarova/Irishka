import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Gift, Mail } from 'lucide-react';
import { MetalButton } from './ui/button';

interface BirthdayLetterProps {
  onOpenWishlist: () => void;
  triggerConfetti: (e?: React.MouseEvent) => void;
}

export default function BirthdayLetter({ onOpenWishlist, triggerConfetti }: BirthdayLetterProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenLetter = (e: React.MouseEvent) => {
    setIsOpened(true);
    triggerConfetti(e);
  };

  return (
    <div id="greeting-letter-section" className="flex flex-col items-center justify-center py-10 px-4 max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          // ENVELOPE state
          <motion.div
            key="envelope-view"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onClick={handleOpenLetter}
            className="cursor-pointer group relative bg-amber-50/50 backdrop-blur-md border border-peach-200 p-8 rounded-3xl shadow-xl w-full max-w-lg flex flex-col items-center justify-center text-center overflow-hidden"
            style={{
              borderColor: '#fcd34d30',
              boxShadow: '0 20px 40px -15px rgba(220, 190, 170, 0.25)',
            }}
          >
            {/* Soft ambient radial gradient behind */}
            <div className="absolute inset-0 bg-radial from-pink-50/40 via-transparent to-transparent opacity-70 pointer-events-none" />

            {/* Glowing active outline */}
            <div className="absolute inset-0 border border-transparent group-hover:border-pink-200/55 rounded-3xl transition-all duration-500 pointer-events-none" />

            {/* Float decorations */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="text-pink-300 mb-6 relative block"
            >
              <div className="relative">
                <Mail className="w-20 h-20 text-pink-200 stroke-[1.2]" />
                <Heart className="w-8 h-8 text-rose-300 fill-rose-300 absolute -top-2 -right-2 transform rotate-12 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                <Sparkles className="w-6 h-6 text-yellow-300/80 absolute -bottom-1 -left-3 animate-pulse" />
              </div>
            </motion.div>

            <h3 className="font-display text-2xl font-bold text-stone-800 mb-2 group-hover:text-rose-400 transition-colors duration-300">
              Тебе праздничное письмо!
            </h3>
            <p className="text-stone-500 font-sans text-sm max-w-xs mx-auto leading-relaxed mb-6">
              Внутри особенное поздравление с днем рождения и сюрприз... Нажми, чтобы распечатать конверт!
            </p>

            {/* Cute Vintage Wax Seal Button */}
            <div className="relative pointer-events-none">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-100 to-peach-100 text-pink-700 text-xs font-semibold tracking-widest uppercase rounded-full shadow-sm group-hover:from-pink-200 group-hover:to-peach-200 transition-all duration-300 border border-white">
                Открыть конверт 🌸
              </span>
            </div>

            {/* Micro decorative flowers */}
            <div className="absolute bottom-3 left-4 text-xs opacity-40">🌸</div>
            <div className="absolute bottom-3 right-4 text-xs opacity-40">✨</div>
            <div className="absolute top-4 left-4 text-xs opacity-30">🎀</div>
          </motion.div>
        ) : (
          // LETTER state
          <motion.div
            key="letter-view"
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="relative bg-[#FCFAF7] border border-[#f5ece2] p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-2xl text-stone-800 font-sans leading-relaxed"
            style={{
              backgroundImage: 'radial-gradient(#eedfce 0.5px, transparent 0.5px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Top decorative pink ribbon */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-200 via-rose-300 to-peach-200 rounded-t-3xl" />

            {/* Sparkly top flowers */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-2xl h-8 w-8 flex items-center justify-center bg-rose-50 rounded-full border border-rose-100 shadow-xs">🌸</div>
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Специально для тебя
              </span>
              <div className="text-2xl h-8 w-8 flex items-center justify-center bg-peach-50 rounded-full border border-peach-100 shadow-xs">✨</div>
            </div>

            <h2 className="font-display text-3xl md:text-4xl text-stone-800 text-center font-bold tracking-tight mb-8">
              Дорогая подруга! 💕
            </h2>

            {/* Main Greeting Typography */}
            <div className="space-y-6 text-stone-600 text-base md:text-lg font-sans font-light leading-relaxed">
              <p>
                <strong className="font-bold text-stone-800">С днюхой, кореш!</strong> 

Ты у меня чисто авторитет и полная имба, стэню твой вайб на все сто. Желаю, чтобы по жизни всё шло по понятиям: фарт пёр, бабло капало без всякого скама, а на душе была полная малина и никакого делюжна.
Меньше душни, флекси на максимум и оставайся такой же сигмой. Рил ценю тебя и наш общий движ. С праздником!
              </p>
              <p>
                В качестве главного подарка тебя ждет <strong className="font-semibold text-rose-500">денежный презент</strong>. Но мне очень хочется, чтобы эти средства превратились во что-то действительно запоминающееся, уютное и приятное для тебя! 
              </p>
              <p>
                Специально для этого я создала этот мини-сайт — твой личный <strong className="font-semibold text-stone-800">интерактивный праздничный вишлист</strong>. Здесь собраны потрясающие идеи вещей, которые идеально сочетаются с твоим стилем, создают домашний уют и помогают расслабиться.
              </p>
              <p className="italic bg-rose-50/50 p-4 rounded-2xl border border-rose-100/50 text-base">
                📖 <strong>Как это работает:</strong> Полистай разделы ниже, изучи подарки, добавляй в избранное (нажимая на сердечко ❤️) то, что запало в душу, и формируй идеальный коктейль подарков под свой вкус.
              </p>
            </div>

            {/* Warm closing signature */}
            <div className="mt-12 pt-8 border-t border-stone-200/60 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">С наилучшими пожеланиями,</p>
                <h4 className="font-display text-lg font-semibold text-stone-800">Твой заботливый друг ✨</h4>
              </div>

              {/* Action Button that scrolls down to wishlist and signals ready */}
              <MetalButton
                variant="primary"
                onClick={() => {
                  triggerConfetti();
                  onOpenWishlist();
                }}
                className="cursor-pointer font-bold flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 text-white shrink-0" />
                <span>Открыть вишлист 🎁</span>
              </MetalButton>
            </div>

            {/* Floating sparkle icon */}
            <div className="absolute -bottom-4 -left-2 text-stone-200 select-none pointer-events-none text-4xl">🌸</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
