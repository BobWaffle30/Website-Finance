// Switch between login and registration forms
function toggleForms() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm.style.display === 'none') {
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

// Register user
async function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful!');
            toggleForms(); // Switch to login form after registration
        } else {
            alert(data.error || 'Registration failed');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred during registration');
    }
}

// Login user
async function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            document.getElementById('user-name').innerText = email;
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('user-info').style.display = 'block';
        } else {
            alert(data.error || 'Login failed');
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        alert('An error occurred during login');
    }
}

// Logout user
function logoutUser() {
    localStorage.removeItem('authToken');
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}
