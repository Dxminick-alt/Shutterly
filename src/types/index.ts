export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: string[];
  following: string[];
}

export interface Photo {
  id: string;
  imageUrl: string;
  title: string;
  description?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  createdAt: string;
  category: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
}

export interface Collection {
  id: string;
  userId: string;
  title: string;
  description?: string;
  photoIds: string[];
  createdAt: string;
  coverImage?: string;
}

export interface SavedPhoto {
  photoId: string;
  collectionId?: string;
  savedAt: string;
}
