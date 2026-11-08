document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const viewContainer = document.getElementById('viewContainer');

    async function loadPageContent(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Could not load activityView: ${response.statusText}');
            const htmlContent = await response.text();
            viewContainer.innerHTML = htmlContent;
        } catch (error) {
            console.error(error);
            viewContainer.innerHTML = '<h2>Error</h2><p>Failed to load the requested activity.</p>';
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetPage = link.getAttribute('data-target');
            if (targetPage) {
                loadPageContent(targetPage)
            }
        });
    });

    const initialActive = document.querySelector('.nav-link.active');
    if (initialActive) {
        loadPageContent(initialActive.getAttribute('data-target'));
    }
});
