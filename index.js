// butonul de dark mode si navbar links
const darkModeToggle = document.querySelector('.dark-mode-toggle');
const navbarLinks = document.querySelectorAll('.nav-links a');

// on/off dark mode
function toggleDarkMode() {
    // adaugam clasa light-mode body-ului
    document.body.classList.toggle('light-mode');

    // Find all sections and toggle the same class
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.toggle('light-mode');
    });

    // Toggle the class on the header and footer for consistency
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

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const message = document.getElementById("message").value;
    if (!message.trim()) return;

    // notificare
    const notification = document.getElementById("notification");
    notification.textContent = "Message sent successfully!";
    notification.style.display = "block";
    notification.style.background = "#4caf50";
    notification.style.color = "#fff";
    notification.style.padding = "10px";
    notification.style.marginTop = "10px";
    notification.style.borderRadius = "5px";
    notification.style.animation = "fade-in";

    // ascunde dupa 3 secunde
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);

    document.getElementById("message").value = "";
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const messageList = document.querySelector('#message-list');

    // Load messages from localStorage
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    storedMessages.forEach(displayMessage);

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const name = form.elements['name'].value;
        const email = form.elements['email'].value;
        const message = form.elements['message'].value;
        const timestamp = new Date().toLocaleString(); // Get current date and time

        // Create message data object
        const messageData = { name, email, message, timestamp };

        // Add the new message to localStorage
        storedMessages.push(messageData);
        localStorage.setItem('messages', JSON.stringify(storedMessages));

        // Display the message
        displayMessage(messageData);

        // Reset the form
        form.reset();
    });

    // Function to display a message on the page
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


