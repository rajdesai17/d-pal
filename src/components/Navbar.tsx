import React, { useState, useRef } from "react";
import { FloatingNav } from "./ui/FloatingNav";
import { IconHome, IconMessage, IconUser, IconMenu2 } from "@tabler/icons-react";

// Move navItems outside the component to avoid re-creation on every render
const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

const Navbar = () => {
  const [forceVisible, setForceVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleIconClick = () => {
    setForceVisible(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setForceVisible(false), 10000);
  };

  return (
    <div className="relative w-full">
      {/* Floating Icon Button - only show when navbar is hidden */}
      {!forceVisible && (
        <button
          onClick={handleIconClick}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[6000] bg-white/60 dark:bg-black/40 border border-white/30 dark:border-white/10 backdrop-blur-md shadow-lg rounded-full p-2.5 flex items-center justify-center hover:bg-white/80 dark:hover:bg-black/60 transition-colors"
          aria-label="Show Navbar"
        >
          <IconMenu2 className="h-4 w-4 text-neutral-700 dark:text-white" />
        </button>
      )}
      <FloatingNav navItems={navItems} forceVisible={forceVisible} />
      {/* Add your page content here */}
    </div>
  );
};

export default Navbar; 