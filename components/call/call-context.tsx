'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useTwilioCall, UseTwilioCall } from '@/lib/use-call';

const CallContext = createContext<UseTwilioCall | null>(null);

export function CallProvider({ children }: { children: ReactNode }) {
  const callState = useTwilioCall();
  return <CallContext.Provider value={callState}>{children}</CallContext.Provider>;
}

export function useCallContext(): UseTwilioCall {
  const ctx = useContext(CallContext);
  if (!ctx) throw new Error('useCallContext must be used within CallProvider');
  return ctx;
}
