// Cache DOM elements using a more organized approach
const elements = {
    modal: document.getElementById('modal'),
    modalHeader: document.getElementById('modal-header'),
    modalContent: document.getElementById('modal-content'),
    main: document.getElementById('main'),
    game: document.getElementById('game'),
    loading: document.getElementById('loading'),
    loadingTime: document.getElementById('loading-time'),
    gamePreview: document.getElementById('game-preview'),
    playerName: document.getElementById('player-name'),
    weapon: document.getElementById('weapon-element'),
    score: document.getElementById('score'),
    timer: document.getElementById('timer'),
    leaderboard: document.getElementById('leaderboard'),
    filters: document.getElementById('filters'),
};

// Game state as a centralized object
const gameState = {
    player: null,
    leaderboard: null,
    timer: 30,
    isActive: false,
    isPlaying: false,
    score: 0,
    pointValue: 1,
    targetCounter: 1,
    targetInterval: 500,
    selectedTarget: "",
    loadingTime: 4,
    targetCreationTimeout: null,
};

// Game configuration constants
const CONFIG = {
    LEVELS: { 1: 30, 2: 20, 3: 15 },
    TARGETS: { 1: "target1", 2: "target2", 3: "target3" },
    WEAPONS: { 1: "gun1", 2: "gun2" },
    LEVELS_NAME: { 1: "Easy", 2: "Medium", 3: "Hard" },
};

// Helper functions
const helpers = {
    clearForm() {
        document.getElementById('username').value = '';

        document.getElementById('level').selectedIndex = 0;

        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
    },

    getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    },

    isValidPlayerData(data) {
        const requiredFields = ['username', 'level', 'weapon', 'target'];
        return data && requiredFields.every(field => data[field]);
    },

    filterLeaderboard() {
        const selectElement = elements.filters
        if (!selectElement) return [];

        const leaderboard = gameState.leaderboard;

        if (leaderboard.length === 0) return [];

        const selectedValue = selectElement.value;

        if (selectedValue == "1") {
            return [...leaderboard].sort((a, b) => b.score - a.score);
        } else if (selectedValue == "2") {
            return [...leaderboard].reverse();
        }

        return leaderboard;
    },

    getLeaderboard() {
        // Load leaderboard data from localStorage
        gameState.leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

        // Populate the leaderboard UI after a short delay
        setTimeout(() => {
            this.updateLeaderboardUI(gameState.leaderboard); // Display the full leaderboard initially
            this.attachFilterListener(); // Attach the event listener for filtering
        }, 100);
    },

    attachFilterListener() {
        const selectElement = elements.filters; // Get the <select> element
        if (!selectElement) return;

        // Add an event listener to handle filtering
        selectElement.addEventListener("change", () => {
            const filteredLeaderboard = this.filterLeaderboard();
            this.updateLeaderboardUI(filteredLeaderboard); // Update the UI with filtered results
        });
    },

    updateLeaderboardUI(filteredLeaderboard) {
        const leaderboardContainer = elements.leaderboard; // Get the <ul> container
        if (!leaderboardContainer) return;

        // Clear the current leaderboard display
        leaderboardContainer.innerHTML = "";

        // Repopulate the leaderboard with the filtered data
        filteredLeaderboard.forEach((item, index) => this.createLeaderboard(item, index));
    },

    createLeaderboard(item, index) {
        const leaderboardName = document.createElement("p");
        leaderboardName.classList.add("leaderboard-name");
        leaderboardName.setAttribute("id", `leaderboard-${index + 1}`);
        leaderboardName.textContent = item.username;

        const leaderboardScore = document.createElement("p");
        leaderboardScore.classList.add("leaderboard-score");
        leaderboardScore.setAttribute("id", `leaderboard-${index + 1}`);
        leaderboardScore.textContent = item.score;

        const buttonDetails = document.createElement("button");
        buttonDetails.onclick = () => helpers.getDetails(index);
        buttonDetails.classList.add("btn");
        buttonDetails.textContent = "DETAIL";

        const divWrapper = document.createElement("div");
        const liWrapper = document.createElement("li");

        divWrapper.appendChild(leaderboardName);
        divWrapper.appendChild(leaderboardScore);
        liWrapper.appendChild(divWrapper);
        liWrapper.appendChild(buttonDetails);
        elements.leaderboard.appendChild(liWrapper);
    },

    getDetails(index) {
        const leaderboardDetails = gameState.leaderboard[index]

        modal.show(`${leaderboardDetails.username}`, `
            <table>
                <tr>
                    <td>Final Score</td>
                    <td>:</td>
                    <td>${leaderboardDetails.score}</td>
                </tr>
                <tr>
                    <td>Level</td>
                    <td>:</td>
                    <td>${CONFIG.LEVELS_NAME[leaderboardDetails.level]}</td>
                </tr>
                <tr>
                    <td>Weapon</td>
                    <td>:</td>
                    <td>
                        <label class="radioSelector">
                            <img class="imageModals" src='Sprites/${CONFIG.WEAPONS[leaderboardDetails.weapon]}.png' alt='${CONFIG.WEAPONS[leaderboardDetails.weapon]}'>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Target</td>
                    <td>:</td>
                    <td>
                        <label class="radioSelector">
                            <img class="imageModals" src='Sprites/${CONFIG.TARGETS[leaderboardDetails.target]}.png' alt='${CONFIG.TARGETS[leaderboardDetails.target]}'>
                        </label>
                    </td>
                </tr>
            </table>
            <button class="btn btn-3" onClick="game.resume()">Resume</button>
          `, true);
        game.pause()
    }
};

// Modal functionality
const modal = {
    show(title, contentHtml, close) {
        const modalTitle = document.createElement("h1")
        modalTitle.setAttribute("id", "modal-title")
        modalTitle.textContent = title
        elements.modalHeader.appendChild(modalTitle)
        if (close === undefined) {
            const closeModals = document.createElement("button")
            closeModals.onclick = function () { modal.close() }
            closeModals.textContent = "X"
            closeModals.classList.add("btn-close")
            elements.modalHeader.appendChild(closeModals)

            elements.modal.addEventListener('click', function (event) {
                if (event.target === elements.modal) modal.close();
            });
        }
        elements.modalContent.innerHTML = contentHtml;
        elements.modal.classList.remove('hidden');
    },

    close() {
        elements.modal.classList.add('hidden');
        elements.modalHeader.innerHTML = ""
        elements.modalContent.innerHTML = ""
    }
};

// Game functionality
const game = {
    reset() {
        modal.close();
        gameState.score = 0;
        gameState.timer = 30;
        gameState.targetCounter = 1;
        this.play();
    },

    clear() {
        gameState.player = null;
        gameState.timer = 30;
        gameState.isActive = false;
        gameState.isPlaying = false;
        gameState.score = 0;
        gameState.pointValue = 1;
        gameState.targetCounter = 1;
        gameState.targetInterval = 500;
        gameState.selectedTarget = "";
    },

    resume() {
        modal.close();
        this.isLoading()
    },

    pause() {
        gameState.isPlaying = false;
        if (gameState.targetCreationTimeout) {
            clearTimeout(gameState.targetCreationTimeout);
            gameState.targetCreationTimeout = null;
        }
    },

    updateScore(value) {
        gameState.score += value;
        elements.score.textContent = `Score: ${gameState.score}`;
    },

    savePlayer() {
        modal.close();
        const playerData = {
            username: gameState.player.username,
            score: gameState.score,
            level: gameState.player.level,
            weapon: gameState.player.weapon,
            target: gameState.player.target,
        };

        const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
        leaderboard.push(playerData);
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        localStorage.removeItem("data-player")

        elements.game.classList.add("hidden");
        elements.main.classList.remove("hidden");


        this.clear();
    },

    hitTarget(e) {
        const hitEffect = document.createElement("span");
        hitEffect.classList.add("hitEffect");
    
        const rect = elements.gamePreview.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
    
        // Clamp inside the container bounds
        const clampedX = Math.max(0, Math.min(x, elements.gamePreview.clientWidth));
        const clampedY = Math.max(0, Math.min(y, elements.gamePreview.clientHeight));
    
        hitEffect.style.left = `${clampedX}px`;
        hitEffect.style.top = `${clampedY}px`;
    
        elements.gamePreview.appendChild(hitEffect);
    
        // Remove after effect duration
        setTimeout(() => hitEffect.remove(), 500);
    },    

    createTarget(index, disappearInterval) {
        if (!gameState.isActive || !gameState.isPlaying) return;

        const label = document.createElement('label');
        label.htmlFor = `game-target-${index}`;
        label.classList.add('game-target');

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `game-target-${index}`;
        input.name = `game-target-${index}`;

        label.appendChild(input);

        const translateX = helpers.getRandomInRange(-300, 250);
        const translateY = helpers.getRandomInRange(-250, 50);

        const size = helpers.getRandomInRange(50, 100);

        label.style.width = `${size}px`
        label.style.height = `${size}px`
        label.style.background = `url('./Sprites/${gameState.selectedTarget}.png')`;
        label.style.backgroundSize = "cover";
        label.style.backgroundPosition = "center";
        label.style.transform = `translate(${translateX}%, ${translateY}%)`;

        const handleClick = (event) => {
            event.preventDefault();

            if (input.checked) return;

            input.checked = true;
            this.updateScore(gameState.pointValue);
            this.hitTarget(event);

            setTimeout(() => label.remove(), 250);

            // Clean up event listener
            label.removeEventListener("click", handleClick);
        };

        label.addEventListener("click", handleClick);
        elements.gamePreview.appendChild(label);

        if (gameState.isPlaying) {
            setTimeout(() => {
                if (elements.gamePreview.contains(label)) {
                    label.remove();
                    // Clean up event listener when removing
                    label.removeEventListener("click", handleClick);
                }
            }, disappearInterval);
        }
    },

    createTargetWithInterval() {
        if (!gameState.isActive || !gameState.isPlaying) return;

        gameState.targetInterval = helpers.getRandomInRange(500, 1500);
        this.createTarget(gameState.targetCounter++, gameState.targetInterval);

        gameState.targetCreationTimeout = setTimeout(() => this.createTargetWithInterval(), gameState.targetInterval);
    },

    startTimer() {
        const timerInterval = setInterval(() => {
            if (gameState.isActive && gameState.isPlaying) {
                gameState.timer -= 1;
                elements.timer.textContent = `Time: 00:${String(gameState.timer).padStart(2, '0')}`;

                if (gameState.timer <= 0) {
                    clearInterval(timerInterval);
                    gameState.isActive = false;
                    gameState.isPlaying = false;

                    modal.show("Game Over", `
              <p>Your final score is: ${gameState.score}</p>
              <div class="overView">
                <button class="btn" onClick="game.reset()">Play Again</button>
                <button class="btn" onClick="game.savePlayer()">Save Data</button>
              </div>
            `);
                }
            }
        }, 1000);
    },

    isLoading() {

        // Show the loading screen
        elements.loading.classList.remove("hidden");

        const loadingInterval = setInterval(() => {
            if (gameState.isActive) {
                gameState.loadingTime -= 1;
                elements.loadingTime.textContent = `${String(gameState.loadingTime)}`;
                if (gameState.loadingTime <= 0) {
                    gameState.loadingTime = 3;
                    elements.loadingTime.textContent = `${String(gameState.loadingTime)}`;
                    clearInterval(loadingInterval);

                    // Hide the loading screen
                    elements.loading.classList.add("hidden");

                    // Start the game
                    gameState.isPlaying = true;
                    this.startTimer();
                    this.createTargetWithInterval();
                }
            } else {
                // If the game is no longer active, stop the loading phase
                clearInterval(loadingInterval);
            }
        }, 1000);
    },

    play() {
        const playerData = JSON.parse(localStorage.getItem("data-player") || "{}");
        if (!helpers.isValidPlayerData(playerData)) return;

        helpers.getLeaderboard()

        if (gameState.isActive) return;

        gameState.isActive = true;
        gameState.player = playerData;

        // Hide main form, show game
        elements.main.classList.add("hidden");
        elements.game.classList.remove("hidden");

        // Update UI elements
        elements.playerName.textContent = playerData.username;
        elements.score.textContent = `Score: ${gameState.score}`;
        gameState.timer = CONFIG.LEVELS[playerData.level] || 30;
        elements.timer.textContent = `Time: 00:${gameState.timer}`;

        // Set weapon appearance
        const selectedWeapon = CONFIG.WEAPONS[playerData.weapon] || "gun1";
        elements.weapon.style.background = `url('./Sprites/${selectedWeapon}.png')`;
        elements.weapon.style.backgroundSize = "cover";
        elements.weapon.style.backgroundPosition = "center";

        gameState.selectedTarget = CONFIG.TARGETS[playerData.target] || "target1";

        this.isLoading()
    }
};


elements.main.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const dataPlayer = {};
    const missingFields = [];

    ['username', 'level', 'weapon', 'target'].forEach(field => {
        const value = formData.get(field);
        if (value) {
            dataPlayer[field] = value;
        } else {
            missingFields.push(field.charAt(0).toUpperCase() + field.slice(1));
        }
    });

    if (missingFields.length > 0) {
        const fields = missingFields.map(field => `<li>${field}</li>`).join('');
        modal.show("Please fill the following fields", `<ul>${fields}</ul>`);
        return;
    }

    localStorage.setItem("data-player", JSON.stringify(dataPlayer));
    helpers.clearForm()
    game.play();
});

document.addEventListener('keydown', function (event) {
    if (gameState.isActive && gameState.isPlaying && event.key === 'Escape') {
        game.pause();

        modal.show("Game Paused", `
            <button class="btn btn-3" onClick="game.resume()">Resume</button>
          `, true);
    }
});

elements.gamePreview.addEventListener('mousemove', (e) => {
    if (gameState.isActive && gameState.isPlaying) {

        const gamePreviewRect = elements.gamePreview.getBoundingClientRect();
        const xClient = e.clientX - gamePreviewRect.left;

        const clampedX = Math.max(0, Math.min(xClient, elements.gamePreview.clientWidth))

        const offset = 30;

        elements.weapon.style.left = `${clampedX + offset}px`;
    }
})

elements.gamePreview.addEventListener('mouseleave', () => { })

// Initialize game UI
if (!gameState.isActive) {
    elements.main.classList.remove("hidden");
    elements.game.classList.add("hidden");
}

// Make functions globally accessible for HTML onClick handlers
window.game = game;
window.helpers = helpers;
window.modal = modal;