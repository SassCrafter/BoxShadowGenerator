const getElByID = id => document.getElementById(id);
const getElByClass = className => document.querySelector(className);

// Inputs

// Color inputs
const bgColor = getElByID('bg-color');
const buttonBgColor = getElByID('button-bg');
const buttonColor = getElByID('button-color');
const shadowColor = getElByID('shadow-color');

// Shadow inputs

const offsetX = getElByID('offset-x');
const offsetY = getElByID('offset-y');
const blurR = getElByID('blur');
const spreadR = getElByID('spread');
const opacity = getElByID('opacity');
const insetCheckbox = getElByID('inset');


// Box shadow code message
const btn = getElByClass('.btn');
const message = document.getElementById('message-text');
let shadowStr = `${offsetX.value}px ${offsetY.value}px ${blurR.value}px ${spreadR.value}px ${hexToRGBA(shadowColor.value, opacity)}`;

// Copy button
const copyBtn = getElByClass('.copy-btn');




function updateTextInput(modifiedInput) {
    const textInput = getElByID(`${modifiedInput.id}-text`);
    textInput.value = modifiedInput.value;
}

function hexToRGBA(hex, opacity) {
    let r = 0, g = 0, b = 0;
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];

    //console.log( `rgba(${+r}, ${+g}, ${+b}, ${opacity.value})`);
    return `rgba(${+r}, ${+g}, ${+b}, ${opacity.value})`;
}


function changeVarsValues(modifiedInput) {
    const prefix = modifiedInput.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${modifiedInput.name}`, modifiedInput.value + prefix);
    //console.log(modifiedInput.name, modifiedInput.value)
}

function changeShadowColor(modifier) {
    if (modifier.id === 'opacity') {
        const shadowColorHex = hexToRGBA(shadowColor.value, modifier);
        document.documentElement.style.setProperty('--shadow-color', shadowColorHex);
        //console.log(modifier.value, opacity.value);
    }
}


function updateOffsetX(modifier) {
    if (modifier.id === 'offset-x') {
        document.documentElement.style.setProperty('--offset-x', modifier.value + 'px');
    }
}
function updateOffsetY(modifier) {
    if (modifier.id === 'offset-y') {
        document.documentElement.style.setProperty('--offset-y', modifier.value + 'px');
    }
}
function updateBlur(modifier) {
    if (modifier.id === 'blur') {
        document.documentElement.style.setProperty('--blur', modifier.value + 'px');
    }
}

function updateSpread(modifier) {
    if (modifier.id === 'spread') {
        document.documentElement.style.setProperty('--spread', modifier.value + 'px');
    }
}

function insetCheck() {
    if (insetCheckbox.checked === true) {
        shadowStr = `inset ${offsetX.value}px ${offsetY.value}px ${blurR.value}px ${spreadR.value}px ${hexToRGBA(shadowColor.value, opacity)}`;
        btn.style.setProperty('box-shadow', shadowStr);
    } else {
        shadowStr = `${offsetX.value}px ${offsetY.value}px ${blurR.value}px ${spreadR.value}px ${hexToRGBA(shadowColor.value, opacity)}`;
        btn.style.setProperty('box-shadow', shadowStr);
    }
    showShadowMessage();
}

function showShadowMessage() {
    message.innerHTML = 'box-shadow: ' + shadowStr + ";";
}

function handleUpdate() {
    updateTextInput(this);
    changeVarsValues(this);
    changeShadowColor(this);
    updateOffsetX(this);
    updateOffsetY(this);
    updateBlur(this);
    updateSpread(this);
    insetCheck();
    showShadowMessage();
}



showShadowMessage();
// Range inputs
const rangeInputs = document.querySelectorAll('input[type=range]');
rangeInputs.forEach(input => { input.addEventListener('mousemove', handleUpdate)});
rangeInputs.forEach(input => { input.addEventListener('change', handleUpdate)});

// Color inputs
const colorInputs = document.querySelectorAll('input[type=color');
colorInputs.forEach(input => { input.addEventListener('change', handleUpdate)});

insetCheckbox.addEventListener('click', insetCheck);

copyBtn.addEventListener('click', () => {

    copyBtn.classList.add('clicked');
    setTimeout(() => {
        copyBtn.classList.remove('clicked');
    }, 200)

    const r = document.createRange();
    r.selectNode(message);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    

});