import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

// Defines the base styles and variants for the button using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-moonstone)] text-[var(--color-text)] hover:bg-[var(--color-midnight)]",
        destructive: "bg-red-600 text-[var(--color-text)] hover:bg-red-700",
        outline:
          "border border-[var(--color-moonstone)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-moonstone)] hover:text-[var(--color-midnight)]",
        secondary:
          "bg-[var(--color-midnight)] text-[var(--color-text)] hover:bg-[var(--color-moonstone)]",
        ghost: "hover:bg-[var(--color-moonstone)] hover:text-[var(--color-midnight)]",
        link: "text-[var(--color-moonstone)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Defines the props interface for the Button component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Allows the button to render as its child component
}

// Button component definition using React.forwardRef for ref forwarding
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If asChild is true, render the Slot component, otherwise render a regular button
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={buttonVariants({ variant, size, className })} // Apply styles based on variants and passed className
        ref={ref} // Forward the ref to the underlying DOM element
        {...props} // Pass remaining props to the component
      />
    );
  }
);
Button.displayName = "Button"; // Set display name for debugging

export { Button, buttonVariants };

// Example usage in a Badge component
<span
  style={{
    background: "var(--color-bhadge)",
    color: "var(--color-text)",
  }}
  className="px-2 py-1 rounded-lg font-semibold"
>
  Badge
</span>;
