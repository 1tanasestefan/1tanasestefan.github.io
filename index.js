// butonul de dark mode si navbar links
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const navbarLinks = document.querySelectorAll('.nav-links a');

// on/off dark mode
function toggleDarkMode() {
    // adaugam clasa light-mode body-ului
    document.body.classList.toggle('light-mode');

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.toggle('light-mode');
    });

    // toggle pentru header si footer lightmode
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    header.classList.toggle('light-mode');
    footer.classList.toggle('light-mode');

    navbarLinks.forEach(link => {
        link.classList.add('light-mode');
    });

}

// activeaza dark mode
darkModeToggle.addEventListener('click', toggleDarkMode);

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // pentru a preveni submisia formularului

    // display notificare
    const notification = document.getElementById('notification');
    notification.textContent = 'Message sent successfully!';
    notification.classList.remove('hidden');

    // ascunde dupa 5 secunde
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 5000);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const messageList = document.querySelector('#message-list');

    // incarcam mesajele din localstorage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.forEach(displayMessage);

    // form submission handle
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // valorile din input uri
        const name = form.elements['name'].value;
        const email = form.elements['email'].value;
        const message = form.elements['message'].value;
        const timestamp = new Date().toLocaleString(); // data si ora

        // obiect pentru datele mesajului
        const messageData = { name, email, message, timestamp };

        // adauga mesajul in localstorage
        storedMessages.push(messageData);
        localStorage.setItem('messages', JSON.stringify(storedMessages));

        // display message
        displayMessage(messageData);

        // si apoi resetam formularul
        form.reset();
    });

    // functia pentru display message
    function displayMessage({ name, email, message, timestamp }) {
        const messageItem = document.createElement('li');
        messageItem.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Sent On:</strong> ${timestamp}</p>
        `;
        messageList.appendChild(messageItem);
    }
});


