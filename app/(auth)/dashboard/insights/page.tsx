"use client";

import { useState, useMemo } from "react";
import { 
  ChevronDown, ArrowUpRight, ArrowUpDown, ArrowUp, ArrowDown, 
  Lightbulb, Zap, Globe, AlertTriangle
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

// Генерация моковых данных
const generateSparkline = (base: number, trend: 'up' | 'down' | 'flat' = 'up') => 
  Array.from({ length: 10 }).map((_, i) => ({ 
    v: trend === 'up' ? base + (i * Math.random() * 5) : trend === 'down' ? base - (i * Math.random() * 5) : base + (Math.random() * 10 - 5) 
  }));

const trendData30d = Array.from({ length: 30 }).map((_, i) => ({
  name: `Day ${i + 1}`,
  value: 100 + Math.random() * 300 + (i * 20),
}));
const trendData7d = trendData30d.slice(-7);
const trendDataToday = Array.from({ length: 12 }).map((_, i) => ({ name: `${i * 2}:00`, value: 20 + Math.random() * 50 }));

// Данные для круговой диаграммы (Pie Chart)
const pieData = [
  { name: 'Electronics', value: 45 },
  { name: 'Fashion', value: 25 },
  { name: 'Home & Garden', value: 20 },
  { name: 'Health & Beauty', value: 10 },
];
const PIE_COLORS = ['#3B82F6', '#10B981', '#EAB308', '#6366F1'];

// Компонент KPI-карточки
function KPICard({ title, value, type, colorClass, strokeColor, data, isTextValue = false }: { title: string, value: string, type: 'line' | 'bar', colorClass: string, strokeColor: string, data: any[], isTextValue?: boolean }) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-default h-32 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-2">
        <div className="w-full">
          <div className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">{title}</div>
          <div className={`${isTextValue ? 'text-lg' : 'text-2xl'} font-bold text-slate-900 dark:text-white group-hover:${colorClass.replace('text-', 'text-')} transition-colors truncate`}>
            {value}
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

// Данные таблицы инсайтов
const insightsData = [
  { id: 1, trend: "Rise of Sustainable Goods", category: "Eco-Friendly", score: 90, scoreLabel: "High", details: "Consumers willing to pay premium for sustainable products.", action: "Explore Niche" },
  { id: 2, trend: "Supply Chain Volatility", category: "Logistics", score: 75, scoreLabel: "Medium", details: "Potential delays from key Asian manufacturing hubs.", action: "Diversify Suppliers" },
  { id: 3, trend: "Growth of Social Commerce", category: "Marketing", score: 85, scoreLabel: "High", details: "Direct purchasing through social media platforms is increasing.", action: "Optimize Ads" },
  { id: 4, trend: "AI in Customer Service", category: "Technology", score: 70, scoreLabel: "Medium", details: "AI chatbots are improving customer experience and reducing costs.", action: "Adopt AI Tools" },
];

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  const chartData = timeRange === '30d' ? trendData30d : timeRange === '7d' ? trendData7d : trendDataToday;

  // Сортировка таблицы
  const sortedInsights = useMemo(() => {
    let sortableData = [...insightsData];
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
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40 hover:opacity-100 transition-opacity" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 ml-1 text-blue-500" /> : <ArrowDown className="w-3 h-3 ml-1 text-blue-500" />;
  };

  // Функция для цвета бейджа Score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-600 bg-red-50 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20";
    if (score >= 70) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/20";
    return "text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20";
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Шапка */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Strategic Market Insights & Trends</h1>
      </div>

      {/* Верхние KPI Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Market Revenue (Industry)" value="$1.2T" type="bar" colorClass="text-indigo-500" strokeColor="#6366F1" data={generateSparkline(50, 'up')} />
        <KPICard title="Avg. Profit Margin (Industry)" value="38%" type="bar" colorClass="text-teal-500" strokeColor="#14B8A6" data={generateSparkline(40, 'up')} />
        <KPICard title="Global Market Growth (YoY)" value="+18%" type="bar" colorClass="text-yellow-500" strokeColor="#EAB308" data={generateSparkline(80, 'up')} />
        <KPICard title="Top Emerging Trend" value="AI Personalization" isTextValue={true} type="line" colorClass="text-blue-500" strokeColor="#3B82F6" data={generateSparkline(30, 'up')} />
      </div>

      {/* Основная сетка: Левая часть (Таблица + График) и Правая часть (Рекомендации + Пирог) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Левая колонка */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Таблица Инсайтов */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex-1">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0B1120]/30">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Deep Market & Competitive Insights</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-white dark:bg-[#0F172A] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                    <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('trend')}>
                      <div className="flex items-center">Trend/Threat <SortIcon columnKey="trend" /></div>
                    </th>
                    <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('category')}>
                      <div className="flex items-center">Category <SortIcon columnKey="category" /></div>
                    </th>
                    <th className="p-4 font-semibold cursor-pointer group" onClick={() => handleSort('score')}>
                      <div className="flex items-center">Impact Score <SortIcon columnKey="score" /></div>
                    </th>
                    <th className="p-4 font-semibold">Details</th>
                    <th className="p-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {sortedInsights.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors group">
                      <td className="p-4 text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">{row.trend}</td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{row.category}</td>
                      <td className="p-4">
                        <span className={`inline-flex text-xs font-bold px-2.5 py-1 rounded-md border ${getScoreColor(row.score)}`}>
                          {row.score} ({row.scoreLabel})
                        </span>
                      </td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate" title={row.details}>
                        {row.details}
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors hover:underline">
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* График Global Growth Trend */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Global E-commerce Growth Trend</h2>
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
                    <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} tickFormatter={(val) => `$${val}`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: any) => [`$${Number(value).toFixed(0)}`, 'Growth Volume']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorGrowth)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0EA5E9' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Правая колонка */}
        <div className="flex flex-col gap-6">
          
          {/* Strategic Growth Recommendations */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Strategic Growth Recommendations</h2>
            <div className="space-y-3">
              
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1E293B]/50 hover:-translate-y-1 transition-transform cursor-pointer group">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1 group-hover:text-blue-500 transition-colors">
                  <Lightbulb className="w-4 h-4 text-blue-500" /> Expand into "Smart Home" Niche
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">High demand for connected devices (Impact: High)</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1E293B]/50 hover:-translate-y-1 transition-transform cursor-pointer group">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1 group-hover:text-blue-500 transition-colors">
                  <Zap className="w-4 h-4 text-yellow-500" /> Adopt AI-Powered Ad Optimization
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Improve ROAS with machine learning (Impact: High)</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1E293B]/50 hover:-translate-y-1 transition-transform cursor-pointer group">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1 group-hover:text-blue-500 transition-colors">
                  <Globe className="w-4 h-4 text-emerald-500" /> Explore New Supplier Markets
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">Diversify sourcing to Vietnam/India (Impact: Medium)</p>
              </div>

            </div>
          </div>

          {/* Future Market Share (Pie Chart) */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 flex-1 flex flex-col">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Future Market Share by Category</h2>
            <div className="flex-1 min-h-[250px] relative w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#fff', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#fff', fontWeight: 600 }}
                    formatter={(value: any) => [`${value}%`, 'Market Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Легенда под графиком */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}></div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}