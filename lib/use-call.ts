'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type CallStatus =
  | 'idle'
  | 'requesting-mic'
  | 'connecting'
  | 'ringing'
  | 'in-progress'
  | 'ended'
  | 'failed';

export interface ActiveCall {
  to: string;
  contactName: string;
  contactSource?: string;
  startedAt: Date | null;
  duration: number; // seconds
}

interface UseTwilioCall {
  status: CallStatus;
  activeCall: ActiveCall | null;
  isMuted: boolean;
  error: string | null;
  call: (to: string, contactName: string, contactSource?: string) => Promise<void>;
  hangUp: () => void;
  toggleMute: () => void;
  dismiss: () => void;
}

export type { UseTwilioCall };

export function useTwilioCall(): UseTwilioCall {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deviceRef = useRef<any>(null);
  const connectionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Tick call duration
  useEffect(() => {
    if (status === 'in-progress' && activeCall?.startedAt) {
      timerRef.current = setInterval(() => {
        setActiveCall(prev =>
          prev ? { ...prev, duration: Math.floor((Date.now() - prev.startedAt!.getTime()) / 1000) } : prev
        );
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status]);

  const initDevice = useCallback(async () => {
    if (deviceRef.current) return deviceRef.current;

    // Dynamic import — Twilio JS SDK is browser-only
    const { Device } = await import('@twilio/voice-sdk');

    const res = await fetch('/api/twilio/token?identity=agent');
    const { token, error: tokenError } = await res.json();
    if (tokenError) throw new Error(tokenError);

    const device = new Device(token, { logLevel: 1 });

    device.on('error', (err: any) => {
      console.error('[Twilio Device]', err);
      setError(err.message ?? 'Call error');
      setStatus('failed');
    });

    device.on('registered', () => {
      console.log('[Twilio Device] registered');
    });

    await device.register();
    deviceRef.current = device;
    return device;
  }, []);

  const call = useCallback(async (to: string, contactName: string, contactSource?: string) => {
    try {
      setError(null);
      setStatus('requesting-mic');

      // Request mic permission early so browser prompt appears before connecting
      await navigator.mediaDevices.getUserMedia({ audio: true });

      setStatus('connecting');
      setActiveCall({ to, contactName, contactSource, startedAt: null, duration: 0 });

      const device = await initDevice();

      const conn = await device.connect({ params: { To: to } });
      connectionRef.current = conn;

      conn.on('ringing', () => setStatus('ringing'));

      conn.on('accept', () => {
        setStatus('in-progress');
        setActiveCall(prev => prev ? { ...prev, startedAt: new Date() } : prev);
      });

      conn.on('disconnect', () => {
        setStatus('ended');
        connectionRef.current = null;
      });

      conn.on('cancel', () => {
        setStatus('ended');
        connectionRef.current = null;
      });

      conn.on('error', (err: any) => {
        setError(err.message ?? 'Connection error');
        setStatus('failed');
        connectionRef.current = null;
      });

    } catch (err: any) {
      setError(err.message ?? 'Failed to start call');
      setStatus('failed');
    }
  }, [initDevice]);

  const hangUp = useCallback(() => {
    if (connectionRef.current) {
      connectionRef.current.disconnect();
      connectionRef.current = null;
    }
    setStatus('ended');
  }, []);

  const toggleMute = useCallback(() => {
    if (connectionRef.current) {
      const next = !isMuted;
      connectionRef.current.mute(next);
      setIsMuted(next);
    }
  }, [isMuted]);

  const dismiss = useCallback(() => {
    setStatus('idle');
    setActiveCall(null);
    setIsMuted(false);
    setError(null);
  }, []);

  return { status, activeCall, isMuted, error, call, hangUp, toggleMute, dismiss };
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
