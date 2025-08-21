import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority"; // Relies on 'class-variance-authority'

// Defines the base styles and variants for the badge
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground", // Simple outline variant
      },
    },
    defaultVariants: {
      variant: "default", // Default variant if none is specified
    },
  }
);

// Defines the props interface for the Badge component
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, // Inherits standard HTML div attributes
    VariantProps<typeof badgeVariants> {} // Inherits variant props from cva

// Badge component definition
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={badgeVariants({ variant, className })} {...props} />
  );
}

export { Badge, badgeVariants };
