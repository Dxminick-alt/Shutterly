import { X, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { User } from '../types';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (name: string, bio: string, avatar: string) => void;
}

export function EditProfileModal({ user, onClose, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || '',
    avatar: user.avatar || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData.name, formData.bio, formData.avatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl dark:text-white">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 dark:text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Preview */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback className="text-3xl">{formData.name[0]}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Profile Picture
              </p>
            </div>

            {/* Avatar URL */}
            <div>
              <label htmlFor="avatar" className="block mb-2 text-gray-700 dark:text-gray-300">
                Avatar URL
              </label>
              <Input
                id="avatar"
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Or use the auto-generated avatar based on your email
              </p>
            </div>

            {/* Name */}
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
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block mb-2 text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={4}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
