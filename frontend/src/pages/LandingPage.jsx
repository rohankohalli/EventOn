import { Link } from 'react-router-dom';
import AppIcon from '../components/Icon';

export default function LandingPage() {
  return (
    <div className="min-h-screen mesh-bg relative overflow-hidden flex flex-col">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <nav className="flex justify-between items-center px-8 py-4 backdrop-blur-md bg-white/40 border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-primary-600">
          <AppIcon size={32} />
          <h1 className="text-2xl font-bold tracking-tight text-gradient">EventOn</h1>
        </div>
        <div className="flex gap-4 items-center">
          <a href="/login" className="text-gray-700 font-medium hover:text-black transition-colors">Log In</a>
          <a href="/register" className="px-5 py-2 bg-gray-900 text-white rounded-full font-medium hover:bg-black hover:scale-105 transition-all shadow-lg shadow-gray-900/20">Sign Up</a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative z-10">
        <section className="text-center pt-32 pb-24 px-6 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900 drop-shadow-sm">
            Create, Host, and Attend Events
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto font-medium">
            A simple, beautiful platform to manage events, venues, and reservations — all in one place.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/register" className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black hover:scale-105 transition-all shadow-xl shadow-gray-900/30">
              Get Started
            </a>
            <a href="/login" className="px-8 py-3 glass-panel rounded-full font-semibold text-lg text-gray-800 hover:bg-white/80 transition-all">
              Log In
            </a>
          </div>
        </section>

        <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-12 max-w-7xl mx-auto w-full">
          {[
            {
              title: "For Users",
              text: "Discover extraordinary events and reserve your spot with ease.",
              icon: "🎟️"
            },
            {
              title: "For Organizers",
              text: "Create, manage, and promote your events seamlessly.",
              icon: "📅"
            },
            {
              title: "For Venue Owners",
              text: "List venues, manage bookings, and host incredible experiences.",
              icon: "🏢"
            },
          ].map(card => (
            <div key={card.title} className="glass-panel p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{card.title}</h3>
              <p className="text-gray-700 font-medium">{card.text}</p>
            </div>
          ))}
        </section>

        <section className="py-24 text-center">
          <h3 className="text-3xl font-bold mb-10 text-gray-900">How it works</h3>
          <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto px-6">
            {["Create an account", "Discover or Host", "Enjoy the experience"].map((step, i) => (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-2xl font-bold text-primary-600 mb-4 shadow-lg">
                  {i + 1}
                </div>
                <p className="text-gray-800 font-semibold text-lg">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-6 text-center text-gray-600 font-medium backdrop-blur-sm bg-white/30 border-t border-white/20 z-10 relative">
        © {new Date().getFullYear()} EventOn Platform
      </footer>
    </div>
  );
}
