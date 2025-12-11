// ========================================
// ACTIVITY LOG FUNCTIONALITY
// ========================================

let activityLog = [];
let filteredActivities = [];
let activeFilter = 'all';
let activityCurrentPage = 1;
let activityItemsPerPage = 10;

// Initialize Activity Page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('activityTable')) {
        initActivity();
    }
});

function initActivity() {
    // Load activity log from localStorage
    loadActivityLog();
    
    // Setup filter event listeners
    setupFilterListeners();
    
    // Setup pagination listeners
    setupActivityPagination();
    
    // Render the table
    renderActivityTable();
}

function setupFilterListeners() {
    const searchInput = document.getElementById('activitySearch');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterBySearch(this.value);
        });
    }
}

function filterBySearch(searchTerm) {
    if (!searchTerm.trim()) {
        filteredActivities = [...activityLog];
    } else {
        const term = searchTerm.toLowerCase();
        
        filteredActivities = activityLog.filter(activity => {
            return activity.fileName.toLowerCase().includes(term) ||
                   activity.action.toLowerCase().includes(term) ||
                   (activity.details && activity.details.toLowerCase().includes(term));
        });
    }
    
    activityCurrentPage = 1;
    renderActivityTable();
}

function resetFilter() {
    filteredActivities = [...activityLog];
    
    const searchInput = document.getElementById('activitySearch');
    
    if (searchInput) searchInput.value = '';
    
    activityCurrentPage = 1;
    renderActivityTable();
}

function loadActivityLog() {
    const saved = localStorage.getItem('saveit_activity');
    if (saved) {
        activityLog = JSON.parse(saved);
        // Sort by date (newest first)
        activityLog.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        filteredActivities = [...activityLog];
    }
}

function setupActivityPagination() {
    const entriesSelect = document.getElementById('activityEntriesSelect');
    const prevBtn = document.getElementById('activityPrevBtn');
    const nextBtn = document.getElementById('activityNextBtn');
    
    if (entriesSelect) {
        entriesSelect.addEventListener('change', function() {
            activityItemsPerPage = parseInt(this.value);
            activityCurrentPage = 1;
            renderActivityTable();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (activityCurrentPage > 1) {
                activityCurrentPage--;
                renderActivityTable();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activities = filteredActivities.length > 0 ? filteredActivities : activityLog;
            const totalPages = Math.ceil(activities.length / activityItemsPerPage);
            if (activityCurrentPage < totalPages) {
                activityCurrentPage++;
                renderActivityTable();
            }
        });
    }
}

function renderActivityTable() {
    const tableBody = document.getElementById('activityTableBody');
    const emptyState = document.getElementById('activityEmpty');
    const table = document.getElementById('activityTable');
    const paginationWrapper = document.getElementById('activityPaginationWrapper');
    
    if (!tableBody) return;
    
    const activities = filteredActivities.length > 0 ? filteredActivities : activityLog;
    
    if (activities.length === 0) {
        table.style.display = 'none';
        emptyState.style.display = 'flex';
        paginationWrapper.style.display = 'none';
        return;
    }
    
    table.style.display = 'table';
    emptyState.style.display = 'none';
    paginationWrapper.style.display = 'flex';
    
    // Pagination
    const startIndex = (activityCurrentPage - 1) * activityItemsPerPage;
    const endIndex = startIndex + activityItemsPerPage;
    const paginatedActivities = activities.slice(startIndex, endIndex);
    
    tableBody.innerHTML = '';
    
    paginatedActivities.forEach((activity, index) => {
        const row = document.createElement('tr');
        const globalIndex = startIndex + index + 1;
        
        const actionIcon = getActionIcon(activity.action);
        const actionClass = activity.action.toLowerCase();
        
        row.innerHTML = `
            <td>${globalIndex}</td>
            <td>
                <div class="activity-action-badge ${actionClass}">
                    <i class="${actionIcon}"></i>
                    ${activity.action}
                </div>
            </td>
            <td class="file-name-cell">${escapeHtml(activity.fileName)}</td>
            <td class="details-cell">${activity.details || '-'}</td>
            <td class="date-cell">${formatActivityDate(activity.timestamp)}</td>
        `;
        
        tableBody.appendChild(row);
    });
    
    updateActivityPagination(activities.length);
}

function updateActivityPagination(totalItems) {
    const paginationNumbers = document.getElementById('activityPaginationNumbers');
    const totalPages = Math.ceil(totalItems / activityItemsPerPage);
    
    if (!paginationNumbers) return;
    
    paginationNumbers.innerHTML = '';
    
    // Update pagination info
    const startIndex = (activityCurrentPage - 1) * activityItemsPerPage + 1;
    const endIndex = Math.min(activityCurrentPage * activityItemsPerPage, totalItems);
    
    const showingStart = document.getElementById('activityShowingStart');
    const showingEnd = document.getElementById('activityShowingEnd');
    const totalEntries = document.getElementById('activityTotalEntries');
    
    if (showingStart) showingStart.textContent = startIndex;
    if (showingEnd) showingEnd.textContent = endIndex;
    if (totalEntries) totalEntries.textContent = totalItems;
    
    const maxVisiblePages = 5;
    let startPage = Math.max(1, activityCurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'page-number' + (i === activityCurrentPage ? ' active' : '');
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', function() {
            activityCurrentPage = i;
            renderActivityTable();
        });
        paginationNumbers.appendChild(pageBtn);
    }
    
    // Update prev/next button states
    const prevBtn = document.getElementById('activityPrevBtn');
    const nextBtn = document.getElementById('activityNextBtn');
    
    if (prevBtn) {
        prevBtn.disabled = activityCurrentPage === 1;
        prevBtn.classList.toggle('disabled', activityCurrentPage === 1);
    }
    
    if (nextBtn) {
        nextBtn.disabled = activityCurrentPage === totalPages;
        nextBtn.classList.toggle('disabled', activityCurrentPage === totalPages);
    }
}

function getActionIcon(action) {
    const icons = {
        'Added': 'fas fa-plus',
        'Deleted': 'fas fa-trash',
        'Edited': 'fas fa-edit',
        'Downloaded': 'fas fa-download'
    };
    return icons[action] || 'fas fa-file';
}

function formatActivityDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 1) {
        const options = { 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }
    
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

// Activity logging functions
function logActivity(action, fileName, details = '') {
    const activity = {
        id: Date.now(),
        action: action,
        fileName: fileName,
        details: details,
        timestamp: new Date().toISOString()
    };
    
    // Load existing log
    let log = [];
    const saved = localStorage.getItem('saveit_activity');
    if (saved) {
        log = JSON.parse(saved);
    }
    
    // Add new activity
    log.unshift(activity);
    
    // Keep only last 50 activities
    if (log.length > 50) {
        log = log.slice(0, 50);
    }
    
    // Save to localStorage
    localStorage.setItem('saveit_activity', JSON.stringify(log));
    
    console.log('Activity logged:', activity);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
