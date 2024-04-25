import{createElement1, selectedElement} from "./domUtils.js";
import{setData ,getDataStorage ,removeData, removeDataSearch} from "./storage.js"
//---show result for input search
//--select elements
const buttonSearch=selectedElement('.buttonSearch')
const userSearch=selectedElement('.parentOfResultSearch h6 span')
const resultForSearchAnime=selectedElement('.parentOfResultSearch h6')
const inputSearch=selectedElement('.inputSearch')
const API_URL = 'https://api.jikan.moe/v4';
const rowOfSearchResult=selectedElement('.cardsSearch')
//--

// console.log(`this is result get data search ${getDataStorage('search')}`);
console.log(getDataStorage('search'));
if(getDataStorage('search')){
    console.log('the data search is full');
    fetchDataSearch(getDataStorage('search'))
    removeDataSearch()
}

buttonSearch.addEventListener('click', ()=>{
    let inputSearchValue=inputSearch.value
    if(!inputSearchValue){
        alert('search anime name :>')
    }else{
        rowOfSearchResult.innerHTML=''
        resultForSearchAnime.style.display='block'
        userSearch.innerText=inputSearchValue
        fetchDataSearch(inputSearchValue)
    }
    inputSearch.value=''
})
async function fetchDataSearch(userSearch){
    const response=await fetch(`${API_URL}/anime?q=${userSearch}`)
    
    const data=await response.json()
    console.log(data);
    const newData=await data.data
    console.log(newData);
    if(newData.length<1){
        rowOfSearchResult.innerHTML='data undefinde :( '
        rowOfSearchResult.style.color='white'
    }else{
        createCardsSearch(newData)

    }
}

let seasonsAnimeObject1
const alertPlaceholder1 = document.getElementById('liveAlertPlaceholder1')
function createCardsSearch(data){
    if(data.length>12){
        data=data.slice(0, 12)
    }
    data.forEach(object => {
        //--creat div col
        const colCardSearch=createElement1('div', ['col-3'])
        //--creat div card
        const cardSearch=createElement1('div', ['card', 'mt-3', 'text-bg-dark', 'text-center'])
        //--image
        const imageCard=createElement1('img', ['card-img'])
        imageCard.setAttribute('src', object.images.jpg.image_url)
        //--
        //--card image overly
        const imageOverlyCard=createElement1('div', ['card-img-overlay'])
        // h5 card title and tv
        const h5Cardtitle=createElement1('h5', ['card-title','mt-5'])
        h5Cardtitle.innerText=object.title_english
        const typeAndYear=createElement1('p', ['card-text', 'fw-lighter'])
        typeAndYear.innerText=`(${object.type}-${object.year})`
        //--card body
        const cardBodySearch=createElement1('div', ['cardBody'])
        //--parent of text hover
        const textHoverParent=createElement1('div', [])
        //--
        const genersSearch=createElement1('p', ['card-text', 'fw-lighter', 'm-0'])
        if(object.genres.length>2){
            genersSearch.innerHTML=`<small>${object.genres[0].name}-${object.genres[1].name}</small>`
        }else if(object.genres.length>=1){
            genersSearch.innerHTML=`<small>${object.genres[0].name}</small>`
        }
        const cardTitleHover=createElement1('p', ['card-title', 'fw-lighter', 'm-0'])
        cardTitleHover.innerText=object.title_english
        const scoreHover=createElement1('p', ['score', 'fw-lighter', 'm-0'])
        scoreHover.innerText=`score : ${object.score}`
        const statusHover=createElement1('p', ['status', 'fw-lighter', 'm-0'])
        statusHover.innerText=`status: ${object.status}`
        //--
        //--div input group
        const inputGroup=createElement1('div', ['input-group', 'text-center', 'ms-5'])
        const addToListBtn=createElement1('button', ['btn', 'btn-light','fw-lighter'])
        addToListBtn.innerText=`Add To List`
        addToListBtn.addEventListener('click', async()=>{
            console.log(object);
            alertPlaceholder1.innerHTML=''
            seasonsAnimeObject1={
                image:object.images.jpg.image_url,
                title:object.title,
                id:object.mal_id
            }
            try {
                const token= getDataStorage('user')
                console.log(token);
                if(token){
                    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${token}`)
                    const user=await res.json()
                    
                    console.log('user logged in');
                    console.log(seasonsAnimeObject1);
                    //range of call functions 
                    //--from check we have this anime in our list or not
                    let isWeHaveAnimeInOurList
                    
                    await isWeHave(user.id, seasonsAnimeObject1.id).then((response)=>{
                        console.log(response);
                        isWeHaveAnimeInOurList=response.isTrue
                        
                        
                    }).catch((error)=>{
                        console.log(error);
                    })
                    //-and if yes and user want to delete this 

                    //--we have function delete
        
                    //--now if we dont have this anime to our list
                    //--we want add to list watch by default 
                    await check(isWeHaveAnimeInOurList, seasonsAnimeObject1, user.id)
                    .then((data)=>{
                        //todo you should show successfully alert
                        appendAlert('Added to list successfuly', 'success',alertPlaceholder1)
                        console.log('Added successfully',);
                    }).catch((error)=>{
                        //todo you should show error in alert
                        appendAlert('There is a problem', 'warning', alertPlaceholder1)
                        console.log('There is a problem');
                    })
                    //--we cant change that status in list page :)
        
        
        
        
        
        
                    if(user.length<1){
                        console.log('hoho');
                        window.location.replace('/login/login.html')
                    }else{
                        //i dont have no idea :)
                    }
                }else{
                    const resultAlert=confirm('please login first')
                    if(resultAlert){
                        window.location.replace('/login/login.html')
                    }
                }
            } catch (error) {
                //todo you should show error
                appendAlert('There is a problem', 'warning', alertPlaceholder1)
                console.log('There is a problem');
                
            }
            //--object work correct
            
        })
        






        const watchBtn=createElement1('a', ['btn', 'btn-secondary', 'fw-lighter'])
        watchBtn.innerText='Watch'
        watchBtn.setAttribute('href', `${object.url}`)
        //--append buttons to input group div
        inputGroup.append(addToListBtn)
        inputGroup.append(watchBtn)
        //
        textHoverParent.append(genersSearch)
        textHoverParent.append(cardTitleHover)
        textHoverParent.append(scoreHover)
        textHoverParent.append(statusHover)
        textHoverParent.append(inputGroup)
        cardBodySearch.append(textHoverParent)
        imageOverlyCard.append(h5Cardtitle)
        imageOverlyCard.append(typeAndYear)
        imageOverlyCard.append(cardBodySearch)
        cardSearch.append(imageCard)
        cardSearch.append(imageOverlyCard)
        colCardSearch.append(cardSearch)
        rowOfSearchResult.append(colCardSearch)
    });

}
//

//start card recommend
let seasonsAnimeObject3
const alertPlaceholder3 = document.getElementById('liveAlertPlaceholder3')
//? start from here
//--select Element
const parentOfRecommend=selectedElement('.parentOfCardRecommend')
function recommendCards(data){
    data=data.slice(0,5)
    data.forEach((object)=>{
        const rowOfCards=createElement1('div', ['row', 'rowOfCards'])
        const container=createElement1('div', ['container'])
        const cardAnimateRecommend=createElement1('div', ['card', 'cardAnimateRecommend', 'mt-2'])
        const lines=createElement1('div', ['lines'])
        const imageParent=createElement1('div', ['imgBX'])
        const imageLink=createElement1('a', [])
        imageLink.setAttribute('href', object.entry[0].url)
        const imgTag=createElement1('img', [])
        imgTag.setAttribute('src', object.entry[0].images.jpg.large_image_url)
        imageLink.append(imgTag)
        imageParent.append(imageLink)
        const content=createElement1('div', ['content'])
        const horizontalText=createElement1('div', ['horizontal'])
        const recommendText=createElement1('div', ['card-text'])
        recommendText.innerText=object.content
        const button=createElement1('button', ['btn'])
        button.innerText='Add To List'
        button.addEventListener('click', async()=>{
            console.log(object);
            alertPlaceholder3.innerHTML=''
            seasonsAnimeObject3={
                image:object.entry[0].images.jpg.image_url,
                title:object.entry[0].title,
                id:object.entry[0].mal_id
            }
            try {
                const token= getDataStorage('user')
                console.log(token);
                if(token){
                    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${token}`)
                    const user=await res.json()
                    
                    console.log('user logged in');
                    console.log(seasonsAnimeObject3);
                    //range of call functions 
                    //--from check we have this anime in our list or not
                    let isWeHaveAnimeInOurList
                    
                    await isWeHave(user.id, seasonsAnimeObject3.id).then((response)=>{
                        console.log(response);
                        isWeHaveAnimeInOurList=response.isTrue
                        
                        
                    }).catch((error)=>{
                        console.log(error);
                    })
                    //-and if yes and user want to delete this 

                    //--we have function delete
        
                    //--now if we dont have this anime to our list
                    //--we want add to list watch by default 
                    await check(isWeHaveAnimeInOurList, seasonsAnimeObject3, user.id)
                    .then((data)=>{
                        //todo you should show successfully alert
                        appendAlert('Added to list successfuly', 'success', alertPlaceholder3)
                        console.log('Added successfully');
                    }).catch((error)=>{
                        //todo you should show error in alert
                        appendAlert('There is a problem', 'warning', alertPlaceholder3)
                        console.log('There is a problem');
                    })
                    //--we cant change that status in list page :)
        
        
        
        
        
        
                    if(user.length<1){
                        console.log('hoho');
                        window.location.replace('/login/login.html')
                    }else{
                        //i dont have no idea :)
                    }
                }else{
                    const resultAlert=confirm('please login first')
                    if(resultAlert){
                        window.location.replace('/login/login.html')
                    }
                }
            } catch (error) {
                //todo you should show error
                appendAlert('There is a problem', 'warning', alertPlaceholder3)
                console.log('There is a problem');
                
            }
            //--object work correct
            
        })

        horizontalText.append(recommendText)
        horizontalText.append(button)
        const verticalText=createElement1('div', ['vertical'])
        const cardTitle=createElement1('p', ['card-title'])
        cardTitle.innerText=object.entry[0].title
        const timeLeft=createElement1('p', ['time-left'])
        timeLeft.innerHTML=`<small>${calculateDate(object.date)}</small>`
        verticalText.append(cardTitle)
        verticalText.append(timeLeft)
        content.append(horizontalText)
        content.append(verticalText)
        cardAnimateRecommend.append(lines)
        cardAnimateRecommend.append(imageParent)
        cardAnimateRecommend.append(content)
        container.append(cardAnimateRecommend)
        rowOfCards.append(container)
        parentOfRecommend.append(rowOfCards)
    })
}
function calculateDate(userDate){
    const userDate1=userDate
    const timeUser=new Date(userDate1).toLocaleTimeString('en',
    { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
    const yearUser=new Date(userDate).getFullYear()
    const monthUser=new Date(userDate).getMonth()
    const dayUser=new Date(userDate).getDay()
    const newDate=new Date().toISOString()
    const timeNow=new Date(newDate).toLocaleTimeString('en',
    { timeStyle: 'short', hour12: false, timeZone: 'UTC' });
    const yearNow=new Date(newDate).getFullYear()
    const monthNow=new Date(newDate).getMonth()
    const dayNow=new Date(newDate).getDay()
   const hourLeft=Math.abs(parseInt(timeNow) - parseInt(timeUser))
   const dayLeft=parseInt(dayNow) - parseInt(dayUser)
   return `${dayLeft} day and ${hourLeft} hour ago`
}
async function fetchDataRecommend(){
    const res=await fetch('https://api.jikan.moe/v4/recommendations/anime')
    const data=await res.json()
    const newData=await data.data
    recommendCards(newData)
}
fetchDataRecommend()

const carouselInnerTopCharcter=selectedElement('.carousel-innerTop')
// const 
function charcter(data, element){
    const sliderNum=Math.round(data.length / 4)
    let index=0
    console.log(index);
    for(let i=0; i<sliderNum; i++){
        const carouselItem=createElement1('div', ['carousel-item'])
        const rowOfCards=createElement1('div', ['row'])
        
        for(let j=0; j<4; j++){
            if(index===0){
                carouselItem.classList.add('active')
            }
        //--creat div col
        const colCardSearch=createElement1('div', ['col-3'])
        //--creat div card
        const cardSearch=createElement1('div', ['card', 'mt-3', 'text-bg-dark', 'text-center'])
        //--image
        const imageCard=createElement1('img', ['card-img'])
        // console.log(data[index]);
        imageCard.setAttribute('src', data[index].images.jpg.image_url)
        
        //--
        //--card image overly
        const imageOverlyCard=createElement1('div', ['card-img-overlay', 'imageOfDescription'])
        imageOverlyCard.setAttribute('id', data[index].mal_id)
        // h5 card title and tv
        const h5Cardtitle=createElement1('h5', ['card-title','mt-5', 'characterTitle'])
        h5Cardtitle.innerText=data[index].name
        const typeAndYear=createElement1('p', ['card-text', 'fw-lighter', 'kanjiName'])
        typeAndYear.innerText=`(${data[index].name_kanji})`
        //--card body
        const cardBodySearch=createElement1('div', ['cardbody'])
        //--parent of text hover
        
        //--
        
        
        
   
        //--
        //--div input group
        
      
        imageOverlyCard.append(h5Cardtitle)
        imageOverlyCard.append(typeAndYear)
        imageOverlyCard.append(cardBodySearch)
        cardSearch.append(imageCard)
        cardSearch.append(imageOverlyCard)
        colCardSearch.append(cardSearch)
        rowOfCards.append(colCardSearch)
        index++
        }
        carouselItem.append(rowOfCards)
        element.append(carouselItem)
    }
}

async function fetchCharacterTop(){
    const res=await fetch(`https://api.jikan.moe/v4/top/characters`)
    const data=await res.json()
    const newData=await data.data
    charcter(newData,carouselInnerTopCharcter)
}
fetchCharacterTop()
const nameAnimeDescription=selectedElement('.cardTitleDescription')
const aboutAnimeDescription=selectedElement('.cardTextDescription')
const favAnimeDescription=selectedElement('.cardFotterDescription')
const buttonClose=selectedElement('.card-header .btn-close')
const cardOfDescription=selectedElement('.descriptionCharacter')
window.addEventListener('click', async(e)=>{
    if(e.target.classList.contains('imageOfDescription')){
        cardOfDescription.style.display='block'
        console.log(e.target.id);
        const res=await fetch(`https://api.jikan.moe/v4/characters/${e.target.id}`)
        const data=await res.json()
        const newData=await data.data
        nameAnimeDescription.innerText=newData.name
        aboutAnimeDescription.innerText=newData.about
        favAnimeDescription.innerText=`favorites : ${newData.favorites}`
    }
    
})
buttonClose.addEventListener('click', ()=>{
    cardOfDescription.style.display='none'
})


//search character
//select element
const buttonSearchCharacter=selectedElement('.buttonCharacterSearch')
const inputSearchCharacter=selectedElement('.inputCharacterSearch')
const carouselInnerSearchCharacter=selectedElement('.carousel-innerSearch')
const parentOfShowResultSearchCharacter=selectedElement('#searchForCharacters')
const resultFor=selectedElement('#searchForCharacters h6 span')
const closeButtonResultSearch=selectedElement('.closeButtonResultSearch')
const errorCharacterSearch=selectedElement('.messageError')
buttonSearchCharacter.addEventListener('click', ()=>{
    if(!inputSearchCharacter.value){
        alert('please write a character name')
    }else{
        carouselInnerSearchCharacter.innerHTML=''
        parentOfShowResultSearchCharacter.style.display='block'
        resultFor.innerText=inputSearchCharacter.value
        searchCharacter(inputSearchCharacter.value)
        inputSearchCharacter.value=''
    }
})

async function searchCharacter(nameCharacter){
    const res=await fetch(`https://api.jikan.moe/v4/characters?q=${nameCharacter}`)
    const data=await res.json()
    const newData=await data.data
    console.log(data);
    console.log(newData);
    if(newData.length<1){
        errorCharacterSearch.innerHTML='data undifinde :('
        errorCharacterSearch.style.color='white'
    }else{

        charcter(newData,carouselInnerSearchCharacter)
    }
}
closeButtonResultSearch.addEventListener('click', ()=>{
    parentOfShowResultSearchCharacter.style.display='none'
    carouselInnerSearchCharacter.innerHTML=''
})
const selectYear=selectedElement('.selectYear')
const inputSelect=selectedElement('.inputSelect')
const selectSeason=selectedElement('.selectSeason')
let regex=/^[a-zA-Z]+$/
const tabContentNow=selectedElement('#now')
const tabContentUserSearch=selectedElement('#userSearchSeason')
const linkUserSearch=selectedElement('.linkUserSearch')
let valueOfSearchYear=2024
let valueOfSeasonsSearch='winter'
selectYear.addEventListener('change', (e)=>{
    tabContentUserSearch.innerHTML=''
    console.log(e.target.value);
    if(e.target.value==='make me feel input'){
        inputSelect.classList.remove('hidden')
        inputSelect.addEventListener('change', ()=>{
            if(regex.test(inputSelect.value)||inputSelect.value.length<4){
                alert('invalid year')
            }else{
                tabContentUserSearch.innerHTML=''
                valueOfSearchYear=inputSelect.value
                linkUserSearch.innerText=`${valueOfSearchYear}/${valueOfSeasonsSearch}`
                seasonsUserSearch(valueOfSearchYear, valueOfSeasonsSearch)
            }
            console.log(inputSelect.value);
        }
        )
        
    }else{
        inputSelect.classList.add('hidden')
        console.log('haha');
                valueOfSearchYear=e.target.value
                linkUserSearch.innerText=`${valueOfSearchYear}/${valueOfSeasonsSearch}`
                seasonsUserSearch(valueOfSearchYear, valueOfSeasonsSearch)
    }
})

selectSeason.addEventListener('change', (e)=>{
    tabContentUserSearch.innerHTML=''
    valueOfSeasonsSearch=e.target.value
    linkUserSearch.innerText=`${valueOfSearchYear}/${valueOfSeasonsSearch}`
    seasonsUserSearch(valueOfSearchYear, valueOfSeasonsSearch)
})




let seasonsAnimeObject
const alertPlaceholder = document.getElementById('liveAlertPlaceholderrrr')
function seasonsCard(data, element){
    const row1=createElement1('div', ['row', 'mt-3', 'rowSeason'])
    const row2=createElement1('div', ['row', 'mt-3', 'rowSeason'])
    
    let rowTime=0
    let cardIndex=0
    data=data.data.slice(0,6)
    // console.log(data);
    data.forEach((object, index)=>{
        cardIndex++
        if(cardIndex>3){
            rowTime=1
            cardIndex=1
        }

        if(cardIndex<=3){
                const colOfCard=createElement1('div', ['col-4'])
                const card=createElement1('div', ['card', 'cardResize'])
                if(window.innerWidth>=1300){
                    card.setAttribute('style', "min-height: 780px;")
                }else if(window.innerWidth<=320){
                    card.setAttribute('style', "min-height: 340px;")
                }else{
                    card.setAttribute('style', "min-height: 480px;")
                }
                window.addEventListener('resize', ()=>{
                    if(window.innerWidth>=1300){
                        card.setAttribute('style', "min-height: 780px;")
                    }else if(window.innerWidth<=320){
                        card.setAttribute('style', "min-height: 340px;")
                    }else{
                        card.setAttribute('style', "min-height: 480px;")
                    }
                })
                const linkOfAnime=createElement1('a', [])
                linkOfAnime.setAttribute('href', object.url)
                const imageCard=createElement1('img', ['card-img-top'])
                imageCard.setAttribute('src', object.images.jpg.image_url)
                //--append image to link anime
                linkOfAnime.append(imageCard)
                //--
                const cardBodySeason=createElement1('div', ['card-body'])
                //--
                const genersOfSeason=createElement1('p', ['genersOfSeason'])
                if(object.genres.length>1){
                    genersOfSeason.innerText=`${object.genres[0].name}- ${object.genres[1].name}`
                }else{
                    genersOfSeason.innerText=`${object.genres[0].name}`
                }
                // console.log(object.genres[0].name);
                
                const cardTitleSeason=createElement1('p', ['card-title'])
                cardTitleSeason.innerText=object.title
                if(window.innerWidth<=320){
                    cardTitleSeason.setAttribute('style', 'font-size:smaller;')
                }else if(window.innerWidth<=900){
                    cardTitleSeason.setAttribute('style', 'font-size:medium;')
                }else{
                    cardTitleSeason.setAttribute('style', 'font-size:x-large;')
                }
                window.addEventListener('resize', ()=>{
                    if(window.innerWidth<=320){
                        cardTitleSeason.setAttribute('style', 'font-size:smaller;')
                    }else if(window.innerWidth<=900){
                        cardTitleSeason.setAttribute('style', 'font-size:medium;')
                    }else{
                        cardTitleSeason.setAttribute('style', 'font-size:x-large;')
                    }
                })
                const score=createElement1('p', ['score'])
                const inputGroupSeason=createElement1('div', ['input-group', 'inputGroupSeason'])
                const episodesButton=createElement1('button', ['btn', 'p-0', 'ps-2', 'pe-2', 'fw-lighter', 'disabled'])
                episodesButton.innerHTML=`${object.episodes} <br> Episodes`
                const addToListBtn=createElement1('button', ['btn', 'p-0', 'p-0', 'ps-2', 'pe-2', 'addToListSeason', 'fw-lighter'])
                addToListBtn.innerText='Add To List'
                
                //todo -----------------------------------------
                //todo ---add event listener for Add to list button
                addToListBtn.addEventListener('click', async()=>{
                    alertPlaceholder.innerHTML=''
                    seasonsAnimeObject={
                        image:object.images.jpg.image_url,
                        title:object.title,
                        id:object.mal_id
                    }
                    try {
                        const token= getDataStorage('user')
                        console.log(token);
                        if(token){
                            const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${token}`)
                            const user=await res.json()
                            
                            console.log('user logged in');
                            console.log(seasonsAnimeObject);
                            //range of call functions 
                            //--from check we have this anime in our list or not
                            let isWeHaveAnimeInOurList
                            
                            await isWeHave(user.id, seasonsAnimeObject.id).then((response)=>{
                                console.log(response);
                                isWeHaveAnimeInOurList=response.isTrue
                                
                                
                            }).catch((error)=>{
                                console.log(error);
                            })
                            //-and if yes and user want to delete this 

                            //--we have function delete
                
                            //--now if we dont have this anime to our list
                            //--we want add to list watch by default 
                            await check(isWeHaveAnimeInOurList, seasonsAnimeObject, user.id)
                            .then((data)=>{
                                //todo you should show successfully alert
                                appendAlert('Added to list successfuly', 'success', alertPlaceholder)
                                console.log('Added successfully');
                            }).catch((error)=>{
                                //todo you should show error in alert
                                appendAlert('There is a problem', 'warning', alertPlaceholder)
                                console.log('There is a problem');
                            })
                            //--we cant change that status in list page :)
                
                
                
                
                
                
                            if(user.length<1){
                                console.log('hoho');
                                window.location.replace('/login/login.html')
                            }else{
                                //i dont have no idea :)
                            }
                        }else{
                            const resultAlert=confirm('please login first')
                            if(resultAlert){
                                window.location.replace('/login/login.html')
                            }
                        }
                    } catch (error) {
                        //todo you should show error
                        appendAlert('There is a problem', 'warning')
                        console.log('There is a problem');
                        
                    }
                    //--object work correct
                    
                })
                //--append button to input group
                inputGroupSeason.append(episodesButton)
                inputGroupSeason.append(addToListBtn)
                //
                //--append title geners and score and buttons to card body
                cardBodySeason.append(genersOfSeason)
                cardBodySeason.append(cardTitleSeason)
                cardBodySeason.append(score)
                cardBodySeason.append(inputGroupSeason)
                //--append link and image anime and card body to card
                card.append(linkOfAnime)
                card.append(cardBodySeason)
                //--append card to col
                colOfCard.append(card)
            if(rowTime===0){
                row1.append(colOfCard)
            }else{
                row2.append(colOfCard)
            }
            
        }else{

        }
        if(index===5){
            element.append(row1)
            element.append(row2)
        }
    })
    
}
async function getSeasonNow(){
    try {
        const res=await fetch('https://api.jikan.moe/v4/seasons/now')
        const data=await res.json()
        seasonsCard(data, tabContentNow)
    } catch (error) {
        console.log(error);
    }
}
//! uncomment this
getSeasonNow()
async function seasonUserDefaultSearch(){
    try {
        const res=await fetch(`https://api.jikan.moe/v4/seasons/${2024}/${"winter"}`)
        const data=await res.json()
        seasonsCard(data,tabContentUserSearch)
    } catch (error) {
        console.log(error);
    }
}
//! uncomment this
seasonUserDefaultSearch()
async function seasonsUserSearch(valueOfSearchYear, valueOfSeasonsSearch){
    try {
        const res=await fetch(`https://api.jikan.moe/v4/seasons/${valueOfSearchYear}/${valueOfSeasonsSearch}`)
        const data=await res.json()
        // console.log(`this is data in try catch ${data.data}`);
        const newData=await data.data
        if(newData.length<1){
            tabContentUserSearch.innerHTML='data undefind :( '
            tabContentUserSearch.style.color='white'
        }else{
            seasonsCard(data, tabContentUserSearch)

        }
    } catch (error) {
        console.log(error);
    }
}


//?alert function

const appendAlert = (message, type, element) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('')

    element.append(wrapper)
     }
     
//!------------functions for add to list button-----------------------
async function isWeHave(userId, animeId){
    const getUserRes=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
    const getUserData=await getUserRes.json()
    console.log(getUserData);
    let isWeHave
    let typeListName
    getUserData.watch.forEach((object)=>{
            //!you shoud change this section to true like malid
            if(object.id===animeId){
                isWeHave=true
                typeListName='watch'
                
            }
        })
    getUserData.planToWatch.forEach((object)=>{
        //!you shoud change this section to true like malid
        if(object.id===animeId){
            isWeHad=true
            typeListName='planToWatch'
            
        }
    })
    getUserData.compelted.forEach((object)=>{
        //!you shoud change this section to true like malid
        if(object.id===animeId){
            isWeHave=true
            typeListName='compelted'
            
        }
    })
    
    let isTrue
    if(isWeHave && typeListName){
        isTrue=true
    }else{
        isTrue=false
    }
    return {isTrue, isWeHave, typeListName}
}
//!--func2 if we have in list ?=you want delet or no--if we dont have in list?=add it to list watch
async function check(isTrue, object, userId){
    if(isTrue){
        // console.log(typeOfList);
        alert('already have this anime in your list')
        throw error

    }else{
        //--add anime to anime list
        addToListWatch(object, userId)
    }
}

//-----
async function addToListWatch(object, userId){
    try {
    const res=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
    const data=await res.json()
    const newData=data.watch
    newData.push(object)
    const res1=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`, {
        method:'PUT',
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({watch:newData})
    })
    const data1=await res1.json()
    console.log(data1);
    } catch (error) {
        console.log(error);
    }
    
}
