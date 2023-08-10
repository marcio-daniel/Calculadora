const container = document.querySelector('.container')
const keys = container.querySelector('.keyboard')
const operators = {
    mult: '<i class="fa-solid fa-xmark fa-2xs"></i>',
    divi: '<i class="fa-solid fa-divide fa-2xs"></i>',
    sub: '<i class="fa-solid fa-minus fa-2xs"></i>',
    soma: '<i class="fa-solid fa-plus fa-2xs"></i>',
    raiz: '<i class="fa-solid fa-square-root-variable fa-2xs"></i>',
}
const displayEq = container.querySelector('#eq');
const displayNumber = container.querySelector('.display_num');

keys.addEventListener('click', e => {

    if (e.target.matches('button')) {

        const key = e.target;
        const action = key.dataset.action;

        if (!action) {

            const keyContent = key.textContent;

            if (displayNumber.textContent === "0"
                || container.dataset.previousKeyType === 'operator'
                || displayNumber.textContent === "Estouro") {

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

            if (action === 'mult'
                || action === 'soma'
                || action === 'sub'
                || action === 'divi'
                || action === "raiz") {

                if (container.dataset.previousOperatorType !== action
                    && container.dataset.previousOperatorType) {

                    removeSelectedClassPreviousOperator();
                }
                key.classList.add('operator_selected');

                container.dataset.previousKeyType = 'operator';
                container.dataset.previousOperatorType = action;
                container.dataset.previousNumber = displayNumber.textContent;
                atualizaDisplayEq();

            }

            if (action === "percent") {
                if (container.dataset.previousNumber
                    && container.dataset.previousKeyType === "operator") {

                    container.dataset.laterNumber = ((Number(container.dataset.previousNumber)) / 100) * (Number(container.dataset.previousNumber));
                    displayNumber.textContent = container.dataset.laterNumber;
                }
                if (container.dataset.previousKeyType === 'number'
                    && container.dataset.previousOperatorType
                    && container.dataset.previousNumber) {

                    container.dataset.laterNumber = ((Number(displayNumber.textContent)) / 100) * (Number(container.dataset.previousNumber))
                    displayNumber.textContent = container.dataset.laterNumber;
                }

            }
            if (action === "deci") {
                displayNumber.textContent.includes('.') ? displayNumber.textContent = displayNumber.textContent : displayNumber.textContent += '.';
            }

            if (action === "clear") {
                clear();
            }

            if (action === "abre_paren") {
                if (!container.dataset.eqComp) {
                    container.dataset.eqComp = true;
                    displayEq.textContent += '(';
                    container.dataset.countOpenParent = 1;
                } else {
                    if (container.dataset.countOpenParent < 7) {
                        container.dataset.countOpenParent++;
                        displayEq.textContent += '(';
                    }
                }
            }
            if (action === "fecha_paren") {
                if (container.dataset.eqComp) {
                    if (!container.dataset.countCloseParent) {
                        displayEq.textContent += ')';
                        container.dataset.countCloseParent = 1;
                    } else {
                        if (container.dataset.countCloseParent < container.dataset.countOpenParent) {
                            container.dataset.countCloseParent++;
                            displayEq.textContent += ')';
                        }
                    }
                }
            }

            if (action === "equal") {
                if (displayNumber.textContent === "Estouro") {
                    container.dataset.previousOperatorType ? clear() : displayNumber.innerHTML = '0';
                    container.dataset.previousNumber = displayNumber.textContent;
                } else {
                    if (!container.dataset.laterNumber) {
                        container.dataset.previousNumber = displayNumber.textContent;
                        container.dataset.laterNumber = container.dataset.previousNumber;
                    }
                    let result = null;
                    switch (container.dataset.previousOperatorType) {
                        case "mult":
                            result = Number(container.dataset.previousNumber) * Number(container.dataset.laterNumber)
                            Number.isInteger(result) ? result = result : result = result.toFixed(9)
                            break;
                        case "divi":
                            result = Number(container.dataset.previousNumber) / Number(container.dataset.laterNumber)
                            Number.isInteger(result) ? result = result : result = result.toFixed(9)
                            break;
                        case "soma":
                            result = Number(container.dataset.previousNumber) + Number(container.dataset.laterNumber)
                            Number.isInteger(result) ? result = result : result = result.toFixed(9)
                            break;
                        case "sub":
                            result = Number(container.dataset.previousNumber) - Number(container.dataset.laterNumber)
                            Number.isInteger(result) ? result = result : result = result.toFixed(9)
                            break;
                        case "raiz":
                            result = Math.sqrt(Number(container.dataset.previousNumber));
                            Number.isInteger(result) ? result = result : result = result.toFixed(9)
                            break;
                        default:
                            break;
                    }
                    if (result != null) {
                        displayNumber.textContent = result;
                        removeSelectedClassPreviousOperator();
                        if (!(-9999999999999 < result && result < 9999999999999)) {
                            displayNumber.textContent = "Estouro";
                            delete container.dataset.previousKeyType;
                            delete container.dataset.laterNumber;
                            delete container.dataset.previousNumber;
                            delete container.dataset.previousOperatorType;
                        }
                        atualizaDisplayEq(true);
                        container.dataset.previousNumber = displayNumber.textContent;
                        if (container.dataset.previousOperatorType === "raiz") {
                            delete container.dataset.previousOperatorType;
                        }
                    }
                }
            }
        }
    }
});

function removeSelectedClassPreviousOperator() {
    if (container.dataset.previousOperatorType) {
        const lastOperator = keys.querySelector('#' + container.dataset.previousOperatorType);
        lastOperator.classList.remove('operator_selected');
    }
}

function atualizaDisplayEq(fimeq = false) {
    if (displayNumber.textContent === "Estouro") {
        displayEq.innerHTML = ''
    } else {
        let op;
        switch (container.dataset.previousOperatorType) {
            case "mult":
                op = operators.mult;
                break;
            case "divi":
                op = operators.divi;
                break;
            case "soma":
                op = operators.soma;
                break;
            case "sub":
                op = operators.sub;
                break;
            case "raiz":
                op = operators.raiz;
                break;
            default:
                break;
        }
        if (container.dataset.previousOperatorType === "raiz") {
            fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
        } else {
            fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
        }
    }

}

function clear() {
    removeSelectedClassPreviousOperator();
    displayNumber.textContent = '0';
    displayEq.innerHTML = '';
    delete container.dataset.previousKeyType;
    delete container.dataset.laterNumber;
    delete container.dataset.previousNumber;
    delete container.dataset.previousOperatorType;
    delete container.dataset.eqComp;
    delete container.dataset.countOpenParent;


}