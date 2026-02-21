"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ChevronDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

// Генерация моковых данных
const generateSparkline = (base: number, trend: 'up' | 'down' | 'flat' = 'up') => 
  Array.from({ length: 10 }).map((_, i) => ({ 
    v: trend === 'up' ? base + (i * Math.random() * 5) : trend === 'down' ? base - (i * Math.random() * 5) : base + (Math.random() * 10 - 5) 
  }));

const trendData30d = Array.from({ length: 30 }).map((_, i) => ({
  name: `Day ${i + 1}`,
  price: 20 + Math.random() * 10 + (i * 0.5),
  sales: 100 + Math.random() * 50 + (i * 5),
}));
const trendData7d = trendData30d.slice(-7);
const trendDataToday = Array.from({ length: 12 }).map((_, i) => ({ name: `${i * 2}:00`, price: 25 + Math.random() * 2, sales: 10 + Math.random() * 20 }));

// Компонент KPI-карточки
function KPICard({ title, value, subtitle, type, colorClass, strokeColor, data }: { title: string, value: string, subtitle?: string, type: 'line' | 'bar', colorClass: string, strokeColor: string, data: any[] }) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-default h-32 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{value}</div>
            {subtitle && <div className="text-sm font-medium text-slate-400 mb-1">{subtitle}</div>}
          </div>
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

// Данные топ продуктов в нише
const topProductsData = [
  { name: "Ergonomic Office Chair", seller: "TechGadgets", rating: 4.9, price: "$150.00", sales: "800+", profit: "$5,200" },
  { name: "Adjustable Desk Stand", seller: "GlobalSuppliers", rating: 4.7, price: "$45.00", sales: "1200+", profit: "$2,800" },
  { name: "Wireless Ergonomic Mouse", seller: "EcoTech", rating: 4.8, price: "$25.00", sales: "1500+", profit: "$2,500" },
  { name: "Blue Light Glasses", seller: "Smart Gear", rating: 4.6, price: "$20.00", sales: "1000+", profit: "$2,000" },
];

export default function NicheDetailsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const chartData = timeRange === '30d' ? trendData30d : timeRange === '7d' ? trendData7d : trendDataToday;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Кнопка назад и Заголовок */}
      <div className="flex flex-col gap-3 mb-6">
        <Link 
          href="/dashboard/niches" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 w-fit transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Niches
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Niche Details & Sellers: Home Office Ergonomics</h1>
      </div>

      {/* Верхние KPI Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Niche Revenue" value="$12,500" type="bar" colorClass="text-indigo-500" strokeColor="#6366F1" data={generateSparkline(50, 'up')} />
        <KPICard title="Avg. Profit Margin (Niche)" value="45%" type="bar" colorClass="text-teal-500" strokeColor="#14B8A6" data={generateSparkline(40, 'up')} />
        <KPICard title="Competition Score" value="90" subtitle="(High)" type="bar" colorClass="text-yellow-500" strokeColor="#EAB308" data={generateSparkline(80, 'flat')} />
        <KPICard title="Avg. Order Value" value="$28.00" type="line" colorClass="text-green-500" strokeColor="#10B981" data={generateSparkline(20, 'up')} />
      </div>

      {/* Таблица Top Products */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-[#0B1120]/30">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Top Products in Niche & Sellers</h2>
        </div>
        
        <div className="overflow-x-auto relative">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white dark:bg-[#0F172A] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">Best Seller (Vendor)</th>
                <th className="p-4 font-semibold">Seller Rating</th>
                <th className="p-4 font-semibold">Avg. Price</th>
                <th className="p-4 font-semibold">Total Sales</th>
                <th className="p-4 font-semibold">Net Profit</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {topProductsData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors group">
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{row.name}</td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{row.seller}</td>
                  <td className="p-4 text-sm font-bold text-orange-400">{row.rating}</td>
                  <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{row.price}</td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{row.sales}</td>
                  <td className="p-4 text-sm font-bold text-green-600 dark:text-green-400">{row.profit}</td>
                  <td className="p-4 text-right">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                      View Seller
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Нижняя секция (График + Воронка) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* График */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Niche Price History & Sales Trend (Last 30 Days)</h2>
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
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 6, strokeWidth: 0, fill: '#8B5CF6' }} />
                <Area type="monotone" dataKey="price" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0EA5E9' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Воронка */}
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-8">Seller Market Share in Niche</h2>
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-1.5">
             <div className="w-[90%] h-12 bg-[#0EA5E9] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-1">59%</div>
             <div className="w-[70%] h-12 bg-[#10B981] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-2">16%</div>
             <div className="w-[45%] h-12 bg-[#6366F1] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-3">3%</div>
             <div className="w-[30%] h-12 bg-[#64748B] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-4">3%</div>
          </div>
        </div>
      </div>

    </div>
  );
}