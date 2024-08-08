const apiUrl = 'http://localhost:5000/api'; // Adjust this if your backend is hosted elsewhere
let token = '';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-form').addEventListener('submit', loginUser);
    document.getElementById('signup-form').addEventListener('submit', signupUser);
    document.getElementById('show-signup').addEventListener('click', () => {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('signup-section').style.display = 'block';
    });
    document.getElementById('show-login').addEventListener('click', () => {
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
    });
    document.getElementById('create-blog-btn').addEventListener('click', () => {
        document.getElementById('create-blog-form').style.display = 'block';
    });
    document.getElementById('create-blog-form').addEventListener('submit', createBlog);
    loadBlogs();
});

async function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch(${apiUrl}/auth/login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        token = data.token;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('blog-section').style.display = 'block';
        loadBlogs();
    } else {
        alert(data.msg);
    }
}

async function signupUser(e) {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const response = await fetch(${apiUrl}/auth/signup, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        document.getElementById('signup-section').style.display = 'none';
        document.getElementById('auth-section').style.display = 'block';
    } else {
        alert(data.msg);
    }
}

async function loadBlogs() {
    const response = await fetch(${apiUrl}/blogs);
    const blogs = await response.json();
    const blogList = document.getElementById('blog-list');
    blogList.innerHTML = '';

    blogs.forEach(blog => {
        const div = document.createElement('div');
        div.classList.add('blog-item');
        div.innerHTML = `
            <h3>${blog.title}</h3>
            <p>${blog.content}</p>
            <small>by ${blog.author.username}</small>
        `;
        blogList.appendChild(div);
    });
}

async function createBlog(e) {
    e.preventDefault();
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;

    const response = await fetch(${apiUrl}/blogs, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        },
        body: JSON.stringify({ title, content })
    });

    if (response.ok) {
        document.getElementById('create-blog-form').style.display = 'none';
        loadBlogs();
    } else {
        alert('Failed to create blog');
    }
}