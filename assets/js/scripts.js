const container = document.querySelector('.container')
const keys = container.querySelector('.keyboard')
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const displayNumber = container.querySelector('.display');
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
                    if (container.dataset.laterNumber){
                        container.dataset.laterNumber = displayNumber.textContent;
                    }
                    container.dataset.previousKeyType = 'number';
                }
            }
        } else {
            if (action === 'mult' || action === 'soma' || action === 'sub' || action === 'divi') {
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
                displayNumber.textContent = '0';
                container.dataset.previousKeyType = null;
                container.dataset.laterNumber = null;
                container.dataset.previousNumber = null;
                removeSelectedClassPreviousOperator();
            }

            if (action === "equal") {
                if(displayNumber.textContent === "Estouro"){
                    container.dataset.previousNumber = "0";
                }
                if(!container.dataset.laterNumber){
                    container.dataset.laterNumber = container.dataset.previousNumber;
                }
                let result;
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
                    default:
                        break;
                }
                (-9999999999999<result && result < 9999999999999) ? displayNumber.textContent = result : displayNumber.textContent = "Estouro" ;
                container.dataset.previousNumber = displayNumber.textContent;
            }
        }
    }
});
function removeSelectedClassPreviousOperator() {
    const lastOperator = keys.querySelector('#' + container.dataset.previousOperatorType);
    lastOperator.classList.remove('operator_selected');
}