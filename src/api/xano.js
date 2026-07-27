import axios from 'axios';

// ─── Xano Base Configuration ───────────────────────────────────────────────
// Replace VITE_XANO_BASE_URL with your Xano workspace API base URL
// e.g. https://xxxx-xxxx-xxxx.xano.io/api:xxxxx
const BASE_URL = import.meta.env.VITE_XANO_BASE_URL || 'https://x8ki-letl-twmt.n7.xano.io/api:qmk6Dsre';

const xano = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token to every request if present
xano.interceptors.request.use((config) => {
  const token = localStorage.getItem('fc_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ───────────────────────────────────────────────────────────────────
export const loginDoctor = (email, password) =>
  xano.post('/auth/login', { email, password });

export const getMeDoctor = () => xano.get('/auth/me');

// ─── Appointments ───────────────────────────────────────────────────────────
export const createAppointment = (data) => xano.post('/appointments', data);
export const getAppointments = () => xano.get('/appointments');
export const getDoctorAppointments = () => xano.get('/doctor/appointments');
export const updateAppointmentStatus = (id, status) =>
  xano.patch(`/appointments/${id}`, { status });

// ─── Patients ────────────────────────────────────────────────────────────────
export const getPatients = () => xano.get('/doctor/patients');

// ─── Payment Verification ────────────────────────────────────────────────────
export const verifyPayment = (reference, appointmentData) =>
  xano.post('/payments/verify', { reference, ...appointmentData });

export default xano;
