"use client";

import { useState } from "react";
import { 
  Camera, Eye, EyeOff, ChevronDown, Check
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// Моковые данные для графика активности
const activityData = Array.from({ length: 30 }).map((_, i) => ({
  name: `Day ${i + 1}`,
  login: 10 + Math.random() * 40 + (i * 2),
  action: 5 + Math.random() * 30 + (i * 1.5),
}));

export default function ProfilePage() {
  // Состояния для личной информации
  const [fullName, setFullName] = useState("Farid Mammadov");
  const [email, setEmail] = useState("hello@dropbridg.com");
  const [phone, setPhone] = useState("+994558470107");
  const [location, setLocation] = useState("Baku, Azerbaijan");

  // Состояния для паролей
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Состояния для настроек
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("USD");

  // Компонент переключателя (Toggle)
  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean, onChange: () => void }) => (
    <button 
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none transition-colors duration-200 ease-in-out ${enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
    >
      <span aria-hidden="true" className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-2' : '-translate-x-2'}`} />
    </button>
  );

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Шапка */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">My Profile & Settings</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Левая колонка (Личная информация) */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Personal Information</h2>
          
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Аватар */}
            <div className="flex flex-col items-center sm:items-start gap-4 shrink-0">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-[#1E293B] flex items-center justify-center overflow-hidden border-4 border-white dark:border-[#0F172A] shadow-md">
                  <span className="text-3xl font-bold text-slate-400 dark:text-slate-600">FM</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors border-2 border-white dark:border-[#0F172A]">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{fullName}</h3>
                <p className="text-sm font-medium text-amber-500">Premium Member</p>
              </div>
            </div>

            {/* Форма */}
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name:</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address:</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone Number:</label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location:</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow pr-10"
                  />
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="pt-2">
                <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка (Безопасность и Настройки) */}
        <div className="space-y-6">
          
          {/* Блок Security */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Security</h2>
            
            <div className="space-y-4">
              {/* Текущий пароль */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Current Password</label>
                <div className="relative">
                  <input 
                    type={showCurrentPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors pr-10"
                  />
                  <button onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Новый пароль */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">New Password</label>
                <div className="relative">
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors pr-10"
                  />
                  <button onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Подтверждение пароля */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors pr-10"
                  />
                  <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Two-Factor Authentication (2FA)</span>
                <ToggleSwitch enabled={is2FAEnabled} onChange={() => setIs2FAEnabled(!is2FAEnabled)} />
              </div>
            </div>
          </div>

          {/* Блок Account Settings */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Notifications</span>
                <ToggleSwitch enabled={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Dark Mode</span>
                <ToggleSwitch enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Currency (USD)</span>
                <div className="relative">
                  <select 
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="appearance-none bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white px-3 py-1.5 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижний блок: График активности */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">My Activity (Last 30 Days)</h2>
          
          <div className="flex items-center gap-6">
            {/* Легенда */}
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-[#0EA5E9] rounded-full"></div>
                <span className="text-slate-500 dark:text-slate-400">Login</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-[#D946EF] rounded-full"></div>
                <span className="text-slate-500 dark:text-slate-400">Action</span>
              </div>
            </div>
            {/* Статистика */}
            <div className="text-sm hidden md:block">
              <span className="text-slate-500 dark:text-slate-400">Total Logins: </span>
              <span className="font-bold text-slate-900 dark:text-white mr-4">152</span>
              <span className="text-slate-500 dark:text-slate-400">Last Active: </span>
              <span className="font-bold text-slate-900 dark:text-white">Today, 10:45 AM</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLogin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAction" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D946EF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D946EF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="action" stroke="#D946EF" strokeWidth={2} fillOpacity={1} fill="url(#colorAction)" activeDot={{ r: 4, strokeWidth: 0, fill: '#D946EF' }} />
              <Area type="monotone" dataKey="login" stroke="#0EA5E9" strokeWidth={2} fillOpacity={1} fill="url(#colorLogin)" activeDot={{ r: 4, strokeWidth: 0, fill: '#0EA5E9' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}