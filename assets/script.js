
// New Navigation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hasDropdown = document.querySelector('.has-dropdown');
    
    // Toggle mobile menu
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Mobile dropdown toggle
    if (hasDropdown) {
        hasDropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 1080) {
                // Only prevent default if clicking on the parent link, not dropdown items
                if (e.target.classList.contains('nav-link') || e.target.closest('.nav-link')) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
                // Allow dropdown items to navigate normally
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileToggle && navMenu && !navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1080 && navMenu) {
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            if (hasDropdown) {
                hasDropdown.classList.remove('active');
            }
        }
    });
});
// Cleaned up - old navigation code removed








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

// Page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeResourcesPage();
    initializeAboutUsPage();
});

function initializeResourcesPage() {
    // Check if we're on the resources page
    if (!window.location.pathname.includes('resources')) {
        return;
    }

    // Initialize filter functionality
    initializeFilters();
    
    // Initialize like functionality
    initializeLikes();
    
    // Load like counts from localStorage
    loadLikeCounts();
    
    // Initialize scroll animations for blog posts
    initializeBlogAnimations();
}

function initializeBlogAnimations() {
    const blogPostObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.25
    });

    document.querySelectorAll('.blog-post').forEach(post => {
        blogPostObserver.observe(post);
    });
}

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.blog-post');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // Filter posts
            posts.forEach(post => {
                if (filterValue === 'all') {
                    post.classList.remove('hidden');
                } else {
                    const category = post.dataset.category;
                    if (category === filterValue) {
                        post.classList.remove('hidden');
                    } else {
                        post.classList.add('hidden');
                    }
                }
                
                // Reset animation classes for newly visible posts
                if (!post.classList.contains('hidden')) {
                    post.classList.remove('in-view');
                    // Small delay to ensure the animation triggers
                    setTimeout(() => {
                        if (!post.classList.contains('hidden')) {
                            post.classList.add('in-view');
                        }
                    }, 50);
                }
            });
        });
    });
}

function initializeLikes() {
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const likeCountSpan = this.querySelector('.like-count');
            const heartIcon = this.querySelector('.heart-icon');
            
            let currentCount = parseInt(likeCountSpan.textContent);
            
            // Check if already liked
            const isLiked = this.classList.contains('liked');
            
            if (isLiked) {
                // Unlike
                currentCount = Math.max(0, currentCount - 1);
                this.classList.remove('liked');
                heartIcon.style.fill = 'none';
            } else {
                // Like
                currentCount += 1;
                this.classList.add('liked');
                heartIcon.style.fill = '#e74c3c';
            }
            
            likeCountSpan.textContent = currentCount;
            
            // Save to localStorage
            saveLikeCount(postId, currentCount, !isLiked);
        });
    });
}

function saveLikeCount(postId, count, isLiked) {
    const likes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
    likes[postId] = {
        count: count,
        liked: isLiked
    };
    localStorage.setItem('blogLikes', JSON.stringify(likes));
}

function loadLikeCounts() {
    const likes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
    
    Object.keys(likes).forEach(postId => {
        const button = document.querySelector(`[data-post-id="${postId}"]`);
        if (button) {
            const likeCountSpan = button.querySelector('.like-count');
            const heartIcon = button.querySelector('.heart-icon');
            const likeData = likes[postId];
            
            likeCountSpan.textContent = likeData.count;
            
            if (likeData.liked) {
                button.classList.add('liked');
                heartIcon.style.fill = '#e74c3c';
            }
        }
    });
}

function initializeAboutUsPage() {
    // Check if we're on the about-us page
    if (!window.location.pathname.includes('about-us')) {
        return;
    }

    // Initialize credentials section animation
    initializeCredentialsAnimation();
}

function initializeCredentialsAnimation() {
    const credentialsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.25
    });

    const credentialsSection = document.querySelector('.credentials-section');
    if (credentialsSection) {
        credentialsObserver.observe(credentialsSection);
    }
}

// FAQ functionality
function toggleFAQ(element) {
    const faqAnswer = element.nextElementSibling;
    const faqIcon = element.querySelector('.faq-icon');
    
    // Close other open FAQs on the same page
    const allFAQs = document.querySelectorAll('.faq-question');
    allFAQs.forEach(faq => {
        if (faq !== element) {
            faq.classList.remove('active');
            const otherAnswer = faq.nextElementSibling;
            const otherIcon = faq.querySelector('.faq-icon');
            otherAnswer.classList.remove('open');
            otherIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ
    element.classList.toggle('active');
    faqAnswer.classList.toggle('open');
    
    if (element.classList.contains('active')) {
        faqIcon.style.transform = 'rotate(90deg)';
    } else {
        faqIcon.style.transform = 'rotate(0deg)';
    }
}

// Reviews Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewsCarousel();
});

function initializeReviewsCarousel() {
    // Check if we're on a page with a reviews carousel
    const carousel = document.getElementById('reviewsCarousel');
    if (!carousel) return;

    const cards = document.querySelectorAll('.review-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = cards.length;

    function showSlide(index) {
        // Remove active class from all cards and indicators
        cards.forEach(card => card.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current card and indicator
        if (cards[index]) {
            cards[index].classList.add('active');
        }
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    function nextSlide() {
        const newIndex = (currentSlide + 1) % totalSlides;
        showSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(newIndex);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => showSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

}

// Email obfuscation function
function showEmail() {
    const emailLink = document.getElementById('emailLink');
    const emailParts = ['info', '@', 'pathwaysincare', '.', 'com', '.', 'au'];
    const email = emailParts.join('');
    emailLink.innerHTML = email;
    emailLink.href = 'mailto:' + email;
    emailLink.onclick = null; // Remove the onclick after revealing
}
