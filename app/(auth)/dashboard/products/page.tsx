"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  ChevronDown, Calendar, Filter, ArrowRight, TrendingUp, TrendingDown, 
  Package, Watch, Smartphone, Monitor, ArrowUpDown, ArrowUp, ArrowDown, Check
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer } from 'recharts';

// Генерация случайных данных для графиков (имитация динамики)
const generateSparkline = (base: number, trend: 'up' | 'down') => 
  Array.from({ length: 10 }).map((_, i) => ({ 
    v: trend === 'up' ? base + (i * Math.random() * 10) : base - (i * Math.random() * 5) 
  }));

// Компонент KPI-карточки с анимацией
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

// Базовая база данных товаров
const baseProducts = [
  { id: 1, icon: Watch, name: "Smartwatch X-9", category: "Smartwatch", price: 30.00, target: 5.50, baseSales: 94, profitRate: 0.6, trend: "up" },
  { id: 2, icon: Monitor, name: "Office Chair Pro", category: "Office Chair", price: 45.00, target: 5.50, baseSales: 45, profitRate: 0.5, trend: "up" },
  { id: 3, icon: Package, name: "Eco-friendly Bottle", category: "Home", price: 25.00, target: 5.50, baseSales: 16, profitRate: 0.8, trend: "up" },
  { id: 4, icon: Monitor, name: "Home Office Ergo", category: "Office Chair", price: 25.00, target: 5.50, baseSales: 22, profitRate: 0.5, trend: "up" },
  { id: 5, icon: Smartphone, name: "Wireless Chargers", category: "Electronics", price: 25.00, target: 5.50, baseSales: 32, profitRate: 0.4, trend: "up" },
  { id: 6, icon: Smartphone, name: "Fast Charging Dock", category: "Electronics", price: 25.00, target: 5.50, baseSales: 24, profitRate: 0.3, trend: "down" },
  { id: 7, icon: Monitor, name: "Ergonomic Stand", category: "Office Chair", price: 25.00, target: 5.50, baseSales: 20, profitRate: 0.4, trend: "down" },
];

export default function ProductsPage() {
  const router = useRouter(); 
  const [timeRange, setTimeRange] = useState('7d');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Состояния для сортировки таблицы
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>(null);

  // Динамические множители для имитации изменения данных при переключении вкладок
  const timeMultiplier = timeRange === 'Today' ? 0.15 : timeRange === '7d' ? 1 : 4.2;

  // Динамические KPI в зависимости от периода
  const kpiData = {
    revenue: timeRange === 'Today' ? "$1,250" : timeRange === '7d' ? "$8,520" : "$35,780",
    avgPrice: timeRange === 'Today' ? "$42" : timeRange === '7d' ? "$45" : "$44",
    margin: timeRange === 'Today' ? "32%" : timeRange === '7d' ? "35%" : "36%",
    conversion: timeRange === 'Today' ? "3.8%" : timeRange === '7d' ? "4.2%" : "4.5%",
  };

  // Фильтрация, пересчет и сортировка данных таблицы
  const processedProducts = useMemo(() => {
    let result = baseProducts.map(p => ({
      ...p,
      sales: Math.round(p.baseSales * timeMultiplier),
      profit: (p.price * Math.round(p.baseSales * timeMultiplier) * p.profitRate).toFixed(2),
      chartData: generateSparkline(p.baseSales, p.trend as 'up' | 'down')
    }));

    // 1. Фильтрация по категории
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // 2. Сортировка
    if (sortConfig !== null) {
      result.sort((a: any, b: any) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Преобразуем строки с профитом в числа для правильной сортировки
        if (sortConfig.key === 'profit') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [timeRange, selectedCategory, sortConfig, timeMultiplier]);

  // Уникальные категории для фильтра
  const categories = ['All', ...Array.from(new Set(baseProducts.map(p => p.category)))];

  // Функция для смены сортировки при клике на заголовок колонки
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    }
    setSortConfig({ key, direction });
  };

  // Иконка сортировки для заголовков
  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-40 hover:opacity-100" />;
    return sortConfig.direction === 'asc' ? <ArrowUp className="w-3 h-3 ml-1 text-blue-500" /> : <ArrowDown className="w-3 h-3 ml-1 text-blue-500" />;
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Шапка с заголовком и фильтрами */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Products & Detailed Analytics</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          {/* Интерактивный Dropdown для категорий */}
          <div className="relative">
            <button 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className={`flex items-center gap-2 text-sm px-4 py-2 border rounded-xl transition-all shadow-sm ${selectedCategory !== 'All' ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400' : 'bg-white dark:bg-[#0F172A] border-slate-200 dark:border-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1E293B]'}`}
            >
              <Filter className="w-4 h-4" /> 
              {selectedCategory === 'All' ? 'All Categories' : selectedCategory} 
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>

            {isCategoryOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-between transition-colors"
                  >
                    {cat}
                    {selectedCategory === cat && <Check className="w-4 h-4 text-blue-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 text-sm px-4 py-2 bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800/60 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1E293B] transition-all shadow-sm">
            <Calendar className="w-4 h-4" /> Date Range <ChevronDown className="w-4 h-4 opacity-50" />
          </button>
        </div>
      </div>

      {/* Верхние KPI Карточки (Динамические) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Product Revenue" value={kpiData.revenue} type="bar" colorClass="text-blue-500" strokeColor="#3B82F6" data={generateSparkline(50, 'up')} />
        <KPICard title="Average Selling Price" value={kpiData.avgPrice} type="bar" colorClass="text-teal-500" strokeColor="#14B8A6" data={generateSparkline(40, 'up')} />
        <KPICard title="Profit Margin" value={kpiData.margin} type="line" colorClass="text-green-500" strokeColor="#10B981" data={generateSparkline(30, 'up')} />
        <KPICard title="Product Conversion Rate" value={kpiData.conversion} type="line" colorClass="text-blue-400" strokeColor="#60A5FA" data={generateSparkline(10, 'up')} />
      </div>

      {/* Основная сетка: Таблица и Сайдбар */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Левая колонка (Интерактивная Таблица) */}
        <div className="xl:col-span-2 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-[#0B1120]/30">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Detailed Product List</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Click on column headers to sort the data.</p>
            </div>
            
            {/* Вкладки переключения времени */}
            <div className="flex bg-slate-200/50 dark:bg-[#0B1120] rounded-xl p-1 shrink-0">
              {['Today', '7d', 'Custom'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setTimeRange(tab)}
                  className={`px-5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${timeRange === tab ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm scale-100' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:scale-105'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto relative min-h-[400px]">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white dark:bg-[#0F172A] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60 sticky top-0 z-10">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('category')}>
                    <div className="flex items-center">Category <SortIcon columnKey="category" /></div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('price')}>
                    <div className="flex items-center">Price <SortIcon columnKey="price" /></div>
                  </th>
                  <th className="p-4 font-semibold">Target CPL</th>
                  <th className="p-4 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('sales')}>
                    <div className="flex items-center">Sales <SortIcon columnKey="sales" /></div>
                  </th>
                  <th className="p-4 font-semibold cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors group" onClick={() => handleSort('profit')}>
                    <div className="flex items-center">Net Profit <SortIcon columnKey="profit" /></div>
                  </th>
                  <th className="p-4 font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {processedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">No products found in this category.</td>
                  </tr>
                ) : (
                  processedProducts.map((row) => (
                    <tr 
                      key={row.id} 
                      onClick={() => router.push('/dashboard/products/detail')}
                      className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors group cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#1E293B] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-all duration-300">
                            <row.icon className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                          </div>
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">{row.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="bg-slate-100 dark:bg-[#1E293B] px-2.5 py-1 rounded-md text-xs font-medium">{row.category}</span>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-700 dark:text-slate-300">${row.price.toFixed(2)}</td>
                      <td className="p-4 text-sm text-slate-500 dark:text-slate-400">${row.target.toFixed(2)}</td>
                      <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{row.sales}</td>
                      <td className="p-4 text-sm font-bold text-green-600 dark:text-green-400">${row.profit}</td>
                      <td className="p-4">
                        <div className="h-8 w-20">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={row.chartData}>
                              <Line type="monotone" dataKey="v" stroke={row.trend === 'up' ? '#10B981' : '#EF4444'} strokeWidth={2.5} dot={false} isAnimationActive={true} animationDuration={800} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Правая колонка (Рекомендации и Воронка) */}
        <div className="space-y-6">
          
          {/* Recommendations for Growth */}
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" /> Actionable Insights
            </h2>
            <div className="space-y-3">
              {[
                { title: "Boost Smartwatch Ads", desc: "Search volume is peaking. Increase budget by 15%.", color: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20" },
                { title: "Review Chair Pricing", desc: "Competitors lowered prices. Consider a $5 discount.", color: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20" },
                { title: "Clearance Sale", desc: "Liquidate Fast Charging Docks to free up capital.", color: "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20" },
              ].map((rec, i) => (
                <div key={i} className={`p-4 rounded-xl border ${rec.color} flex items-start gap-3 cursor-pointer hover:scale-[1.02] transition-transform`}>
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-white/60 dark:bg-[#1E293B]/60 backdrop-blur-sm shadow-sm flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">{rec.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{rec.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* Top 5 Best Sellers Funnel */}
          <div className="bg-white dark:bg-[#0F172A] p-5 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm">
             <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sales Funnel</h2>
               <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#1E293B] px-2.5 py-1 rounded-md">Last 30 Days</span>
             </div>
             <div className="flex flex-col items-center justify-center h-48 gap-1.5 w-full px-4 group">
                <div className="w-full h-8 bg-[#3B82F6] rounded-t-lg flex items-center justify-center text-xs font-bold text-white hover:scale-105 transition-transform cursor-pointer shadow-sm">Views (12,400)</div>
                <div className="w-5/6 h-8 bg-[#0EA5E9] flex items-center justify-center text-xs font-bold text-white hover:scale-105 transition-transform cursor-pointer shadow-sm">Clicks (15%)</div>
                <div className="w-4/6 h-8 bg-[#10B981] flex items-center justify-center text-xs font-bold text-white hover:scale-105 transition-transform cursor-pointer shadow-sm">Add to Cart (18%)</div>
                <div className="w-1/2 h-8 bg-[#6366F1] flex items-center justify-center text-xs font-bold text-white hover:scale-105 transition-transform cursor-pointer shadow-sm">Checkout (8%)</div>
                <div className="w-1/3 h-8 bg-[#8B5CF6] rounded-b-lg flex items-center justify-center text-xs font-bold text-white hover:scale-105 transition-transform cursor-pointer shadow-sm">Sales (3%)</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}