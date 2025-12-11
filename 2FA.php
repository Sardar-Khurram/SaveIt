<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Enter your two-factor authentication code">

    <!-- Title -->
    <title>Two-Factor Authentication - SaveIt</title>

    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="assets/CSS/style.css">
</head>

<body class="auth-page">
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

                <!-- Icon -->
                <div class="tfa-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>

                <!-- Title & Description -->
                <h2 class="auth-title">Two-Factor Authentication</h2>
                <p class="auth-description">Enter the 6-digit code from your authenticator app</p>

                <!-- 2FA Form -->
                <form class="auth-form" id="tfaForm">
                    <!-- Code Input -->
                    <div class="form-group">
                        <label for="tfaCode" class="form-label">Verification Code</label>
                        <div class="tfa-code-wrapper">
                            <input type="text" id="digit1" maxlength="1" class="tfa-input" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                            <input type="text" id="digit2" maxlength="1" class="tfa-input" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                            <input type="text" id="digit3" maxlength="1" class="tfa-input" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                            <input type="text" id="digit4" maxlength="1" class="tfa-input" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                            <input type="text" id="digit5" maxlength="1" class="tfa-input" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                            <input type="text" id="digit6" maxlength="1" class="tfa-input" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                        </div>
                        <span class="error-message" id="tfa-error"></span>
                    </div>

                    <!-- Verify Button -->
                    <button type="submit" class="btn btn-primary">
                        <span>Verify Code</span>
                        <i class="fa-solid fa-check"></i>
                    </button>

                    <!-- Resend Code -->
                    <div class="tfa-resend">
                        <p>Didn't receive a code?</p>
                        <button type="button" class="resend-btn" id="resendBtn">
                            <i class="fas fa-redo"></i>
                            Resend Code
                        </button>
                    </div>
                </form>

                <!-- Footer Link -->
                <div class="auth-footer">
                    <a href="SignIn.php" class="auth-footer-link">
                        <i class="fas fa-arrow-left"></i>
                        Back to Sign In
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="assets/Js/script.js"></script>
    <script>
        // 2FA Code Input Handler
        const tfaInputs = document.querySelectorAll('.tfa-input');
        
        tfaInputs.forEach((input, index) => {
            input.addEventListener('input', function(e) {
                // Only allow numbers
                this.value = this.value.replace(/[^0-9]/g, '');
                
                // Move to next input if value is entered
                if (this.value.length === 1 && index < tfaInputs.length - 1) {
                    tfaInputs[index + 1].focus();
                }
            });

            input.addEventListener('keydown', function(e) {
                // Move to previous input on backspace if current is empty
                if (e.key === 'Backspace' && this.value === '' && index > 0) {
                    tfaInputs[index - 1].focus();
                }
            });

            // Auto-select on focus
            input.addEventListener('focus', function() {
                this.select();
            });

            // Paste handler
            input.addEventListener('paste', function(e) {
                e.preventDefault();
                const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
                
                if (pastedData.length === 6) {
                    tfaInputs.forEach((inp, idx) => {
                        inp.value = pastedData[idx] || '';
                    });
                    tfaInputs[5].focus();
                }
            });
        });

        // Form Submit Handler
        document.getElementById('tfaForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const code = Array.from(tfaInputs).map(input => input.value).join('');
            
            if (code.length !== 6) {
                document.getElementById('tfa-error').textContent = 'Please enter all 6 digits';
                return;
            }

            // Simulate verification (replace with actual verification)
            console.log('Verifying code:', code);
            
            // On success, redirect to dashboard
            // window.location.href = 'Dashboard.php';
        });

        // Resend Code Handler
        document.getElementById('resendBtn').addEventListener('click', function() {
            // Clear all inputs
            tfaInputs.forEach(input => input.value = '');
            tfaInputs[0].focus();
            
            // Simulate resend (replace with actual resend logic)
            alert('Verification code resent!');
        });
    </script>
</body>

</html>
