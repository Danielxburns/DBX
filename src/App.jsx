import { useState, useEffect } from "react";
import logo from "./assets/shield-logo.svg";
import testimonialsData from "./assets/testimonials.json";

function TestimonialCard({ testimonial }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col">
      <div className={`text-slate-300 text-sm mb-4 overflow-hidden transition-all ${expanded ? "max-h-96" : "max-h-24"}`}>
        {testimonial.testimonial}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-amber-400 text-xs mb-3 self-start hover:text-amber-300"
      >
        {expanded ? "Show less" : "Read more"}
      </button>

      <div className="mt-auto text-slate-500 text-xs">
        {testimonial.name} · {testimonial.neighborhood}
      </div>
    </div>
  );
}

function ProjectCarousel({ project }) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const next = () => {
    setIndex((i) => (i === project.media.length - 1 ? 0 : i + 1));
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? project.media.length - 1 : i - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();

    setTouchStart(null);
  };

  const item = project.media[index];
  const src = `${project.folder}/${item.file}`;

  const Media = (
    item.type === "video" ? (
      <video src={src} controls className="h-full w-full object-cover" />
    ) : (
      <img
        src={src}
        alt={project.title}
        className="h-full w-full object-cover cursor-pointer"
        onClick={() => setFullscreen(true)}
      />
    )
  );

  return (
    <>
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-lg overflow-hidden">
        <div
          className="relative h-64 bg-slate-900"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {Media}

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

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {project.media.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 w-2 rounded-full cursor-pointer ${
                      i === index ? "bg-amber-400" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <h4 className="text-amber-400 font-semibold mb-2">{project.title}</h4>
          <p className="text-slate-400 text-sm">{item.caption}</p>
        </div>
      </div>

      {fullscreen && item.type === "image" && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setFullscreen(false)}
        >
          <img
            src={src}
            alt={project.title}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}

export default function DBXHomeServices() {
  const [testimonials] = useState(testimonialsData);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const smsLink = "sms:15122976548?&body=Hi Daniel, I'm looking for a handyman to ";

  useEffect(() => {
  const handleScroll = () => {
    const current = window.scrollY;

    if (current > lastScroll && current > 80) {
      setShowHeader(false);   // scrolling down
    } else {
      setShowHeader(true);    // scrolling up
    }

    setLastScroll(current);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScroll]);
  

  const projects = [
    {
      title: "Luxury Condo Fixture Modernization",
      folder: "/src/assets/projects/condo-fixtures",
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
      folder: "/src/assets/projects/str-refresh",
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
      folder: "/src/assets/projects/garage-storage",
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
    },
    {
      title: "Kitchen Hardware & Fixture Upgrade",
      folder: "/src/assets/projects/kitchen-upgrade",
      media: [
        {
          file: "1.jpg",
          type: "image",
          caption: "Precision alignment of cabinet pulls and updated fixtures."
        },
        {
          file: "2.jpg",
          type: "image",
          caption: "Modern hardware installed consistently across the full kitchen."
        },
        {
          file: "3.mp4",
          type: "video",
          caption: "Finished result highlighting the updated kitchen details."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800 transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="DBX Home Services" className="h-9 w-9" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">DBX Home Services</p>
                <p className="text-[11px] text-slate-400 hidden sm:block">Central East Austin</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <a href="#services" className="hover:text-white">Services</a>
              <a href="#pricing" className="hover:text-white">Pricing</a>
              <a href="#projects" className="hover:text-white">Projects</a>
              <a href="#testimonials" className="hover:text-white">Testimonials</a>
              <a href="#contact" className="bg-amber-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-amber-300">Contact</a>
            </nav>

            {/* Mobile Text Button */}
            <a
              href="sms:15122976548?&body=Hi Daniel, I'm looking for a handyman to ..."
              className="md:hidden bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-xl"
            >
              Text Daniel
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Repairs & Maintenance</h4>
              <p className="text-slate-400 text-sm">General household repairs, fixture replacements, adjustments, and preventative maintenance performed with precision and care.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Installations</h4>
              <p className="text-slate-400 text-sm">Lighting, hardware, shelving, appliances, and wall mounting installed cleanly and accurately.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Rental Property Turnovers</h4>
              <p className="text-slate-400 text-sm">Efficient repairs and improvements for long‑term and short‑term rentals between tenants or bookings.</p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <h4 className="text-amber-400 font-semibold mb-2">Interior Improvements</h4>
              <p className="text-slate-400 text-sm">Trim work, hardware upgrades, and detail‑focused projects that elevate the look and function of your space.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-8">Pricing</h3>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <p className="text-4xl font-bold text-amber-400 mb-2">$85 / hour</p>

            <p className="text-xl font-semibold text-amber-300 mb-4">$500 day rate</p>

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
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
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
