let id = document.querySelector('.register-container #id');
let email = document.querySelector('.register-container #email');
let password = document.querySelector('.register-container #pw');
let passwordCheck = document.querySelector('.register-container #pwc');
let submit = document.querySelector('.register-container .submit');

let labelPwc = document.querySelector('.register-container .label_pwc');

console.log('1');

submit.addEventListener('click', (e) =>{
    if(!id.value){
        alert('id를 입력해주세요');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    else if(!password.value){
        alert('password를 입력해주세요');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    else if(!passwordCheck.value){
        alert('paaword일치 확인');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    else if(!email.value){
        alert('email을 입력해주세요');
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
})

passwordCheck.addEventListener('blur', ()=>{
    if(password.value != passwordCheck.value){
        submit.disabled=true;
        labelPwc.classList.add("correspond");
    }else{
        submit.disabled=false;
        labelPwc.classList.remove("correspond");
    }
})