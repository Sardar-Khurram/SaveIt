<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - SaveIt</title>
    <link rel="stylesheet" href="assets/CSS/style.css">
    <link rel="stylesheet" href="assets/CSS/utility.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://unpkg.com/dropzone@5/dist/min/dropzone.min.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/dropzone@5/dist/min/dropzone.min.css" type="text/css" />
</head>

<body class="app-page">

    <?php include 'assets/includes/header.php'; ?>

    <!-- Main Dashboard Container -->
    <div class="dashboard-container">

        <!-- Stats Section -->
        <section class="stats-section">
            <div class="stats-grid">
                <div class="stat-card animate-fade-in" style="animation-delay: 0.1s">
                    <div class="stat-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                        <i class="fas fa-file-alt"></i>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-number" id="totalFiles">0</h3>
                        <p class="stat-label">Total Files</p>
                    </div>
                </div>

                <div class="stat-card animate-fade-in" style="animation-delay: 0.2s">
                    <div class="stat-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-number" id="documentsCount">0</h3>
                        <p class="stat-label">Documents</p>
                    </div>
                </div>

                <div class="stat-card animate-fade-in" style="animation-delay: 0.3s">
                    <div class="stat-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                        <i class="fas fa-image"></i>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-number" id="imagesCount">0</h3>
                        <p class="stat-label">Images</p>
                    </div>
                </div>

                <div class="stat-card animate-fade-in" style="animation-delay: 0.4s">
                    <div class="stat-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                        <i class="fas fa-hdd"></i>
                    </div>
                    <div class="stat-content">
                        <h3 class="stat-number" id="storageUsed">0 MB</h3>
                        <p class="stat-label">Storage Used</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Search and Add Section -->
        <section class="action-section  animate-slide-up">
            <div class="action-row">
                <div class="search-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="searchInput" class="search-input" placeholder="Search files by name...">
                </div>
                <button class="btn btn-add-alt" id="addFileBtn">
                    <i class="fas fa-plus"></i>
                    Add File
                </button>
            </div>
        </section>

        <!-- Files Table Section -->
        <section class="files-section animate-slide-up">
            <div class="table-container">
                <table class="files-table" id="filesTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="filesTableBody">
                        <!-- Files will be dynamically added here -->
                    </tbody>
                </table>

                <!-- Pagination Controls -->
                <div class="pagination-wrapper" id="paginationWrapper" style="display: none;">
                    <div class="pagination-left">
                        <span class="pagination-label">Show</span>
                        <select class="entries-select" id="entriesSelect">
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <span class="pagination-label">entries</span>
                    </div>
                    <div class="pagination-right">
                        <div class="pagination-info">
                            Showing <span id="showingStart">1</span> to <span id="showingEnd">10</span> of <span id="totalEntries">0</span> entries
                        </div>
                        <div class="pagination-controls">
                            <button class="pagination-btn" id="prevBtn" disabled>
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <div class="pagination-numbers" id="paginationNumbers"></div>
                            <button class="pagination-btn" id="nextBtn" disabled>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div class="empty-state " id="emptyState">
                    <div class="empty-icon">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <h3 class="empty-title">No Files Yet</h3>
                    <p class="empty-description">You haven't added any files yet. Click the "Add File" button to get
                        started.</p>
                    <div class="center">
                        <button class="btn btn-primary" onclick="document.getElementById('addFileBtn').click()">
                            <i class="fas fa-plus"></i>
                            Add Your First File
                        </button>
                    </div>
                </div>
            </div>
        </section>

    </div>

    <!-- Add File Modal -->
    <div class="modal" id="addFileModal">
        <div class="modal-overlay" id="modalOverlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-cloud-upload-alt"></i>
                    Add New File
                </h2>
                <button class="modal-close" id="closeModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>

            <div class="modal-body">
                <!-- Dropzone Upload Area -->
                <div id="myDropzone" class="dropzone">
                    <div class="dz-message">
                        <i class="fas fa-cloud-upload-alt" style="font-size: 3rem; color: var(--primary-blue); margin-bottom: 1rem;"></i>
                        <h3 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem;">Drop files here or click to upload</h3>
                        <p style="color: var(--text-gray); font-size: 0.9rem;">Support for all file types</p>
                    </div>
                </div>

                <!-- Custom File Name -->
                <div class="form-group" style="margin-top: 1.5rem;">
                    <label class="form-label">
                        <i class="fas fa-tag"></i>
                        Custom File Name (Optional)
                    </label>
                    <div class="input-wrapper">
                        <i class="input-icon fas fa-pencil-alt"></i>
                        <input type="text" id="customFileName" class="form-input"
                            placeholder="Enter custom name or leave blank">
                    </div>
                    <small class="input-hint">Leave blank to use the original filename</small>
                </div>

                <!-- Modal Actions -->
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" id="cancelBtn">
                        <i class="fas fa-times"></i>
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" id="saveFileBtn">
                        <i class="fas fa-save"></i>
                        Save File
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit File Name Modal -->
    <div class="modal" id="editModal">
        <div class="modal-overlay" id="editModalOverlay"></div>
        <div class="modal-content modal-small">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-edit"></i>
                    Edit File Name
                </h2>
                <button class="modal-close" id="closeEditModal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-tag"></i>
                        File Name
                    </label>
                    <div class="input-wrapper">
                        <i class="input-icon fas fa-pencil-alt"></i>
                        <input type="text" id="editFileName" class="form-input"
                            placeholder="Enter new file name">
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" id="cancelEditBtn">
                        <i class="fas fa-times"></i>
                        Cancel
                    </button>
                    <button type="button" class="btn btn-primary" id="saveEditBtn">
                        <i class="fas fa-save"></i>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal" id="deleteModal">
        <div class="modal-overlay" id="deleteModalOverlay"></div>
        <div class="modal-content modal-small">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-exclamation-triangle" style="color: #dc2626;"></i>
                    Confirm Delete
                </h2>
            </div>
            <div class="modal-body">
                <p class="delete-message">Are you sure you want to delete "<strong id="deleteFileName"></strong>"? This
                    action cannot be undone.</p>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" id="cancelDeleteBtn">
                        <i class="fas fa-times"></i>
                        Cancel
                    </button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>

    <?php include 'assets/includes/footer.php'; ?>

    <script src="assets/Js/activity.js"></script>
    <script src="assets/Js/script.js"></script>
</body>

</html>