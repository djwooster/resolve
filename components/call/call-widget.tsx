'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, X, PhoneCall, Loader2 } from 'lucide-react';
import { useCallContext } from './call-context';
import { formatDuration } from '@/lib/use-call';
import { cn } from '@/lib/utils';

const STATUS_LABEL: Record<string, string> = {
  'requesting-mic': 'Requesting microphone...',
  'connecting': 'Connecting...',
  'ringing': 'Ringing...',
  'in-progress': 'In Call',
  'ended': 'Call Ended',
  'failed': 'Call Failed',
};

export function CallWidget() {
  const { status, activeCall, isMuted, error, hangUp, toggleMute, dismiss } = useCallContext();

  const visible = status !== 'idle';
  const isActive = status === 'in-progress';
  const isConnecting = ['requesting-mic', 'connecting', 'ringing'].includes(status);
  const isFinished = status === 'ended' || status === 'failed';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            'fixed bottom-6 right-6 z-50 w-80 rounded-2xl border shadow-2xl overflow-hidden',
            isActive
              ? 'border-emerald-500/40 bg-[#0D1A12] shadow-emerald-900/30'
              : isFinished
              ? 'border-zinc-700 bg-[#111113]'
              : 'border-indigo-500/40 bg-[#0E0E1A] shadow-indigo-900/30'
          )}
        >
          {/* Top accent bar */}
          <div className={cn(
            'h-1 w-full',
            isActive
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
              : isFinished
              ? 'bg-zinc-700'
              : 'bg-gradient-to-r from-indigo-600 to-indigo-400'
          )} />

          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className={cn(
                  'w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold shrink-0 border',
                  isActive
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : isFinished
                    ? 'bg-zinc-700/50 border-zinc-600 text-zinc-400'
                    : 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                )}>
                  {activeCall?.contactName?.charAt(0)?.toUpperCase() ?? '?'}
                </div>
                <div>
                  <p className="text-base font-bold text-white leading-tight">
                    {activeCall?.contactName ?? 'Unknown'}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{activeCall?.to}</p>
                  {activeCall?.contactSource && (
                    <p className="text-xs text-zinc-600">{activeCall.contactSource}</p>
                  )}
                </div>
              </div>

              {isFinished && (
                <button
                  onClick={dismiss}
                  className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Status row */}
            <div className="flex items-center gap-2 mb-5">
              {isConnecting && (
                <Loader2 className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              )}
              {isActive && (
                <motion.div
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <span className={cn(
                'text-sm font-semibold',
                isActive ? 'text-emerald-400' :
                status === 'failed' ? 'text-red-400' :
                isFinished ? 'text-zinc-400' : 'text-indigo-400'
              )}>
                {STATUS_LABEL[status] ?? status}
              </span>
              {isActive && activeCall && (
                <span className="text-sm font-mono font-bold text-white ml-auto">
                  {formatDuration(activeCall.duration)}
                </span>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 mb-4">
                {error}
              </p>
            )}

            {/* Actions */}
            {!isFinished ? (
              <div className="flex gap-2">
                {/* Mute */}
                <button
                  onClick={toggleMute}
                  disabled={!isActive}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-colors border',
                    isActive
                      ? isMuted
                        ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500/30'
                        : 'bg-white/8 border-white/10 text-zinc-300 hover:bg-white/12'
                      : 'bg-white/4 border-white/5 text-zinc-600 cursor-not-allowed'
                  )}
                >
                  {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>

                {/* Hang up */}
                <button
                  onClick={hangUp}
                  disabled={isConnecting && status === 'requesting-mic'}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-sm font-semibold hover:bg-red-500/30 transition-colors"
                >
                  <PhoneOff className="w-4 h-4" />
                  Hang Up
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={dismiss}
                  className="flex-1 py-2.5 rounded-xl bg-white/8 border border-white/10 text-zinc-300 text-sm font-semibold hover:bg-white/12 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
