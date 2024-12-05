const ATTACK_VALUE = 10;
const HEAL_VALUE = 5;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
let chosenMaxLife = 100;

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars (chosenMaxLife);

function attackMonster (mode) {
    let attackValue;
    if (mode === "normalAttack") {
        attackValue = ATTACK_VALUE;
    } else if (mode === "strongAttack") {
        attackValue = STRONG_ATTACK_VALUE;    
    }

    const damage = dealMonsterDamage (attackValue);
    currentMonsterHealth -= damage;

    const playerDamage = dealPlayerDamage (MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert("You won!");
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert("Monster won!");
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a draw!");
    }
}

function attackHandler () {
    attackMonster ("normalAttack");
}

function strongAttackHandler () {
    attackMonster ("strongAttack");
}

function healHandler () {
    increasePlayerHealth (HEAL_VALUE);
}

attackBtn.addEventListener ("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener ("click", healHandler);