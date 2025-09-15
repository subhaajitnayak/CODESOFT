const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');

let expression = "";
let memory = 0;

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;

        if (value === '=') {
            if (!expression) {
                return;
            }
            try {
                
                const result = new Function('return ' + expression)();
                expression = String(result);
                display.value = expression;
            } catch (error) {
                display.value = 'Error';
                expression = '';
            }
        } else if (value === 'CL') {
            expression = '';
            display.value = expression;
        } else if (value === 'M+') {
            // Add current display value to memory
            const currentValue = parseFloat(display.value);
            if (!isNaN(currentValue)) {
                memory += currentValue;
                console.log(`Memory updated: ${memory}`);
            }
        } else if (value === '%') {
            // Append modulo operator to expression
            expression += '%';
            display.value = expression;
        } else {
            expression += value;
            display.value = expression;
        }
    });
});