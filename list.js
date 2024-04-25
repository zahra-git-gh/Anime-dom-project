import{createElement1, selectedElement} from "./domUtils.js";
import{setData ,getDataStorage ,removeData} from "./storage.js"
//! there are function for add to list button 
//!and two function for remove this anime from list
// const buttonTest=selectedElement('button')
// buttonTest.addEventListener('click', async()=>{
//     try {
//         const token= getData('user')
//         console.log(token);
//         if(token){
//             const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${token}`)
//             const user=await res.json()
//             console.log(user);

//             //range of call functions 
//             //--from check we have this anime in our list or not
//             //-and if yes and user want to delete this 
//             //--we have function delete

//             //--now if we dont have this anime to our list
//             //--we want add to list watch by default 
//             //--we cant change that status in list page :)






//             if(user.length<1){
//                 console.log('hoho');
//                 window.location.replace('/login/login.html')
//             }else{
//                 //i dont have no idea :)
//             }
//         }else{
//             const resultAlert=confirm('please login first')
//             if(resultAlert){
//                 window.location.replace('/login/login.html')
//             }
//         }
//     } catch (error) {
        
//     }
// })
// //----------------------------define function ------------------
// //--array of list=array we splice one of the index or object 
// async function deletePutData1(typeList, userId, arrayOfList){
//     typeList=JSON.parse(typeList)
//     // console.log(typeList);
//     const getUserRes=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`, {
//         method:'PUT', 
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify({typeList:arrayOfList})
//     })
//     const getUserData=await getUserRes.json()
//     await console.log(getUserData);
// }

// async function isWeHave(userId, animeId){
//     const getUserRes=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
//     const getUserData=await getUserRes.json()
//     let isWeHave
//     let typeListName
//     getUserData.myAnimeList.watch.forEach((object)=>{
//             //!you shoud change this section to true like malid
//             if(object.id===animeId){
//                 isWeHave=true
//                 typeListName-'watch'
//             }
//         })
//     getUserData.myAnimeList.planToWatch.forEach((object)=>{
//         //!you shoud change this section to true like malid
//         if(object.id===animeId){
//             isWeHad=true
//             typeListName-'planToWatch'
//         }
//     })
//     getUserData.myAnimeList.compelted.forEach((object)=>{
//         //!you shoud change this section to true like malid
//         if(object.id===animeId){
//             isWeHave=true
//             typeListName-'compelted'
//         }
//     })
    
//     let isTrue
//     if(isWeHave && typeListName){
//         isTrue=true
//     }else{
//         isTrue=false
//     }
//     return {isTrue, isWeHave, typeListName}
// }

// async function check({isTrue, isWeHave, typeListName}){
//     if(isTrue){
//         const deleteOrNo=confirm('already have this anime in your list, do you want delete this ?')
//         if(deleteOrNo){
//             //-1-splice index
//             //-2-deletePutData1
//         }else{
//             addToListWatch()
//         }

//     }else{
//         //--add anime to anime list
//     }
// }

// async function spliceIndex(userId, animeId, typeListName){
//     typeListName=JSON.parse(typeListName)
//     const getUser=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
//     const data=await getUser.json()
//     const newData=data.typeListName
//     newData.forEach((object, index)=>{
//         if(object.id===animeId){
//             newData.splice(index,1)
//         }
//     })
//     return newData
// }

// async function addToListWatch(object, userId){
//     try {
//     const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
//     const data=await res.json()
//     const newData=data.myAnimeList.watch
//     newData.push(object)
//     const res1=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`, {
//         method:'PUT',
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify({watch:newData})
//     })
//     const data1=await res1.json()
//     console.log(data1);
//     } catch (error) {
//         console.log(error);
//     }
    
// }





// fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${3}`).then((res)=>{
//     return res.json()
// }).then((data)=>{
//     console.log(data);
//     console.log(data.myAnimeList);
//     data.myAnimeList.watch.push({name:'fullmetal', id:12121},{name:'tkyoGhoul', id:42343},{name:'spyFamily', id:12675})
//     console.log(data.myAnimeList.watch);
//     const deleteData=data.myAnimeList.watch
//     deleteData.forEach((element, index) => {
//         if(element.id===12121){
//             console.log(element);
//             deleteData.splice(index, 1)
//         }
//     })
//     console.log(deleteData);
//     fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${3}`,{
//         method:'PUT', 
//         headers:{
//             "Content-Type": "application/json"
//         },
//         body:JSON.stringify({watch:deleteData})
//     }).then((response)=>{
//         console.log(response);
//         return response.json()
//     }).then((data1)=>{console.log(data1);})
//     console.log(deleteData);
// }).catch((error)=>{
//     console.log(error);
// })
//!---------------------------------------------
//?select elements
const appendTbodyWatch=selectedElement('#watch>table')
const appendTbodyPlanToWatch=selectedElement('#planToWatch>table')
const appendTbodyCompleted=selectedElement('#completed>table')
const okBtnDelete=selectedElement('#okBtnDelete')

const selectStatus=selectedElement('.selectStatus')
const saveChangesBtn=selectedElement('#saveChanges')
const editBtnClose=selectedElement('.editBtnClose')
let deleteEl
let deleteID
let editEl
let editID
let editData
let isDelete=false
let typeListName
let editTypeListName=selectStatus.value
let newArr
let userID
function creatList(data, element){
    const tbodyTag=createElement1('tbody', ['m-auto'])
    data.forEach((object, index) => {
        const trTag=createElement1('tr', [])
        const thTag=createElement1('th', [])
        thTag.setAttribute('scope', 'row')
        const image=createElement1('img', [])
        image.setAttribute('src', object.image)
        image.style.width='100px'
        thTag.append(image)
        trTag.append(thTag)
        for(let i=0; i<3; i++){
            const tdTag=createElement1('td', [])
            if(i<1){
                tdTag.innerText=object.title
                trTag.append(tdTag)
            }else{
                tdTag.classList.add('icon')
                if(i<2){
                const iconEdit=createElement1('i', ['fa-solid', 'fa-pen-to-square'])
                iconEdit.setAttribute('data-bs-toggle', 'modal')
                iconEdit.setAttribute('data-bs-target', '#edit')
                iconEdit.addEventListener('click', (e)=>{
                    deleteEl=e.target.parentElement.parentElement
                    deleteID=object.id
                    typeListName=deleteEl.parentElement.parentElement.parentElement.id
                    editData=object
                })
                tdTag.append(iconEdit)
                trTag.append(tdTag)
                }else{
                tdTag.classList.add('icon')
                const iconTrash=createElement1('i', ['fa-solid', 'fa-trash'])
                iconTrash.setAttribute('data-bs-toggle', 'modal')
                iconTrash.setAttribute('data-bs-target', '#exampleModal')
                iconTrash.addEventListener('click', (e)=>{
                    deleteEl=e.target.parentElement.parentElement
                    deleteID=object.id
                    typeListName=deleteEl.parentElement.parentElement.parentElement.id
                })
                tdTag.append(iconTrash)
                trTag.append(tdTag)
                }
            }
        }
        tbodyTag.append(trTag)
    element.append(tbodyTag)
    });
}
okBtnDelete.addEventListener('click', async()=>{
    if(typeListName==='completed'){
        console.log('felan1');
        typeListName='compelted'
    }
    console.log(typeListName);
    isDelete=true
    deleteEl.remove()
    userID=await getDataStorage('user')
    newArr=await spliceIndex(userID, deleteID, typeListName)
    
    await console.log(newArr);
    const changeData=await deletePutData1(typeListName, userID, newArr)
    console.log(changeData);
})
selectStatus.addEventListener('change', (e)=>{
    editTypeListName=e.target.value
})
saveChangesBtn.addEventListener('click', async()=>{
    userID=await getDataStorage('user')
    const edit=await addToTypeListName(editData, userID, editTypeListName)
   await okBtnDelete.click()
   console.log(`this is edit response ${edit}`);
   if(edit===200){
    editBtnClose.click()
    // location.reload()
   }else{
    editBtnClose.click()
    alert('there is a problem ...try again :(')
     location.reload()
   }
})





console.log(getDataStorage('user'));
async function getList(listType){
    // listType=JSON.parse()
    const userID=await getDataStorage('user')
    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userID}`)
    const data=await res.json()
    const list=await data[listType]
    // console.log(data);
    console.log(data[listType]);
    if(listType==='watch'){creatList(list, appendTbodyWatch)
    }else if(listType==='compelted'){creatList(list, appendTbodyCompleted)
    }else if(listType==='planToWatch'){creatList(list, appendTbodyPlanToWatch)
    console.log('haha');}
}                    
setTimeout(() => {
    getList('watch')
    
}, 1000);    
setTimeout(() => {
    getList('compelted')
    
}, 3000);      
setTimeout(() => {
    getList('planToWatch')
    
}, 5000);



async function spliceIndex(userId, animeId, typeListName){
    const getUser=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
    const data=await getUser.json()
    if(typeListName==='completed'){
        console.log('felan');
        typeListName='compelted'
    }else{
        typeListName=typeListName
    }
        const newData=data[typeListName]
console.log(typeListName);
    
    newData.forEach((object, index)=>{
        if(object.id===animeId){
            newData.splice(index,1)
        }
    })
    return newData
}
async function deletePutData1(typeList, userId, arrayOfList){

    const getUserRes=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`, {
        method:'PUT', 
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({[typeList]:arrayOfList})
    })
    const getUserData=await getUserRes.json()
    await console.log(getUserData);
}
async function addToTypeListName(object, userId, typeListName){
    try {
    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
    const data=await res.json()
    console.log(data);
    console.log(typeListName);
    const newData=await data[typeListName]
    console.log(newData);
    console.log(object);
    newData.push(object)
    console.log(newData);
    const res1=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`, {
        method:'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({[typeListName]:newData})
    })
    const data1=await res1.json()
    console.log(data1);
    return 200
    } catch (error) {
       return 404
    }
    
}
const welcome=document.querySelector('#welcome span')
async function welcomeUser(){
    const userID=await getDataStorage('user')
    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userID}`)
    const data=await res.json()
    welcome.innerText=data.email
}
welcomeUser()