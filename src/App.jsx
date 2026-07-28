import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sparkles,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Activity,
  Stethoscope,
  ChevronRight,
  Star,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import BookingModal from './components/BookingModal';

const services = [
  {
    title: 'Comprehensive Wellness Exams',
    description: 'Annual preventive care, cancer screenings, hormonal evaluation, and personalized health roadmaps.',
    icon: Heart,
    accent: 'bg-[#ffe8ee] text-[#b5106a]',
  },
  {
    title: 'High-Risk Prenatal Care',
    description: 'Specialized maternal-fetal monitoring, 4D sonography, and multi-disciplinary birth planning.',
    icon: Stethoscope,
    accent: 'bg-[#eaddff] text-[#712ae2]',
  },
  {
    title: 'Hormonal & Menopause Therapy',
    description: 'Bioidentical hormone optimization, metabolic health support, and bone density management.',
    icon: Activity,
    accent: 'bg-[#88fc77]/20 text-[#006e08]',
  },
  {
    title: 'Advanced Robotic Surgery',
    description: 'Minimally invasive laparoscopic and Da Vinci robotic procedures with accelerated recovery times.',
    icon: ShieldCheck,
    accent: 'bg-[#ffe8ee] text-[#b5106a]',
  },
];

const doctors = [
  {
    name: 'Dr. Elena Vance, MD',
    role: 'Lead Obstetrician & Gynecologist',
    specialty: 'Obstetrics & Prenatal',
    experience: '14+ Yrs',
    rating: '4.9',
    reviews: '128',
    image: 'https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Dr. Amara Okafor, MD',
    role: 'Reproductive Specialist',
    specialty: 'Reproductive Endocrinology',
    experience: '11+ Yrs',
    rating: '5.0',
    reviews: '94',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Dr. Sophia Martinez, MD',
    role: 'Pelvic Health & Urogynecology',
    specialty: 'Urogynecology',
    experience: '16+ Yrs',
    rating: '4.8',
    reviews: '156',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
  },
];

const specialties = ['All', 'Obstetrics & Prenatal', 'Reproductive Endocrinology', 'Urogynecology'];

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredDoctors = doctors.filter(
    (d) => selectedFilter === 'All' || d.specialty === selectedFilter
  );

  return (
    <div className="min-h-screen bg-[#fff8f8] text-[#25181c]">
      {/* ── Header ── */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#fff8f8]/80 border-b border-[#dfbec8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b5106a] to-[#d63384] flex items-center justify-center shadow-md shadow-[#b5106a]/20 text-white">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-['Manrope'] font-bold text-xl tracking-tight text-[#25181c]">
                Femina<span className="text-[#b5106a]">Care</span>
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-[#584048] font-semibold -mt-1">
                Enterprise Health
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#584048]">
            <a href="#services" className="hover:text-[#b5106a] transition-colors">Specialties</a>
            <a href="#doctors" className="hover:text-[#b5106a] transition-colors">Practitioners</a>
            <a href="#enterprise" className="hover:text-[#b5106a] transition-colors">Platform</a>
            <Link to="/doctor/login" className="hover:text-[#b5106a] transition-colors">Doctor Login</Link>
          </nav>

          <button
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#b5106a] to-[#d63384] hover:opacity-95 shadow-md shadow-[#b5106a]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book Now
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#ffe8ee] border border-[#dfbec8] text-[#b5106a] text-xs font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Next-Gen Gynecological &amp; Obstetric Platform</span>
              </div>

              <h1 className="font-['Manrope'] text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#25181c] leading-[1.15] tracking-tight">
                Empathetic Care.<br />
                <span className="bg-gradient-to-r from-[#b5106a] via-[#712ae2] to-[#d63384] bg-clip-text text-transparent">
                  Clinical Excellence.
                </span>
              </h1>

              <p className="text-lg text-[#584048] leading-relaxed max-w-2xl">
                FeminaCare unifies specialized female healthcare with intuitive enterprise software — delivering frictionless patient portals, AI-assisted triage, and boutique clinical experiences.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="px-7 py-3.5 rounded-full text-base font-semibold text-white bg-[#b5106a] hover:bg-[#d63384] shadow-lg shadow-[#b5106a]/30 transition-all flex items-center justify-center cursor-pointer"
                >
                  Book Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <Link
                  to="/doctor/login"
                  className="px-7 py-3.5 rounded-full text-base font-semibold text-[#25181c] bg-white border border-[#dfbec8] hover:bg-[#ffe8ee] transition-all flex items-center justify-center shadow-sm"
                >
                  Doctor Portal →
                </Link>
              </div>

              <div className="pt-8 border-t border-[#dfbec8]/60 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-['Manrope'] text-2xl font-bold text-[#b5106a]">99.4%</p>
                  <p className="text-xs text-[#584048] font-medium mt-0.5">Patient Satisfaction</p>
                </div>
                <div>
                  <p className="font-['Manrope'] text-2xl font-bold text-[#712ae2]">50k+</p>
                  <p className="text-xs text-[#584048] font-medium mt-0.5">Consultations Managed</p>
                </div>
                <div>
                  <p className="font-['Manrope'] text-2xl font-bold text-[#006e08]">HIPAA</p>
                  <p className="text-xs text-[#584048] font-medium mt-0.5">Enterprise Encrypted</p>
                </div>
              </div>
            </div>

            {/* Hero Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-[#dfbec8] space-y-5">
                <div className="flex items-center justify-between border-b border-[#dfbec8]/40 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d63384]">
                      <img src="https://images.unsplash.com/photo-1594824813566-88855ce78905?auto=format&fit=crop&q=80&w=200" alt="Doctor" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-['Manrope'] font-bold text-[#25181c] text-sm">Dr. Elena Vance</h4>
                      <p className="text-xs text-[#584048]">Obstetrics &amp; Gynecology</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#88fc77]/20 text-[#006e08] flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006e08] mr-1.5 animate-pulse" />
                    Available Today
                  </span>
                </div>

                <div className="space-y-3 bg-[#fff0f3] p-4 rounded-2xl border border-[#dfbec8]">
                  <div className="flex justify-between items-center text-xs font-semibold text-[#584048]">
                    <span>Next Slot</span>
                    <span className="text-[#b5106a]">Today, 2:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-white p-2.5 rounded-xl text-[#25181c] shadow-sm">
                    <span className="flex items-center font-medium">
                      <Activity className="w-4 h-4 mr-2 text-[#712ae2]" />
                      Annual Hormonal Screening
                    </span>
                    <span className="text-gray-400">30 mins</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#584048] px-1">
                  <span className="flex items-center">
                    <ShieldCheck className="w-4 h-4 text-[#006e08] mr-1" />
                    Encrypted Video &amp; In-Person
                  </span>
                  <span className="flex items-center font-bold text-[#25181c]">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400 mr-1" />
                    4.9 (128)
                  </span>
                </div>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-[#b5106a] hover:bg-[#d63384] transition-colors shadow-md shadow-[#b5106a]/20 cursor-pointer"
                >
                  Book Slot — ₦15,000
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-20 bg-white border-y border-[#dfbec8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#b5106a]">Comprehensive Care Pathways</h2>
            <h3 className="font-['Manrope'] text-3xl sm:text-4xl font-bold text-[#25181c]">
              Tailored Services for Every Stage of Life
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-[#fff8f8] p-6 rounded-2xl border border-[#dfbec8] hover:shadow-xl hover:border-[#b5106a] transition-all group duration-300">
                <div className={`w-12 h-12 rounded-xl ${service.accent} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h4 className="font-['Manrope'] font-bold text-lg text-[#25181c] mb-2 group-hover:text-[#b5106a] transition-colors">
                  {service.title}
                </h4>
                <p className="text-sm text-[#584048] leading-relaxed mb-4">{service.description}</p>
                <button onClick={() => setBookingOpen(true)} className="inline-flex items-center text-xs font-bold text-[#b5106a] hover:underline cursor-pointer">
                  Book — ₦15,000 <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctors ── */}
      <section id="doctors" className="py-20 bg-[#fff8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#712ae2] mb-2">Our Clinical Team</h2>
              <h3 className="font-['Manrope'] text-3xl sm:text-4xl font-bold text-[#25181c]">
                Board-Certified Specialists
              </h3>
            </div>
            <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
              {specialties.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedFilter(s)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${selectedFilter === s
                    ? 'bg-[#b5106a] text-white shadow-md'
                    : 'bg-white text-[#584048] border border-[#dfbec8] hover:bg-[#ffe8ee]'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredDoctors.map((doc, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-[#dfbec8] shadow-sm hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden relative">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#25181c] flex items-center shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 mr-1" />
                    {doc.rating} ({doc.reviews})
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-['Manrope'] font-bold text-lg text-[#25181c]">{doc.name}</h4>
                    <p className="text-xs text-[#b5106a] font-semibold">{doc.role}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#584048] pt-2 border-t border-[#dfbec8]/40">
                    <span>{doc.experience} experience</span>
                    <span className="bg-[#ffe8ee] text-[#b5106a] px-2.5 py-1 rounded-full font-medium">{doc.specialty}</span>
                  </div>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-full py-2.5 rounded-xl font-semibold text-xs text-[#b5106a] bg-[#fff0f3] hover:bg-[#b5106a] hover:text-white transition-all cursor-pointer"
                  >
                    Book Consultation — ₦15,000
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise Platform ── */}
      <section id="enterprise" className="py-20 bg-white border-t border-[#dfbec8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#eaddff] text-[#712ae2] text-xs font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>Enterprise SaaS Architecture</span>
              </div>
              <h3 className="font-['Manrope'] text-3xl sm:text-4xl font-bold text-[#25181c] leading-tight">
                Designed for Modern Practices. Built for Total Security.
              </h3>
              <p className="text-[#584048] text-base leading-relaxed">
                FeminaCare powers healthcare institutions with integrated EHR, AI triage, automated scheduling, billing, and HIPAA-compliant telehealth.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  'HIPAA & NDPR Compliant Encrypted Telehealth',
                  'Automated Patient Follow-ups & Prescription Refills',
                  'Real-time Diagnostic Lab Integration',
                  'Multi-branch Clinic Management Dashboard',
                  'Paystack-powered ₦15,000 consultation fees',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-[#006e08] shrink-0" />
                    <span className="text-sm font-semibold text-[#25181c]">{feat}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/doctor/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-[#712ae2] hover:opacity-90 shadow-md shadow-[#712ae2]/20 transition-all"
              >
                Access Doctor Workspace
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mock terminal */}
            <div className="bg-[#3b2c31] text-[#ffecf0] p-8 rounded-3xl shadow-2xl border border-gray-700">
              <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-mono text-gray-400">FeminaCare Portal v4.2 · Xano Backend</span>
              </div>
              <div className="space-y-4">
                <div className="bg-[#25181c] p-4 rounded-xl border border-gray-700 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Live Active Patients</p>
                    <p className="text-xl font-bold text-white font-['Manrope']">1,248 Online</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#b5106a] text-white">Live</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#25181c] p-4 rounded-xl border border-gray-700">
                    <p className="text-xs text-gray-400">Telehealth Queue</p>
                    <p className="text-lg font-bold text-white mt-1">4 Waiting</p>
                  </div>
                  <div className="bg-[#25181c] p-4 rounded-xl border border-gray-700">
                    <p className="text-xs text-gray-400">Lab Reports</p>
                    <p className="text-lg font-bold text-emerald-400 mt-1">100% Synced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#25181c] text-[#ffecf0] py-12 border-t border-[#584048]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#b5106a] flex items-center justify-center text-white">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <span className="font-['Manrope'] font-bold text-lg">
              Femina<span className="text-[#d63384]">Care</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <Link to="/doctor/login" className="hover:text-[#d63384] transition-colors">Doctor Login</Link>
            <a href="#services" className="hover:text-[#d63384] transition-colors">Services</a>
            <a href="#doctors" className="hover:text-[#d63384] transition-colors">Doctors</a>
          </div>
          <p className="text-xs text-gray-400">
            © 2026 FeminaCare. HIPAA & NDPR Compliant.
          </p>
        </div>
      </footer>

      {/* ── Booking Modal ── */}
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
