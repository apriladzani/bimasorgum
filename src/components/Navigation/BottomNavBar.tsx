import React from 'react';

export type AppTab = 'home' | 'generate' | 'explore' | 'belajar' | 'profile';

interface BottomNavBarProps {
  currentTab: AppTab;
  onSelectTab: (tab: AppTab) => void;
}

const NAV_ITEMS: { tab: AppTab; label: string; ariaLabel: string; icon: string }[] = [
  { tab: 'home', label: 'Home', ariaLabel: 'Beranda', icon: 'home' },
  { tab: 'explore', label: 'Explore', ariaLabel: 'Eksplorasi Resep', icon: 'travel_explore' },
  { tab: 'belajar', label: 'Belajar', ariaLabel: 'Belajar Mengolah Sorgum', icon: 'menu_book' },
  { tab: 'generate', label: 'Generate', ariaLabel: 'Generate Resep AI', icon: 'magic_button' },
  { tab: 'profile', label: 'Profile', ariaLabel: 'Profil Pengguna', icon: 'person' },
];

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#F9F9F7] border-t border-[#c2c8c0]/60 shadow-lg flex justify-around items-center h-16 px-1 sm:px-4 pb-safe md:max-w-lg md:mx-auto md:bottom-3 md:rounded-full md:border md:shadow-2xl">
      {NAV_ITEMS.map(({ tab, label, ariaLabel, icon }) => {
        const isActive = currentTab === tab;
        return (
          <button
            key={tab}
            onClick={() => onSelectTab(tab)}
            className={`flex flex-col items-center justify-center transition-all duration-200 px-2.5 sm:px-4 py-1.5 rounded-full ${
              isActive
                ? 'bg-[#2d4b37] text-white shadow-xs'
                : 'text-[#424843] hover:bg-[#e2e3e1]'
            }`}
            aria-label={ariaLabel}
            aria-current={isActive ? 'page' : undefined}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {icon}
            </span>
            <span className="text-[10px] font-bold tracking-tight">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};
