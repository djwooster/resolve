'use client';

import { Phone, PhoneCall } from 'lucide-react';
import { useCallContext } from './call-context';
import { cn } from '@/lib/utils';

interface CallButtonProps {
  phone: string;
  contactName: string;
  contactSource?: string;
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
}

export function CallButton({
  phone,
  contactName,
  contactSource,
  variant = 'default',
  size = 'sm',
  className,
}: CallButtonProps) {
  const { call, status } = useCallContext();
  const isBusy = status !== 'idle' && status !== 'ended' && status !== 'failed';

  const handleCall = () => {
    if (isBusy || !phone) return;
    call(phone, contactName, contactSource);
  };

  const baseStyles = 'flex items-center gap-1.5 font-semibold transition-colors rounded-lg disabled:opacity-40 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
  };

  const variantStyles = {
    default: 'bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/[0.08]',
    primary: 'bg-white text-black hover:bg-zinc-100',
    ghost: 'hover:bg-white/[0.06] text-zinc-400 hover:text-white',
  };

  return (
    <button
      onClick={handleCall}
      disabled={isBusy || !phone}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      title={isBusy ? 'A call is already in progress' : `Call ${contactName}`}
    >
      {isBusy ? (
        <PhoneCall className={cn('shrink-0', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
      ) : (
        <Phone className={cn('shrink-0', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
      )}
      Call
    </button>
  );
}
