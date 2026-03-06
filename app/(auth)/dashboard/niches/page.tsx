"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ArrowRight, Flame, Target, DollarSign, MapPin, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';
import { useRouter } from "next/navigation";

// Генерация случайных данных для графиков
const generateSparkline = (base: number, volatility: number = 10) => 
  Array.from({ length: 10 }).map((_, i) => ({ v: base + (Math.random() * volatility - volatility / 2) }));

const trendData30d = Array.from({ length: 30 }).map((_, i) => ({
  name: `Day ${i + 1}`,
  revenue1: 100 + Math.random() * 300 + (i * 15),
  revenue2: 80 + Math.random() * 200 + (i * 10),
}));
const trendData7d = trendData30d.slice(-7);
const trendDataToday = Array.from({ length: 12 }).map((_, i) => ({ name: `${i * 2}:00`, revenue1: 20 + Math.random() * 40, revenue2: 15 + Math.random() * 30 }));

// Компонент KPI-карточки
function KPICard({ title, value, type, colorClass, strokeColor, data }: { title: string, value: string, type: 'line' | 'bar', colorClass: string, strokeColor: string, data: any[] }) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-default h-32 hover:-translate-y-1">
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

// Данные для таблицы ниш
const baseNichesData = [
  { id: 1, name: "Home Office Ergonomics", category: "Ergonomics", revenue: 12500, profit: 12500, growth: "+15%", orderValue: 25.00, compScore: 90 },
  { id: 2, name: "Sustainable Pet Products", category: "Sustainable", revenue: 12000, profit: 11500, growth: "+45%", orderValue: 13.00, compScore: 75 },
  { id: 3, name: "Smart Fitness Gear", category: "Smart Fitness", revenue: 10000, profit: 10000, growth: "+15%", orderValue: 22.00, compScore: 66 },
  { id: 4, name: "Home Office Ergonomics", category: "Category", revenue: 5500, profit: 5900, growth: "+15%", orderValue: 15.00, compScore: 72 },
  { id: 5, name: "Smart Fitness Gear", category: "Sustainable", revenue: 5000, profit: 7000, growth: "+80%", orderValue: 18.00, compScore: 75 },
  { id: 6, name: "Smart Fitness", category: "Smart Fitness", revenue: 4000, profit: 5500, growth: "+15%", orderValue: 28.00, compScore: 70 },
  { id: 7, name: "Premium Audio", category: "Instagram", revenue: 3500, profit: 2000, growth: "+30%", orderValue: 12.00, compScore: 88 },
  { id: 8, name: "Sustainable Pet Products", category: "Category", revenue: 3500, profit: 1500, growth: "+15%", orderValue: 16.00, compScore: 70 },
  { id: 9, name: "Smart Fitness Gear", category: "Category", revenue: 3000, profit: 2000, growth: "+15%", orderValue: 13.00, compScore: 60 },
];

export default function NichesPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('30d');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  // Сортировка таблицы
  const sortedNiches = useMemo(() => {
    let sortableData = [...baseNichesData];
    if (sortConfig !== null) {
      sortableData.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig]);

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40 hover:opacity-100" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 ml-1 text-blue-500" /> : <ArrowDown className="w-3 h-3 ml-1 text-blue-500" />;
  };

  const chartData = timeRange === '30d' ? trendData30d : timeRange === '7d' ? trendData7d : trendDataToday;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Шапка */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Niche Analysis & Recommendations</h1>
      </div>

      {/* Верхние KPI Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Top Niche Revenue" value="$12,500" type="bar" colorClass="text-indigo-500" strokeColor="#6366F1" data={generateSparkline(50, 20)} />
        <KPICard title="Avg. Profit Margin (Niche)" value="42%" type="bar" colorClass="text-teal-500" strokeColor="#14B8A6" data={generateSparkline(40, 15)} />
        <KPICard title="Market Growth Rate" value="+15%" type="line" colorClass="text-green-500" strokeColor="#10B981" data={generateSparkline(30, 10)} />
        <KPICard title="Competition Level" value="Medium" type="bar" colorClass="text-yellow-500" strokeColor="#EAB308" data={generateSparkline(10, 5)} />
      </div>

      {/* Основная сетка: Таблица и Рекомендации */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Левая колонка (Таблица) */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Detailed Niche Analysis</h2>
            <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-slate-100 dark:bg-[#1E293B] rounded-lg text-slate-600 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5" /> Location <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#111C35] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Niche Name <SortIcon columnKey="name" /></div>
                  </th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('revenue')}>
                    <div className="flex items-center">Total Revenue <SortIcon columnKey="revenue" /></div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('profit')}>
                    <div className="flex items-center">Net Profit <SortIcon columnKey="profit" /></div>
                  </th>
                  <th className="p-4 font-semibold">Growth</th>
                  <th className="p-4 font-semibold">Avg. Order Value</th>
                  <th className="p-4 font-semibold text-center cursor-pointer group" onClick={() => handleSort('compScore')}>
                    <div className="flex items-center justify-center">Competition Score <SortIcon columnKey="compScore" /></div>
                  </th>
                  <th className="p-4 font-semibold">Trend Graph</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {sortedNiches.map((niche) => (
                  <tr 
                    key={niche.id} 
                    onClick={() => router.push('/dashboard/niches/detail')} 
                    className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{niche.name}</td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{niche.category}</td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">${niche.revenue.toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">${niche.profit.toLocaleString()}</td>
                    <td className="p-4 text-sm font-medium text-green-500">{niche.growth}</td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">${niche.orderValue.toFixed(2)}</td>
                    <td className="p-4 text-center text-sm font-bold text-red-500">{niche.compScore}</td>
                    <td className="p-4">
                      <div className="h-8 w-16">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateSparkline(niche.revenue, 20)}>
                            <Line type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} dot={false} isAnimationActive={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка (Рекомендации и Доля рынка) */}
        <div className="space-y-6">
          
          {/* Niche Recommendations */}
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Niche Recommendations & Trends</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-[#1E293B]/30 border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform cursor-pointer">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Trending Niche: "Sustainable Living" (High Growth)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Trending niche is "Sustainable Living" (High Growth) to enhance sustainable and well-being products.</p>
              </div>
              <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-[#1E293B]/30 border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform cursor-pointer">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-green-500" />
                  Undersaturated Niche: "Portable Power" (Low Competition)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Undersaturated Niche: "Portable Power" (Low Competition) to explore market with high demand.</p>
              </div>
              <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-[#1E293B]/30 border-slate-200 dark:border-slate-700 hover:-translate-y-1 transition-transform cursor-pointer">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  High Profit Niche: "Premium Audio" (High Margin)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">High-Profit Niche: "Premium Audio" (High Margin) competition to optimize items targeting core audience.</p>
              </div>
            </div>
          </div>

          {/* Niche Market Share (Воронка) */}
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm flex flex-col h-64">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Niche Market Share</h2>
             </div>
             <div className="flex-1 flex flex-col items-center justify-center w-full gap-1">
                <div className="w-[90%] h-10 bg-[#0EA5E9] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-1">59%</div>
                <div className="w-[70%] h-10 bg-[#10B981] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-2">15%</div>
                <div className="w-[50%] h-10 bg-[#6366F1] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-3">3%</div>
             </div>
          </div>
        </div>
      </div>

      {/* Нижний блок: Большой график (Niche Revenue Trend) */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Niche Revenue Trend (Last 30 Days)</h2>
          
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

        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRev2" x1="0" y1="0" x2="0" y2="1">
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
                formatter={(value: any) => [`$${Number(value).toFixed(0)}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue2" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorRev2)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0EA5E9' }} />
              <Area type="monotone" dataKey="revenue1" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev1)" activeDot={{ r: 6, strokeWidth: 0, fill: '#8B5CF6' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}