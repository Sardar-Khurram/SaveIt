<!-- Header -->
<header class="main-header">
    <div class="header-container">
        <!-- Logo Section -->
        <div class="header-logo">
            <i class="fas fa-save"></i>
            <a href="Dashboard.php">SaveIt</a>
        </div>

        <!-- Navigation Section -->
        <nav class="header-nav">
            <a href="myFiles.php" class="nav-link">
                <i class="fas fa-folder"></i>
                <span>My Files</span>
            </a>
            <a href="activity.php" class="nav-link">
                <i class="fas fa-history"></i>
                <span>Activity</span>
            </a>
            <a href="Profile.php" class="nav-link profile-link" title="Profile">
                <i class="fas fa-user-circle"></i>
            </a>
            <button class="logout-btn" onclick="handleLogout()" title="Logout">
                <i class="fas fa-sign-out-alt"></i>
            </button>
        </nav>
    </div>
</header>