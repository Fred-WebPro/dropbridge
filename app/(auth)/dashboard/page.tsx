"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, ChevronDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Моковые данные для графика, которые меняются при переключении вкладок
const data30d = [
  { name: 'Day 1', today: 120, comparative: 90 }, { name: 'Day 5', today: 300, comparative: 200 },
  { name: 'Day 9', today: 250, comparative: 280 }, { name: 'Day 13', today: 480, comparative: 350 },
  { name: 'Day 17', today: 850, comparative: 750 }, { name: 'Day 21', today: 550, comparative: 600 },
  { name: 'Day 25', today: 900, comparative: 820 }, { name: 'Day 30', today: 750, comparative: 680 },
];
const data7d = data30d.slice(-4);
const dataToday = [{ name: '00:00', today: 10, comparative: 5 }, { name: '12:00', today: 45, comparative: 30 }, { name: '23:59', today: 90, comparative: 75 }];

function StatCard({ title, value, trend, isPositive }: { title: string, value: string, trend: string, isPositive: boolean }) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group cursor-default">
      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{value}</div>
        <div className={`flex items-center text-xs font-medium px-2 py-1 rounded-md ${isPositive ? 'text-green-600 bg-green-50 dark:bg-green-500/10' : 'text-red-600 bg-red-50 dark:bg-red-500/10'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trend}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [isRegionOpen, setIsRegionOpen] = useState(false);

  // Выбор данных в зависимости от вкладки
  const chartData = timeRange === '30d' ? data30d : timeRange === '7d' ? data7d : dataToday;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Левая колонка */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Daily Summary */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Daily Summary</h2>
              <div className="relative">
                <button 
                  onClick={() => setIsRegionOpen(!isRegionOpen)}
                  className="flex items-center gap-2 text-sm px-3 py-1.5 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/60 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1E293B] transition-colors"
                >
                  All regions <ChevronDown className="w-4 h-4" />
                </button>
                {isRegionOpen && (
                  <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 py-1">
                    {['USA', 'Europe', 'Asia'].map(r => (
                      <button key={r} onClick={() => setIsRegionOpen(false)} className="w-full text-left px-4 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200">{r}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title="Total Revenue" value="$4,520" trend="+12.5%" isPositive={true} />
              <StatCard title="Orders" value="156" trend="+8.2%" isPositive={true} />
              <StatCard title="Net Profit" value="$1,280" trend="-2.4%" isPositive={false} />
              <StatCard title="Avg. Order Value" value="$29" trend="+5.1%" isPositive={true} />
            </div>
          </div>

          {/* Интерактивный График (Recharts) */}
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sales Trends</h2>
              <div className="flex bg-slate-100 dark:bg-[#0B1120] rounded-lg p-1">
                {['Today', '7d', '30d', 'Custom'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setTimeRange(tab)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${timeRange === tab ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorToday" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="comparative" stroke="#8B5CF6" strokeWidth={2} fillOpacity={1} fill="url(#colorComp)" />
                  <Area type="monotone" dataKey="today" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorToday)" activeDot={{ r: 6, strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Recommendations</h2>
          
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm border-l-4 border-l-green-500 hover:translate-x-1 transition-transform cursor-pointer">
            <div className="text-xs font-semibold text-green-500 uppercase tracking-wider mb-1">Trending Products</div>
            <h3 className="text-slate-900 dark:text-white font-medium mb-2">Smartwatch X-9</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">High search volume. Expected growth +45%.</p>
          </div>

          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm border-l-4 border-l-blue-500 hover:translate-x-1 transition-transform cursor-pointer">
            <div className="flex justify-between items-start mb-1">
               <div className="text-xs font-semibold text-blue-500 uppercase tracking-wider">Recommended Niche</div>
               <span className="text-xs text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded">Impact Score</span>
            </div>
            <h3 className="text-slate-900 dark:text-white font-medium mb-1">Home Office Ergonomics</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">(High Potential)</p>
          </div>
        </div>
      </div>

      {/* Нижняя секция */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Интерактивный Heatmap (имитация) */}
        <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Category Heatmap</h2>
           <div className="grid grid-cols-7 gap-1 h-40">
              {Array.from({length: 28}).map((_, i) => {
                // Генерируем случайную интенсивность от 100 до 600 для цвета
                const intensity = [100, 200, 300, 400, 500, 600][Math.floor(Math.random() * 6)];
                return (
                  <div 
                    key={i} 
                    className={`rounded-sm cursor-pointer hover:scale-110 transition-transform bg-orange-${intensity} dark:bg-orange-${intensity}/80`}
                    style={{ backgroundColor: `rgb(249 115 22 / ${intensity}%)` }}
                    title={`Value: ${intensity}`}
                  />
                );
              })}
           </div>
        </div>

        {/* Интерактивная CSS Воронка */}
        <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Funnel</h2>
           <div className="flex flex-col items-center justify-center h-40 gap-1 w-full px-4">
              <div className="w-full h-8 bg-blue-500 rounded-t-lg flex items-center justify-center text-xs font-bold text-white hover:opacity-90 cursor-pointer transition-opacity">Views (59%)</div>
              <div className="w-3/4 h-8 bg-blue-400 flex items-center justify-center text-xs font-bold text-white hover:opacity-90 cursor-pointer transition-opacity">Clicks (15%)</div>
              <div className="w-1/2 h-8 bg-blue-300 flex items-center justify-center text-xs font-bold text-white hover:opacity-90 cursor-pointer transition-opacity">Carts (3%)</div>
              <div className="w-1/4 h-8 bg-blue-200 rounded-b-lg flex items-center justify-center text-xs font-bold text-slate-800 hover:opacity-90 cursor-pointer transition-opacity">Sales (1%)</div>
           </div>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
           <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Products</h2>
           <div className="space-y-4">
             {[
               {name: "Smartwatch X-9", price: "$45.00", target: "$5.50", color: "bg-blue-100 dark:bg-blue-900/30"},
               {name: "Eco-friendly Bottle", price: "$25.00", target: "$3.50", color: "bg-green-100 dark:bg-green-900/30"},
               {name: "Office Ergonomics", price: "$85.00", target: "$12.00", color: "bg-purple-100 dark:bg-purple-900/30"}
             ].map((prod, i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${prod.color} flex items-center justify-center text-lg font-bold group-hover:scale-105 transition-transform`}>
                      {prod.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{prod.name}</div>
                      <div className="text-xs text-slate-500">{prod.price}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Target CPL</div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{prod.target}</div>
                  </div>
                </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}