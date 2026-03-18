'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Topbar } from '@/components/layout/topbar';
import { cn } from '@/lib/utils';
import { Check, ExternalLink, Key, Webhook, Bell } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('ghl_••••••••••••••••••••••••••');
  const [locationId, setLocationId] = useState('loc_••••••••••••••');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Settings" subtitle="GoHighLevel integration and notification preferences" />
      <div className="flex-1 p-8 max-w-3xl">
        {/* GHL Integration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#1E1E22] bg-[#111113] mb-6 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#1E1E22]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                <Key className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">GoHighLevel Integration</h3>
                <p className="text-xs text-zinc-500">Connect your GHL account to enable real-time monitoring</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold text-emerald-400">Connected</span>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  className="flex-1 bg-[#0D0D0F] border border-[#1E1E22] rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-indigo-500/50 transition-colors"
                  placeholder="ghl_..."
                />
                <button className="px-4 py-3 rounded-lg bg-[#1A1A1E] border border-[#2a2a2e] text-zinc-300 text-sm font-semibold hover:bg-[#222226] transition-colors">
                  Reveal
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Location ID</label>
              <input
                type="text"
                value={locationId}
                onChange={e => setLocationId(e.target.value)}
                className="w-full bg-[#0D0D0F] border border-[#1E1E22] rounded-lg px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-indigo-500/50 transition-colors"
                placeholder="loc_..."
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <a href="#" className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                <ExternalLink className="w-3.5 h-3.5" />
                Get API Key from GHL Settings
              </a>
              <button
                onClick={handleSave}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all',
                  saved
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-black hover:bg-zinc-100'
                )}
              >
                {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Webhook Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#1E1E22] bg-[#111113] mb-6 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#1E1E22]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Webhook className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Webhook Endpoint</h3>
                <p className="text-xs text-zinc-500">GHL sends events to this URL for real-time enforcement</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <label className="block text-sm font-semibold text-zinc-300 mb-2">Inbound Webhook URL</label>
            <div className="flex gap-2">
              <input
                readOnly
                value="https://resolve.app/api/webhook/ghl"
                className="flex-1 bg-[#0D0D0F] border border-[#1E1E22] rounded-lg px-4 py-3 text-sm text-zinc-400 font-mono focus:outline-none cursor-text"
              />
              <button className="px-4 py-3 rounded-lg bg-[#1A1A1E] border border-[#2a2a2e] text-zinc-300 text-sm font-semibold hover:bg-[#222226] transition-colors">
                Copy
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-2">Add this URL to your GHL workflow triggers to send events to Resolve.</p>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-[#1E1E22] bg-[#111113] overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-[#1E1E22]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Bell className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Notifications</h3>
                <p className="text-xs text-zinc-500">Configure where violations are sent</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: 'Slack Notifications', desc: 'Send violations to Slack channel', enabled: true },
              { label: 'Email Alerts', desc: 'Daily enforcement digest', enabled: false },
              { label: 'SMS Escalation', desc: 'Critical violations via SMS to manager', enabled: true },
              { label: 'Browser Notifications', desc: 'Real-time desktop alerts', enabled: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-[#1A1A1E] last:border-0">
                <div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
                <div className={cn(
                  'relative w-11 h-6 rounded-full cursor-pointer border-2 transition-colors',
                  item.enabled ? 'bg-emerald-500/30 border-emerald-500/50' : 'bg-zinc-700/30 border-zinc-600/50'
                )}>
                  <div className={cn(
                    'absolute top-0.5 w-4 h-4 rounded-full transition-all shadow-md',
                    item.enabled ? 'left-[22px] bg-emerald-400' : 'left-[2px] bg-zinc-500'
                  )} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
