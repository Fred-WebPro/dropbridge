"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080D1A] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Декоративный фон (мягкое свечение) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Основной контейнер с центрированием */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        
        {/* Карточка восстановления пароля */}
        <div className="w-full max-w-[420px] bg-white dark:bg-[#111C35] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center text-center">
          
          {/* Логотип */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-1.5 bg-white rounded-lg shadow-sm">
              <TrendingUp className="w-6 h-6 text-slate-900" />
            </div>
            <span className="text-2xl font-bold tracking-tight">DropBridg</span>
          </div>

          {/* Заголовки */}
          <h1 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
            Forgot Password?
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 px-2">
            Enter your email address below to receive password reset instructions.
          </p>

          {/* Форма */}
          <form className="w-full space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
            
            {/* Поле Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                required
                className="w-full px-4 py-3 bg-slate-100 dark:bg-[#0B1426] border border-transparent dark:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            {/* Кнопка сброса */}
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
            >
              Reset Password
            </button>
          </form>

          {/* Ссылка назад на логин */}
          <div className="mt-6">
            <Link href="/login" className="text-sm text-blue-500 hover:text-blue-600 transition-colors font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Футер */}
      <footer className="py-6 text-center text-sm text-slate-500 dark:text-slate-400 z-10">
        © {new Date().getFullYear()} DropBridg. All rights reserved.
      </footer>
    </div>
  );
}