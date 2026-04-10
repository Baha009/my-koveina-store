"use client";

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// 1. АВТО-СЛАЙДЕР КОМПОНЕНТІ
const ImageSlider = ({ images, modelName }: { images: string[], modelName: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images?.length]);

  if (!images || images.length === 0) return <div className="w-full aspect-[1792/2392] bg-gray-100 rounded-[2rem]" />;

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
  // Мұнда 'availableSizes' орнына 'sizes' қолданамыз
  const totalItemsInSeries = product.sizes?.length || 0;
  const totalSeriesPrice = product.price * totalItemsInSeries;

  return (
    <div className="border p-4 rounded-[2.5rem] shadow-sm bg-white hover:shadow-xl transition-all border-gray-100 text-center">
      <ImageSlider images={product.images} modelName={product.name} />
      <div className="mt-6 space-y-3">
        <h2 className="font-black text-xl uppercase italic tracking-tighter">{product.name}</h2>
        <div className="bg-gray-50 py-2 rounded-xl border border-gray-100 text-[10px] font-bold">
          ӨЛШЕМДЕР: {product.sizes?.join(' — ')}
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
// ... (жоғарғы ImageSlider мен ProductCard өзгеріссіз қалады)

// 3. НЕГІЗГІ БЕТ
export default function WholesaleStore() {
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [newProd, setNewProd] = useState({ name: "", price: 7000, folder: "", sizes: "35,36,37,38,39" });

  useEffect(() => {
    setMounted(true);
    const fetchProducts = async () => {
      // ТҮЗЕТІЛГЕН ЖОЛ: .order('created_at') дегенді алып тастадық
      const { data, error } = await supabase
        .from('products')
        .select('*'); 
      
      if (data) setProducts(data);
      if (error) console.error("База қатесі:", error.message);
    };
    fetchProducts();
  }, []);

  // ... (қалған код өзгеріссіз қалады)

  const handleAddToCart = (product: any) => {
    setCart([...cart, { ...product, cartId: Date.now(), totalSeriesPrice: product.price * product.sizes.length }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const sendOrder = () => {
    const grandTotal = cart.reduce((sum, i) => sum + i.totalSeriesPrice, 0);
    const message = `Сәлеметсіз бе! KOVEINA OPTOM-дан тапсырыс:\n\n${cart.map(i => `• ${i.name} (${i.sizes.join(',')})\n  Бағасы: ${i.totalSeriesPrice.toLocaleString()} ₸`).join('\n\n')}\n\nЖАЛПЫ: ${grandTotal.toLocaleString()} ₸`;
    window.open(`https://wa.me/77088082768?text=${encodeURIComponent(message)}`, '_blank');
  };

  const addProductToDB = async () => {
    // Размерлерді мәтін түрінде сақтаймыз (text[] массиві үшін)
    const sizesArray = newProd.sizes.split(',').map(s => s.trim());

    const imagesArray = [
      `/images/${newProd.folder}/1.png`,
      `/images/${newProd.folder}/2.png`,
      `/images/${newProd.folder}/3.png`,
      `/images/${newProd.folder}/4.png`,
      `/images/${newProd.folder}/5.png`
    ];

    const { error } = await supabase.from('products').insert([
      { 
        name: newProd.name, 
        price: newProd.price, 
        sizes: sizesArray, // Міне, мұнда тек 'sizes' деп жазылуы тиіс
        images: imagesArray 
      }
    ]);

    if (error) {
      alert("Қате: " + error.message);
    } else {
      alert("Тауар базаға сәтті сақталды!");
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-white min-h-screen text-black pb-32">
      <header className="p-6 border-b-2 border-black bg-white/90 backdrop-blur sticky top-0 z-50 flex justify-between items-center">
        <h1 className="text-2xl font-black italic tracking-tighter uppercase">KOVEINA</h1>
        <div className="flex items-center gap-4">
          <input 
            type="password" 
            placeholder="Admin..." 
            className="border p-2 rounded-lg text-[10px] w-20" 
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => password === "koveina2026" ? setIsAdmin(true) : alert("Қате!")} className="text-[10px] font-bold uppercase tracking-widest">OK</button>
          
          <button 
            onClick={() => document.getElementById('cart-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-black text-white px-5 py-2 rounded-full font-black flex items-center gap-3 active:scale-95 transition-all shadow-lg"
          >
            <span className="text-[10px] uppercase tracking-widest">корзина</span>
            <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold">{cart.length}</span>
          </button>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 md:p-12">
        {isAdmin && (
          <div className="mb-20 p-8 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-[2.5rem] space-y-4">
            <h2 className="font-black uppercase italic">Жаңа тауар қосу (Database)</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="text" placeholder="Аты (1803 WHITE)" className="p-3 border rounded-xl" onChange={(e) => setNewProd({...newProd, name: e.target.value})} />
              <input type="number" placeholder="Бағасы" className="p-3 border rounded-xl" onChange={(e) => setNewProd({...newProd, price: Number(e.target.value)})} />
              <input type="text" placeholder="Папка аты (090-62)" className="p-3 border rounded-xl" onChange={(e) => setNewProd({...newProd, folder: e.target.value})} />
              <input type="text" placeholder="Размерлер (35,36...)" className="p-3 border rounded-xl" defaultValue="35,36,37,38,39" onChange={(e) => setNewProd({...newProd, sizes: e.target.value})} />
            </div>
            <button onClick={addProductToDB} className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase">Базаға сақтау</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {cart.length > 0 && (
          <div id="cart-section" className="mt-32 p-6 md:p-10 bg-white border-2 border-black rounded-[2.5rem] shadow-xl max-w-[800px] mx-auto text-left">
            <h2 className="text-2xl font-black mb-8 uppercase italic border-b-2 border-black pb-2 inline-block text-left">Тапсырыс тізімі</h2>
            <div className="space-y-6 mb-10">
              {cart.map((item) => (
                <div key={item.cartId} className="flex justify-between items-start border-b border-gray-100 pb-4 gap-4">
                  <div className="space-y-1 text-left">
                    <p className="font-bold text-sm uppercase tracking-tight">{item.name}</p>
                    <p className="text-gray-400 font-medium text-[10px] tracking-wider uppercase text-left">Жиынтық: {item.sizes?.join(', ')}</p>
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
            <button onClick={sendOrder} className="w-full bg-[#25D366] text-white py-5 rounded-2xl text-lg font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all">
              WhatsApp-қа жіберу
            </button>
          </div>
        )}
      </main>
    </div>
  );
}