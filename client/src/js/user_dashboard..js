document.addEventListener('DOMContentLoaded', function () {
    // Banner update functionality
    const updateBannerBtn = document.getElementById('update-banner');
    const profileBanner = document.getElementById('profile-banner');

    updateBannerBtn.addEventListener('click', function () {
        // In a real application, this would open a file picker
        // For this example, we'll just change the image source
        profileBanner.src = '/api/placeholder/1200/300?text=New+Banner';
        profileBanner.classList.add('fade-in');
    });

    // Post form functionality
    const postForm = document.querySelector('.post-form');
    const postTextarea = postForm.querySelector('textarea');
    const postButton = postForm.querySelector('.btn-post');

    postButton.addEventListener('click', function () {
        const postContent = postTextarea.value.trim();
        if (postContent) {
            createNewPost(postContent);
            postTextarea.value = '';
        }
    });
});
