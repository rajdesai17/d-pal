"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

export const FloatingNav = ({
  navItems,
  className,
  forceVisible = false,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  forceVisible?: boolean;
}) => {
  return (
    <AnimatePresence mode="wait">
      {forceVisible && (
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-white/30 dark:border-white/10 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md shadow-lg z-[5000] pr-1.5 pl-4 py-1.5 items-center justify-center space-x-2",
            className
          )}
        >
          {navItems.map((navItem, idx) => (
            <a
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-sm px-2 py-1 rounded-md transition-colors"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-xs font-medium">{navItem.name}</span>
            </a>
          ))}
          <button className="border text-xs font-semibold relative border-neutral-200 dark:border-white/[0.15] text-black dark:text-white px-3 py-1 rounded-full bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-sm ml-2">
            <span>Login</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 