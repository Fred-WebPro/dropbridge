"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ExternalLink, Watch } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Моковые данные для графика
const priceHistoryData = [
  { name: 'Jan', value: 50 }, { name: 'Feb', value: 52 }, { name: 'Mar', value: 48 },
  { name: 'Apr', value: 45 }, { name: 'May', value: 45 }, { name: 'Jun', value: 42 },
  { name: 'Jul', value: 40 }, { name: 'Aug', value: 45 }, { name: 'Sep', value: 48 },
  { name: 'Oct', value: 55 }, { name: 'Nov', value: 50 }, { name: 'Dec', value: 45 },
];

const salesTrendData = [
  { name: 'Jan', value: 120 }, { name: 'Feb', value: 150 }, { name: 'Mar', value: 180 },
  { name: 'Apr', value: 220 }, { name: 'May', value: 250 }, { name: 'Jun', value: 300 },
  { name: 'Jul', value: 280 }, { name: 'Aug', value: 320 }, { name: 'Sep', value: 400 },
  { name: 'Oct', value: 450 }, { name: 'Nov', value: 500 }, { name: 'Dec', value: 600 },
];

// Данные поставщиков
const sellersData = [
  { name: "TechGadgets", rating: 4.9, stock: "500+", price: "$22.50", shipping: "5-10 days" },
  { name: "GlobalSuppliers", rating: 4.7, stock: "500+", price: "$21.80", shipping: "5-10 days" },
  { name: "GlobalSuppliers", rating: 4.7, stock: "1200+", price: "$21.00", shipping: "7-14 days" },
  { name: "EcoTech", rating: 4.8, stock: "300+", price: "$23.00", shipping: "3-7 days" },
  { name: "GlobalSuppliers", rating: 4.8, stock: "200+", price: "$23.00", shipping: "5-10 days" },
];

// Компонент для отрисовки звезд рейтинга
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 mr-1">{rating}</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star} 
          className={`w-4 h-4 ${star <= Math.round(rating) ? "fill-orange-400 text-orange-400" : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"}`} 
        />
      ))}
    </div>
  );
};

export default function ProductDetailsPage() {
  const [activeChart, setActiveChart] = useState<'price' | 'sales'>('price');
  const chartData = activeChart === 'price' ? priceHistoryData : salesTrendData;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Кнопка назад и Заголовок */}
      <div className="flex flex-col gap-3 mb-6">
        <Link 
          href="/dashboard/products" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 w-fit transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Smartwatch X-9 - Product Details & Sellers</h1>
      </div>

      {/* Верхний блок: Картинка + KPI + Описание */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Изображение товара (Заглушка) */}
        <div className="w-full lg:w-64 h-64 bg-slate-50 dark:bg-[#1E293B] rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0 shadow-inner overflow-hidden relative group cursor-pointer">
          {/* В будущем здесь будет тег <img src="..." /> */}
          <Watch className="w-24 h-24 text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Данные товара */}
        <div className="flex-1 flex flex-col">
          {/* Сетка KPI */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-slate-50 dark:bg-[#111C35]/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Suggested Price</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">$45.00</div>
            </div>
            <div className="bg-slate-50 dark:bg-[#111C35]/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Target CPL</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">$5.50</div>
            </div>
            <div className="bg-slate-50 dark:bg-[#111C35]/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Total Sales</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">94</div>
            </div>
            <div className="bg-slate-50 dark:bg-[#111C35]/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Net Profit</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">$3,800</div>
            </div>
            <div className="bg-slate-50 dark:bg-[#111C35]/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Profit Margin</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">33%</div>
            </div>
          </div>

          {/* Описание */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Description</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-[#111C35]/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
              Advanced fitness tracking, heart rate monitor, long battery life, water-resistant. Connects seamlessly with both iOS and Android devices. Features a bright OLED display and customizable watch faces.
            </p>
          </div>
        </div>
      </div>

      {/* Средний блок: Таблица поставщиков */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800/60">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sellers & Suppliers</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Select suppliers based on rating, stock, and shipping times.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#111C35] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                <th className="p-4 font-semibold">Seller Name</th>
                <th className="p-4 font-semibold">Rating</th>
                <th className="p-4 font-semibold">Stock</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold">Shipping Time</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {sellersData.map((seller, i) => (
                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors group">
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{seller.name}</td>
                  <td className="p-4"><StarRating rating={seller.rating} /></td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{seller.stock}</td>
                  <td className="p-4 text-sm font-bold text-slate-900 dark:text-white">{seller.price}</td>
                  <td className="p-4 text-sm text-slate-500 dark:text-slate-400">{seller.shipping}</td>
                  <td className="p-4 text-right">
                    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
                      View Supplier <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Нижний блок: График Price History & Sales Trend */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Price History & Sales Trend</h2>
          
          {/* Переключатель графика */}
          <div className="flex bg-slate-100 dark:bg-[#0B1120] rounded-lg p-1">
            <button 
              onClick={() => setActiveChart('price')}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeChart === 'price' ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              Price History
            </button>
            <button 
              onClick={() => setActiveChart('sales')}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeChart === 'sales' ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              Sales Trend
            </button>
          </div>
        </div>

        {/* Интерактивный график */}
        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#64748B'}} 
                tickFormatter={(val) => activeChart === 'price' ? `$${val}` : val} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value) => [activeChart === 'price' ? `$${value}` : value, activeChart === 'price' ? 'Price' : 'Sales']}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#10B981' }} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}