// src/passwordGenerator.js
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

function generatePassword(length, options) {
    let allChars = '';
    let guaranteedChars = '';

    if (options.includeUppercase) {
        allChars += uppercaseChars;
        guaranteedChars += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    }
    if (options.includeLowercase) {
        allChars += lowercaseChars;
        guaranteedChars += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    }
    if (options.includeNumbers) {
        allChars += numberChars;
        guaranteedChars += numberChars[Math.floor(Math.random() * numberChars.length)];
    }
    if (options.includeSymbols) {
        allChars += symbolChars;
        guaranteedChars += symbolChars[Math.floor(Math.random() * symbolChars.length)];
    }

    if (allChars.length === 0) {
        return ''; // Retorna string vazia se nenhuma opção for selecionada
    }

    // Preenche a senha com os caracteres garantidos e o restante com caracteres aleatórios
    let passwordArray = Array.from(guaranteedChars);
    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Embaralha a senha para garantir aleatoriedade
    return passwordArray.sort(() => Math.random() - 0.5).join('');
}

module.exports = generatePassword;