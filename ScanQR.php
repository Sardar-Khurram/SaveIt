<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Scan QR code to set up two-factor authentication">

    <!-- Title -->
    <title>Scan QR Code - SaveIt</title>

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
                    Secure Your
                    Account With
                    Two-Factor Authentication
                </h1>

                <!-- Setup Steps as Content -->
                <div class="auth-steps">
                    <div class="auth-step">
                        <div class="step-num">1</div>
                        <p>Download an authenticator app like Google Authenticator or Authy</p>
                    </div>
                    <div class="auth-step">
                        <div class="step-num">2</div>
                        <p>Scan the QR code or enter the manual code in your app</p>
                    </div>
                    <div class="auth-step">
                        <div class="step-num">3</div>
                        <p>Continue to enter the 6-digit verification code to complete setup</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Side - Form Section -->
        <div class="auth-right">
            <div class="auth-card">

                <!-- Icon -->
                <div class="tfa-icon">
                    <i class="fas fa-qrcode"></i>
                </div>

                <!-- Title & Description -->
                <h2 class="auth-title">Scan QR Code</h2>
                <p class="auth-description">Use your authenticator app to scan this code</p>

                <!-- QR Code Display -->
                <div class="qr-code-container">
                    <div class="qr-code-box">
                        <!-- Replace this placeholder with actual QR code generation -->
                        <div class="qr-placeholder">
                            <i class="fas fa-qrcode"></i>
                        </div>
                        <!-- Example: <img src="qr-code.png" alt="QR Code" class="qr-code-image"> -->
                    </div>
                    
                    <!-- Manual Entry Code -->
                    <div class="manual-code">
                        <p class="manual-code-label">Or enter manually:</p>
                        <div class="code-box">
                            <code id="manualCode">ABCD EFGH IJKL MNOP</code>
                            <button type="button" class="copy-btn" onclick="copyCode()">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>

                </div>

                <!-- Continue Button -->
                <a href="2FA.php" class="btn btn-primary">
                    <span>Continue</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

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
        // Copy manual code to clipboard
        function copyCode() {
            const code = document.getElementById('manualCode').textContent;
            navigator.clipboard.writeText(code.replace(/\s/g, '')).then(() => {
                const copyBtn = document.querySelector('.copy-btn');
                const originalHTML = copyBtn.innerHTML;
                
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                copyBtn.style.color = '#22c55e';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.style.color = '';
                }, 2000);
            });
        }
    </script>
</body>

</html>
