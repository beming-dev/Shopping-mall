let password = document.querySelector('.register-container #pw');
let passwordCheck = document.querySelector('.register-container #pwc');
let submit = document.querySelector('.register-container .submit');

let labelPwc = document.querySelector('.register-container .label_pwc');

console.log('1');

passwordCheck.addEventListener('blur', ()=>{
    if(password.value != passwordCheck.value){
        submit.disabled=true;
        labelPwc.classList.add("correspond");
    }else{
        submit.disabled=false;
        labelPwc.classList.remove("correspond");
    }
})