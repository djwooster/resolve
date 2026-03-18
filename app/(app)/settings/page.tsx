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
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const cardClass = 'rounded-xl border border-white/[0.06] bg-[#0D0D0F] mb-4 overflow-hidden';
  const headerClass = 'px-6 py-4 border-b border-white/[0.06] flex items-center gap-3';
  const iconClass = 'w-8 h-8 rounded-lg border border-white/[0.08] bg-white/[0.04] flex items-center justify-center';
  const inputClass = 'flex-1 bg-[#0A0A0B] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white/20 transition-colors';

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar title="Settings" subtitle="GoHighLevel integration and notification preferences" />
      <div className="flex-1 p-8 max-w-3xl">

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={cardClass}>
          <div className={headerClass}>
            <div className={iconClass}><Key className="w-4 h-4 text-zinc-400" /></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">GoHighLevel Integration</p>
              <p className="text-xs text-zinc-600">Connect your GHL account for real-time monitoring</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-emerald-400">Connected</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs text-zinc-600 uppercase tracking-widest font-medium mb-2">API Key</label>
              <div className="flex gap-2">
                <input type="password" value={apiKey} onChange={e => setApiKey(e.target.value)} className={inputClass} placeholder="ghl_..." />
                <button className="px-3 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 text-xs font-medium hover:text-white hover:bg-white/[0.08] transition-colors">Reveal</button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-600 uppercase tracking-widest font-medium mb-2">Location ID</label>
              <input type="text" value={locationId} onChange={e => setLocationId(e.target.value)} className={cn(inputClass, 'w-full')} placeholder="loc_..." />
            </div>
            <div className="flex items-center justify-between pt-1">
              <a href="#" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors">
                <ExternalLink className="w-3.5 h-3.5" /> Get API Key from GHL
              </a>
              <button onClick={handleSave} className={cn('flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all',
                saved ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white text-black hover:bg-zinc-100'
              )}>
                {saved ? <><Check className="w-3.5 h-3.5" /> Saved</> : 'Save Changes'}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className={cardClass}>
          <div className={headerClass}>
            <div className={iconClass}><Webhook className="w-4 h-4 text-zinc-400" /></div>
            <div>
              <p className="text-sm font-medium text-white">Webhook Endpoint</p>
              <p className="text-xs text-zinc-600">GHL sends events here for real-time enforcement</p>
            </div>
          </div>
          <div className="p-6">
            <label className="block text-xs text-zinc-600 uppercase tracking-widest font-medium mb-2">Inbound Webhook URL</label>
            <div className="flex gap-2">
              <input readOnly value="https://resolve.app/api/webhook/ghl" className={cn(inputClass, 'text-zinc-500 cursor-text')} />
              <button className="px-3 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-400 text-xs font-medium hover:text-white hover:bg-white/[0.08] transition-colors">Copy</button>
            </div>
            <p className="text-xs text-zinc-600 mt-2">Add this URL to your GHL workflow triggers.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={cardClass}>
          <div className={headerClass}>
            <div className={iconClass}><Bell className="w-4 h-4 text-zinc-400" /></div>
            <div>
              <p className="text-sm font-medium text-white">Notifications</p>
              <p className="text-xs text-zinc-600">Configure where violations are sent</p>
            </div>
          </div>
          <div className="p-6 space-y-1">
            {[
              { label: 'Slack Notifications', desc: 'Send violations to Slack channel', enabled: true },
              { label: 'Email Alerts', desc: 'Daily enforcement digest', enabled: false },
              { label: 'SMS Escalation', desc: 'Critical violations via SMS to manager', enabled: true },
              { label: 'Browser Notifications', desc: 'Real-time desktop alerts', enabled: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-zinc-600">{item.desc}</p>
                </div>
                <div className={cn('relative w-9 h-5 rounded-full cursor-pointer border transition-colors',
                  item.enabled ? 'bg-white/[0.1] border-white/[0.15]' : 'bg-white/[0.04] border-white/[0.08]'
                )}>
                  <div className={cn('absolute top-0.5 w-3.5 h-3.5 rounded-full transition-all',
                    item.enabled ? 'left-[18px] bg-white' : 'left-[2px] bg-zinc-600'
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
