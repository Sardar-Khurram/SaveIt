// ========================================
// MY FILES PAGE FUNCTIONALITY
// ========================================

let myFilesData = [];
let myFilesCurrentPage = 1;
let myFilesItemsPerPage = 10;
let myFilesFiltered = [];

// Initialize My Files Page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('myFilesTable')) {
        initMyFiles();
    }
});

function initMyFiles() {
    // Load files from localStorage
    loadMyFiles();
    
    // Render the table
    renderMyFilesTable();
    
    // Search functionality
    const searchInput = document.getElementById('myFilesSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterMyFiles(e.target.value);
        });
    }
    
    // Add file button - redirect to dashboard
    const addBtn = document.getElementById('myFilesAddBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            window.location.href = 'Dashboard.php';
        });
    }
    
    // Pagination controls
    const prevBtn = document.getElementById('myFilesPrevBtn');
    const nextBtn = document.getElementById('myFilesNextBtn');
    const entriesSelect = document.getElementById('myFilesEntriesSelect');
    
    if (prevBtn) prevBtn.addEventListener('click', () => changeMyFilesPage(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeMyFilesPage(1));
    if (entriesSelect) {
        entriesSelect.addEventListener('change', (e) => {
            myFilesItemsPerPage = parseInt(e.target.value);
            myFilesCurrentPage = 1;
            renderMyFilesTable();
        });
    }
    
    // Delete modal controls
    const deleteModal = document.getElementById('deleteModal');
    const deleteModalOverlay = document.getElementById('deleteModalOverlay');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    
    if (deleteModalOverlay) {
        deleteModalOverlay.addEventListener('click', () => closeModalFunc(deleteModal));
    }
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => closeModalFunc(deleteModal));
    }
}

function loadMyFiles() {
    const saved = localStorage.getItem('saveit_files');
    if (saved) {
        myFilesData = JSON.parse(saved);
        myFilesFiltered = [...myFilesData];
    }
}

function renderMyFilesTable() {
    const tbody = document.getElementById('myFilesTableBody');
    const emptyState = document.getElementById('myFilesEmptyState');
    const filesTable = document.getElementById('myFilesTable');
    
    console.log('Rendering My Files table. Files count:', myFilesData.length);
    
    if (myFilesData.length === 0) {
        if (filesTable) filesTable.style.display = 'none';
        if (emptyState) emptyState.classList.add('show');
        hideMyFilesPagination();
        console.log('Showing empty state');
        return;
    }
    
    if (filesTable) filesTable.style.display = 'table';
    if (emptyState) emptyState.classList.remove('show');
    
    // Get paginated data
    const startIndex = (myFilesCurrentPage - 1) * myFilesItemsPerPage;
    const endIndex = startIndex + myFilesItemsPerPage;
    const paginatedFiles = myFilesFiltered.slice(startIndex, endIndex);
    
    tbody.innerHTML = paginatedFiles.map((file, index) => `
        <tr>
            <td data-label="#">${startIndex + index + 1}</td>
            <td data-label="File Name">${escapeHtml(file.name)}</td>
            <td data-label="Type">
                <div class="file-type-icon">
                    ${getMyFileTypeIcon(file.type)}
                </div>
            </td>
            <td data-label="Size">${formatFileSize(file.size)}</td>
            <td data-label="Date Added">${formatDate(file.dateAdded)}</td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button class="action-btn btn-edit" onclick="editMyFile(${file.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn btn-delete" onclick="confirmMyFileDelete(${file.id}, '${escapeHtml(file.name)}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="action-btn btn-download" onclick="downloadMyFile(${file.id})" title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updateMyFilesPagination();
}

function confirmMyFileDelete(fileId, fileName) {
    const deleteModal = document.getElementById('deleteModal');
    const deleteFileName = document.getElementById('deleteFileName');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    if (deleteFileName) deleteFileName.textContent = fileName;
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.onclick = () => {
            deleteMyFile(fileId);
            closeModalFunc(deleteModal);
        };
    }
    
    openModal(deleteModal);
}

function deleteMyFile(fileId) {
    const file = myFilesData.find(f => f.id === fileId);
    const fileName = file ? file.name : 'Unknown file';
    
    // Remove from array
    myFilesData = myFilesData.filter(f => f.id !== fileId);
    myFilesFiltered = [...myFilesData];
    myFilesCurrentPage = 1;
    
    // Save to localStorage
    localStorage.setItem('saveit_files', JSON.stringify(myFilesData));
    
    // Log activity
    if (typeof logActivity === 'function' && file) {
        logActivity('Deleted', fileName, `File type: ${file.type}, Size: ${formatFileSize(file.size)}`);
    }
    
    // Re-render table
    renderMyFilesTable();
}

function editMyFile(fileId) {
    const file = myFilesData.find(f => f.id === fileId);
    if (file && typeof logActivity === 'function') {
        logActivity('Edited', file.name, 'File details modified');
    }
    alert('Edit functionality can be implemented based on your needs');
}

function downloadMyFile(fileId) {
    const file = myFilesData.find(f => f.id === fileId);
    if (file) {
        // Log activity
        if (typeof logActivity === 'function') {
            logActivity('Downloaded', file.name, `File type: ${file.type}, Size: ${formatFileSize(file.size)}`);
        }
        alert(`Download functionality for: ${file.name}\nThis would trigger an actual download in production.`);
    }
}

// Helper functions (reuse from main script)
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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getMyFileTypeIcon(type) {
    const icons = {
        'image': '<i class="fas fa-file-image" style="color: #ec4899; font-size: 1.5rem;" title="Image"></i>',
        'document': '<i class="fas fa-file-alt" style="color: #3b82f6; font-size: 1.5rem;" title="Document"></i>',
        'video': '<i class="fas fa-file-video" style="color: #8b5cf6; font-size: 1.5rem;" title="Video"></i>',
        'other': '<i class="fas fa-file" style="color: #6b7280; font-size: 1.5rem;" title="Other"></i>'
    };
    return icons[type] || icons['other'];
}

function openModal(modal) {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModalFunc(modal) {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Filter and Pagination Functions
function filterMyFiles(searchTerm) {
    const term = searchTerm.toLowerCase();
    
    myFilesFiltered = myFilesData.filter(file => 
        file.name.toLowerCase().includes(term)
    );
    
    myFilesCurrentPage = 1;
    renderMyFilesTable();
}

function updateMyFilesPagination() {
    const totalPages = Math.ceil(myFilesFiltered.length / myFilesItemsPerPage);
    const paginationWrapper = document.getElementById('myFilesPaginationWrapper');
    const prevBtn = document.getElementById('myFilesPrevBtn');
    const nextBtn = document.getElementById('myFilesNextBtn');
    const paginationNumbers = document.getElementById('myFilesPaginationNumbers');
    const showingStart = document.getElementById('myFilesShowingStart');
    const showingEnd = document.getElementById('myFilesShowingEnd');
    const totalEntries = document.getElementById('myFilesTotalEntries');
    
    if (!paginationWrapper) return;
    
    if (myFilesFiltered.length === 0) {
        paginationWrapper.style.display = 'none';
        return;
    }
    
    paginationWrapper.style.display = 'flex';
    
    // Update info
    const start = (myFilesCurrentPage - 1) * myFilesItemsPerPage + 1;
    const end = Math.min(myFilesCurrentPage * myFilesItemsPerPage, myFilesFiltered.length);
    showingStart.textContent = start;
    showingEnd.textContent = end;
    totalEntries.textContent = myFilesFiltered.length;
    
    // Update buttons
    prevBtn.disabled = myFilesCurrentPage === 1;
    nextBtn.disabled = myFilesCurrentPage === totalPages || totalPages === 0;
    
    // Generate page numbers
    paginationNumbers.innerHTML = generateMyFilesPageNumbers(myFilesCurrentPage, totalPages);
}

function generateMyFilesPageNumbers(current, total) {
    let html = '';
    const maxVisible = 5;
    
    if (total <= maxVisible) {
        for (let i = 1; i <= total; i++) {
            html += `<button class="page-number ${i === current ? 'active' : ''}" onclick="goToMyFilesPage(${i})">${i}</button>`;
        }
    } else {
        html += `<button class="page-number ${1 === current ? 'active' : ''}" onclick="goToMyFilesPage(1)">1</button>`;
        
        if (current > 3) {
            html += '<span class="page-ellipsis">...</span>';
        }
        
        let start = Math.max(2, current - 1);
        let end = Math.min(total - 1, current + 1);
        
        for (let i = start; i <= end; i++) {
            html += `<button class="page-number ${i === current ? 'active' : ''}" onclick="goToMyFilesPage(${i})">${i}</button>`;
        }
        
        if (current < total - 2) {
            html += '<span class="page-ellipsis">...</span>';
        }
        
        html += `<button class="page-number ${total === current ? 'active' : ''}" onclick="goToMyFilesPage(${total})">${total}</button>`;
    }
    
    return html;
}

function changeMyFilesPage(direction) {
    myFilesCurrentPage += direction;
    renderMyFilesTable();
}

function goToMyFilesPage(page) {
    myFilesCurrentPage = page;
    renderMyFilesTable();
}

function hideMyFilesPagination() {
    const paginationWrapper = document.getElementById('myFilesPaginationWrapper');
    if (paginationWrapper) {
        paginationWrapper.style.display = 'none';
    }
}
