"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Star, ShieldCheck, Mail, MapPin, Calendar, 
  Watch, Package, TrendingUp, AlertCircle, ShoppingBag, 
  ThumbsUp, Truck, RotateCcw
} from "lucide-react";

// Моковые данные для товаров продавца
const sellerProducts = [
  { id: 1, name: "Smartwatch X-9", price: "$12.00", rating: 4.9, icon: Watch },
  { id: 2, name: "Eco-friendly Bottle", price: "$23.00", rating: 4.7, icon: Package },
  { id: 3, name: "Eco-friendly Bottle", price: "$31.00", rating: 4.8, icon: Package },
  { id: 4, name: "Eco-friendly Bottle", price: "$11.00", rating: 4.6, icon: Package },
  { id: 5, name: "Smartwatch X-9", price: "$12.00", rating: 4.9, icon: Watch },
  { id: 6, name: "Eco-friendly Bottle", price: "$12.00", rating: 4.7, icon: Package },
  { id: 7, name: "Eco-friendly Bottle", price: "$50.00", rating: 4.8, icon: Package },
  { id: 8, name: "Smartwatch X-9", price: "$15.00", rating: 4.9, icon: Watch },
];

// Моковые отзывы
const reviews = [
  { id: 1, user: "Alex B.", date: "Jan 2021", rating: 5, text: "Very strong communication and fast shipping. Highly recommended!" },
  { id: 2, user: "UserName", date: "Oct 2022", rating: 4, text: "Leading supplier of home & garden. Quality is good." },
  { id: 3, user: "ComW8718", date: "Nov 2022", rating: 5, text: "Negotiated bulk pricing easily. Very satisfied with the electronics." },
  { id: 4, user: "James G.", date: "Nov 2023", rating: 4, text: "The products are exactly as described. Will order again soon." },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star 
        key={star} 
        className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "fill-orange-400 text-orange-400" : "fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700"}`} 
      />
    ))}
  </div>
);

export default function SellerDetailsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Performance', 'Products', 'Reviews'];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Кнопка назад */}
      <div className="flex flex-col gap-3 mb-2">
        <Link 
          href="/dashboard/sellers" 
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 w-fit transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Sellers
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Seller Details: GlobalSuppliers</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Левая часть (Профиль, Табы и Контент) - занимает 3 колонки */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Шапка Профиля */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
              
              {/* Аватарка */}
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 border-4 border-white dark:border-[#1E293B] shadow-md flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">GS</span>
              </div>
              
              {/* Инфо */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">GlobalSuppliers</h2>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Seller
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span className="font-bold text-slate-900 dark:text-white">4.8/5 Rating</span>
                  <span className="text-slate-500 dark:text-slate-400">(1,250 Reviews)</span>
                </div>
              </div>
              
              {/* Кнопка контакта */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm w-full md:w-auto justify-center">
                <Mail className="w-4 h-4" /> Contact Seller
              </button>
            </div>

            {/* Вкладки (Tabs) */}
            <div className="flex items-center px-6 border-t border-slate-200 dark:border-slate-800/60 overflow-x-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab 
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Контент активной вкладки (Overview) */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Колонка 1: Базовая информация */}
              <div className="md:col-span-1 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 h-fit">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Overview</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 mb-1">Member since:</span>
                    <span className="font-medium text-slate-900 dark:text-white flex items-center gap-2"><Calendar className="w-4 h-4 text-slate-400" /> Jan 2021</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 mb-1">Location:</span>
                    <span className="font-medium text-slate-900 dark:text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-slate-400" /> Shenzhen, China</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 dark:text-slate-400 mb-1">Description:</span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      Leading supplier of home & garden and electronics, committed to quality and fast shipping.
                    </p>
                  </div>
                </div>
              </div>

              {/* Колонка 2: Performance и Товары */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Метрики Performance */}
                <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Performance</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-slate-50 dark:bg-[#111C35]/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Avg. Shipping</div>
                      <div className="font-bold text-slate-900 dark:text-white">5-10 days</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#111C35]/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Return Rate</div>
                      <div className="font-bold text-slate-900 dark:text-white">1.2%</div>
                    </div>
                    <div className="bg-slate-50 dark:bg-[#111C35]/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800/50">
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" /> Fulfilled</div>
                      <div className="font-bold text-slate-900 dark:text-white">50,000+</div>
                    </div>
                  </div>
                </div>

                {/* Сетка товаров */}
                <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Products</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {sellerProducts.map((prod, i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="aspect-square bg-slate-100 dark:bg-[#1E293B] rounded-xl mb-2 flex items-center justify-center border border-slate-200 dark:border-slate-700/50 group-hover:border-blue-400 transition-colors overflow-hidden">
                          <prod.icon className="w-12 h-12 text-slate-300 dark:text-slate-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-blue-500">{prod.name}</div>
                        <StarRating rating={prod.rating} />
                        <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{prod.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Колонка 3: Отзывы */}
              <div className="md:col-span-1 bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 h-fit max-h-[700px] overflow-y-auto custom-scrollbar">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-slate-100 dark:border-slate-800/60 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <StarRating rating={review.rating} />
                        <span className="text-[10px] text-slate-400">{review.date}</span>
                      </div>
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{review.user}</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic line-clamp-3">"{review.text}"</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Заглушка для остальных вкладок */}
          {activeTab !== 'Overview' && (
            <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-12 text-center">
              <Package className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">{activeTab} Details</h3>
              <p className="text-sm text-slate-500 mt-2">More insights and analytics will appear here.</p>
            </div>
          )}
        </div>

        {/* Правая часть (Seller Insights Summary) - занимает 1 колонку */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-5 sticky top-24">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Seller Insights Summary</h2>
            
            <div className="space-y-4">
              {/* Insight 1 */}
              <div className="p-4 rounded-xl border bg-orange-50/50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-orange-500" /> Top Product
                </h3>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-6">Smartwatch X-9 (High Margin)</p>
              </div>

              {/* Insight 2 */}
              <div className="p-4 rounded-xl border bg-emerald-50/50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Niche Strength
                </h3>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-6">Home & Garden (High Demand)</p>
              </div>

              {/* Insight 3 */}
              <div className="p-4 rounded-xl border bg-blue-50/50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-blue-500" /> Recommendation
                </h3>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-6">Negotiate bulk pricing for electronics.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}