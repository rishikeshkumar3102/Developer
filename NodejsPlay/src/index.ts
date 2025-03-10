class Calculator {
    static calculate(a: number, b: number, operator: string): number | string {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return b !== 0 ? a / b : 'Error: Division by zero';
            case '%':
                return b !== 0 ? a % b : 'Error: Division by zero';
            default:
                return 'Error: Invalid operator';
        }
    }
}

// Taking input from user
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter first number: ', (num1: string) => {
    rl.question('Enter second number: ', (num2: string) => {
        rl.question('Enter operator (+, -, *, /, %): ', (op: string) => {
            const result = Calculator.calculate(parseFloat(num1), parseFloat(num2), op);
            console.log(`result: ${result}`);
            rl.close();
        });
    });
});