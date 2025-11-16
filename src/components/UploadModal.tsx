import { X, Upload } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { User } from '../types';

interface UploadModalProps {
  currentUser: User;
  onClose: () => void;
  onUpload: (title: string, description: string, category: string, imageUrl: string) => void;
}

export function UploadModal({ currentUser, onClose, onUpload }: UploadModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Portrait',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.imageUrl) {
      onUpload(formData.title, formData.description, formData.category, formData.imageUrl);
      onClose();
    }
  };

  const categories = [
    'Portrait',
    'Landscape',
    'Wedding',
    'Street',
    'Food',
    'Architecture',
    'Fashion',
    'Travel',
    'Wildlife',
    'Abstract',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl dark:text-white">Upload Photo</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 dark:text-white" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="imageUrl" className="block mb-2 text-gray-700 dark:text-gray-300">
                Image URL *
              </label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Paste a URL to an image you want to share
              </p>
            </div>

            {formData.imageUrl && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-auto rounded"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    e.currentTarget.alt = 'Failed to load image';
                  }}
                />
              </div>
            )}

            <div>
              <label htmlFor="title" className="block mb-2 text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Give your photo a title"
                required
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 text-gray-700 dark:text-gray-300">
                Description
              </label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your photo..."
                rows={3}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 text-gray-700 dark:text-gray-300">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}