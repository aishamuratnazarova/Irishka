import React from 'react';
import { motion } from 'motion/react';
import { Heart, ExternalLink, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { getDirectImageUrl } from '../lib/utils';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export default function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl overflow-hidden border border-amber-100/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
      style={{
        boxShadow: '0 10px 30px -15px rgba(220, 190, 175, 0.15)',
      }}
    >
      {/* Image container & Badges */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-50">
        <motion.img
          loading="lazy"
          src={getDirectImageUrl(product.image)}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Category & Badge overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          {product.badge && (
            <span className="px-3 py-1 bg-[#F2A7B5] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.priceTag && (
            <span className="px-3 py-1 bg-white/95 backdrop-blur-xs text-stone-700 text-[10px] font-medium rounded-full shadow-xs border border-stone-200/30">
              {product.priceTag}
            </span>
          )}
        </div>

        {/* Favorite "Heart" Button with bounce */}
        <button
          onClick={(e) => onToggleFavorite(product.id, e)}
          className={`absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isFavorite
              ? 'bg-[#F2A7B5] text-white'
              : 'bg-white/90 backdrop-blur-xs text-stone-600 hover:text-[#F2A7B5] hover:bg-white'
          }`}
          aria-label="Добавить в избранное"
        >
          <Heart
            className={`w-5 h-5 transition-transform duration-300 ${
              isFavorite ? 'scale-110 fill-current' : 'scale-100'
            }`}
          />
        </button>

        {/* Soft shadow/gradient overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-stone-900/10 to-transparent pointer-events-none" />
      </div>

      {/* Content description */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#B5A190]">
            {product.category}
          </span>
        </div>

        <h4 className="font-display text-lg font-bold text-stone-800 mb-3 group-hover:text-editorial-pink transition-colors duration-300">
          {product.title}
        </h4>

        <p className="text-stone-500 text-sm font-light leading-relaxed mb-6 flex-1">
          {product.description}
        </p>

        {/* Actions layout */}
        <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
          <a
            id={`btn-view-${product.id}`}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-100 to-peach-100 text-pink-700 text-xs font-semibold tracking-widest uppercase rounded-full shadow-sm hover:from-pink-200 hover:to-peach-200 transition-all duration-300 border border-white"
          >
            <span>Посмотреть</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Micro confirmation indicator */}
          {isFavorite && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="h-10 px-3 bg-rose-50 text-editorial-pink rounded-2xl flex items-center justify-center gap-1 text-xs font-semibold border border-rose-100/30"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Хочу!</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
