
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const servicesLink = document.getElementById('servicesLink');
const servicesDropdown = document.getElementById('servicesDropdown');




// Scroll handler for logo visibility
            function handleScroll() {
                const logo = document.getElementById('logo');
                const scrollY = window.scrollY;
                
                // Hide logo when scrolled down more than 50px
                if (scrollY > 50) {
                    logo.classList.add('hidden');
                } else {
                    logo.classList.remove('hidden');
                }
            }

            // Add scroll event listener
            window.addEventListener('scroll', handleScroll);



// Check if we're on a subpage and show/hide back button accordingly
        function updateBackButton() {
            const currentPath = window.location.pathname;
            const backBtn = document.getElementById('backBtn');
            const mobileBackBtn = document.getElementById('mobileBackBtn');
            
            const isSubpage = currentPath.includes('residential-aged-care-placement') ||
                            currentPath.includes('in-home-services-and-home-care-packages') ||
                            currentPath.includes('social-work-services');
            
            if (isSubpage) {
                backBtn.style.display = 'flex';
                mobileBackBtn.style.display = 'flex';
            } else {
                backBtn.style.display = 'none';
                mobileBackBtn.style.display = 'none';
            }
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        // Toggle dropdown on mobile
        function toggleDropdown(event) {
            if (window.innerWidth <= 768) {
                event.preventDefault();
                const dropdown = document.getElementById('servicesDropdown');
                dropdown.classList.toggle('active');
            }
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            
            if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Initialize back button visibility
        updateBackButton();

        // Demo: Simulate navigation to subpages (for testing purposes)
        document.querySelectorAll('.dropdown-link').forEach(link => {
            link.addEventListener('click', function(e) {
                /*
                e.preventDefault();
                
                // Simulate navigation by changing the URL without actually navigating
                const href = this.getAttribute('href');
                window.history.pushState({}, '', href);
                */
                
                // Update back button visibility
                updateBackButton();
                
                // Close mobile menu
                const navMenu = document.getElementById('navMenu');
                const hamburger = document.querySelector('.hamburger');
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');                            
            });
        });

        // Handle back button clicks
        /*
        document.getElementById('backBtn').addEventListener('click', function(e) {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            updateBackButton();
            location.reload(); // Reload to show original content
        });

        document.getElementById('mobileBackBtn').addEventListener('click', function(e) {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            updateBackButton();
            location.reload(); // Reload to show original content
        });
        */








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

    const formFields = document.querySelectorAll('#contactform input, #contactform textarea');

    function sendContactUsRequest(event) {

        const data = {
            Username: 'GerryE34123e',
            Name: 'Gerry',
            Email: 'here@there.com',
            Mobile: '0450999999',
            Subject: 'Enquiry',
            Message: 'I have an enquiry about your business',
            Token: ''
        };

        const now = new Date();
        const lastApiCall = localStorage.getItem('lastApiCall-ContactUs');
        lastCallTime = null;
        inutesSinceLastCall = null;

        if (lastApiCall) {
            lastCallTime = new Date(lastApiCall);
            minutesSinceLastCall = (now - lastCallTime) / 1000 / 60;
        }

        if (lastApiCall == null || minutesSinceLastCall >= 6) {
            fetch(returnContactUsApiURL(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        console.log('api response OK');
                    } else {
                        console.warn('api response NOT OK', response.status);
                    }
                })
                .catch(error => {
                    console.error('api response ERROR', error);
                })
                .finally(() => {
                    formFields.forEach(field => {
                        field.removeEventListener('focus', sendContactUsRequest);
                    });
                });

            localStorage.setItem('lastApiCall-ContactUs', new Date().toISOString());
        } else {
            console.log(`API call skipped. Only ${minutesSinceLastCall.toFixed(2)} minutes since last call.`);
        }
    }

    formFields.forEach(field => {
        field.addEventListener('focus', sendContactUsRequest);
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

/* submit form refactor.  Adding google recaptchav3 JS */
function submitContactForm(e) {
    e.preventDefault(); // prevent default form submit

    const submitBtn = document.getElementById("submitBtn");

    // Start loading
    submitBtn.classList.add("loading");

    const failureDiv = document.getElementById('failureMessage');
    const successDiv = document.getElementById('successMessage');
    failureDiv.style.display = 'none'; // Hide the error container initially
    failureDiv.innerHTML = ''; // Clear any previous errors
    successDiv.style.display = 'none';    

    const form = e.target;

    // Execute reCAPTCHA
    grecaptcha.ready(async function () {
        try {            
            const token = await grecaptcha.execute(returnRecaptchaKey(), { action: 'contact_form' });

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

            const response = await fetch(returnContactUsApiURL(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            submitBtn.classList.remove("loading");                       

            if (response.ok) {
                form.reset();
                successDiv.style.display = 'block';
                showModal("Thank You","We will be in touch with you soon.","success");
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
                showModal("Something went wrong","Please try again later.","error")
            }            
            localStorage.setItem('lastApiCall-ContactUs', new Date().toISOString());

        } catch (err) {
            failureDiv.textContent = `Error ${err.message}`;
            failureDiv.style.display = 'block';
        }
    });

    
}

function closeModal() {
    modalOverlay.style.display = "none";
}

function showModal(title, message, type) {
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modalBox = document.getElementById("modalBox");
    const modalOverlay = document.getElementById("modalOverlay");

    modalTitle.textContent = title;
    modalMessage.textContent = message;

    // Reset classes
    modalBox.classList.remove("success", "error");
    modalBox.classList.add(type); // "success" or "error"

    modalOverlay.style.display = "flex";
}
