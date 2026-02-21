"use client";

import { useState } from "react";
import { 
  Building, Users, CreditCard, Key, Plus, MoreHorizontal, 
  Check, Copy, ExternalLink, Download, Shield, Zap, 
  Puzzle, ShoppingCart, Globe, Megaphone, Video, Package, ChevronDown
} from "lucide-react";

// Моковые данные для команды
const teamMembers = [
  { id: 1, name: "Farid Mammadov", email: "hello@dropbridg.com", role: "Owner", status: "Active", initial: "FM" },
  { id: 2, name: "Shahriyar", email: "shahriyar@dropbridg.com", role: "Admin", status: "Active", initial: "S" },
  { id: 3, name: "Daniel Carter", email: "daniel@dropbridg.com", role: "Editor", status: "Invited", initial: "DC" },
];

// Моковые данные для счетов (Invoices)
const invoices = [
  { id: "INV-2023-001", date: "Oct 01, 2023", amount: "$99.00", status: "Paid" },
  { id: "INV-2023-002", date: "Nov 01, 2023", amount: "$99.00", status: "Paid" },
  { id: "INV-2023-003", date: "Dec 01, 2023", amount: "$99.00", status: "Paid" },
];

// Моковые данные для Интеграций
const integrationsList = [
  { id: 'shopify', name: 'Shopify', desc: 'Sync your store products, orders, and sales data in real-time.', status: 'Connected', icon: ShoppingCart, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-500/10' },
  { id: 'aliexpress', name: 'AliExpress', desc: 'Track supplier prices, stock levels, and fulfillment times.', status: 'Connected', icon: Globe, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-500/10' },
  { id: 'fb-ads', name: 'Facebook Ads', desc: 'Analyze ad spend, CPC, and calculate true ROAS automatically.', status: 'Connect', icon: Megaphone, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { id: 'tiktok', name: 'TikTok Ads', desc: 'Monitor viral video campaigns and customer acquisition costs.', status: 'Connect', icon: Video, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-500/10' },
  { id: 'woo', name: 'WooCommerce', desc: 'Import open-source store data and track e-commerce metrics.', status: 'Connect', icon: Package, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-500/10' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  
  // Состояния для Общих настроек
  const [projectName, setProjectName] = useState("DropBridg Global Analytics");
  const [timezone, setTimezone] = useState("UTC+4");

  const tabs = [
    { name: 'General', icon: Building },
    { name: 'Integrations', icon: Puzzle },
    { name: 'Team', icon: Users },
    { name: 'Billing & Plan', icon: CreditCard },
    { name: 'API Keys', icon: Key },
  ];

  return (
    <div className="space-y-6 max-w-[1200px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Шапка */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Project Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your team, billing, integrations, and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Боковое меню вкладок */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activeTab === tab.name 
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1E293B] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.name ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Контентная часть */}
        <div className="flex-1">
          
          {/* ================= GENERAL TAB ================= */}
          {activeTab === 'General' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">General Preferences</h2>
                <div className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Project / Company Name</label>
                    <input 
                      type="text" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">This name will be displayed on reports and exports.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Default Timezone</label>
                    <div className="relative">
                      <select 
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full appearance-none px-4 py-2.5 bg-slate-50 dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                      >
                        <option value="UTC">UTC (GMT+0)</option>
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                        <option value="UTC+4">Baku Time (GMT+4)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">Analytics charts and data will be aligned to this timezone.</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/60">
                  <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-red-200 dark:border-red-900/30 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-red-600 dark:text-red-500 mb-2">Danger Zone</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Permanently delete your project and wipe all analytics data. This action is not reversible.</p>
                <button className="px-6 py-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-sm font-medium rounded-xl transition-colors shadow-sm">
                  Delete Project
                </button>
              </div>
            </div>
          )}

          {/* ================= INTEGRATIONS TAB ================= */}
          {activeTab === 'Integrations' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Connected Platforms</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Connect stores, ad networks, and suppliers to sync data automatically.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {integrationsList.map((integration) => (
                    <div key={integration.id} className="border border-slate-200 dark:border-slate-700/50 rounded-xl p-5 hover:shadow-md transition-shadow bg-slate-50/30 dark:bg-[#1E293B]/30 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${integration.bg}`}>
                          <integration.icon className={`w-6 h-6 ${integration.color}`} />
                        </div>
                        {integration.status === 'Connected' ? (
                          <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-500/10 dark:text-green-400 px-2.5 py-1 rounded-md">
                            <Check className="w-3.5 h-3.5" /> Connected
                          </span>
                        ) : (
                          <button className="text-xs font-bold bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                            Connect
                          </button>
                        )}
                      </div>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">{integration.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                        {integration.desc}
                      </p>
                      
                      {integration.status === 'Connected' && (
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between mt-auto">
                          <span className="text-xs text-slate-400">Last synced: 2 mins ago</span>
                          <button className="text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">Configure</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= TEAM TAB ================= */}
          {activeTab === 'Team' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-[#0B1120]/30">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Team Members</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage who has access to this project.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shrink-0">
                    <Plus className="w-4 h-4" /> Invite Member
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white dark:bg-[#0F172A] text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800/60">
                        <th className="p-4 font-semibold">User</th>
                        <th className="p-4 font-semibold">Role</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200 dark:border-blue-800/50">
                              {member.initial}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-900 dark:text-white">{member.name}</div>
                              <div className="text-xs text-slate-500">{member.email}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#1E293B] px-2.5 py-1 rounded-md">{member.role}</span>
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border ${
                              member.status === 'Active' 
                                ? 'text-green-600 bg-green-50 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' 
                                : 'text-slate-600 bg-slate-50 border-slate-200 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20'
                            }`}>
                              {member.status === 'Active' && <Check className="w-3 h-3" />} {member.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-[#1E293B] transition-colors">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================= BILLING TAB ================= */}
          {activeTab === 'Billing & Plan' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Current Plan Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-[#1E293B] dark:to-[#0F172A] rounded-2xl border border-slate-800 shadow-lg p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-blue-500 blur-[80px] opacity-30 rounded-full"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <h2 className="text-lg font-bold">Premium Plan</h2>
                    </div>
                    <p className="text-sm text-slate-300">Your plan renews on November 1, 2026.</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-3xl font-bold">$99<span className="text-lg text-slate-400 font-medium">/mo</span></div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex-1 max-w-sm">
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-slate-300">AI Module Credits</span>
                      <span className="text-white">8,450 / 10,000</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[84%]"></div>
                    </div>
                  </div>
                  <button className="px-5 py-2 bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold rounded-xl transition-colors shadow-sm whitespace-nowrap">
                    Manage Subscription
                  </button>
                </div>
              </div>

              {/* Invoices Table */}
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm overflow-hidden flex flex-col">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0B1120]/30">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Billing History</h2>
                </div>
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/80 dark:hover:bg-[#111C35]/50 transition-colors">
                        <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{inv.date}</td>
                        <td className="p-4 text-sm text-slate-500">{inv.amount}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md dark:bg-green-500/10 dark:text-green-400">
                            <Check className="w-3 h-3" /> {inv.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                            <Download className="w-4 h-4" /> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= API KEYS TAB ================= */}
          {activeTab === 'API Keys' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Secret API Keys</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Use these keys to authenticate API requests.</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white text-sm font-medium rounded-xl transition-colors shadow-sm">
                    <Plus className="w-4 h-4" /> Create new key
                  </button>
                </div>
                
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 dark:bg-[#1E293B] px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                      <Shield className="w-4 h-4 text-blue-500" /> Production Key
                    </div>
                    <span className="text-xs text-slate-500">Created Oct 1, 2023</span>
                  </div>
                  <div className="p-4 flex items-center gap-4 bg-white dark:bg-[#0F172A]">
                    <code className="flex-1 bg-slate-100 dark:bg-[#0B1120] text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-lg text-sm font-mono tracking-wider">
                      sk_live_••••••••••••••••••••••••••••
                    </code>
                    <button className="p-2.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-[#1E293B] hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors border border-slate-200 dark:border-slate-700/50">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-100 dark:border-blue-500/20">
                  <Key className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Keep your keys safe</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Do not share your API keys in publicly accessible areas such as GitHub, client-side code, and so forth.</p>
                    <button className="mt-2 flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      Read API Documentation <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}