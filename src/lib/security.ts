/**
 * Security Utility for input sanitization and validation.
 */

export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  if (!input) return '';
  
  // 1. Length constraint
  let sanitized = input.slice(0, maxLength);
  
  // 2. Remove potentially dangerous HTML tags
  sanitized = sanitized.replace(/<[^>]*>?/gm, '');
  
  // 3. Escape basic characters to prevent simple XSS
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
    
  return sanitized.trim();
};

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
