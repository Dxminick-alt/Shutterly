import { X, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Photo } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface DownloadModalProps {
  photo: Photo;
  onClose: () => void;
  onDownload: (photoId: string, dimension: string) => void;
}

const dimensions = [
  { label: 'Small', value: 'small', width: 640, height: 480 },
  { label: 'Medium', value: 'medium', width: 1920, height: 1080 },
  { label: 'Large', value: 'large', width: 2560, height: 1440 },
  { label: 'Original', value: 'original', width: 'Original', height: 'Size' },
];

export function DownloadModal({ photo, onClose, onDownload }: DownloadModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl dark:text-white">Download Photo</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 dark:text-white" />
            </button>
          </div>

          <div className="mb-6">
            <ImageWithFallback
              src={photo.imageUrl}
              alt={photo.title}
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="mt-2 dark:text-white">{photo.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">by {photo.userName}</p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Select a dimension to download:
            </p>
            {dimensions.map((dimension) => (
              <button
                key={dimension.value}
                onClick={() => {
                  onDownload(photo.id, dimension.value);
                  onClose();
                }}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-900 dark:hover:border-gray-500 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="dark:text-white group-hover:font-medium">
                      {dimension.label}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {dimension.width} × {dimension.height}
                    </p>
                  </div>
                  <Download className="w-5 h-5 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
            Free to use under the Shutterly License
          </p>
        </div>
      </div>
    </div>
  );
}
