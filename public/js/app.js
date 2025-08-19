document.addEventListener('DOMContentLoaded', () => {
    const passwordLengthInput = document.getElementById('password-length');
    const lengthDisplay = document.getElementById('length-display');
    const includeUppercaseCheckbox = document.getElementById('include-uppercase');
    const includeLowercaseCheckbox = document.getElementById('include-lowercase');
    const includeNumbersCheckbox = document.getElementById('include-numbers');
    const includeSymbolsCheckbox = document.getElementById('include-symbols');
    const generateButton = document.getElementById('generate-button');
    const generatedPasswordInput = document.getElementById('generated-password');
    const copyButton = document.getElementById('copy-button');

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    // Atualiza o display do tamanho da senha
    passwordLengthInput.addEventListener('input', () => {
        lengthDisplay.textContent = passwordLengthInput.value;
    });

    // Função para gerar a senha
    function generatePassword() {
        let allChars = '';
        if (includeUppercaseCheckbox.checked) allChars += uppercaseChars;
        if (includeLowercaseCheckbox.checked) allChars += lowercaseChars;
        if (includeNumbersCheckbox.checked) allChars += numberChars;
        if (includeSymbolsCheckbox.checked) allChars += symbolChars;

        const passwordLength = parseInt(passwordLengthInput.value);
        let generatedPassword = '';

        if (allChars.length === 0) {
            generatedPasswordInput.value = 'Selecione pelo menos uma opção!';
            return;
        }

        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            generatedPassword += allChars[randomIndex];
        }

        // Garante que pelo menos um caractere de cada tipo selecionado esteja presente
        // Isso é crucial para senhas "fortes" quando o usuário seleciona vários tipos
        let tempPassword = '';
        const selectedTypes = [];
        if (includeUppercaseCheckbox.checked) selectedTypes.push(uppercaseChars);
        if (includeLowercaseCheckbox.checked) selectedTypes.push(lowercaseChars);
        if (includeNumbersCheckbox.checked) selectedTypes.push(numberChars);
        if (includeSymbolsCheckbox.checked) selectedTypes.push(symbolChars);

        if (selectedTypes.length > 0) {
            // Adiciona um caractere de cada tipo selecionado para garantir a inclusão
            for (const type of selectedTypes) {
                tempPassword += type[Math.floor(Math.random() * type.length)];
            }
            // Preenche o restante da senha com caracteres aleatórios
            for (let i = tempPassword.length; i < passwordLength; i++) {
                tempPassword += allChars[Math.floor(Math.random() * allChars.length)];
            }
            // Embaralha a senha para garantir aleatoriedade
            generatedPassword = tempPassword.split('').sort(() => Math.random() - 0.5).join('');
        }
        
        generatedPasswordInput.value = generatedPassword;
    }

    // Event listener para o botão de gerar
    generateButton.addEventListener('click', generatePassword);

    // Event listener para o botão de copiar
    copyButton.addEventListener('click', () => {
        generatedPasswordInput.select();
        document.execCommand('copy');
        alert('Senha copiada para a área de transferência!');
    });

    // Gerar senha inicial ao carregar a página
    generatePassword();
});