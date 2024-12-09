const ATTACK_VALUE = 10;
const HEAL_VALUE = 15;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

const MODE_NORMAL_ATTACK = 0;
const MODE_STRONG_ATTACK = 1;

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

const enteredValue = prompt("Max life point for you and the monster.", "100");

let chosenMaxLife = parseInt(enteredValue);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
    alert("You entered an invalid value, so max life is set to 100 by default.");
}

adjustHealthBars (chosenMaxLife);

function writeToLog (event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event,
        value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };

    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = "PLAYER";
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = "PLAYER";
    }

    // if (event === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = "MONSTER";
    // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry.target = "MONSTER";
    // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry.target = "PLAYER";
    // } else if (event === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry.target = "PLAYER";
    // }
    battleLog.push(logEntry);
}

function reset () {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife)
}

function endRound () {
    let initialHealthPlayer = currentPlayerHealth;
    const playerDamage = dealPlayerDamage (MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog (LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialHealthPlayer;
        alert("You'd be dead but the bonus life saved you!");
        setPlayerHealth(currentPlayerHealth)
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
        writeToLog (LOG_EVENT_GAME_OVER, "PLAYER WON", currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Monster won!");
        writeToLog (LOG_EVENT_GAME_OVER, "MONSTER WON", currentMonsterHealth, currentPlayerHealth);
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a draw!");
        writeToLog (LOG_EVENT_GAME_OVER, "DRAW", currentMonsterHealth, currentPlayerHealth);
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster (mode) {
    const attackValue = mode === MODE_NORMAL_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const logEvent = mode === MODE_NORMAL_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
  //  if (mode === MODE_NORMAL_ATTACK) {
  //      attackValue = ATTACK_VALUE;
  //      logEvent = LOG_EVENT_PLAYER_ATTACK;
  //  } else if (mode === MODE_STRONG_ATTACK) {
  //      attackValue = STRONG_ATTACK_VALUE;
  //      logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;  
  //  }

    const damage = dealMonsterDamage (attackValue);
    currentMonsterHealth -= damage;
    writeToLog (logEvent, damage, currentMonsterHealth, currentPlayerHealth);

    endRound();    
}

function attackHandler () {
    attackMonster (MODE_NORMAL_ATTACK);
}

function strongAttackHandler () {
    attackMonster (MODE_STRONG_ATTACK);
}

function healHandler () {
    let healthValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal more than max life.")
        healthValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healthValue = HEAL_VALUE;
    }
    increasePlayerHealth (healthValue);
    currentPlayerHealth += healthValue;
    writeToLog (LOG_EVENT_PLAYER_HEAL, healthValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

function printLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener ("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener ("click", healHandler);
logBtn.addEventListener ("click", printLogHandler);