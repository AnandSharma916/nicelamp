import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[#090a0d] px-4 text-center">
      <div className="max-w-lg">
        <div className="w-16 h-16 rounded-2xl bg-[#14171d] border border-[#c5a880]/30 flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Compass className="w-8 h-8 text-[#c5a880]" />
        </div>
        <span className="text-xs font-mono text-[#c5a880] uppercase tracking-luxury block mb-2 font-semibold">
          Error 404 — Elevation Not Found
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight mb-4">
          Uncharted Coordinate
        </h1>
        <p className="text-sm text-neutral-400 mb-8 leading-relaxed font-light">
          The luminaire specification or catalog page you are seeking has either transitioned or does not exist.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/"
            className="btn-gold px-7 py-3 rounded-xl text-xs font-semibold uppercase tracking-luxury inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>
          <Link
            to="/catalog"
            className="btn-outline-gold px-7 py-3 rounded-xl text-xs font-semibold uppercase tracking-luxury"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
};
