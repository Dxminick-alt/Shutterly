import Masonry from 'react-responsive-masonry';
import { Photo } from '../types';
import { PhotoCard } from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  onLike: (photoId: string) => void;
  onSave: (photoId: string) => void;
  likedPhotos: Set<string>;
  savedPhotos: Set<string>;
}

export function PhotoGrid({ photos, onPhotoClick, onLike, onSave, likedPhotos, savedPhotos }: PhotoGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Masonry columnsCount={4} gutter="16px">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onPhotoClick={onPhotoClick}
            onLike={onLike}
            onSave={onSave}
            isLiked={likedPhotos.has(photo.id)}
            isSaved={savedPhotos.has(photo.id)}
          />
        ))}
      </Masonry>
    </div>
  );
}