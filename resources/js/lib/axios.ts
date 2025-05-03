import axios from 'axios';

// Set CSRF token for all requests
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Set default headers
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Configure axios defaults
axios.defaults.withCredentials = true;

export default axios; 