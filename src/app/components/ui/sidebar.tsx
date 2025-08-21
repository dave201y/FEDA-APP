"use client"; // This component needs to be a Client Component to use hooks like useRouter, usePathname

import React, { createContext, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import Link from "next/link"; // Import Link for navigation
import { useRouter, usePathname, useSearchParams } from "next/navigation"; // Import useRouter, usePathname, and useSearchParams

import {
  BookOpen, Film, Heart, Dumbbell, ChefHat, MapPin, Laptop, Palette, Music, Laugh,
  Newspaper, Trophy, Gamepad2, Briefcase, Shield, Save, Star, Filter, ArrowRight,
  Play, Upload, User, Grid3X3, Sparkles, Clock, TrendingUp, Shuffle
} from "lucide-react"; // Import all necessary icons

// --- Context for Sidebar State (e.g., for mobile responsiveness) ---
interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to use the sidebar context
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

// --- Sidebar Root Component ---
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { isOpen } = useSidebar();
  return (
    <aside
      className={twMerge(
        "fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

// --- Sidebar Header ---
interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, children, ...props }: SidebarHeaderProps) {
  return (
    <div className={twMerge("shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

// --- Sidebar Content ---
interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <div className={twMerge("flex-1 overflow-y-auto", className)} {...props}>
      {children}
    </div>
  );
}

// --- Sidebar Footer ---
interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, children, ...props }: SidebarFooterProps) {
  return (
    <div className={twMerge("shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

// --- Sidebar Group ---
interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, children, ...props }: SidebarGroupProps) {
  return (
    <div className={twMerge("my-4", className)} {...props}>
      {children}
    </div>
  );
}

// --- Sidebar Group Label ---
interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function SidebarGroupLabel({ className, children, ...props }: SidebarGroupLabelProps) {
  return (
    <p className={twMerge("text-xs font-medium text-gray-400 uppercase", className)} {...props}>
      {children}
    </p>
  );
}

// --- Sidebar Group Content ---
interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({ className, children, ...props }: SidebarGroupContentProps) {
  return (
    <div className={twMerge("mt-2", className)} {...props}>
      {children}
    </div>
  );
}

// --- Sidebar Menu ---
interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, children, ...props }: SidebarMenuProps) {
  return (
    <nav className={twMerge("space-y-1", className)} {...props}>
      {children}
    </nav>
  );
}

// --- Sidebar Menu Item (for wrapping SidebarMenuButton) ---
interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenuItem({ className, children, ...props }: SidebarMenuItemProps) {
  return (
    <div className={twMerge(className)} {...props}>
      {children}
    </div>
  );
}

// --- Sidebar Menu Button (the clickable navigation item) ---
interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean; // To allow rendering a Link component
}

export function SidebarMenuButton({ asChild, className, children, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button"; // Use Slot if asChild is true
  return (
    <Comp
      className={twMerge(
        "flex w-full items-center justify-start rounded-md p-2 text-sm font-medium transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

// --- Sidebar Trigger (for mobile toggle) ---
interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({ className, children, ...props }: SidebarTriggerProps) {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}
      className={twMerge("p-2 rounded-md hover:bg-gray-700 text-white", className)}
      {...props}
    >
      {children || ( // Default icon if no children are provided
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
}

// --- Category Data (Copied from src/app/categories/page.tsx) ---
export const categories = [
  { key: "all", label: "All Videos", icon: Grid3X3, color: "from-gray-500 to-gray-600", description: "View all content" }, // Added "All Videos" option
  { key: "educational", label: "Educational", icon: BookOpen, color: "from-blue-500 to-blue-600", description: "Learn something new every day" },
  { key: "entertainment", label: "Entertainment", icon: Film, color: "from-purple-500 to-purple-600", description: "Fun and engaging content" },
  { key: "lifestyle", label: "Lifestyle", icon: Heart, color: "from-pink-500 to-pink-600", description: "Daily life inspiration" },
  { key: "fitness", label: "Fitness", icon: Dumbbell, color: "from-green-500 to-green-600", description: "Health and workout tips" },
  { key: "cooking", label: "Cooking", icon: ChefHat, color: "from-orange-500 to-orange-600", description: "Delicious recipes and tips" },
  { key: "travel", label: "Travel", icon: MapPin, color: "from-cyan-500 to-cyan-600", description: "Explore the world" },
  { key: "technology", label: "Technology", icon: Laptop, color: "from-slate-500 to-slate-600", description: "Latest tech trends" },
  { key: "art_creativity", label: "Art & Creativity", icon: Palette, color: "from-indigo-500 to-indigo-600", description: "Creative inspiration" },
  { key: "music", label: "Music", icon: Music, color: "from-violet-500 to-violet-600", description: "Musical performances" },
  { key: "comedy", label: "Comedy", icon: Laugh, color: "from-yellow-500 to-yellow-600", description: "Laughs and entertainment" },
  { key: "news", label: "News", icon: Newspaper, color: "from-red-500 to-red-600", description: "Stay informed" },
  { key: "sports", label: "Sports", icon: Trophy, color: "from-emerald-500 to-emerald-600", description: "Athletic content" },
  { key: "gaming", label: "Gaming", icon: Gamepad2, color: "from-fuchsia-500 to-fuchsia-600", description: "Gaming content" },
  { key: "business", label: "Business", icon: Briefcase, color: "from-amber-500 to-amber-600", description: "Professional insights" },
  { key: "health_wellness", label: "Health & Wellness", icon: Shield, color: "from-teal-500 to-teal-600", description: "Mental and physical health" }
];

// Helper component for category navigation items
// This will replace the generic NavItem in layout.tsx for categories
interface SidebarCategoryItemProps {
  categoryKey: string;
  label: string;
  Icon: React.ElementType;
  gradient: string;
}

export function SidebarCategoryItem({ categoryKey, label, Icon, gradient }: SidebarCategoryItemProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');
  const isActive = currentCategory === categoryKey;

  const handleClick = () => {
    if (categoryKey === "all") {
      router.push('/'); // Go to root feed (no category filter)
    } else {
      router.push(`/?category=${categoryKey}`); // Go to root feed with category filter
    }
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        onClick={handleClick}
        className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 ${
          isActive
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg'
            : 'hover:bg-white/5 text-slate-300 hover:text-white'
        }`}
      >
        <div className={`p-2 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-medium">{label}</span>
        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

