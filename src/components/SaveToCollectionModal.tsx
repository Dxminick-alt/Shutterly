import { X, Plus, FolderOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Collection } from '../types';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';

interface SaveToCollectionModalProps {
  collections: Collection[];
  onClose: () => void;
  onSaveToCollection: (collectionId?: string) => void;
  onCreateCollection: (title: string, description: string) => string;
}

export function SaveToCollectionModal({
  collections,
  onClose,
  onSaveToCollection,
  onCreateCollection,
}: SaveToCollectionModalProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newCollection, setNewCollection] = useState({ title: '', description: '' });

  const handleCreateAndSave = () => {
    if (newCollection.title.trim()) {
      const collectionId = onCreateCollection(newCollection.title, newCollection.description);
      onSaveToCollection(collectionId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-lg w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl dark:text-white">Save to Collection</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 dark:text-white" />
            </button>
          </div>
        </div>

        <ScrollArea className="max-h-96 p-6">
          <div className="space-y-3">
            {/* Save to general */}
            <button
              onClick={() => {
                onSaveToCollection();
                onClose();
              }}
              className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-900 dark:hover:border-gray-500 hover:shadow-md transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <FolderOpen className="w-6 h-6 dark:text-white" />
                <div>
                  <p className="dark:text-white">All Saved</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    General saved photos
                  </p>
                </div>
              </div>
            </button>

            {/* Existing collections */}
            {collections.map((collection) => (
              <button
                key={collection.id}
                onClick={() => {
                  onSaveToCollection(collection.id);
                  onClose();
                }}
                className="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-900 dark:hover:border-gray-500 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  {collection.coverImage ? (
                    <img
                      src={collection.coverImage}
                      alt={collection.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <FolderOpen className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="dark:text-white">{collection.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {collection.photoIds.length} photos
                    </p>
                  </div>
                </div>
              </button>
            ))}

            {/* Create new collection */}
            {!isCreating ? (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-gray-900 dark:hover:border-gray-400 transition-all"
              >
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
                  <Plus className="w-5 h-5" />
                  <span>Create New Collection</span>
                </div>
              </button>
            ) : (
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
                <Input
                  placeholder="Collection title"
                  value={newCollection.title}
                  onChange={(e) =>
                    setNewCollection({ ...newCollection, title: e.target.value })
                  }
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  autoFocus
                />
                <Input
                  placeholder="Description (optional)"
                  value={newCollection.description}
                  onChange={(e) =>
                    setNewCollection({ ...newCollection, description: e.target.value })
                  }
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsCreating(false);
                      setNewCollection({ title: '', description: '' });
                    }}
                    className="flex-1 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAndSave} className="flex-1">
                    Create & Save
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
