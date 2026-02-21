"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { 
  TrendingUp, Menu, Search, Moon, Sun, LayoutDashboard, 
  Package, Megaphone, Target, Users, BarChart2, Sparkles, 
  Bell, Settings, LogOut
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  // Логика переключения тем
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Основная навигация
  const mainLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
    { name: "Niches", href: "/dashboard/niches", icon: Target },
    { name: "Sellers", href: "/dashboard/sellers", icon: Users },
    { name: "Insights", href: "/dashboard/insights", icon: BarChart2 },
  ];

  return (
    // Жестко фиксируем высоту экрана (h-screen) и скрываем глобальный скролл
    <div className="h-screen flex overflow-hidden bg-[#F8FAFC] dark:bg-[#0B1120] text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300">
      
      {/* Затемнение фона на мобилках при открытом меню */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Левый Сайдбар (Фиксированный по высоте) */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800/60 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col h-full shrink-0`}>
        
        {/* Логотип */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800/60 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-500" />
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">DropBridge</span>
          </Link>
        </div>

        {/* Скроллируемая часть меню */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5 scrollbar-hide">
          
          {/* Main Menu */}
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Main Menu
            </div>
            <div className="space-y-1">
              {mainLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10" 
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    <link.icon className={`w-5 h-5 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}`} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Tools / AI */}
          <div>
            <div className="px-3 mb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Tools
            </div>
            <Link
              href="/dashboard/ai"
              className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 text-indigo-700 dark:text-indigo-300 hover:opacity-80 transition-opacity border border-indigo-100 dark:border-indigo-500/20 group"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400 group-hover:animate-pulse" />
                AI Module
              </div>
              <span className="text-[10px] uppercase font-bold bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 px-1.5 py-0.5 rounded">Pro</span>
            </Link>
          </div>
        </div>

        {/* Системный блок (Приколочен к низу) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-transparent space-y-4 shrink-0">
          
          {/* Уведомления и Настройки */}
          <div className="flex items-center justify-around">
            <Link href="/dashboard/notifications" className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors relative rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-50 dark:border-[#0F172A]"></span>
            </Link>
            
            {/* ТЕПЕРЬ ЭТО ССЫЛКА НА НАСТРОЙКИ */}
            <Link href="/dashboard/settings" className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
              <Settings className="w-5 h-5" />
            </Link>
          </div>

          {/* Переключатель тем */}
          {mounted && (
            <div className="bg-slate-200/50 dark:bg-[#0B1120] p-1 rounded-xl flex items-center">
              <button 
                onClick={() => setTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-lg transition-all ${theme === 'dark' ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
              >
                <Moon className="w-3.5 h-3.5" /> Dark
              </button>
              <button 
                onClick={() => setTheme('light')}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-medium rounded-lg transition-all ${theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                <Sun className="w-3.5 h-3.5" /> Light
              </button>
            </div>
          )}

          {/* Профиль пользователя */}
          <div className="flex items-center gap-2 pt-2">
            <Link 
              href="/dashboard/profile" 
              className="flex items-center gap-3 flex-1 min-w-0 group cursor-pointer rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800/50 p-1.5 -ml-1.5 transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 group-hover:shadow-md transition-shadow">
                F
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Farid Mammadov</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">hello@.dropbridgecom</p>
              </div>
            </Link>
            
            {/* Кнопка выхода */}
            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 shrink-0">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Правая часть (Шапка + Независимо скроллируемый контент) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Чистая верхняя шапка */}
        <header className="h-16 shrink-0 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between px-4 lg:px-6 z-20">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Глобальный поиск */}
            <div className="hidden sm:flex items-center relative max-w-md w-full">
              <Search className="w-4 h-4 absolute left-3 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search products, niches, or sellers..." 
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-[#0F172A] border-transparent focus:bg-white dark:focus:bg-[#1E293B] focus:border-blue-500 dark:focus:border-blue-500 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>
          </div>
        </header>

        {/* Контент страницы (Только эта часть теперь скроллится!) */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>

      </div>
    </div>
  );
}