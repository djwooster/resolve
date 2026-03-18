import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Severity } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSeverityColor(severity: Severity) {
  switch (severity) {
    case 'CRITICAL': return 'text-red-400'
    case 'WARNING': return 'text-amber-400'
    case 'ALERT': return 'text-blue-400'
    default: return 'text-zinc-400'
  }
}

export function getSeverityBg(severity: Severity) {
  switch (severity) {
    case 'CRITICAL': return 'bg-red-500/[0.06] border-red-500/20'
    case 'WARNING': return 'bg-amber-500/[0.06] border-amber-500/20'
    case 'ALERT': return 'bg-blue-500/[0.06] border-blue-500/20'
    default: return 'bg-white/[0.03] border-white/[0.08]'
  }
}

export function getSeverityBadge(severity: Severity) {
  switch (severity) {
    case 'CRITICAL': return 'text-red-400 border-red-500/20'
    case 'WARNING': return 'text-amber-400 border-amber-500/20'
    case 'ALERT': return 'text-blue-400 border-blue-500/20'
    default: return 'text-zinc-400 border-white/[0.08]'
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function formatPhoneNumber(phone: string) {
  return phone
}
