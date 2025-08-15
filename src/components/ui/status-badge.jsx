import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusVariants = {
  success: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-200 dark:border-green-800',
  warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800',
  error: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800',
  info: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-800',
  neutral: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-950/50 dark:text-gray-200 dark:border-gray-800',
  pending: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-200 dark:border-purple-800'
};

export function StatusBadge({ status, variant, className, ...props }) {
  // Auto-determine variant based on status if not provided
  if (!variant) {
    const statusLower = status?.toLowerCase();
    if (['active', 'paid', 'resolved', 'delivered', 'confirmed'].includes(statusLower)) {
      variant = 'success';
    } else if (['pending', 'in progress', 'processing'].includes(statusLower)) {
      variant = 'warning';
    } else if (['inactive', 'overdue', 'failed', 'rejected'].includes(statusLower)) {
      variant = 'error';
    } else if (['new', 'requested', 'due'].includes(statusLower)) {
      variant = 'info';
    } else {
      variant = 'neutral';
    }
  }

  return (
    <Badge 
      variant="outline" 
      className={cn(statusVariants[variant], className)} 
      {...props}
    >
      {status}
    </Badge>
  );
}