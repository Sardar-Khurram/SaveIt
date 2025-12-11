<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Files - SaveIt</title>
    <link rel="stylesheet" href="assets/CSS/style.css">
    <link rel="stylesheet" href="assets/CSS/utility.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body class="app-page">

    <?php include 'assets/includes/header.php'; ?>

    <!-- My Files Container -->
    <div class="myfiles-container">

        <!-- Search and Add Section -->
        <section class="action-section animate-slide-up">
            <div class="action-row">
                <div class="search-wrapper MyFiles-search-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="myFilesSearchInput" class="search-input"
                        placeholder="Search files by name...">
                </div>
                
            </div>
        </section>


        <!-- Files Table Section -->
        <section class="files-section">
            <div class="table-container">
                <table class="files-table" id="myFilesTable">
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
                    <tbody id="myFilesTableBody">
                        <!-- Files will be dynamically added here -->
                    </tbody>
                </table>

                <!-- Pagination Controls -->
                <div class="pagination-wrapper" id="myFilesPaginationWrapper" style="display: none;">
                    <div class="pagination-left">
                        <span class="pagination-label">Show</span>
                        <select class="entries-select" id="myFilesEntriesSelect">
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <span class="pagination-label">entries</span>
                    </div>
                    <div class="pagination-right">
                        <div class="pagination-info">
                            Showing <span id="myFilesShowingStart">1</span> to <span id="myFilesShowingEnd">10</span> of
                            <span id="myFilesTotalEntries">0</span> entries
                        </div>
                        <div class="pagination-controls">
                            <button class="pagination-btn" id="myFilesPrevBtn" disabled>
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <div class="pagination-numbers" id="myFilesPaginationNumbers"></div>
                            <button class="pagination-btn" id="myFilesNextBtn" disabled>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div class="empty-state" id="myFilesEmptyState">
                    <div class="empty-icon">
                        <i class="fas fa-folder-open"></i>
                    </div>
                    <h3 class="empty-title">No Files Found</h3>
                    <p class="empty-description">You don't have any files yet. Go to Dashboard to upload your first
                        file.</p>
                </div>
            </div>
        </section>

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
    <script src="assets/Js/myfiles.js"></script>
</body>

</html>