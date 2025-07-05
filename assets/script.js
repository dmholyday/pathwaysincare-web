
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const servicesLink = document.getElementById('servicesLink');
const servicesDropdown = document.getElementById('servicesDropdown');

// Hamburger menu toggle
/*
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});
*/

// only click on hamburger lines
document.querySelectorAll('.lines').forEach(el => {
    el.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    });
});

// Mobile services dropdown toggle
servicesLink.addEventListener('click', (e) => {
    // Only prevent default and toggle dropdown on mobile
    if (window.innerWidth <= 768) {
    e.preventDefault();
    servicesDropdown.classList.toggle('active');
    
    // Update toggle indicator
    const toggle = servicesLink.querySelector('.services-toggle');
    toggle.textContent = servicesDropdown.classList.contains('active') ? '^' : 'v';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeHamburgerLinks();
    }
});

// Close hanburger About/Contact when clicked.
document.querySelectorAll('#about-us-link, #contact-link').forEach(el => {
    el.addEventListener('click', () => {
        closeHamburgerLinks();
    });
});

function closeHamburgerLinks() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    servicesDropdown.classList.remove('active');
    const toggle = servicesLink.querySelector('.services-toggle');
    toggle.textContent = 'v';
}


// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        servicesDropdown.classList.remove('active');
        const toggle = servicesLink.querySelector('.services-toggle');
        toggle.textContent = 'v';
    }
});

window.history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
    }
    });
}, {
    threshold: 0.25
});

document.querySelectorAll('.section:not(.still)').forEach(section => {
    observer.observe(section);
});

const observer2 = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2
});

const cards = document.querySelectorAll('.service-card');

cards.forEach((card, index) => {
  // Alternate class: left, right, left, ...
  card.classList.add(index % 2 === 0 ? 'left' : 'right');
  observer2.observe(card);
});

/* prevent maximum form fields */
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('#contactform input:not(#username), #contactform textarea');

    inputs.forEach(input => {
    const maxLength = input.getAttribute('maxlength');
    const counter = document.querySelector(`.char-counter[data-for="${input.id}"]`);

    const updateCounter = () => {
        const remaining = maxLength - input.value.length;

        if (remaining <= 5) {
        counter.textContent = `${remaining} characters remaining`;

        // Visual feedback
        if (remaining < 0) {
            counter.style.color = 'red';
        } else if (remaining === 0) {
            counter.style.color = 'orange';
        } else {
            counter.style.color = 'gray';
        }

        counter.style.display = 'inline';
        } else {
        counter.style.display = 'none';
        }
    };

    // Initialize counter
    updateCounter();

    // Update counter on input
    input.addEventListener('input', updateCounter);
    });
    
});

// Define the callback function globally
        function grecaptchaCallback() {
            const formElement = document.getElementById('contactform'); // Get your form by its ID
            const recaptchaBadge = document.querySelector('.grecaptcha-badge'); // Get the reCAPTCHA badge

            // Debugging: Check if elements are found
            if (!formElement) {
                console.warn("Form element with ID 'myForm' not found.");
                return;
            }
            if (!recaptchaBadge) {
                console.error("reCAPTCHA badge with class '.grecaptcha-badge' not found after reCAPTCHA loaded. This is unexpected.");
                return;
            } else {
                 console.log("reCAPTCHA badge found!"); // Confirm it's found
            }


            const observerOptions = {
                root: null, // Use the viewport as the root
                rootMargin: '0px', // No extra margin around the root
                threshold: 0.1 // Trigger when 10% of the form is visible
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        recaptchaBadge.classList.add('is-visible');
                        console.log("Form in view, badge visible.");
                    } else {
                        recaptchaBadge.classList.remove('is-visible');
                        console.log("Form out of view, badge hidden.");
                    }
                });
            }, observerOptions);

            // Start observing your form element
            observer.observe(formElement);
        }

/* Use javascript fetch to send json */

/* COMMENTING OLD FORM SUBMIT FOR NOW

document.getElementById("contactform").addEventListener("submit", async function(e) {
    e.preventDefault();

    const failureDiv = document.getElementById('failureMessage');
    failureDiv.style.display = 'none'; // Hide the error container initially
    failureDiv.innerHTML = ''; // Clear any previous errors

    const form = e.target;

    const data = {
    Name: form.Name.value,
    Email: form.Email.value,
    Mobile: form.Mobile.value,
    Subject: form.Subject.value,
    Message: form.Message.value
    };

    const response = await fetch("http://localhost:7071/api/ContactUs", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    });

    if (response.ok) {
    document.getElementById('successMessage').style.display = 'block';
    } else {
    if (response.status === 400) {
        const errorData = await response.json();
        if (errorData.Errors && Array.isArray(errorData.Errors)) {
        const errorList = document.createElement('ul');
        errorData.Errors.forEach(err => {
            const listItem = document.createElement('li');
            listItem.textContent = `${err.Field}: ${err.Message}`;
            errorList.appendChild(listItem);
        });
        failureDiv.appendChild(errorList);
        failureDiv.style.display = 'block';
        } else {
        failureDiv.textContent = 'An unexpected error occurred.';
        failureDiv.style.display = 'block';
        }
    } else {
        failureDiv.textContent = `Error ${response.status}: ${response.statusText}`;
        failureDiv.style.display = 'block';
    }
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

*/

/* submit form refactor.  Adding google recaptchav3 JS */
function submitContactForm(e) {
    e.preventDefault(); // prevent default form submit

    const failureDiv = document.getElementById('failureMessage');
    failureDiv.style.display = 'none'; // Hide the error container initially
    failureDiv.innerHTML = ''; // Clear any previous errors

    const form = e.target;

    // Execute reCAPTCHA
    grecaptcha.ready(async function () {
    try {
        const token = await grecaptcha.execute('6LcKznUrAAAAAJ8zSpjUvedsZk_8VTYPRV76WPVE', { action: 'contact_form' });

        // Build the request payload
        const data = {
        Username: form.username.value,
        Name: form.Name.value,
        Email: form.Email.value,
        Mobile: form.Mobile.value,
        Subject: form.Subject.value,
        Message: form.Message.value,
        Token: token // Include reCAPTCHA token in the payload
        };

        const response = await fetch("https://pic-function-1-cmd4b2fgbzdrh6cv.australiaeast-01.azurewebsites.net/api/ContactUs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        });

        if (response.ok) {
        document.getElementById('successMessage').style.display = 'block';
        } else {
        if (response.status === 400) {
            const errorData = await response.json();
            if (errorData.Errors && Array.isArray(errorData.Errors)) {
            const errorList = document.createElement('ul');
            errorData.Errors.forEach(err => {
                const listItem = document.createElement('li');
                listItem.textContent = `${err.Field}: ${err.Message}`;
                errorList.appendChild(listItem);
            });
            failureDiv.appendChild(errorList);
            failureDiv.style.display = 'block';
            } else {
            failureDiv.textContent = 'An unexpected error occurred.';
            failureDiv.style.display = 'block';
            }
        } else {
            failureDiv.textContent = `Error ${response.status}: ${response.statusText}`;
            failureDiv.style.display = 'block';
        }
        }
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

        } catch (err) {
        failureDiv.textContent = `Error ${err.message}`;
        failureDiv.style.display = 'block';
        }
    });
}
