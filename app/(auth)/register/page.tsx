"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  // Функция для расчета надежности пароля (от 0 до 5)
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length > 7) score += 1; // Длина больше 7
    if (/[A-Z]/.test(pass)) score += 1; // Заглавные буквы
    if (/[a-z]/.test(pass)) score += 1; // Строчные буквы
    if (/[0-9]/.test(pass)) score += 1; // Цифры
    if (/[^A-Za-z0-9]/.test(pass)) score += 1; // Спецсимволы (!@#$%^&*)
    return score;
  };

  const strengthScore = calculatePasswordStrength(password);

  // Определение цвета и текста индикатора
  const getStrengthColor = (level: number) => {
    if (strengthScore >= level) {
      if (strengthScore <= 2) return "bg-red-500";
      if (strengthScore <= 4) return "bg-yellow-500";
      return "bg-green-500";
    }
    return "bg-slate-200 dark:bg-slate-800";
  };

  const getStrengthText = () => {
    if (strengthScore === 0) return "";
    if (strengthScore <= 2) return "Слабый пароль";
    if (strengthScore <= 4) return "Средний пароль";
    return "Надежный пароль";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080D1A] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Декоративный фон */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Основной контейнер с центрированием */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        <div className="w-full max-w-[420px] flex flex-col items-center">
          
          {/* Логотип и Заголовок */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center justify-center gap-2">
              <div className="p-1.5 bg-white rounded-lg">
                <TrendingUp className="w-6 h-6 text-slate-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight">DropBridg</span>
            </div>
            <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">Create Account</h1>
          </div>

          {/* Форма */}
          <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all placeholder:text-slate-400 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all placeholder:text-slate-500 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Индикатор сложности пароля */}
              {password && (
                <div className="pt-1">
                  <div className="flex gap-1.5 h-1.5 w-full">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full transition-colors duration-300 ${getStrengthColor(level)}`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs mt-1.5 font-medium ${strengthScore <= 2 ? "text-red-500" : strengthScore <= 4 ? "text-yellow-500" : "text-green-500"}`}>
                    {getStrengthText()}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-[#1E293B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all placeholder:text-slate-500 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Условия использования */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500 dark:bg-[#0F172A] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                I agree to the{" "}
                <Link href="#" className="text-blue-500 hover:underline">Terms</Link>
                {" "}and{" "}
                <Link href="#" className="text-blue-500 hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Кнопка регистрации (заблокирована, если пароль слабый) */}
            <button
              type="submit"
              disabled={password.length > 0 && strengthScore < 5}
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
            >
              Sign Up
            </button>
          </form>

          {/* Разделитель */}
          <div className="flex items-center gap-3 w-full my-6">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">or</span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Социальные кнопки */}
          <div className="w-full space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-white text-slate-800 hover:bg-slate-50 transition-colors rounded-xl text-sm font-medium shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.806l-4.04 3.127C3.18 21.698 7.273 24 12 24c3.24 0 5.917-1.08 7.856-2.924l-3.816-3.063Z"/>
                <path fill="#4A90E2" d="M19.856 21.076C22.05 19.018 23.454 15.902 23.454 12c0-.75-.072-1.5-.205-2.227H12v4.423h6.634c-.308 1.472-1.22 2.716-2.594 3.553l3.816 3.063Z"/>
                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
              </svg>
              Sign up with Google
            </button>
            
            <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white transition-colors rounded-xl text-sm font-medium shadow-sm">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Sign up with Facebook
            </button>
          </div>

          {/* Ссылка на логин перенесена внутрь основного блока, чтобы избежать нахлестов */}
          <p className="mt-8 text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Футер теперь в нормальном потоке документа */}
      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400 z-10">
        © {new Date().getFullYear()} DropBridg. All rights reserved.
      </footer>
    </div>
  );
}