import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  Shield,
  Send,
  Copy,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function VideoCallModal({ isOpen, onClose, patientName, roomTitle }) {
  const [micOn, setMicOn] = useState(true);
  const [webcamOn, setWebcamOn] = useState(true);
  const [stream, setStream] = useState(null);
  const [mediaError, setMediaError] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const localVideoRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: 'Encrypted Telehealth session started. HIPAA & NDPR compliant.', time: 'Now' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Request real camera/microphone via WebRTC MediaDevices API
  useEffect(() => {
    let activeStream = null;

    if (isOpen && webcamOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: micOn })
        .then((userStream) => {
          activeStream = userStream;
          setStream(userStream);
          setMediaError('');
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = userStream;
          }
        })
        .catch((err) => {
          console.warn('Camera/Mic access denied or unavailable:', err);
          setMediaError('Camera/Mic permissions not granted or hardware unavailable. Showing preview mode.');
        });
    } else if (!webcamOn && stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, webcamOn]);

  // Handle Mute / Unmute audio tracks dynamically
  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = micOn;
      });
    }
  }, [micOn, stream]);

  // Live timer
  useEffect(() => {
    let timer;
    if (isOpen) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const meetingId = 'fc-room-' + Math.random().toString(36).substring(2, 9);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://feminacare.app/call/${meetingId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'Dr. S. Jenkins', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);
    setNewMessage('');
  };

  const handleCloseCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25181c]/80 backdrop-blur-md">
      <div className="bg-[#16171d] text-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden border border-gray-800 shadow-2xl relative">
        
        {/* Top Bar */}
        <div className="h-16 px-6 bg-[#1f2028] border-b border-gray-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#b5106a] flex items-center justify-center text-white">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-['Manrope'] font-bold text-sm text-white">
                {roomTitle || 'Telehealth Video Consultation'}
              </h3>
              <p className="text-xs text-gray-400">Patient: <span className="text-[#ffb0cc] font-semibold">{patientName || 'Aisha Bello'}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#006e08]/20 border border-[#88fc77]/30 text-[#88fc77] text-xs font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>VideoSDK Live WebRTC</span>
            </div>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Invite Link'}
            </button>

            <button
              onClick={handleCloseCall}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Area + Optional Chat Sidebar */}
        <div className="flex-1 flex overflow-hidden relative">

          {/* Main Video Viewport */}
          <div className="flex-1 bg-[#0d0e12] relative flex items-center justify-center p-4">
            
            {/* Patient Stream Container */}
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gray-900 border border-gray-800 flex items-center justify-center">
              
              {/* Patient Feed */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
                alt="Patient Video Feed"
                className="w-full h-full object-cover"
              />

              {/* Patient Overlay Label */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 text-xs text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{patientName || 'Aisha Bello'} (Patient)</span>
              </div>

              {/* Doctor Real Camera Feed (WebRTC) */}
              <div className="absolute top-4 right-4 w-48 h-36 rounded-2xl overflow-hidden border-2 border-[#b5106a] shadow-2xl bg-black relative flex items-center justify-center">
                {webcamOn ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-xs text-gray-400 p-2 text-center">
                    <VideoOff className="w-6 h-6 text-red-400 mb-1" />
                    <span>Camera Off</span>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 text-[10px] font-bold text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
                  You (Doctor)
                </div>
              </div>

              {/* Hardware Warning Alert if permission rejected */}
              {mediaError && (
                <div className="absolute top-4 left-4 bg-amber-900/80 backdrop-blur-md border border-amber-500/50 text-amber-200 text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 max-w-md">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{mediaError}</span>
                </div>
              )}
            </div>

          </div>

          {/* Chat Sidebar Panel */}
          {chatOpen && (
            <div className="w-80 bg-[#1f2028] border-l border-gray-800 flex flex-col">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h4 className="font-['Manrope'] font-bold text-sm text-white">Consultation Chat</h4>
                <button onClick={() => setChatOpen(false)} className="text-xs text-gray-400 hover:text-white cursor-pointer">✕</button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl text-xs space-y-1 ${
                      msg.sender === 'System'
                        ? 'bg-[#ffe8ee]/10 border border-[#b5106a]/30 text-[#ffb0cc]'
                        : msg.sender === 'Dr. S. Jenkins'
                        ? 'bg-[#b5106a] text-white ml-6'
                        : 'bg-gray-800 text-gray-200 mr-6'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] opacity-75">
                      <span className="font-bold">{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-800 flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type message or clinical note…"
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#b5106a]"
                />
                <button type="submit" className="p-2 bg-[#b5106a] rounded-xl text-white hover:bg-[#d63384] cursor-pointer">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Bottom Call Controls Dock */}
        <div className="h-20 bg-[#1f2028] border-t border-gray-800 flex items-center justify-between px-8 shrink-0">
          
          <div className="text-xs text-gray-400">
            Duration: <span className="font-mono text-white font-bold">{formatTime(seconds)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Microphone Toggle */}
            <button
              onClick={() => setMicOn(!micOn)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                micOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-500/20 border border-red-500 text-red-400'
              }`}
              title={micOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            {/* Camera Toggle */}
            <button
              onClick={() => setWebcamOn(!webcamOn)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                webcamOn ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-red-500/20 border border-red-500 text-red-400'
              }`}
              title={webcamOn ? 'Turn Camera Off' : 'Turn Camera On'}
            >
              {webcamOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            {/* Chat Toggle */}
            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                chatOpen ? 'bg-[#b5106a] text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
              title="Toggle Consultation Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* End Call Button */}
            <button
              onClick={handleCloseCall}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-red-900/40 cursor-pointer"
            >
              <PhoneOff className="w-5 h-5" />
              End Call
            </button>
          </div>

          <div className="text-xs text-gray-400 flex items-center gap-1">
            <Users className="w-4 h-4 text-[#b5106a]" />
            2 Participants
          </div>

        </div>

      </div>
    </div>
  );
}
