import { useState } from "react";
import logo from "./assets/shield-logo.svg";

function ProjectCarousel({ project }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => (i === project.media.length - 1 ? 0 : i + 1));
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? project.media.length - 1 : i - 1));
  };

  const item = project.media[index];
  const src = `${project.folder}/${item.file}`;

  return (
    <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
      <div className="relative h-64 bg-slate-900">
        {item.type === "video" ? (
          <video src={src} controls className="h-full w-full object-cover" />
        ) : (
          <img src={src} alt={project.title} className="h-full w-full object-cover" />
        )}

        {project.media.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white px-3 py-2 rounded-xl"
            >
              ‹
            </button>

            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-900/70 hover:bg-slate-900 text-white px-3 py-2 rounded-xl"
            >
              ›
            </button>
          </>
        )}
      </div>

      <div className="p-6">
        <h4 className="text-amber-400 font-semibold mb-2">{project.title}</h4>
        <p className="text-slate-400 text-sm">{item.caption}</p>
      </div>
    </div>
  );
}

export default function DBXHomeServices() {
  const smsLink =
    "sms:15122976548?&body=Hi%20Daniel,%20I'm%20looking%20for%20a%20handyman%20to%20";

  const projects = [
    {
      title: "Luxury Condo Fixture Modernization",
      folder: "/projects/condo-fixtures",
      media: [
        {
          file: "1.jpg",
          type: "image",
          caption: "Updated pendant lighting and hardware throughout the main living area."
        },
        {
          file: "2.jpg",
          type: "image",
          caption: "Carefully aligned fixture installation with upgraded finishes."
        },
        {
          file: "3.mp4",
          type: "video",
          caption: "Final walkthrough showing balanced lighting and finish details."
        }
      ]
    },
    {
      title: "Short‑Term Rental Refresh",
      folder: "/projects/str-refresh",
      media: [
        {
          file: "1.jpg",
          type: "image",
          caption: "Durable finish improvements designed for guest turnover."
        },
        {
          file: "2.mp4",
          type: "video",
          caption: "Quick‑turn upgrades completed between bookings."
        }
      ]
    },
    {
      title: "Custom Garage Storage System",
      folder: "/projects/garage-storage",
      media: [
        {
          file: "1.jpg",
          type: "image",
          caption: "Wall‑mounted storage maximizing vertical space."
        },
        {
          file: "2.jpg",
          type: "image",
          caption: "Clean‑lined cabinetry with concealed mounting hardware."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/90 border-b border-slate-800">
        <div className="mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src= {logo}
              alt="DBX Home Services Logo"
              className="w-auto h-20 sm:h-14 rounded-xl shadow-lg"
            />

            <div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-wide">
                DBX Home Services
              </h1>
              <p className="text-xs text-slate-400">
                Central East Austin · Austin, Texas
              </p>
            </div>
          </div>
          
          <nav className="md:flex gap-8 text-sm text-slate-300">
            <a href="#services" className="hover:text-amber-400 transition">
              Services
            </a>
            <a href="#pricing" className="hover:text-amber-400 transition">
              Pricing
            </a>
            <a href="#projects" className="hover:text-amber-400 transition">
              Projects
            </a>
            <a href="#testimonials" className="hover:text-amber-400 transition">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-amber-400 transition">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              Precision Craftsmanship.
              <br />
              Reliable Service.
              <br />
              <span className="text-amber-400">
                One Trusted Professional.
              </span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg mb-8">
              Based in <span className="text-amber-400 font-medium">Central East Austin</span>,
              DBX Home Services is an exclusive owner‑operated handyman service
              for homeowners and self‑managed rental properties throughout Austin.
            </p>

            <a
              href="#footer"
              className="inline-block w-full sm:w-auto text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6 py-3 rounded-2xl shadow-xl transition"
            >
              Contact
            </a>
          </div>

          <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-800">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-amber-400">
              Why DBX?
            </h3>

            <ul className="space-y-3 text-sm sm:text-base text-slate-300">
              <li>• Personally performed by Daniel Burns</li>
              <li>• Meticulous attention to detail</li>
              <li>• Clear communication & punctuality</li>
              <li>• Respect for your home & tenants</li>
              <li>• Professional, consistent pricing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-10 text-center">Services</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Repairs & Maintenance</h4>
              <p className="text-slate-400 text-sm">General household repairs, fixture replacements, adjustments, and preventative maintenance to keep your home operating smoothly.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Installations</h4>
              <p className="text-slate-400 text-sm">Lighting, hardware, shelving, wall mounting, appliances, and other precise installations completed with attention to detail.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Rental Property Turnovers</h4>
              <p className="text-slate-400 text-sm">Fast, reliable improvements and repairs for long‑term and short‑term rentals between tenants or bookings.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Interior Improvements</h4>
              <p className="text-slate-400 text-sm">Trim work, hardware upgrades, small carpentry projects, and finishing details that elevate interior spaces.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Storage & Organization</h4>
              <p className="text-slate-400 text-sm">Garage storage systems, shelving, and practical organization solutions designed to maximize usable space.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Small Project Specialist</h4>
              <p className="text-slate-400 text-sm">Ideal for homeowners and property managers who need high‑quality work completed without hiring a large contractor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-8">Pricing</h3>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <p className="text-4xl font-bold text-amber-400 mb-4">$85 / hour</p>

            <p className="text-slate-400 mb-4">Professional hourly service with transparent billing.</p>

            <div className="space-y-2 text-slate-400 text-sm">
              <p>Two‑hour minimum per visit</p>
              <p>Materials billed at cost — never marked up</p>
              <p>Standard mileage applied only when supply runs are required</p>
            </div>

            <p className="mt-6 text-slate-500 text-sm">Clear scope. Clear time. Clear total.</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-10 sm:mb-12 text-center">
            Selected Projects
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, i) => (
              <ProjectCarousel key={i} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-10 text-center">Client Testimonials</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-300 text-sm mb-4">“Daniel was punctual, professional, and extremely detail‑oriented. Everything was completed perfectly.”</p>
              <p className="text-slate-500 text-xs">Homeowner · East Austin</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-300 text-sm mb-4">“Our short‑term rental turnovers are so much easier now. Reliable and efficient every time.”</p>
              <p className="text-slate-500 text-xs">Property Manager · Austin</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-300 text-sm mb-4">“Excellent craftsmanship and clear communication. Exactly what we were hoping to find.”</p>
              <p className="text-slate-500 text-xs">Condo Owner · Downtown Austin</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-24 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-6">
            Text DBX Home Services
          </h3>

          <p className="text-slate-400 mb-4">
            Located in Central East Austin and serving Austin neighborhoods.
          </p>

          <p className="text-slate-400 text-sm">
            $85 per hour · Two‑hour minimum · Materials at cost · Standard mileage for supply runs
          </p>

          <p className="mt-4 text-slate-500 text-sm">
            Please include a brief description, location, and photos if possible.
          </p>

          <a
            href={smsLink}
            className="mt-6 inline-block w-full sm:w-auto text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-2xl shadow-2xl transition"
          >
            Click to Text
          </a>

          <p className="mt-6 text-slate-500 text-sm">
            Or call directly at (512) 297‑6548
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <a
          href={smsLink}
          className="block text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold py-4 rounded-2xl shadow-2xl"
        >
          Text Daniel
        </a>
      </div>

      {/* Footer */}
      <footer
        id="footer"
        className="border-t border-slate-800 py-6 text-center text-slate-500 text-xs sm:text-sm"
      >
        © {new Date().getFullYear()} DBX Home Services · Central East Austin · Owner Operated
      </footer>
    </div>
  );
}
