import React, { useState } from 'react';

type ViewState = 'landing' | 'admin' | 'submission' | 'analytics' | 'onboarding' | 'auth';

// Mock Data
const assignedTasks = [
  { id: 1, title: "Frontend Implementation of User Profile", type: "Development", priority: "High" },
  { id: 2, title: "Unit Testing for Auth Module", type: "Testing", priority: "Medium" },
  { id: 3, title: "Update API Documentation", type: "Documentation", priority: "Low" },
];

const routineTasks = [
  { id: 'r1', title: "Daily Standup Meeting" },
  { id: 'r2', title: "Code Review" },
  { id: 'r3', title: "Reading/Research" },
  { id: 'r4', title: "Mentor Sync" },
];

const historyData = [
  { id: 1, date: "Oct 23, 2023", tasks: 4, hours: 6.5, status: "Approved" },
  { id: 2, date: "Oct 22, 2023", tasks: 3, hours: 5.0, status: "Approved" },
  { id: 3, date: "Oct 21, 2023", tasks: 5, hours: 7.5, status: "Pending" },
  { id: 4, date: "Oct 20, 2023", tasks: 4, hours: 6.0, status: "Approved" },
];

export default function InternSubmission({ onNavigate }: { onNavigate?: (view: ViewState) => void }) {
  const [activeView, setActiveView] = useState('submit');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'submit', label: 'Submit Report', icon: 'note_add' },
    { id: 'history', label: 'My History', icon: 'history' },
    { id: 'supervisor', label: 'Supervisor Info', icon: 'supervisor_account' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden selection:bg-primary/20 h-screen w-full flex">
      {/* Side Navigation Bar */}
      <aside className="hidden lg:flex flex-col w-72 h-full bg-white dark:bg-[#1a1d2d] border-r border-slate-200 dark:border-slate-800 shrink-0">
        <div className="p-6 flex flex-col gap-8 h-full">
          {/* User Profile */}
          <div className="flex items-center gap-4 p-2">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shadow-sm relative" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=9')"}}>
              <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#1a1d2d] rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Jane Doe</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Software Eng. Intern</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navItems.slice(0, 4).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group w-full text-left ${
                  activeView === item.id 
                    ? 'bg-primary/10 dark:bg-primary/30 text-primary dark:text-blue-100' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`material-symbols-outlined ${activeView === item.id ? 'filled' : 'group-hover:text-primary dark:group-hover:text-white transition-colors'}`}>
                  {item.icon}
                </span>
                <span className={`text-sm ${activeView === item.id ? 'font-bold' : 'font-semibold'}`}>{item.label}</span>
              </button>
            ))}
            
            <div className="mt-auto">
              <button
                onClick={() => setActiveView('settings')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group w-full text-left ${
                  activeView === 'settings'
                    ? 'bg-primary/10 dark:bg-primary/30 text-primary dark:text-blue-100'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`material-symbols-outlined ${activeView === 'settings' ? 'filled' : 'group-hover:text-primary dark:group-hover:text-white transition-colors'}`}>
                  settings
                </span>
                <span className="text-sm font-semibold">Settings</span>
              </button>
            </div>
          </nav>
          
          {/* Supervisor Widget */}
          <div className="bg-background-light dark:bg-background-dark rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Your Supervisor</p>
            <div className="flex items-center gap-3">
              <div className="bg-center bg-no-repeat bg-cover rounded-full size-10" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=10')"}}></div>
              <div className="flex flex-col overflow-hidden">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Sarah Smith</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Senior Developer</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white dark:bg-[#0f121a]">
        {/* Top Header */}
        <header className="h-20 flex-none bg-white dark:bg-[#1a1d2d] border-b border-slate-200 dark:border-slate-800 px-6 md:px-10 flex items-center justify-between z-10">
          <div className="flex items-center gap-6">
            <button className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-3 text-primary dark:text-white">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[20px]">school</span>
              </div>
              <h2 className="text-xl font-extrabold tracking-tight">InternHub</h2>
            </div>
             {/* Search (Desktop) */}
            <div className="hidden md:flex items-center ml-8 w-80">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input className="w-full pl-10 pr-4 py-2.5 bg-background-light dark:bg-background-dark border-none rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 placeholder:text-slate-400" placeholder="Search..." type="text"/>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-[#1a1d2d]"></span>
            </button>
            <div className="hidden sm:block h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 hidden sm:block">Jane Doe</span>
              <span className="material-symbols-outlined text-slate-400 sm:hidden">account_circle</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content Views */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
            
            {activeView === 'submit' && <SubmitReportView />}
            {activeView === 'dashboard' && <InternDashboardView />}
            {activeView === 'history' && <HistoryView />}
            {activeView === 'supervisor' && <SupervisorInfoView />}
            {activeView === 'settings' && <SettingsView />}

          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS FOR VIEWS ---

function SubmitReportView() {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Daily Task Submission</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Select the tasks you completed today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-[#1a1d2d] px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Today: <span className="font-semibold text-slate-900 dark:text-white ml-1">Oct 24, 2023</span>
        </div>
      </div>

      <form className="flex flex-col gap-6">
        {/* Section 1: Assigned Tasks Checklist */}
        <div className="bg-white dark:bg-[#1a1d2d] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Assigned Tasks</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tick the specific tasks you worked on.</p>
          </div>
          <div className="p-6 flex flex-col gap-3">
            {assignedTasks.map((task) => (
              <label key={task.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                <div className="relative flex items-center mt-1">
                  <input type="checkbox" className="size-5 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-slate-800" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-900 dark:text-white font-semibold">{task.title}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full 
                      ${task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                        task.priority === 'Medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                      {task.priority}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">{task.type}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Section 2: Routine Activities */}
        <div className="bg-white dark:bg-[#1a1d2d] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Routine Activities</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Did you participate in any standard daily activities?</p>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {routineTasks.map((task) => (
              <label key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all">
                <input type="checkbox" className="size-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary dark:bg-slate-800" />
                <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">{task.title}</span>
              </label>
            ))}
             <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-primary/50 cursor-pointer transition-all group">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-primary">add</span>
                <span className="text-slate-500 dark:text-slate-400 group-hover:text-primary font-medium text-sm">Add Other Activity</span>
             </label>
          </div>
        </div>

        {/* Section 3: Summary & Mood */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="md:col-span-2 bg-white dark:bg-[#1a1d2d] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
             <label className="text-sm font-bold text-slate-900 dark:text-white">Total Duration</label>
             <div className="flex items-center gap-4">
               <div className="relative w-full">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">schedule</span>
                  <input type="number" placeholder="e.g. 6.5" className="w-full pl-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary" />
               </div>
               <span className="text-slate-500 dark:text-slate-400 font-medium">Hours</span>
             </div>
             
             <label className="text-sm font-bold text-slate-900 dark:text-white mt-2">Blockers or Notes (Optional)</label>
             <textarea className="w-full h-24 rounded-xl border border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary resize-none" placeholder="Anything blocking your progress?"></textarea>
           </div>
           
           <div className="bg-white dark:bg-[#1a1d2d] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4">
              <label className="text-sm font-bold text-slate-900 dark:text-white">How do you feel today?</label>
              <div className="grid grid-cols-2 gap-3">
                 <button type="button" className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/20 transition-all focus:ring-2 focus:ring-green-500">
                    <span className="text-2xl">🤩</span>
                    <span className="text-xs font-bold mt-1 text-slate-600 dark:text-slate-300">Great</span>
                 </button>
                 <button type="button" className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 transition-all focus:ring-2 focus:ring-blue-500">
                    <span className="text-2xl">🙂</span>
                    <span className="text-xs font-bold mt-1 text-slate-600 dark:text-slate-300">Good</span>
                 </button>
                 <button type="button" className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-amber-50 hover:border-amber-200 dark:hover:bg-amber-900/20 transition-all focus:ring-2 focus:ring-amber-500">
                    <span className="text-2xl">😐</span>
                    <span className="text-xs font-bold mt-1 text-slate-600 dark:text-slate-300">Okay</span>
                 </button>
                 <button type="button" className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-900/20 transition-all focus:ring-2 focus:ring-red-500">
                    <span className="text-2xl">😫</span>
                    <span className="text-xs font-bold mt-1 text-slate-600 dark:text-slate-300">Tired</span>
                 </button>
              </div>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button className="w-full sm:w-auto px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2" type="button">
            Save Draft
          </button>
          <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-amber-action text-primary font-bold hover:bg-amber-hover shadow-lg shadow-amber-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2" type="button">
            <span className="material-symbols-outlined">send</span>
            Submit Report
          </button>
        </div>
      </form>
    </>
  );
}

function InternDashboardView() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Intern Dashboard</h1>
        <p className="text-slate-500 dark:text-slate-400">Welcome back, Jane! Here is your progress overview.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <span className="material-symbols-outlined text-4xl mb-4 bg-white/20 p-2 rounded-lg">timer</span>
            <p className="text-blue-100 font-medium">Total Hours</p>
            <h3 className="text-4xl font-bold mt-1">124.5 <span className="text-lg font-normal opacity-70">/ 200</span></h3>
            <div className="w-full bg-black/20 h-2 rounded-full mt-4 overflow-hidden">
               <div className="bg-accent h-full w-[62%]"></div>
            </div>
         </div>
         <div className="bg-white dark:bg-[#1a1d2d] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl mb-4 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg">task_alt</span>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Tasks Completed</p>
              <h3 className="text-4xl font-bold mt-1 text-slate-900 dark:text-white">32</h3>
            </div>
            <p className="text-sm text-emerald-600 font-bold mt-2 flex items-center gap-1">
               <span className="material-symbols-outlined text-sm">trending_up</span> +4 this week
            </p>
         </div>
         <div className="bg-white dark:bg-[#1a1d2d] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
             <div>
              <span className="material-symbols-outlined text-4xl mb-4 text-amber-500 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">local_fire_department</span>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Submission Streak</p>
              <h3 className="text-4xl font-bold mt-1 text-slate-900 dark:text-white">12 Days</h3>
             </div>
             <p className="text-sm text-amber-600 font-bold mt-2">Keep it up!</p>
         </div>
      </div>

      <div className="bg-white dark:bg-[#1a1d2d] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
         <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
         <div className="space-y-4">
             {[1,2,3].map((i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0">
                   <div className="size-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary dark:text-blue-400">
                      <span className="material-symbols-outlined">description</span>
                   </div>
                   <div>
                      <p className="text-slate-900 dark:text-white font-semibold">Daily Report Submitted</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Oct {25-i}, 2023 at 5:30 PM</p>
                   </div>
                   <div className="ml-auto">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Approved</span>
                   </div>
                </div>
             ))}
         </div>
      </div>
    </div>
  )
}

function HistoryView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">My History</h1>
        <p className="text-slate-500 dark:text-slate-400">Archive of all your submitted reports.</p>
      </div>
      
      <div className="bg-white dark:bg-[#1a1d2d] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
            <tr>
              <th className="p-4">Date</th>
              <th className="p-4">Tasks Done</th>
              <th className="p-4">Hours</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            {historyData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-semibold text-slate-900 dark:text-white">{item.date}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{item.tasks} Tasks</td>
                <td className="p-4 text-slate-600 dark:text-slate-400 font-mono">{item.hours}h</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold 
                    ${item.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-primary font-bold hover:underline">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SupervisorInfoView() {
  return (
     <div className="flex flex-col gap-6 max-w-2xl">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Supervisor Info</h1>
        <div className="bg-white dark:bg-[#1a1d2d] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
           <div className="size-32 rounded-full bg-cover bg-center border-4 border-slate-100 dark:border-slate-700" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=10')"}}></div>
           <div className="flex flex-col gap-2 flex-1">
              <div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Sarah Smith</h2>
                 <p className="text-slate-500 dark:text-slate-400 font-medium">Senior Developer @ TechCorp</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                 <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">Engineering</span>
                 <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300">Mentorship</span>
              </div>
              <div className="mt-6 flex gap-4 justify-center md:justify-start">
                 <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                    <span className="material-symbols-outlined text-lg">mail</span>
                    Send Email
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-lg">calendar_month</span>
                    Schedule Meeting
                 </button>
              </div>
           </div>
        </div>
     </div>
  )
}

function SettingsView() {
    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Settings</h1>
            <div className="bg-white dark:bg-[#1a1d2d] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                </div>
                <div className="p-4 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Notifications</span>
                        <input type="checkbox" defaultChecked className="toggle-checkbox rounded-full text-primary focus:ring-primary" />
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Daily Reminders</span>
                        <input type="checkbox" defaultChecked className="toggle-checkbox rounded-full text-primary focus:ring-primary" />
                    </div>
                </div>
                 <div className="p-4 border-b border-slate-100 dark:border-slate-800 border-t">
                    <h3 className="font-bold text-slate-900 dark:text-white">Account</h3>
                </div>
                 <div className="p-4 flex flex-col gap-4">
                    <button className="text-left text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary">Change Password</button>
                    <button className="text-left text-sm font-medium text-red-600 hover:text-red-700">Sign Out</button>
                </div>
            </div>
        </div>
    )
}