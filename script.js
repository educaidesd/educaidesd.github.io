document.addEventListener("DOMContentLoaded", function () {
    feather.replace();

    // Smooth Scrolling for Navbar Links
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            smoothScroll(targetId, 1000);
        });
    });

    function smoothScroll(target, duration) {
        let startPosition = window.scrollY;
        let targetPosition = target === "top" ? 0 : document.querySelector(target).offsetTop - 50;
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
