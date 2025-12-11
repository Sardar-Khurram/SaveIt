<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Create your SaveIt account and start saving today">

    <!-- Title -->
    <title>Sign Up - SaveIt</title>

    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/CSS/style.css">
</head>

<body class="auth-page">
    <!-- Authentication Container -->
    <div class="auth-container signup">
        <!-- Left Side - Content Section -->
        <div class="auth-left">
            <div class="auth-left-content">
                <!-- Wise Quote -->
                <p class="wise-quote">A WISE QUOTE</p>

                <!-- Main Heading -->
                <h1 class="auth-heading">
                    Join SaveIt<br>
                    Start Saving<br>
                    Your Files Today
                </h1>

                <!-- Subheading -->
                <p class="auth-subheading">
                    Create your free account and get instant access to secure cloud storage.
                    Store, organize, and access all your important files from anywhere in the world.
                    Your complete digital storage solution made simple, secure, and accessible.
                </p>
            </div>
        </div>

        <!-- Right Side - Form Section -->
        <div class="auth-right">
            <div class="auth-card">


                <!-- Title & Description -->
                <h2 class="auth-title">Create Account</h2>
                <p class="auth-description">Get started with your free SaveIt account</p>

                <!-- Sign Up Form -->
                <form class="auth-form" id="signUpForm">
                    <!-- Name Row - First Name & Last Name -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName" class="form-label">First Name</label>
                            <div class="input-wrapper">
                                <input type="text" id="firstName" name="firstName" class="form-input"
                                    placeholder="First name">
                                <i class="fa-solid fa-user input-icon"></i>
                            </div>
                            <span class="error-message" id="firstName-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="lastName" class="form-label">Last Name</label>
                            <div class="input-wrapper">
                                <input type="text" id="lastName" name="lastName" class="form-input"
                                    placeholder="Last name">
                                <i class="fa-solid fa-user input-icon"></i>
                            </div>
                            <span class="error-message" id="lastName-error"></span>
                        </div>
                    </div>

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

                    <!-- Password Row - Password & Confirm Password -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <div class="input-wrapper">
                                <input type="password" id="password" name="password" class="form-input"
                                    placeholder="Password">
                                <i class="fa-solid fa-lock input-icon"></i>
                                <button type="button" class="password-toggle" onclick="togglePassword('password')">
                                    <i class="fa-solid fa-eye" id="password-eye"></i>
                                </button>
                            </div>
                            <span class="error-message" id="password-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <div class="input-wrapper">
                                <input type="password" id="confirmPassword" name="confirmPassword" class="form-input"
                                    placeholder="Confirm password">
                                <i class="fa-solid fa-lock input-icon"></i>
                                <button type="button" class="password-toggle"
                                    onclick="togglePassword('confirmPassword')">
                                    <i class="fa-solid fa-eye" id="confirmPassword-eye"></i>
                                </button>
                            </div>
                            <span class="error-message" id="confirmPassword-error"></span>
                        </div>
                    </div>

                    <!-- Sign Up Button -->
                    <button type="submit" class="btn btn-primary">
                        <span>Sign Up</span>
                        <i class="fa-solid fa-user-plus"></i>
                    </button>
                </form>

                <!-- Footer Link -->
                <div class="auth-footer">
                    Already have an account? <a href="SignIn.php" class="auth-footer-link">Sign In</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Custom JavaScript -->
    <script src="assets/Js/script.js"></script>
</body>

</html>