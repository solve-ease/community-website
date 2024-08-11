// DOM Elements
const profileBanner = document.getElementById('profile-banner');
const updateBannerBtn = document.getElementById('update-banner');
const postForm = document.querySelector('.post-form textarea');
const postButton = document.querySelector('.btn-post');
const photoButton = document.querySelector('.btn-photo');
const postsContainer = document.querySelector('.posts');
const logoutBtn = document.getElementById('logout-btn');

// Update banner functionality
updateBannerBtn.addEventListener('click', () => {
    const newBannerUrl = prompt('Enter the URL for the new banner image:');
    if (newBannerUrl) {
        profileBanner.src = newBannerUrl;
    }
});

// Post creation functionality
postButton.addEventListener('click', createPost);

function createPost() {
    const postContent = postForm.value.trim();
    if (postContent) {
        const newPost = document.createElement('article');
        newPost.classList.add('post');
        newPost.innerHTML = `
            <header class="post-header">
                <img src="https://i.pinimg.com/236x/41/7b/67/417b67c2c946c28e2cca22d777b84df8.jpg" alt="Muskan Ai" class="post-avatar">
                <div>
                    <h3>Muskan Ai</h3>
                    <time>Just now</time>
                </div>
            </header>
            <p>${postContent}</p>
            <div class="post-actions">
                <button><i class="fas fa-thumbs-up"></i> Like</button>
                <button><i class="fas fa-comment"></i> Comment</button>
                <button><i class="fas fa-share"></i> Share</button>
            </div>
        `;
        postsContainer.prepend(newPost);
        postForm.value = '';
    }
}

// Photo upload functionality (simulated)
photoButton.addEventListener('click', () => {
    alert('Photo upload functionality would be implemented here. This would typically involve opening a file dialog and handling the selected image.');
});

// Like, Comment, Share functionality (simulated)
postsContainer.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
        const action = e.target.closest('button').textContent.trim();
        alert(`${action} functionality would be implemented here.`);
    }
});

// Follow and Contact button functionality (simulated)
document.querySelectorAll('.profile-actions button').forEach(button => {
    button.addEventListener('click', () => {
        alert(`${button.textContent} functionality would be implemented here.`);
    });
});

// Navigation functionality
document.querySelectorAll('.profile-nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.profile-nav a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
        alert(`Navigating to ${link.textContent} section`);
    });
});

// People You May Know - Connect button functionality
document.querySelectorAll('.people-you-may-know .btn-connect').forEach(button => {
    button.addEventListener('click', () => {
        const personName = button.closest('li').querySelector('h4').textContent;
        alert(`Connection request sent to ${personName}`);
    });
});

// Logout functionality (simulated)
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
        alert('Logout successful. Redirecting to login page...');
        // In a real application, you would redirect to the login page or perform actual logout logic here
    }
});

// Initialize any necessary data or state
function initializeProfile() {
    // Fetch and display user data, posts, etc.
    console.log('Initializing profile data...');
    // This would typically involve API calls to get user data, recent posts, etc.
}

// Call initialization function when the page loads
window.addEventListener('load', initializeProfile);