import { Heart, MessageCircle, Download, Bookmark } from 'lucide-react';
import { Photo } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface PhotoCardProps {
  photo: Photo;
  onPhotoClick: (photo: Photo) => void;
  onLike: (photoId: string) => void;
  onSave: (photoId: string) => void;
  isLiked: boolean;
  isSaved: boolean;
}

export function PhotoCard({ photo, onPhotoClick, onLike, onSave, isLiked, isSaved }: PhotoCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = photo.imageUrl;
    link.download = `${photo.title}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onPhotoClick(photo)}
    >
      <ImageWithFallback
        src={photo.imageUrl}
        alt={photo.title}
        className="w-full h-auto"
      />
      
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="flex justify-end gap-2 pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave(photo.id);
            }}
            className={`p-2 rounded-full ${
              isSaved ? 'bg-blue-500' : 'bg-white/90'
            } hover:scale-110 transition-transform`}
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved ? 'fill-white text-white' : 'text-gray-900'}`}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(photo.id);
            }}
            className={`p-2 rounded-full ${
              isLiked ? 'bg-red-500' : 'bg-white/90'
            } hover:scale-110 transition-transform`}
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? 'fill-white text-white' : 'text-gray-900'}`}
            />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 rounded-full bg-white/90 hover:scale-110 transition-transform"
          >
            <Download className="w-5 h-5 text-gray-900" />
          </button>
        </div>

        <div className="text-white pointer-events-none">
          <h3 className="mb-2">{photo.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={photo.userAvatar} alt={photo.userName} />
              <AvatarFallback>{photo.userName[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{photo.userName}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {photo.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {photo.comments.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}