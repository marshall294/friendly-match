document.addEventListener('DOMContentLoaded', () => {
    const players = document.querySelectorAll('.player');
    let currentIndex = 0;

    function showPlayer(index) {
        const player = players[index];
        player.style.opacity = 1; // Show the current player
        setTimeout(() => {
            player.classList.add('flip'); // Start flipping after 3 seconds
            setTimeout(() => {
                player.classList.remove('flip'); // Show back side for 5 seconds
            }, 5000);
        }, 3000);

        // Move to the next player after 8 seconds (3 + 5)
        setTimeout(() => {
            player.style.opacity = 0; // Hide the current player
            currentIndex = (index + 1) % players.length; // Move to the next player
            showPlayer(currentIndex); // Recursively show the next player
        }, 8000);
    }

    showPlayer(currentIndex); // Start with the first player
});
