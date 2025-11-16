import { X, Upload, Link, Image } from 'lucide-react';
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
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file'); // Default to file upload
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Portrait',
    imageUrl: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>('');

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('Please select a valid image file (JPG, PNG, GIF, or WebP)');
      setSelectedFile(null);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File is too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      setSelectedFile(null);
      return;
    }

    setFileError('');
    setSelectedFile(file);

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, imageUrl: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.imageUrl) {
      onUpload(formData.title, formData.description, formData.category, formData.imageUrl);
      onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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
            {/* Upload Mode Toggle */}
            <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setUploadMode('file');
                  setFormData({ ...formData, imageUrl: '' });
                  setFileError('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  uploadMode === 'file'
                    ? 'bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Image className="w-4 h-4" />
                Upload from PC
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadMode('url');
                  setFormData({ ...formData, imageUrl: '' });
                  setSelectedFile(null);
                  setFileError('');
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  uploadMode === 'url'
                    ? 'bg-white dark:bg-gray-800 shadow text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Link className="w-4 h-4" />
                Image URL
              </button>
            </div>

            {/* File Upload Mode */}
            {uploadMode === 'file' && (
              <div>
                <label htmlFor="fileInput" className="block mb-2 text-gray-700 dark:text-gray-300">
                  Choose Image *
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white dark:file:bg-white dark:file:text-gray-900 hover:file:bg-gray-700 dark:hover:file:bg-gray-200"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Max size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                </p>
                {selectedFile && (
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    ✓ {selectedFile.name} ({formatFileSize(selectedFile.size)})
                  </p>
                )}
                {fileError && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    ✗ {fileError}
                  </p>
                )}
              </div>
            )}

            {/* URL Mode */}
            {uploadMode === 'url' && (
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
            )}

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