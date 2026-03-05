document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('apod-form');
    const dateInput = document.getElementById('birthdate');
    const resultSection = document.getElementById('result-section');
    const loadingDiv = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    // DOM Elements for APOD Data
    const titleEl = document.getElementById('apod-title');
    const imageEl = document.getElementById('apod-image');
    const videoEl = document.getElementById('apod-video');
    const dateDisplayEl = document.getElementById('apod-date-display');
    const explanationEl = document.getElementById('apod-explanation');
    const copyrightEl = document.getElementById('apod-copyright');

    // The APOD API started on 1995-06-16
    const minDateStr = '1995-06-16';
    
    // Set max date to today
    const today = new Date();
    const maxDateStr = today.toISOString().split('T')[0];
    dateInput.setAttribute('max', maxDateStr);
    dateInput.setAttribute('min', minDateStr);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const selectedDate = dateInput.value;
        if (!selectedDate) return;

        // Reset UI
        resultSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        loadingDiv.classList.remove('hidden');

        try {
            // Fetch from local backend
            const response = await fetch(`http://localhost:8000/api/apod?date=${selectedDate}`);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `Server error: ${response.status}`);
            }

            const data = await response.json();
            displayApodData(data);

        } catch (error) {
            console.error('Error fetching APOD:', error);
            errorMessage.textContent = error.message.includes('Failed to fetch') 
                ? 'Unable to connect to the backend server. Is it running?'
                : `Error: ${error.message}`;
            errorMessage.classList.remove('hidden');
        } finally {
            loadingDiv.classList.add('hidden');
        }
    });

    function displayApodData(data) {
        // Populate text content
        titleEl.textContent = data.title;
        dateDisplayEl.textContent = formatDate(data.date);
        explanationEl.textContent = data.explanation;
        
        if (data.copyright) {
            copyrightEl.textContent = `© ${data.copyright}`;
            copyrightEl.classList.remove('hidden');
        } else {
            copyrightEl.classList.add('hidden');
        }

        // Handle Media Type (image vs video)
        if (data.media_type === 'video') {
            imageEl.classList.add('hidden');
            videoEl.src = data.url;
            videoEl.classList.remove('hidden');
        } else {
            videoEl.classList.add('hidden');
            videoEl.src = '';
            // Use HD url if available, fallback to standard url
            imageEl.src = data.hdurl || data.url;
            imageEl.alt = data.title;
            imageEl.classList.remove('hidden');
        }

        // Show result section
        resultSection.classList.remove('hidden');
        
        // Scroll to result smoothly
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        // We parse the YYYY-MM-DD manually to avoid timezone shifting issues
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString(undefined, options);
    }
});
