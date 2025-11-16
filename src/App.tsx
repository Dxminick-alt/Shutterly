import { useState, useMemo, useEffect } from 'react';
import { User, Photo, Comment, Collection, SavedPhoto } from './types';
import { mockPhotos, mockUsers } from './lib/mockData';
import * as storage from './lib/storage';
import { LoginPage } from './components/LoginPage';
import { TopNavigation } from './components/TopNavigation';
import { PhotoGrid } from './components/PhotoGrid';
import { PhotoModal } from './components/PhotoModal';
import { UploadModal } from './components/UploadModal';
import { DownloadModal } from './components/DownloadModal';
import { SaveToCollectionModal } from './components/SaveToCollectionModal';
import { ProfilePage } from './components/ProfilePage';
import { CollectionView } from './components/CollectionView';
import { EditProfileModal } from './components/EditProfileModal';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  // Initialize from localStorage or use defaults
  const [currentUser, setCurrentUser] = useState<User | null>(() => storage.getCurrentUser());
  const [users, setUsers] = useState<User[]>(() => {
    const stored = storage.getUsers();
    return stored.length > 0 ? stored : mockUsers;
  });
  const [photos, setPhotos] = useState<Photo[]>(() => {
    const stored = storage.getPhotos();
    return stored.length > 0 ? stored : mockPhotos;
  });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoToDownload, setPhotoToDownload] = useState<Photo | null>(null);
  const [photoToSave, setPhotoToSave] = useState<Photo | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(() => storage.getLikedPhotos());
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>(() => storage.getSavedPhotos());
  const [collections, setCollections] = useState<Collection[]>(() => storage.getCollections());
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingProfile, setViewingProfile] = useState<string | null>(null);
  const [viewingCollection, setViewingCollection] = useState<Collection | null>(null);

  // Initialize database on first load
  useEffect(() => {
    storage.initializeDatabase(mockUsers, mockPhotos);
  }, []);

  // Persist users to localStorage
  useEffect(() => {
    if (users.length > 0) {
      storage.saveUsers(users);
    }
  }, [users]);

  // Persist photos to localStorage
  useEffect(() => {
    if (photos.length > 0) {
      storage.savePhotos(photos);
    }
  }, [photos]);

  // Persist current user
  useEffect(() => {
    storage.saveCurrentUser(currentUser);
  }, [currentUser]);

  // Persist liked photos
  useEffect(() => {
    storage.saveLikedPhotos(likedPhotos);
  }, [likedPhotos]);

  // Persist saved photos
  useEffect(() => {
    storage.saveSavedPhotos(savedPhotos);
  }, [savedPhotos]);

  // Persist collections
  useEffect(() => {
    storage.saveCollections(collections);
  }, [collections]);

  const handleLogin = (user: User) => {
    // Check if user exists, otherwise create new user
    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
      setCurrentUser(existingUser);
    } else {
      const newUser: User = {
        ...user,
        followers: [],
        following: [],
        bio: '',
      };
      setUsers((prev) => [...prev, newUser]);
      setCurrentUser(newUser);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLikedPhotos(new Set());
    setSavedPhotos([]);
    setCollections([]);
    setViewingProfile(null);
    setViewingCollection(null);
  };

  const handleLogoClick = () => {
    setViewingProfile(null);
    setViewingCollection(null);
    setSearchQuery('');
  };

  const handleEditProfile = (name: string, bio: string, avatar: string) => {
    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      name,
      bio,
      avatar,
    };

    setCurrentUser(updatedUser);

    // Update user in users list
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? updatedUser : u))
    );

    // Update user info in photos
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.userId === currentUser.id
          ? { ...photo, userName: name, userAvatar: avatar }
          : photo
      )
    );
  };

  const handleLike = (photoId: string) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) => {
        if (photo.id === photoId) {
          const isLiked = likedPhotos.has(photoId);
          return {
            ...photo,
            likes: isLiked ? photo.likes - 1 : photo.likes + 1,
          };
        }
        return photo;
      })
    );

    setLikedPhotos((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(photoId)) {
        newLiked.delete(photoId);
      } else {
        newLiked.add(photoId);
      }
      return newLiked;
    });

    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto((prev) =>
        prev
          ? {
              ...prev,
              likes: likedPhotos.has(photoId) ? prev.likes - 1 : prev.likes + 1,
            }
          : null
      );
    }
  };

  const handleSave = (photoId: string) => {
    const isAlreadySaved = savedPhotos.some((sp) => sp.photoId === photoId);
    
    if (isAlreadySaved) {
      // Unsave
      setSavedPhotos((prev) => prev.filter((sp) => sp.photoId !== photoId));
      // Remove from collections
      setCollections((prev) =>
        prev.map((collection) => ({
          ...collection,
          photoIds: collection.photoIds.filter((id) => id !== photoId),
        }))
      );
    } else {
      // Show save to collection modal
      setPhotoToSave(photos.find((p) => p.id === photoId) || null);
    }
  };

  const handleSaveToCollection = (photoId: string, collectionId?: string) => {
    const savedPhoto: SavedPhoto = {
      photoId,
      collectionId,
      savedAt: new Date().toISOString(),
    };

    setSavedPhotos((prev) => [...prev, savedPhoto]);

    if (collectionId) {
      setCollections((prev) =>
        prev.map((collection) =>
          collection.id === collectionId
            ? {
                ...collection,
                photoIds: [...collection.photoIds, photoId],
                coverImage: collection.coverImage || photos.find((p) => p.id === photoId)?.imageUrl,
              }
            : collection
        )
      );
    }
  };

  const handleCreateCollection = (title: string, description: string): string => {
    const newCollection: Collection = {
      id: `collection-${Date.now()}`,
      userId: currentUser!.id,
      title,
      description,
      photoIds: [],
      createdAt: new Date().toISOString(),
    };

    setCollections((prev) => [...prev, newCollection]);
    return newCollection.id;
  };

  const handleComment = (photoId: string, commentText: string) => {
    if (!currentUser) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) => {
        if (photo.id === photoId) {
          return {
            ...photo,
            comments: [...photo.comments, newComment],
          };
        }
        return photo;
      })
    );

    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, newComment],
            }
          : null
      );
    }
  };

  const handleDownload = (photoId: string, dimension: string) => {
    const photo = photos.find((p) => p.id === photoId);
    if (photo) {
      const link = document.createElement('a');
      link.href = photo.imageUrl;
      link.download = `${photo.title}-${dimension}.jpg`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleUpload = (
    title: string,
    description: string,
    category: string,
    imageUrl: string
  ) => {
    if (!currentUser) return;

    const newPhoto: Photo = {
      id: `photo-${Date.now()}`,
      imageUrl,
      title,
      description,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      likes: 0,
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString(),
      category,
    };

    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleFollow = (userId: string) => {
    if (!currentUser) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          const isFollowing = user.followers.includes(currentUser.id);
          return {
            ...user,
            followers: isFollowing
              ? user.followers.filter((id) => id !== currentUser.id)
              : [...user.followers, currentUser.id],
          };
        }
        if (user.id === currentUser.id) {
          const isFollowing = user.following.includes(userId);
          return {
            ...user,
            following: isFollowing
              ? user.following.filter((id) => id !== userId)
              : [...user.following, userId],
          };
        }
        return user;
      })
    );

    // Update current user
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const isFollowing = prev.following.includes(userId);
      return {
        ...prev,
        following: isFollowing
          ? prev.following.filter((id) => id !== userId)
          : [...prev.following, userId],
      };
    });
  };

  const filteredPhotos = useMemo(() => {
    if (!searchQuery.trim()) return photos;
    
    const query = searchQuery.toLowerCase();
    return photos.filter(
      (photo) =>
        photo.title.toLowerCase().includes(query) ||
        photo.description?.toLowerCase().includes(query) ||
        photo.category.toLowerCase().includes(query) ||
        photo.userName.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  const savedPhotoSet = useMemo(() => {
    return new Set(savedPhotos.map((sp) => sp.photoId));
  }, [savedPhotos]);

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Collection view
  if (viewingCollection) {
    const collectionPhotos = photos.filter((photo) =>
      viewingCollection.photoIds.includes(photo.id)
    );

    return (
      <CollectionView
        collection={viewingCollection}
        photos={collectionPhotos}
        onBack={() => setViewingCollection(null)}
        onPhotoClick={setSelectedPhoto}
      />
    );
  }

  // Profile view
  if (viewingProfile) {
    const profileUser = users.find((u) => u.id === viewingProfile);
    if (!profileUser) {
      setViewingProfile(null);
      return null;
    }

    const userPhotos = photos.filter((photo) => photo.userId === viewingProfile);
    const userLikedPhotos = photos.filter((photo) => likedPhotos.has(photo.id));
    const userSavedPhotos = photos.filter((photo) => savedPhotoSet.has(photo.id));
    const userCollections = collections.filter((c) => c.userId === viewingProfile);
    const isFollowing = currentUser.following.includes(viewingProfile);

    return (
      <>
        <TopNavigation
          user={currentUser}
          onLogout={handleLogout}
          onUploadClick={() => setShowUploadModal(true)}
          onProfileClick={() => setViewingProfile(currentUser.id)}
          onLogoClick={handleLogoClick}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <ProfilePage
          user={profileUser}
          currentUser={currentUser}
          photos={userPhotos}
          likedPhotos={userLikedPhotos}
          savedPhotos={userSavedPhotos}
          collections={userCollections}
          isFollowing={isFollowing}
          onBack={handleLogoClick}
          onFollow={handleFollow}
          onPhotoClick={setSelectedPhoto}
          onCollectionClick={setViewingCollection}
          onEditProfile={() => setShowEditProfile(true)}
        />

        {selectedPhoto && (
          <PhotoModal
            photo={selectedPhoto}
            currentUser={currentUser}
            photoOwner={users.find((u) => u.id === selectedPhoto.userId)}
            isFollowingOwner={currentUser.following.includes(selectedPhoto.userId)}
            onClose={() => setSelectedPhoto(null)}
            onLike={handleLike}
            onSave={handleSave}
            onComment={handleComment}
            onDownloadClick={setPhotoToDownload}
            onFollow={handleFollow}
            onUserClick={setViewingProfile}
            isLiked={likedPhotos.has(selectedPhoto.id)}
            isSaved={savedPhotoSet.has(selectedPhoto.id)}
          />
        )}

        {showUploadModal && (
          <UploadModal
            currentUser={currentUser}
            onClose={() => setShowUploadModal(false)}
            onUpload={handleUpload}
          />
        )}

        {showEditProfile && (
          <EditProfileModal
            user={currentUser}
            onClose={() => setShowEditProfile(false)}
            onSave={handleEditProfile}
          />
        )}
      </>
    );
  }

  // Main feed view
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavigation
        user={currentUser}
        onLogout={handleLogout}
        onUploadClick={() => setShowUploadModal(true)}
        onProfileClick={() => setViewingProfile(currentUser.id)}
        onLogoClick={handleLogoClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="pt-16">
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-xl">
              {searchQuery ? 'No photos found matching your search' : 'No photos yet'}
            </p>
          </div>
        ) : (
          <PhotoGrid
            photos={filteredPhotos}
            onPhotoClick={setSelectedPhoto}
            onLike={handleLike}
            onSave={handleSave}
            likedPhotos={likedPhotos}
            savedPhotos={savedPhotoSet}
          />
        )}
      </div>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          currentUser={currentUser}
          photoOwner={users.find((u) => u.id === selectedPhoto.userId)}
          isFollowingOwner={currentUser.following.includes(selectedPhoto.userId)}
          onClose={() => setSelectedPhoto(null)}
          onLike={handleLike}
          onSave={handleSave}
          onComment={handleComment}
          onDownloadClick={setPhotoToDownload}
          onFollow={handleFollow}
          onUserClick={setViewingProfile}
          isLiked={likedPhotos.has(selectedPhoto.id)}
          isSaved={savedPhotoSet.has(selectedPhoto.id)}
        />
      )}

      {showUploadModal && (
        <UploadModal
          currentUser={currentUser}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}

      {photoToDownload && (
        <DownloadModal
          photo={photoToDownload}
          onClose={() => setPhotoToDownload(null)}
          onDownload={handleDownload}
        />
      )}

      {photoToSave && (
        <SaveToCollectionModal
          collections={collections}
          onClose={() => setPhotoToSave(null)}
          onSaveToCollection={(collectionId) => {
            handleSaveToCollection(photoToSave.id, collectionId);
            setPhotoToSave(null);
          }}
          onCreateCollection={handleCreateCollection}
        />
      )}

      {showEditProfile && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setShowEditProfile(false)}
          onSave={handleEditProfile}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}