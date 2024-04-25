import{createElement1, selectedElement} from "../utils/domUtils.js";
import{setData ,getDataStorage ,removeData} from "../utils/storage.js"
//select Elements
const inputPassword=selectedElement('.passwordInput')
const passwordHelp=selectedElement('#passwordHelpBlock small')
console.log(passwordHelp);
const formLogin=selectedElement('form')
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
//--validation password
inputPassword.addEventListener('input', (e)=>{
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
//alert function
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
     //---------

formLogin.addEventListener('submit', async(e)=>{
    e.preventDefault()
    alertPlaceholder.innerHTML=''
    const inputEamil=e.target.exampleInputEmail1
    const inputPassword1=e.target.exampleInputPassword1
        if(passwordHelp.innerText==='normal :)' || passwordHelp.innerText==='strong'){
            try{
            const userExists=await checkUser(inputEamil.value)
            // console.log(userExists);
            if(userExists.statusCode===201){
                postUser(inputEamil.value.trim(), inputPassword1.value.trim())
                .then((data)=>{
                    console.log(data);
                    setTimeout(() => {
                        setData(data)
                        window.location.replace('/homePage/index.html')
                    }, 2000);
                    
                    appendAlert('signed up successfully', 'success')
                })
                .catch((error)=>appendAlert('signed up not successfully :(', 'warning'))
                
                    
       
                inputEamil.value=''
                inputPassword1.value=''
                passwordHelp.innerText=''
                }else{
                    appendAlert('the email is already exists', 'warning')
                    inputEamil.value=''
                    inputPassword1.value=''
                    passwordHelp.innerText=''
                }
            }catch{
            appendAlert('signed up not successfully :(', 'warning')
            inputEamil.value=''
            inputPassword1.value=''
            passwordHelp.innerText=''
            }
            
            
            
            
        }else{
            alert('invalid password')
        }
})

async function postUser(email, password){
    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users`,{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(
            {
                email,
                password,
                watch:[],
                planToWatch:[],
                compelted:[]
                
            }
          )
    })
    const data=await res.json()
    return data
}
async function checkUser(email1){
    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users`)
    const data=await res.json()
    let newData
    await data.forEach(object => {
        console.log(object.email);
        if(object.email===email1){
            newData={
                statusCode: 409,
                message: 'the email is already exists',
              }
            
           
        }else{
            newData={ 
                statusCode: 201, 
                message: 'signed up successfully', 
                }
            
            
                
            
        }
    });
    return newData
}

//--we should have a user so ....

checkUser('zahraGhanbari@gmail.com').then((data)=>{
    if(data.statusCode===201){
        postUser('zahraGhanbari@gmail.com', 'zahrasgh82')
    }
}).catch((error)=>{console.log(error);})
