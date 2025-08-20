/* Show Menu */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        navToggle.classList.toggle('active'); 
    });
}

/* Remove Menu Mobile */
const navLinks = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
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
        const sectionTop = current.offsetTop - 58;
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

/* Document Ready - Main Functions */
document.addEventListener('DOMContentLoaded', function() {
    
    // Typing Animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = ['AI Engineer', 'Data Scientist', 'LLMops Enthusiast'];
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
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    // Generic Copy Function
    function setupCopyButton(buttonId, textElementId) {
        const copyBtn = document.getElementById(buttonId);
        const textElement = document.getElementById(textElementId);

        if (copyBtn && textElement) {
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const textToCopy = textElement.innerText;

                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    
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
    }

    setupCopyButton('copy-phone-btn', 'phone-number');
    setupCopyButton('copy-email-btn', 'email-address');

    // Agent Workflow Animation
    const workflowSection = document.getElementById('agent-workflow');
    if (workflowSection) {
        const packet = document.querySelector('.data-packet');
        const nodes = document.querySelectorAll('.workflow-node');
        const animationDuration = 8000; // 8 seconds total
        const highlightDuration = animationDuration / 4; // 2 seconds per node

        const observer = new IntersectionObserver((entries) => {
            let intervalId;
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    packet.style.animation = `move-packet ${animationDuration / 1000}s ease-in-out infinite`;
                    
                    function runHighlightCycle() {
                        // Highlight node 1
                        setTimeout(() => {
                            nodes.forEach(n => n.classList.remove('active'));
                            nodes[0].classList.add('active');
                        }, 0);
                        // Highlight node 2
                        setTimeout(() => {
                             nodes.forEach(n => n.classList.remove('active'));
                            nodes[1].classList.add('active');
                        }, highlightDuration);
                         // Highlight node 3
                        setTimeout(() => {
                             nodes.forEach(n => n.classList.remove('active'));
                            nodes[2].classList.add('active');
                        }, highlightDuration * 2);
                         // Highlight node 4
                        setTimeout(() => {
                             nodes.forEach(n => n.classList.remove('active'));
                            nodes[3].classList.add('active');
                        }, highlightDuration * 3);
                         // Clear last highlight before loop repeats
                         setTimeout(() => {
                                nodes.forEach(n => n.classList.remove('active'));
                         }, animationDuration - 100); // A moment before it restarts
                    }
                    
                    runHighlightCycle();
                    intervalId = setInterval(runHighlightCycle, animationDuration);

                } else {
                    packet.style.animation = 'none';
                    clearInterval(intervalId);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(workflowSection);
    }
});
