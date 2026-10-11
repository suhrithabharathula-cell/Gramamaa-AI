import React, { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Languages,
  UserCheck
} from 'lucide-react';
import { authService, DEMO_USER } from '../services/authService';
import { translations } from '../data/translations';
import ForgotPasswordModal from '../components/ForgotPasswordModal';

export default function LoginPage({
  onLoginSuccess,
  onNavigateToRegister,
  lang = 'te',
  onToggleLang
}) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const t = translations[lang] || translations.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim() || !password) {
      setErrorMessage(t.fillAllRequired || 'Please enter both your email/phone and password.');
      return;
    }

    try {
      setIsLoading(true);
      const user = await authService.signIn({
        emailOrPhone: identifier.trim(),
        password
      });
      if (user && onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (err) {
      setIsLoading(false);
      if (err.message === 'userNotFound') {
        setErrorMessage(t.userNotFound || 'No account found with this email or mobile number.');
      } else if (err.message === 'invalidPassword') {
        setErrorMessage(t.invalidPassword || 'Incorrect password. Please verify and try again.');
      } else {
        setErrorMessage(err.message || 'Authentication error. Please check your credentials.');
      }
    }
  };

  const handleQuickDemo = async () => {
    setErrorMessage('');
    try {
      setIsLoading(true);
      const demoUser = await authService.quickDemoLogin();
      if (demoUser && onLoginSuccess) {
        onLoginSuccess(demoUser);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Failed to login with demo account.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-emerald-50 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Bar with Language Toggle & Safety Badge */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-teal-800">
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-teal-900">
            {t.appTitle}
          </span>
        </div>

        <button
          onClick={onToggleLang}
          className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-full bg-white border border-teal-200 text-teal-800 hover:bg-teal-50 transition-all shadow-sm"
          title="Switch Language"
        >
          <Languages className="w-3.5 h-3.5" />
          <span>{t.languageSwitch}</span>
        </button>
      </div>

      {/* Main Authentication Card */}
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl shadow-xl border border-teal-100 overflow-hidden my-auto">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 p-6 sm:p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            {t.loginTitle || "Sign In to GramaMaa AI"}
          </h1>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xs mx-auto leading-relaxed">
            {t.loginSubtitle || "Secure, private maternal & child care support designed for you."}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-start space-x-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-rose-500" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Phone Input */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {t.emailOrPhone || "Email or Mobile Number"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="lakshmi@gramamaa.org or 9876543210"
                  className="w-full pl-10 pr-3.5 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50 focus:bg-white text-slate-900 transition-all"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {t.password || "Password"}
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs text-teal-600 hover:text-teal-800 font-semibold transition-colors"
                >
                  {t.forgotPassword || "Forgot Password?"}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50 focus:bg-white text-slate-900 transition-all"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-slate-300 rounded focus:ring-teal-500"
                />
                <span className="text-xs text-slate-600 font-medium">
                  {t.rememberMe || "Keep me signed in"}
                </span>
              </label>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>{isLoading ? (t.loggingIn || "Signing In...") : (t.loginBtn || "Sign In Securely")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Quick Demo Login Divider for Evaluators */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-400 font-medium uppercase tracking-wider">
                {lang === 'te' ? 'లేదా తక్షణ డెమో' : 'or rapid evaluation'}
              </span>
            </div>
          </div>

          {/* 1-Tap Demo Button */}
          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-800 font-semibold text-xs rounded-xl transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>{t.quickDemoLogin || "1-Tap Quick Demo Login (Lakshmi Devi)"}</span>
          </button>
          <p className="text-[11px] text-center text-slate-400">
            {t.demoNotice || "Preloaded with sample pregnancy, medication & appointment records."}
          </p>

          {/* Demo Credentials Box */}
          <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center justify-between font-bold text-slate-800 mb-1.5">
              <span>🔑 {lang === 'te' ? 'టెస్టింగ్ లాగిన్ వివరాలు' : 'Demo Test Credentials'}:</span>
              <button
                type="button"
                onClick={() => {
                  setIdentifier('lakshmi@gramamaa.org');
                  setPassword('GramaMaa123!');
                }}
                className="text-[11px] font-bold text-teal-700 bg-teal-100 hover:bg-teal-200 px-2 py-0.5 rounded-lg transition cursor-pointer"
              >
                {lang === 'te' ? 'ఆటో-ఫిల్' : 'Auto-Fill'}
              </button>
            </div>
            <div className="space-y-0.5 text-slate-600 font-mono text-[11px]">
              <p><span className="font-sans font-semibold text-slate-500">Email:</span> lakshmi@gramamaa.org</p>
              <p><span className="font-sans font-semibold text-slate-500">Mobile:</span> 9876543210</p>
              <p><span className="font-sans font-semibold text-slate-500">Password:</span> GramaMaa123!</p>
            </div>
          </div>

          {/* Switch to Registration */}
          <div className="pt-2 text-center text-xs text-slate-600">
            <span>{t.noAccount || "Don't have an account yet?"} </span>
            <button
              type="button"
              onClick={onNavigateToRegister}
              className="font-bold text-teal-700 hover:text-teal-900 hover:underline transition-all"
            >
              {t.createAccount || "Create Account"}
            </button>
          </div>
        </div>
      </div>

      {/* Security & Disclaimer Footer */}
      <div className="max-w-md w-full mx-auto mt-4 text-center">
        <div className="inline-flex items-center space-x-1.5 text-[11px] text-slate-500 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/60 shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>{t.dataLockedMessage || "Maternal records private & encrypted. Sign in to view."}</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
