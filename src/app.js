// Shutterly - Photography Sharing Platform
// Main Application Logic

// Sample photo data (simulating backend data)
const samplePhotos = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
        title: 'Mountain Sunrise',
        author: 'John Doe',
        category: 'nature',
        description: 'Beautiful sunrise over the mountains',
        views: 1234,
        likes: 89
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
        title: 'City Lights',
        author: 'Jane Smith',
        category: 'architecture',
        description: 'Urban landscape at night',
        views: 2345,
        likes: 156
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        title: 'Forest Path',
        author: 'Mike Johnson',
        category: 'nature',
        description: 'Peaceful forest trail',
        views: 987,
        likes: 67
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        title: 'Portrait Study',
        author: 'Sarah Williams',
        category: 'portrait',
        description: 'Natural light portrait',
        views: 3456,
        likes: 234
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869',
        title: 'Street Scene',
        author: 'Alex Brown',
        category: 'street',
        description: 'Candid street photography',
        views: 1876,
        likes: 92
    }
];

// Application State
let currentPhotos = [...samplePhotos];
let currentCategory = 'all';

// DOM Elements
const photoGrid = document.getElementById('photoGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const uploadModal = document.getElementById('uploadModal');
const photoDetailModal = document.getElementById('photoDetailModal');
const uploadForm = document.getElementById('uploadForm');
const uploadArea = document.getElementById('uploadArea');
const photoFile = document.getElementById('photoFile');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    renderPhotos(currentPhotos);
    setupEventListeners();
});

/**
 * Render photos to the masonry grid
 * @param {Array} photos - Array of photo objects to display
 */
function renderPhotos(photos) {
    photoGrid.innerHTML = '';
    
    if (photos.length === 0) {
        photoGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 48px;">No photos found</p>';
        return;
    }

    photos.forEach(photo => {
        const photoCard = createPhotoCard(photo);
        photoGrid.appendChild(photoCard);
    });
}

/**
 * Create a photo card element
 * @param {Object} photo - Photo object
 * @returns {HTMLElement} Photo card element
 */
function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}" loading="lazy">
        <div class="photo-card-info">
            <h4>${photo.title}</h4>
            <p>By ${photo.author}</p>
        </div>
    `;
    
    card.addEventListener('click', () => openPhotoDetail(photo));
    return card;
}

/**
 * Open photo detail modal
 * @param {Object} photo - Photo object to display
 */
function openPhotoDetail(photo) {
    document.getElementById('detailPhoto').src = photo.url;
    document.getElementById('detailTitle').textContent = photo.title;
    document.getElementById('detailAuthor').textContent = `By ${photo.author}`;
    document.getElementById('detailDescription').textContent = photo.description;
    document.getElementById('viewCount').textContent = photo.views;
    document.getElementById('likeCount').textContent = photo.likes;
    
    photoDetailModal.style.display = 'block';
}

/**
 * Filter photos by category
 * @param {string} category - Category to filter by
 */
function filterByCategory(category) {
    currentCategory = category;
    
    if (category === 'all') {
        currentPhotos = [...samplePhotos];
    } else {
        currentPhotos = samplePhotos.filter(photo => photo.category === category);
    }
    
    renderPhotos(currentPhotos);
}

/**
 * Search photos by title or description
 * @param {string} query - Search query
 */
function searchPhotos(query) {
    const lowercaseQuery = query.toLowerCase();
    
    currentPhotos = samplePhotos.filter(photo => 
        photo.title.toLowerCase().includes(lowercaseQuery) ||
        photo.description.toLowerCase().includes(lowercaseQuery) ||
        photo.author.toLowerCase().includes(lowercaseQuery)
    );
    
    renderPhotos(currentPhotos);
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterByCategory(btn.dataset.category);
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', () => {
        searchPhotos(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchPhotos(searchInput.value);
        }
    });

    // Upload area click
    uploadArea.addEventListener('click', () => {
        photoFile.click();
    });

    // Upload area drag & drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--primary-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ccc';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ccc';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileUpload(file);
        }
    });

    photoFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Upload form submit
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Photo uploaded successfully! (Demo mode)');
        uploadModal.style.display = 'none';
        uploadForm.reset();
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

/**
 * Handle file upload preview
 * @param {File} file - Uploaded file
 */
function handleFileUpload(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadArea.innerHTML = `
            <img src="${e.target.result}" style="max-width: 100%; border-radius: 8px;">
            <p style="margin-top: 16px;">Click to change photo</p>
        `;
    };
    reader.readAsDataURL(file);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderPhotos,
        filterByCategory,
        searchPhotos,
        createPhotoCard
    };
}
