const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");

let passwordDisplay = document.querySelector("[data-passwordDisplay]");
let copyBtn = document.querySelector("[data-copy]");
let copyMsg = document.querySelector("[data-copyMsg]");
let uppercaseCheck = document.querySelector("#uppercase");
let lowercaseCheck = document.querySelector("#lowercase");
let numbersCheck = document.querySelector("#numbers");
let symbolsCheck = document.querySelector("#symbols");
let indicator = document.querySelector("[data-indicator]");
let generateBtn = document.querySelector(".generatebutton");
let allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength =10;
let checkCount=0; 
// ste strength 
setindicator("#ccc");
handleslider(); 
// set the password length 
function handleslider(){
    inputSlider.value=passwordLength;
    lenghtDisplay.innerText = passwordLength;
    // one thing you have to do by ur own is set this number with slider;
    let min =inputSlider.min;
    let max=inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";
}

inputSlider.addEventListener('input' , (e) => {
    passwordLength=e.target.value;
    handleslider();
})

function setindicator(color){
    indicator.style.backgroundColor = color;
    // shadow hw.
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`
}

function getRndInteger(min, max){
   return  Math.floor(Math.random() * (max-min))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasnum = false;
    let hassys = false;
    if(uppercaseCheck.checked)  hasUpper = true;
    if(lowercaseCheck.checked)  hasLower = true;
    if(numbersCheck.checked)  hasnum = true;
    if(symbolsCheck.checked)  hassys = true;
    
    // rules can be changed persons thinking which is strong 
    if(hasUpper && hasLower && (hasnum || hassys) && passwordLength>=8){
        setindicator('#0f0');
    }
    else if ((hasLower || hasUpper) && (hasnum || hassys) && passwordLength>=6){
        setindicator('#ff0');
    }
    else{
        setindicator('#f00');
    }
}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="Copied";
    }
    catch(e){
        copyMsg.innerText="Failed";
    }
    copyMsg.classList.add("active");
    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}
function handleCheckBoxChnge(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
        //special condition
        if(passwordLength < checkCount){
            passwordLength = checkCount;
            handleslider();
        }
    
}

allCheckBox.forEach ((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChnge)
})

copyBtn.addEventListener('click',()=>{
 if(passwordDisplay.value){
    copyContent();
 }
});

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click',()=>{
    
    // if none is checked
    if(checkCount<=0){
        password = "";
        passwordDisplay.value = password;
        return;
    }
        

    if(passwordLength< checkCount){
        passwordLength = checkCount;
    }

    // finding new password 
        // remove old password
        password = "";
        //lets put stuff according to checkbox
        // if(uppercaseCheck.checked){
        //     password+=generateUpperCase();
        // }
        // if(lowercaseCheck.checked){
        //     password+=generateLowerCase();
        // }
        // if(numbersCheck.checked){
        //     password+=generateRandomNumber();
        // }
        // if(symbolsCheck.checked){
        //     password+=generateSymbol();
        // }

        // no need because we are using random and amking function
        let funarr =[];
            if(uppercaseCheck.checked){
              funarr.push(generateUpperCase); 
            }
            if(lowercaseCheck.checked){
                funarr.push(generateLowerCase);
            }
            if(numbersCheck.checked){
                funarr.push(generateRandomNumber);
            }
            if(symbolsCheck.checked){
                funarr.push(generateSymbol);       
            }
            //compulsory addition
            for(let i=0; i<funarr.length ; i++){
                password +=funarr[i]();
            }
            for(let i=0 ; i<passwordLength-funarr.length ; i++){
                let randIndex = getRndInteger(0, funarr.length);
                password +=funarr[randIndex]();
            }
            //jugli jugli jul jula jugli jugli ju
            password =shufflePassword(Array.from(password));
           passwordDisplay.value = password; 
           calcStrength();
})
