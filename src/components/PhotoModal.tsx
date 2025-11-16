import { X, Heart, Download, Send, Bookmark, UserPlus, UserCheck, Trash2 } from 'lucide-react';
import { Photo, User } from '../types';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useState } from 'react';

interface PhotoModalProps {
  photo: Photo;
  currentUser: User;
  photoOwner: User | undefined;
  isFollowingOwner: boolean;
  onClose: () => void;
  onLike: (photoId: string) => void;
  onSave: (photoId: string) => void;
  onComment: (photoId: string, comment: string) => void;
  onDownloadClick: (photo: Photo) => void;
  onFollow: (userId: string) => void;
  onUserClick: (userId: string) => void;
  onDelete: (photoId: string) => void;
  isLiked: boolean;
  isSaved: boolean;
}

export function PhotoModal({
  photo,
  currentUser,
  photoOwner,
  isFollowingOwner,
  onClose,
  onLike,
  onSave,
  onComment,
  onDownloadClick,
  onFollow,
  onUserClick,
  onDelete,
  isLiked,
  isSaved,
}: PhotoModalProps) {
  const [commentText, setCommentText] = useState('');
  const isOwnPhoto = photo.userId === currentUser.id;

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onComment(photo.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          <ImageWithFallback
            src={photo.imageUrl}
            alt={photo.title}
            className="max-h-[90vh] w-full object-contain"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-96 flex flex-col dark:border-l dark:border-gray-700">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onUserClick(photo.userId)}
              >
                <Avatar>
                  <AvatarImage src={photo.userAvatar} alt={photo.userName} />
                  <AvatarFallback>{photo.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="dark:text-white">{photo.userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {!isOwnPhoto && photoOwner && (
                <Button
                  size="sm"
                  variant={isFollowingOwner ? 'outline' : 'default'}
                  onClick={() => onFollow(photo.userId)}
                >
                  {isFollowingOwner ? (
                    <UserCheck className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
            <h2 className="text-xl mb-2 dark:text-white">{photo.title}</h2>
            {photo.description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm">{photo.description}</p>
            )}
          </div>

          {/* Actions */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex gap-2">
            <Button
              variant={isLiked ? 'default' : 'outline'}
              onClick={() => onLike(photo.id)}
              className="flex-1"
            >
              <Heart
                className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`}
              />
              {photo.likes}
            </Button>
            <Button
              variant={isSaved ? 'default' : 'outline'}
              onClick={() => onSave(photo.id)}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </Button>
            <Button variant="outline" onClick={() => onDownloadClick(photo)}>
              <Download className="w-4 h-4" />
            </Button>
            {isOwnPhoto && (
              <Button 
                variant="destructive" 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this photo?')) {
                    onDelete(photo.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Comments */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {photo.comments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center text-sm py-8">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                photo.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar
                      className="w-8 h-8 flex-shrink-0 cursor-pointer"
                      onClick={() => onUserClick(comment.userId)}
                    >
                      <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                      <AvatarFallback>{comment.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span
                          className="mr-2 cursor-pointer hover:underline dark:text-white"
                          onClick={() => onUserClick(comment.userId)}
                        >
                          {comment.userName}
                        </span>
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {/* Comment Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmitComment();
                  }
                }}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <Button onClick={handleSubmitComment} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}