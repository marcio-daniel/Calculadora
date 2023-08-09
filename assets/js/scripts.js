const container = document.querySelector('.container')
const keys = container.querySelector('.keyboard')
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const displayNumber = container.querySelector('.display_num');
        if (!action) {
            const keyContent = key.textContent;
            if (displayNumber.textContent === "0" || container.dataset.previousKeyType === 'operator' || displayNumber.textContent === "Estouro") {
                if (container.dataset.previousOperatorType) {
                    removeSelectedClassPreviousOperator();
                    container.dataset.laterNumber = keyContent;
                }
                displayNumber.textContent = keyContent;
                container.dataset.previousKeyType = 'number';
            } else {
                if (displayNumber.textContent.length < 13) {
                    displayNumber.textContent += keyContent;
                    if (container.dataset.laterNumber) {
                        container.dataset.laterNumber = displayNumber.textContent;
                    }
                    container.dataset.previousKeyType = 'number';
                }
            }
        } else {
            if (action === 'mult' || action === 'soma' || action === 'sub' || action === 'divi' || action === "raiz" || action === "percent") {
                if (container.dataset.previousOperatorType !== action && container.dataset.previousOperatorType) {
                    removeSelectedClassPreviousOperator();
                }
                key.classList.add('operator_selected');
                container.dataset.previousKeyType = 'operator';
                container.dataset.previousOperatorType = action;
                container.dataset.previousNumber = displayNumber.textContent;
            }

            if (action === "deci") {
                displayNumber.textContent.includes('.') ? displayNumber.textContent = displayNumber.textContent : displayNumber.textContent += '.';
            }

            if (action === "clear") {
                removeSelectedClassPreviousOperator();
                displayNumber.textContent = '0';
                delete container.dataset.previousKeyType;
                delete container.dataset.laterNumber;
                delete container.dataset.previousNumber;
                delete container.dataset.previousOperatorType;
            }

            if (action === "equal") {
                if (displayNumber.textContent === "Estouro") {
                    container.dataset.previousNumber = "0";
                }
                if (!container.dataset.laterNumber) {
                    container.dataset.previousNumber = displayNumber.textContent;
                    container.dataset.laterNumber = container.dataset.previousNumber;
                }
                let result = null;
                switch (container.dataset.previousOperatorType) {
                    case "mult":
                        result = Number(container.dataset.previousNumber) * Number(container.dataset.laterNumber)
                        break;
                    case "divi":
                        result = Number(container.dataset.previousNumber) / Number(container.dataset.laterNumber)
                        break;
                    case "soma":
                        result = Number(container.dataset.previousNumber) + Number(container.dataset.laterNumber)
                        break;
                    case "sub":
                        result = Number(container.dataset.previousNumber) - Number(container.dataset.laterNumber)
                        break;
                    case "raiz":
                        result = Math.sqrt(Number(container.dataset.previousNumber)).toFixed(9);
                        break;
                    case "percent":
                        console.log("Percentual")
                        break;
                    default:
                        break;
                }
                if (result != null) {
                    (-9999999999999 < result && result < 9999999999999) ? displayNumber.textContent = result : displayNumber.textContent = "Estouro";
                    removeSelectedClassPreviousOperator();
                }
                container.dataset.previousNumber = displayNumber.textContent;
            }
        }
    }
});
function removeSelectedClassPreviousOperator() {
    const lastOperator = keys.querySelector('#' + container.dataset.previousOperatorType);
    lastOperator.classList.remove('operator_selected');
}