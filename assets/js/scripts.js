const container = document.querySelector('.container')
const keys = container.querySelector('.keyboard')
const operators = {
    mult: '*',
    divi: '/',
    sub: '-',
    soma: '+',
    raiz: '<i class="fa-solid fa-square-root-variable fa-2xs"></i>',
    x_ele_y: '^'
}
const displayEq = container.querySelector('#eq');
const displayNumber = container.querySelector('.display_num');

keys.addEventListener('click', e => {

    if (e.target.matches('button')) {

        const key = e.target;
        const action = key.dataset.action;

        if (!action) {

            const keyContent = key.textContent;
            if(displayEq.textContent === "Equação inválida"){
                displayEq.innerHTML='';
            }

            if (displayNumber.textContent === "0"
                || container.dataset.previousKeyType === 'operator'
                || displayNumber.textContent === "Estouro"
                ) {

                if (container.dataset.previousOperatorType) {
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

            if (!container.dataset.eqComp) {
                if (action === 'mult'
                    || action === 'soma'
                    || action === 'sub'
                    || action === 'divi'
                    || action === "raiz"
                    || action === "expo_quadra"
                    || action === "x_ele_y"
                    || action === "fatorial") {

                    container.dataset.previousKeyType = 'operator';
                    container.dataset.previousOperatorType = action;
                    container.dataset.previousNumber = displayNumber.textContent;
                    atualizaDisplayEq();
                }

                if (action === "percent") {
                    if (container.dataset.previousNumber
                        && container.dataset.previousKeyType === "operator") {
                        const result = ((Number(container.dataset.previousNumber)) / 100) * (Number(container.dataset.previousNumber));
                        Number.isInteger(result) ? container.dataset.laterNumber = result : container.dataset.laterNumber = result.toFixed(1)
                        displayNumber.textContent = container.dataset.laterNumber;
                    }
                    if (container.dataset.previousKeyType === 'number'
                        && container.dataset.previousOperatorType
                        && container.dataset.previousNumber) {
                        const result = ((Number(displayNumber.textContent)) / 100) * (Number(container.dataset.previousNumber))
                        Number.isInteger(result) ? container.dataset.laterNumber = result : container.dataset.laterNumber = result.toFixed(1)
                        displayNumber.textContent = container.dataset.laterNumber;
                    }

                }
                if (action === "deci") {
                    displayNumber.textContent.includes('.') ? displayNumber.textContent = displayNumber.textContent : displayNumber.textContent += '.';
                }

                if (action === "clear") {
                    clear();
                }

                if (action === "clear_displayNumber") {
                    displayNumber.textContent = '0';
                }

                if (action === "(") {
                    container.dataset.eqComp = true;
                    container.dataset.countOpenParen = 1;
                    displayEq.innerHTML += "(";
                    container.dataset.previousKeyType = "paren";
                    displayNumber.textContent = "0";
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
                                Number.isInteger(result) ? result = result : result = result.toFixed(1)
                                break;
                            case "divi":
                                result = Number(container.dataset.previousNumber) / Number(container.dataset.laterNumber)
                                Number.isInteger(result) ? result = result : result = result.toFixed(1)
                                break;
                            case "soma":
                                result = Number(container.dataset.previousNumber) + Number(container.dataset.laterNumber)
                                Number.isInteger(result) ? result = result : result = result.toFixed(1)
                                break;
                            case "sub":
                                result = Number(container.dataset.previousNumber) - Number(container.dataset.laterNumber)
                                Number.isInteger(result) ? result = result : result = result.toFixed(1)
                                break;
                            case "raiz":
                                result = Math.sqrt(Number(container.dataset.previousNumber));
                                Number.isInteger(result) ? result = result : result = result.toFixed(1)
                                break;
                            case "x_ele_y":
                                result = Math.pow(Number(container.dataset.previousNumber), Number(container.dataset.laterNumber));
                                Number.isInteger(result) ? result = result : result = result.toFixed(1)
                                break;
                            case "expo_quadra":
                                result = Math.pow(Number(container.dataset.previousNumber), 2);
                                Number.isInteger(result) ? result = result : result = result.toFixed(1)
                                break;
                            case "fatorial":
                                container.dataset.previousNumber = Math.trunc(Number(container.dataset.previousNumber));
                                result = factorialize(Number(container.dataset.previousNumber));
                                break;
                            default:
                                break;
                        }
                        if (result != null) {
                            displayNumber.textContent = result;
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
            } else {
                if (action === "(") {
                    if (container.dataset.countOpenParen < 7) {
                        if (container.dataset.previousKeyType === "operator" || container.dataset.previousKeyType === "paren") {
                            container.dataset.countOpenParen++;
                            displayEq.innerHTML += "(";
                            container.dataset.previousKeyType = "paren";
                            displayNumber.textContent = "0";
                        }
                    }
                }
                if (action === ")") {
                    if (container.dataset.countCloseParen) {
                        if (container.dataset.countCloseParen < container.dataset.countOpenParen) {
                            if (container.dataset.previousKeyType === "number" || container.dataset.previousKeyType === "paren") {
                                if (container.dataset.previousKeyType === "number" && displayNumber.textContent != '0') {
                                    displayEq.innerHTML += displayNumber.textContent;
                                }
                                displayEq.innerHTML += ")";
                                container.dataset.countCloseParen++;
                                container.dataset.previousKeyType = "paren";
                                displayNumber.textContent = "0";
                            }

                        }

                    } else {
                        if (container.dataset.previousKeyType === "number" && displayNumber.textContent != '0') {
                            displayEq.innerHTML += displayNumber.textContent;
                        }
                        displayEq.innerHTML += ")";
                        container.dataset.countCloseParen = 1;
                        container.dataset.previousKeyType = "paren";
                        displayNumber.textContent = "0";

                    }
                }

                if (action === "deci") {
                    displayNumber.textContent.includes('.') ? displayNumber.textContent = displayNumber.textContent : displayNumber.textContent += '.';
                }

                if (action === "clear") {
                    clear();
                }

                if (action === "clear_displayNumber") {
                    displayNumber.textContent = '0';
                }

                if (action === 'mult'
                    || action === 'soma'
                    || action === 'sub'
                    || action === 'divi') {
                    if (displayNumber.textContent != "0") {
                        container.dataset.previousKeyType = 'operator';
                        container.dataset.previousOperatorType = action;
                        container.dataset.previousNumber = displayNumber.textContent;
                        atualizaDisplayEqComp();
                    } else {
                        container.dataset.previousKeyType = 'operator';
                        container.dataset.previousOperatorType = action;
                        container.dataset.previousNumber = "";
                        atualizaDisplayEqComp();
                    }
                }
                if (action === "equal") {
                    let eq = displayEq.textContent.replace(/ /g, "");
                    console.log("Equação sem espaços: "+eq)
                    if(container.dataset.countOpenParen === container.dataset.countCloseParen){
                        achaResult(eq);
                    }else{
                        displayNumber.innerHTML = "";
                        displayEq.innerHTML = "Equação inválida";
                    }
                }
            }
        }
    }
});


function atualizaDisplayEqComp(fimeq = false) {
    if (displayNumber.textContent === "Estouro") {
        displayEq.innerHTML = ''
    } else {
        let op;
        switch (container.dataset.previousOperatorType) {
            case "mult":
                op = operators.mult;
                fimeq ? displayEq.innerHTML += `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML += `${container.dataset.previousNumber} ${op} `;
                break;
            case "divi":
                op = operators.divi;
                fimeq ? displayEq.innerHTML += `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML += `${container.dataset.previousNumber} ${op} `;
                break;
            case "soma":
                op = operators.soma;
                fimeq ? displayEq.innerHTML += `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML += `${container.dataset.previousNumber} ${op} `;
                break;
            case "sub":
                op = operators.sub;
                fimeq ? displayEq.innerHTML += `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML += `${container.dataset.previousNumber} ${op} `;
                break;
            default:
                break;
        }
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
                fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
                break;
            case "divi":
                op = operators.divi;
                fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
                break;
            case "soma":
                op = operators.soma;
                fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
                break;
            case "sub":
                op = operators.sub;
                fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
                break;
            case "raiz":
                op = operators.raiz;
                fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
                break;
            case "x_ele_y":
                op = operators.x_ele_y;
                fimeq ? displayEq.innerHTML = `${container.dataset.previousNumber} ${op} ${container.dataset.laterNumber} = ` : displayEq.innerHTML = `${container.dataset.previousNumber} ${op} `;
                break;
            case "expo_quadra":
                op = `${container.dataset.previousNumber}²`;
                fimeq ? displayEq.innerHTML = `${op} = ` : displayEq.innerHTML = `${op} `;
                break;
            case "fatorial":
                op = `${container.dataset.previousNumber}!`;
                fimeq ? displayEq.innerHTML = `${op} = ` : displayEq.innerHTML = `${op} `;
                break;
            default:
                break;
        }
    }

}

function clear() {
    displayNumber.textContent = '0';
    displayEq.innerHTML = '';
    delete container.dataset.previousKeyType;
    delete container.dataset.laterNumber;
    delete container.dataset.previousNumber;
    delete container.dataset.previousOperatorType;
    delete container.dataset.eqComp;
    delete container.dataset.countOpenParen;
    delete container.dataset.countCloseParen;


}

function factorialize(num) { //3 2 1
    if (num < 0) //  F F F F
        return -1;
    else if (num == 0) //  F F F V
        return 1;
    else {
        return (num * factorialize(num - 1)); //6
    }
}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function calcula(element, result) {
    let res = result;
    let indexOp = existOp(element);
    console.log("Index do Operador: "+indexOp);
    let numEsq='';
    let numDir='';
    for (let i = 0; i < indexOp ; i++) {
        numEsq+=element[i];
    }
    for (let j=indexOp+1; j<element.length; j++) {
        numDir+=element[j]
    }
    console.log(`Número da esquerda :${numEsq}  Número da direita:${numDir}`);
    switch (element[indexOp]) {
        case "*":
            return res = (Number(numEsq) * Number(numDir))
        case "/":
            return res = (Number(numEsq) / Number(numDir))
        case "+":
            return res = (Number(numEsq) + Number(numDir))
        case "-":
            return res = (Number(numEsq) - Number(numDir))
        default:
            break;
    }

}

function achaResult(eq) {
    
    let res=auxAchaResult(eq,0);
    displayNumber.textContent=res;
    
}

function auxAchaResult(eq,res){
    const eqFecha = eq.indexOf(")");
    console.log("Index do primeiro ) : "+eqFecha);
    if(eqFecha === -1){
        if(existOp(eq) != -1){
            return calcula(eq.split(""),res)
        }
        return res;
    }
    const subrq = eq.substring(0,eqFecha+1);
    console.log("Substring com a primeira eq a ser resolvida: "+subrq);
    let eqAbre = achaUltimoParen(subrq);
    console.log("Index do ultimo (: "+eqAbre);
    console.log("A equação a ser resolvida: "+(subrq.substring(eqAbre+1,eqFecha)).split(""))
    let r = calcula((subrq.substring(eqAbre+1,eqFecha)).split(""),res);
    console.log("Resultado da equação: "+r);
    const auxeq1 = eq.substring(0,eqAbre);
    console.log("Parte esquerda do restante da equação: "+auxeq1);
    const auxeq2 = eq.substring(eqFecha+1)
    console.log("Parte direita do restante da equação:: "+auxeq2);
    const newEq = `${auxeq1}${r}${auxeq2}`;
    console.log("Equação atualiza com o novo resultado: "+newEq)
    return auxAchaResult(newEq,r);
}

function existOp(eq) {
    for (let i = 0; i < eq.length; i++) {
        const element = eq[i];
        if(!isNumber(element)){
            return i;
        }
    }
    return -1;
}

function achaUltimoParen(subrq) {
    let eqAbre =0 ;
    for (let i = 0; i < subrq.length; i++) {
        const element = subrq[i];
        if(element==="("){
            eqAbre = i;
        }
    }
    return eqAbre;
}
