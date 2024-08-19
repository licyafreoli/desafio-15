document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const form = document.getElementById('form');
    const editForm = document.getElementById('editForm');
    const contactsList = document.getElementById('contacts');
    const editSection = document.getElementById('edit-form');
    const cancelEditBtn = document.getElementById('cancelEdit');
    const editIndexInput = document.getElementById('editIndex');

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function renderContacts() {
        contactsList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${contact.name}</strong> - ${contact.phone}
                <button onclick="editContact(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Excluir</button>
            `;
            contactsList.appendChild(li);
        });
    }

    function saveContacts() {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        
        contacts.push({ name, phone, email });
        saveContacts();
        renderContacts();
        
        form.reset();
    });

    window.editContact = (index) => {
        const contact = contacts[index];
        document.getElementById('editName').value = contact.name;
        document.getElementById('editPhone').value = contact.phone;
        document.getElementById('editEmail').value = contact.email;
        editIndexInput.value = index;
        editSection.style.display = 'block';
    };

    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const index = editIndexInput.value;
        const name = document.getElementById('editName').value;
        const phone = document.getElementById('editPhone').value;
        const email = document.getElementById('editEmail').value;
        
        contacts[index] = { name, phone, email };
        saveContacts();
        renderContacts();
        
        editSection.style.display = 'none';
        editForm.reset();
    });

    cancelEditBtn.addEventListener('click', () => {
        editSection.style.display = 'none';
    });

    window.deleteContact = (index) => {
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
    };

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }

    const currentTheme = localStorage.getItem('theme') || 'light';
    setTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        // Atualize o valor de currentTheme após a alteração
        currentTheme = newTheme;
    });

    renderContacts();
});
