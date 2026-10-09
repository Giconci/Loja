"use client";
import { useState, useEffect } from "react";

type HeroBanner = {
  id: number;
  desktop: string;
  mobile: string;
};

export default function Hero() {
  const [banners] = useState<HeroBanner[]>([
    {
      id: 1,
      desktop: "/images/banner1-desktop.jpg", // ✅ versão desktop
      mobile: "/images/banner1-mobile.jpg",   // ✅ versão mobile
    },
    {
      id: 2,
      desktop: "/images/banner2-desktop.jpg",
      mobile: "/images/banner2-mobile.jpg",
    },
    {
      id: 3,
      desktop: "/images/banner3-desktop.jpg",
      mobile: "/images/banner3-mobile.jpg",
    },
  ]);

  const [current, setCurrent] = useState(0);

  // 🔹 Troca o banner a cada 5 segundos
  useEffect(() => {
    if (banners.length > 0) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [banners]);

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full mb-18 h-64 md:h-96 overflow-hidden"> {/* altura ajustada para desktop e mobile */}
      {/* 🔹 Aqui o <picture> define qual imagem usar */}
      <picture>
        {/* versão mobile: usada quando a tela tem até 768px */}
        <source media="(max-width: 768px)" srcSet={banners[current].mobile} />
        
        {/* versão desktop: usada em telas maiores */}
        <img
          src={banners[current].desktop}
          alt={`Banner ${current + 1}`}
          className="w-full h-auto object-cover transition-opacity duration-500"
        />
      </picture>

      {/* 🔹 Overlay com texto centralizado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black/30">
        <h1 className="text-3xl md:text-5xl font-bold">Bem-vindo à nossa loja</h1>
        <p className="mt-2 text-lg md:text-xl">Roupas, Tênis e Cadarços</p>
      </div>
    </div>
  );
}
