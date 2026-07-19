import React, { forwardRef } from 'react';
import { LucideProps } from 'lucide-react';
import { Icons, IconName } from '../../lib/icons';
import { cn } from '../../lib/utils';

export interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
  className?: string;
  size?: number | string;
  color?: string;
  title?: string;
  spin?: boolean;
  pulse?: boolean;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = 20, color = 'currentColor', title, spin, pulse, ...props }, ref) => {
    const LucideIcon = Icons[name];

    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found in Icons registry.`);
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        size={size}
        color={color}
        className={cn(
          spin && 'animate-spin',
          pulse && 'animate-pulse',
          className
        )}
        aria-hidden={title ? 'false' : 'true'}
        aria-label={title}
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';
