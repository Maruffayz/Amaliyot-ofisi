
import React, { useEffect, useState } from 'react';

type TabType = 'overview' | 'cv' | 'reports';

export default function UserWorkspace() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('current_user');
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load current_user from localStorage', e);
    }
  }, []);
  
  // Mock Data for Progress Visualization
  const userStats = {
    efficiency: 85,
    totalHours: 142,
    attendanceLog: [
      { date: '2024-05-20', clockIn: '09:00 AM', clockOut: '06:00 PM', duration: '9h', addedBy: 'Sarah Smith' },
      { date: '2024-05-19', clockIn: '08:45 AM', clockOut: '05:30 PM', duration: '8.75h', addedBy: 'Sarah Smith' },
      { date: '2024-05-18', clockIn: '09:15 AM', clockOut: '06:15 PM', duration: '9h', addedBy: 'Sarah Smith' },
    ],
    supervisorFeedback: "Jane is showing excellent progress in React. Her efficiency has improved by 10% this week after mastering component lifecycle optimization.",
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-slate-900 dark:text-white pb-24">
      {/* Header */}
      <div className="bg-primary text-white p-8 md:p-12 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="flex items-center gap-6">
            <div className="size-20 rounded-2xl bg-cover bg-center border-4 border-white/20 shadow-xl" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=9')"}}></div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">
                {currentUser?.full_name || currentUser?.username || 'Intern User'}
              </h1>
              <p className="text-blue-100 opacity-80 font-medium">
                {currentUser?.email || 'Software Engineering Intern • Amaliyotchilar Hub'}
              </p>
            </div>
          </div>
          <div className="flex gap-2 bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/10">
            {(['overview', 'cv', 'reports'] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-accent text-primary shadow-lg' : 'text-white hover:bg-white/5'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto -mt-12 px-4 md:px-0 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-20">
        
        {activeTab === 'overview' && (
          <>
            {/* Efficiency and Stats */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-accent filled">speed</span>
                    My Progress Estimate
                  </h3>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Calculated by Supervisor</span>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-12">
                   <div className="relative size-48 shrink-0">
                      <svg className="size-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" />
                        <circle 
                          cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                          strokeDasharray="282.7" 
                          strokeDashoffset={282.7 - (282.7 * userStats.efficiency) / 100}
                          className="text-accent transition-all duration-1000 ease-out" 
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black">{userStats.efficiency}%</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Efficiency</span>
                      </div>
                   </div>
                   
                   <div className="flex-1 space-y-6 w-full">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                         <p className="text-sm italic text-slate-600 dark:text-slate-300 leading-relaxed">
                            "{userStats.supervisorFeedback}"
                         </p>
                         <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <div className="size-6 rounded-full bg-cover" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=10')"}}></div>
                            <span className="text-xs font-bold text-primary dark:text-accent">Sarah Smith, Senior Supervisor</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Attendance Log (Supervisor Input Result) */}
              <div className="bg-white dark:bg-surface-dark rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary dark:text-blue-400">history_toggle_off</span>
                    Attendance Log
                  </h3>
                  <button className="text-xs font-bold text-primary dark:text-accent hover:underline">Request Correction</button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs font-bold text-slate-400 uppercase border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="pb-4 px-2">Date</th>
                        <th className="pb-4 px-2">Clock In</th>
                        <th className="pb-4 px-2">Clock Out</th>
                        <th className="pb-4 px-2">Duration</th>
                        <th className="pb-4 px-2 text-right">Verified By</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                      {userStats.attendanceLog.map((log, idx) => (
                        <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                          <td className="py-4 px-2 text-sm font-bold">{log.date}</td>
                          <td className="py-4 px-2 text-sm text-slate-500">{log.clockIn}</td>
                          <td className="py-4 px-2 text-sm text-slate-500">{log.clockOut}</td>
                          <td className="py-4 px-2 text-sm font-black text-primary dark:text-blue-400">{log.duration}</td>
                          <td className="py-4 px-2 text-right">
                             <span className="text-xs font-medium text-slate-400">{log.addedBy}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="bg-accent text-primary rounded-3xl p-8 shadow-xl flex flex-col items-center text-center">
                  <p className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">Total Verified Hours</p>
                  <h2 className="text-5xl font-black mb-4">{userStats.totalHours}</h2>
                  <p className="text-sm font-bold opacity-80">You're on track to complete <br/> your 200h goal!</p>
               </div>

               <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold mb-4">Upcoming Goals</h4>
                  <div className="space-y-4">
                     {[
                       { label: 'Final Project Demo', date: 'May 28', status: 'In 4 days' },
                       { label: 'Evaluation Interview', date: 'June 02', status: 'In 9 days' }
                     ].map((goal, i) => (
                       <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">{goal.date.split(' ')[1]}</div>
                          <div>
                             <p className="text-sm font-bold">{goal.label}</p>
                             <p className="text-[10px] text-slate-400">{goal.status}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </>
        )}

        {activeTab === 'cv' && (
          <div className="lg:col-span-12 bg-white dark:bg-surface-dark rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-right-4">
            <div className="max-w-3xl mx-auto space-y-12">
               <div className="flex flex-col gap-2 border-b border-slate-100 dark:border-slate-800 pb-8">
                 <h2 className="text-3xl font-black tracking-tight">Professional CV Builder</h2>
                 <p className="text-slate-500">Complete your profile to share with potential supervisors and team leads.</p>
               </div>

               <form className="space-y-10">
                  <section className="space-y-6">
                    <h4 className="text-lg font-bold text-primary dark:text-accent flex items-center gap-2">
                       <span className="material-symbols-outlined">person</span> Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
                          <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3" defaultValue="Jane Doe" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-400 uppercase">Current Role</label>
                          <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3" defaultValue="Junior Software Engineer" />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-bold text-slate-400 uppercase">Short Bio</label>
                          <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 h-32" placeholder="Tell us about your professional background..."></textarea>
                       </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h4 className="text-lg font-bold text-primary dark:text-accent flex items-center gap-2">
                       <span className="material-symbols-outlined">school</span> Education & Skills
                    </h4>
                    <div className="space-y-4">
                       <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center">
                          <div>
                             <p className="text-sm font-bold">B.Sc. in Computer Science</p>
                             <p className="text-xs text-slate-500">State Technical University • 2021-2025</p>
                          </div>
                          <button className="text-slate-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined">delete</span></button>
                       </div>
                       <button type="button" className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 font-bold flex items-center justify-center gap-2 hover:border-primary/50 hover:text-primary transition-all">
                          <span className="material-symbols-outlined">add_circle</span> Add Education
                       </button>
                    </div>
                  </section>

                  <div className="flex justify-end gap-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                     <button type="button" className="px-8 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">Discard Changes</button>
                     <button type="button" className="px-10 py-3 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform">Save CV Profile</button>
                  </div>
               </form>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="lg:col-span-12 bg-white dark:bg-surface-dark rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-right-4">
            <div className="max-w-3xl mx-auto space-y-12">
               <div className="flex flex-col gap-2 border-b border-slate-100 dark:border-slate-800 pb-8">
                 <h2 className="text-3xl font-black tracking-tight">Weekly Progress Report</h2>
                 <p className="text-slate-500">Document your growth, challenges, and what you've learned this week.</p>
               </div>

               <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase">Report Week</label>
                       <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl p-3 text-sm">
                          <option>Week 12 (May 20 - May 24)</option>
                          <option>Week 11 (May 13 - May 17)</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-400 uppercase">Feeling of Mastery</label>
                       <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2">
                          <span className="text-2xl">🔥</span>
                          <input type="range" className="flex-1 accent-accent" min="0" max="100" />
                          <span className="text-xs font-bold">High</span>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Key Achievements & Learned Skills</label>
                    <textarea 
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 h-48 placeholder:text-slate-400" 
                      placeholder="Today I implemented the backend authentication logic and learned about JWT secret rotation..."
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full py-5 bg-accent text-primary font-black text-lg rounded-2xl shadow-xl shadow-accent/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3">
                    Submit Weekly Journal
                    <span className="material-symbols-outlined">send</span>
                  </button>
               </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
