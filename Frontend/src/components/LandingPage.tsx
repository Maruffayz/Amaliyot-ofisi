import React from 'react';

export default function LandingPage({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="bg-deep-blue text-white overflow-x-hidden min-h-screen font-display">
      {/* TopNavBar */}
      <div className="relative flex w-full flex-col font-display">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 py-4 md:px-10">
          <div className="flex items-center gap-4">
            <div className="size-8 text-accent">
              <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Amaliyot Ofisi</h2>
          </div>
          <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
            <div className="hidden md:flex items-center gap-9">
              <a className="text-white/80 hover:text-accent transition-colors text-sm font-medium leading-normal" href="#">Programs</a>
              <a className="text-white/80 hover:text-accent transition-colors text-sm font-medium leading-normal" href="#">About</a>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={onNavigate}
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-transparent border border-white/20 hover:border-accent hover:text-accent text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all"
              >
                <span className="truncate">Login</span>
              </button>
              {/* Mobile Menu Icon */}
              <button className="md:hidden text-white">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* HeroSection */}
      <div className="relative flex w-full flex-col font-display">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <div className="@container">
                <div className="flex flex-col gap-10 px-4 py-10 lg:flex-row lg:items-center">
                  {/* Text Content */}
                  <div className="flex flex-col gap-6 lg:w-1/2 lg:pr-10">
                    <div className="flex flex-col gap-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 w-fit border border-white/10">
                        <span className="material-symbols-outlined text-accent text-[18px]">bolt</span>
                        <span className="text-xs font-semibold tracking-wide uppercase text-accent">Next Gen Platform</span>
                      </div>
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl lg:text-6xl">
                        Empowering Tomorrow's Leaders
                      </h1>
                      <p className="text-white/70 text-base font-normal leading-relaxed md:text-lg">
                        The ultimate management platform connecting students, volunteers, and universities. Streamline internships and career growth with our futuristic tools.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2">
                      <button onClick={onNavigate} className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-accent text-[#0f121a] text-base font-bold leading-normal tracking-[0.015em] hover:bg-yellow-300 transition-colors shadow-[0_0_20px_rgba(255,214,1,0.3)]">
                        <span className="truncate">Apply Now</span>
                      </button>
                      <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white/10 border border-white/10 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-white/20 transition-colors backdrop-blur-sm">
                        <span className="truncate">Partner with Us</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-4 text-sm text-white/50">
                      <div className="flex -space-x-2">
                        <div className="h-8 w-8 rounded-full bg-gray-600 border border-deep-blue bg-cover" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=1')"}}></div>
                        <div className="h-8 w-8 rounded-full bg-gray-600 border border-deep-blue bg-cover" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=2')"}}></div>
                        <div className="h-8 w-8 rounded-full bg-gray-600 border border-deep-blue bg-cover" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=3')"}}></div>
                      </div>
                      <p>Joined by 500+ Universities</p>
                    </div>
                  </div>
                  {/* Image Content */}
                  <div className="w-full lg:w-1/2 aspect-square md:aspect-video lg:aspect-square relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0F172A]">
                    <div className="absolute inset-0 bg-cover bg-center opacity-80 mix-blend-overlay" style={{backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')"}}>
                    </div>
                    {/* Overlay content to simulate 3D/Tech feel */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-3/4 h-3/4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-[0_0_50px_rgba(20,43,113,0.5)] p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs text-white/50 font-mono">system.status: online</span>
                        </div>
                        <div className="space-y-3">
                          <div className="h-2 w-1/2 bg-white/20 rounded"></div>
                          <div className="h-2 w-3/4 bg-white/20 rounded"></div>
                          <div className="h-2 w-full bg-white/20 rounded"></div>
                        </div>
                        <div className="mt-8 flex gap-4">
                          <div className="flex-1 bg-deep-blue/50 rounded-lg p-3 border border-white/5">
                            <span className="material-symbols-outlined text-accent mb-2">school</span>
                            <div className="text-xs text-white/70">Students</div>
                            <div className="text-lg font-bold">12k+</div>
                          </div>
                          <div className="flex-1 bg-deep-blue/50 rounded-lg p-3 border border-white/5">
                            <span className="material-symbols-outlined text-accent mb-2">apartment</span>
                            <div className="text-xs text-white/70">Partners</div>
                            <div className="text-lg font-bold">85+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FeatureSection */}
      <div className="relative flex w-full flex-col bg-[#0F172A]/50 font-display">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <div className="flex flex-col gap-10 px-4 py-10 @container">
                <div className="flex flex-col gap-4 text-center items-center">
                  <h2 className="text-white tracking-light text-[32px] font-bold leading-tight md:text-4xl max-w-[720px]">
                    Our Value Propositions
                  </h2>
                  <p className="text-white/70 text-base font-normal leading-normal max-w-[720px]">
                    Tailored solutions for every stakeholder in the career development ecosystem.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Student Card */}
                  <div className="group flex flex-1 gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 flex-col hover:bg-white/10 hover:border-accent/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-deep-blue flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">school</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white text-xl font-bold leading-tight">For Students</h3>
                      <p className="text-white/60 text-sm font-normal leading-relaxed">
                        Access exclusive internship opportunities and track your career milestones efficiently with our AI-driven tools.
                      </p>
                    </div>
                  </div>
                  {/* Volunteer Card */}
                  <div className="group flex flex-1 gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 flex-col hover:bg-white/10 hover:border-accent/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-deep-blue flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white text-xl font-bold leading-tight">For Volunteers</h3>
                      <p className="text-white/60 text-sm font-normal leading-relaxed">
                        Find meaningful volunteer work, manage your contributions seamlessly, and earn recognition certificates.
                      </p>
                    </div>
                  </div>
                  {/* University Card */}
                  <div className="group flex flex-1 gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 flex-col hover:bg-white/10 hover:border-accent/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg bg-deep-blue flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">domain</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white text-xl font-bold leading-tight">For Universities</h3>
                      <p className="text-white/60 text-sm font-normal leading-relaxed">
                        Simplify career club management, monitor student placement success, and generate comprehensive reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTASection */}
      <div className="relative flex w-full flex-col font-display">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="@container">
                <div className="relative overflow-hidden rounded-3xl mt-10">
                  {/* Background decorative elements */}
                  <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="relative flex flex-col justify-center items-center gap-8 px-4 py-20 md:px-10 border border-white/10 bg-white/5 backdrop-blur-sm rounded-3xl">
                    <div className="flex flex-col gap-4 text-center z-10">
                      <h2 className="text-white tracking-light text-[32px] font-bold leading-tight md:text-5xl max-w-[720px]">
                        Ready to Shape the Future?
                      </h2>
                      <p className="text-white/80 text-lg font-normal leading-normal max-w-[600px] mx-auto">
                        Join Amaliyot Ofisi today and start your journey towards professional excellence.
                      </p>
                    </div>
                    <div className="flex justify-center z-10 w-full">
                      <button onClick={onNavigate} className="flex w-full max-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-accent text-[#0f121a] text-lg font-bold leading-normal tracking-[0.015em] hover:bg-yellow-300 hover:scale-105 transition-all shadow-lg">
                        <span className="truncate">Apply Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative flex w-full flex-col mt-10 border-t border-white/10 bg-[#0c101b] font-display pb-20">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <footer className="flex flex-col gap-8 px-5 py-10 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-4 text-white">
                    <div className="size-6 text-accent">
                      <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <span className="text-lg font-bold">Amaliyot Ofisi</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-8">
                    <a className="text-white/60 hover:text-white transition-colors text-sm" href="#">Privacy Policy</a>
                    <a className="text-white/60 hover:text-white transition-colors text-sm" href="#">Terms of Service</a>
                    <a className="text-white/60 hover:text-white transition-colors text-sm" href="#">Contact</a>
                  </div>
                  <div className="flex gap-4">
                    <a className="text-white/60 hover:text-accent transition-colors" href="#">
                      <span className="material-symbols-outlined">public</span>
                    </a>
                    <a className="text-white/60 hover:text-accent transition-colors" href="#">
                      <span className="material-symbols-outlined">share</span>
                    </a>
                    <a className="text-white/60 hover:text-accent transition-colors" href="#">
                      <span className="material-symbols-outlined">mail</span>
                    </a>
                  </div>
                </div>
                <div className="w-full h-px bg-white/5"></div>
                <p className="text-white/40 text-sm font-normal text-center">© 2024 Amaliyot Ofisi. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}