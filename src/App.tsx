import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Instagram, 
  Facebook,
  Clock,
  Pizza
} from 'lucide-react';
import { Background3D } from './components/Background3D';

// Types
interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface PizzaFlavor {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ADD_ONS: AddOn[] = [
  { id: 'olives', name: 'Olives', price: 100 },
  { id: 'jalapenos', name: 'Jalapeños', price: 100 },
  { id: 'mushrooms', name: 'Mushrooms', price: 100 },
];

const PIZZA_FLAVORS: PizzaFlavor[] = [
  { 
    id: 1, 
    name: 'Margherita', 
    description: 'Classic tomato base with mozzarella and fresh basil.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 2, 
    name: 'Pepperoni', 
    description: 'Double pepperoni with extra mozzarella cheese.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 3, 
    name: 'BBQ Chicken', 
    description: 'Tender chicken strips with tangy smoky BBQ sauce.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 4, 
    name: 'Veggie Supreme', 
    description: 'Loaded with bell peppers, onions, tomatoes, and corn.',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: 5, 
    name: 'Spicy Tikka', 
    description: 'Local favorite: Spicy chicken tikka with onions and chillies.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800'
  },
];

const BASE_PRICE = 2500;
const PHONE_NUMBER = '0301-0901555';
const WHATSAPP_URL = 'https://wa.me/923010901555';
const ACCENT_COLOR = '#00A3FF';

const PizzaCard = ({ pizza }: { pizza: PizzaFlavor; key?: React.Key }) => {
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set());

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalPrice = BASE_PRICE + (selectedAddOns.size * 100);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#00A3FF]/30 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={pizza.image} 
          alt={pizza.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{pizza.name}</h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
          {pizza.description}
        </p>

        <div className="space-y-3 mb-6">
          <p className="text-xs font-semibold text-[#00A3FF] uppercase tracking-wider">Extra Add-ons (+100 each)</p>
          <div className="flex flex-wrap gap-2">
            {ADD_ONS.map(addon => (
              <label 
                key={addon.id}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all border
                  ${selectedAddOns.has(addon.id) 
                    ? 'bg-[#00A3FF] border-[#00A3FF] text-white shadow-[0_0_10px_rgba(0,163,255,0.4)]' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}
                `}
              >
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={selectedAddOns.has(addon.id)}
                  onChange={() => toggleAddOn(addon.id)}
                />
                {addon.name}
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <span className="text-gray-500 text-xs block mb-0.5">Price</span>
            <span className="text-2xl font-black text-white">Rs. {totalPrice}</span>
          </div>
          <button 
            onClick={() => window.open(WHATSAPP_URL, '_blank')}
            className="bg-white/5 hover:bg-white/10 text-white p-2.5 rounded-xl transition-colors group/btn"
          >
            <MessageCircle size={20} className="group-hover:text-[#00A3FF] transition-colors" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#00A3FF]/30 selection:text-[#00A3FF]">
      <Background3D />
      {/* Sticky Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#121212]/80 backdrop-blur-md py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#00A3FF] p-1.5 rounded-lg shadow-[0_0_15px_rgba(0,163,255,0.5)]">
              <Pizza className="text-[#121212]" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white group-hover:text-[#00A3FF] transition-colors">
              PIZZA <span className="text-[#00A3FF]">CHIZZA</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('menu')} className="hover:text-[#00A3FF] transition-colors">Menu</button>
            <button onClick={() => scrollToSection('location')} className="hover:text-[#00A3FF] transition-colors">Location</button>
            <a 
              href={`tel:${PHONE_NUMBER.replace('-', '')}`}
              className="bg-[#00A3FF] text-[#121212] px-6 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#00A3FF]/20 flex items-center gap-2"
            >
              <Phone size={16} />
              <span>Order: {PHONE_NUMBER}</span>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-[#00A3FF] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-[#1a1a1a] border-b border-white/5 md:hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <button onClick={() => scrollToSection('menu')} className="text-left text-lg font-medium py-2">Menu</button>
                <button onClick={() => scrollToSection('location')} className="text-left text-lg font-medium py-2">Location</button>
                <a 
                  href={`tel:${PHONE_NUMBER.replace('-', '')}`}
                  className="bg-[#00A3FF] text-[#121212] p-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  Order: {PHONE_NUMBER}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00A3FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00A3FF]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-10"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00A3FF] text-xs font-bold uppercase tracking-widest mb-6">
                Fresh • Hot • Fast
              </span>
              <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                The Best <br />
                <span className="text-[#00A3FF] relative">
                  Crust
                  <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#00A3FF]/20 -skew-x-12" />
                </span> in <br />
                G-13.
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-md mb-10 leading-relaxed font-light">
                Experience artisanal pizzas made with locally sourced toppings and our signature urban-style thin crust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="bg-[#00A3FF] text-[#121212] px-10 py-5 rounded-2xl font-black text-lg hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(0,163,255,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  View Menu
                  <ChevronRight size={20} />
                </button>
                <div className="flex items-center gap-4 px-6 py-5">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#121212] bg-[#1a1a1a] overflow-hidden">
                        <img 
                          src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                          alt="Customer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex gap-0.5 text-[#00A3FF]">
                      {'★★★★★'.split('').map((s, i) => <span key={i} className="text-sm">★</span>)}
                    </div>
                    <span className="text-sm text-gray-400">500+ Happy Foodies</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Right */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[#00A3FF]/20 rounded-full blur-[100px] animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1593504049359-74330189a045?auto=format&fit=crop&q=80&w=1200" 
                alt="Signature Pizza" 
                className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-[5deg] hover:rotate-0 transition-transform duration-700"
              />
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 right-0 z-20 bg-[#1a1a1a] border border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#00A3FF] p-2 rounded-lg">
                    <Clock size={20} className="text-[#121212]" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Delivery Time</span>
                    <span className="font-bold">25-30 Mins</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#00A3FF] font-bold uppercase tracking-widest text-sm mb-4 block">Our Flavors</span>
              <h2 className="text-5xl font-black tracking-tighter">Choose Your Vibe</h2>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-gray-400 text-sm">Every pizza is served in Large size</p>
                <p className="text-white font-black text-xl">Standard Base Price: Rs. 2,500</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PIZZA_FLAVORS.map(flavor => (
              <PizzaCard key={flavor.id} pizza={flavor} />
            ))}
            
            {/* Custom Order CTA Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#00A3FF] rounded-2xl p-8 flex flex-col justify-between group cursor-pointer overflow-hidden relative"
            >
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/20 rounded-full blur-[60px]" />
              <div>
                <h3 className="text-3xl font-black text-[#121212] mb-4">Want something <br />unique?</h3>
                <p className="text-[#121212]/70 font-medium leading-relaxed">
                  Call us or message on WhatsApp for custom crusts and limited-time secret toppings.
                </p>
              </div>
              <button 
                onClick={() => window.open(WHATSAPP_URL, '_blank')}
                className="bg-[#121212] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all relative z-10"
              >
                Chat on WhatsApp
                <MessageCircle size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="location" className="py-24 bg-[#121212] relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5 shadow-2xl relative">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-16">
                <span className="text-[#00A3FF] font-bold uppercase tracking-widest text-sm mb-4 block">Visit Us</span>
                <h2 className="text-5xl font-black tracking-tighter mb-8 italic">Find us in the heart <br />of G-13.</h2>
                
                <div className="space-y-8 mb-12">
                  <div className="flex gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl h-fit">
                      <MapPin className="text-[#00A3FF]" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Our Spot</h4>
                      <p className="text-gray-400">Shop #12, G-13 Markaz, Islamabad</p>
                      <button className="text-[#00A3FF] text-sm font-bold mt-2 hover:underline">Get Directions</button>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl h-fit">
                      <Phone className="text-[#00A3FF]" size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Kitchen Line</h4>
                      <p className="text-gray-400">Available from 12:00 PM to 02:00 AM</p>
                      <p className="text-white font-black text-lg mt-1">{PHONE_NUMBER}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={`tel:${PHONE_NUMBER.replace('-', '')}`}
                    className="flex-1 min-w-[200px] bg-[#00A3FF] text-[#121212] px-8 py-5 rounded-2xl font-black text-center hover:shadow-[0_10px_30px_rgba(0,163,255,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    <Phone size={20} />
                    Call Now
                  </a>
                  <a 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] bg-white text-[#121212] px-8 py-5 rounded-2xl font-black text-center hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative min-h-[400px] bg-[#0a0a0a]">
                <div className="absolute inset-0 grayscale opacity-40 bg-[url('https://api.placeholder.com/1200/800')] bg-cover bg-center" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative z-10 text-center px-10">
                    <div className="bg-[#00A3FF] w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center shadow-[0_0_20px_rgba(0,163,255,0.5)] animate-bounce font-bold text-[#121212]">P</div>
                    <h3 className="text-2xl font-black mb-2 tracking-tight italic">G-13 Markaz</h3>
                    <p className="text-gray-400 text-sm">Islamabad's New Flavor Hub</p>
                  </div>
                </div>
                {/* Decorative dots */}
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #00A3FF 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-[#00A3FF] p-1.5 rounded-lg">
                <Pizza className="text-[#121212]" size={20} />
              </div>
              <span className="text-lg font-black tracking-tighter">PIZZA <span className="text-[#00A3FF]">CHIZZA</span></span>
            </div>
            
            <div className="flex gap-10 text-gray-500 text-sm font-medium">
              <button onClick={() => scrollToSection('menu')} className="hover:text-white transition-colors">Menu</button>
              <button onClick={() => scrollToSection('location')} className="hover:text-white transition-colors">Location</button>
              <button className="hover:text-white transition-colors">Privacy Policy</button>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A3FF] hover:text-[#121212] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#00A3FF] hover:text-[#121212] transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
            © 2026 Pizza Chizza Islamabad. All rights reserved. • Built for the G-13 Food Scene.
          </div>
        </div>
      </footer>
    </div>
  );
}
