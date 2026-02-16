
import React, { useState } from 'react';

type ViewState = 'landing' | 'admin' | 'submission' | 'analytics' | 'onboarding' | 'auth' | 'partnership';

export default function PartnershipForm({ onNavigate }: { onNavigate?: (view: ViewState) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    interest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log('Partnership request:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-deep-blue flex items-center justify-center p-6 text-white font-display">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="size-24 rounded-full bg-accent/20 flex items-center justify-center text-accent mx-auto">
            <span className="material-symbols-outlined text-5xl">verified</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight">Application Received!</h1>
          <p className="text-white/70 text-lg">
            Thank you, <span className="text-accent font-bold">{formData.fullName}</span>. Our partnership team will review your message and reach out to <span className="text-accent">{formData.email}</span> shortly.
          </p>
          <button 
            onClick={() => onNavigate && onNavigate('landing')}
            className="w-full bg-accent text-primary font-bold py-4 rounded-xl hover:bg-yellow-300 transition-all shadow-lg"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-deep-blue text-white font-display overflow-x-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none"></div>

      {/* Navigation */}
      <header className="flex items-center justify-between p-6 md:px-12 relative z-10">
        <button onClick={() => onNavigate && onNavigate('landing')} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group">
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="font-bold">Back to Home</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="size-8 text-accent">
            <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <span className="text-xl font-bold">Amaliyot Ofisi</span>
        </div>
      </header>

      {/* Form Section */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-8 animate-in slide-in-from-left-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit">
              <span className="material-symbols-outlined text-accent text-sm">handshake</span>
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Partnership</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Let's Build the <br/><span className="text-accent">Future Together</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-md">
              Whether you're a university looking to place students or an organization seeking fresh talent, our platform is built to facilitate meaningful growth.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <div>
                  <h4 className="font-bold">Global Network</h4>
                  <p className="text-sm text-white/40">Connect with 500+ academic partners.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-accent">
                  <span className="material-symbols-outlined">query_stats</span>
                </div>
                <div>
                  <h4 className="font-bold">Real-time Analytics</h4>
                  <p className="text-sm text-white/40">Track placement success and ROI.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-10 shadow-2xl animate-in slide-in-from-right-4 duration-700">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder:text-white/20"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">Gmail / Professional Email</label>
                <input 
                  required
                  type="email" 
                  placeholder="name@gmail.com" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder:text-white/20"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">Organization / University Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. State Tech University" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder:text-white/20"
                  value={formData.organization}
                  onChange={e => setFormData({...formData, organization: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white/70">Partnership Interests</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe what type of partnership you are interested in (e.g., student placement, event sponsorship, mentoring)..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder:text-white/20 resize-none"
                  value={formData.interest}
                  onChange={e => setFormData({...formData, interest: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-accent text-primary font-black text-lg py-4 rounded-xl hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-3 mt-4"
              >
                Send Partnership Request
                <span className="material-symbols-outlined">send</span>
              </button>

              <p className="text-center text-xs text-white/30 px-4">
                By submitting, you agree to our Terms of Partnership and permit us to contact you regarding your request.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="p-8 text-center text-white/20 text-xs mt-auto">
        © 2024 Amaliyot Ofisi Platform. Professional Partnership Portal.
      </footer>
    </div>
  );
}
