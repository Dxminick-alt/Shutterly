// Shutterly - Photo Sharing Platform
// Main JavaScript file

class ShutterlyApp {
    constructor() {
        this.currentUser = null;
        this.photos = [];
        this.comments = {};
        this.likes = {};
        this.currentPhotoId = null;
        this.editingCommentId = null;
        
        this.init();
        this.loadSampleData();
    }

    init() {
        this.setupEventListeners();
        this.setupTheme();
        this.loadUserSession();
        this.renderPhotos();
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Navigation buttons
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.showModal('loginModal');
        });

        document.getElementById('registerBtn').addEventListener('click', () => {
            this.showModal('registerModal');
        });

        document.getElementById('uploadBtn').addEventListener('click', () => {
            if (this.currentUser) {
                this.showModal('uploadModal');
            } else {
                alert('Please login to upload photos');
            }
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        document.getElementById('profileBtn').addEventListener('click', () => {
            this.showUserProfile();
        });

        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchPhotos();
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchPhotos();
            }
        });

        // Category filter
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterByCategory(e.target.dataset.category);
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Modal controls
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                this.hideModal(e.target.closest('.modal').id);
            });
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideModal(e.target.id);
            }
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        document.getElementById('uploadForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleUpload();
        });

        // Switch between login/register
        document.getElementById('switchToRegister').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('loginModal');
            this.showModal('registerModal');
        });

        document.getElementById('switchToLogin').addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('registerModal');
            this.showModal('loginModal');
        });

        // Upload area drag and drop
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.addEventListener('click', () => {
            document.getElementById('photoFile').click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                document.getElementById('photoFile').files = files;
                this.previewUploadFile(files[0]);
            }
        });

        document.getElementById('photoFile').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.previewUploadFile(e.target.files[0]);
            }
        });

        // Photo modal actions
        document.getElementById('likeBtn').addEventListener('click', () => {
            this.toggleLike();
        });

        document.getElementById('downloadBtn').addEventListener('click', () => {
            this.downloadPhoto();
        });

        document.getElementById('addCommentBtn').addEventListener('click', () => {
            this.addComment();
        });

        // Profile modal tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProfileTab(e.target.dataset.tab);
            });
        });

        // Edit profile
        document.getElementById('editProfileBtn').addEventListener('click', () => {
            this.showEditProfile();
        });

        document.getElementById('editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEditProfile();
        });

        document.getElementById('changeAvatarBtn').addEventListener('click', () => {
            document.getElementById('avatarFile').click();
        });

        document.getElementById('avatarFile').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.previewAvatar(e.target.files[0]);
            }
        });
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('shutterly-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('shutterly-theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    loadUserSession() {
        const savedUser = localStorage.getItem('shutterly-user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI();
        }
    }

    loadSampleData() {
        // Load sample photos if none exist
        const savedPhotos = localStorage.getItem('shutterly-photos');
        const savedComments = localStorage.getItem('shutterly-comments');
        const savedLikes = localStorage.getItem('shutterly-likes');

        if (savedPhotos) {
            this.photos = JSON.parse(savedPhotos);
            this.comments = JSON.parse(savedComments) || {};
            this.likes = JSON.parse(savedLikes) || {};
        } else {
            this.createSampleData();
        }
    }

    createSampleData() {
        this.photos = [
            {
                id: '1',
                title: 'Mountain Sunrise',
                description: 'Beautiful sunrise over the mountain peaks',
                category: 'nature',
                author: 'John Doe',
                imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
                uploadDate: new Date('2024-01-15').toISOString(),
                likes: 24,
                comments: 5
            },
            {
                id: '2',
                title: 'City Architecture',
                description: 'Modern skyscrapers in downtown',
                category: 'architecture',
                author: 'Jane Smith',
                imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500',
                uploadDate: new Date('2024-01-14').toISOString(),
                likes: 18,
                comments: 3
            },
            {
                id: '3',
                title: 'Ocean Waves',
                description: 'Powerful waves crashing on the shore',
                category: 'nature',
                author: 'Mike Johnson',
                imageUrl: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=500',
                uploadDate: new Date('2024-01-13').toISOString(),
                likes: 31,
                comments: 7
            },
            {
                id: '4',
                title: 'Street Food',
                description: 'Delicious local street food',
                category: 'food',
                author: 'Sarah Wilson',
                imageUrl: 'https://images.unsplash.com/photo-1554978991-33ef7f31d658?w=500',
                uploadDate: new Date('2024-01-12').toISOString(),
                likes: 12,
                comments: 2
            },
            {
                id: '5',
                title: 'Forest Path',
                description: 'Peaceful walking path through the forest',
                category: 'nature',
                author: 'David Brown',
                imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500',
                uploadDate: new Date('2024-01-11').toISOString(),
                likes: 27,
                comments: 4
            },
            {
                id: '6',
                title: 'Abstract Art',
                description: 'Colorful abstract composition',
                category: 'abstract',
                author: 'Emma Davis',
                imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500',
                uploadDate: new Date('2024-01-10').toISOString(),
                likes: 15,
                comments: 1
            }
        ];

        this.comments = {
            '1': [
                { id: 'c1', author: 'Alice', text: 'Absolutely stunning!', date: new Date('2024-01-15').toISOString(), edited: false },
                { id: 'c2', author: 'Bob', text: 'Great composition', date: new Date('2024-01-15').toISOString(), edited: false }
            ],
            '2': [
                { id: 'c3', author: 'Charlie', text: 'Love the perspective', date: new Date('2024-01-14').toISOString(), edited: false }
            ],
            '3': [
                { id: 'c4', author: 'Diana', text: 'So powerful!', date: new Date('2024-01-13').toISOString(), edited: false },
                { id: 'c5', author: 'Eve', text: 'Makes me want to visit the ocean', date: new Date('2024-01-13').toISOString(), edited: false }
            ]
        };

        this.likes = {
            '1': ['user1', 'user2', 'user3'],
            '2': ['user1', 'user4'],
            '3': ['user2', 'user3', 'user4', 'user5']
        };

        this.saveData();
    }

    saveData() {
        localStorage.setItem('shutterly-photos', JSON.stringify(this.photos));
        localStorage.setItem('shutterly-comments', JSON.stringify(this.comments));
        localStorage.setItem('shutterly-likes', JSON.stringify(this.likes));
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Ensure proper scrolling within modals
        setTimeout(() => {
            const modalContent = document.querySelector(`#${modalId} .modal-content`);
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }, 100);
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
        
        // Only restore body overflow if no other modals are open
        const openModals = document.querySelectorAll('.modal[style*="display: block"]');
        if (openModals.length === 0) {
            document.body.style.overflow = 'auto';
        }
        
        // Clear forms
        if (modalId === 'loginModal') {
            document.getElementById('loginForm').reset();
        } else if (modalId === 'registerModal') {
            document.getElementById('registerForm').reset();
        } else if (modalId === 'uploadModal') {
            document.getElementById('uploadForm').reset();
            this.resetUploadArea();
        }
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Simple validation (in a real app, this would be server-side)
        if (email && password) {
            this.currentUser = {
                id: Date.now().toString(),
                name: email.split('@')[0],
                email: email,
                avatar: 'assets/default-avatar.svg',
                bio: '',
                joinDate: new Date().toISOString()
            };
            
            localStorage.setItem('shutterly-user', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.hideModal('loginModal');
            this.showMessage('Login successful!', 'success');
        } else {
            this.showMessage('Please fill in all fields', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        this.currentUser = {
            id: Date.now().toString(),
            name: name,
            email: email,
            avatar: 'assets/default-avatar.svg',
            bio: '',
            joinDate: new Date().toISOString()
        };
        
        localStorage.setItem('shutterly-user', JSON.stringify(this.currentUser));
        this.updateAuthUI();
        this.hideModal('registerModal');
        this.showMessage('Registration successful!', 'success');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('shutterly-user');
        this.updateAuthUI();
        this.showMessage('Logged out successfully', 'success');
    }

    updateAuthUI() {
        const authButtons = document.querySelector('.auth-buttons');
        const userProfile = document.getElementById('userProfile');
        
        if (this.currentUser) {
            authButtons.classList.add('hidden');
            userProfile.classList.remove('hidden');
            document.getElementById('userName').textContent = this.currentUser.name;
            document.getElementById('userAvatar').src = this.currentUser.avatar || 'assets/default-avatar.svg';
        } else {
            authButtons.classList.remove('hidden');
            userProfile.classList.add('hidden');
        }
    }

    previewUploadFile(file) {
        const uploadArea = document.getElementById('uploadArea');
        const reader = new FileReader();
        
        reader.onload = (e) => {
            uploadArea.innerHTML = `
                <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
                <p>Click to change photo</p>
            `;
        };
        
        reader.readAsDataURL(file);
    }

    resetUploadArea() {
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>Drag & drop your photo here or click to browse</p>
        `;
    }

    handleUpload() {
        const file = document.getElementById('photoFile').files[0];
        const title = document.getElementById('photoTitle').value;
        const description = document.getElementById('photoDescription').value;
        const category = document.getElementById('photoCategory').value;

        if (!file || !title || !category) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const newPhoto = {
                id: Date.now().toString(),
                title: title,
                description: description,
                category: category,
                author: this.currentUser.name,
                imageUrl: e.target.result,
                uploadDate: new Date().toISOString(),
                likes: 0,
                comments: 0
            };

            this.photos.unshift(newPhoto);
            this.saveData();
            this.renderPhotos();
            this.hideModal('uploadModal');
            this.showMessage('Photo uploaded successfully!', 'success');
        };
        
        reader.readAsDataURL(file);
    }

    renderPhotos(photosToRender = this.photos) {
        const gallery = document.getElementById('photoGallery');
        
        if (photosToRender.length === 0) {
            gallery.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-images"></i>
                    <h3>No photos found</h3>
                    <p>Try adjusting your search or category filter</p>
                </div>
            `;
            return;
        }

        gallery.innerHTML = photosToRender.map(photo => `
            <div class="photo-card" onclick="app.showPhotoDetail('${photo.id}')">
                <img src="${photo.imageUrl}" alt="${photo.title}" loading="lazy">
                <div class="photo-info">
                    <div class="photo-title">${photo.title}</div>
                    <div class="photo-description">${photo.description}</div>
                    <div class="photo-meta">
                        <span>By ${photo.author}</span>
                        <span class="photo-category">${photo.category}</span>
                    </div>
                    <div class="photo-stats">
                        <div class="stat">
                            <i class="far fa-heart"></i>
                            <span>${photo.likes}</span>
                        </div>
                        <div class="stat">
                            <i class="far fa-comment"></i>
                            <span>${photo.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showPhotoDetail(photoId) {
        const photo = this.photos.find(p => p.id === photoId);
        if (!photo) return;

        this.currentPhotoId = photoId;
        
        document.getElementById('modalPhoto').src = photo.imageUrl;
        document.getElementById('modalTitle').textContent = photo.title;
        document.getElementById('modalDescription').textContent = photo.description;
        document.getElementById('modalAuthor').textContent = photo.author;
        document.getElementById('modalCategory').textContent = photo.category;
        document.getElementById('likeCount').textContent = photo.likes;

        // Update like button
        const likeBtn = document.getElementById('likeBtn');
        const isLiked = this.likes[photoId] && this.currentUser && 
                       this.likes[photoId].includes(this.currentUser.id);
        
        if (isLiked) {
            likeBtn.classList.add('liked');
            likeBtn.querySelector('i').className = 'fas fa-heart';
        } else {
            likeBtn.classList.remove('liked');
            likeBtn.querySelector('i').className = 'far fa-heart';
        }

        // Load comments
        this.loadComments(photoId);
        
        this.showModal('photoModal');
    }

    loadComments(photoId) {
        const commentsList = document.getElementById('commentsList');
        const comments = this.comments[photoId] || [];
        
        if (comments.length === 0) {
            commentsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No comments yet</p>';
            return;
        }

        commentsList.innerHTML = comments.map((comment, index) => {
            const commentId = `${photoId}_${index}`;
            const isOwnComment = comment.author === (this.currentUser?.name || '');
            return `
                <div class="comment" id="comment_${commentId}">
                    <div class="comment-author">${comment.author}</div>
                    <div class="comment-text" id="text_${commentId}">${comment.text}</div>
                    <div class="comment-edit-form" id="edit_${commentId}">
                        <textarea class="comment-edit-input" id="input_${commentId}">${comment.text}</textarea>
                        <div class="comment-edit-actions">
                            <button class="save-comment-btn" onclick="app.saveCommentEdit('${commentId}', '${photoId}', ${index})">Save</button>
                            <button class="cancel-comment-btn" onclick="app.cancelCommentEdit('${commentId}')">Cancel</button>
                        </div>
                    </div>
                    ${isOwnComment ? `
                        <div class="comment-actions">
                            <button class="edit-comment-btn" onclick="app.startCommentEdit('${commentId}')">Edit</button>
                            <button class="delete-comment-btn" onclick="app.deleteComment('${photoId}', ${index})">Delete</button>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    }

    toggleLike() {
        if (!this.currentUser) {
            alert('Please login to like photos');
            return;
        }

        const photoId = this.currentPhotoId;
        const photo = this.photos.find(p => p.id === photoId);
        
        if (!this.likes[photoId]) {
            this.likes[photoId] = [];
        }

        const userIndex = this.likes[photoId].indexOf(this.currentUser.id);
        
        if (userIndex > -1) {
            // Unlike
            this.likes[photoId].splice(userIndex, 1);
            photo.likes--;
            document.getElementById('likeBtn').classList.remove('liked');
            document.getElementById('likeBtn').querySelector('i').className = 'far fa-heart';
        } else {
            // Like
            this.likes[photoId].push(this.currentUser.id);
            photo.likes++;
            document.getElementById('likeBtn').classList.add('liked');
            document.getElementById('likeBtn').querySelector('i').className = 'fas fa-heart';
        }

        document.getElementById('likeCount').textContent = photo.likes;
        this.saveData();
        this.renderPhotos();
    }

    addComment() {
        if (!this.currentUser) {
            alert('Please login to comment');
            return;
        }

        const commentText = document.getElementById('newComment').value.trim();
        if (!commentText) return;

        const photoId = this.currentPhotoId;
        
        if (!this.comments[photoId]) {
            this.comments[photoId] = [];
        }

        const newComment = {
            id: Date.now().toString(),
            author: this.currentUser.name,
            text: commentText,
            date: new Date().toISOString(),
            edited: false
        };

        this.comments[photoId].push(newComment);
        
        // Update comment count
        const photo = this.photos.find(p => p.id === photoId);
        photo.comments++;

        document.getElementById('newComment').value = '';
        this.loadComments(photoId);
        this.saveData();
        this.renderPhotos();
    }

    downloadPhoto() {
        const photo = this.photos.find(p => p.id === this.currentPhotoId);
        if (!photo) return;

        // Create download link
        const link = document.createElement('a');
        link.href = photo.imageUrl;
        link.download = `${photo.title.replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    searchPhotos() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        
        if (!searchTerm) {
            this.renderPhotos();
            return;
        }

        const filteredPhotos = this.photos.filter(photo => 
            photo.title.toLowerCase().includes(searchTerm) ||
            photo.description.toLowerCase().includes(searchTerm) ||
            photo.category.toLowerCase().includes(searchTerm) ||
            photo.author.toLowerCase().includes(searchTerm)
        );

        this.renderPhotos(filteredPhotos);
    }

    filterByCategory(category) {
        if (category === 'all') {
            this.renderPhotos();
        } else {
            const filteredPhotos = this.photos.filter(photo => photo.category === category);
            this.renderPhotos(filteredPhotos);
        }
    }

    showMessage(text, type = 'info') {
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        document.querySelector('.main-content').insertBefore(message, document.querySelector('.category-filter'));
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Profile functionality
    showUserProfile() {
        if (!this.currentUser) {
            alert('Please login to view profile');
            return;
        }

        // Update profile header
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileEmail').textContent = this.currentUser.email;
        document.getElementById('profileAvatar').src = this.currentUser.avatar || 'assets/default-avatar.svg';

        // Calculate and display stats
        const userPhotos = this.photos.filter(photo => photo.author === this.currentUser.name);
        const totalLikes = userPhotos.reduce((sum, photo) => sum + photo.likes, 0);
        const totalComments = userPhotos.reduce((sum, photo) => sum + photo.comments, 0);

        document.getElementById('profilePhotoCount').textContent = userPhotos.length;
        document.getElementById('profileTotalLikes').textContent = totalLikes;
        document.getElementById('profileTotalComments').textContent = totalComments;

        // Show uploads tab by default
        this.switchProfileTab('uploads');
        
        this.showModal('profileModal');
    }

    switchProfileTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabName) {
                btn.classList.add('active');
            }
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName + 'Tab').classList.add('active');

        // Load content based on tab
        if (tabName === 'uploads') {
            this.loadUserUploads();
        } else if (tabName === 'liked') {
            this.loadUserLikedPhotos();
        } else if (tabName === 'comments') {
            this.loadUserComments();
        }
    }

    loadUserUploads() {
        const userPhotos = this.photos.filter(photo => photo.author === this.currentUser.name);
        const container = document.getElementById('userUploads');
        
        if (userPhotos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-images"></i>
                    <h3>No uploads yet</h3>
                    <p>Start sharing your photos with the world!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = userPhotos.map(photo => `
            <div class="profile-photo-card" onclick="app.showPhotoDetail('${photo.id}')">
                <img src="${photo.imageUrl}" alt="${photo.title}" loading="lazy">
                <div class="profile-photo-info">
                    <div class="profile-photo-title">${photo.title}</div>
                    <div class="profile-photo-stats">
                        <span><i class="far fa-heart"></i> ${photo.likes}</span>
                        <span><i class="far fa-comment"></i> ${photo.comments}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadUserLikedPhotos() {
        if (!this.currentUser) return;
        
        const likedPhotoIds = Object.keys(this.likes).filter(photoId => 
            this.likes[photoId].includes(this.currentUser.id)
        );
        
        const likedPhotos = this.photos.filter(photo => likedPhotoIds.includes(photo.id));
        const container = document.getElementById('userLiked');
        
        if (likedPhotos.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>No liked photos yet</h3>
                    <p>Start liking photos you enjoy!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = likedPhotos.map(photo => `
            <div class="profile-photo-card" onclick="app.showPhotoFromLike('${photo.id}')">
                <img src="${photo.imageUrl}" alt="${photo.title}" loading="lazy">
                <div class="profile-photo-info">
                    <div class="profile-photo-title">${photo.title}</div>
                    <div class="profile-photo-stats">
                        <span><i class="far fa-heart"></i> ${photo.likes}</span>
                        <span><i class="far fa-comment"></i> ${photo.comments}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showEditProfile() {
        if (!this.currentUser) return;
        
        document.getElementById('editName').value = this.currentUser.name;
        document.getElementById('editEmail').value = this.currentUser.email;
        document.getElementById('editBio').value = this.currentUser.bio || '';
        document.getElementById('editAvatar').src = this.currentUser.avatar || 'assets/default-avatar.svg';
        
        this.hideModal('profileModal');
        this.showModal('editProfileModal');
    }

    previewAvatar(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('editAvatar').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    handleEditProfile() {
        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;
        const bio = document.getElementById('editBio').value;
        const avatarSrc = document.getElementById('editAvatar').src;

        if (!name || !email) {
            this.showMessage('Name and email are required', 'error');
            return;
        }

        // Update current user
        this.currentUser.name = name;
        this.currentUser.email = email;
        this.currentUser.bio = bio;
        this.currentUser.avatar = avatarSrc;

        // Update all photos by this user to reflect name change
        this.photos.forEach(photo => {
            if (photo.author === this.currentUser.name) {
                photo.author = name;
            }
        });

        // Save changes
        localStorage.setItem('shutterly-user', JSON.stringify(this.currentUser));
        this.saveData();
        this.updateAuthUI();
        this.renderPhotos();
        
        this.hideModal('editProfileModal');
        this.showMessage('Profile updated successfully!', 'success');
    }

    // Comment editing functionality
    startCommentEdit(commentId) {
        if (this.editingCommentId && this.editingCommentId !== commentId) {
            this.cancelCommentEdit(this.editingCommentId);
        }
        
        const textElement = document.getElementById(`text_${commentId}`);
        const editForm = document.getElementById(`edit_${commentId}`);
        
        if (!textElement || !editForm) {
            console.error('Comment elements not found');
            return;
        }
        
        textElement.style.display = 'none';
        editForm.classList.add('active');
        
        const input = document.getElementById(`input_${commentId}`);
        if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
        }
        
        this.editingCommentId = commentId;
    }

    saveCommentEdit(commentId, photoId, commentIndex) {
        const input = document.getElementById(`input_${commentId}`);
        if (!input) {
            console.error('Input element not found');
            return;
        }
        
        const newText = input.value.trim();
        
        if (!newText) {
            this.showMessage('Comment cannot be empty', 'error');
            return;
        }

        // Update the comment
        if (this.comments[photoId] && this.comments[photoId][commentIndex]) {
            this.comments[photoId][commentIndex].text = newText;
            this.comments[photoId][commentIndex].edited = true;
            this.comments[photoId][commentIndex].editDate = new Date().toISOString();
        }
        
        // Update display
        const textElement = document.getElementById(`text_${commentId}`);
        const editForm = document.getElementById(`edit_${commentId}`);
        
        if (textElement && editForm) {
            textElement.textContent = newText;
            textElement.style.display = 'block';
            editForm.classList.remove('active');
        }
        
        this.saveData();
        this.editingCommentId = null;
        this.showMessage('Comment updated successfully!', 'success');
    }

    cancelCommentEdit(commentId) {
        const textElement = document.getElementById(`text_${commentId}`);
        const editForm = document.getElementById(`edit_${commentId}`);
        
        if (textElement && editForm) {
            textElement.style.display = 'block';
            editForm.classList.remove('active');
        }
        
        this.editingCommentId = null;
    }

    deleteComment(photoId, commentIndex) {
        if (!confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        this.comments[photoId].splice(commentIndex, 1);
        
        // Update comment count
        const photo = this.photos.find(p => p.id === photoId);
        if (photo) {
            photo.comments = Math.max(0, photo.comments - 1);
        }
        
        this.loadComments(photoId);
        this.saveData();
        this.renderPhotos();
        this.showMessage('Comment deleted successfully!', 'success');
    }

    // Load user's comments for profile
    loadUserComments() {
        if (!this.currentUser) return;
        
        const userComments = [];
        
        // Find all comments by the current user
        Object.keys(this.comments).forEach(photoId => {
            const photoComments = this.comments[photoId] || [];
            photoComments.forEach((comment, index) => {
                if (comment.author === this.currentUser.name) {
                    const photo = this.photos.find(p => p.id === photoId);
                    if (photo) {
                        userComments.push({
                            ...comment,
                            photoId: photoId,
                            commentIndex: index,
                            photo: photo
                        });
                    }
                }
            });
        });
        
        // Sort by date (newest first)
        userComments.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        const container = document.getElementById('userComments');
        
        if (userComments.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-comments"></i>
                    <h3>No comments yet</h3>
                    <p>Start commenting on photos you like!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = userComments.map(comment => {
            const date = new Date(comment.date).toLocaleDateString();
            return `
                <div class="profile-comment-item" onclick="app.showPhotoFromComment('${comment.photoId}', '${comment.text}')">
                    <div class="comment-photo-preview">
                        <img src="${comment.photo.imageUrl}" alt="${comment.photo.title}" class="comment-photo-thumb" loading="lazy">
                        <div class="comment-details">
                            <div class="comment-on-photo">Comment on "${comment.photo.title}"</div>
                            <div class="comment-text">"${comment.text}"</div>
                            <div class="comment-date">${date}${comment.edited ? ' (edited)' : ''}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Show photo from comment/like action within profile
    showPhotoFromComment(photoId, commentText) {
        const photo = this.photos.find(p => p.id === photoId);
        if (!photo) return;

        // Create inline photo preview within the profile modal
        this.showInlinePhotoPreview(photo, `Your comment: "${commentText}"`);
    }

    showPhotoFromLike(photoId) {
        const photo = this.photos.find(p => p.id === photoId);
        if (!photo) return;

        // Create inline photo preview within the profile modal
        this.showInlinePhotoPreview(photo, 'You liked this photo');
    }

    showInlinePhotoPreview(photo, contextText) {
        // Create overlay within the profile modal
        const profileModal = document.getElementById('profileModal');
        const overlay = document.createElement('div');
        overlay.className = 'inline-photo-overlay';
        overlay.innerHTML = `
            <div class="inline-photo-content">
                <button class="inline-close-btn" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="inline-photo-preview">
                    <img src="${photo.imageUrl}" alt="${photo.title}">
                </div>
                <div class="inline-photo-info">
                    <h3>${photo.title}</h3>
                    <p>${photo.description}</p>
                    <div class="inline-photo-meta">
                        <span>By: ${photo.author}</span>
                        <span class="inline-category">${photo.category}</span>
                    </div>
                    <div class="inline-context">
                        <i class="fas fa-info-circle"></i>
                        ${contextText}
                    </div>
                    <div class="inline-photo-stats">
                        <span><i class="far fa-heart"></i> ${photo.likes}</span>
                        <span><i class="far fa-comment"></i> ${photo.comments}</span>
                    </div>
                </div>
            </div>
        `;
        
        profileModal.appendChild(overlay);
        
        // Add event listener to close on outside click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }
}

// Initialize the app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ShutterlyApp();
});

// Export for global access
window.app = app;