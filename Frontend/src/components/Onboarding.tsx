import React, { useState } from 'react';

type ViewState = 'landing' | 'admin' | 'submission' | 'analytics' | 'onboarding' | 'auth';

export default function Onboarding({ onNavigate }: { onNavigate?: (view: ViewState) => void }) {
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'completed'>('idle');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setUploadState('uploading');
      // Simulate upload delay
      setTimeout(() => {
        setUploadState('completed');
      }, 2000);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#0f121a] dark:text-white font-display min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 w-full bg-surface-light dark:bg-surface-dark border-b border-[#e8ebf2] dark:border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 gap-4">
            {/* Logo & Nav */}
            <div className="flex items-center gap-8">
              <a className="flex items-center gap-3 text-primary dark:text-white group" href="#">
                <div className="size-8 bg-primary/10 dark:bg-primary/30 rounded-lg flex items-center justify-center text-primary dark:text-blue-300">
                  <span className="material-symbols-outlined filled">school</span>
                </div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight">InternManager</h2>
              </a>
              <nav className="hidden md:flex items-center gap-6">
                <a className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">Dashboard</a>
                <a className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">Programs</a>
                <a className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">Community</a>
                <a className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors" href="#">Resources</a>
              </nav>
            </div>
            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center w-64 bg-[#e8ebf2] dark:bg-gray-800 rounded-lg h-10 px-3 gap-2">
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-[20px]">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 text-gray-900 dark:text-white placeholder:text-gray-500" placeholder="Search..." type="text"/>
              </div>
              <button className="hidden sm:flex items-center justify-center h-10 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-colors shadow-sm shadow-blue-900/20">
                Profile
              </button>
              <button className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover bg-center ring-2 ring-white dark:ring-gray-800" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=12')"}}></button>
              <button className="md:hidden p-2 text-gray-600 dark:text-gray-300">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 pb-24">
        {/* Page Heading */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f121a] dark:text-white tracking-tight mb-3">
                Welcome to Your Journey
              </h1>
              <p className="text-base md:text-lg text-[#536393] dark:text-gray-400 leading-relaxed">
                We're excited to have you! Complete the following steps to get started with your internship program.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wide">
                <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                Onboarding Phase
              </span>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Video Upload */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Upload Card */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="p-6 pb-2">
                <h3 className="text-lg font-bold text-[#0f121a] dark:text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary dark:text-blue-400">video_camera_front</span>
                  Upload Introduction
                </h3>
                <p className="text-sm text-[#536393] dark:text-gray-400 mt-1">Record a 1-minute video introducing yourself to the team.</p>
              </div>
              <div className="p-6 pt-4">
                <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border-2 border-dashed ${uploadState === 'completed' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-primary dark:hover:border-blue-500'} transition-colors group flex flex-col items-center justify-center text-center p-8`}>
                  
                  {uploadState === 'idle' && (
                    <>
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        onChange={handleFileUpload}
                      />
                      <div className="size-16 rounded-full bg-primary/10 dark:bg-primary/30 flex items-center justify-center text-primary dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white">Click or Drag video here</h4>
                      <p className="text-sm text-gray-500 mt-2">MP4, WebM or Ogg (Max 50MB)</p>
                    </>
                  )}

                  {uploadState === 'uploading' && (
                    <div className="flex flex-col items-center w-full max-w-xs">
                       <div className="size-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500 mb-4 animate-bounce">
                        <span className="material-symbols-outlined text-3xl">upload</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2">Uploading...</h4>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[60%] animate-[width_2s_ease-in-out_infinite]"></div>
                      </div>
                    </div>
                  )}

                  {uploadState === 'completed' && (
                    <div className="flex flex-col items-center w-full max-w-xs animate-in fade-in zoom-in duration-300">
                      <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
                        <span className="material-symbols-outlined text-3xl">check_circle</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">Upload Complete!</h4>
                      <p className="text-sm text-gray-500 mb-4">{videoFile?.name}</p>
                      <button onClick={() => setUploadState('idle')} className="text-xs font-bold text-primary dark:text-blue-400 hover:underline">Replace Video</button>
                    </div>
                  )}

                </div>
              </div>
            </div>
            {/* Info Block */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30">
              <h4 className="text-primary dark:text-blue-300 font-bold mb-2 text-sm uppercase tracking-wider">Why is this important?</h4>
              <p className="text-[#0f121a] dark:text-gray-300 text-sm leading-relaxed">
                Your introduction video helps mentors and team members get to know you before the first meeting. Keep it professional but authentic!
              </p>
            </div>
          </div>

          {/* Right Column: Checklist */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 flex flex-col h-full lg:h-auto">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-bold text-[#0f121a] dark:text-white">Onboarding Checklist</h2>
                  <span className="bg-primary/10 dark:bg-primary/30 text-primary dark:text-blue-300 text-xs font-bold px-2 py-1 rounded">1/5 Done</span>
                </div>
                <p className="text-sm text-[#536393] dark:text-gray-400">Required tasks to unlock your dashboard.</p>
                <div className="mt-4 w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[20%] rounded-full transition-all duration-500"></div>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <ChecklistItem label="Create your account" sub="Completed" checked />
                <ChecklistItem label="Read Code of Conduct" sub="Estimated time: 5 mins" />
                <ChecklistItem label="Review Program Rules" sub="Mandatory for compliance" />
                <ChecklistItem label="Upload Intro Video" sub={uploadState === 'completed' ? 'Completed' : 'Upload on the left'} checked={uploadState === 'completed'} />
                <ChecklistItem label="Complete Profile Info" sub="Add photo & bio" />
              </div>
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 mt-auto bg-gray-50/50 dark:bg-gray-800/20 rounded-b-2xl">
                <button className={`w-full flex items-center justify-center gap-2 font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg transform hover:-translate-y-0.5 ${uploadState === 'completed' ? 'bg-primary hover:bg-blue-900 text-white shadow-blue-900/20' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
                  <span>Complete Onboarding</span>
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
                <p className="text-center text-xs text-[#536393] dark:text-gray-500 mt-3">
                  By clicking, you agree to the Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const ChecklistItem = ({ label, sub, checked }: { label: string, sub: string, checked?: boolean }) => (
  <label className="group flex gap-x-4 p-3 -mx-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer items-start">
    <div className="relative flex items-center mt-0.5">
      <input checked={checked} readOnly className="peer h-5 w-5 rounded border-gray-300 dark:border-gray-600 border-2 bg-transparent text-primary checked:bg-primary checked:border-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-all" type="checkbox"/>
    </div>
    <div className="flex flex-col">
      <span className={`text-base font-medium transition-colors ${checked ? 'line-through decoration-gray-400 dark:decoration-gray-600 text-gray-400 dark:text-gray-500' : 'text-[#0f121a] dark:text-gray-200 group-hover:text-primary dark:group-hover:text-blue-400'}`}>
        {label}
      </span>
      <span className={`text-xs mt-0.5 ${checked ? 'text-green-600 dark:text-green-400 font-medium' : 'text-[#536393] dark:text-gray-500'}`}>{sub}</span>
    </div>
  </label>
);