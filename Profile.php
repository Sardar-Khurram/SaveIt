<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile - SaveIt</title>
    <link rel="stylesheet" href="assets/CSS/style.css">
    <link rel="stylesheet" href="assets/CSS/utility.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</head>

<body class="app-page">

    <?php include 'assets/includes/header.php'; ?>

    <!-- Main Profile Container -->
    <div class="dashboard-container">

        <!-- Profile Header Section -->
        <section class="profile-header-section animate-fade-in">
            <div class="profile-header-card">
                <div class="profile-avatar-container">
                    <div class="profile-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <button class="change-avatar-btn" id="changeAvatarBtn">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
                <div class="profile-header-info">
                    <h1 class="profile-name" id="profileName">John Doe</h1>
                    <p class="profile-email" id="profileEmail">john.doe@example.com</p>
                    <div class="profile-stats">
                        <div class="profile-stat-item">
                            <i class="fas fa-calendar-alt"></i>
                            <span>Member since <strong id="memberSince">Dec 2024</strong></span>
                        </div>
                        <div class="profile-stat-item">
                            <i class="fas fa-file-alt"></i>
                            <span><strong id="totalFilesCount">0</strong> Files Saved</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Profile Details Section -->
        <section class="profile-details-section animate-slide-up">
            <div class="profile-details-grid">
                
                <!-- Personal Information Card -->
                <div class="profile-card">
                    <div class="profile-card-header">
                        <h2 class="profile-card-title">
                            <i class="fas fa-user-edit"></i>
                            Personal Information
                        </h2>
                        <button class="btn btn-secondary btn-sm" id="editPersonalBtn">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                    </div>
                    <div class="profile-card-body">
                        <div class="profile-info-grid">
                            <div class="profile-info-item">
                                <label class="profile-info-label">Full Name</label>
                                <p class="profile-info-value" id="displayName">John Doe</p>
                            </div>
                            <div class="profile-info-item">
                                <label class="profile-info-label">Email Address</label>
                                <p class="profile-info-value" id="displayEmail">john.doe@example.com</p>
                            </div>
                            <div class="profile-info-item">
                                <label class="profile-info-label">Phone Number</label>
                                <p class="profile-info-value" id="displayPhone">+1 234 567 8900</p>
                            </div>
                            <div class="profile-info-item">
                                <label class="profile-info-label">Location</label>
                                <p class="profile-info-value" id="displayLocation">New York, USA</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Account Settings Card -->
                <div class="profile-card">
                    <div class="profile-card-header">
                        <h2 class="profile-card-title">
                            <i class="fas fa-cog"></i>
                            Account Settings
                        </h2>
                    </div>
                    <div class="profile-card-body">
                        <div class="settings-list">
                            <div class="settings-item">
                                <div class="settings-item-info">
                                    <i class="fas fa-shield-alt"></i>
                                    <div>
                                        <h4>Two-Factor Authentication</h4>
                                        <p>Add an extra layer of security</p>
                                    </div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="toggle2FA">
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div class="settings-item">
                                <div class="settings-item-info">
                                    <i class="fas fa-bell"></i>
                                    <div>
                                        <h4>Email Notifications</h4>
                                        <p>Receive updates via email</p>
                                    </div>
                                </div>
                                <label class="toggle-switch">
                                    <input type="checkbox" id="toggleNotifications" checked>
                                    <span class="toggle-slider"></span>
                                </label>
                            </div>
                            <div class="settings-item">
                                <button class="btn btn-outline-primary btn-full">
                                    <i class="fas fa-key"></i>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Storage Information Card -->
                <div class="profile-card">
                    <div class="profile-card-header">
                        <h2 class="profile-card-title">
                            <i class="fas fa-database"></i>
                            Storage Information
                        </h2>
                    </div>
                    <div class="profile-card-body">
                        <div class="storage-info">
                            <div class="storage-bar-container">
                                <div class="storage-bar">
                                    <div class="storage-bar-fill" id="storageBarFill" style="width: 0%"></div>
                                </div>
                                <div class="storage-text">
                                    <span id="storageUsedDisplay">0 MB</span> of <span>500 MB</span> used
                                </div>
                            </div>
                            <div class="storage-breakdown">
                                <div class="storage-breakdown-item">
                                    <i class="fas fa-file-alt" style="color: #3b82f6;"></i>
                                    <span>Documents: <strong id="docsStorage">0 MB</strong></span>
                                </div>
                                <div class="storage-breakdown-item">
                                    <i class="fas fa-image" style="color: #ec4899;"></i>
                                    <span>Images: <strong id="imagesStorage">0 MB</strong></span>
                                </div>
                                <div class="storage-breakdown-item">
                                    <i class="fas fa-file" style="color: #6b7280;"></i>
                                    <span>Others: <strong id="othersStorage">0 MB</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    </div>

    <!-- Edit Personal Info Modal -->
    <div class="modal" id="editPersonalModal">
        <div class="modal-overlay" id="editPersonalOverlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">
                    <i class="fas fa-user-edit"></i>
                    Edit Personal Information
                </h2>
                <button class="modal-close" id="closeEditPersonal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-user"></i>
                        Full Name
                    </label>
                    <div class="input-wrapper">
                        <i class="input-icon fas fa-user"></i>
                        <input type="text" id="editName" class="form-input" placeholder="Enter your full name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-envelope"></i>
                        Email Address
                    </label>
                    <div class="input-wrapper">
                        <i class="input-icon fas fa-envelope"></i>
                        <input type="email" id="editEmail" class="form-input" placeholder="Enter your email">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-phone"></i>
                        Phone Number
                    </label>
                    <div class="input-wrapper">
                        <i class="input-icon fas fa-phone"></i>
                        <input type="tel" id="editPhone" class="form-input" placeholder="Enter your phone number">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <i class="fas fa-map-marker-alt"></i>
                        Location
                    </label>
                    <div class="input-wrapper">
                        <i class="input-icon fas fa-map-marker-alt"></i>
                        <input type="text" id="editLocation" class="form-input" placeholder="Enter your location">
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" id="cancelEditPersonal">
                        <i class="fas fa-times"></i>
                        Cancel
                    </button>
                    <button type="button" class="btn btn-primary" id="saveEditPersonal">
                        <i class="fas fa-save"></i>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>

    <?php include 'assets/includes/footer.php'; ?>

    <script src="assets/Js/profile.js"></script>
</body>

</html>
