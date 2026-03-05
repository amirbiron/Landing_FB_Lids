// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.getElementById('leadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formMessage = document.getElementById('formMessage');
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'שולח...';
    
    // Get form data
    const formData = new FormData(this);

    try {
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ תודה! נחזור אליך בהקדם להתחלת הבוט';
        formMessage.style.display = 'block';

        // Reset form
        this.reset();

    } catch (error) {
        // Show error message
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ אופס! משהו השתבש. אנא נסה שוב מאוחר יותר.';
        formMessage.style.display = 'block';
        console.error('Form submission error:', error);
    } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Phone number formatting (Israeli format)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                e.target.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
    });
}

// Add active state to CTA buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = '';
    });
});

// Console welcome message
console.log('%c🤖 לידים מפייסבוק', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cהפתרון החכם לזיהוי לידים בזמן אמת', 'font-size: 14px; color: #1e40af;');
