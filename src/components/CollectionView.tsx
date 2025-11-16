import { Collection, Photo } from '../types';
import { ArrowLeft } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CollectionViewProps {
  collection: Collection;
  photos: Photo[];
  onBack: () => void;
  onPhotoClick: (photo: Photo) => void;
}

export function CollectionView({
  collection,
  photos,
  onBack,
  onPhotoClick,
}: CollectionViewProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Profile
        </button>

        {/* Collection Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-6 shadow-sm">
          <h1 className="text-3xl mb-2 dark:text-white">{collection.title}</h1>
          {collection.description && (
            <p className="text-gray-600 dark:text-gray-300 mb-4">{collection.description}</p>
          )}
          <p className="text-gray-500 dark:text-gray-400">
            {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
          </p>
        </div>

        {/* Photos Grid */}
        {photos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">No photos in this collection yet</p>
          </div>
        ) : (
          <Masonry columnsCount={4} gutter="16px">
            {photos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onPhotoClick(photo)}
                className="cursor-pointer group relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <ImageWithFallback
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white px-4">{photo.title}</p>
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
}
