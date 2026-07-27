import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ShieldCheck, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { loginDoctor } from '../api/xano';
import { useAuth } from '../context/AuthContext';

export default function DoctorLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginDoctor(form.email, form.password);
      const { authToken, ...doctorData } = res.data;
      login(authToken, doctorData);
      navigate('/doctor/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fff8f8]">

      {/* ── Left Brand Panel ── */}
      <section className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-[#b5106a]">
        {/* Background overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#b5106a] via-[#8d0051]/80 to-[#3e0020]" />
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#d63384]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#712ae2]/20 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-white text-white" />
            </div>
            <span className="font-['Manrope'] text-2xl font-extrabold tracking-tight">
              FeminaCare
            </span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="font-['Manrope'] text-5xl font-extrabold leading-tight mb-6 max-w-lg">
              World-class care<br /> at your fingertips.
            </h1>
            <p className="text-lg text-white/80 font-medium max-w-md">
              The next generation of women's healthcare, powered by a seamless enterprise platform.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#88fc77]" />
                <span className="text-xs font-bold uppercase tracking-wider">System Status</span>
              </div>
              <p className="text-base font-semibold">All Systems Operational</p>
              <p className="text-xs text-white/60 mt-1">Uptime: 99.98%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#88fc77] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">Live Patients</span>
              </div>
              <p className="text-base font-semibold">1,248 Online</p>
              <p className="text-xs text-white/60 mt-1">Across all branches</p>
            </div>
            <div className="col-span-2 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
              <p className="text-xs font-bold uppercase tracking-wider mb-1 text-white/70">Today's Health Tip</p>
              <p className="text-sm text-white/90 leading-relaxed">
                Regular annual pelvic exams and hormonal screenings are critical for early detection.
                Proactive care saves lives. 💊
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Right Login Form ── */}
      <section className="flex-1 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-[#b5106a] flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white text-white" />
            </div>
            <span className="font-['Manrope'] text-xl font-extrabold text-[#25181c]">
              FeminaCare
            </span>
          </div>

          <div>
            <h2 className="font-['Manrope'] text-3xl font-bold text-[#25181c]">Doctor Portal</h2>
            <p className="text-sm text-[#584048] mt-2">Sign in to access your workspace and patient dashboard.</p>
          </div>

          {/* Role tabs */}
          <div className="flex items-center bg-[#ffe8ee] rounded-xl p-1">
            <button className="flex-1 py-2 rounded-lg text-sm font-semibold bg-white text-[#b5106a] shadow-sm transition-all">
              Doctor / Practitioner
            </button>
            <button className="flex-1 py-2 rounded-lg text-sm font-semibold text-[#584048] hover:text-[#b5106a] transition-colors">
              Admin / Staff
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#584048] mb-1.5">Work Email</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="dr.yourname@hospital.com"
                className="w-full px-4 py-3 rounded-xl border border-[#dfbec8] bg-white focus:border-[#b5106a] focus:ring-2 focus:ring-[#b5106a]/20 outline-none text-sm text-[#25181c] placeholder:text-[#8b7078] transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[#584048]">Password</label>
                <a href="#" className="text-xs text-[#b5106a] font-semibold hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your secure password"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-[#dfbec8] bg-white focus:border-[#b5106a] focus:ring-2 focus:ring-[#b5106a]/20 outline-none text-sm text-[#25181c] placeholder:text-[#8b7078] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#584048] hover:text-[#b5106a] transition-colors"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[#ffdad6] border border-[#ba1a1a]/30 text-[#93000a] text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#b5106a] to-[#d63384] hover:opacity-95 shadow-md shadow-[#b5106a]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In to Workspace
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security badge */}
          <div className="flex items-center gap-2 p-3 bg-[#fff0f3] border border-[#dfbec8] rounded-xl text-xs text-[#584048]">
            <ShieldCheck className="w-4 h-4 text-[#006e08] shrink-0" />
            <span>
              This portal is <strong>HIPAA & NDPR compliant</strong>. Your session is end-to-end encrypted.
            </span>
          </div>

          <p className="text-center text-xs text-[#584048]">
            Patient-facing login?{' '}
            <Link to="/" className="text-[#b5106a] font-semibold hover:underline">
              Back to main portal
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
