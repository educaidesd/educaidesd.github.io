document.addEventListener("DOMContentLoaded", function () {
    feather.replace();

    // Smooth Scrolling Function
    function smoothScroll(target, duration) {
        let startPosition = window.scrollY;
        let targetElement = document.querySelector(target);
        if (!targetElement) return;
        let targetPosition = targetElement.offsetTop - 50;
        let distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
            let progress = timeElapsed / duration;
            let easedProgress = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            window.scrollTo(0, startPosition + distance * easedProgress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition);
            }
        }

        requestAnimationFrame(animation);
    }

    // Smooth Scrolling for Navbar Links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute("href"), 1000);
        });
    });

    // Smooth Scroll for Logo Click (Scroll to Hero Section)
    document.querySelector(".logo img").addEventListener("click", function (e) {
        e.preventDefault();
        smoothScroll(".hero", 1000);
    });

    // Smooth Scroll for Sign Up Button (Scroll to Contact Section)
    document.querySelector(".cta-button").addEventListener("click", function (e) {
        e.preventDefault();
        smoothScroll("#contact", 1000);
    });

    // Fade-in Effect on Scroll
    function fadeInElements() {
        const elements = document.querySelectorAll('.fade-element');
        elements.forEach((element) => {
            if (isElementInViewport(element)) {
                element.classList.add('fade-in');
            }
        });
    }

    function isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    window.addEventListener('scroll', fadeInElements);
    window.addEventListener('resize', fadeInElements);
    window.addEventListener('load', fadeInElements);
});
