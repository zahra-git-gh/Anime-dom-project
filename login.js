import{createElement1, selectedElement} from "./domUtils.js";
import{setData ,getDataStorage ,removeData} from "./storage.js"
//select Elements
const inputPassword=selectedElement('.passwordInput')
const passwordHelp=selectedElement('#passwordHelpBlock small')
const formLogin=selectedElement('form')
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
//--validation password
inputPassword.addEventListener('input', (e)=>{
    console.log(e.target.value);
    if(e.target.value.length<1){
        passwordHelp.innerText=''
    }else if(e.target.value.length<8){
        passwordHelp.innerText='not strong enough'
        passwordHelp.style.color='darkred'
    }else if(e.target.value.length>20){
        passwordHelp.innerText='Your password length longer than 20 characters '
        passwordHelp.style.color='darkred'
    }else if(e.target.value.includes(' ')){
        passwordHelp.innerText='Your password and must not contain spaces '
        passwordHelp.style.color='darkred'
    }else if(e.target.value.includes('$')||e.target.value.includes('@')){
        passwordHelp.innerText='strong'
        passwordHelp.style.color='lightgreen'
    }else if(e.target.value.length>8 && e.target.value.length<20){
        passwordHelp.innerText='normal :)'
        passwordHelp.style.color='yellow'
    }
})
//--alert function
const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
     }
     //--

formLogin.addEventListener('submit', async(e)=>{
    
    e.preventDefault()
    alertPlaceholder.innerHTML=''
    // console.log('hello im submit add event listener');
    const inputEmail1=e.target.exampleInputEmail1
    const inputPassword1=e.target.exampleInputPassword1
    if(passwordHelp.innerText==='normal :)' || passwordHelp.innerText==='strong'){
        console.log('accept password');
        const arr=await checkUser(inputEmail1.value.trim(),inputPassword1.value.trim())
        if(arr.length<1){
            
            appendAlert('email or password is incorrect', 'danger')
        }
        inputEmail1.value=''
        inputPassword1.value=''
        passwordHelp.innerText=''
        setTimeout(() => {
            setData(arr[0])
            window.location.replace('/homePage/index.html')
        }, 2000)
        
    }else{
        alert('invalid password')
        console.log('i can submit without email haha');
    }
})

async function checkUser(email, password){
    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users`)
    const data=await res.json()
    let arr=[]
    data.forEach((object) => {
        if(object.email===email && object.password===password){
            console.log('logged in successfully');
            arr.push(object)
            appendAlert('logged in successfully', 'success')
        }else{
            // isTrue=false
        }
    });
    return arr
}