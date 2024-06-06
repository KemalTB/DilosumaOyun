document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('startGameButton');
    const playerName = document.getElementById('playerName');

    startGameButton.addEventListener('click', () => {
        const playerNameValue = playerName.value.trim();
        if (playerNameValue === '') {
            alert('Lütfen oyuncu adınızı girin.');
            return;
        }
        startGame(playerNameValue);
    });

    function startGame(playerName) {
        const playerNameInput = document.getElementById('playerNameInput');
        const guessGame = document.getElementById('guessGame');
        
        playerNameInput.style.display = 'none';
        guessGame.style.display = 'block';
        
        const guessGameText = document.getElementById('guessGameText');
        guessGameText.textContent = `Merhaba ${playerName}! 7 Hata Sansin var. Basarilar..`;
    }
    
   
    // Sayı Tahmin Oyunu
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let guessAttempts = 0;
    const maxGuessAttempts = 7;
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const guessMessage = document.getElementById('guessMessage');
    const guessAttemptsDisplay = document.getElementById('guessAttempts');
    const guessGame = document.getElementById('guessGame');
    const retryGuessButton = document.getElementById('retryGuessButton');
    const rpsGame = document.getElementById('rpsGame');

    guessButton.addEventListener('click', () => {
        const userGuess = Number(guessInput.value);
        guessAttempts++;
        guessAttemptsDisplay.textContent = `Kalan tahmin hakkınız: ${maxGuessAttempts - guessAttempts}`;
        if (!userGuess || userGuess < 1 || userGuess > 100) {
            guessMessage.textContent = 'Lütfen 1 ile 100 arasında geçerli bir sayı girin.';
            return;
        }
        if (userGuess === randomNumber) {
            guessMessage.textContent = `Tebrikler! Doğru tahmin: ${randomNumber}`;
            setTimeout(() => {
                guessGame.style.display = 'none';
                rpsGame.style.display = 'block';
            }, 2000);
        } else if (guessAttempts >= maxGuessAttempts) {
            guessMessage.textContent = `Tahmin hakkınız bitti. Doğru sayı: ${randomNumber}. Kaybettin!`;
            retryGuessButton.style.display = 'block';
        } else if (userGuess < randomNumber) {
            guessMessage.textContent = 'Daha yüksek bir sayı tahmin edin.';
        } else {
            guessMessage.textContent = 'Daha düşük bir sayı tahmin edin.';
        }
        guessInput.value = '';
        guessInput.focus();
    });

    retryGuessButton.addEventListener('click', () => {
        resetGuessGame();
    });

    function resetGuessGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        guessAttempts = 0;
        guessMessage.textContent = '';
        guessAttemptsDisplay.textContent = '';
        retryGuessButton.style.display = 'none';
    }

    // Taş Kağıt Makas Oyunu
    const choices = document.querySelectorAll('.choice');
    const resultDiv = document.getElementById('rpsResult');
    const retryRPSButton = document.getElementById('retryRPSButton');
    const rpsScoreDisplay = document.getElementById('rpsScore');
    const choicesArray = ['./assets/rock.png', './assets/paper.png', './assets/scissor.png'];
    let userWins = 0;
    let computerWins = 0;
    const totalRounds = 10;
    const memoryGame = document.getElementById('memoryGame');
    
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const userChoice = choice.id;
            const computerChoiceIndex = Math.floor(Math.random() * 3);
            const computerChoice = choicesArray[computerChoiceIndex];
            const computerChoiceId = computerChoice.split('/').pop().split('.')[0]; // Extract 'rock', 'paper', or 'scissor' from the src
            const result = determineWinner(userChoice, computerChoiceId);
            if (result === 'Kazandın!') userWins++;
            else if (result === 'Kaybettin!') computerWins++;
            resultDiv.innerHTML = `Sen: <img src="${choice.src}" alt="Senin Seçimin">,&nbsp;&nbsp;&nbsp; Bilgisayar: <img src="${computerChoice}" alt="Bilgisayarın Seçimi"><br>${result}`;
            rpsScoreDisplay.textContent = `Sen: ${userWins}, Bilgisayar: ${computerWins}`;
            if (userWins + computerWins >= totalRounds) {
                retryRPSButton.style.display = 'inline-block';
                if (userWins >= computerWins) {
                    setTimeout(() => {
                        rpsGame.style.display = 'none';
                        memoryGame.style.display = 'block';
                    }, 2000);
                } else {
                    resultDiv.innerHTML += '<br> Kaybettin!';
                }
            }
        });
    });
    
    retryRPSButton.addEventListener('click', () => {
        resetRPSGame();
    });
    
    function resetRPSGame() {
        userWins = 0;
        computerWins = 0;
        resultDiv.textContent = '';
        rpsScoreDisplay.textContent = 'Sen: 0, Bilgisayar: 0';
        retryRPSButton.style.display = 'none';
    }
    
    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return "Berabere!";
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissor') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return "Kazandın!";
        } else {
            return "Kaybettin!";
        }
    }
    

    function capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Hafıza Oyunu
    const memoryBoard = document.getElementById('memoryBoard');
    const memoryMessage = document.getElementById('memoryMessage');
    const memoryAttemptsDisplay = document.getElementById('memoryAttempts');
    const retryMemoryButton = document.getElementById('retryMemoryButton');
    const congratulations = document.getElementById('congratulations');
    const emojis = ['🐳', '❤️', '🎉', '😁', '😜', '😶‍🌫️', '🤢', '🐯', '🧜‍♀️', '🦄'];
    let memoryCards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let memoryAttempts = 0;
    const maxMemoryAttempts = 20;
    
    function initializeMemoryGame() {
        memoryCards = [];
        flippedCards = [];
        matchedPairs = 0;
        memoryAttempts = 0;
        memoryBoard.innerHTML = '';
        memoryMessage.textContent = '';
        memoryAttemptsDisplay.textContent = `Kalan deneme hakkınız: ${maxMemoryAttempts}`;
    
        const shuffledEmojis = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
        for (let i = 0; i < shuffledEmojis.length; i++) {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.emoji = shuffledEmojis[i];
            card.addEventListener('click', handleCardClick);
            memoryBoard.appendChild(card);
            memoryCards.push(card);
        }
    }
    
    function handleCardClick(e) {
        const clickedCard = e.target;
        if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
            clickedCard.textContent = clickedCard.dataset.emoji;
            clickedCard.classList.add('flipped');
            flippedCards.push(clickedCard);
    
            if (flippedCards.length === 2) {
                memoryAttempts++;
                memoryAttemptsDisplay.textContent = `Kalan deneme hakkınız: ${maxMemoryAttempts - memoryAttempts}`;
                if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
                    matchedPairs++;
                    flippedCards = [];
                    if (matchedPairs === emojis.length) {
                        setTimeout(() => {
                            memoryGame.style.display = 'none';
                            congratulations.style.display = 'block';
                        }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        flippedCards.forEach(card => {
                            card.textContent = '';
                            card.classList.remove('flipped');
                        });
                        flippedCards = [];
                    }, 1000);
                }
            }
    
            if (memoryAttempts >= maxMemoryAttempts && matchedPairs < emojis.length) {
                memoryMessage.textContent = 'Maalesef kaybettiniz. Kaybettin!';
                retryMemoryButton.style.display = 'block';
            }
        }
    }
    
    retryMemoryButton.addEventListener('click', () => {
        resetMemoryGame();
    });
    
    function resetMemoryGame() {
        initializeMemoryGame();
        retryMemoryButton.style.display = 'none';
    }
    
    initializeMemoryGame();
    });
    




