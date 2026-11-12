// Utility functions for Zen Steps

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Format a date string for display
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\+91)(\d{5})(\d{5})/, '$1 $2 $3')
}

/**
 * Generate star rating array
 */
export function getStarRating(rating: number): ('full' | 'empty')[] {
  return Array.from({ length: 5 }, (_, i) => (i < rating ? 'full' : 'empty'))
}

/**
 * Classname utility (simple cn alternative)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

