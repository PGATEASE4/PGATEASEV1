import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className 
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
      className
    )}>
      {Icon && <Icon className="mb-4 h-10 w-10 text-muted-foreground" />}
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-sm">{description}</p>
      {action && action}
    </div>
  );
}