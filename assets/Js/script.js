// ========================================
// DASHBOARD FUNCTIONALITY
// ========================================

// Sample data for demonstration
let filesData = [];
let fileIdCounter = 1;

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('filesTable')) {
        initDashboard();
    }
});

function initDashboard() {
    // Load saved files from localStorage
    loadFilesFromStorage();
    
    // Update stats and render table
    updateStats();
    renderFilesTable();
    
    // Modal controls
    const addFileBtn = document.getElementById('addFileBtn');
    const closeModal = document.getElementById('closeModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const cancelBtn = document.getElementById('cancelBtn');
    const addFileModal = document.getElementById('addFileModal');
    
    if (!addFileBtn || !addFileModal) {
        console.error('Required elements not found');
        return;
    }
    
    addFileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Add file button clicked');
        openModal(addFileModal);
    });
    
    if (closeModal) closeModal.addEventListener('click', () => closeModalFunc(addFileModal));
    if (modalOverlay) modalOverlay.addEventListener('click', () => closeModalFunc(addFileModal));
    if (cancelBtn) cancelBtn.addEventListener('click', () => closeModalFunc(addFileModal));
    
    // File upload handling
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');
    const uploadArea = document.getElementById('uploadArea');
    const removeFileBtn = document.getElementById('removeFile');
    const uploadBtn = document.getElementById('uploadBtn');
    
    if (!fileInput || !browseBtn || !uploadArea || !uploadBtn) {
        console.error('File upload elements not found');
        return;
    }
    
    browseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.click();
    });
    
    uploadArea.addEventListener('click', (e) => {
        if (e.target === uploadArea || e.target.closest('.upload-content')) {
            fileInput.click();
        }
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
    
    removeFileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileInput.value = '';
        document.getElementById('filePreview').style.display = 'none';
        document.getElementById('uploadArea').style.display = 'block';
        document.getElementById('customFileName').value = '';
        uploadBtn.disabled = true;
    });
    
    // Form submission
    const addFileForm = document.getElementById('addFileForm');
    addFileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFileUpload();
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        filterFiles(e.target.value);
    });
    
    // Delete modal controls
    const deleteModal = document.getElementById('deleteModal');
    const deleteModalOverlay = document.getElementById('deleteModalOverlay');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    
    deleteModalOverlay.addEventListener('click', () => closeModalFunc(deleteModal));
    cancelDeleteBtn.addEventListener('click', () => closeModalFunc(deleteModal));
}

function handleFileSelect(file) {
    const filePreview = document.getElementById('filePreview');
    const uploadArea = document.getElementById('uploadArea');
    const previewFileName = document.getElementById('previewFileName');
    const previewFileSize = document.getElementById('previewFileSize');
    const uploadBtn = document.getElementById('uploadBtn');
    const previewIcon = filePreview.querySelector('.preview-icon i');
    
    // Show preview
    uploadArea.style.display = 'none';
    filePreview.style.display = 'flex';
    
    // Update preview info
    previewFileName.textContent = file.name;
    previewFileSize.textContent = formatFileSize(file.size);
    
    // Update icon based on file type
    const fileType = getFileType(file.name);
    let iconClass = 'fas fa-file';
    
    switch(fileType) {
        case 'image':
            iconClass = 'fas fa-file-image';
            break;
        case 'document':
            iconClass = 'fas fa-file-alt';
            break;
        case 'video':
            iconClass = 'fas fa-file-video';
            break;
        default:
            iconClass = 'fas fa-file';
    }
    
    previewIcon.className = iconClass;
    
    // Enable upload button
    uploadBtn.disabled = false;
}

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const customFileName = document.getElementById('customFileName');
    const file = fileInput.files[0];
    
    if (!file) return;
    
    // Create file object
    const fileName = customFileName.value.trim() || file.name;
    const fileObj = {
        id: fileIdCounter++,
        name: fileName,
        originalName: file.name,
        type: getFileType(file.name),
        size: file.size,
        dateAdded: new Date().toISOString()
    };
    
    // Add to files array
    filesData.push(fileObj);
    
    // Save to localStorage
    saveFilesToStorage();
    
    // Update UI
    updateStats();
    renderFilesTable();
    
    // Close modal and reset form
    closeModalFunc(document.getElementById('addFileModal'));
    resetUploadForm();
    
    // Show success message (you can add a toast notification here)
    console.log('File uploaded successfully:', fileObj);
}

function resetUploadForm() {
    document.getElementById('fileInput').value = '';
    document.getElementById('customFileName').value = '';
    document.getElementById('filePreview').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('uploadBtn').disabled = true;
}

function updateStats() {
    const totalFiles = filesData.length;
    const documentsCount = filesData.filter(f => f.type === 'document').length;
    const imagesCount = filesData.filter(f => f.type === 'image').length;
    const totalSize = filesData.reduce((sum, f) => sum + f.size, 0);
    
    document.getElementById('totalFiles').textContent = totalFiles;
    document.getElementById('documentsCount').textContent = documentsCount;
    document.getElementById('imagesCount').textContent = imagesCount;
    document.getElementById('storageUsed').textContent = formatFileSize(totalSize);
}

function renderFilesTable() {
    const tbody = document.getElementById('filesTableBody');
    const emptyState = document.getElementById('emptyState');
    const filesTable = document.getElementById('filesTable');
    
    console.log('Rendering files table. Files count:', filesData.length);
    
    if (filesData.length === 0) {
        if (filesTable) filesTable.style.display = 'none';
        if (emptyState) emptyState.classList.add('show');
        console.log('Showing empty state');
        return;
    }
    
    if (filesTable) filesTable.style.display = 'table';
    if (emptyState) emptyState.classList.remove('show');
    
    tbody.innerHTML = filesData.map((file, index) => `
        <tr>
            <td data-label="#">${index + 1}</td>
            <td data-label="File Name">${escapeHtml(file.name)}</td>
            <td data-label="Type">
                <span class="file-type-badge badge-${file.type}">
                    ${file.type}
                </span>
            </td>
            <td data-label="Size">${formatFileSize(file.size)}</td>
            <td data-label="Date Added">${formatDate(file.dateAdded)}</td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="action-btn btn-edit" onclick="editFile(${file.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn btn-delete" onclick="confirmDelete(${file.id}, '${escapeHtml(file.name)}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="action-btn btn-download" onclick="downloadFile(${file.id})" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterFiles(searchTerm) {
    const rows = document.querySelectorAll('#filesTableBody tr');
    const term = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const fileName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        if (fileName.includes(term)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function confirmDelete(fileId, fileName) {
    const deleteModal = document.getElementById('deleteModal');
    const deleteFileName = document.getElementById('deleteFileName');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    deleteFileName.textContent = fileName;
    
    confirmDeleteBtn.onclick = () => {
        deleteFile(fileId);
        closeModalFunc(deleteModal);
    };
    
    openModal(deleteModal);
}

function deleteFile(fileId) {
    filesData = filesData.filter(f => f.id !== fileId);
    saveFilesToStorage();
    updateStats();
    renderFilesTable();
}

function editFile(fileId) {
    // You can implement edit functionality here
    alert('Edit functionality can be implemented based on your needs');
}

function downloadFile(fileId) {
    const file = filesData.find(f => f.id === fileId);
    if (file) {
        alert(`Download functionality for: ${file.name}\nThis would trigger an actual download in production.`);
    }
}

function getFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];
    const docExts = ['pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'ppt', 'pptx'];
    const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];
    
    if (imageExts.includes(ext)) return 'image';
    if (docExts.includes(ext)) return 'document';
    if (videoExts.includes(ext)) return 'video';
    return 'other';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function openModal(modal) {
    if (modal) {
        console.log('Opening modal:', modal.id);
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // If opening add file modal, ensure form is reset
        if (modal.id === 'addFileModal') {
            setTimeout(() => {
                const uploadArea = document.getElementById('uploadArea');
                const filePreview = document.getElementById('filePreview');
                if (uploadArea) uploadArea.style.display = 'block';
                if (filePreview) filePreview.style.display = 'none';
            }, 50);
        }
    } else {
        console.error('Modal not found');
    }
}

function closeModalFunc(modal) {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        // Reset form if it's the add file modal
        if (modal.id === 'addFileModal') {
            resetUploadForm();
        }
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function saveFilesToStorage() {
    localStorage.setItem('saveit_files', JSON.stringify(filesData));
    localStorage.setItem('saveit_counter', fileIdCounter);
}

function loadFilesFromStorage() {
    const saved = localStorage.getItem('saveit_files');
    const counter = localStorage.getItem('saveit_counter');
    
    if (saved) {
        filesData = JSON.parse(saved);
    }
    if (counter) {
        fileIdCounter = parseInt(counter);
    }
}

// ========================================
// LOGOUT FUNCTIONALITY
// ========================================
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any session data if needed
        // localStorage.clear(); // Uncomment if you want to clear all data
        
        // Redirect to sign in page
        window.location.href = 'SignIn.php';
    }
}

// ========================================
// PASSWORD TOGGLE FUNCTIONALITY
// ========================================

/**
 * Toggle password visibility
 * @param {string} inputId - The ID of the password input field
 */
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(`${inputId}-eye`);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// ========================================
// FORM VALIDATION
// ========================================

/**
 * Show error message and apply error styling
 * @param {string} inputId - The ID of the input field
 * @param {string} message - The error message to display
 */
function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    // Add error class to input
    input.classList.add('error');
    input.classList.remove('success');
    
    // Show error message
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

/**
 * Clear error message and styling
 * @param {string} inputId - The ID of the input field
 */
function clearError(inputId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    // Remove error class
    input.classList.remove('error');
    
    // Hide error message
    errorElement.textContent = '';
    errorElement.classList.remove('show');
}

/**
 * Show success styling
 * @param {string} inputId - The ID of the input field
 */
function showSuccess(inputId) {
    const input = document.getElementById(inputId);
    
    // Add success class
    input.classList.add('success');
    input.classList.remove('error');
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate email field
 * @param {string} email - The email value
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
    if (email === '') {
        showError('email', 'Email is required');
        return false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return false;
    } else {
        clearError('email');
        showSuccess('email');
        return true;
    }
}

/**
 * Validate password field
 * @param {string} password - The password value
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePassword(password) {
    if (password === '') {
        showError('password', 'Password is required');
        return false;
    } else if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        return false;
    } else {
        clearError('password');
        showSuccess('password');
        return true;
    }
}

// ========================================
// REAL-TIME VALIDATION
// ========================================

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signInForm = document.getElementById('signInForm');
    
    // Real-time email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            validateEmail(this.value.trim());
        });
        
        emailInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateEmail(this.value.trim());
            }
        });
    }
    
    // Real-time password validation
    if (passwordInput) {
        passwordInput.addEventListener('blur', function() {
            validatePassword(this.value);
        });
        
        passwordInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validatePassword(this.value);
            }
        });
    }
    
    // Form submission validation
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const email = emailInput.value.trim();
            const password = passwordInput.value;
            
            // Validate all fields
            const isEmailValid = validateEmail(email);
            const isPasswordValid = validatePassword(password);
            
            // If all validations pass
            if (isEmailValid && isPasswordValid) {
                // Add loading state to button
                const submitBtn = this.querySelector('.btn-primary');
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    console.log('Form submitted successfully!');
                    console.log('Email:', email);
                    console.log('Password:', password);
                    
                    // Remove loading state
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    
                    // Here you would typically send the data to your server
                    // Example: window.location.href = 'Dashboard.html';
                }, 1500);
            } else {
                // Scroll to first error
                const firstError = document.querySelector('.form-input.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
    }
});

// ========================================
// SIGN UP FORM VALIDATION
// ========================================

/**
 * Validate first name field
 * @param {string} firstName - The first name value
 * @returns {boolean} - True if valid, false otherwise
 */
function validateFirstName(firstName) {
    if (firstName === '') {
        showError('firstName', 'First name is required');
        return false;
    } else if (firstName.length < 2) {
        showError('firstName', 'First name must be at least 2 characters');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        showError('firstName', 'First name can only contain letters');
        return false;
    } else {
        clearError('firstName');
        showSuccess('firstName');
        return true;
    }
}

/**
 * Validate last name field
 * @param {string} lastName - The last name value
 * @returns {boolean} - True if valid, false otherwise
 */
function validateLastName(lastName) {
    if (lastName === '') {
        showError('lastName', 'Last name is required');
        return false;
    } else if (lastName.length < 2) {
        showError('lastName', 'Last name must be at least 2 characters');
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(lastName)) {
        showError('lastName', 'Last name can only contain letters');
        return false;
    } else {
        clearError('lastName');
        showSuccess('lastName');
        return true;
    }
}

/**
 * Validate confirm password field
 * @param {string} password - The password value
 * @param {string} confirmPassword - The confirm password value
 * @returns {boolean} - True if valid, false otherwise
 */
function validateConfirmPassword(password, confirmPassword) {
    if (confirmPassword === '') {
        showError('confirmPassword', 'Please confirm your password');
        return false;
    } else if (confirmPassword !== password) {
        showError('confirmPassword', 'Passwords do not match');
        return false;
    } else {
        clearError('confirmPassword');
        showSuccess('confirmPassword');
        return true;
    }
}

// ========================================
// SIGN UP FORM LISTENERS
// ========================================

// Sign Up Form Event Listeners
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const confirmPasswordInput = document.getElementById('confirmPassword');
const signUpForm = document.getElementById('signUpForm');

// First Name validation
if (firstNameInput) {
    firstNameInput.addEventListener('blur', function() {
        validateFirstName(this.value.trim());
    });
    
    firstNameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateFirstName(this.value.trim());
        }
    });
}

// Last Name validation
if (lastNameInput) {
    lastNameInput.addEventListener('blur', function() {
        validateLastName(this.value.trim());
    });
    
    lastNameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateLastName(this.value.trim());
        }
    });
}

// Confirm Password validation
if (confirmPasswordInput) {
    const signUpPasswordInput = document.getElementById('password');
    
    confirmPasswordInput.addEventListener('blur', function() {
        if (signUpPasswordInput) {
            validateConfirmPassword(signUpPasswordInput.value, this.value);
        }
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        if (this.classList.contains('error') && signUpPasswordInput) {
            validateConfirmPassword(signUpPasswordInput.value, this.value);
        }
    });
}

// Sign Up Form submission
if (signUpForm) {
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validate all fields
        const isFirstNameValid = validateFirstName(firstName);
        const isLastNameValid = validateLastName(lastName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = validateConfirmPassword(password, confirmPassword);
        
        // If all validations pass
        if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            // Add loading state to button
            const submitBtn = this.querySelector('.btn-primary');
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                console.log('Sign Up Form submitted successfully!');
                console.log('First Name:', firstName);
                console.log('Last Name:', lastName);
                console.log('Email:', email);
                console.log('Password:', password);
                
                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                // Here you would typically send the data to your server
                // Example: window.location.href = 'Dashboard.html';
            }, 1500);
        } else {
            // Scroll to first error
            const firstError = document.querySelector('.form-input.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Clear all form errors
 */
function clearAllErrors() {
    const errorInputs = document.querySelectorAll('.form-input.error');
    errorInputs.forEach(input => {
        clearError(input.id);
    });
}
