export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-200">

      <nav className="flex justify-between items-center px-8 py-2 border-b bg-white">
        <h1 className="text-xl font-bold">Occura</h1>
        <div className="flex gap-4">
          <a href="/login" className="underline text-gray-600 hover:text-black">Log In</a>
          <a href="/register" className="px-4 py-1 bg-black text-white rounded">Sign Up</a>
        </div>
      </nav>

      <section className="text-center py-24 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Create, Host, and Attend Events
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          A simple platform to manage events, venues, and reservations — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <a href="/register" className="px-6 py-2 bg-black text-white rounded-lg">
            Get Started
          </a>
          <a href="/login" className="px-6 py-2 border rounded-lg">
            Log In
          </a>
        </div>
      </section>

      <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
        {[
          {
            title: "For Users",
            text: "Discover events and reserve seats easily.",
          },
          {
            title: "For Organizers",
            text: "Create events and manage registrations.",
          },
          {
            title: "For Venue Owners",
            text: "List venues and host events.",
          },
        ].map(card => (
          <div key={card.title} className="p-6 border rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.text}</p>
          </div>
        ))}
      </section>

      <section className="py-16 bg-gray-50 text-center">
        <h3 className="text-3xl font-bold mb-6">How it works</h3>
        <div className="flex justify-center gap-12">
          {["Sign up", "Start booking or hosting"].map((step, i) => (
            <div key={step}>
              <div className="text-4xl font-bold mb-2">{i + 1}</div>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-2 text-center text-gray-500">
        © {new Date().getFullYear()} Occura
      </footer>
    </div>
  );
}
