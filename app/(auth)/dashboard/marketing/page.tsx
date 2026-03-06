"use client";

import { useState } from "react";
import { 
  TrendingUp, Target, ShoppingCart, Video, MapPin, Calendar, ChevronDown, Filter 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

// Моковые данные для мини-графиков KPI
const generateSparkline = (base: number) => Array.from({ length: 10 }).map((_, i) => ({ v: base + (Math.random() * 20 - 10) }));

// Моковые данные для основного графика (Spend vs Revenue)
const trendData30d = Array.from({ length: 30 }).map((_, i) => ({
  name: `Day ${i + 1}`,
  spend: 100 + Math.random() * 200 + (i * 10),
  revenue: 150 + Math.random() * 400 + (i * 25),
}));
const trendData7d = trendData30d.slice(-7);
const trendDataToday = Array.from({ length: 12 }).map((_, i) => ({ name: `${i * 2}:00`, spend: 20 + Math.random() * 30, revenue: 40 + Math.random() * 80 }));

// Компонент KPI-карточки
function KPICard({ title, value, type, colorClass, strokeColor, data }: { title: string, value: string, type: 'line' | 'bar', colorClass: string, strokeColor: string, data: any[] }) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-default h-32">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{value}</div>
        </div>
      </div>
      <div className="h-10 w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <Line type="monotone" dataKey="v" stroke={strokeColor} strokeWidth={2} dot={false} isAnimationActive={true} animationDuration={1000} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <Bar dataKey="v" fill={strokeColor} radius={[2, 2, 0, 0]} isAnimationActive={true} animationDuration={1000} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Данные для таблицы креативов
const adPerformanceData = [
  { creative: "Video Ad 1", platform: "Facebook", spend: "$1,500", revenue: "$5,250", roas: "3.5x", action: "Scale Up" },
  { creative: "Image Ad A", platform: "Instagram", spend: "$800", revenue: "$2,000", roas: "2.5x", action: "Optimize" },
  { creative: "Image Ad B", platform: "Instagram", spend: "$800", revenue: "$2,000", roas: "2.5x", action: "Optimize" },
  { creative: "TikTok Trend 1", platform: "TikTok", spend: "$1,200", revenue: "$4,800", roas: "4.0x", action: "Scale Up" },
];

export default function MarketingPage() {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Выбор данных для главного графика
  const chartData = timeRange === '30d' ? trendData30d : timeRange === '7d' ? trendData7d : trendDataToday;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Шапка */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Marketing & Scaling Recommendations</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm px-4 py-2 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1E293B] transition-all shadow-sm">
            <Filter className="w-4 h-4" /> Filters <ChevronDown className="w-4 h-4 opacity-50" />
          </button>
        </div>
      </div>

      {/* Верхние KPI Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Ad Spend" value="$5,200" type="bar" colorClass="text-indigo-500" strokeColor="#6366F1" data={generateSparkline(50)} />
        <KPICard title="Total ROAS" value="3.5x" type="bar" colorClass="text-teal-500" strokeColor="#14B8A6" data={generateSparkline(40)} />
        <KPICard title="Conversion Rate" value="4.8%" type="line" colorClass="text-green-500" strokeColor="#10B981" data={generateSparkline(30)} />
        <KPICard title="Avg. CPC" value="$1.20" type="line" colorClass="text-slate-400" strokeColor="#94A3B8" data={generateSparkline(10)} />
      </div>

      {/* Средний блок: Стратегии, Таблица и Воронка */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Левая колонка (занимает 2 части) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Scaling Strategies */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Scaling Strategies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-green-200 dark:border-green-500/20 bg-green-50/50 dark:bg-green-500/5 hover:-translate-y-1 transition-transform cursor-pointer">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-500" />
                  Increase Budget on "Smartwatch X-9"
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Increase Budget on "Smartwatch X-9" (Lookalike Audiences).</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1E293B]/50 hover:-translate-y-1 transition-transform cursor-pointer">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <Video className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  Expand to TikTok Ads
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Expand to TikTok Ads for "Eco-friendly Bottle" to optimize scaling.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1E293B]/50 hover:-translate-y-1 transition-transform cursor-pointer">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                  <ShoppingCart className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  Optimize Retargeting
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Optimize retargeting for cart abandoners with analysis.</p>
              </div>
            </div>
          </div>

          {/* Ad Performance Table */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex-1 flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ad Performance & Optimization</h2>
              <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-slate-100 dark:bg-[#1E293B] rounded-lg text-slate-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5" /> Location <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#111C35] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                    <th className="p-4 font-semibold">Ad Creative</th>
                    <th className="p-4 font-semibold">Platform</th>
                    <th className="p-4 font-semibold">Spend</th>
                    <th className="p-4 font-semibold">Revenue</th>
                    <th className="p-4 font-semibold">ROAS</th>
                    <th className="p-4 font-semibold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {adPerformanceData.map((ad, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{ad.creative}</td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{ad.platform}</td>
                      <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{ad.spend}</td>
                      <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{ad.revenue}</td>
                      <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{ad.roas}</td>
                      <td className="p-4 text-center">
                        <button className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                          ad.action === 'Scale Up' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/20' 
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-500/20'
                        }`}>
                          {ad.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Правая колонка: Воронка */}
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Marketing Funnel Efficiency</h2>
            <button className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-slate-100 dark:bg-[#1E293B] rounded-md text-slate-600 dark:text-slate-300">
              Funnel Chart <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center px-2 pb-6 w-full gap-1.5">
             <div className="w-full h-12 bg-[#3B82F6] flex items-center justify-center text-sm font-bold text-white shadow-sm clip-funnel-1 hover:opacity-90 transition-opacity cursor-pointer">Impressions (59%)</div>
             <div className="w-[85%] h-12 bg-[#0EA5E9] flex items-center justify-center text-sm font-bold text-white shadow-sm clip-funnel-2 hover:opacity-90 transition-opacity cursor-pointer">Clicks (15%)</div>
             <div className="w-[65%] h-12 bg-[#10B981] flex items-center justify-center text-sm font-bold text-white shadow-sm clip-funnel-3 hover:opacity-90 transition-opacity cursor-pointer">Leads (15%)</div>
             <div className="w-[45%] h-12 bg-[#6366F1] flex items-center justify-center text-sm font-bold text-white shadow-sm clip-funnel-4 hover:opacity-90 transition-opacity cursor-pointer">Opportunities (3%)</div>
             <div className="w-[30%] h-12 bg-[#64748B] flex items-center justify-center text-sm font-bold text-white shadow-sm clip-funnel-5 hover:opacity-90 transition-opacity cursor-pointer">Sales (3%)</div>
          </div>
        </div>
      </div>

      {/* Нижний блок: Большой график (Ad Spend vs Revenue) */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Ad Spend vs. Revenue Trend</h2>
          
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

        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(value: any, name: any) => [`$${Number(value).toFixed(0)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
              />
              <Area type="monotone" dataKey="spend" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" activeDot={{ r: 6, strokeWidth: 0, fill: '#8B5CF6' }} />
              <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, strokeWidth: 0, fill: '#10B981' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}