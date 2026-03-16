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
    case 'ALERT': return 'text-indigo-400'
    default: return 'text-zinc-400'
  }
}

export function getSeverityBg(severity: Severity) {
  switch (severity) {
    case 'CRITICAL': return 'bg-red-500/10 border-red-500/30'
    case 'WARNING': return 'bg-amber-500/10 border-amber-500/30'
    case 'ALERT': return 'bg-indigo-500/10 border-indigo-500/30'
    default: return 'bg-zinc-500/10 border-zinc-500/30'
  }
}

export function getSeverityBadge(severity: Severity) {
  switch (severity) {
    case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/30'
    case 'WARNING': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    case 'ALERT': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    default: return 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
  }
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function formatPhoneNumber(phone: string) {
  return phone
}
