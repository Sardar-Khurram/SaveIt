// ========================================
// DASHBOARD FUNCTIONALITY WITH DROPZONE
// ========================================

// Disable Dropzone auto-discover
Dropzone.autoDiscover = false;

// Sample data for demonstration
let filesData = [];
let fileIdCounter = 1;
let myDropzone = null;

// Pagination state
let currentPage = 1;
let itemsPerPage = 10;
let filteredFiles = [];

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
    
    // Save File button
    const saveFileBtn = document.getElementById('saveFileBtn');
    if (saveFileBtn) {
        saveFileBtn.addEventListener('click', () => {
            if (myDropzone && myDropzone.files.length > 0) {
                const file = myDropzone.files[0];
                
                // Simulate upload progress
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += 10;
                    myDropzone.emit("uploadprogress", file, progress, file.size * progress / 100);
                    
                    if (progress >= 100) {
                        clearInterval(progressInterval);
                        
                        // Save the file
                        handleFileUpload(file);
                        
                        // Clean up and close
                        myDropzone.removeAllFiles();
                        document.getElementById('customFileName').value = '';
                        closeModalFunc(addFileModal);
                    }
                }, 100);
            }
        });
    }
    
    // Initialize Dropzone
    initializeDropzone();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        filterFiles(e.target.value);
    });
    
    // Pagination controls
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const entriesSelect = document.getElementById('entriesSelect');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changePage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changePage(1));
    if (entriesSelect) {
        entriesSelect.addEventListener('change', (e) => {
            itemsPerPage = parseInt(e.target.value);
            currentPage = 1;
            renderFilesTable();
        });
    }
    
    // Delete modal controls
    const deleteModal = document.getElementById('deleteModal');
    const deleteModalOverlay = document.getElementById('deleteModalOverlay');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    
    deleteModalOverlay.addEventListener('click', () => closeModalFunc(deleteModal));
    cancelDeleteBtn.addEventListener('click', () => closeModalFunc(deleteModal));
}

function initializeDropzone() {
    myDropzone = new Dropzone("#myDropzone", {
        url: "#",
        autoProcessQueue: false,
        maxFilesize: 500,
        addRemoveLinks: true,
        maxFiles: 1,
        dictDefaultMessage: "Drop files here or click to upload",
        acceptedFiles: null,
        
        init: function() {
            this.on("addedfile", function(file) {
                console.log('File added:', file.name);
                // File stays visible, no auto-processing
            });
            
            this.on("maxfilesexceeded", function(file) {
                this.removeAllFiles();
                this.addFile(file);
            });
        }
    });
}

function handleFileUpload(file) {
    const customFileName = document.getElementById('customFileName');
    
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
    filteredFiles = [...filesData];
    
    // Save to localStorage
    saveFilesToStorage();
    
    // Log activity
    if (typeof logActivity === 'function') {
        logActivity('Added', fileName, `File size: ${formatFileSize(file.size)}, Type: ${fileObj.type}`);
    }
    
    // Update UI
    updateStats();
    renderFilesTable();
    
    // Reset custom file name
    customFileName.value = '';
    
    // Show success message (you can add a toast notification here)
    console.log('File uploaded successfully:', fileObj);
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
        hidePagination();
        console.log('Showing empty state');
        return;
    }
    
    if (filesTable) filesTable.style.display = 'table';
    if (emptyState) emptyState.classList.remove('show');
    
    // Get paginated data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedFiles = filteredFiles.slice(startIndex, endIndex);
    
    tbody.innerHTML = paginatedFiles.map((file, index) => `
        <tr>
            <td data-label="#">${startIndex + index + 1}</td>
            <td data-label="File Name">${escapeHtml(file.name)}</td>
            <td data-label="Type">
                <div class="file-type-icon">
                    ${getFileTypeIcon(file.type)}
                </div>
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
    
    updatePagination();
}

function filterFiles(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    filteredFiles = filesData.filter(file => 
        file.name.toLowerCase().includes(term)
    );
    
    currentPage = 1;
    renderFilesTable();
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
    const file = filesData.find(f => f.id === fileId);
    const fileName = file ? file.name : 'Unknown file';
    
    filesData = filesData.filter(f => f.id !== fileId);
    filteredFiles = [...filesData];
    saveFilesToStorage();
    currentPage = 1;
    
    // Log activity
    if (typeof logActivity === 'function' && file) {
        logActivity('Deleted', fileName, `File type: ${file.type}, Size: ${formatFileSize(file.size)}`);
    }
    
    updateStats();
    renderFilesTable();
}

function editFile(fileId) {
    const file = filesData.find(f => f.id === fileId);
    if (!file) return;
    
    const editModal = document.getElementById('editModal');
    const editFileName = document.getElementById('editFileName');
    const saveEditBtn = document.getElementById('saveEditBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const closeEditModal = document.getElementById('closeEditModal');
    const editModalOverlay = document.getElementById('editModalOverlay');
    
    // Populate current file name
    editFileName.value = file.name;
    
    // Save edit handler
    saveEditBtn.onclick = () => {
        const newName = editFileName.value.trim();
        if (newName && newName !== file.name) {
            const oldName = file.name;
            file.name = newName;
            saveFilesToStorage();
            
            // Log activity
            if (typeof logActivity === 'function') {
                logActivity('Edited', newName, `Renamed from "${oldName}"`);
            }
            
            updateStats();
            renderFilesTable();
        }
        closeModalFunc(editModal);
    };
    
    // Cancel handlers
    if (cancelEditBtn) cancelEditBtn.onclick = () => closeModalFunc(editModal);
    if (closeEditModal) closeEditModal.onclick = () => closeModalFunc(editModal);
    if (editModalOverlay) editModalOverlay.onclick = () => closeModalFunc(editModal);
    
    openModal(editModal);
}

function downloadFile(fileId) {
    const file = filesData.find(f => f.id === fileId);
    if (file) {
        // Log activity
        if (typeof logActivity === 'function') {
            logActivity('Downloaded', file.name, `File type: ${file.type}, Size: ${formatFileSize(file.size)}`);
        }
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

function getFileTypeIcon(type) {
    const icons = {
        'image': '<i class="fas fa-file-image" style="color: #ec4899; font-size: 1.5rem;" title="Image"></i>',
        'document': '<i class="fas fa-file-alt" style="color: #3b82f6; font-size: 1.5rem;" title="Document"></i>',
        'video': '<i class="fas fa-file-video" style="color: #8b5cf6; font-size: 1.5rem;" title="Video"></i>',
        'other': '<i class="fas fa-file" style="color: #6b7280; font-size: 1.5rem;" title="Other"></i>'
    };
    return icons[type] || icons['other'];
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
        filteredFiles = [...filesData];
    }
    if (counter) {
        fileIdCounter = parseInt(counter);
    }
}

// Pagination Functions
function updatePagination() {
    const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
    const paginationWrapper = document.getElementById('paginationWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const showingStart = document.getElementById('showingStart');
    const showingEnd = document.getElementById('showingEnd');
    const totalEntries = document.getElementById('totalEntries');
    
    if (!paginationWrapper) return;
    
    if (filteredFiles.length === 0) {
        paginationWrapper.style.display = 'none';
        return;
    }
    
    paginationWrapper.style.display = 'flex';
    
    // Update info
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredFiles.length);
    showingStart.textContent = start;
    showingEnd.textContent = end;
    totalEntries.textContent = filteredFiles.length;
    
    // Update buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Generate page numbers
    paginationNumbers.innerHTML = generatePageNumbers(currentPage, totalPages);
}

function generatePageNumbers(current, total) {
    let html = '';
    const maxVisible = 5;
    
    if (total <= maxVisible) {
        for (let i = 1; i <= total; i++) {
            html += `<button class="page-number ${i === current ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }
    } else {
        html += `<button class="page-number ${1 === current ? 'active' : ''}" onclick="goToPage(1)">1</button>`;
        
        if (current > 3) {
            html += '<span class="page-ellipsis">...</span>';
        }
        
        let start = Math.max(2, current - 1);
        let end = Math.min(total - 1, current + 1);
        
        for (let i = start; i <= end; i++) {
            html += `<button class="page-number ${i === current ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }
        
        if (current < total - 2) {
            html += '<span class="page-ellipsis">...</span>';
        }
        
        html += `<button class="page-number ${total === current ? 'active' : ''}" onclick="goToPage(${total})">${total}</button>`;
    }
    
    return html;
}

function changePage(direction) {
    currentPage += direction;
    renderFilesTable();
}

function goToPage(page) {
    currentPage = page;
    renderFilesTable();
}

function hidePagination() {
    const paginationWrapper = document.getElementById('paginationWrapper');
    if (paginationWrapper) {
        paginationWrapper.style.display = 'none';
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
