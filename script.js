const newButton = document.getElementById("new-button");
const flashcards = document.getElementById("flashcards-cont");
const clearButton = document.getElementById("clear-button");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const frontInput = document.getElementById("front-input");
const backInput = document.getElementById("back-input");
const cancelButton = document.getElementById("cancel");
const submitButton = document.getElementById("submit");

newButton.addEventListener("click", () => {
    openPop();
});
clearButton.addEventListener("click", () => {
    clearCards();
});
cancelButton.addEventListener("click", () => {
    cancel();
});
submitButton.addEventListener("click", () => {
    newCard();
});

function openPop() {
    frontInput.value = '';
    backInput.value = '';
    overlay.style.display = 'block';
    modal.style.display = 'block';
}

function cancel() {
    frontInput.value = '';
    backInput.value = '';
    hidePop();
}

function hidePop() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
}

function newCard() {
    const card = document.createElement('div');
    card.style.left = '100px';
    card.style.top = '100px';
    card.style.position = "absolute";

    const moveArea = document.createElement('div');

    moveArea.textContent = '...';

    let isDragging = false;
    let XOffSet = 0;
    let YOffSet = 0;

    card.appendChild(moveArea);

    moveArea.addEventListener('mousedown', (e) =>{
        isDragging = true;
        moveArea.style.cursor = "grabbing";

        XOffSet = e.clientX - card.getBoundingClientRect().left;
        YOffSet = e.clientY - card.getBoundingClientRect().top;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const y = e.clientY - YOffSet;
            const x = e.clientX - XOffSet;

            card.style.left = `${x}px`;
            card.style.top = `${y}px`;
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        moveArea.style.cursor = "grab";
    });

    const frontText = document.createElement('p');
    frontText.className = "text-area";
    frontText.textContent = frontInput.value;

    const backText = document.createElement('p');
    backText.className = "text-area";
    backText.textContent = backInput.value;
    backText.style.display = "none";

    frontText.addEventListener("click", () => {
        backText.style.display = "block";
        frontText.style.display = "none";
    });

    backText.addEventListener("click", () => {
        backText.style.display = "none";
        frontText.style.display = "block";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", () => {
        card.style.display = 'none';
    });

    flashcards.appendChild(card);

    hidePop();
}

function clearCards() {
    flashcards.innerHTML = '';
}