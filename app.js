// Shutterly - Photo Sharing Platform
// Sample Data
const samplePhotos = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=60',
        title: 'Mountain Sunrise',
        author: 'John Doe',
        category: 'nature',
        description: 'Golden hour in the mountains',
        views: 1234,
        avatar: 'https://i.pravatar.cc/150?img=12'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=60',
        title: 'City Lights',
        author: 'Jane Smith',
        category: 'architecture',
        description: 'Urban nightscape',
        views: 2340,
        avatar: 'https://i.pravatar.cc/150?img=20'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=60',
        title: 'Forest Path',
        author: 'Mike Wilson',
        category: 'nature',
        description: 'Morning walk through the woods',
        views: 987,
        avatar: 'https://i.pravatar.cc/150?img=33'
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60',
        title: 'Portrait Study',
        author: 'Sarah Lee',
        category: 'portrait',
        description: 'Natural light portrait',
        views: 3456,
        avatar: 'https://i.pravatar.cc/150?img=45'
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=60',
        title: 'Desert Sunset',
        author: 'Alex Chen',
        category: 'landscape',
        description: 'Colors of the desert',
        views: 1876,
        avatar: 'https://i.pravatar.cc/150?img=60'
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?auto=format&fit=crop&w=800&q=60',
        title: 'Urban Streets',
        author: 'David Brown',
        category: 'street',
        description: 'Life in the city',
        views: 2890,
        avatar: 'https://i.pravatar.cc/150?img=8'
    },
    {
        id: 7,
        url: 'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&w=800&q=60',
        title: 'Ocean Waves',
        author: 'Emma Davis',
        category: 'nature',
        description: 'Peaceful coastal view',
        views: 3421,
        avatar: 'https://i.pravatar.cc/150?img=25'
    },
    {
        id: 8,
        url: 'https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=800&q=60',
        title: 'Mountain Lake',
        author: 'Chris Wilson',
        category: 'landscape',
        description: 'Reflections in crystal water',
        views: 2156,
        avatar: 'https://i.pravatar.cc/150?img=15'
    },
    {
        id: 9,
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60',
        title: 'Starry Night',
        author: 'Lisa Martinez',
        category: 'nature',
        description: 'Milky way over mountains',
        views: 4123,
        avatar: 'https://i.pravatar.cc/150?img=30'
    },
    {
        id: 10,
        url: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=60',
        title: 'Modern Architecture',
        author: 'Tom Anderson',
        category: 'architecture',
        description: 'Geometric building design',
        views: 1987,
        avatar: 'https://i.pravatar.cc/150?img=40'
    },
    {
        id: 11,
        url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60',
        title: 'Fashion Portrait',
        author: 'Nina Johnson',
        category: 'portrait',
        description: 'Studio fashion shoot',
        views: 5234,
        avatar: 'https://i.pravatar.cc/150?img=50'
    },
    {
        id: 12,
        url: 'https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?auto=format&fit=crop&w=800&q=60',
        title: 'Coffee Culture',
        author: 'Mark Taylor',
        category: 'street',
        description: 'Morning cafe vibes',
        views: 1543,
        avatar: 'https://i.pravatar.cc/150?img=18'
    },
    {
        id: 13,
        url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=60',
        title: 'Tropical Paradise',
        author: 'Rachel Green',
        category: 'landscape',
        description: 'Beach sunset views',
        views: 3876,
        avatar: 'https://i.pravatar.cc/150?img=22'
    },
    {
        id: 14,
        url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=60',
        title: 'Autumn Colors',
        author: 'Peter Kim',
        category: 'nature',
        description: 'Fall foliage glory',
        views: 2654,
        avatar: 'https://i.pravatar.cc/150?img=35'
    },
    {
        id: 15,
        url: 'https://images.unsplash.com/photo-1448932223592-d1fc686e76ea?auto=format&fit=crop&w=800&q=60',
        title: 'City Skyline',
        author: 'Anna White',
        category: 'architecture',
        description: 'Downtown at dusk',
        views: 3145,
        avatar: 'https://i.pravatar.cc/150?img=28'
    }
];

// State
let currentPhotos = [...samplePhotos];
let currentCategory = 'all';
let currentUser = null;
let currentPhoto = null;

// DOM Elements
const elements = {
    photoGrid: document.getElementById('photoGrid'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    homeLink: document.getElementById('homeLink'),
    themeToggle: document.getElementById('themeToggle'),
    profileBtn: document.getElementById('profileBtn'),
    createBtn: document.getElementById('createBtn'),
    
    // Modals
    loginModal: document.getElementById('loginModal'),
    photoModal: document.getElementById('photoModal'),
    uploadModal: document.getElementById('uploadModal'),
    profileModal: document.getElementById('profileModal'),
    collectionModal: document.getElementById('collectionModal'),
    downloadModal: document.getElementById('downloadModal'),
    editProfileModal: document.getElementById('editProfileModal'),
    
    // Login
    loginName: document.getElementById('loginName'),
    loginAvatar: document.getElementById('loginAvatar'),
    loginSubmit: document.getElementById('loginSubmit'),
    loginThemeToggle: document.getElementById('loginThemeToggle'),
    
    // Photo Detail
    modalPhoto: document.getElementById('modalPhoto'),
    photoTitle: document.getElementById('photoTitle'),
    photoAuthor: document.getElementById('photoAuthor'),
    photoDescription: document.getElementById('photoDescription'),
    authorAvatar: document.getElementById('authorAvatar'),
    followBtn: document.getElementById('followBtn'),
    likeBtn: document.getElementById('likeBtn'),
    saveBtn: document.getElementById('saveBtn'),
    downloadBtn: document.getElementById('downloadBtn'),
    viewCount: document.getElementById('viewCount'),
    likeCount: document.getElementById('likeCount'),
    statLikes: document.getElementById('statLikes'),
    statSaves: document.getElementById('statSaves'),
    statComments: document.getElementById('statComments'),
    commentsList: document.getElementById('commentsList'),
    commentInput: document.getElementById('commentInput'),
    commentSubmit: document.getElementById('commentSubmit'),
    
    // Upload
    uploadArea: document.getElementById('uploadArea'),
    photoFile: document.getElementById('photoFile'),
    uploadForm: document.getElementById('uploadForm'),
    uploadTitle: document.getElementById('uploadTitle'),
    uploadDescription: document.getElementById('uploadDescription'),
    uploadCategory: document.getElementById('uploadCategory'),
    
    // Profile
    profileAvatar: document.getElementById('profileAvatar'),
    profileName: document.getElementById('profileName'),
    userLikes: document.getElementById('userLikes'),
    userSaves: document.getElementById('userSaves'),
    userComments: document.getElementById('userComments'),
    editProfileBtn: document.getElementById('editProfileBtn'),
    
    // Edit Profile
    editName: document.getElementById('editName'),
    editAvatar: document.getElementById('editAvatar'),
    saveProfileBtn: document.getElementById('saveProfileBtn'),
    
    // Collections
    collectionsList: document.getElementById('collectionsList'),
    newCollectionName: document.getElementById('newCollectionName'),
    createCollectionBtn: document.getElementById('createCollectionBtn')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initUser();
    renderPhotos(currentPhotos);
    setupEventListeners();
    
    // Show login if no user
    if (!currentUser && elements.loginModal) {
        elements.loginModal.style.display = 'flex';
    }
});

// Theme
function initTheme() {
    const theme = localStorage.getItem('shutterly_theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    updateThemeIcons();
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('shutterly_theme', isDark ? 'dark' : 'light');
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.body.classList.contains('dark-theme');
    const icon = isDark ? 'fa-sun' : 'fa-moon';
    
    // Update navbar theme toggle icon
    if (elements.themeToggle) {
        const navIcon = elements.themeToggle.querySelector('i');
        if (navIcon) {
            navIcon.className = `fas ${icon}`;
        }
    }
    
    // Update login theme toggle icon
    if (elements.loginThemeToggle) {
        const loginIcon = elements.loginThemeToggle.querySelector('i');
        if (loginIcon) {
            loginIcon.className = `fas ${icon}`;
        }
    }
}

// User Management
function initUser() {
    try {
        const saved = localStorage.getItem('shutterly_user');
        if (saved) {
            currentUser = JSON.parse(saved);
        }
    } catch (e) {
        console.error('Failed to load user', e);
    }
}

function saveUser(user) {
    currentUser = user;
    localStorage.setItem('shutterly_user', JSON.stringify(user));
}

// Photo Rendering
function renderPhotos(photos) {
    if (!elements.photoGrid) return;
    
    elements.photoGrid.innerHTML = '';
    
    if (photos.length === 0) {
        elements.photoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-light);">No photos found</p>';
        return;
    }
    
    photos.forEach(photo => {
        const card = createPhotoCard(photo);
        elements.photoGrid.appendChild(card);
    });
}

function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}" loading="lazy">
        <div class="photo-overlay">
            <button class="overlay-download" title="Quick download">
                <i class="fas fa-download"></i>
            </button>
        </div>
        <div class="photo-info">
            <h4>${photo.title}</h4>
            <p>By ${photo.author}</p>
        </div>
    `;
    
    // Quick download
    const downloadBtn = card.querySelector('.overlay-download');
    if (downloadBtn) {
        downloadBtn.onclick = (e) => {
            e.stopPropagation();
            downloadPhoto(photo, 1280);
        };
    }
    
    // Open detail
    card.onclick = () => openPhotoDetail(photo);
    
    return card;
}

// Photo Detail
function openPhotoDetail(photo) {
    currentPhoto = photo;
    
    if (!elements.photoModal) return;
    
    // Load data
    const likesKey = `likes_${photo.id}`;
    const savesKey = `saves_${photo.id}`;
    const commentsKey = `comments_${photo.id}`;
    
    const likes = parseInt(localStorage.getItem(likesKey) || '0');
    const saves = parseInt(localStorage.getItem(savesKey) || '0');
    const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    
    // Populate modal
    elements.modalPhoto.src = photo.url;
    elements.photoTitle.textContent = photo.title;
    elements.photoAuthor.textContent = `By ${photo.author}`;
    elements.photoDescription.textContent = photo.description || '';
    elements.authorAvatar.src = photo.avatar || 'https://i.pravatar.cc/150?img=1';
    elements.viewCount.textContent = photo.views || 0;
    elements.likeCount.textContent = likes;
    elements.statLikes.textContent = likes;
    elements.statSaves.textContent = saves;
    elements.statComments.textContent = comments.length;
    
    // Render comments
    renderComments(comments);
    
    // Check if following
    const follows = new Set(JSON.parse(localStorage.getItem('shutterly_follows') || '[]'));
    if (elements.followBtn) {
        elements.followBtn.textContent = follows.has(photo.author) ? 'Following' : 'Follow';
    }
    
    elements.photoModal.style.display = 'flex';
}

function renderComments(comments) {
    if (!elements.commentsList) return;
    elements.commentsList.innerHTML = comments.map(c => 
        `<div class="comment-item"><strong>${c.author}:</strong> ${c.text}</div>`
    ).join('');
}

function addComment() {
    if (!currentPhoto || !elements.commentInput) return;
    
    const text = elements.commentInput.value.trim();
    if (!text) return;
    
    const commentsKey = `comments_${currentPhoto.id}`;
    const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    
    const newComment = {
        author: currentUser?.name || 'Guest',
        text,
        timestamp: Date.now()
    };
    
    comments.push(newComment);
    localStorage.setItem(commentsKey, JSON.stringify(comments));
    
    // Update stats
    if (currentUser) {
        currentUser.comments = (currentUser.comments || 0) + 1;
        saveUser(currentUser);
    }
    
    elements.commentInput.value = '';
    renderComments(comments);
    elements.statComments.textContent = comments.length;
}

function likePhoto() {
    if (!currentPhoto) return;
    
    const likesKey = `likes_${currentPhoto.id}`;
    let likes = parseInt(localStorage.getItem(likesKey) || '0');
    likes++;
    localStorage.setItem(likesKey, String(likes));
    
    elements.likeCount.textContent = likes;
    elements.statLikes.textContent = likes;
    
    // Update user stats
    if (currentUser) {
        currentUser.likes = (currentUser.likes || 0) + 1;
        saveUser(currentUser);
    }
}

function savePhoto() {
    if (!currentPhoto) return;
    
    // Show collection modal
    if (elements.collectionModal) {
        renderCollections();
        elements.collectionModal.style.display = 'flex';
    }
}

function renderCollections() {
    if (!elements.collectionsList) return;
    
    let collections = JSON.parse(localStorage.getItem('shutterly_collections') || '[]');
    if (collections.length === 0) {
        collections = ['General', 'Favorites'];
        localStorage.setItem('shutterly_collections', JSON.stringify(collections));
    }
    
    elements.collectionsList.innerHTML = collections.map(name => 
        `<div class="collection-card" data-name="${name}">${name}</div>`
    ).join('');
    
    // Add click handlers
    document.querySelectorAll('.collection-card').forEach(card => {
        card.onclick = () => {
            const collectionName = card.getAttribute('data-name');
            saveToCollection(collectionName);
        };
    });
}

function saveToCollection(collectionName) {
    if (!currentPhoto) return;
    
    const savesKey = `saves_${currentPhoto.id}`;
    let saves = parseInt(localStorage.getItem(savesKey) || '0');
    saves++;
    localStorage.setItem(savesKey, String(saves));
    
    elements.statSaves.textContent = saves;
    
    // Update user stats
    if (currentUser) {
        currentUser.saves = (currentUser.saves || 0) + 1;
        saveUser(currentUser);
    }
    
    closeModal(elements.collectionModal);
}

function createCollection() {
    if (!elements.newCollectionName) return;
    
    const name = elements.newCollectionName.value.trim();
    if (!name) return;
    
    const collections = new Set(JSON.parse(localStorage.getItem('shutterly_collections') || '[]'));
    collections.add(name);
    localStorage.setItem('shutterly_collections', JSON.stringify([...collections]));
    
    elements.newCollectionName.value = '';
    renderCollections();
}

function followUser() {
    if (!currentPhoto || !elements.followBtn) return;
    
    const follows = new Set(JSON.parse(localStorage.getItem('shutterly_follows') || '[]'));
    
    if (follows.has(currentPhoto.author)) {
        follows.delete(currentPhoto.author);
        elements.followBtn.textContent = 'Follow';
    } else {
        follows.add(currentPhoto.author);
        elements.followBtn.textContent = 'Following';
    }
    
    localStorage.setItem('shutterly_follows', JSON.stringify([...follows]));
}

function downloadPhoto(photo, size) {
    const url = size === 'original' ? photo.url : `${photo.url}&w=${size}&q=80`;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${photo.title}-${size}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showDownloadOptions() {
    if (!elements.downloadModal || !currentPhoto) return;
    elements.downloadModal.style.display = 'flex';
    
    // Attach handlers
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.onclick = () => {
            const size = btn.getAttribute('data-size');
            downloadPhoto(currentPhoto, size === 'original' ? 'original' : parseInt(size));
            closeModal(elements.downloadModal);
        };
    });
}

// Filter & Search
function filterByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        currentPhotos = [...samplePhotos];
    } else {
        currentPhotos = samplePhotos.filter(p => p.category === category);
    }
    
    renderPhotos(currentPhotos);
}

function searchPhotos() {
    if (!elements.searchInput) return;
    
    const query = elements.searchInput.value.toLowerCase().trim();
    
    if (!query) {
        currentPhotos = [...samplePhotos];
    } else {
        currentPhotos = samplePhotos.filter(p =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.author.toLowerCase().includes(query)
        );
    }
    
    renderPhotos(currentPhotos);
}

// Profile
function openProfile() {
    if (!currentUser || !elements.profileModal) return;
    
    elements.profileAvatar.src = currentUser.avatar || 'https://i.pravatar.cc/150?img=1';
    elements.profileName.textContent = currentUser.name || 'Guest';
    elements.userLikes.textContent = currentUser.likes || 0;
    elements.userSaves.textContent = currentUser.saves || 0;
    elements.userComments.textContent = currentUser.comments || 0;
    
    elements.profileModal.style.display = 'flex';
}

function openEditProfile() {
    if (!currentUser || !elements.editProfileModal) return;
    
    elements.editName.value = currentUser.name || '';
    elements.editProfileModal.style.display = 'flex';
}

function saveProfile() {
    if (!elements.editName) return;
    
    const name = elements.editName.value.trim();
    if (!name) return;
    
    if (!currentUser) currentUser = {};
    currentUser.name = name;
    
    // Handle avatar if changed
    const file = elements.editAvatar?.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentUser.avatar = e.target.result;
            saveUser(currentUser);
            closeModal(elements.editProfileModal);
            openProfile();
        };
        reader.readAsDataURL(file);
    } else {
        saveUser(currentUser);
        closeModal(elements.editProfileModal);
        openProfile();
    }
}

// Upload
function handleUploadAreaClick() {
    if (elements.photoFile) {
        elements.photoFile.click();
    }
}

function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file || !elements.uploadArea) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
        elements.uploadArea.innerHTML = `
            <img src="${ev.target.result}" style="max-width: 100%; border-radius: 8px; margin-bottom: 12px;">
            <p>Click to change photo</p>
        `;
    };
    reader.readAsDataURL(file);
}

function handleUploadSubmit(e) {
    e.preventDefault();
    // Demo: just close modal
    alert('Photo uploaded successfully! (Demo mode)');
    closeModal(elements.uploadModal);
    if (elements.uploadForm) elements.uploadForm.reset();
}

// Login
function handleLogin() {
    if (!elements.loginName) return;
    
    const name = elements.loginName.value.trim() || 'Guest';
    const file = elements.loginAvatar?.files?.[0];
    
    const user = {
        name,
        avatar: null,
        likes: 0,
        saves: 0,
        comments: 0
    };
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            user.avatar = e.target.result;
            saveUser(user);
            closeModal(elements.loginModal);
        };
        reader.readAsDataURL(file);
    } else {
        user.avatar = 'https://i.pravatar.cc/150?img=1';
        saveUser(user);
        closeModal(elements.loginModal);
    }
}

// Modal Utilities
function closeModal(modal) {
    if (modal) modal.style.display = 'none';
}

function setupEventListeners() {
    // Theme
    if (elements.themeToggle) elements.themeToggle.onclick = toggleTheme;
    if (elements.loginThemeToggle) elements.loginThemeToggle.onclick = toggleTheme;
    
    // Navigation
    if (elements.homeLink) {
        elements.homeLink.onclick = (e) => {
            e.preventDefault();
            // Close all modals
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
            // Reset to show all photos
            currentCategory = 'all';
            currentPhotos = [...samplePhotos];
            renderPhotos(currentPhotos);
            // Update category buttons
            elements.categoryBtns.forEach(b => b.classList.remove('active'));
            const allBtn = document.querySelector('[data-category="all"]');
            if (allBtn) allBtn.classList.add('active');
            // Clear search
            if (elements.searchInput) elements.searchInput.value = '';
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
    
    if (elements.profileBtn) elements.profileBtn.onclick = openProfile;
    if (elements.createBtn) elements.createBtn.onclick = () => {
        if (elements.uploadModal) elements.uploadModal.style.display = 'flex';
    };
    
    // Search - Real-time search
    if (elements.searchInput) {
        elements.searchInput.oninput = searchPhotos;
        elements.searchInput.onkeypress = (e) => {
            if (e.key === 'Enter') searchPhotos();
        };
    }
    if (elements.searchBtn) elements.searchBtn.onclick = searchPhotos;
    
    // Categories
    elements.categoryBtns.forEach(btn => {
        btn.onclick = () => {
            elements.categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterByCategory(btn.getAttribute('data-category'));
        };
    });
    
    // Photo Detail
    if (elements.likeBtn) elements.likeBtn.onclick = likePhoto;
    if (elements.saveBtn) elements.saveBtn.onclick = savePhoto;
    if (elements.downloadBtn) elements.downloadBtn.onclick = showDownloadOptions;
    if (elements.followBtn) elements.followBtn.onclick = followUser;
    if (elements.commentSubmit) elements.commentSubmit.onclick = addComment;
    
    // Upload
    if (elements.uploadArea) elements.uploadArea.onclick = handleUploadAreaClick;
    if (elements.photoFile) elements.photoFile.onchange = handleFileSelect;
    if (elements.uploadForm) elements.uploadForm.onsubmit = handleUploadSubmit;
    
    // Login
    if (elements.loginSubmit) elements.loginSubmit.onclick = handleLogin;
    
    // Profile
    if (elements.editProfileBtn) elements.editProfileBtn.onclick = openEditProfile;
    if (elements.saveProfileBtn) elements.saveProfileBtn.onclick = saveProfile;
    
    // Collections
    if (elements.createCollectionBtn) elements.createCollectionBtn.onclick = createCollection;
    
    // Close modals
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.onclick = () => {
            btn.closest('.modal').style.display = 'none';
        };
    });
    
    // Close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
    });
}
