import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Video,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  Pill,
  ShieldCheck,
  PhoneCall,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getDoctorAppointments, getPatients, updateAppointmentStatus } from '../api/xano';
import VideoCallModal from '../components/VideoCallModal';

// ── Sidebar Nav Configuration ─────────────────────────────────────────────
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
    <aside className="w-72 shrink-0 flex flex-col gap-6 bg-white border-r border-[#dfbec8] min-h-screen p-6 sticky top-0 h-screen overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#b5106a] to-[#d63384] flex items-center justify-center shadow text-white">
          <Heart className="w-4 h-4 fill-white" />
        </div>
        <span className="font-['Manrope'] font-extrabold text-lg text-[#25181c]">
          Femina<span className="text-[#b5106a]">Care</span>
        </span>
      </div>

      {/* Nav Buttons */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {navItems.map(({ label, icon: Icon, key, badge }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all relative text-left cursor-pointer w-full ${
              active === key
                ? 'bg-[#ffe8ee] text-[#b5106a] shadow-xs font-bold'
                : 'text-[#584048] hover:bg-[#fff0f3] hover:text-[#b5106a]'
            }`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {label}
            {badge && (
              <span className="absolute right-4 w-2.5 h-2.5 bg-[#b5106a] rounded-full border-2 border-white" />
            )}
          </button>
        ))}

        <div className="my-2 border-t border-[#dfbec8]" />

        <button
          onClick={() => setActive('settings')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full text-left cursor-pointer ${
            active === 'settings' ? 'bg-[#ffe8ee] text-[#b5106a] font-bold' : 'text-[#584048] hover:bg-[#fff0f3]'
          }`}
        >
          <Settings className="w-5 h-5" />
          Settings
        </button>
      </nav>

      {/* Doctor Profile Card */}
      <div className="p-4 bg-[#fff0f3] rounded-2xl border border-[#dfbec8]">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#b5106a] to-[#d63384] flex items-center justify-center text-white text-lg font-bold shrink-0 shadow-sm">
            {doctor?.name?.[4] || 'D'}
          </div>
          <div className="min-w-0">
            <p className="font-['Manrope'] font-bold text-sm text-[#25181c] truncate">
              {doctor?.name || 'Dr. Practitioner'}
            </p>
            <p className="text-xs text-[#584048] truncate">{doctor?.specialty || 'Gynecologist'}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs text-[#584048] mb-3">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#b5106a]" /> Shift: 08:00 – 17:00</span>
          <span className="text-[#006e08] font-bold">● Active</span>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold text-[#b5106a] bg-white border border-[#dfbec8] hover:bg-[#b5106a] hover:text-white transition-all cursor-pointer shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

// ── Mock Data Fallbacks ───────────────────────────────────────────────────
const MOCK_APPOINTMENTS = [
  { id: 1, patient_name: 'Aisha Bello', date: 'Jul 28, 2026', time: '09:00 AM', type: 'Annual Wellness Exam', status: 'confirmed', amount: 15000 },
  { id: 2, patient_name: 'Fatima Musa', date: 'Jul 28, 2026', time: '10:30 AM', type: 'Prenatal Checkup', status: 'pending', amount: 15000 },
  { id: 3, patient_name: 'Ngozi Okafor', date: 'Jul 28, 2026', time: '12:00 PM', type: 'Hormonal Screening', status: 'pending', amount: 15000 },
  { id: 4, patient_name: 'Sarah Adeyemi', date: 'Jul 27, 2026', time: '03:00 PM', type: 'Follow-up', status: 'completed', amount: 15000 },
];

const MOCK_PATIENTS = [
  { id: 1, name: 'Aisha Bello', age: 29, blood_group: 'O+', last_visit: 'Jul 28, 2026', condition: 'Prenatal Care (Trimester 2)', phone: '+234 802 123 4567' },
  { id: 2, name: 'Fatima Musa', age: 34, blood_group: 'A+', last_visit: 'Jul 14, 2026', condition: 'Hormonal Optimization', phone: '+234 803 987 6543' },
  { id: 3, name: 'Ngozi Okafor', age: 26, blood_group: 'B+', last_visit: 'Jun 30, 2026', condition: 'Routine Annual Exam', phone: '+234 811 444 5555' },
  { id: 4, name: 'Sarah Adeyemi', age: 41, blood_group: 'O-', last_visit: 'Jul 27, 2026', condition: 'Post-Surgical Checkup', phone: '+234 809 111 2222' },
];

const MOCK_MESSAGES = [
  { id: 1, sender: 'Aisha Bello', text: 'Good morning Dr. Vance! Should I continue taking the prenatal vitamins?', time: '08:30 AM', unread: true },
  { id: 2, sender: 'Fatima Musa', text: 'Thank you for the prescription yesterday, feeling much better.', time: 'Yesterday', unread: false },
  { id: 3, sender: 'Ngozi Okafor', text: 'Is it possible to reschedule my appointment to 2 PM?', time: 'Jul 25', unread: false },
];

const MOCK_PRESCRIPTIONS = [
  { id: 'RX-9821', patient: 'Aisha Bello', drug: 'Folice Acid 5mg + Prenatal Multi', dosage: '1 tablet daily with meals', duration: '90 Days', status: 'Active' },
  { id: 'RX-9742', patient: 'Fatima Musa', drug: 'Progesterone 200mg Capsules', dosage: '1 capsule at bedtime', duration: '30 Days', status: 'Active' },
  { id: 'RX-9610', patient: 'Sarah Adeyemi', drug: 'Amoxicillin 500mg', dosage: '1 capsule 3x daily for 7 days', duration: '7 Days', status: 'Completed' },
];

// ──────────────────────────────────────────────────────────────────────────
// 1. DASHBOARD VIEW
// ──────────────────────────────────────────────────────────────────────────
function DashboardView({ doctor, appointments, onStatusUpdate, onStartVideoCall }) {
  const pending = appointments.filter((a) => a.status === 'pending').length;
  const confirmed = appointments.filter((a) => a.status === 'confirmed').length;

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#b5106a]">
            Workspace Overview
          </span>
          <h1 className="font-['Manrope'] text-3xl font-extrabold text-[#25181c] mt-1">
            Welcome back, {doctor?.name?.split(' ')?.[1] || 'Doctor'}.
          </h1>
        </div>
        <button
          onClick={() => onStartVideoCall('Aisha Bello')}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#b5106a] to-[#d63384] text-white font-bold text-sm shadow-md shadow-[#b5106a]/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Video className="w-4 h-4" />
          Start Telehealth Call
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-[#dfbec8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ffe8ee] text-[#b5106a] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#584048] font-medium">Total Patients</p>
            <p className="font-['Manrope'] text-2xl font-bold text-[#25181c]">1,284</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dfbec8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#eaddff] text-[#712ae2] flex items-center justify-center font-bold">
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#584048] font-medium">Today's Consults</p>
            <p className="font-['Manrope'] text-2xl font-bold text-[#25181c]">{confirmed}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dfbec8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#584048] font-medium">Avg Rating</p>
            <p className="font-['Manrope'] text-2xl font-bold text-[#25181c]">4.9</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dfbec8] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#88fc77]/20 text-[#006e08] flex items-center justify-center font-bold">
            <Banknote className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-[#584048] font-medium">Revenue Today</p>
            <p className="font-['Manrope'] text-2xl font-bold text-[#25181c]">₦60,000</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-8">
        <section className="col-span-12 lg:col-span-8 bg-white rounded-3xl p-6 shadow-xs border-l-4 border-[#b5106a]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-['Manrope'] font-bold text-lg text-[#25181c]">Today's Appointments</h2>
            <span className="text-xs font-semibold text-[#b5106a]">{appointments.length} total</span>
          </div>

          <div className="space-y-4">
            {appointments.map((appt) => (
              <div key={appt.id} className="flex items-center justify-between py-3 border-b border-[#dfbec8]/40 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ffe8ee] text-[#b5106a] font-bold flex items-center justify-center">
                    {appt.patient_name?.[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#25181c]">{appt.patient_name}</p>
                    <p className="text-xs text-[#584048]">{appt.time} · {appt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onStartVideoCall(appt.patient_name)}
                    className="p-2 rounded-xl bg-[#ffe8ee] text-[#b5106a] hover:bg-[#b5106a] hover:text-white transition-colors"
                    title="Launch Video Call"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  {appt.status === 'pending' && (
                    <button
                      onClick={() => onStatusUpdate(appt.id, 'confirmed')}
                      className="px-3 py-1 rounded-full text-xs font-bold bg-[#88fc77]/20 text-[#006e08]"
                    >
                      Confirm
                    </button>
                  )}
                  {appt.status === 'confirmed' && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#88fc77]/20 text-[#006e08]">Confirmed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="col-span-12 lg:col-span-4 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-[#dfbec8] space-y-3">
            <h3 className="font-['Manrope'] font-bold text-sm text-[#25181c]">Telehealth Quick Action</h3>
            <p className="text-xs text-[#584048]">Instant 1-click HD Video Consultation powered by VideoSDK.</p>
            <button
              onClick={() => onStartVideoCall('Aisha Bello')}
              className="w-full py-3 rounded-xl bg-[#b5106a] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#b5106a]/20"
            >
              <Video className="w-4 h-4" />
              Launch Instant Call Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// 2. APPOINTMENTS VIEW
// ──────────────────────────────────────────────────────────────────────────
function AppointmentsView({ appointments, onStatusUpdate, onStartVideoCall }) {
  const [filter, setFilter] = useState('all');
  const filtered = appointments.filter((a) => filter === 'all' || a.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Manrope'] text-2xl font-bold text-[#25181c]">Appointments Schedule</h1>
          <p className="text-xs text-[#584048]">Manage patient consultations, bookings, and telehealth calls.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#dfbec8]">
          {['all', 'pending', 'confirmed', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab ? 'bg-[#b5106a] text-white shadow-xs' : 'text-[#584048] hover:text-[#b5106a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#dfbec8] shadow-xs space-y-4">
        <div className="grid grid-cols-12 text-xs font-bold text-[#584048] uppercase tracking-wider pb-3 border-b border-[#dfbec8]">
          <span className="col-span-4">Patient</span>
          <span className="col-span-3">Date & Time</span>
          <span className="col-span-3">Status / Fee</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {filtered.map((appt) => (
          <div key={appt.id} className="grid grid-cols-12 items-center text-sm py-3 border-b border-[#dfbec8]/40 last:border-0">
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#ffe8ee] text-[#b5106a] font-bold flex items-center justify-center shrink-0">
                {appt.patient_name?.[0]}
              </div>
              <div>
                <p className="font-bold text-[#25181c]">{appt.patient_name}</p>
                <p className="text-xs text-[#584048]">{appt.type}</p>
              </div>
            </div>

            <div className="col-span-3 text-xs text-[#584048]">
              <p className="font-semibold text-[#25181c]">{appt.date}</p>
              <p>{appt.time}</p>
            </div>

            <div className="col-span-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#88fc77]/20 text-[#006e08] capitalize">
                {appt.status}
              </span>
              <span className="text-xs font-bold text-[#b5106a]">₦15,000</span>
            </div>

            <div className="col-span-2 flex items-center justify-end gap-2">
              <button
                onClick={() => onStartVideoCall(appt.patient_name)}
                className="p-2 rounded-xl bg-[#ffe8ee] text-[#b5106a] hover:bg-[#b5106a] hover:text-white transition-all cursor-pointer"
                title="Start Video Call"
              >
                <Video className="w-4 h-4" />
              </button>
              {appt.status === 'pending' && (
                <button
                  onClick={() => onStatusUpdate(appt.id, 'confirmed')}
                  className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all"
                  title="Confirm Appointment"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// 3. PATIENTS DIRECTORY VIEW
// ──────────────────────────────────────────────────────────────────────────
function PatientsView() {
  const [search, setSearch] = useState('');
  const filtered = MOCK_PATIENTS.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.condition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Manrope'] text-2xl font-bold text-[#25181c]">Patient Directory</h1>
          <p className="text-xs text-[#584048]">Comprehensive medical records and clinical profiles.</p>
        </div>
        <div className="relative w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b7078]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient or condition…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#dfbec8] bg-white text-xs text-[#25181c] outline-none focus:border-[#b5106a]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((patient) => (
          <div key={patient.id} className="bg-white rounded-3xl p-6 border border-[#dfbec8] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#dfbec8]/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#b5106a] to-[#d63384] text-white font-bold flex items-center justify-center text-lg">
                  {patient.name[0]}
                </div>
                <div>
                  <h3 className="font-['Manrope'] font-bold text-base text-[#25181c]">{patient.name}</h3>
                  <p className="text-xs text-[#584048]">Age: {patient.age} · Blood: <span className="font-bold text-[#b5106a]">{patient.blood_group}</span></p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ffe8ee] text-[#b5106a]">Active Patient</span>
            </div>

            <div className="space-y-2 text-xs text-[#584048]">
              <p><strong className="text-[#25181c]">Condition:</strong> {patient.condition}</p>
              <p><strong className="text-[#25181c]">Last Visit:</strong> {patient.last_visit}</p>
              <p><strong className="text-[#25181c]">Contact:</strong> {patient.phone}</p>
            </div>

            <div className="pt-2 flex gap-3">
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#fff0f3] text-[#b5106a] hover:bg-[#b5106a] hover:text-white transition-all cursor-pointer">
                View EHR Records
              </button>
              <button className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#eaddff] text-[#712ae2] hover:opacity-90 transition-all cursor-pointer">
                New Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// 4. MESSAGES VIEW
// ──────────────────────────────────────────────────────────────────────────
function MessagesView() {
  const [selectedMsg, setSelectedMsg] = useState(MOCK_MESSAGES[0]);
  const [chatText, setChatText] = useState('');
  const [messagesList, setMessagesList] = useState([
    { sender: 'Aisha Bello', text: 'Good morning Dr. Vance! Should I continue taking the prenatal vitamins?', time: '08:30 AM' },
    { sender: 'Dr. Vance', text: 'Good morning Aisha. Yes, please continue with 1 tablet daily.', time: '08:35 AM' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    setMessagesList((prev) => [...prev, { sender: 'Dr. Vance', text: chatText, time: 'Just now' }]);
    setChatText('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Manrope'] text-2xl font-bold text-[#25181c]">Patient Messages</h1>
        <p className="text-xs text-[#584048]">Secure HIPAA-compliant patient communication channel.</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#dfbec8] shadow-xs flex h-[600px] overflow-hidden">
        {/* Inbox List */}
        <div className="w-80 border-r border-[#dfbec8] flex flex-col bg-[#fff8f8]">
          <div className="p-4 border-b border-[#dfbec8]">
            <h3 className="font-bold text-sm text-[#25181c]">Inbox (3)</h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-[#dfbec8]/40">
            {MOCK_MESSAGES.map((msg) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMsg(msg)}
                className={`p-4 cursor-pointer transition-all ${
                  selectedMsg.id === msg.id ? 'bg-[#ffe8ee] border-l-4 border-[#b5106a]' : 'hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-bold text-sm text-[#25181c]">{msg.sender}</p>
                  <span className="text-[10px] text-[#584048]">{msg.time}</span>
                </div>
                <p className="text-xs text-[#584048] truncate">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Active Chat Thread */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-4 border-b border-[#dfbec8] flex items-center justify-between">
            <div>
              <p className="font-bold text-sm text-[#25181c]">{selectedMsg.sender}</p>
              <p className="text-xs text-[#006e08]">● Patient Online</p>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messagesList.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-md ${
                  m.sender === 'Dr. Vance' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`p-4 rounded-2xl text-xs space-y-1 ${
                    m.sender === 'Dr. Vance'
                      ? 'bg-[#b5106a] text-white rounded-br-none'
                      : 'bg-[#fff0f3] text-[#25181c] border border-[#dfbec8] rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                </div>
                <span className="text-[10px] text-[#584048] mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-[#dfbec8] flex gap-3">
            <input
              type="text"
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              placeholder="Type your response to patient…"
              className="flex-1 border border-[#dfbec8] rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#b5106a]"
            />
            <button type="submit" className="px-5 py-2.5 bg-[#b5106a] text-white rounded-xl text-xs font-bold hover:bg-[#d63384] transition-colors">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// 5. PRESCRIPTIONS VIEW
// ──────────────────────────────────────────────────────────────────────────
function PrescriptionsView() {
  const [rxList, setRxList] = useState(MOCK_PRESCRIPTIONS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newRx, setNewRx] = useState({ patient: 'Aisha Bello', drug: '', dosage: '', duration: '30 Days' });

  const handleCreateRx = (e) => {
    e.preventDefault();
    setRxList((prev) => [
      { id: `RX-${Math.floor(1000 + Math.random() * 9000)}`, ...newRx, status: 'Active' },
      ...prev,
    ]);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-['Manrope'] text-2xl font-bold text-[#25181c]">E-Prescriptions</h1>
          <p className="text-xs text-[#584048]">Issue and manage electronic prescriptions for registered patients.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#b5106a] text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          Issue New E-Prescription
        </button>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#dfbec8] shadow-xs space-y-4">
        <div className="grid grid-cols-12 text-xs font-bold text-[#584048] uppercase tracking-wider pb-3 border-b border-[#dfbec8]">
          <span className="col-span-2">Rx Code</span>
          <span className="col-span-3">Patient</span>
          <span className="col-span-4">Medication & Dosage</span>
          <span className="col-span-3 text-right">Status</span>
        </div>

        {rxList.map((rx) => (
          <div key={rx.id} className="grid grid-cols-12 items-center text-sm py-3 border-b border-[#dfbec8]/40 last:border-0">
            <span className="col-span-2 font-mono text-xs font-bold text-[#b5106a]">{rx.id}</span>
            <span className="col-span-3 font-semibold text-[#25181c]">{rx.patient}</span>
            <div className="col-span-4 text-xs text-[#584048]">
              <p className="font-bold text-[#25181c]">{rx.drug}</p>
              <p>{rx.dosage} ({rx.duration})</p>
            </div>
            <div className="col-span-3 text-right">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#88fc77]/20 text-[#006e08]">
                {rx.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#dfbec8] shadow-2xl space-y-4">
            <h3 className="font-['Manrope'] font-bold text-lg text-[#25181c]">Issue New Prescription</h3>
            <form onSubmit={handleCreateRx} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#584048] mb-1">Patient</label>
                <select
                  value={newRx.patient}
                  onChange={(e) => setNewRx({ ...newRx, patient: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#dfbec8] text-xs"
                >
                  <option>Aisha Bello</option>
                  <option>Fatima Musa</option>
                  <option>Ngozi Okafor</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#584048] mb-1">Drug Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Folic Acid 5mg"
                  value={newRx.drug}
                  onChange={(e) => setNewRx({ ...newRx, drug: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#dfbec8] text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#584048] mb-1">Dosage Instructions</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 tablet daily"
                  value={newRx.dosage}
                  onChange={(e) => setNewRx({ ...newRx, dosage: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#dfbec8] text-xs"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-3 rounded-xl border border-[#dfbec8] text-xs font-bold text-[#584048]">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-[#b5106a] text-white text-xs font-bold">
                  Confirm Rx
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// 6. REVENUE VIEW
// ──────────────────────────────────────────────────────────────────────────
function RevenueView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-['Manrope'] text-2xl font-bold text-[#25181c]">Financial & Revenue Analytics</h1>
        <p className="text-xs text-[#584048]">Paystack consultation fee payouts and revenue performance.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#dfbec8] shadow-xs space-y-2">
          <p className="text-xs text-[#584048] font-bold uppercase">Total Revenue (July)</p>
          <p className="font-['Manrope'] text-3xl font-extrabold text-[#b5106a]">₦285,000</p>
          <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +18.4% from last month
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#dfbec8] shadow-xs space-y-2">
          <p className="text-xs text-[#584048] font-bold uppercase">Consultation Fee Rate</p>
          <p className="font-['Manrope'] text-3xl font-extrabold text-[#712ae2]">₦15,000</p>
          <p className="text-xs text-[#584048]">Fixed rate via Paystack</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#dfbec8] shadow-xs space-y-2">
          <p className="text-xs text-[#584048] font-bold uppercase">Paid Consultations</p>
          <p className="font-['Manrope'] text-3xl font-extrabold text-[#006e08]">19 Visits</p>
          <p className="text-xs text-[#584048]">100% verified transactions</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// 7. SETTINGS VIEW
// ──────────────────────────────────────────────────────────────────────────
function SettingsView({ doctor }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-['Manrope'] text-2xl font-bold text-[#25181c]">Workspace Settings</h1>
        <p className="text-xs text-[#584048]">Manage doctor profile, shift schedules, and notification preferences.</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#dfbec8] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#25181c] border-b border-[#dfbec8] pb-3">Doctor Profile</h3>
        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-xs font-semibold text-[#584048] mb-1">Full Name</label>
            <input type="text" defaultValue={doctor?.name || 'Dr. Elena Vance, MD'} className="w-full p-3 rounded-xl border border-[#dfbec8] text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#584048] mb-1">Specialty</label>
            <input type="text" defaultValue={doctor?.specialty || 'Obstetrics & Prenatal'} className="w-full p-3 rounded-xl border border-[#dfbec8] text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#584048] mb-1">Shift Hours</label>
            <input type="text" defaultValue="08:00 AM - 05:00 PM" className="w-full p-3 rounded-xl border border-[#dfbec8] text-xs" />
          </div>
          <button className="px-6 py-3 rounded-xl bg-[#b5106a] text-white text-xs font-bold hover:bg-[#d63384] transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// MAIN DOCTOR DASHBOARD WRAPPER WITH ALL NAVIGATION & VIDEO SDK MODAL
// ──────────────────────────────────────────────────────────────────────────
export default function DoctorDashboard() {
  const { doctor, logout } = useAuth();
  const navigate = useNavigate();

  const [active, setActive] = useState('dashboard');
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  // VideoSDK Modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activePatient, setActivePatient] = useState('Aisha Bello');

  useEffect(() => {
    getDoctorAppointments()
      .then((res) => {
        if (res.data?.length) setAppointments(res.data);
      })
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/doctor/login');
  };

  const handleStatusUpdate = (id, status) => {
    updateAppointmentStatus(id, status).catch(() => {});
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const handleStartVideoCall = (patientName) => {
    setActivePatient(patientName || 'Aisha Bello');
    setVideoModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-[#fff8f8]">
      <Sidebar active={active} setActive={setActive} doctor={doctor} onLogout={handleLogout} />

      <main className="flex-1 min-w-0 p-8 overflow-auto">
        {active === 'dashboard' && (
          <DashboardView
            doctor={doctor}
            appointments={appointments}
            onStatusUpdate={handleStatusUpdate}
            onStartVideoCall={handleStartVideoCall}
          />
        )}

        {active === 'appointments' && (
          <AppointmentsView
            appointments={appointments}
            onStatusUpdate={handleStatusUpdate}
            onStartVideoCall={handleStartVideoCall}
          />
        )}

        {active === 'patients' && <PatientsView />}
        {active === 'messages' && <MessagesView />}
        {active === 'prescriptions' && <PrescriptionsView />}
        {active === 'revenue' && <RevenueView />}
        {active === 'settings' && <SettingsView doctor={doctor} />}
      </main>

      {/* VideoSDK Telehealth Video Call Modal */}
      <VideoCallModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        patientName={activePatient}
        roomTitle="FeminaCare Encrypted Consultation"
      />
    </div>
  );
}
