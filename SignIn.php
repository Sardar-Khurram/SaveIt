<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sign in to your SaveIt account to access all features">

    <!-- Title -->
    <title>Sign In - SaveIt</title>

    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/CSS/style.css">
</head>

<body>
    <!-- Authentication Container -->
    <div class="auth-container">
        <!-- Left Side - Content Section -->
        <div class="auth-left">
            <div class="auth-left-content">
                <!-- Wise Quote -->
                <p class="wise-quote">A WISE QUOTE</p>

                <!-- Main Heading -->
                <h1 class="auth-heading">
                    Save Your
                    Files
                    Securely Online
                </h1>

                <!-- Subheading -->
                <p class="auth-subheading">
                    Store, organize, and access all your important files from anywhere in the world.
                    Experience seamless cloud storage with enterprise-grade security.
                    Your complete digital storage solution made simple, secure, and accessible.
                </p>
            </div>
        </div>

        <!-- Right Side - Form Section -->
        <div class="auth-right">
            <div class="auth-card">

                <!-- Title & Description -->
                <h2 class="auth-title">Welcome Back</h2>
                <p class="auth-description">Sign in to access your saved files and documents</p>

                <!-- Sign In Form -->
                <form class="auth-form" id="signInForm">
                    <!-- Email Input -->
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <div class="input-wrapper">
                            <input type="email" id="email" name="email" class="form-input"
                                placeholder="Enter your email">
                            <i class="fa-solid fa-envelope input-icon"></i>
                        </div>
                        <span class="error-message" id="email-error"></span>
                    </div>

                    <!-- Password Input -->
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <div class="input-wrapper">
                            <input type="password" id="password" name="password" class="form-input"
                                placeholder="Enter your password">
                            <i class="fa-solid fa-lock input-icon"></i>
                            <button type="button" class="password-toggle" onclick="togglePassword('password')">
                                <i class="fa-solid fa-eye" id="password-eye"></i>
                            </button>
                        </div>
                        <span class="error-message" id="password-error"></span>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="form-options">
                        <div class="checkbox-wrapper">
                            <input type="checkbox" id="remember" name="remember" class="custom-checkbox">
                            <label for="remember" class="checkbox-label">Remember me</label>
                        </div>
                        <a href="#" class="forgot-link">Forgot Password</a>
                    </div>

                    <!-- Sign In Button -->
                    <button type="submit" class="btn btn-primary">
                        <span>Sign In</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </form>

                <!-- Footer Link -->
                <div class="auth-footer">
                    Don't have an account? <a href="SignUp.php" class="auth-footer-link">Sign Up</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Custom JavaScript -->
    <script src="assets/Js/script.js"></script>
</body>

</html>