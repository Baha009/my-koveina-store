"use client";

import { useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

export default function Home() {
  const [groupedOffers, setGroupedOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/ACTIVE.xml')
      .then((res) => res.text())
      .then((xmlData) => {
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
        const jsonObj = parser.parse(xmlData);
        let products = jsonObj.kaspi_catalog.offers.offer;
        if (!Array.isArray(products)) products = [products];

        // --- МОДЕЛЬДЕРДІ ТОПТАСТЫРУ ЛОГИКАСЫ ---
        const groups: { [key: string]: any } = {};
        
        products.forEach((item: any) => {
          // Тауар атынан размерді алып тастап, модель атын тазалаймыз
          // Мысалы: "Лоферы KOVEINA 090-132 черный 38" -> "Лоферы KOVEINA 090-132 черный"
          const modelName = item.model.replace(/\s\d{2}$/, "").trim(); 
          
          if (!groups[modelName]) {
            groups[modelName] = {
              model: modelName,
              brand: item.brand || 'KOVEINA',
              price: item.cityprices.cityprice,
              sku: item.sku, 
              // Бір модельге жататын барлық SKU-ларды жинаймыз (әрқайсысының өз суреті болуы мүмкін)
              allSkus: [item.sku]
            };
          } else {
            if (!groups[modelName].allSkus.includes(item.sku)) {
              groups[modelName].allSkus.push(item.sku);
            }
          }
        });

        setGroupedOffers(Object.values(groups));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-bounce text-red-600 font-black text-2xl italic">KOVEINA...</div>
    </div>
  );

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans antialiased">
      <div className="max-w-[480px] mx-auto bg-white min-h-screen shadow-2xl relative pb-28">
        
        {/* Header */}
        <header className="p-6 border-b sticky top-0 bg-white/95 backdrop-blur-md z-50 text-center">
          <h1 className="text-2xl font-[1000] tracking-tighter text-black italic uppercase">KOVEINA</h1>
          <p className="text-[9px] text-gray-400 font-bold tracking-[0.3em] mt-1 uppercase">Selection of {groupedOffers.length} Models</p>
        </header>

        {/* Тауарлар тізімі */}
        <div className="p-4 space-y-12">
          {groupedOffers.map((group: any) => (
            <div key={group.model} className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              
              {/* 1. ГАЛЕРЕЯ (Horizontal Scroll) */}
              <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3 rounded-[2.5rem]">
                {/* Бірнеше суретті көрсету үшін (Kaspi-дегі SKU бойынша) */}
                {[1, 2, 3].map((imgIndex) => (
                  <div key={imgIndex} className="min-w-[85%] snap-center aspect-[3/4] bg-[#f7f7f7] relative overflow-hidden rounded-[2rem] border border-gray-100">
                    <img 
                      src={`https://resources.cdn-kaspi.kz/img/m/p/${String(group.sku).split('_')[0]}/general/720/${imgIndex}.jpg`}
                      alt={group.model}
                      className="w-full h-full object-contain p-6"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Егер сурет табылмаса, оны жасырып тастаймыз
                        target.parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* 2. ТАУАР МӘЛІМЕТІ */}
              <div className="mt-6 px-3 text-center">
                <h2 className="text-xl font-extrabold text-gray-900 leading-tight">
                  {group.model}
                </h2>
                
                <div className="mt-5 flex flex-col items-center gap-4">
                  <span className="text-3xl font-[1000] text-black">
                    {Number(group.price).toLocaleString('ru-RU')} ₸
                  </span>

                  {/* Кнопка: Каспийге өту */}
                  <a 
                    href={`https://kaspi.kz/shop/p/c-${group.sku}/?sellerId=30381004`}
                    target="_blank"
                    className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm tracking-widest uppercase shadow-2xl active:scale-95 transition-all"
                  >
                    Өлшемді таңдап, сатып алу
                  </a>
                  
                  <p className="text-[10px] text-gray-400 font-medium">
                    * Каспий қосымшасында барлық өлшемдер қолжетімді
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Төменгі WhatsApp бөлімі */}
        <div className="fixed bottom-6 left-0 right-0 px-6 z-50 max-w-[480px] mx-auto">
          <a href="https://wa.me/7XXXXXXXXXX" className="flex items-center justify-center gap-3 bg-[#25D366] text-white w-full py-4 rounded-full font-black shadow-2xl uppercase text-[11px] tracking-widest">
            Менеджермен байланысу
          </a>
        </div>

      </div>
    </div>
  );
}