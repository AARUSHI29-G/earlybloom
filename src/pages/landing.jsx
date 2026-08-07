export default function LandingPage({ onGetStarted }) {
  return (
    <div className="w-full bg-white">
      
      {/* 🚀 1. HERO SECTION (Home Screen Grid) */}
      <section id="home" className="min-h-[80vh] flex items-center justify-between max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div className="space-y-6">
          <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ">
            Early Childhood NGO Portal
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight ">
            Nurturing Every Child's <span className="text-purple-700">Full Potential</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg">
            EarlyBloom connects families, verified NGO administrators, and dedicated field volunteers to track milestones and support early child development.
          </p>
          <div className="pt-4">
            <button 
              onClick={onGetStarted}
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              Get Started Now →
            </button>
          </div>
        </div>
        {/* Right Side Visual Graphic Placeholder */}
        <div className="bg-gradient-to-br from-purple-100 to-indigo-50 h-80 rounded-2xl border border-purple-100 shadow-inner flex items-center justify-center overflow-hidden">
            <img 
                src="https://media.istockphoto.com/id/1375913527/photo/excited-girl-with-wings-flying-on-cloud-doodle-drawing-on-blue-background-concept-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=DsfuzGwHNueTB5ma-r2G6KBhcfup1QwRfnkBdUJw0hQ=" 
                alt="Nursery child playing with teacher in the classroom" 
                className="w-full h-full object-cover" 
            />
        </div>
      </section>

      {/* 📝 2. ABOUT SECTION (Is par click karke scroll hoga) */}
      <section id="about" className="bg-gray-50 py-24 border-y border-gray-100">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">About Our Mission</h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto rounded"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-base pt-2">
            EarlyBloom is a dedicated framework designed to bridge the gap between rural development tracking and professional healthcare NGO management. We believe every child deserves an equal start.
          </p>
        </div>
      </section>

      {/* 🛠️ 3. SERVICES SECTION (Is par click karke scroll hoga) */}
      <section id="services" className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Core Services</h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto rounded"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left">
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <span className="text-2xl">📊</span>
              <h3 className="font-bold text-lg text-purple-900 mt-2">Milestone Tracking</h3>
              <p className="text-gray-600 text-sm mt-1">Parents can easily monitor growth and behavioral milestones digitally.</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <span className="text-2xl">👥</span>
              <h3 className="font-bold text-lg text-purple-900 mt-2">Volunteer Support</h3>
              <p className="text-gray-600 text-sm mt-1">Verified fieldwork coordinators schedule visits and submit reports live.</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-bold text-lg text-purple-900 mt-2">Admin Dashboard</h3>
              <p className="text-gray-600 text-sm mt-1">NGO leads audit registration analytics grids data files securely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 📞 4. CONTACT SECTION (Is par click karke scroll hoga) */}
      <section id="contact" className="bg-purple-900 text-white py-20">
        <div className="max-w-screen-xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl font-bold">Connect With Us</h2>
          <p className="text-purple-200 text-sm max-w-md mx-auto">
            Have queries regarding child safety, enlistments, or volunteer drives? Drop your query to our active helpdesk window.
          </p>
          <div className="pt-4">
            <span className="bg-purple-800 px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider">
              📧 support@earlybloom.org | 📞 +91 98765 43210
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}
