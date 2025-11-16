import { Camera, Search, Upload, User as UserIcon, LogOut, Moon, Sun } from 'lucide-react';
import { User } from '../types';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useTheme } from '../contexts/ThemeContext';
import logo from 'figma:asset/0f1feb847eb75ef0890e38ba6254fe533acc0d86.png';

interface TopNavigationProps {
  user: User;
  onLogout: () => void;
  onUploadClick: () => void;
  onProfileClick: () => void;
  onLogoClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TopNavigation({
  user,
  onLogout,
  onUploadClick,
  onProfileClick,
  onLogoClick,
  searchQuery,
  onSearchChange,
}: TopNavigationProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <img 
              src={logo} 
              alt="Shutterly" 
              className="h-10 object-contain"
            />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="dark:text-white"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <Button onClick={onUploadClick} size="sm" className="hidden sm:flex">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            
            <Button onClick={onUploadClick} size="sm" className="sm:hidden">
              <Upload className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-2 py-2">
                  <p className="text-sm dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem onClick={onProfileClick} className="dark:text-white dark:hover:bg-gray-700">
                  <UserIcon className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem onClick={onLogout} className="dark:text-white dark:hover:bg-gray-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}