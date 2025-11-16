import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Camera, Moon, Sun } from 'lucide-react';
import { User } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import logo from 'figma:asset/0f1feb847eb75ef0890e38ba6254fe533acc0d86.png';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - create user
    const user: User = {
      id: 'current-user',
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
      bio: '',
      followers: [],
      following: [],
    };
    
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="fixed top-4 right-4 dark:text-white"
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </Button>

      <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={logo} 
              alt="Shutterly" 
              className="h-24 object-contain"
            />
          </div>
          <CardDescription className="dark:text-gray-300">
            {isSignup ? 'Create an account to share your photos' : 'Welcome back! Sign in to continue'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required={isSignup}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <Button type="submit" className="w-full">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}