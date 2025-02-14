import { User, Trophy, Sparkles, Activity, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../../utils/cn";

type Tab = {
  id: "profile" | "points" | "missions" | "activity";
  icon: React.ReactNode;
  label: string;
};

type MainNavProps = {
  currentPage: "home" | "profile" | "missions" | "points" | "activity";
  onNavigate: (page: "home" | "profile" | "missions" | "points" | "activity") => void;
};

const tabs: Tab[] = [
  { id: "profile", icon: <User size={20} />, label: "Profile" },
  { id: "points", icon: <Trophy size={20} />, label: "Points" },
  { id: "missions", icon: <Sparkles size={20} />, label: "Missions" },
  { id: "activity", icon: <Activity size={20} />, label: "Activity" }
];

export function MainNav({ currentPage, onNavigate }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const handleNavigation = (tab: Tab) => {
    onNavigate(tab.id);
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2 p-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleNavigation(tab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
              "font-medium text-sm",
              "hover:bg-indigo-500/10 hover:text-indigo-400",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
              currentPage === tab.id
                ? "bg-indigo-500/20 text-indigo-400 shadow-lg shadow-indigo-500/10"
                : "text-gray-400"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-lg transition-colors duration-300",
              currentPage === tab.id
                ? "bg-indigo-500/20"
                : "bg-gray-700/30 group-hover:bg-indigo-500/10"
            )}>
              {tab.icon}
            </div>
            <span>{tab.label}</span>
            
            {currentPage === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-50 transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Dark Overlay */}
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-md"
          onClick={toggleMenu}
        />

        {/* Menu Content */}
        <div 
          className={cn(
            "fixed right-0 top-0 h-full w-72 bg-gradient-to-b from-gray-900 to-black transform transition-transform duration-300 ease-out shadow-xl border-l border-gray-800/50",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Navigation Menu
              </h2>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleNavigation(tab)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300",
                      "hover:bg-indigo-500/20 hover:scale-[1.02]",
                      "focus:outline-none focus:ring-2 focus:ring-indigo-500/50",
                      "border border-transparent",
                      currentPage === tab.id
                        ? "bg-indigo-500/20 text-white border-indigo-500/50"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-xl transition-colors duration-300",
                      currentPage === tab.id
                        ? "bg-indigo-500/30"
                        : "bg-gray-800"
                    )}>
                      {tab.icon}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-lg">{tab.label}</span>
                      <span className="text-sm text-gray-400">
                        {tab.id === "profile" && "View your profile details"}
                        {tab.id === "points" && "Check your earned points"}
                        {tab.id === "missions" && "Available promotional tasks"}
                        {tab.id === "activity" && "Recent engagement history"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800">
              <div className="text-sm text-gray-400 text-center">
                <p>Select an option to navigate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}