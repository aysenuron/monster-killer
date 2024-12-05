const ATTACK_VALUE = 10;
const HEAL_VALUE = 15;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars (chosenMaxLife);

function reset () {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife)
}

function endRound () {
    let initialHealthPlayer = currentPlayerHealth;
    const playerDamage = dealPlayerDamage (MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialHealthPlayer;
        alert("You'd be dead but the bonus life saved you!");
        setPlayerHealth(currentPlayerHealth)
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Monster won!");
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a draw!");
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster (mode) {
    let attackValue;
    if (mode === "normalAttack") {
        attackValue = ATTACK_VALUE;
    } else if (mode === "strongAttack") {
        attackValue = STRONG_ATTACK_VALUE;    
    }

    const damage = dealMonsterDamage (attackValue);
    currentMonsterHealth -= damage;

    endRound();    
}

function attackHandler () {
    attackMonster ("normalAttack");
}

function strongAttackHandler () {
    attackMonster ("strongAttack");
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
    endRound();
}

attackBtn.addEventListener ("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener ("click", healHandler);