"use client";

export default function Home() {
  // ТАУАРЛАРДЫ ОСЫ ЖЕРГЕ ҚОЛМЕН ЖАЗАСЫЗ:
  const products = [
    {
      id: 1,
      name: "KOVEINA Лоферы 090-132",
      price: "19 888",
      img: "/images/313-29/1.jpeg", // СУРЕТТІҢ АТЫ ДӘЛ ОСЫЛАЙ БОЛУЫ КЕРЕК
      link: "https://kaspi.kz/shop/p/tufli-koveina-313-29-chernyi-40-161997143/" // КАСПИЙДЕГІ СІЛТЕМЕСІ
    },
    {
      id: 2,
      name: "KOVEINA Ботинки K-524",
      price: "32 000",
      img: "/images/313-29/2.jpeg", // ЕКІНШІ СУРЕТТІҢ АТЫ
      link: "https://kaspi.kz/shop/p/c-114227914/"
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-[480px] mx-auto bg-white min-h-screen pb-24 shadow-2xl">
        <header className="p-6 border-b sticky top-0 bg-white/90 backdrop-blur-md z-50 text-center">
          <h1 className="text-2xl font-black italic tracking-tighter uppercase">KOVEINA</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 italic">Handmade Collection</p>
        </header>

        <div className="p-4 space-y-10">
          {products.map((item) => (
            <div key={item.id} className="group border rounded-[2rem] overflow-hidden bg-white shadow-sm">
              <a href={item.link} target="_blank">
                <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
                  <img 
                    src={item.img} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </a>
              <div className="p-6 text-center space-y-3">
                <h2 className="text-lg font-bold text-gray-800 leading-tight">{item.name}</h2>
                <p className="text-3xl font-[1000] text-black tracking-tight">{item.price} ₸</p>
                <a 
                  href={item.link} 
                  target="_blank" 
                  className="block w-full bg-black text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all no-underline"
                >
                  KASPI-ДЕН ТАПСЫРЫС БЕРУ
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-6 left-0 right-0 px-6 z-50 max-w-[480px] mx-auto">
          <a href="https://wa.me/77051183038" className="flex items-center justify-center bg-[#25D366] text-white py-4.5 rounded-full font-black shadow-2xl uppercase text-[10px] tracking-widest no-underline">
            WhatsApp-қа жазу
          </a>
        </div>
      </div>
    </div>
  );
}
