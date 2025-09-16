
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
                spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
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
    
    // Initialize email forms (global - needed on all pages)
    initializeEmailForms();
    
    // Initialize currency formatting
    initializeCurrencyFormatting();
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
    
    // Load like counts from API (with localStorage fallback)
    loadLikeCountsFromAPI();
    
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
            let articleId = null;
            
            // Check if this is a modal like button or regular article like button
            if (this.classList.contains('modal-like-btn')) {
                // For modal buttons, find the currently open article
                const modal = document.querySelector('#articleModal');
                if (modal && modal.classList.contains('active')) {
                    // Get article ID from the URL hash
                    articleId = window.location.hash.substring(1);
                }
            } else {
                // Get article ID from parent article element
                const article = this.closest('.blog-post.expandable');
                articleId = article ? article.id : null;
            }
            
            if (!articleId) {
                console.warn('No article ID found for like button');
                return;
            }
            
            const likeCountSpan = this.querySelector('.like-count');
            const heartIcon = this.querySelector('.heart-icon');
            
            let currentCount = parseInt(likeCountSpan.textContent);
            
            // Check if already liked - if so, ignore the click
            const isLiked = this.classList.contains('liked');
            
            if (isLiked) {
                // Already liked - ignore click (no un-love allowed)
                return;
            }
            
            // Like (first time only)
            currentCount += 1;
            this.classList.add('liked');
            heartIcon.style.fill = '#e74c3c';
            
            likeCountSpan.textContent = currentCount;
            
            // Update both modal and article like buttons
            updateLikeButtonsSync(articleId, currentCount, true);
            
            // Save to localStorage
            saveLikeCount(articleId, currentCount, true);
            
            // Send like to API
            sendLikeToAPI(articleId);
        });
    });
}

// Get external IP address with fallback services
async function getExternalIP() {
    const services = [
        'https://api.ipify.org?format=json',
        'https://ipapi.co/json/',
        'https://ip-api.com/json'
    ];
    
    for (const service of services) {
        try {
            const response = await fetch(service, { 
                timeout: 5000,
                headers: { 'Accept': 'application/json' }
            });
            
            if (!response.ok) continue;
            
            const data = await response.json();
            
            // Different services return IP in different fields
            const ip = data.ip || data.query || null;
            
            if (ip) {
                // Accept both IPv4 and IPv6 addresses
                const ipv4Pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
                const ipv6Pattern = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$|^::1$|^::$|^[0-9a-fA-F:]+$/;
                
                if (ipv4Pattern.test(ip) || ipv6Pattern.test(ip)) {
                    return ip;
                }
            }
        } catch (error) {
            console.warn(`Failed to get IP from ${service}:`, error);
            continue;
        }
    }
    
    // Fallback IP if all services fail
    return '127.0.0.1';
}

// Email sanitization and validation
function sanitizeEmail(email) {
    if (!email || typeof email !== 'string') {
        return null;
    }
    
    // Remove leading/trailing whitespace
    email = email.trim();
    
    // Convert to lowercase
    email = email.toLowerCase();
    
    // Remove any HTML tags (basic protection)
    email = email.replace(/<[^>]*>/g, '');
    
    // Remove any script content
    email = email.replace(/javascript:/gi, '');
    email = email.replace(/on\w+\s*=/gi, '');
    
    // Basic email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
        return null; // Invalid email format
    }
    
    // Additional length check
    if (email.length > 254) {
        return null; // Email too long
    }
    
    return email;
}

// Send email to API
async function sendEmailToAPI(email) {
    try {
        const sanitizedEmail = sanitizeEmail(email);
        
        if (!sanitizedEmail) {
            console.warn('Invalid email format provided');
            return { success: false, error: 'Invalid email format' };
        }
        
        const clientIP = await getExternalIP();
        
        const response = await fetch(returnEmailApiURL(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ClientIP: clientIP,
                Email: sanitizedEmail,
                HoneypotField: ""
            })
        });
        
        if (!response.ok) {
            console.warn('Failed to send email to API');
            return { success: false, error: 'API request failed' };
        }
        
        // Check content type to determine how to parse the response
        const contentType = response.headers.get('content-type');
        let result;
        
        if (contentType && contentType.includes('application/json')) {
            result = await response.json();
        } else {
            result = await response.text();
        }
        
        return { success: true, data: result };
        
    } catch (error) {
        console.error('Error sending email to API:', error);
        return { success: false, error: error.message };
    }
}

// Send like to API
async function sendLikeToAPI(articleId) {
    try {
        const clientIP = await getExternalIP();
        
        const response = await fetch(`${returnLikesApiURL()}/${articleId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ClientIP: clientIP,
                honeypotField: ""
            })
        });
        
        if (!response.ok) {
            console.warn(`Failed to send like to API for article ${articleId}`);
            return;
        }
        
        const result = await response.json();
        
        // Update the like count with the API response
        if (result && result.LikeCount) {
            const article = document.getElementById(articleId);
            if (article) {
                const button = article.querySelector('.like-btn');
                if (button) {
                    const likeCountSpan = button.querySelector('.like-count');
                    if (likeCountSpan) {
                        likeCountSpan.textContent = result.LikeCount;
                    }
                }
            }
            
            // Also update modal like button if visible
            const modalLikeBtn = document.querySelector('.modal-like-btn');
            if (modalLikeBtn && modalLikeBtn.style.display === 'flex') {
                const modalLikeCount = modalLikeBtn.querySelector('.like-count');
                if (modalLikeCount) {
                    modalLikeCount.textContent = result.LikeCount;
                }
            }
        }
        
    } catch (error) {
        console.error(`Error sending like to API for article ${articleId}:`, error);
    }
}

function updateLikeButtonsSync(articleId, count, isLiked) {
    // Update the article like button
    const article = document.getElementById(articleId);
    if (article) {
        const articleLikeBtn = article.querySelector('.like-btn');
        if (articleLikeBtn) {
            const likeCountSpan = articleLikeBtn.querySelector('.like-count');
            const heartIcon = articleLikeBtn.querySelector('.heart-icon');
            
            if (likeCountSpan) likeCountSpan.textContent = count;
            
            if (isLiked) {
                articleLikeBtn.classList.add('liked');
                if (heartIcon) heartIcon.style.fill = '#e74c3c';
            } else {
                articleLikeBtn.classList.remove('liked');
                if (heartIcon) heartIcon.style.fill = 'none';
            }
        }
    }
    
    // Update the modal like button if it exists and is visible
    const modalLikeBtn = document.querySelector('.modal-like-btn');
    if (modalLikeBtn && modalLikeBtn.style.display === 'flex') {
        const likeCountSpan = modalLikeBtn.querySelector('.like-count');
        const heartIcon = modalLikeBtn.querySelector('.heart-icon');
        
        if (likeCountSpan) likeCountSpan.textContent = count;
        
        if (isLiked) {
            modalLikeBtn.classList.add('liked');
            if (heartIcon) heartIcon.style.fill = '#e74c3c';
        } else {
            modalLikeBtn.classList.remove('liked');
            if (heartIcon) heartIcon.style.fill = 'none';
        }
    }
}

function saveLikeCount(postId, count, isLiked) {
    const likes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
    likes[postId] = {
        count: count,
        liked: isLiked
    };
    localStorage.setItem('blogLikes', JSON.stringify(likes));
}

// Load like counts from API
async function loadLikeCountsFromAPI() {
    try {
        const response = await fetch(`${returnLikesApiURL()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.warn('Failed to load like counts from API, falling back to localStorage');
            loadLikeCounts();
            return;
        }
        
        const apiLikes = await response.json();
        
        // Update like counts from API
        if (Array.isArray(apiLikes)) {
            apiLikes.forEach(likeData => {
                const article = document.getElementById(likeData.PostId);
                if (article) {
                    const button = article.querySelector('.like-btn');
                    if (button) {
                        const likeCountSpan = button.querySelector('.like-count');
                        if (likeCountSpan) {
                            likeCountSpan.textContent = likeData.LikeCount;
                        }
                    }
                }
            });
        }
        
        // Also load localStorage state for liked status
        loadLikeCounts();
        
    } catch (error) {
        console.error('Error loading like counts from API:', error);
        // Fallback to localStorage only
        loadLikeCounts();
    }
}

function loadLikeCounts() {
    const likes = JSON.parse(localStorage.getItem('blogLikes') || '{}');
    
    Object.keys(likes).forEach(articleId => {
        // Find the article by ID and then find its like button
        const article = document.getElementById(articleId);
        if (article) {
            const button = article.querySelector('.like-btn');
            if (button) {
                const likeCountSpan = button.querySelector('.like-count');
                const heartIcon = button.querySelector('.heart-icon');
                const likeData = likes[articleId];
                
                // Only update count if not already set by API
                if (likeCountSpan && likeCountSpan.textContent === '0') {
                    likeCountSpan.textContent = likeData.count;
                }
                
                if (likeData.liked) {
                    button.classList.add('liked');
                    if (heartIcon) heartIcon.style.fill = '#e74c3c';
                }
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
    emailLink.removeAttribute('onclick'); // Remove the original onclick
    emailLink.href = 'javascript:void(0)'; // Prevent any navigation
    emailLink.onclick = function() {
        window.open('mailto:' + email, '_blank');
        return false; // Prevent default link behavior
    };
    return false; // Prevent the initial click from scrolling to top
}

function showPhone() {
    const phoneLink = document.getElementById('phoneLink');
    const phoneParts = ['04', '92', ' ', '91', '3', ' ', '39', '0'];
    const phone = phoneParts.join('');
    phoneLink.innerHTML = phone;
    phoneLink.removeAttribute('onclick'); // Remove the original onclick
    phoneLink.href = 'javascript:void(0)'; // Prevent any navigation
    phoneLink.onclick = function() {
        window.location.href = 'tel:+61492913390';
        return false;
    };
    return false; // Prevent the initial click from triggering the dialer
}

// Article Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('articleModal');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const modalClose = modal?.querySelector('.modal-close');
    const modalCloseBottom = modal?.querySelector('.modal-close-bottom');
    const modalCategory = modal?.querySelector('.modal-category');
    const modalTitle = modal?.querySelector('.modal-title');
    const modalMeta = modal?.querySelector('.modal-meta');
    const modalContent = modal?.querySelector('.modal-article-content');
    const modalAuthor = modal?.querySelector('.modal-author');
    
    // Handle expandable article clicks
    const expandableArticles = document.querySelectorAll('.blog-post.expandable');
    
    expandableArticles.forEach(article => {
        article.addEventListener('click', function(e) {
            // Don't open modal if clicking on like button or author field
            if (e.target.closest('.like-btn') || e.target.closest('.post-author')) {
                return;
            }
            
            e.preventDefault();
            openArticleModal(article);
        });
        
        // Add cursor pointer to indicate clickability
        article.style.cursor = 'pointer';
    });
    
    // Add email functionality to existing author fields
    expandableArticles.forEach(article => {
        const authorField = article.querySelector('.post-author');
        if (authorField) {
            const authorText = authorField.textContent.trim();
            let email = '';
            
            // Determine email based on author text
            if (authorText === 'by Kirsty@') {
                email = 'kirsty.holyday@pathwaysincare.com.au';
            } else if (authorText === 'by info@') {
                email = 'info@pathwaysincare.com.au';
            }
            
            if (email) {
                authorField.onclick = () => window.location.href = `mailto:${email}`;
            }
        }
    });
    
    function openArticleModal(article) {
        if (!modal) return;
        
        // Update URL hash
        const articleId = article.id;
        if (articleId) {
            window.history.pushState({articleId}, '', `#${articleId}`);
        }
        
        // Extract article data
        const category = article.querySelector('.post-category')?.textContent || '';
        const title = article.querySelector('.post-title')?.textContent || '';
        const meta = article.querySelector('.post-meta')?.innerHTML || '';
        const fullContent = article.querySelector('.post-content-full')?.innerHTML || '';
        const isPinned = article.hasAttribute('data-pinned');
        
        // Get author from the article
        const articleAuthorField = article.querySelector('.post-author');
        const authorText = articleAuthorField ? articleAuthorField.textContent.trim() : '';
        let authorEmail = '';
        
        // Determine email based on author text
        if (authorText === 'by Kirsty@') {
            authorEmail = 'kirsty.holyday@pathwaysincare.com.au';
        } else if (authorText === 'by info@') {
            authorEmail = 'info@pathwaysincare.com.au';
        }
        
        // Populate modal
        if (modalCategory) modalCategory.textContent = category;
        if (modalTitle) modalTitle.textContent = title;
        if (modalMeta) modalMeta.innerHTML = meta;
        if (modalContent) {
            modalContent.innerHTML = fullContent;
            
            // Fix duplicate IDs in modal content by adding 'modal-' prefix
            const modalElements = modalContent.querySelectorAll('[id]');
            modalElements.forEach(element => {
                const oldId = element.id;
                element.id = 'modal-' + oldId;
                
                // Update associated labels
                const labels = modalContent.querySelectorAll(`label[for="${oldId}"]`);
                labels.forEach(label => {
                    label.setAttribute('for', 'modal-' + oldId);
                });
            });
            
            // Update onclick handlers to use modal IDs
            const calculateButtons = modalContent.querySelectorAll('.calculator-btn');
            calculateButtons.forEach(button => {
                if (button.onclick && button.onclick.toString().includes('calculateDAP()')) {
                    button.setAttribute('onclick', 'calculateModalDAP()');
                } else if (button.onclick && button.onclick.toString().includes('calculateReducedDAP()')) {
                    button.setAttribute('onclick', 'calculateModalReducedDAP()');
                }
            });
            
            // Initialize currency formatting for modal inputs
            const modalCurrencyInputs = modalContent.querySelectorAll('.currency-input');
            modalCurrencyInputs.forEach(input => {
                // Add event listeners for currency formatting
                input.addEventListener('input', function(e) {
                    formatCurrencyInput(e.target);
                });
                
                input.addEventListener('blur', function(e) {
                    formatCurrencyInput(e.target);
                });
                
                input.addEventListener('paste', function(e) {
                    setTimeout(() => {
                        formatCurrencyInput(e.target);
                    }, 0);
                });
                
                // Initialize with default formatting if empty
                if (!input.value || input.value === '') {
                    input.value = '$0';
                }
            });
        }
        if (modalAuthor) {
            modalAuthor.textContent = authorText;
            modalAuthor.onclick = authorEmail ? () => window.location.href = `mailto:${authorEmail}` : null;
        }
        
        // Set category class for styling
        if (modalCategory) {
            modalCategory.className = `modal-category ${category.toLowerCase()}`;
        }
        
        // Add pinned indicator if needed
        if (isPinned && modalCategory) {
            const pinIcon = document.createElement('div');
            pinIcon.className = 'modal-pin';
            pinIcon.innerHTML = `
                <svg class="pin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
                </svg>
            `;
            modalCategory.parentNode.insertBefore(pinIcon, modalCategory);
        }
        
        // Update modal Facebook share button with article ID
        const modalFacebookShare = modal.querySelector('.modal-facebook-share');
        if (modalFacebookShare && articleId) {
            modalFacebookShare.setAttribute('data-article-id', articleId);
        }
        
        // Handle modal like button - only show for insights articles
        const modalLikeBtn = modal.querySelector('.modal-like-btn');
        if (modalLikeBtn) {
            if (category.toLowerCase() === 'insights') {
                modalLikeBtn.style.display = 'flex';
                // Copy like count from original article if it exists
                const originalLikeBtn = article.querySelector('.like-btn');
                if (originalLikeBtn) {
                    const likeCount = originalLikeBtn.querySelector('.like-count');
                    const modalLikeCount = modalLikeBtn.querySelector('.like-count');
                    if (likeCount && modalLikeCount) {
                        modalLikeCount.textContent = likeCount.textContent;
                    }
                    // Copy the liked state from the original button
                    if (originalLikeBtn.classList.contains('liked')) {
                        modalLikeBtn.classList.add('liked');
                        const modalHeartIcon = modalLikeBtn.querySelector('.heart-icon');
                        if (modalHeartIcon) modalHeartIcon.style.fill = '#e74c3c';
                    } else {
                        modalLikeBtn.classList.remove('liked');
                        const modalHeartIcon = modalLikeBtn.querySelector('.heart-icon');
                        if (modalHeartIcon) modalHeartIcon.style.fill = 'none';
                    }
                }
            } else {
                modalLikeBtn.style.display = 'none';
            }
        }
        
        // Show modal
        modal.classList.add('active');
        
        // Reset modal body scroll to top
        const modalBody = modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.scrollTop = 0;
        }
        
        // Store current scroll position and prevent body scroll
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollTop}px`;
        document.body.style.width = '100%';
    }
    
    function closeArticleModal() {
        if (!modal) return;
        
        // Update URL to remove hash
        window.history.pushState({}, '', window.location.pathname);
        
        // Get the scroll position that was stored when modal opened
        const scrollTop = Math.abs(parseInt(document.body.style.top || '0'));
        
        // Restore body styles and scroll position instantly
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // Temporarily disable smooth scrolling
        document.documentElement.style.scrollBehavior = 'auto';

        // Set scroll position instantly before closing modal
        if (scrollTop > 0) {
            document.documentElement.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop;
        }
    
        // restore smooth
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Close modal after scroll is set
        modal.classList.remove('active');            

        // Clean up pinned indicator
        const existingPin = modal.querySelector('.modal-pin');
        if (existingPin) {
            existingPin.remove();
        }
    }
    
    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeArticleModal);
    }
    
    if (modalCloseBottom) {
        modalCloseBottom.addEventListener('click', closeArticleModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeArticleModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeArticleModal();
        }
    });
    
    // Handle direct URL access and browser navigation
    function handleHashChange() {
        const hash = window.location.hash.substring(1); // Remove the # symbol
        
        if (hash) {
            // Find article with matching ID
            const article = document.getElementById(hash);
            if (article && article.classList.contains('expandable')) {
                openArticleModal(article);
            }
        } else {
            // No hash, close modal if open
            if (modal?.classList.contains('active')) {
                closeArticleModal();
            }
        }
    }
    
    // Listen for browser back/forward button
    window.addEventListener('popstate', function(e) {
        handleHashChange();
    });
    
    // Check URL on page load
    if (window.location.hash) {
        handleHashChange();
    }
    
    // Facebook share functionality
    function handleFacebookShare(articleId) {
        if (!articleId) return;
        
        // Construct the article URL
        const baseUrl = window.location.origin + window.location.pathname;
        const articleUrl = `${baseUrl}#${articleId}`;
        
        // Facebook share URL
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`;
        
        // Open Facebook share popup
        window.open(
            facebookShareUrl,
            'facebook-share-dialog',
            'width=626,height=436,resizable=yes,scrollbars=yes'
        );
    }
    
    // Add event listeners to all Facebook share buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.facebook-share-btn')) {
            e.preventDefault();
            const button = e.target.closest('.facebook-share-btn');
            const articleId = button.getAttribute('data-article-id');
            handleFacebookShare(articleId);
        }
    });
});

// Initialize email forms
function initializeEmailForms() {
    console.log('Initializing email forms...');
    
    // Homepage email form
    const homepageEmailForm = document.getElementById('emailSignupForm');
    console.log('Homepage email form found:', !!homepageEmailForm);
    if (homepageEmailForm && !homepageEmailForm.dataset.initialized) {
        homepageEmailForm.dataset.initialized = 'true';
        homepageEmailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Homepage email form submitted!');
            
            const emailInput = document.getElementById('emailInput');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value;
            
            // Disable form during submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                const result = await sendEmailToAPI(email);
                
                if (result.success) {
                    // Success feedback
                    emailInput.value = '';
                    submitBtn.textContent = 'Sent!';
                    submitBtn.style.background = '#28a745';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send';
                        submitBtn.style.background = '';
                    }, 2000);
                } else {
                    // Error feedback
                    submitBtn.textContent = 'Error';
                    submitBtn.style.background = '#dc3545';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Send';
                        submitBtn.style.background = '';
                    }, 2000);
                }
            } catch (error) {
                console.error('Email submission error:', error);
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send';
            }
        });
    }
    
    // Footer email form
    const footerEmailForm = document.getElementById('footerEmailSignup');
    console.log('Footer email form found:', !!footerEmailForm);
    if (footerEmailForm && !footerEmailForm.dataset.initialized) {
        footerEmailForm.dataset.initialized = 'true';
        footerEmailForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('Footer email form submitted!');
            
            const emailInput = document.getElementById('footerEmailInput');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value;
            
            // Disable form during submission
            submitBtn.disabled = true;
            const originalSvg = submitBtn.innerHTML;
            submitBtn.innerHTML = '...';
            
            try {
                const result = await sendEmailToAPI(email);
                
                if (result.success) {
                    // Success feedback
                    emailInput.value = '';
                    submitBtn.innerHTML = '✓';
                    submitBtn.style.background = '#28a745';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalSvg;
                        submitBtn.style.background = '';
                    }, 2000);
                } else {
                    // Error feedback
                    submitBtn.innerHTML = '✗';
                    submitBtn.style.background = '#dc3545';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalSvg;
                        submitBtn.style.background = '';
                    }, 2000);
                }
            } catch (error) {
                console.error('Footer email submission error:', error);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalSvg;
            }
        });
    }
}

// Email forms are initialized in the main DOMContentLoaded listener above

// RAD to DAP Calculator Functions
function calculateDAP() {
    const radAmountInput = document.getElementById('rad-amount');
    const radAmount = getCurrencyValue(radAmountInput);
    const mpirRate = parseFloat(document.getElementById('mpir-rate').value) || 7.78;
    
    if (radAmount <= 0) {
        document.getElementById('dap-result').value = 'Please enter a valid RAD amount';
        return;
    }
    
    // Formula: DAP = (RAD x MPIR) / 365
    const dap = (radAmount * (mpirRate / 100)) / 365;
    
    document.getElementById('dap-result').value = `$${dap.toFixed(2)} per day`;
}

function calculateReducedDAP() {
    const fullRadAmountInput = document.getElementById('full-rad-amount');
    const paidRadAmountInput = document.getElementById('paid-rad-amount');
    const fullRadAmount = getCurrencyValue(fullRadAmountInput);
    const paidRadAmount = getCurrencyValue(paidRadAmountInput);
    const mpirRate = parseFloat(document.getElementById('mpir-rate').value) || 7.78;
    
    if (fullRadAmount <= 0) {
        document.getElementById('reduced-dap-result').value = 'Please enter a valid full RAD amount';
        return;
    }
    
    if (paidRadAmount < 0) {
        document.getElementById('reduced-dap-result').value = 'RAD paid cannot be negative';
        return;
    }
    
    if (paidRadAmount > fullRadAmount) {
        document.getElementById('reduced-dap-result').value = 'RAD paid cannot exceed full RAD amount';
        return;
    }
    
    // Formula: Reduced DAP = (agreed full RAD − RAD paid) × MPIR / 365
    const remainingRad = fullRadAmount - paidRadAmount;
    const reducedDap = (remainingRad * (mpirRate / 100)) / 365;
    
    document.getElementById('reduced-dap-result').value = `$${reducedDap.toFixed(2)} per day`;
}

// Modal-specific calculator functions
function calculateModalDAP() {
    const radAmountInput = document.getElementById('modal-rad-amount');
    const radAmount = getCurrencyValue(radAmountInput);
    const mpirRate = parseFloat(document.getElementById('modal-mpir-rate').value) || 7.78;
    
    if (radAmount <= 0) {
        document.getElementById('modal-dap-result').value = 'Please enter a valid RAD amount';
        return;
    }
    
    // Formula: DAP = (RAD x MPIR) / 365
    const dap = (radAmount * (mpirRate / 100)) / 365;
    
    document.getElementById('modal-dap-result').value = `$${dap.toFixed(2)} per day`;
}

function calculateModalReducedDAP() {
    const fullRadAmountInput = document.getElementById('modal-full-rad-amount');
    const paidRadAmountInput = document.getElementById('modal-paid-rad-amount');
    const fullRadAmount = getCurrencyValue(fullRadAmountInput);
    const paidRadAmount = getCurrencyValue(paidRadAmountInput);
    const mpirRate = parseFloat(document.getElementById('modal-mpir-rate').value) || 7.78;
    
    if (fullRadAmount <= 0) {
        document.getElementById('modal-reduced-dap-result').value = 'Please enter a valid full RAD amount';
        return;
    }
    
    if (paidRadAmount < 0) {
        document.getElementById('modal-reduced-dap-result').value = 'RAD paid cannot be negative';
        return;
    }
    
    if (paidRadAmount > fullRadAmount) {
        document.getElementById('modal-reduced-dap-result').value = 'RAD paid cannot exceed full RAD amount';
        return;
    }
    
    // Formula: Reduced DAP = (agreed full RAD − RAD paid) × MPIR / 365
    const remainingRad = fullRadAmount - paidRadAmount;
    const reducedDap = (remainingRad * (mpirRate / 100)) / 365;
    
    document.getElementById('modal-reduced-dap-result').value = `$${reducedDap.toFixed(2)} per day`;
}

// Auto-update calculations when MPIR changes
document.addEventListener('DOMContentLoaded', function() {
    // Handle regular page MPIR input
    const mpirInput = document.getElementById('mpir-rate');
    if (mpirInput) {
        mpirInput.addEventListener('input', function() {
            // Auto-recalculate if results are already shown
            const dapResult = document.getElementById('dap-result');
            const reducedDapResult = document.getElementById('reduced-dap-result');
            
            if (dapResult && dapResult.value && !dapResult.value.includes('Please enter')) {
                calculateDAP();
            }
            
            if (reducedDapResult && reducedDapResult.value && !reducedDapResult.value.includes('Please enter')) {
                calculateReducedDAP();
            }
        });
    }
    
    // Handle modal MPIR input (added dynamically when modal opens)
    document.addEventListener('input', function(e) {
        if (e.target && e.target.id === 'modal-mpir-rate') {
            // Auto-recalculate modal results if already shown
            const modalDapResult = document.getElementById('modal-dap-result');
            const modalReducedDapResult = document.getElementById('modal-reduced-dap-result');
            
            if (modalDapResult && modalDapResult.value && !modalDapResult.value.includes('Please enter')) {
                calculateModalDAP();
            }
            
            if (modalReducedDapResult && modalReducedDapResult.value && !modalReducedDapResult.value.includes('Please enter')) {
                calculateModalReducedDAP();
            }
        }
    });
});

// Reviews Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    let autoScrollInterval;
    const autoScrollDelay = 5000; // 5 seconds
    
    const desktopTrack = document.getElementById('desktopReviewsTrack');
    const mobileTrack = document.getElementById('mobileReviewsTrack');
    const dots = document.querySelectorAll('.dot');
    
    function updateDesktopCarousel() {
        if (desktopTrack) {
            const translateX = -currentSlide * 50; // Each slide is 50% width
            desktopTrack.style.transform = `translateX(${translateX}%)`;
        }
    }
    
    function updateMobileCarousel() {
        if (mobileTrack) {
            const translateX = -currentSlide * 100; // Each slide is 100% width
            mobileTrack.style.transform = `translateX(${translateX}%)`;
        }
    }
    
    function updateDots() {
        const desktopSlides = desktopTrack ? desktopTrack.querySelectorAll('.reviews-slide').length : 0;
        const mobileSlides = mobileTrack ? mobileTrack.querySelectorAll('.mobile-review-slide').length : 0;
        const maxSlides = window.innerWidth <= 1080 ? mobileSlides : desktopSlides;
        
        dots.forEach((dot, index) => {
            // Show/hide dots based on viewport
            if (index < maxSlides) {
                dot.style.display = 'block';
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            } else {
                dot.style.display = 'none';
            }
        });
    }
    
    function nextSlide() {
        const desktopSlides = desktopTrack ? desktopTrack.querySelectorAll('.reviews-slide').length : 0;
        const mobileSlides = mobileTrack ? mobileTrack.querySelectorAll('.mobile-review-slide').length : 0;
        const maxSlides = window.innerWidth <= 1080 ? mobileSlides : desktopSlides;
        
        currentSlide = (currentSlide + 1) % maxSlides;
        updateDesktopCarousel();
        updateMobileCarousel();
        updateDots();
    }
    
    function goToSlide(slideIndex) {
        const desktopSlides = desktopTrack ? desktopTrack.querySelectorAll('.reviews-slide').length : 0;
        const mobileSlides = mobileTrack ? mobileTrack.querySelectorAll('.mobile-review-slide').length : 0;
        const maxSlides = window.innerWidth <= 1080 ? mobileSlides : desktopSlides;
        
        if (slideIndex < maxSlides) {
            currentSlide = slideIndex;
            updateDesktopCarousel();
            updateMobileCarousel();
            updateDots();
            restartAutoScroll();
        }
    }
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(nextSlide, autoScrollDelay);
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    function restartAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
    }
    
    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Pause auto-scroll on hover
    const reviewsSection = document.querySelector('.customer-reviews-section');
    if (reviewsSection) {
        reviewsSection.addEventListener('mouseenter', stopAutoScroll);
        reviewsSection.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const maxSlides = window.innerWidth <= 1080 ? 3 : 2;
        if (currentSlide >= maxSlides) {
            currentSlide = 0; // Reset to first slide if current slide is invalid
        }
        updateDesktopCarousel();
        updateMobileCarousel();
        updateDots();
        restartAutoScroll();
    });
    
    // Initialize
    updateDesktopCarousel();
    updateMobileCarousel();
    updateDots();
    startAutoScroll();
});

// Currency formatting functions
function initializeCurrencyFormatting() {
    // Initialize currency inputs
    const currencyInputs = document.querySelectorAll('.currency-input');
    
    currencyInputs.forEach(input => {
        // Format on input event (real-time formatting)
        input.addEventListener('input', function(e) {
            formatCurrencyInput(e.target);
        });
        
        // Format on blur event (when user leaves field)
        input.addEventListener('blur', function(e) {
            formatCurrencyInput(e.target);
        });
        
        // Handle paste event
        input.addEventListener('paste', function(e) {
            setTimeout(() => {
                formatCurrencyInput(e.target);
            }, 0);
        });
        
        // Initialize with default formatting if empty
        if (!input.value || input.value === '') {
            input.value = '$0';
        }
    });
}

function formatCurrencyInput(input) {
    let value = input.value;
    
    // Remove all non-digit characters
    let numericValue = value.replace(/[^\d]/g, '');
    
    // If empty, set to 0
    if (numericValue === '') {
        numericValue = '0';
    }
    
    // Convert to integer (no cents)
    let intValue = parseInt(numericValue, 10);
    
    // Handle invalid numbers
    if (isNaN(intValue)) {
        intValue = 0;
    }
    
    // Format with commas and dollar sign
    let formattedValue = '$' + intValue.toLocaleString('en-US');
    
    // Store cursor position before formatting
    let cursorPosition = input.selectionStart;
    let oldLength = input.value.length;
    
    // Set the formatted value
    input.value = formattedValue;
    
    // Adjust cursor position after formatting
    let newLength = formattedValue.length;
    let lengthDiff = newLength - oldLength;
    
    // Set cursor position - keep it at the end for simplicity
    setTimeout(() => {
        input.setSelectionRange(newLength, newLength);
    }, 0);
}

function getCurrencyValue(input) {
    // Extract numeric value from formatted currency input
    if (!input || !input.value) return 0;
    
    let numericValue = input.value.replace(/[^\d]/g, '');
    return parseInt(numericValue, 10) || 0;
}
