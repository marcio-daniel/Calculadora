const container = document.querySelector('.container')
const keys = container.querySelector('.keyboard')
keys.addEventListener('click', e => {
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action;
        if(!action){
            const keyContent = key.textContent;
            const displayNumber = container.querySelector('.display');
            if(displayNumber.textContent === "0"){
                displayNumber.innerHTML= keyContent;
            }else{
                if(displayNumber.textContent.length < 13){
                    displayNumber.innerHTML += keyContent;
                    console.log(displayNumber.textContent)
                }
            }
        }else{
            switch (action) {
                case "mult":
                    console.log("Multiplicação");
                    break;
                case "divi":
                    console.log("Divisão");
                    break;
                case "soma":
                    console.log("Soma");
                    break;
                case "sub":
                    console.log("Subtração");
                    break;
                case "clear":
                    console.log("Limpa");
                    break;
                case "equal":
                    console.log("Igual");
                    break;
                case "deci":
                    console.log("Decimal");
                    break;
            
                default:
                    break;
            }
        }
    }
})