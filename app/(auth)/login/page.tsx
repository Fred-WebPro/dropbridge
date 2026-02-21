"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, TrendingUp } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  // В будущем эти тексты будут заменены на вызовы функции перевода, например: t('emailAddress')
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0B1426] text-slate-900 dark:text-white p-4 transition-colors duration-300 relative overflow-hidden">
      
      {/* Декоративный фоновый элемент (имитация свечения/графика из дизайна) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Карточка авторизации */}
      <div className="w-full max-w-[420px] bg-white dark:bg-[#111C35] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 z-10">
        
        {/* Логотип */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="p-1.5 bg-white rounded-lg">
            <TrendingUp className="w-6 h-6 text-slate-900" />
          </div>
          <span className="text-2xl font-bold tracking-tight">DropBridg</span>
        </div>

        {/* Форма */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 bg-slate-100 dark:bg-[#0B1426] border border-transparent dark:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Пароль */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 bg-slate-100 dark:bg-[#0B1426] border border-transparent dark:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Кнопка входа */}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
          >
            Login
          </button>
        </form>

        {/* Ссылки */}
        <div className="flex items-center justify-between mt-4 text-sm">
          <Link href="/forgot-password" className="text-blue-500 hover:text-blue-600 transition-colors">
            Forgot Password?
          </Link>
          <Link href="/register" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
            Create an Account
          </Link>
        </div>

        {/* Разделитель */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
          <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">or</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        </div>

        {/* Социальные кнопки */}
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-[#0B1426] border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-sm font-medium">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
              <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.806l-4.04 3.127C3.18 21.698 7.273 24 12 24c3.24 0 5.917-1.08 7.856-2.924l-3.816-3.063Z"/>
              <path fill="#4A90E2" d="M19.856 21.076C22.05 19.018 23.454 15.902 23.454 12c0-.75-.072-1.5-.205-2.227H12v4.423h6.634c-.308 1.472-1.22 2.716-2.594 3.553l3.816 3.063Z"/>
              <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
            </svg>
            Login Google
          </button>
          
          <button className="flex items-center justify-center gap-2 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl transition-colors text-sm font-medium">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>

      {/* Футер */}
      <div className="absolute bottom-6 text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} DropBridg. All rights reserved.
      </div>
    </div>
  );
}