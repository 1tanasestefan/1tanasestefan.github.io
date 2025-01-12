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

document.addEventListener('DOMContentLoaded', function () {
    const element = document.getElementById("typing-effect");
    const paragraphs = Array.from(element.querySelectorAll("p"));
    const typingSpeed = 50; // viteza

    let currentParagraph = 0;
    let currentText = "";
    let currentIndex = 0;

    function typeEffect() {
        if (currentParagraph < paragraphs.length) {
            const paragraphText = paragraphs[currentParagraph].textContent;

            if (currentIndex < paragraphText.length) {
                currentText += paragraphText[currentIndex];
                element.innerHTML = currentText + "|"; // blinking cursor
                currentIndex++;
                setTimeout(typeEffect, typingSpeed);
            } else {
                // urmatorul paragraf
                currentText += "<br><br>";
                currentParagraph++;
                currentIndex = 0;
                setTimeout(typeEffect, 500); // pauza intre paragrafe
            }
        } else {
            element.innerHTML = currentText; // elimin cursorul dupa ce este afisat textul
        }
    }

    // sterg textul initial
    element.innerHTML = "";
    typeEffect();
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

// culoare random pentru buton cu math si random

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    //formam un cod hexa specific unei culori prin alegerea succesiv aleatoare a unei cifre b16
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const colorButton = document.querySelector('.color-button');

// la fiecare 5 secunde se va schimba culoarea

setInterval(() => {
    const randomColor = getRandomColor();
    colorButton.style.backgroundColor = randomColor;
}, 5000);

// fetch datelor din fisierul json pentru a fi afisat in consola

document.querySelector('.color-button').addEventListener('click', function () {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Esuat: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Date secrete:', data); //succes
        })
        .catch(error => {
            console.error('A fost o problema cu operatia de fetch: ', error);
        });
});
