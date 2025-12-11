// ========================================
// PROFILE PAGE FUNCTIONALITY
// ========================================

// Profile data
let profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, USA',
    memberSince: 'Dec 2024',
    twoFactorEnabled: false,
    notificationsEnabled: true
};

// Initialize Profile Page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('profileName')) {
        initProfile();
    }
});

function initProfile() {
    // Load profile data from localStorage
    loadProfileData();
    
    // Display profile information
    displayProfileData();
    
    // Calculate and display storage stats
    updateStorageStats();
    
    // Edit Personal Info Modal
    const editPersonalBtn = document.getElementById('editPersonalBtn');
    const editPersonalModal = document.getElementById('editPersonalModal');
    const closeEditPersonal = document.getElementById('closeEditPersonal');
    const editPersonalOverlay = document.getElementById('editPersonalOverlay');
    const cancelEditPersonal = document.getElementById('cancelEditPersonal');
    const saveEditPersonal = document.getElementById('saveEditPersonal');
    
    if (editPersonalBtn) {
        editPersonalBtn.addEventListener('click', () => {
            openEditPersonalModal();
        });
    }
    
    if (closeEditPersonal) closeEditPersonal.addEventListener('click', () => closeModal(editPersonalModal));
    if (editPersonalOverlay) editPersonalOverlay.addEventListener('click', () => closeModal(editPersonalModal));
    if (cancelEditPersonal) cancelEditPersonal.addEventListener('click', () => closeModal(editPersonalModal));
    
    if (saveEditPersonal) {
        saveEditPersonal.addEventListener('click', () => {
            savePersonalInfo();
        });
    }
    
    // Toggle switches
    const toggle2FA = document.getElementById('toggle2FA');
    const toggleNotifications = document.getElementById('toggleNotifications');
    
    if (toggle2FA) {
        toggle2FA.checked = profileData.twoFactorEnabled;
        toggle2FA.addEventListener('change', (e) => {
            profileData.twoFactorEnabled = e.target.checked;
            saveProfileData();
            if (e.target.checked) {
                window.location.href = 'ScanQR.php';
            }
        });
    }
    
    if (toggleNotifications) {
        toggleNotifications.checked = profileData.notificationsEnabled;
        toggleNotifications.addEventListener('change', (e) => {
            profileData.notificationsEnabled = e.target.checked;
            saveProfileData();
        });
    }
    
    // Danger zone actions
    const deleteAllFilesBtn = document.getElementById('deleteAllFilesBtn');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    
    if (deleteAllFilesBtn) {
        deleteAllFilesBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all your files? This action cannot be undone.')) {
                deleteAllFiles();
            }
        });
    }
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete your account? This will permanently delete all your data and cannot be undone.')) {
                if (confirm('This is your last warning. Delete account and all data?')) {
                    deleteAccount();
                }
            }
        });
    }
}

function loadProfileData() {
    const saved = localStorage.getItem('saveit_profile');
    if (saved) {
        try {
            profileData = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading profile data:', e);
        }
    }
}

function saveProfileData() {
    localStorage.setItem('saveit_profile', JSON.stringify(profileData));
}

function displayProfileData() {
    // Header section
    document.getElementById('profileName').textContent = profileData.name;
    document.getElementById('profileEmail').textContent = profileData.email;
    document.getElementById('memberSince').textContent = profileData.memberSince;
    
    // Get total files count
    const filesData = JSON.parse(localStorage.getItem('saveit_files') || '[]');
    document.getElementById('totalFilesCount').textContent = filesData.length;
    
    // Personal info section
    document.getElementById('displayName').textContent = profileData.name;
    document.getElementById('displayEmail').textContent = profileData.email;
    document.getElementById('displayPhone').textContent = profileData.phone;
    document.getElementById('displayLocation').textContent = profileData.location;
}

function openEditPersonalModal() {
    const modal = document.getElementById('editPersonalModal');
    
    // Populate form with current data
    document.getElementById('editName').value = profileData.name;
    document.getElementById('editEmail').value = profileData.email;
    document.getElementById('editPhone').value = profileData.phone;
    document.getElementById('editLocation').value = profileData.location;
    
    openModal(modal);
}

function savePersonalInfo() {
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const phone = document.getElementById('editPhone').value.trim();
    const location = document.getElementById('editLocation').value.trim();
    
    if (!name || !email) {
        alert('Name and email are required');
        return;
    }
    
    profileData.name = name;
    profileData.email = email;
    profileData.phone = phone;
    profileData.location = location;
    
    saveProfileData();
    displayProfileData();
    
    const modal = document.getElementById('editPersonalModal');
    closeModal(modal);
}

function updateStorageStats() {
    const filesData = JSON.parse(localStorage.getItem('saveit_files') || '[]');
    
    let totalSize = 0;
    let docsSize = 0;
    let imagesSize = 0;
    let othersSize = 0;
    
    filesData.forEach(file => {
        totalSize += file.size;
        if (file.type === 'document') {
            docsSize += file.size;
        } else if (file.type === 'image') {
            imagesSize += file.size;
        } else {
            othersSize += file.size;
        }
    });
    
    const maxStorage = 500 * 1024 * 1024; // 500 MB in bytes
    const usedPercentage = (totalSize / maxStorage) * 100;
    
    document.getElementById('storageBarFill').style.width = Math.min(usedPercentage, 100) + '%';
    document.getElementById('storageUsedDisplay').textContent = formatFileSize(totalSize);
    document.getElementById('docsStorage').textContent = formatFileSize(docsSize);
    document.getElementById('imagesStorage').textContent = formatFileSize(imagesSize);
    document.getElementById('othersStorage').textContent = formatFileSize(othersSize);
}

function deleteAllFiles() {
    localStorage.removeItem('saveit_files');
    
    // Log activity
    if (typeof logActivity === 'function') {
        logActivity('System', 'All files deleted', 'User cleared all files from storage');
    }
    
    alert('All files have been deleted successfully.');
    updateStorageStats();
    displayProfileData();
}

function deleteAccount() {
    // Clear all data
    localStorage.clear();
    
    // Redirect to sign in page
    alert('Your account has been deleted.');
    window.location.href = 'SignIn.php';
}

function openModal(modal) {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
