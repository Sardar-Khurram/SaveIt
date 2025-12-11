<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Activity Log - SaveIt</title>
    <link rel="stylesheet" href="assets/CSS/style.css">
    <link rel="stylesheet" href="assets/CSS/utility.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body class="app-page">

    <?php include 'assets/includes/header.php'; ?>

    <!-- Activity Container -->
    <div class="activity-container">
        
        <!-- Activity Header -->
        <div class="activity-header">
            <h1 class="activity-title">
                <i class="fas fa-history"></i>
                Activity Log
            </h1>
            <p class="activity-subtitle">Track all your file operations and activities</p>
        </div>

        <!-- Activity Actions -->
        <section class="action-section animate-slide-up">
            <div class="action-row">
                <div class="search-wrapper activity-search-wrapper">
                    <i class="fas fa-search search-icon"></i>
                    <input type="text" id="activitySearch" class="search-input" placeholder="Search activities...">
                </div>
            </div>
        </section>

        <!-- Activity Table Section -->
        <section class="files-section animate-slide-up">
            <div class="table-container">
                <table class="files-table" id="activityTable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Action</th>
                            <th>File Name</th>
                            <th>Details</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody id="activityTableBody">
                        <!-- Activity items will be dynamically added here -->
                    </tbody>
                </table>

                <!-- Empty State -->
                <div class="empty-state center" id="activityEmpty" style="display: none;">
                    <div class="empty-icon">
                        <i class="fas fa-history"></i>
                    </div>
                    <h3 class="empty-title">No Activity Yet</h3>
                    <p class="empty-description">Your activity history will appear here once you start uploading, editing, or deleting files.</p>
                </div>

                <!-- Pagination Controls -->
                <div class="pagination-wrapper" id="activityPaginationWrapper" style="display: none;">
                    <div class="pagination-left">
                        <span class="pagination-label">Show</span>
                        <select class="entries-select" id="activityEntriesSelect">
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <span class="pagination-label">entries</span>
                    </div>
                    <div class="pagination-right">
                        <div class="pagination-info">
                            Showing <span id="activityShowingStart">1</span> to <span id="activityShowingEnd">10</span> of <span id="activityTotalEntries">0</span> entries
                        </div>
                        <div class="pagination-controls">
                            <button class="pagination-btn" id="activityPrevBtn" disabled>
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <div class="pagination-numbers" id="activityPaginationNumbers"></div>
                            <button class="pagination-btn" id="activityNextBtn" disabled>
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>

    <?php include 'assets/includes/footer.php'; ?>

    <script src="assets/Js/script.js"></script>
    <script src="assets/Js/activity.js"></script>
</body>

</html>
