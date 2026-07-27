import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  LayoutDashboard,
  CalendarDays,
  Users,
  MessageSquare,
  FileText,
  Banknote,
  Settings,
  LogOut,
  Star,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Bell,
  Activity,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDoctorAppointments, getPatients, updateAppointmentStatus } from '../api/xano';

// ── Sidebar Navigation ─────────────────────────────────────────────────────
const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { label: 'Appointments', icon: CalendarDays, key: 'appointments', badge: true },
  { label: 'Patient Directory', icon: Users, key: 'patients' },
  { label: 'Messages', icon: MessageSquare, key: 'messages' },
  { label: 'Prescriptions', icon: FileText, key: 'prescriptions' },
  { label: 'Revenue', icon: Banknote, key: 'revenue' },
];

function Sidebar({ active, setActive, doctor, onLogout }) {
  return (
    <aside className="w-72 shrink-0 flex flex-col gap-8 bg-white border-r border-[#dfbec8] min-h-screen p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b5106a] to-[#d63384] flex items-center justify-center shadow text-white">
          <Heart className="w-4 h-4 fill-white" />
        </div>
        <span className="font-['Manrope'] font-extrabold text-lg text-[#25181c]">
          Femina<span className="text-[#b5106a]">Care</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, icon: Icon, key, badge }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all relative text-left cursor-pointer w-full ${
              active === key
                ? 'bg-[#ffe8ee] text-[#b5106a]'
                : 'text-[#584048] hover:bg-[#fff0f3] hover:text-[#b5106a]'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
            {badge && (
              <span className="absolute right-4 w-2 h-2 bg-[#b5106a] rounded-full" />
            )}
          </button>
        ))}

        <div className="my-3 border-t border-[#dfbec8]" />

        <button
          onClick={() => setActive('settings')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full text-left cursor-pointer ${
            active === 'settings' ? 'bg-[#ffe8ee] text-[#b5106a]' : 'text-[#584048] hover:bg-[#fff0f3]'
          }`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </nav>

      {/* Doctor Profile Card */}
      <div className="mt-auto p-4 bg-[#fff0f3] rounded-2xl border border-[#dfbec8]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#b5106a] to-[#d63384] flex items-center justify-center text-white text-lg font-bold shrink-0">
            {doctor?.name?.[4] || 'D'}
          </div>
          <div className="min-w-0">
            <p className="font-['Manrope'] font-bold text-sm text-[#25181c] truncate">
              {doctor?.name || 'Dr. Practitioner'}
            </p>
            <p className="text-xs text-[#584048]">{doctor?.specialty || 'Gynecologist'}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-[#584048] mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Shift: 08:00 – 17:00</span>
          <span className="text-[#006e08] font-bold">● Active</span>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-[#b5106a] bg-white border border-[#dfbec8] hover:bg-[#b5106a] hover:text-white transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dfbec8] flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs text-[#584048] font-medium">{label}</p>
        <p className="font-['Manrope'] text-2xl font-bold text-[#25181c]">{value}</p>
      </div>
    </div>
  );
}

// ── Appointment Row ────────────────────────────────────────────────────────
function AppointmentRow({ appt, onAction }) {
  const statusColors = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-[#88fc77]/20 text-[#006e08] border-[#88fc77]',
    cancelled: 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20',
    completed: 'bg-[#eaddff] text-[#712ae2] border-[#d2bbff]',
  };
  const status = appt.status || 'pending';
  return (
    <div className="flex items-center justify-between py-4 border-b border-[#dfbec8]/40 last:border-0 group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#ffe8ee] flex items-center justify-center text-sm font-bold text-[#b5106a] shrink-0">
          {appt.patient_name?.[0] || 'P'}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#25181c]">{appt.patient_name || 'Patient'}</p>
          <p className="text-xs text-[#584048]">
            {appt.date || '–'} · {appt.type || 'Consultation'} · {appt.time || ''}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-bold border capitalize ${statusColors[status]}`}>
          {status}
        </span>
        {status === 'pending' && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onAction(appt.id, 'confirmed')}
              className="w-7 h-7 rounded-full bg-[#88fc77]/20 text-[#006e08] flex items-center justify-center hover:bg-[#88fc77]/40 transition-colors cursor-pointer"
              title="Confirm"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onAction(appt.id, 'cancelled')}
              className="w-7 h-7 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center hover:bg-[#ba1a1a]/20 transition-colors cursor-pointer"
              title="Cancel"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Mock data fallback when Xano is not yet connected ─────────────────────
const MOCK_APPOINTMENTS = [
  { id: 1, patient_name: 'Aisha Bello', date: 'Jul 28, 2026', time: '09:00 AM', type: 'Annual Wellness Exam', status: 'confirmed', amount: 15000 },
  { id: 2, patient_name: 'Fatima Musa', date: 'Jul 28, 2026', time: '10:30 AM', type: 'Prenatal Checkup', status: 'pending', amount: 15000 },
  { id: 3, patient_name: 'Ngozi Okafor', date: 'Jul 28, 2026', time: '12:00 PM', type: 'Hormonal Screening', status: 'pending', amount: 15000 },
  { id: 4, patient_name: 'Sarah Adeyemi', date: 'Jul 27, 2026', time: '03:00 PM', type: 'Follow-up', status: 'completed', amount: 15000 },
];

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function DoctorDashboard() {
  const { doctor, logout } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState('dashboard');
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [patients, setPatients] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    setLoadingData(true);
    getDoctorAppointments()
      .then((res) => setAppointments(res.data?.length ? res.data : MOCK_APPOINTMENTS))
      .catch(() => setAppointments(MOCK_APPOINTMENTS))
      .finally(() => setLoadingData(false));

    getPatients()
      .then((res) => setPatients(res.data || []))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/doctor/login');
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch {
      // optimistic update anyway (for demo)
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    }
  };

  const pending = appointments.filter((a) => a.status === 'pending').length;
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
  const revenue = appointments
    .filter((a) => a.status === 'completed')
    .reduce((sum, a) => sum + (a.amount || 15000), 0);

  return (
    <div className="flex min-h-screen bg-[#fff8f8]">
      <Sidebar active={active} setActive={setActive} doctor={doctor} onLogout={handleLogout} />

      {/* ── Main Content ── */}
      <main className="flex-1 min-w-0 p-8 space-y-8 overflow-auto">

        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#b5106a]">
              Workspace Overview
            </span>
            <h1 className="font-['Manrope'] text-3xl font-extrabold text-[#25181c] mt-1">
              Welcome back, {doctor?.name?.split(' ')[1] || 'Doctor'}.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white border border-[#dfbec8] flex items-center justify-center text-[#584048] hover:bg-[#ffe8ee] hover:text-[#b5106a] transition-colors relative cursor-pointer">
              <Bell className="w-5 h-5" />
              {pending > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#b5106a] text-white text-[9px] font-bold flex items-center justify-center">
                  {pending}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Total Patients" value="1,284" icon={Users} accent="bg-[#ffe8ee] text-[#b5106a]" />
          <StatCard label="Today's Consults" value={confirmed} icon={CalendarDays} accent="bg-[#eaddff] text-[#712ae2]" />
          <StatCard label="Avg Rating" value="4.9" icon={Star} accent="bg-amber-50 text-amber-600" />
          <StatCard
            label="Revenue (Completed)"
            value={`₦${revenue.toLocaleString()}`}
            icon={Banknote}
            accent="bg-[#88fc77]/20 text-[#006e08]"
          />
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-12 gap-8">

          {/* Today's Appointment Schedule (8 cols) */}
          <section className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border-l-4 border-[#b5106a]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#b5106a]" />
                <h2 className="font-['Manrope'] text-lg font-bold text-[#25181c]">Today's Schedule</h2>
              </div>
              <button className="text-xs font-bold text-[#b5106a] hover:underline cursor-pointer">
                View Full Calendar
              </button>
            </div>

            {loadingData ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-[#b5106a] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div>
                {appointments.map((appt) => (
                  <AppointmentRow key={appt.id} appt={appt} onAction={handleStatusUpdate} />
                ))}
              </div>
            )}
          </section>

          {/* Right Panel (4 cols) */}
          <div className="col-span-12 lg:col-span-4 space-y-5">

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#dfbec8]">
              <h3 className="font-['Manrope'] font-bold text-sm text-[#25181c] mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { label: 'Start Video Consultation', color: 'bg-[#b5106a] text-white' },
                  { label: 'Write Prescription', color: 'bg-[#ffe8ee] text-[#b5106a]' },
                  { label: 'Add Patient Record', color: 'bg-[#eaddff] text-[#712ae2]' },
                ].map(({ label, color }) => (
                  <button
                    key={label}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold ${color} hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    {label}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* Pending Appointments Alert */}
            {pending > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Action Required</p>
                <p className="font-['Manrope'] font-bold text-2xl text-amber-800 mb-1">{pending}</p>
                <p className="text-xs text-amber-700">
                  Appointment{pending > 1 ? 's' : ''} awaiting your confirmation.
                </p>
              </div>
            )}

            {/* Revenue Summary */}
            <div className="bg-[#3b2c31] text-[#ffecf0] rounded-2xl p-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#dfbec8]">Monthly Revenue</p>
              <p className="font-['Manrope'] text-3xl font-extrabold">
                ₦{(revenue + 225000).toLocaleString()}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#ffb0cc]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#88fc77]" />
                All payments via Paystack
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
