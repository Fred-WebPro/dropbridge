"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronDown, ArrowRight, Star, Package, TrendingUp, ShieldCheck, 
  ArrowUpDown, ArrowUp, ArrowDown 
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar } from 'recharts';

// Генерация моковых данных для мини-графиков
const generateSparkline = (base: number, trend: 'up' | 'down' | 'flat' = 'up') => 
  Array.from({ length: 10 }).map((_, i) => ({ 
    v: trend === 'up' ? base + (i * Math.random() * 5) : trend === 'down' ? base - (i * Math.random() * 5) : base + (Math.random() * 10 - 5) 
  }));

const trendData30d = Array.from({ length: 30 }).map((_, i) => ({
  name: `Day ${i + 1}`,
  sellers1: 100 + Math.random() * 200 + (i * 10),
  sellers2: 80 + Math.random() * 150 + (i * 8),
}));
const trendData7d = trendData30d.slice(-7);
const trendDataToday = Array.from({ length: 12 }).map((_, i) => ({ name: `${i * 2}:00`, sellers1: 20 + Math.random() * 30, sellers2: 15 + Math.random() * 20 }));

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

// Данные таблицы продавцов
const baseSellersData = [
  { id: 1, name: "TechGadgets", niche: "Electronics", products: 500, rating: 4.9, revenue: 25000, fulfillment: "5-10 days" },
  { id: 2, name: "GlobalSuppliers", niche: "Home & Garden", products: 1200, rating: 4.7, revenue: 18000, fulfillment: "7-14 days" },
  { id: 3, name: "EcoTech", niche: "Sustainable Goods", products: 300, rating: 4.8, revenue: 12000, fulfillment: "3-7 days" },
  { id: 4, name: "Smart Gear", niche: "Fitness", products: 800, rating: 4.6, revenue: 9000, fulfillment: "5-10 days" },
];

export default function SellersPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('30d');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  // Сортировка таблицы
  const sortedSellers = useMemo(() => {
    let sortableData = [...baseSellersData];
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
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Шапка */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Seller Analysis & Recommendations</h1>
      </div>

      {/* Верхние KPI Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Active Sellers" value="1,250" type="bar" colorClass="text-indigo-500" strokeColor="#6366F1" data={generateSparkline(50, 'up')} />
        <KPICard title="Avg. Seller Rating" value="4.7/5" type="bar" colorClass="text-teal-500" strokeColor="#14B8A6" data={generateSparkline(40, 'flat')} />
        <KPICard title="Total Products Sourced" value="15,000+" type="bar" colorClass="text-yellow-500" strokeColor="#EAB308" data={generateSparkline(80, 'up')} />
        <KPICard title="Top Seller Revenue (30d)" value="$50,000" type="line" colorClass="text-green-500" strokeColor="#10B981" data={generateSparkline(30, 'up')} />
      </div>

      {/* Основная сетка: Таблица и Рекомендации */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Левая колонка (Таблица) */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-[#0B1120]/30">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Detailed Seller List</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white dark:bg-[#0F172A] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('name')}>
                    <div className="flex items-center">Seller Name <SortIcon columnKey="name" /></div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('niche')}>
                    <div className="flex items-center">Niche Focus <SortIcon columnKey="niche" /></div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('products')}>
                    <div className="flex items-center">Total Products <SortIcon columnKey="products" /></div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('rating')}>
                    <div className="flex items-center">Avg. Rating <SortIcon columnKey="rating" /></div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('revenue')}>
                    <div className="flex items-center">Total Revenue (Last 30d) <SortIcon columnKey="revenue" /></div>
                  </th>
                  <th className="p-4 font-semibold">Fulfillment Time</th>
                  <th className="p-4 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {sortedSellers.map((seller) => (
                  <tr 
                    key={seller.id} 
                    onClick={() => router.push('/dashboard/sellers/detail')} 
                    className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{seller.name}</td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{seller.niche}</td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">{seller.products}+</td>
                    <td className="p-4 text-sm font-bold text-orange-400">{seller.rating}</td>
                    <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">${seller.revenue.toLocaleString()}</td>
                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{seller.fulfillment}</td>
                    <td className="p-4 text-right">
                      <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка (Рекомендации) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Seller Recommendations</h2>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border bg-indigo-50/50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 hover:-translate-y-1 transition-transform cursor-pointer flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-indigo-500" />
                    Reliable & Fast Shipping:
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 ml-6">'EcoTech' (3-7 days)</p>
                </div>
                <div className="h-6 w-10">
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={generateSparkline(10, 'up')}><Bar dataKey="v" fill="#6366F1" /></BarChart></ResponsiveContainer>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-yellow-50/50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/30 hover:-translate-y-1 transition-transform cursor-pointer flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-yellow-500" />
                    High-Margin Products:
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 ml-6">'TechGadgets' (Electronics)</p>
                </div>
                <div className="h-6 w-10">
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={generateSparkline(10, 'up')}><Bar dataKey="v" fill="#EAB308" /></BarChart></ResponsiveContainer>
                </div>
              </div>

              <div className="p-4 rounded-xl border bg-teal-50/50 dark:bg-teal-500/10 border-teal-200 dark:border-teal-500/30 hover:-translate-y-1 transition-transform cursor-pointer flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-teal-500" />
                    Wide Variety:
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 ml-6">'GlobalSuppliers' (Home & Garden)</p>
                </div>
                <div className="h-6 w-10">
                  <ResponsiveContainer width="100%" height="100%"><BarChart data={generateSparkline(10, 'up')}><Bar dataKey="v" fill="#14B8A6" /></BarChart></ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Нижний блок: График и Воронка */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* График */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Seller Growth Trend (New Sellers)</h2>
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
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSeller2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSeller1" x1="0" y1="0" x2="0" y2="1">
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
                  formatter={(value: number) => [`$${value.toFixed(0)}`, 'Growth']}
                />
                <Area type="monotone" dataKey="sellers2" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorSeller2)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0EA5E9' }} />
                <Area type="monotone" dataKey="sellers1" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorSeller1)" activeDot={{ r: 6, strokeWidth: 0, fill: '#8B5CF6' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Воронка */}
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 flex flex-col">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-8">Seller Performance Funnel</h2>
          <div className="flex-1 flex flex-col items-center justify-center w-full gap-1.5">
             <div className="w-[90%] h-10 bg-[#0EA5E9] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-1">59%</div>
             <div className="w-[70%] h-10 bg-[#10B981] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-2">16%</div>
             <div className="w-[50%] h-10 bg-[#6366F1] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-3">10%</div>
             <div className="w-[35%] h-10 bg-[#64748B] flex items-center justify-center text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer clip-funnel-4">3%</div>
          </div>
        </div>
      </div>

    </div>
  );
}