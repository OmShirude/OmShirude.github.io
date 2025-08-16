/* Show Menu */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        // Simple toggle for burger icon animation
        navToggle.classList.toggle('active'); 
    });
}

/* Remove Menu Mobile */
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
    if (navToggle) {
        navToggle.classList.remove('active');
    }
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/* Scroll Sections Active Link */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // Adjusted for header height
        let sectionId = current.getAttribute('id');

        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if(link){
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* Typing Animation & Copy to Clipboard */
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = ['AI Engineer', 'Data Scientist', 'MLOps Enthusiast'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = displayText;

            let typeSpeed = 150;
            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at the end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing new role
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // Copy to Clipboard
    const copyBtn = document.getElementById('copy-phone-btn');
    const phoneNum = document.getElementById('phone-number');

    if (copyBtn && phoneNum) {
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            const textToCopy = phoneNum.innerText;

            // Use the document.execCommand for better iFrame compatibility
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                
                // Visual feedback
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = 'Copied!';
                copyBtn.style.color = 'var(--primary-color)';

                setTimeout(() => {
                    copyBtn.innerHTML = originalContent;
                    copyBtn.style.color = 'var(--text-color-light)';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
            document.body.removeChild(textArea);
        });
    }
});
