document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('span[data-target]');

    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    const animateValue = (el, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = (timestamp - startTimestamp) / duration;
            const easedProgress = Math.min(easeInOutQuad(progress), 1);

            if (progress < 1) {
                el.innerText = Math.floor(easedProgress * (end - start) + start);
                window.requestAnimationFrame(step);
            } else {
                el.innerText = end; 
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const endValue = parseInt(counter.getAttribute('data-target'));
                    animateValue(counter, 0, endValue, 5000); 
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });


    observer.observe(document.querySelector('#success-story'));
    observer.observe(document.querySelector('#our-story')); 
});
