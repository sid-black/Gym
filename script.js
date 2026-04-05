document.addEventListener("DOMContentLoaded", () => {
  // Login Validation
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");
      
      let isValid = true;
      
      // Reset errors
      emailError.style.display = "none";
      passwordError.style.display = "none";
      
      // Validate Email
      if (!email.includes("@")) {
        emailError.textContent = "Please enter a valid email containing '@'";
        emailError.style.display = "block";
        isValid = false;
      }
      
      // Validate Password
      if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long";
        passwordError.style.display = "block";
        isValid = false;
      }
      
      if (isValid) {
        // Simulate login routing
        if (email.includes("admin")) {
          window.location.href = "admin.html";
        } else if (email.includes("trainer")) {
          window.location.href = "trainer.html";
        } else {
          window.location.href = "member.html";
        }
      }
    });
  }

  // Register Validation
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      
      const emailError = document.getElementById("emailError");
      const passwordError = document.getElementById("passwordError");
      const confirmError = document.getElementById("confirmError");
      
      let isValid = true;
      
      // Reset errors
      emailError.style.display = "none";
      passwordError.style.display = "none";
      confirmError.style.display = "none";
      
      if (!email.includes("@")) {
        emailError.textContent = "Please enter a valid email containing '@'";
        emailError.style.display = "block";
        isValid = false;
      }
      
      if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long";
        passwordError.style.display = "block";
        isValid = false;
      }
      
      if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match";
        confirmError.style.display = "block";
        isValid = false;
      }
      
      if (isValid) {
        const btn = registerForm.querySelector('button');
        const text = btn.textContent;
        btn.textContent = "Creating account...";
        btn.style.opacity = "0.8";
        
        // Simulate API call and redirect
        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
      }
    });
  }
  
  // Interactive label focus effects
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      const label = input.parentElement.querySelector('label');
      if (label) label.style.color = 'var(--primary)';
    });
    input.addEventListener('blur', () => {
      const label = input.parentElement.querySelector('label');
      if (label) label.style.color = 'var(--text-muted)';
    });
  });
});
