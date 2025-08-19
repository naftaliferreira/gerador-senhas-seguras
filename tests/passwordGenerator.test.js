// tests/passwordGenerator.test.js
const generatePassword = require('../src/passwordGenerator');

describe('Gerador de Senhas Seguras', () => {

    test('deve gerar uma senha do tamanho correto', () => {
        const length = 10;
        const options = {
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true
        };
        const password = generatePassword(length, options);
        expect(password.length).toBe(length);
    });

    test('deve incluir letras maiúsculas quando solicitado', () => {
        const password = generatePassword(15, { includeUppercase: true, includeLowercase: false, includeNumbers: false, includeSymbols: false });
        expect(password).toMatch(/[A-Z]/);
    });

    test('deve incluir letras minúsculas quando solicitado', () => {
        const password = generatePassword(15, { includeUppercase: false, includeLowercase: true, includeNumbers: false, includeSymbols: false });
        expect(password).toMatch(/[a-z]/);
    });

    test('deve incluir números quando solicitado', () => {
        const password = generatePassword(15, { includeUppercase: false, includeLowercase: false, includeNumbers: true, includeSymbols: false });
        expect(password).toMatch(/[0-9]/);
    });

    test('deve incluir símbolos quando solicitado', () => {
        const password = generatePassword(15, { includeUppercase: false, includeLowercase: false, includeNumbers: false, includeSymbols: true });
        expect(password).toMatch(/[!@#$%^&*()_+~`|}{[\]:;?><,.\/-=]/);
    });

    test('não deve incluir caracteres não solicitados', () => {
        const password = generatePassword(15, { includeUppercase: true, includeLowercase: false, includeNumbers: false, includeSymbols: false });
        expect(password).not.toMatch(/[a-z0-9!@#$%^&*()_+~`|}{[\]:;?><,.\/-=]/);
        expect(password).toMatch(/^[A-Z]+$/); // Deve conter apenas maiúsculas
    });

    test('deve retornar uma string vazia se nenhuma opção for selecionada', () => {
        const password = generatePassword(10, { includeUppercase: false, includeLowercase: false, includeNumbers: false, includeSymbols: false });
        expect(password).toBe('');
    });

    test('deve gerar senhas diferentes a cada chamada', () => {
        const options = {
            includeUppercase: true,
            includeLowercase: true,
            includeNumbers: true,
            includeSymbols: true
        };
        const password1 = generatePassword(12, options);
        const password2 = generatePassword(12, options);
        expect(password1).not.toBe(password2);
    });
});