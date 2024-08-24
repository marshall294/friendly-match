document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById('timer');
    const statusElement = document.getElementById('timerStatus');

    let startTime = parseFloat(localStorage.getItem('startTime')) || Date.now();
    let mode = localStorage.getItem('mode') || 'hide'; // Default mode is 'hide'

    function updateTimer() {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000; // in seconds

        let minutes, seconds;
        if (mode === 'start') {
            // Counting from 0 to 45 minutes
            minutes = Math.min(Math.floor(elapsed / 60), 45);
            seconds = Math.floor(elapsed % 60);
        } else if (mode === 'resume') {
            // Counting from 45 to 90 minutes
            const adjustedElapsed = elapsed - (45 * 60); // Shift by 45 minutes
            minutes = Math.min(Math.floor(adjustedElapsed / 60) + 45, 90);
            seconds = Math.floor(adjustedElapsed % 60);
        } else {
            // Hide the timer if mode is 'hide'
            timerElement.textContent = '00:00';
            timerElement.style.display = 'none';
            return;
        }

        // Update timer display
        timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerElement.style.display = 'block'; // Ensure timer is visible

        // Save the current time and mode in localStorage
        localStorage.setItem('startTime', startTime);
        localStorage.setItem('mode', mode);

        requestAnimationFrame(updateTimer);
    }

    function checkStatus() {
        // Check the status text and set mode accordingly
        const statusText = statusElement.textContent.trim();

        if (statusText === '1st') {
            if (mode !== 'start') {
                // Reset the start time if mode changes
                startTime = Date.now();
                localStorage.setItem('startTime', startTime);
                localStorage.setItem('mode', 'start');
            }
            mode = 'start';
        } else if (statusText === '2nd') {
            if (mode !== 'resume') {
                // Adjust the start time to account for the 45 minutes already counted
                startTime = Date.now() - (45 * 60 * 1000); // Adjust for 45 minutes
                localStorage.setItem('startTime', startTime);
                localStorage.setItem('mode', 'resume');
            }
            mode = 'resume';
        } else {
            // Hide the timer if status is neither '1st' nor '2nd'
            mode = 'hide';
        }
    }

    // Initial content check and timer update
    checkStatus();
    updateTimer();

    // Periodically check status
    setInterval(() => {
        checkStatus();
        updateTimer();
    }, 1000); // Check every second
});
