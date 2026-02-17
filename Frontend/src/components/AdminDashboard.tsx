import React, { useState } from 'react';

// Mock Data
const internsData = [
  { id: 1, name: "Alice Johnson", role: "Frontend Dev", supervisor: "Sarah Jenkins", status: "Active", progress: 75, avatar: "https://i.pravatar.cc/150?u=20" },
  { id: 2, name: "Bob Smith", role: "Backend Dev", supervisor: "David Chen", status: "Reviewing", progress: 90, avatar: "https://i.pravatar.cc/150?u=21" },
  { id: 3, name: "Charlie Brown", role: "Marketing", supervisor: "James Wilson", status: "Pending", progress: 0, avatar: "https://i.pravatar.cc/150?u=22" },
  { id: 4, name: "Dana White", role: "Design", supervisor: "Sarah Jenkins", status: "Active", progress: 45, avatar: "https://i.pravatar.cc/150?u=23" },
  { id: 5, name: "Evan Wright", role: "Data Science", supervisor: "Maria Rodriguez", status: "Completed", progress: 100, avatar: "https://i.pravatar.cc/150?u=24" },
];

const volunteersData = [
    { id: 101, name: "Emma Watson", role: "Event Volunteer", project: "Charity Run", status: "Active", hours: 120, avatar: "https://i.pravatar.cc/150?u=50" },
    { id: 102, name: "Liam Neeson", role: "Logistics", project: "Tech Conf", status: "Inactive", hours: 45, avatar: "https://i.pravatar.cc/150?u=51" },
    { id: 103, name: "Olivia Wilde", role: "Content Creator", project: "Blog", status: "Active", hours: 80, avatar: "https://i.pravatar.cc/150?u=52" },
    { id: 104, name: "Noah Centineo", role: "Mentor Aide", project: "Workshop", status: "Active", hours: 60, avatar: "https://i.pravatar.cc/150?u=53" },
];

const supervisorsData = [
  { id: 1, name: "Sarah Jenkins", role: "Senior Dev", dept: "Engineering", interns: 8, avatar: "https://i.pravatar.cc/150?u=5" },
  { id: 2, name: "David Chen", role: "Tech Lead", dept: "Engineering", interns: 5, avatar: "https://i.pravatar.cc/150?u=6" },
  { id: 3, name: "Maria Rodriguez", role: "HR Manager", dept: "Human Resources", interns: 12, avatar: "https://i.pravatar.cc/150?u=7" },
  { id: 4, name: "James Wilson", role: "Marketing Lead", dept: "Marketing", interns: 6, avatar: "https://i.pravatar.cc/150?u=8" },
];

const mentorsData = [
  { id: 1, name: "Dr. Emily Carter", role: "Professor", dept: "Computer Science", mentees: 15, avatar: "https://i.pravatar.cc/150?u=15" },
  { id: 2, name: "Prof. Alan Turing", role: "Researcher", dept: "AI & ML", mentees: 10, avatar: "https://i.pravatar.cc/150?u=30" },
];

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('internships');

  // Removed Interns and Ambassadors from menu
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'internships', label: 'Internships', icon: 'work' },
    { id: 'participants', label: 'Amaliyotchilar', icon: 'groups' },
    { id: 'supervisors', label: 'Supervisors', icon: 'supervisor_account' },
    { id: 'mentors', label: 'Mentors', icon: 'diversity_3' },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white h-screen overflow-hidden flex selection:bg-primary/20">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-light dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0 transition-colors duration-300 hidden lg:flex">
        <div className="p-6">
          <div className="flex gap-3 items-center mb-8">
            <div className="bg-primary/10 rounded-full p-2">
              <span className="material-symbols-outlined text-primary text-[32px]">admin_panel_settings</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">Admin Panel</h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-normal">Management Platform</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg w-full text-left transition-colors group ${
                  activeView === item.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`material-symbols-outlined ${activeView === item.id ? 'filled' : 'group-hover:text-primary transition-colors'}`}>
                  {item.icon}
                </span>
                <span className={`text-sm ${activeView === item.id ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-cover bg-center border border-slate-200 dark:border-slate-700" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=4')"}}></div>
            <div className="flex flex-col overflow-hidden">
              <p className="text-sm font-bold truncate text-slate-900 dark:text-white">Alex Morgan</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">alex.m@admin.org</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-full relative">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 lg:p-8 flex flex-col gap-8 pb-24">
          
          {/* Dynamic Content Rendering */}
          {activeView === 'internships' && <InternshipsView />}
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'participants' && <ParticipantsView />}
          {activeView === 'supervisors' && <SupervisorsView />}
          {activeView === 'mentors' && <MentorsView />}

        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS for Views ---

function DashboardView() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Super Admin Overview</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base">Real-time system metrics and performance indicators.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        This Month
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export Report
                    </button>
                </div>
            </div>

            {/* Bento Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Main Highlight */}
                <div className="md:col-span-2 bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/10 flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
                     <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                     <div className="relative z-10 flex justify-between items-start">
                         <div>
                            <p className="text-blue-100 font-medium mb-1">Total Active Participants</p>
                            <h3 className="text-4xl font-black tracking-tight">1,284</h3>
                         </div>
                         <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                             <span className="material-symbols-outlined text-2xl">groups</span>
                         </div>
                     </div>
                     <div className="relative z-10 mt-auto">
                        <div className="flex items-center gap-2 text-sm text-blue-100 mb-2">
                             <span className="bg-white/20 px-1.5 rounded text-xs font-bold">+124</span>
                             <span>new this month</span>
                        </div>
                        <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                             <div className="h-full bg-accent w-[75%]"></div>
                        </div>
                     </div>
                </div>

                {/* Secondary Stat */}
                <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-colors">
                     <div className="flex items-center justify-between mb-4">
                         <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                             <span className="material-symbols-outlined text-2xl">work_history</span>
                         </div>
                         <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">+8.2%</span>
                     </div>
                     <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Placement Rate</p>
                     <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">94%</h3>
                     <p className="text-xs text-slate-400 mt-2">vs 86.8% last year</p>
                </div>

                {/* Tertiary Stat */}
                <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-primary/50 transition-colors">
                     <div className="flex items-center justify-between mb-4">
                         <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600 dark:text-amber-400">
                             <span className="material-symbols-outlined text-2xl">star</span>
                         </div>
                         <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">4.9/5</span>
                     </div>
                     <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Satisfaction Score</p>
                     <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">4.85</h3>
                     <p className="text-xs text-slate-400 mt-2">Based on 450 feedback</p>
                </div>
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Growth Chart (Mock) */}
                <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Program Growth</h3>
                        <div className="flex gap-2">
                             <span className="size-3 rounded-full bg-primary"></span><span className="text-xs text-slate-500">Interns</span>
                             <span className="size-3 rounded-full bg-blue-300"></span><span className="text-xs text-slate-500">Volunteers</span>
                        </div>
                    </div>
                    <div className="h-64 w-full flex items-end gap-4 px-2">
                        {[40, 60, 45, 70, 65, 85, 90, 75, 80, 95, 85, 100].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col justify-end gap-1 group h-full cursor-pointer">
                                <div className="w-full bg-primary/20 dark:bg-primary/20 rounded-t-sm relative transition-all duration-300 group-hover:bg-primary/40" style={{height: `${h/2}%`}}></div>
                                <div className="w-full bg-primary rounded-t-sm relative transition-all duration-300 group-hover:opacity-90 shadow-[0_0_10px_rgba(20,43,113,0.2)]" style={{height: `${h}%`}}></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400 font-bold uppercase">
                        <span>Jan</span><span>Apr</span><span>Aug</span><span>Dec</span>
                    </div>
                </div>

                {/* Demographics / Pie Chart (Mock) */}
                <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Role Distribution</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mb-6">Current active roles across platform</p>
                    
                    <div className="flex-1 flex items-center justify-center relative">
                        {/* CSS-only Donut Chart representation */}
                        <div className="size-48 rounded-full border-[20px] border-slate-100 dark:border-slate-800 relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[20px] border-primary border-r-transparent border-b-transparent rotate-45"></div>
                            <div className="absolute inset-0 rounded-full border-[20px] border-amber-400 border-l-transparent border-t-transparent border-b-transparent rotate-[160deg]"></div>
                            <div className="text-center">
                                <span className="block text-3xl font-black text-slate-900 dark:text-white">2.4k</span>
                                <span className="text-xs text-slate-400 uppercase font-bold">Total Users</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="size-3 rounded-full bg-primary"></span>
                                <span className="text-slate-600 dark:text-slate-300 font-medium">Interns</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">65%</span>
                        </div>
                         <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="size-3 rounded-full bg-amber-400"></span>
                                <span className="text-slate-600 dark:text-slate-300 font-medium">Volunteers</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">25%</span>
                        </div>
                         <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="size-3 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                                <span className="text-slate-600 dark:text-slate-300 font-medium">Other</span>
                            </div>
                            <span className="font-bold text-slate-900 dark:text-white">10%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                     <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <span className="material-symbols-outlined text-2xl">verified_user</span>
                     </div>
                     <div>
                         <h4 className="font-bold text-slate-900 dark:text-white">Approve Users</h4>
                         <p className="text-xs text-slate-500">14 pending approvals</p>
                     </div>
                 </div>
                 <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                     <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <span className="material-symbols-outlined text-2xl">post_add</span>
                     </div>
                     <div>
                         <h4 className="font-bold text-slate-900 dark:text-white">Create Internship</h4>
                         <p className="text-xs text-slate-500">Publish new opportunity</p>
                     </div>
                 </div>
                 <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                     <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <span className="material-symbols-outlined text-2xl">campaign</span>
                     </div>
                     <div>
                         <h4 className="font-bold text-slate-900 dark:text-white">Announcements</h4>
                         <p className="text-xs text-slate-500">Broadcast to all users</p>
                     </div>
                 </div>
            </div>
        </div>
    )
}

function ParticipantsView() {
    const [filter, setFilter] = useState('all'); // all, intern, volunteer
    const [selectedProfile, setSelectedProfile] = useState<any>(null);

    // Combine data with type tag
    const allParticipants = [
        ...internsData.map(i => ({...i, type: 'Intern'})),
        ...volunteersData.map(v => ({...v, type: 'Volunteer', supervisor: v.project, progress: v.hours > 100 ? 100 : v.hours }))
    ];

    const displayed = filter === 'all' ? allParticipants : allParticipants.filter(p => p.type.toLowerCase() === filter);

    if (selectedProfile) {
        return (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Header with Back Button */}
                <div className="flex items-center gap-4">
                    <button onClick={() => setSelectedProfile(null)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Participant Profile</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span>Amaliyotchilar</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span>{selectedProfile.name}</span>
                        </div>
                    </div>
                </div>

                {/* Main Profile Card */}
                <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                    {/* Banner */}
                    <div className="h-32 bg-gradient-to-r from-primary to-blue-600 relative">
                        <div className="absolute -bottom-10 left-8 p-1.5 bg-surface-light dark:bg-surface-dark rounded-full">
                            <div className="size-24 rounded-full bg-cover bg-center border-4 border-white dark:border-surface-dark" style={{backgroundImage: `url('${selectedProfile.avatar}')`}}></div>
                        </div>
                    </div>
                    <div className="pt-12 pb-6 px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="mt-2">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedProfile.name}</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">{selectedProfile.role}</p>
                            <div className="flex gap-2 mt-3">
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${selectedProfile.type === 'Intern' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'}`}>
                                    {selectedProfile.type}
                                </span>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${selectedProfile.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                                    {selectedProfile.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Edit Profile</button>
                            <button className="flex-1 md:flex-none px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Contact</button>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Col: Info */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">id_card</span>
                                Contact Information
                            </h4>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">mail</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                                        <p className="text-slate-700 dark:text-slate-200 font-medium">{selectedProfile.name.toLowerCase().replace(' ', '.')}@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">call</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                                        <p className="text-slate-700 dark:text-slate-200 font-medium">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                                        <p className="text-slate-700 dark:text-slate-200 font-medium">San Francisco, CA</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                                        <span className="material-symbols-outlined text-[18px]">school</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">University</p>
                                        <p className="text-slate-700 dark:text-slate-200 font-medium">State Tech University</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">stars</span>
                                Skills & Tags
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'TypeScript', 'UI/UX', 'Communication', 'Teamwork', 'Problem Solving'].map(skill => (
                                    <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Stats & Activity */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Tasks Done</p>
                                <div className="flex items-end gap-2 mt-1">
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">24</p>
                                    <span className="text-emerald-500 text-xs font-bold mb-1.5 flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 12%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">{selectedProfile.type === 'Intern' ? 'Total Hours' : 'Hours Logged'}</p>
                                <div className="flex items-end gap-2 mt-1">
                                    <p className="text-3xl font-black text-slate-900 dark:text-white">{selectedProfile.type === 'Intern' ? '128' : selectedProfile.hours}</p>
                                    <span className="text-emerald-500 text-xs font-bold mb-1.5 flex items-center">
                                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span> 5%
                                    </span>
                                </div>
                            </div>
                            <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Attendance</p>
                                <div className="flex items-end gap-2 mt-1">
                                    <p className="text-3xl font-black text-primary dark:text-blue-400">98%</p>
                                    <span className="text-slate-400 text-xs font-bold mb-1.5">Average</span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Timeline */}
                        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-full">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-[20px]">history</span>
                                    Recent Activity
                                </h4>
                                <button className="text-primary text-sm font-bold hover:underline">View All</button>
                            </div>
                            <div className="relative border-l-2 border-slate-100 dark:border-slate-800 ml-3 space-y-8 pb-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="relative pl-8">
                                        <div className="absolute -left-[9px] top-1.5 size-4 bg-white dark:bg-surface-dark rounded-full border-2 border-primary"></div>
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">Submitted Weekly Report</p>
                                            <p className="text-xs text-slate-400 font-mono">Oct {25 - i}, 2023 • 09:00 AM</p>
                                        </div>
                                        <div className="mt-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                                Completed the frontend implementation for the user dashboard. Encountered some issues with API latency but resolved them by implementing local caching.
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                     <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Amaliyotchilar</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base">Comprehensive directory of all interns and volunteers.</p>
                </div>
                 <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {['all', 'intern', 'volunteer'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-md text-sm font-bold capitalize transition-all ${filter === f ? 'bg-white dark:bg-slate-700 shadow-sm text-primary dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
                        >
                            {f === 'all' ? 'All Participants' : f + 's'}
                        </button>
                    ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayed.map((person: any) => (
                    <div key={person.id + person.type} className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col gap-4 hover:border-primary/50 transition-all group relative overflow-hidden">
                        <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider ${person.type === 'Intern' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200'}`}>
                            {person.type}
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="size-16 rounded-full bg-cover bg-center ring-4 ring-slate-50 dark:ring-slate-800 group-hover:ring-primary/10 transition-all" style={{backgroundImage: `url('${person.avatar}')`}}></div>
                             <div>
                                 <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{person.name}</h3>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">{person.role}</p>
                             </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold">Status</p>
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold mt-1 
                                    ${person.status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
                                    {person.status}
                                </span>
                            </div>
                             <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold">{person.type === 'Intern' ? 'Supervisor' : 'Project'}</p>
                                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1 truncate">{person.supervisor}</p>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
                                <span>{person.type === 'Intern' ? 'Progress' : 'Hours Logged'}</span>
                                <span className="text-slate-900 dark:text-white font-bold">{person.type === 'Intern' ? person.progress + '%' : person.progress}</span>
                            </div>
                             <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className={`h-full rounded-full ${person.type === 'Intern' ? 'bg-primary' : 'bg-amber-500'}`} style={{width: `${person.type === 'Intern' ? person.progress : Math.min(person.progress, 100)}%`}}></div>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => setSelectedProfile(person)}
                            className="w-full py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mt-2"
                        >
                            View Profile
                        </button>
                    </div>
                ))}
             </div>
        </div>
    );
}

function InternshipsView() {
  return (
    <>
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">Internships Overview</h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">Manage and track all active programs and initiatives.</p>
        </div>
        <button className="inline-flex items-center justify-center h-10 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-bold transition-colors shadow-lg shadow-primary/20 shrink-0">
          <span className="material-symbols-outlined mr-2 text-[20px]">add</span>
          Create New Internship
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ... Stats Cards (Same as before) ... */}
         <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Internships</span>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-1 rounded-md text-[20px]">folder</span>
            </div>
            <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">24</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
                <span className="material-symbols-outlined text-[12px] mr-0.5">arrow_upward</span> 2%
            </span>
            </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active</span>
            <span className="material-symbols-outlined text-blue-600 bg-blue-100 dark:bg-blue-900/30 p-1 rounded-md text-[20px]">play_circle</span>
            </div>
            <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">12</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
                <span className="material-symbols-outlined text-[12px] mr-0.5">arrow_upward</span> 5%
            </span>
            </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Completed</span>
            <span className="material-symbols-outlined text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-md text-[20px]">check_circle</span>
            </div>
            <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">8</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded flex items-center">
                <span className="material-symbols-outlined text-[12px] mr-0.5">arrow_upward</span> 12%
            </span>
            </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending</span>
            <span className="material-symbols-outlined text-amber-600 bg-amber-100 dark:bg-amber-900/30 p-1 rounded-md text-[20px]">pending</span>
            </div>
            <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">4</span>
            <span className="text-slate-400 text-xs font-medium px-1.5 py-0.5 rounded">No change</span>
            </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-surface-light dark:bg-surface-dark p-2 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="w-full lg:max-w-md relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400">search</span>
            </div>
            <input className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm" placeholder="Search internships..." type="text"/>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 px-2 lg:px-0 scrollbar-hide">
             <button className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 whitespace-nowrap transition-colors">All Internships</button>
             <button className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap transition-colors">In Progress</button>
             <button className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap transition-colors">Not Started</button>
             <button className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap transition-colors">Completed</button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-6">
        {/* Card 1 */}
        <ProjectCard 
          status="In Progress" statusColor="blue" 
          title="Frontend Development" 
          supervisor="Sarah Jenkins" supAvatar="https://i.pravatar.cc/150?u=5"
          progress={65} 
          interns={8} date="Nov 15, 2024" 
        />
        {/* Card 2 */}
        <ProjectCard 
          status="Reviewing" statusColor="amber" 
          title="Tech Intern Recruitment" 
          supervisor="David Chen" supAvatar="https://i.pravatar.cc/150?u=6"
          progress={90} 
          interns={12} date="Oct 30, 2024" 
        />
        {/* Card 3 */}
        <ProjectCard 
          status="Not Started" statusColor="slate" 
          title="University Career Fair" 
          supervisor="Maria Rodriguez" supAvatar="https://i.pravatar.cc/150?u=7"
          progress={0} 
          interns={5} date="Dec 12, 2024" 
          university
        />
        {/* Card 4 - Updated as requested */}
        <ProjectCard 
          status="In Progress" statusColor="blue" 
          title="Entrepreneurship" 
          supervisor="James Wilson" supAvatar="https://i.pravatar.cc/150?u=8"
          progress={45} 
          interns={12} label="Ambassadors" date="Nov 20, 2024" 
        />
      </div>
    </>
  );
}

function SupervisorsView() {
    return (
        <div className="flex flex-col gap-6">
             <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Supervisors</h2>
                <p className="text-slate-500 dark:text-slate-400 text-base">Faculty and team leads managing internships.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {supervisorsData.map((sup) => (
                    <div key={sup.id} className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center text-center gap-4 hover:border-primary/50 transition-colors group">
                         <div className="size-20 rounded-full bg-cover bg-center ring-4 ring-slate-50 dark:ring-slate-800 group-hover:ring-primary/20 transition-all" style={{backgroundImage: `url('${sup.avatar}')`}}></div>
                         <div>
                             <h3 className="text-lg font-bold text-slate-900 dark:text-white">{sup.name}</h3>
                             <p className="text-sm text-slate-500 dark:text-slate-400">{sup.role}</p>
                             <p className="text-xs font-semibold text-primary uppercase mt-1">{sup.dept}</p>
                         </div>
                         <div className="w-full pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                             <div className="flex flex-col">
                                 <span className="text-lg font-bold text-slate-900 dark:text-white">{sup.interns}</span>
                                 <span className="text-xs text-slate-400">Interns</span>
                             </div>
                             <div className="flex flex-col border-l border-slate-100 dark:border-slate-800">
                                 <span className="text-lg font-bold text-slate-900 dark:text-white">4.8</span>
                                 <span className="text-xs text-slate-400">Rating</span>
                             </div>
                         </div>
                         <button className="w-full py-2 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors">View Profile</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

function MentorsView() {
     return (
        <div className="flex flex-col gap-6">
             <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Mentors Program</h2>
                <p className="text-slate-500 dark:text-slate-400 text-base">Industry experts guiding the next generation.</p>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mentorsData.map((mentor) => (
                    <div key={mentor.id} className="flex gap-4 p-4 bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-shadow">
                        <div className="size-16 rounded-xl bg-cover bg-center shrink-0" style={{backgroundImage: `url('${mentor.avatar}')`}}></div>
                        <div className="flex flex-col flex-1">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-slate-900 dark:text-white">{mentor.name}</h3>
                                <span className="material-symbols-outlined text-slate-400 text-lg">verified</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{mentor.role}</p>
                            <p className="text-xs text-primary mt-1">{mentor.dept}</p>
                            <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-slate-400">
                                <span className="material-symbols-outlined text-sm">group</span>
                                {mentor.mentees} Mentees
                            </div>
                        </div>
                    </div>
                ))}
                 <button className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined text-3xl">person_add</span>
                    <span className="font-bold text-sm">Invite Mentor</span>
                 </button>
            </div>
        </div>
     )
}

// Reusable Project Card Component
function ProjectCard({ status, statusColor, title, supervisor, supAvatar, progress, interns, date, university, label = "Interns" }: any) {
  // Determine Tailwind classes for status
  const statusClasses = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
    slate: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
  };

  const barColor = {
    blue: "bg-primary",
    amber: "bg-amber-500",
    slate: "bg-slate-300 dark:bg-slate-600"
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col gap-6 hover:border-primary/50 transition-colors group">
      <div className="flex justify-between items-start">
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold mb-2 ${statusClasses[statusColor as keyof typeof statusClasses]}`}>
            {status}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{title}</h3>
        </div>
        <button className="text-slate-400 hover:text-primary">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-white dark:ring-surface-dark" style={{backgroundImage: `url('${supAvatar}')`}}></div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Supervisor</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">{supervisor}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
          <span>Progress</span>
          <span className="text-slate-900 dark:text-white font-bold">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div className={`${barColor[statusColor as keyof typeof barColor]} h-2 rounded-full`} style={{width: `${progress}%`}}></div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-[18px]">{university ? 'apartment' : 'group'}</span>
          <span className="text-sm font-medium">{interns} {university ? 'Universities' : label}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
          <span className="material-symbols-outlined text-[18px]">calendar_today</span>
          <span className="text-sm font-medium">{date}</span>
        </div>
      </div>
    </div>
  );
}