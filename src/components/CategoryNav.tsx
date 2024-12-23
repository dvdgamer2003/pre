import React, { useState } from 'react';
import { 
  Menu as MenuIcon,
  Newspaper,
  Radio,
  History,
  Laptop,
  Trophy,
  Landmark,
  Building2,
  Film,
  Heart,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Category } from '@/types/categories';

interface CategoryNavProps {
  onSelect: (category: Category) => void;
  selectedCategory: Category | undefined;
}

const MENU_SECTIONS = {
  main: [
    { id: 'all', label: 'All News', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'technology', label: 'Technology', icon: <Laptop className="w-4 h-4" /> },
    { id: 'sports', label: 'Sports', icon: <Trophy className="w-4 h-4" /> },
    { id: 'politics', label: 'Politics', icon: <Landmark className="w-4 h-4" /> },
    { id: 'business', label: 'Business', icon: <Building2 className="w-4 h-4" /> },
    { id: 'entertainment', label: 'Entertainment', icon: <Film className="w-4 h-4" /> },
    { id: 'health', label: 'Health', icon: <Heart className="w-4 h-4" /> },
  ],
  features: [
    { id: 'bulletin', label: 'News Bulletin', icon: <Radio className="w-4 h-4" />, path: '/bulletin' },
    { id: 'archive', label: 'Old News Archive', icon: <History className="w-4 h-4" />, path: '/old-news' },
  ]
};

export function CategoryNav({ onSelect, selectedCategory }: CategoryNavProps) {
  const [sectionsState, setSectionsState] = useState({
    main: true,
    features: true
  });

  const toggleSection = (section: keyof typeof sectionsState) => {
    setSectionsState(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <nav className="space-y-6">
      {/* Main Menu */}
      <div>
        <button 
          onClick={() => toggleSection('main')}
          className="w-full flex items-center justify-between gap-2 mb-4 group"
        >
          <div className="flex items-center gap-2">
            <MenuIcon className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">Menu</h2>
          </div>
          {sectionsState.main ? (
            <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          )}
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          sectionsState.main ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="space-y-1">
            {MENU_SECTIONS.main.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item.id === 'all' ? undefined : item.id as Category)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ${
                    (item.id === 'all' && !selectedCategory) || selectedCategory === item.id
                      ? 'bg-primary/10 text-primary font-medium dark:bg-primary/20'
                      : 'text-secondary hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features */}
      <div>
        <button 
          onClick={() => toggleSection('features')}
          className="w-full flex items-center justify-between gap-2 mb-4 group"
        >
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold group-hover:text-primary transition-colors">Features</h2>
          </div>
          {sectionsState.features ? (
            <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
          )}
        </button>
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          sectionsState.features ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="space-y-1">
            {MENU_SECTIONS.features.map(item => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg text-secondary hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}