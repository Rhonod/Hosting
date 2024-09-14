// admin.js

document.addEventListener('DOMContentLoaded', () => {
    const suspendBtn = document.getElementById('suspend-btn');
    const userIdInput = document.getElementById('user-id');
    const suspendMessage = document.getElementById('suspend-message');
    const fileList = document.getElementById('file-list');

    // Handle user suspension
    suspendBtn.addEventListener('click', () => {
        const userId = userIdInput.value;
        if (!userId) {
            suspendMessage.textContent = 'Please enter a user ID.';
            return;
        }

        // Replace with your API endpoint for suspending users
        fetch('https://your-external-server.com/suspend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        .then(response => response.json())
        .then(data => {
            suspendMessage.textContent = data.message;
        })
        .catch(error => {
            suspendMessage.textContent = `Error suspending user: ${error}`;
        });
    });

    // Function to load files
    function loadFiles() {
        // Replace with your API endpoint for fetching file list
        fetch('https://your-external-server.com/files')
        .then(response => response.json())
        .then(data => {
            fileList.innerHTML = '';
            data.files.forEach(file => {
                const li = document.createElement('li');
                li.textContent = file.name;
                fileList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching files:', error);
        });
    }

    // Load files on page load
    loadFiles();
});
