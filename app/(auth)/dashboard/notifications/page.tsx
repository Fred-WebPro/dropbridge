"use client";

import { useState } from "react";
import { 
  Bell, CheckCircle2, AlertCircle, ShoppingBag, TrendingUp, 
  MessageSquare, MoreHorizontal, Check, Settings, Mail, Smartphone
} from "lucide-react";

// Типы уведомлений для разных иконок и цветов
type NotificationType = 'alert' | 'success' | 'sale' | 'system' | 'message';

interface NotificationInfo {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  category: string;
}

// Моковые данные уведомлений
const initialNotifications: NotificationInfo[] = [
  { id: 1, type: 'alert', title: 'Inventory Alert', message: 'Smartwatch X-9 stock is dropping below 50 units. Consider reordering soon to avoid stockouts.', time: '10 mins ago', isRead: false, category: 'System' },
  { id: 2, type: 'sale', title: 'New Milestone Reached', message: 'Congratulations! You just surpassed $10,000 in revenue for the "Home Office" niche this month.', time: '2 hours ago', isRead: false, category: 'Sales' },
  { id: 3, type: 'message', title: 'Message from Supplier', message: 'GlobalSuppliers has responded to your inquiry about bulk pricing for Eco-friendly bottles.', time: '4 hours ago', isRead: false, category: 'Messages' },
  { id: 4, type: 'success', title: 'Campaign Optimized', message: 'AI Module successfully optimized your Facebook Ad campaign for "Wireless Chargers". CPC dropped by 12%.', time: 'Yesterday', isRead: true, category: 'Marketing' },
  { id: 5, type: 'system', title: 'System Update', message: 'DropBridge platform will undergo scheduled maintenance on Sunday at 2:00 AM UTC.', time: 'Yesterday', isRead: true, category: 'System' },
  { id: 6, type: 'sale', title: 'Unusually High Refund Rate', message: 'We noticed a 4% refund rate spike for "Fast Charging Dock". Please review the product quality.', time: '2 days ago', isRead: true, category: 'Sales' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState('All');

  // Фильтрация
  const filteredNotifications = notifications.filter(notif => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return !notif.isRead;
    return notif.category === activeFilter;
  });

  // Отметить всё как прочитанное
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  // Отметить одно как прочитанное
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Выбор иконки и цвета в зависимости от типа
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'alert': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'sale': return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'system': return <Settings className="w-5 h-5 text-slate-500" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const getIconBg = (type: NotificationType) => {
    switch (type) {
      case 'alert': return 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20';
      case 'success': return 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20';
      case 'sale': return 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20';
      case 'message': return 'bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20';
      case 'system': return 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50';
      default: return 'bg-slate-100 dark:bg-slate-800';
    }
  };

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Шапка */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-500" /> Notifications
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your alerts, messages, and system updates.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center justify-center gap-2 text-sm px-4 py-2 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1E293B] transition-all shadow-sm"
        >
          <Check className="w-4 h-4" /> Mark all as read
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Левая колонка: Список уведомлений */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          
          {/* Фильтры */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto hide-scrollbar bg-slate-50/50 dark:bg-[#0B1120]/30">
            {['All', 'Unread', 'Sales', 'Marketing', 'Messages', 'System'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B]'
                }`}
              >
                {filter}
                {filter === 'Unread' && notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-100 text-xs">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Список */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 flex-1">
            {filteredNotifications.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No notifications found for this category.</p>
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  onClick={() => markAsRead(notif.id)}
                  className={`p-5 flex gap-4 transition-colors cursor-pointer group ${notif.isRead ? 'opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-[#111C35]/50' : 'bg-blue-50/30 dark:bg-blue-500/5 hover:bg-blue-50 dark:hover:bg-blue-500/10'}`}
                >
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 mt-1 ${getIconBg(notif.type)}`}>
                    {getIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`text-sm font-semibold truncate ${notif.isRead ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                        {notif.title}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0">{notif.time}</span>
                    </div>
                    <p className={`text-sm leading-relaxed mb-2 ${notif.isRead ? 'text-slate-500 dark:text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-[#1E293B] px-2 py-0.5 rounded-md">
                        {notif.category}
                      </span>
                      {!notif.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-[#1E293B] transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Правая колонка: Настройки уведомлений */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 sticky top-24">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-500" /> Notification Preferences
            </h2>
            
            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Email Alerts</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Daily summaries & critical alerts</div>
                  </div>
                </div>
                {/* Custom Toggle Switch */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Push Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">Push Notifications</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">In-app live alerts</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Mobile SMS */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-[#1E293B] text-slate-600 dark:text-slate-400 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">SMS Alerts</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Only for security & billing</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

            </div>
            
            <button className="w-full mt-6 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1E293B] hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors rounded-xl">
              Advanced Settings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}