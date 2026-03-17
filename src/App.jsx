import { useState, useEffect } from 'react';
import logo from './assets/shield-logo.svg';
import testimonialsData from './assets/testimonials.json';
import danielPhoto from './assets/headshot.png';

// Load each project's metadata (project.json) and media
const projectMetaFiles = import.meta.glob('./assets/projects/**/project.json', {
  eager: true,
});

const projectMediaFiles = import.meta.glob(
  './assets/projects/**/*.{jpg,jpeg,png,webp,mp4}',
  { eager: true, query: '?url', import: 'default' },
);

const projects = Object.entries(projectMetaFiles).map(
  ([metaPath, metaModule]) => {
    const meta = metaModule.default || metaModule;

    // folder path containing this project's files
    const folder = metaPath.split('/').slice(0, -1).join('/');

    const media = Object.entries(projectMediaFiles)
      .filter(([path]) => path.startsWith(folder + '/'))
      .map(([path, url]) => {
        const filename = path.split('/').pop();
        const extension = filename.split('.').pop().toLowerCase();

        const filenameNoExt = filename.replace(/\.[^.]+$/, '');
        const caption =
          meta?.captions?.[filename] ||
          meta?.captions?.[`${filenameNoExt}.jpg`] ||
          meta?.captions?.[`${filenameNoExt}.jpeg`] ||
          meta?.captions?.[`${filenameNoExt}.png`] ||
          meta?.captions?.[filenameNoExt] ||
          '';

        return {
          file: url,
          type: extension === 'mp4' ? 'video' : 'image',
          caption,
        };
      })
      .sort((a, b) =>
        a.file.localeCompare(b.file, undefined, { numeric: true }),
      );

    return {
      title: meta.title,
      description: meta.description || '',
      media,
    };
  },
);

function TestimonialCard({ testimonial }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col">
      <div className="mt-auto text-slate-500 text-s mb-3">
        {testimonial.name} · {testimonial.neighborhood}
      </div>
      <div
        className={`text-slate-300 text-sm mb-4 overflow-hidden transition-all ${expanded ? 'max-h-96' : 'max-h-24'}`}
      >
        {testimonial.testimonial}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-amber-400 text-xs self-start hover:text-amber-300"
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>
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
  if (!item) {
    return null;
  }
  const src = item.file;
  const Media =
    item.type === 'video' ? (
      <video src={src} controls className="h-full w-full object-cover" />
    ) : (
      <img
        src={src}
        alt={project.title}
        className="h-full w-full object-cover cursor-pointer"
        onClick={() => setFullscreen(true)}
      />
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
                      i === index ? 'bg-amber-400' : 'bg-slate-600'
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

      {fullscreen && item.type === 'image' && (
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
  const smsLink =
    "sms:15122976548?&body=Hi Daniel, I'm looking for a handyman to ";

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll && current > 80) {
        setShowHeader(false); // scrolling down
      } else {
        setShowHeader(true); // scrolling up
      }

      setLastScroll(current);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur border-b border-slate-800 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3">
              <img src={logo} alt="DBX Home Services" className="h-14" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">DBX Home Services</p>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Central East Austin
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
              <a href="#services" className="hover:text-white">
                Services
              </a>
              <a href="#pricing" className="hover:text-white">
                Pricing
              </a>
              <a href="#projects" className="hover:text-white">
                Projects
              </a>
              <a href="#testimonials" className="hover:text-white">
                Testimonials
              </a>
              <a
                href="#contact"
                className="bg-amber-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-amber-300"
              >
                Contact
              </a>
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
              <span className="text-amber-400">One Trusted Professional.</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg mb-8">
              Based in{' '}
              <span className="text-amber-400 font-medium">
                Central East Austin
              </span>
              , DBX Home Services is an exclusive owner‑operated handyman
              service for homeowners, renters, STRs and rental properties
              throughout Austin.
            </p>

            <a
              href="#footer"
              className="inline-block w-full sm:w-auto text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-6 py-3 rounded-2xl shadow-xl transition"
            >
              Contact
            </a>
          </div>
          <div className="flex flex-col items-center md:items-stretch gap-6">
            {/* Daniel Photo */}
            <div className="order-2 md:order-1 flex justify-center">
              <div className="relative w-56 sm:w-64 md:w-64 ">
                <img
                  src={danielPhoto}
                  alt="Daniel Burns"
                  className="h-full w-full object-cover object-[50%_35%]"
                />

                {/* subtle vignette to focus attention on face */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[999px]"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(2,6,23,0.35) 80%, rgba(2,6,23,0.6) 100%)',
                  }}
                />

                {/* very subtle warm tone overlay to match brand accent */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[999px]"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 30%, rgba(251,191,36,0.12), rgba(251,191,36,0.04) 40%, transparent 70%)',
                  }}
                />
              </div>
            </div>

            {/* Why DBX Card */}
            <div className="order-1 md:order-2 bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-800">
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
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4">
            Services
          </h3>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12 text-base sm:text-lg">
            Focused, high‑quality work for homeowners and rental properties.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Interior */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
              <h4 className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">
                Interior Repairs
              </h4>
              <ul className="space-y-2 text-base md:text-lg text-slate-300 list-disc list-inside">
                <li>Lighting and ceiling fan installation</li>
                <li>Painting, drywall repair & texture matching</li>
                <li>Door adjustments and hardware replacement</li>
                <li>Trim repairs and finish carpentry</li>
                <li>Cabinet hardware installation and alignment</li>
                <li>Minor tile and flooring jobs</li>
              </ul>
            </div>

            {/* Exterior */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
              <h4 className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">
                Exterior Repairs
              </h4>
              <ul className="space-y-2 text-base md:text-lg text-slate-300 list-disc list-inside">
                <li>Fence and gate repair</li>
                <li>Deck and patio sealing & repair</li>
                <li>Painting and weatherproofing</li>
                <li>Minor siding & trim repair</li>
                <li>Exterior hardware and fixture installation</li>
                <li>Small landscaping jobs</li>
              </ul>
            </div>

            {/* Property Management & STR */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
              <h4 className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">
                Property Management & STR Turnover
              </h4>
              <ul className="space-y-2 text-base md:text-lg text-slate-300 list-disc list-inside">
                <li>Short‑term rental refresh and repair</li>
                <li>Between‑tenant maintenance</li>
                <li>Fixture replacement and updates</li>
                <li>Preventative maintenance</li>
                <li>Guest and pet damage repair</li>
              </ul>
            </div>

            {/* Custom */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
              <h4 className="text-xl md:text-2xl font-semibold text-amber-400 mb-4">
                Custom Work
              </h4>
              <ul className="space-y-2 text-base md:text-lg text-slate-300 list-disc list-inside">
                <li>Custom carpentry work</li>
                <li>Picture framing and art handling</li>
                <li>Custom storage and shelving solutions</li>
                <li>Specialized installation projects</li>
                <li>Unique homeowner or property needs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-8">Pricing</h3>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <p className="text-slate-400 mb-5">
              Professional hourly service with transparent billing.
            </p>
            <p className="text-4xl font-bold text-amber-400 mb-2">$85 / hour</p>
            <p className="text-xl font-semibold text-amber-300 mb-2">
              $500 / day for larger projects
            </p>
            <p className="text-base font-semibold text-amber-300 mb-5">
              Materials billed at cost — never marked up
            </p>

            <div className="space-y-2 text-slate-400 text-sm">
              <p>Two‑hour minimum per visit</p>
              <p>Standard mileage applied only when supply runs are required</p>
            </div>

            <p className="mt-6 text-slate-500 text-sm">
              Clear scope. Clear time. Clear total.
            </p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900"
      >
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
      <section
        id="testimonials"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900"
      >
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-10 text-center">
            Client Testimonials
          </h3>

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
            $85 per hour · Two‑hour minimum · Materials at cost · Standard
            mileage for supply runs
          </p>

          <p className="mt-4 text-slate-500 text-sm">
            Please include a brief description, location, and photos if
            possible.
          </p>

          <a
            href={smsLink}
            className="mt-6 inline-block w-full sm:w-auto text-center bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold px-8 py-4 rounded-2xl shadow-2xl transition"
          >
            Click to Text
          </a>

          <p className="mt-6 text-slate-500 text-sm">
            Or call directly at (512) 297‑6548. Please leave a message if
            unavailable and I will return your call as soon as possible.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="border-t border-slate-800 py-6 text-center text-slate-500 text-xs sm:text-sm"
      >
        © {new Date().getFullYear()} DBX Home Services · Central East Austin ·
        Owner Operated
      </footer>
    </div>
  );
}
