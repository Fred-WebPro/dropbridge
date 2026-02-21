"use client";

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";

export default function OTPPage() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Логика таймера
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Обработка ввода символа
  const handleChange = (index: number, value: string) => {
    // Разрешаем только цифры
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Авто-фокус на следующее поле, если ввели цифру
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Обработка Backspace для возврата в предыдущее поле
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Обработка вставки целого кода
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);
    
    // Фокус на последнее заполнененое поле
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080D1A] text-slate-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      
      {/* Декоративный фон */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Основной контейнер с центрированием */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        
        {/* Карточка */}
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
            Verify Your Email
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 px-2">
            A 6-digit verification code has been sent to your email address. Please enter it below.
          </p>

          {/* Форма */}
          <form className="w-full flex flex-col items-center" onSubmit={(e) => e.preventDefault()}>
            
            {/* Поля ввода ОТП */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 w-full mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-11 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold bg-slate-100 dark:bg-[#0B1426] border border-transparent dark:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl outline-none transition-all text-slate-900 dark:text-white"
                />
              ))}
            </div>

            {/* Кнопка подтверждения */}
            <button
              type="submit"
              disabled={code.includes("")}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-500/25"
            >
              Verify Code
            </button>
          </form>

          {/* Таймер повторной отправки */}
          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            {timeLeft > 0 ? (
              <span>Resend Code in <span className="text-slate-700 dark:text-slate-300 font-medium">{formatTime(timeLeft)}</span></span>
            ) : (
              <button
                onClick={() => setTimeLeft(60)}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Resend Code Now
              </button>
            )}
          </div>

          {/* Ссылка назад на логин */}
          <div className="mt-4">
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