
import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api';

type ViewState = 'landing' | 'admin' | 'submission' | 'analytics' | 'onboarding' | 'auth';

export default function AuthPage({ onLogin, onNavigate }: { onLogin: () => void; onNavigate?: (view: ViewState) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showOAuthEmailModal, setShowOAuthEmailModal] = useState<'google' | 'linkedin' | null>(null);
  const [oauthEmail, setOauthEmail] = useState('');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const handleOAuthSignIn = async (provider: 'google' | 'linkedin', oauthEmailInput?: string) => {
    const emailToUse = oauthEmailInput || email;
    
    if (!emailToUse) {
      // Show email input modal
      setShowOAuthEmailModal(provider);
      return;
    }

    setIsLoggingIn(true);
    setError(null);

    try {
      const backendResponse = await fetch(`http://localhost:8000/api/v1/auth/${provider}`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify({ 
          email: emailToUse,
          name: fullName || emailToUse.split('@')[0]
        }),
      });

      if (backendResponse.ok) {
        const userData = await backendResponse.json();
        // Store the token
        localStorage.setItem('access_token', userData.access_token);
        setSuccess(`Welcome, ${userData.user.username}!`);
        setShowOAuthEmailModal(null);
        setOauthEmail('');
        setTimeout(() => onLogin(), 1500);
      } else {
        const errData = await backendResponse.json();
        setError(errData.detail || `${provider} authentication failed`);
      }
    } catch (err: any) {
      setError(`Could not connect to ${provider} auth server`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleOAuthEmailModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showOAuthEmailModal && oauthEmail.trim()) {
      handleOAuthSignIn(showOAuthEmailModal, oauthEmail.trim());
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoggingIn(true);

    try {
      if (isLogin) {
        // Login
        if (!email || !password) {
          setError('Please fill in all fields');
          setIsLoggingIn(false);
          return;
        }
        const response = await loginUser(email, password);
        setSuccess(`Welcome back, ${response.user.username}!`);
        setTimeout(() => onLogin(), 1500);
      } else {
        // Register
        if (!email || !password || !username || !fullName) {
          setError('Please fill in all fields');
          setIsLoggingIn(false);
          return;
        }
        const response = await registerUser(email, username, password, fullName);
        setSuccess(`Account created! Welcome, ${response.user.username}!`);
        setEmail('');
        setPassword('');
        setUsername('');
        setFullName('');
        // Automatically sign in after successful registration
        setTimeout(() => onLogin(), 1500);
      }
    } catch (err: any) {
      setError(err.message || (isLogin ? 'Login failed' : 'Registration failed'));
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background-light dark:bg-background-dark font-display">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex w-1/2 bg-deep-blue text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 text-accent">
              <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Amaliyot Ofisi</span>
          </div>
          
          <div className="mt-20">
            <h1 className="text-5xl font-black leading-tight mb-6">
              Start Your <br/>
              <span className="text-accent">Professional Journey</span>
            </h1>
            <p className="text-white/70 text-lg max-w-md leading-relaxed">
              Connect with top universities, find meaningful internships, and accelerate your career growth with our comprehensive management platform.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-sm">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="material-symbols-outlined text-accent text-sm filled text-[14px]">star</span>
              ))}
            </div>
            <p className="text-sm font-medium leading-relaxed mb-4">"This platform revolutionized how we manage our university's internship programs. Simply outstanding."</p>
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-full bg-cover bg-center" style={{backgroundImage: "url('https://i.pravatar.cc/150?u=15')"}}></div>
              <div>
                <p className="text-sm font-bold">Dr. Emily Carter</p>
                <p className="text-xs text-white/50">Dean, State Tech University</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        {isLoggingIn && (
          <div className="absolute inset-0 bg-white/60 dark:bg-background-dark/60 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all animate-in fade-in duration-300">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-primary dark:text-accent font-bold animate-pulse">Verifying credentials...</p>
          </div>
        )}

        <div className="w-full max-w-md flex flex-col gap-8 py-8">
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="size-8 text-primary dark:text-accent">
               <svg className="h-full w-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Amaliyot Ofisi</span>
          </div>

          {/* Back Button */}
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => onNavigate && onNavigate('landing')}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Home</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              {isLogin ? 'Enter your details to access your account.' : 'Join us today and start your journey.'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
              <span className="material-symbols-outlined text-red-500">error</span>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
              <span className="material-symbols-outlined text-green-500">check_circle</span>
              <p className="text-sm font-medium text-green-600 dark:text-green-400">{success}</p>
            </div>
          )}

          {/* Toggle Switch */}
          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                isLogin 
                  ? 'bg-white dark:bg-card-dark text-primary dark:text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${
                !isLogin 
                  ? 'bg-white dark:bg-card-dark text-primary dark:text-white shadow-sm' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Email/Password Form */}
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. John Doe" 
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-shadow"
                  disabled={isLoggingIn}
                />
              </div>
            )}

            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Username</label>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. johndoe" 
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-shadow"
                  disabled={isLoggingIn}
                />
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-shadow"
                disabled={isLoggingIn}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-shadow"
                disabled={isLoggingIn}
              />
            </div>

            <button 
              type="submit"
              disabled={isLoggingIn}
              className={`mt-2 w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Social Auth */}
          <div className="relative flex items-center gap-2 my-2">
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
            <span className="text-xs font-bold text-slate-400 uppercase">Or continue with</span>
            <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          </div>

          <div className="flex flex-col gap-3">
             {/* Google OAuth Button */}
             <button 
              type="button"
              onClick={() => handleOAuthSignIn('google')}
              disabled={isLoggingIn}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-card-dark disabled:opacity-50 disabled:cursor-not-allowed"
             >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11.7H8.45V15.36H10.233C10.359 16.053 10.769 16.639 11.314 16.995V18.41H8.45C7.331 18.41 6 17.158 6 15.36V8.64C6 7.842 6.331 7.153 6.806 6.639C7.281 6.125 7.95 5.79 8.45 5.79H11.314C12.433 5.79 13.764 7.042 13.764 8.84V11.7H12Z" fill="currentColor"/>
                <path d="M18 11.7H14.45V15.36H16.233C16.359 16.053 16.769 16.639 17.314 16.995V18.41H14.45C13.331 18.41 12 17.158 12 15.36V8.64C12 7.842 12.331 7.153 12.806 6.639C13.281 6.125 13.95 5.79 14.45 5.79H17.314C18.433 5.79 19.764 7.042 19.764 8.84V11.7H18Z" fill="currentColor"/>
              </svg>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Google</span>
             </button>
             
             {/* LinkedIn OAuth Button */}
             <button 
              type="button"
              onClick={() => handleOAuthSignIn('linkedin')}
              disabled={isLoggingIn}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-card-dark disabled:opacity-50 disabled:cursor-not-allowed"
             >
              <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">LinkedIn</span>
             </button>
          </div>

          {/* OAuth Email Modal */}
          {showOAuthEmailModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-card-dark rounded-2xl shadow-2xl max-w-sm w-full p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Sign in with {showOAuthEmailModal === 'google' ? 'Google' : 'LinkedIn'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">Enter your email address</p>

                <form onSubmit={handleOAuthEmailModalSubmit} className="flex flex-col gap-4">
                  <input
                    type="email"
                    value={oauthEmail}
                    onChange={(e) => setOauthEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent"
                    autoFocus
                    disabled={isLoggingIn}
                  />

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowOAuthEmailModal(null);
                        setOauthEmail('');
                      }}
                      disabled={isLoggingIn}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoggingIn || !oauthEmail.trim()}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoggingIn ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </>
                      ) : (
                        <span>Continue</span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
