import React from 'react';
import { WalletConnect } from './components/WalletConnect';
import { TwitterConnect } from './components/TwitterConnect';
import { Updates } from './components/Updates';
import { Stats } from './components/Stats';
import { Goals } from './components/Goals';
import { Profile } from './pages/Profile';
import { Missions } from './pages/Missions';
import { Points } from './pages/Points';
import { Activity } from './pages/Activity';
import { CustomCursor } from './components/CustomCursor';
import { PriceTicker } from './components/PriceTicker';
import { Backers } from './components/Backers';
import { Logo } from './components/Logo';
import { MainNav } from "./components/navigation/MainNav";
import { Footer } from './components/Footer';
import { StarryBackground } from './components/StarryBackground';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState<"home" | "profile" | "missions" | "points" | "activity">("home");

  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <Profile />;
      case "missions":
        return <Missions />;
      case "points":
        return <Points />;
      case "activity":
        return <Activity />;
      default:
        return (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
            <div className="text-center mb-12 relative smooth-transition">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/5 via-transparent to-transparent" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] transform hover:scale-105 transition-transform duration-300">
                The ultimate factory of moon-bound projects
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience the future of web3 social engagement through our innovative platform
              </p>
            </div>

            <div className="flex flex-col items-center gap-8">
              <Stats />
              <Updates />
              <Goals />
              <Backers />
            </div>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <StarryBackground />
      <CustomCursor />
      
      <nav className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-md bg-[var(--black-space)]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Logo onNavigate={setCurrentPage} />
            <div className="hidden md:flex items-center gap-4">
              <MainNav currentPage={currentPage} onNavigate={setCurrentPage} />
              <div className="flex items-center gap-2">
                <TwitterConnect />
                <WalletConnect />
              </div>
            </div>
            <div className="flex md:hidden items-center gap-2">
              <TwitterConnect />
              <WalletConnect />
              <MainNav currentPage={currentPage} onNavigate={setCurrentPage} />
            </div>
          </div>
        </div>
      </nav>

      {renderPage()}
      <Footer />
      <PriceTicker />
    </div>
  );
}