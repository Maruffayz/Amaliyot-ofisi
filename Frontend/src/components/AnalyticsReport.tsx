import React from 'react';

type ViewState = 'landing' | 'admin' | 'submission' | 'analytics' | 'onboarding' | 'auth';

export default function AnalyticsReport({ onNavigate }: { onNavigate?: (view: ViewState) => void }) {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex flex-col font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 text-primary dark:text-white">
              <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-lg">analytics</span>
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight">Deep Blue Analytics</h2>
            </div>
            <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-card-dark border border-transparent focus-within:border-primary transition-colors">
                <div className="text-slate-400 flex items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-slate-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-medium leading-normal" placeholder="Search data..." />
              </div>
            </label>
          </div>
          <div className="flex flex-1 justify-end gap-6 items-center">
            <div className="hidden lg:flex items-center gap-6">
              <a className="text-slate-500 dark:text-text-dim hover:text-primary dark:hover:text-accent transition-colors text-sm font-medium leading-normal" href="#">Dashboard</a>
              <a className="text-slate-500 dark:text-text-dim hover:text-primary dark:hover:text-accent transition-colors text-sm font-medium leading-normal" href="#">Interns</a>
              <a className="text-slate-500 dark:text-text-dim hover:text-primary dark:hover:text-accent transition-colors text-sm font-medium leading-normal" href="#">Volunteers</a>
              <a className="text-primary dark:text-white text-sm font-medium leading-normal relative after:content-[''] after:absolute after:-bottom-5 after:left-0 after:w-full after:h-0.5 after:bg-accent" href="#">Analytics</a>
              <a className="text-slate-500 dark:text-text-dim hover:text-primary dark:hover:text-accent transition-colors text-sm font-medium leading-normal" href="#">Settings</a>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-700">
              <button className="size-9 rounded-full bg-slate-100 dark:bg-card-dark flex items-center justify-center text-slate-500 dark:text-text-dim hover:text-primary dark:hover:text-white transition-colors relative">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-2 right-2 size-2 bg-accent rounded-full border-2 border-white dark:border-card-dark"></span>
              </button>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-slate-200 dark:ring-slate-700 cursor-pointer" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=11')"}}></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center py-8 px-6 lg:px-12 pb-24">
          <div className="w-full max-w-7xl flex flex-col gap-8">
            {/* Page Heading & Actions */}
            <div className="flex flex-wrap justify-between items-end gap-4 p-2">
              <div className="flex flex-col gap-2 max-w-2xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary dark:bg-primary/30 dark:text-blue-200 border border-primary/20">Q3 Report</span>
                  <span className="text-slate-400 text-xs font-medium">Updated 2 mins ago</span>
                </div>
                <h1 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">System Analytics & Reporting</h1>
                <p className="text-slate-500 dark:text-text-dim text-base lg:text-lg font-normal leading-relaxed">
                  Real-time data visualization for recruitment trends and volunteer engagement across 124 partner universities.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  Last 30 Days
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent hover:bg-yellow-400 text-slate-900 font-bold text-sm shadow-lg shadow-accent/20 transition-all transform hover:-translate-y-0.5">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Generate Report
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <StatCard icon="description" color="blue" label="Total Applications" value="12,450" change="+15%" />
              <StatCard icon="school" color="indigo" label="Active Interns" value="850" change="+5%" />
              <StatCard icon="schedule" color="amber" label="Volunteer Hours" value="45,200" change="+22%" />
              <StatCard icon="apartment" color="purple" label="University Partners" value="124" change="+8%" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Line Chart */}
              <div className="lg:col-span-2 flex flex-col rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                  <div>
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Application Trends</h3>
                    <p className="text-slate-500 dark:text-text-dim text-sm mt-1">Comparitive analysis over the last 12 months</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-accent"></span>
                    <span className="text-xs text-slate-500 dark:text-text-dim font-medium">Current Year</span>
                    <span className="size-3 rounded-full bg-slate-300 dark:bg-slate-600 ml-2"></span>
                    <span className="text-xs text-slate-500 dark:text-text-dim font-medium">Last Year</span>
                  </div>
                </div>
                <div className="p-6 pt-8 flex-1 flex flex-col justify-end">
                  <div className="relative w-full h-[300px] flex items-end justify-between gap-2">
                    {/* SVG Line Chart */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#FFC107" stopOpacity="0.2"></stop>
                          <stop offset="100%" stopColor="#FFC107" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      <path className="text-slate-300 dark:text-slate-600" d="M0,80 Q10,75 20,70 T40,65 T60,55 T80,60 T100,50" fill="none" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.5"></path>
                      <path d="M0,90 Q10,60 20,50 T40,45 T60,30 T80,35 T100,20" fill="url(#chartGradient)" stroke="#FFC107" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.8"></path>
                      <circle cx="20" cy="50" fill="#162032" r="1.5" stroke="#FFC107" strokeWidth="0.5"></circle>
                      <circle cx="40" cy="45" fill="#162032" r="1.5" stroke="#FFC107" strokeWidth="0.5"></circle>
                      <circle cx="60" cy="30" fill="#162032" r="1.5" stroke="#FFC107" strokeWidth="0.5"></circle>
                      <circle cx="80" cy="35" fill="#162032" r="1.5" stroke="#FFC107" strokeWidth="0.5"></circle>
                      <circle cx="100" cy="20" fill="#162032" r="1.5" stroke="#FFC107" strokeWidth="0.5"></circle>
                    </svg>
                  </div>
                  <div className="flex justify-between mt-4 px-2">
                    <span className="text-xs text-slate-400 font-medium">Jan</span>
                    <span className="text-xs text-slate-400 font-medium">Mar</span>
                    <span className="text-xs text-slate-400 font-medium">May</span>
                    <span className="text-xs text-slate-400 font-medium">Jul</span>
                    <span className="text-xs text-slate-400 font-medium">Sep</span>
                    <span className="text-xs text-slate-400 font-medium">Nov</span>
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex flex-col rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Top Universities</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">State Tech</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">+12%</span>
                  </div>
                  <p className="text-slate-500 dark:text-text-dim text-sm mt-1">Leading source of recruits this semester</p>
                </div>
                <div className="p-6 pt-8 flex-1 flex flex-col justify-end">
                  <div className="flex items-end justify-between gap-4 h-[250px] w-full px-2">
                    <BarChartColumn label="State Tech" height="40%" />
                    <BarChartColumn label="City Univ" height="80%" active />
                    <BarChartColumn label="North Col" height="50%" />
                    <BarChartColumn label="West Acad" height="65%" />
                    <BarChartColumn label="East Inst" height="45%" />
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Table Section */}
            <div className="rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden mb-8">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex flex-wrap justify-between items-center gap-4">
                <h3 className="text-slate-900 dark:text-white text-lg font-bold">Recent Recruitments</h3>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">filter_list</span>
                  </button>
                  <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-500 dark:text-text-dim">
                  <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase font-semibold text-slate-500 dark:text-text-dim">
                    <tr>
                      <th className="px-6 py-4">Candidate Name</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">University</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    <TableRow initials="SJ" name="Sarah Jenkins" role="Marketing Intern" uni="State Tech University" status="Active" date="Oct 24, 2023" color="blue" />
                    <TableRow initials="MR" name="Marcus Ray" role="Data Analyst" uni="City University" status="Pending" date="Oct 23, 2023" color="purple" />
                    <TableRow initials="AL" name="Anna Liu" role="UX Designer" uni="West Academy" status="Active" date="Oct 21, 2023" color="rose" />
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
                <button className="text-sm font-medium text-primary dark:text-accent hover:underline">View All Candidates</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const StatCard = ({ icon, color, label, value, change }: any) => (
  <div className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-card-dark shadow-sm border border-slate-200 dark:border-slate-700/50 group hover:border-accent/50 transition-colors">
    <div className="flex justify-between items-start">
      <div className={`size-10 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center text-${color}-600 dark:text-${color === 'amber' ? 'accent' : color + '-400'}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="flex items-center text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
        <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span> {change}
      </span>
    </div>
    <div>
      <p className="text-slate-500 dark:text-text-dim text-sm font-medium mb-1">{label}</p>
      <p className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">{value}</p>
    </div>
  </div>
);

const BarChartColumn = ({ label, height, active }: any) => (
  <div className="flex flex-col items-center gap-2 w-full group cursor-pointer">
    <div className={`relative w-full rounded-t-sm transition-all duration-300 ${active ? 'bg-primary shadow-[0_0_15px_rgba(20,43,113,0.3)] dark:shadow-[0_0_15px_rgba(255,193,7,0.15)]' : 'bg-slate-100 dark:bg-slate-700/30 group-hover:bg-primary/20'}`} style={{ height }}>
       {active && <div className="absolute inset-0 bg-gradient-to-t from-primary to-blue-600 dark:from-accent dark:to-yellow-300 opacity-90"></div>}
       {!active && <div className="absolute bottom-0 left-0 w-full h-full bg-slate-300 dark:bg-slate-600 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300"></div>}
    </div>
    <span className={`text-[10px] font-bold text-center uppercase tracking-wider ${active ? 'text-primary dark:text-accent' : 'text-slate-500 dark:text-text-dim'}`}>{label}</span>
  </div>
);

const TableRow = ({ initials, name, role, uni, status, date, color }: any) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
      <div className={`size-8 rounded-full bg-${color}-100 dark:bg-${color}-900 flex items-center justify-center text-${color}-700 dark:text-${color}-300 text-xs font-bold`}>{initials}</div>
      {name}
    </td>
    <td className="px-6 py-4">{role}</td>
    <td className="px-6 py-4">{uni}</td>
    <td className="px-6 py-4">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200'} border dark:border-opacity-30`}>
        <span className={`size-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span> {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">{date}</td>
  </tr>
);