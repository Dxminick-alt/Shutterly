import { useState } from 'react';
import { User, Photo, Collection } from '../types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Grid, Heart, Bookmark, UserPlus, UserCheck, FolderOpen, Settings } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfilePageProps {
  user: User;
  currentUser: User;
  photos: Photo[];
  likedPhotos: Photo[];
  savedPhotos: Photo[];
  collections: Collection[];
  isFollowing: boolean;
  onBack: () => void;
  onFollow: (userId: string) => void;
  onPhotoClick: (photo: Photo) => void;
  onCollectionClick: (collection: Collection) => void;
  onEditProfile: () => void;
}

export function ProfilePage({
  user,
  currentUser,
  photos,
  likedPhotos,
  savedPhotos,
  collections,
  isFollowing,
  onBack,
  onFollow,
  onPhotoClick,
  onCollectionClick,
  onEditProfile,
}: ProfilePageProps) {
  const isOwnProfile = user.id === currentUser.id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-3xl">{user.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl mb-2 dark:text-white">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{user.email}</p>
              {user.bio && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>
              )}

              <div className="flex gap-6 justify-center md:justify-start mb-4">
                <div>
                  <span className="dark:text-white">{photos.length}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">Photos</span>
                </div>
                <div>
                  <span className="dark:text-white">{user.followers.length}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">Followers</span>
                </div>
                <div>
                  <span className="dark:text-white">{user.following.length}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">Following</span>
                </div>
              </div>

              {isOwnProfile ? (
                <Button onClick={onEditProfile} variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button
                  onClick={() => onFollow(user.id)}
                  variant={isFollowing ? 'outline' : 'default'}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-4 h-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 dark:bg-gray-800">
            <TabsTrigger value="published" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
              <Grid className="w-4 h-4 mr-2" />
              Published
            </TabsTrigger>
            {isOwnProfile && (
              <>
                <TabsTrigger value="liked" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Liked
                </TabsTrigger>
                <TabsTrigger value="saved" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                  <Bookmark className="w-4 h-4 mr-2" />
                  Saved
                </TabsTrigger>
                <TabsTrigger value="collections" className="dark:text-gray-300 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Collections
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Published Photos */}
          <TabsContent value="published">
            {photos.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400">No published photos yet</p>
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
          </TabsContent>

          {/* Liked Photos */}
          {isOwnProfile && (
            <TabsContent value="liked">
              {likedPhotos.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400">No liked photos yet</p>
                </div>
              ) : (
                <Masonry columnsCount={4} gutter="16px">
                  {likedPhotos.map((photo) => (
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
            </TabsContent>
          )}

          {/* Saved Photos */}
          {isOwnProfile && (
            <TabsContent value="saved">
              {savedPhotos.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400">No saved photos yet</p>
                </div>
              ) : (
                <Masonry columnsCount={4} gutter="16px">
                  {savedPhotos.map((photo) => (
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
            </TabsContent>
          )}

          {/* Collections */}
          {isOwnProfile && (
            <TabsContent value="collections">
              {collections.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-500 dark:text-gray-400">No collections yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      onClick={() => onCollectionClick(collection)}
                      className="cursor-pointer group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                    >
                      {collection.coverImage ? (
                        <div className="aspect-video overflow-hidden">
                          <ImageWithFallback
                            src={collection.coverImage}
                            alt={collection.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <FolderOpen className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="mb-1 dark:text-white">{collection.title}</h3>
                        {collection.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {collection.description}
                          </p>
                        )}
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {collection.photoIds.length} photos
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}