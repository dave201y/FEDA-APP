"use client";

import Link from "next/link";
import React, { useState } from "react"; // Import useState
import { motion } from "framer-motion"; // Import motion for animations
import { usePathname, useSearchParams } from "next/navigation";
import "./globals.css";

// Import the sidebar components including the new SidebarCategoryItem
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
  SidebarCategoryItem,
  categories // Import the categories array
} from "../app/components/ui/sidebar"; // Ensure this path is correct

import {
  Play,
  Upload,
  User,
  Grid3X3,
  Shield,
  Sparkles,
  ArrowRight,
  ChevronDown // Import ChevronDown icon
} from "lucide-react";

// Define the main navigation items (excluding categories, which are now dynamic)
const navigationItems = [
  {
    title: "Feed",
    url: "/",
    icon: Play,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Upload",
    url: "/upload",
    icon: Upload,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    gradient: "from-orange-500 to-red-500"
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State to control the visibility of the categories dropdown
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Toggle function for the categories dropdown
  const toggleCategoriesDropdown = () => {
    setIsCategoriesOpen(prev => !prev);
  };

  // Determine if the "Feed" link should be active.
  const isFeedActive = pathname === '/' || searchParams.has('category');


  return (
    <SidebarProvider>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head>
          {/* Other head elements from your original layout.tsx */}
        </head>
        <body className="h-full antialiased" style={{
          background: "var(--color-bg-gradient)",
          color: "var(--color-text)"
        }}>
          <div className="min-h-screen grid grid-cols-1 md:grid-cols-[260px_1fr]">
            <style>{`
              :root {
                --sidebar-background: rgba(15, 23, 42, 0.95);
                --sidebar-foreground: rgb(248, 250, 252);
                --sidebar-primary: rgb(139, 92, 246);
                --sidebar-primary-foreground: rgb(255, 255, 255);
                --sidebar-accent: rgba(139, 92, 246, 0.1);
                --sidebar-accent-foreground: rgb(203, 213, 225);
                --sidebar-border: rgba(139, 92, 246, 0.2);
              }
            
              .glass-effect {
                backdrop-filter: blur(20px);
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
              }
            
              .gradient-text {
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
              }
            `}</style>

            <Sidebar className="border-r border-white/10 glass-effect">
              <SidebarHeader className="border-b border-white/10 p-6">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold gradient-text">Feda</h2>
                    <p className="text-xs text-slate-400">Mindful Video Experience</p>
                  </div>
                </motion.div>
              </SidebarHeader>
            
              <SidebarContent className="p-4">
                <SidebarGroup>
                  <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-2 mb-2">
                    Navigation
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-2">
                      {navigationItems.map((item, index) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              asChild
                              // Updated active state for the Feed link
                              className={`group relative overflow-hidden rounded-xl p-3 transition-all duration-300 ${
                                item.url === '/' ? isFeedActive ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg' : 'hover:bg-white/5 text-slate-300 hover:text-white'
                                : pathname === item.url // Standard active state for other links
                                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg'
                                  : 'hover:bg-white/5 text-slate-300 hover:text-white'
                              }`}
                            >
                              <Link href={item.url} className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{item.title}</span>
                                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        </motion.div>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* NEW CATEGORIES SECTION WITH DROPDOWN */}
                <SidebarGroup className="mt-8">
                  {/* Clickable label to toggle dropdown */}
                  <SidebarGroupLabel
                    onClick={toggleCategoriesDropdown} // Add onClick handler
                    className="flex items-center justify-between cursor-pointer text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-2 mb-2 hover:text-white transition-colors"
                  >
                    <span>Categories</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isCategoriesOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </SidebarGroupLabel>
                  {/* Conditionally render content with animation */}
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                      isCategoriesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden"> {/* Ensures content itself is clipped */}
                      <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                          {categories.map((category, index) => (
                            <motion.div
                              key={category.key}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                            >
                              <SidebarCategoryItem
                                categoryKey={category.key}
                                label={category.label}
                                Icon={category.icon}
                                gradient={category.color}
                              />
                            </motion.div>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </div>
                  </div>
                </SidebarGroup>

                <SidebarGroup className="mt-8">
                  <SidebarGroupLabel className="text-xs font-medium text-slate-400 uppercase tracking-wider px-2 py-2 mb-2">
                    Safety Features
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <motion.div
                      className="px-3 py-4 rounded-xl glass-effect border border-emerald-500/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm font-medium text-emerald-400">Safe Mode</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Filter content to create a positive viewing experience
                      </p>
                    </motion.div>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter className="border-t border-white/10 p-4">
                <motion.div
                  className="flex items-center gap-3 p-3 rounded-xl glass-effect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">U</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm truncate">User</p>
                    <p className="text-xs text-slate-400 truncate">Mindful viewer</p>
                  </div>
                </motion.div>
              </SidebarFooter>
            </Sidebar>

            <main className="flex-1 flex flex-col min-w-0">
              <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4 md:hidden">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 text-white" />
                  <h1 className="text-xl font-semibold gradient-text">Feda</h1>
                </div>
              </header>

              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </main>
          </div>
        </body>
      </html>
    </SidebarProvider>
  );
}

// NavItem component is not needed here anymore as SidebarMenuButton handles it
// If you have other specific non-category navigation items that need this, keep it.
// function NavItem({ href, label, currentPath }: { href: string; label: string; currentPath: string }) {
//   const isActive = href === currentPath || (href === '/' && currentPath === '/');
//   return (
//     <Link
//       href={href}
//       className={`block w-full rounded-xl px-4 py-2.5 transition ${
//         isActive
//           ? "bg-purple-600/20 text-white shadow-inner shadow-purple-500/10"
//           : "text-slate-200 hover:text-white hover:bg-white/10"
//       }`}
//     >
//       {label}
//     </Link>
//   );
// }
