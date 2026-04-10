"use client";

import { useState, useEffect } from 'react';

// 1. АВТО-СЛАЙДЕР КОМПОНЕНТІ
const ImageSlider = ({ images, modelName }: { images: string[], modelName: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full aspect-[1792/2392] overflow-hidden rounded-[2rem] bg-gray-100 shadow-inner group">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          alt={modelName}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      ))}
    </div>
  );
};

// 2. ТАУАР КАРТОЧКАСЫ
const ProductCard = ({ product, onAddToCart }: { product: any, onAddToCart: (p: any) => void }) => {
  const totalItemsInSeries = product.availableSizes.length;
  const totalSeriesPrice = product.price * totalItemsInSeries;

  return (
    <div className="border p-4 rounded-[2.5rem] shadow-sm bg-white hover:shadow-xl transition-all border-gray-100 text-center">
      <ImageSlider images={product.images} modelName={product.name} />
      <div className="mt-6 space-y-3">
        <h2 className="font-black text-xl uppercase italic tracking-tighter">{product.name}</h2>
        <div className="bg-gray-50 py-2 rounded-xl border border-gray-100 text-[10px] font-bold">
          ӨЛШЕМДЕР: {product.availableSizes.join(' — ')}
        </div>
        <div className="py-2">
  <p className="text-red-600 text-xl font-black uppercase tracking-tight">
    Бір жұп: {product.price.toLocaleString()} ₸
  </p>
  <p className="text-3xl font-[1000] tracking-tighter italic text-black mt-2">
    {totalSeriesPrice.toLocaleString()} ₸
  </p>
  <p className="text-[10px] font-black text-gray-400 uppercase mt-1 tracking-widest italic">
    ({totalItemsInSeries} жұптан тұратын серия)
  </p>
</div>
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-sm tracking-widest active:scale-95 transition-all"
        >
          СЕРИЯНЫ ҚОСУ
        </button>
      </div>
    </div>
  );
};

// 3. НЕГІЗГІ БЕТ
export default function WholesaleStore() {
  const [mounted, setMounted] = useState(false);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => setMounted(true), []);

const products = [
    {
      id: "KV-1803-WHITE",
      name: "KOVEINA 1803 WHITE",
      price: 6000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/1803 white/1.png", "/images/1803 white/2.png", "/images/1803 white/3.png","/images/1803 white/4.png","/images/1803 white/5.png","/images/1803 white/6.png","/images/1803 white/7.png"]
    },
    {
      id: "KV-1803-BLACK",
      name: "KOVEINA 1803 BLACK",
      price: 6000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/1803 black/1.png", "/images/1803 black/2.png", "/images/1803 black/3.png", "/images/1803 black/4.png", "/images/1803 black/5.png", "/images/1803 black/6.png", "/images/1803 black/7.png"]
    },
    {
      id: "KV-1803-RED",
      name: "KOVEINA 1803 RED",
      price: 6000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/1803 red/1.png", "/images/1803 red/2.png", "/images/1803 red/3.png", "/images/1803 red/4.png", "/images/1803 red/5.png", "/images/1803 red/6.png", "/images/1803 red/7.png"]
    },
    {
      id: "KV-1809-BLAK",
      name: "KOVEINA 1809 BLAK",
      price: 6000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/1809 blak/1.png", "/images/1809 blak/2.png", "/images/1809 blak/3.png", "/images/1809 blak/4.png", "/images/1809 blak/5.png", "/images/1809 blak/6.png", "/images/1809 blak/7.png"]
    },
    {
      id: "KV-1809-RED",
      name: "KOVEINA 1809 RED",
      price: 6000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/1809 red/1.png", "/images/1809 red/2.png", "/images/1809 red/3.png", "/images/1809 red/4.png", "/images/1809 red/5.png", "/images/1809 red/6.png", "/images/1809 red/7.png"]
    },
 
    {
      id: "KV-G-35-GREY",
      name: "KOVEINA G-35 GREY",
      price: 7000,
      availableSizes: [35,36, 37, 38, 39, 40,],
      images: ["/images/G-35 grey/1.png", "/images/G-35 grey/2.png", "/images/G-35 grey/3.png", "/images/G-35 grey/4.png", "/images/G-35 grey/5.png", "/images/G-35 grey/6.png", "/images/G-35 grey/7.png"]
    },
    {
      id: "KV-G-35-WHITE",
      name: "KOVEINA G-35 WHITE",
      price: 7000,
      availableSizes: [35,36, 37, 38, 39, 40,],
      images: ["/images/G-35 white/1.png", "/images/G-35 white/2.png", "/images/G-35 white/3.png", "/images/G-35 white/4.png", "/images/G-35 white/5.png", "/images/G-35 white/6.png", "/images/G-35 white/7.png"]
    },
     {
      id: "KV-G-19-BLAK",
      name: "KOVEINA G-19 BLAK",
      price: 7000,
      availableSizes: [35,36, 37, 38, 39, 40,],
      images: ["/images/G-19 blak/1.png", "/images/G-19 blak/2.png", "/images/G-19 blak/3.png", "/images/G-19 blak/4.png", "/images/G-19 blak/5.png", "/images/G-19 blak/6.png", "/images/G-19 blak/7.png"]
    },
    {
      id: "KV-G-19-WHITE",
      name: "KOVEINA G-19 WHITE",
      price: 7000,
      availableSizes: [35,36, 37, 38, 39, 40,],
      images: ["/images/G-19 white/1.png", "/images/G-19 white/2.png", "/images/G-19 white/3.png", "/images/G-19 white/4.png", "/images/G-19 white/5.png", "/images/G-19 white/6.png", "/images/G-19 white/7.png"]
    },
     {
      id: "KV-2632-YELLOW",
      name: "KOVEINA 2632 YELLOW",
      price: 5000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/2632 yellow/1.png", "/images/2632 yellow/2.png", "images/2632 yellow/3.png", "images/2632 yellow/4.png", "/images/2632 yellow/5.png", "/images/2632 yellow/6.png", "/images/2632 yellow/7.png"]
    },
    {
      id: "KV-2632-BLUE",
      name: "KOVEINA 2632 BLUE",
      price: 5000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/2632 blue/1.png", "/images/2632 blue/2.png", "images/2632 blue/3.png", "images/2632 blue/4.png", "/images/2632 blue/5.png", "/images/2632 blue/6.png", "/images/2632 blue/7.png"]
    },
     {
      id: "KV-2632-RED",
      name: "KOVEINA 2632 RED",
      price: 5000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/2632 red/1.png", "/images/2632 red/2.png", "images/2632 red/3.png", "images/2632 red/4.png", "/images/2632 red/5.png", "/images/2632 red/6.png", "/images/2632 red/7.png"]
    },

     {
      id: "KV-2633-YELLOW",
      name: "KOVEINA 2633 YELLOW",
      price: 5000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/2633 yellow/1.png", "/images/2633 yellow/2.png", "images/2633 yellow/3.png", "images/2633 yellow/4.png", "/images/2633 yellow/5.png", "/images/2633 yellow/6.png", "/images/2633 yellow/7.png"]
    },
    {
      id: "KV-2633-SILVER",
      name: "KOVEINA 2633 SILVER",
      price: 5000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/2633 silver/1.png", "/images/2633 silver/2.png", "images/2633 silver/3.png", "images/2633 silver/4.png", "/images/2633 silver/5.png", "/images/2633 silver/6.png", "/images/2633 silver/7.png"]
    },
     {
      id: "KV-2633-RED",
      name: "KOVEINA 2633 RED",
      price: 5000,
      availableSizes: [35,36, 37, 38, 39,],
      images: ["/images/2633 red/1.png", "/images/2633 red/2.png", "images/2633 red/3.png", "images/2633 red/4.png", "/images/2633 red/5.png", "/images/2633 red/6.png", "/images/2633 red/7.png"]
    },
    {
      id: "KV-090-62",
      name: "KOVEINA 090-62",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/090-62/1.png", "/images/090-62/2.png", "images/090-62/3.png", "images/090-62/4.png", "/images/090-62/5.png"]
    },
    {
      id: "KV-090-62",
      name: "KOVEINA 090-64",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/090-64/1.png", "/images/090-64/2.png", "images/090-64/3.png", "images/090-64/4.png", "/images/090-64/5.png"]
    },
    {
      id: "KV-090-63",
      name: "KOVEINA 090-63",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/090-63/1.png", "/images/090-63/2.png", "images/090-63/3.png", "images/090-63/4.png", "/images/090-63/5.png"]
    },
    {
      id: "KV-090-121",
      name: "KOVEINA 090-121",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/090-121/1.png", "/images/090-121/2.png", "images/090-121/3.png", "images/090-121/4.png", "/images/090-121/5.png"]
    },
    {
      id: "KV-090-126",
      name: "KOVEINA 090-126",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/090-126/1.png", "/images/090-126/2.png", "images/090-126/3.png", "images/090-126/4.png", "/images/090-126/5.png"]
    },
    {
      id: "KV-313-3",
      name: "KOVEINA 313-3",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-3/1.png", "/images/313-3/2.png", "images/313-3/3.png", "images/313-3/4.png", "/images/313-3/5.png"]
    },
    {
      id: "KV-313-7",
      name: "KOVEINA 313-7",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-7/1.png", "/images/313-7/2.png", "images/313-7/3.png", "images/313-7/4.png", "/images/313-7/5.png"]
    },
    {
      id: "KV-313-8",
      name: "KOVEINA 313-8",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-8/1.png", "/images/313-8/2.png", "images/313-8/3.png", "images/313-8/4.png", "/images/313-8/5.png"]
    },
    {
      id: "KV-313-9",
      name: "KOVEINA 313-9",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-9/1.png", "/images/313-9/2.png", "images/313-9/3.png", "images/313-9/4.png", "/images/313-9/5.png"]
    },
     {
      id: "KV-313-11",
      name: "KOVEINA 313-11",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-11/1.png", "/images/313-11/2.png", "images/313-11/3.png", "images/313-11/4.png", "/images/313-11/5.png"]
    },
   {
      id: "KV-313-12",
      name: "KOVEINA 313-12",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-12/1.png", "/images/313-12/2.png", "images/313-12/3.png", "images/313-12/4.png", "/images/313-12/5.png"]
    }, 
    {
      id: "KV-313-13",
      name: "KOVEINA 313-13",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-13/1.png", "/images/313-13/2.png", "images/313-13/3.png", "images/313-13/4.png", "/images/313-13/5.png"]
    }, 
    {
      id: "KV-313-17",
      name: "KOVEINA 313-17",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-17/1.png", "/images/313-17/2.png", "images/313-17/3.png", "images/313-17/4.png", "/images/313-17/5.png"]
    }, 
    {
      id: "KV-313-18",
      name: "KOVEINA 313-18",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-18/1.png", "/images/313-18/2.png", "images/313-18/3.png", "images/313-18/4.png", "/images/313-18/5.png"]
    }, 
     {
      id: "KV-313-19",
      name: "KOVEINA 313-19",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-19/1.png", "/images/313-19/2.png", "images/313-19/3.png", "images/313-19/4.png", "/images/313-19/5.png", "/images/313-19/6.png"]
    }, 
     {
      id: "KV-313-21",
      name: "KOVEINA 313-21",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-21/1.png", "/images/313-21/2.png", "images/313-21/3.png", "images/313-21/4.png", "/images/313-21/5.png"]
    }, 
     {
      id: "KV-313-24",
      name: "KOVEINA 313-24",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-24/1.png", "/images/313-24/2.png", "images/313-24/3.png", "images/313-24/4.png", "/images/313-24/5.png"]
    }, 
    {
      id: "KV-313-25",
      name: "KOVEINA 313-25",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-25/1.png", "/images/313-25/2.png", "images/313-25/3.png", "images/313-25/4.png", "/images/313-25/5.png"]
    },
    {
      id: "KV-313-27",
      name: "KOVEINA 313-27",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-27/1.png", "/images/313-27/2.png", "images/313-27/3.png", "images/313-27/4.png", "/images/313-27/5.png"]
    },
     {
      id: "KV-313-28",
      name: "KOVEINA 313-28",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-28/1.png", "/images/313-28/2.png", "images/313-28/3.png", "images/313-28/4.png", "/images/313-28/5.png"]
    },
    {
      id: "KV-313-29",
      name: "KOVEINA 313-29",
      price: 8000,
      availableSizes: [35,36, 37, 38, 39,40,],
      images: ["/images/313-29/1.png", "/images/313-29/2.png", "images/313-29/3.png", "images/313-29/4.png", "/images/313-29/5.png"]
    },
  ];

  const handleAddToCart = (product: any) => {
    setCart([...cart, { ...product, cartId: Date.now(), totalSeriesPrice: product.price * product.availableSizes.length }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const sendOrder = () => {
    const grandTotal = cart.reduce((sum, i) => sum + i.totalSeriesPrice, 0);
    const message = `Сәлеметсіз бе! KOVEINA OPTOM-дан тапсырыс:\n\n${cart.map(i => `• ${i.name} (${i.availableSizes.join(',')})\n  Бағасы: ${i.totalSeriesPrice.toLocaleString()} ₸`).join('\n\n')}\n\nЖАЛПЫ: ${grandTotal.toLocaleString()} ₸`;
    window.open(`https://wa.me/77088082768?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen text-black pb-32">
      {/* HEADER */}
      <header className="p-6 border-b-2 border-black bg-white/90 backdrop-blur sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">KOVEINA</h1>
        <button 
          onClick={() => {
            const section = document.getElementById('cart-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-black text-white px-5 py-2 rounded-full font-black flex items-center gap-3 active:scale-95 transition-all shadow-lg"
        >
          <span className="text-[10px] uppercase tracking-widest">корзина</span>
          <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">{cart.length}</span>
        </button>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 md:p-12">
        {/* ТАУАРЛАР ТІЗІМІ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* СЕБЕТ БӨЛІМІ (CART SECTION) */}
        {cart.length > 0 && (
          <div id="cart-section" className="mt-32 p-6 md:p-10 bg-white border-2 border-black rounded-[2.5rem] shadow-xl max-w-[800px] mx-auto animate-in fade-in slide-in-from-bottom-10">
            <h2 className="text-2xl font-black mb-8 uppercase italic border-b-2 border-black pb-2 inline-block">Тапсырыс тізімі</h2>
            
            <div className="space-y-6 mb-10">
              {cart.map((item) => (
                <div key={item.cartId} className="flex justify-between items-start border-b border-gray-100 pb-4 gap-4">
                  <div className="space-y-1">
                    <p className="font-bold text-sm uppercase tracking-tight">{item.name}</p>
                    <p className="text-gray-400 font-medium text-[10px] tracking-wider uppercase">Жиынтық: {item.availableSizes.join(', ')}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-black text-base whitespace-nowrap">{item.totalSeriesPrice.toLocaleString()} ₸</p>
                    <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 font-bold uppercase text-[9px] hover:bg-red-50 px-2 py-1 rounded">Өшіру</button>
                  </div>
                </div>
              ))}

              <div className="pt-6 flex justify-between items-center">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Жалпы сомма:</span>
                <span className="text-4xl font-black italic tracking-tighter">
                  {cart.reduce((a, b) => a + b.totalSeriesPrice, 0).toLocaleString()} ₸
                </span>
              </div>
            </div>

            <button 
              onClick={sendOrder} 
              className="w-full bg-[#25D366] text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span>WhatsApp-қа жіберу</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}