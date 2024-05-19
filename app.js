// Initialize game sequences and user sequences as empty arrays
let gameseq = [];
let userseq = [];

// Define the button colors available in the game
let btns = ["yellow", "red", "green", "purple"];

// Initialize game state variables
let started = false;
let level = 0;

// Select the h2 element to display game messages and level
let h2 = document.querySelector("h2");

// Load audio files for game sounds
let gameoversound = new Audio('mixkit-click-error-1110.wav');
let flashsound = new Audio('flashsound.wav');
let btnclicksound = new Audio('clickedsound.wav');

// Event listener for starting the game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelup();
    }
});

// Function to flash a game button (simulating Simon game)
function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
        flashsound.play();
    }, 250);
}

// Function to flash a button when the user clicks it
function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

// Function to level up the game
function levelup() {
    userseq = [];
    level++;
    h2.innerText = `level ${level}`;

    // Generate a random color for the game sequence
    let randidx = Math.floor(Math.random() * 3);
    let randcolor = btns[randidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    gameflash(randbtn);
}

// Function to check the user's answer against the game sequence
function checkans(idx) {
    console.log(`curr level ${level}`);
    if (userseq[idx] === gameseq[idx]) {
        // If the user's sequence matches the game sequence so far
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        // If the user makes a mistake
        h2.innerText = `Game over! press any key to restart your score is ${level}`;
        let parts = h2.innerText.split("!");
        parts[0] = "<span style='color: red;'>Game over</span>";
        h2.innerHTML = parts.join("!");
        gameoversound.play();
        reset();
    }
}

// Function to handle button press by the user
function btnPress() {
    let btn = this;
    btnclicksound.play();
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}

// Add event listeners to all game buttons
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnPress);
}

// Function to reset the game to its initial state
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
