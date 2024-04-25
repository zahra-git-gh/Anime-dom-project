import{createElement1, selectedElement} from "./domUtils.js";
import{setData ,getDataStorage ,removeData, setSearch} from "./storage.js"


//!start slider for geners
//selected element
// const carouselInner=selectedElement('.carousel-inner')
const parentOfSlider=selectedElement('.parentOfCarousel')
//------
//*fetch data

//make carouse item 


//--
//make carousel inner
const carouselInner=createElement1('div', ['carousel-inner'])
//--
//--make carousel
const carousel=createElement1('div', ['carousel', 'slide'])
carousel.setAttribute('id', 'carouselExampleAutoplaying')
carousel.setAttribute('data-bs-ride', 'carousel')
//--
//--buttons
const prevBtn=createElement1('button', ['carousel-control-prev'])
prevBtn.setAttribute('type', 'button')
prevBtn.setAttribute('data-bs-target', '#carouselExampleAutoplaying')
prevBtn.setAttribute('data-bs-slide', 'prev')
//spans in button
const iconSpanPrev=createElement1('span', ['carousel-control-prev-icon'])
iconSpanPrev.setAttribute('aria-hidden', 'true')
const hiddenSpan=createElement1('span', ['visually-hidden'])
hiddenSpan.append('Previous')
//--append spans prev to button prev
prevBtn.append(iconSpanPrev)
prevBtn.append(hiddenSpan)
//--
const nextBtn=createElement1('button', ['carousel-control-next'])
nextBtn.setAttribute('type', 'button')
nextBtn.setAttribute('data-bs-target', '#carouselExampleAutoplaying')
nextBtn.setAttribute('data-bs-slide', 'next')
//--spans in button
const iconSpanNext=createElement1('span', ['carousel-control-next-icon'])
iconSpanNext.setAttribute('aria-hidden', 'true')
const hiddenSpanNext=createElement1('span', ['visually-hidden'])
hiddenSpanNext.append('Next')
//--append span next to button next
nextBtn.append(iconSpanNext)
nextBtn.append(hiddenSpanNext)
//--
    let index=0
    function makeSlider(){
        const numberOfForloop=Math.floor(data1.data.length/6)
        console.log(data1.data);
        console.log(numberOfForloop);
    for(let i=0; i<numberOfForloop; i++){
        console.log(i);
        //make carousel item div main parent of our card
        const carouselItem=createElement1('div' ,['carousel-item'])
        if(index===0){
            carouselItem.classList.add('active')
        }
        //--
        //--make section row
        const rowSection=createElement1('section', ["row"])
        //--
        for(let j=0; j<6; j++){
            //--make section col 
            const colSection=createElement1('section',['col-lg-2', 'col-md-2'])
            //---
            //--make card parent
            const divCard=createElement1('div', ['card', 'text-center', 'mb-3'])
            //--
            //--make card body
            const divCardBody=createElement1('div', ['card-body'])
            //--
            //--make title of cards
            const h5Title=createElement1('h5', ['card-title'])
            console.log(data1.data[index]);
            h5Title.innerText=data1.data[index].name
            // console.log(data1[index].name);
            //--
            //--make card text
            const textCard=createElement1('p', ["card-text"])
            textCard.innerText=`count: ${data1.data[index].count}`
            //--
            //--make card link
            const linkCard=createElement1('a', [])
            linkCard.setAttribute('href', `${data1.data[index].url}`)
            linkCard.innerText='see animes'
            //--
            //--append title and text and link to card body
            divCardBody.append(h5Title)
            divCardBody.append(textCard)
            divCardBody.append(linkCard)
            //--
            //--append card body to card
            divCard.append(divCardBody)
            //--
            //--append card to col section
            colSection.append(divCard)
            //--
            //--append col section to row section
            rowSection.append(colSection)
            //--
            //++ index
            index++
        }
        //--append row section to arousel item div
        carouselItem.append(rowSection)
        //--
        carouselInner.append(carouselItem)
    }
    carousel.append(carouselInner)
    carousel.append(prevBtn)
    carousel.append(nextBtn)
    parentOfSlider.append(carousel) 
    }
async function fetchData(){
    const response=await fetch(`https://api.jikan.moe/v4/genres/anime`,{
        params:{
          filter:'genres'
        },
      headers:{
        "content-type": "application/json"
      }
    })
    const data1= await response.json()
    return data1
}
let data1
async function callFuncs(){
     data1=await fetchData()
     await makeSlider()
}
//todo click this button for get data and see in your home page :)
callFuncs()
//! end of slide for geners



//? start of tranding slider for animes
let trandingSlider= new Swiper('.tranding-slider', {
    effect:'coverflow',
    grabCursor:true,
    centeredSlides:true,
    loop:true,
    slidesPerView:'auto',
    coverflowEffect:{
        rotate:0,
        stretch:0,
        depth: 100,
        modifier:2.5,
    },
    pagination:{
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation:{
        nextEl:'.swiper-button-next',
        prevEl:'.swiper-button-prev'
    }
})
//--slider anime style finished
//?make card of anime and add to html
//!select elements
const swiperWrapper=selectedElement('.swiper-wrapper')
//!--

let data2

function makeCardTrandAnime(){
    data2.data.forEach((object)=>{
        //--make swiper slide
        const swiperSlide=createElement1('div', ['swiper-slide', 'tranding-slide'])
        //--
        //--make div parent slide image
        const swiperSlideImage=createElement1('div', ['tranding-slide-img'])
        //--
        //--make image tag
        const imageTranding=createElement1('img', [])
        imageTranding.setAttribute('src', `${object.attributes.posterImage.small}`)
        imageTranding.setAttribute('data-bs-toggle', 'modal')
        imageTranding.setAttribute('data-bs-target', `#modal-${object.id}`)
        //--append image to parent image div
        swiperSlideImage.append(imageTranding)
        //--
        //--make tranding slide content
        const trandingSlideContent=createElement1('div', ['tranding-slide-content'])
        //---
        //--make tranding slide content bottom div
        const trandingSlideContentBottom=createElement1('div', ['tranding-slide-content-bottom'])
        //--
        //--make title of anime h6
        const titleAnimeH6=createElement1('h6', ['anime-name'])
        titleAnimeH6.innerText=object.attributes.slug    
        //--
        //--make button add to list
        // const addToListButton=createElement1('button', ['btn', 'addToList-tranding'])    
        // addToListButton.innerText='Add to list'
        
        //--
        //--append button and title to content bottom div
        trandingSlideContentBottom.append(titleAnimeH6)
        // trandingSlideContentBottom.append(addToListButton)
        //--
        //--make modal div parent
        const modalDivParent=createElement1('div', ['modal', 'fade', 'allModalTrand'])
        modalDivParent.setAttribute('id', `modal-${object.id}`)
        //--
        //--make scrollabel div modal 
        const scrollablelDivModal=createElement1('div', ['modal-dialog', 'modal-dialog-scrollable'])
        //--
        //--make modal content div
        const contentModal=createElement1('div', ['modal-content', 'summery-tranding'])
        //--
        //--make modal headr div
        const modalHeader=createElement1('div', ['modal-haeder'])
        //--
        //--make close button modal header
        const closeButonModalHeader=createElement1('button', ['btn-close'])
        closeButonModalHeader.setAttribute('data-bs-dismiss', 'modal')
        //---
        //--make modal header anime name
        const modalHeaderAnimeName=createElement1('h6', ['text-center',  'fs-6', 'fw-lighter'])
        modalHeaderAnimeName.innerText=object.attributes.slug  
        //--
        //--append button and anime name to modal header
        modalHeader.append(closeButonModalHeader)
        modalHeader.append(modalHeaderAnimeName)
        //--
        //--make modal body div
        const modalBody=createElement1('div', ['modal-body'])
        //--
        //--make p tag age rating
        const ageRating=createElement1('p', ['ageRating', 'fw-lighter'])
        ageRating.innerText=`age guid :${object.attributes.ageRatingGuide}`
        //--
        //--make p tag rating rank
        const ratingRank=createElement1('p', ['ratingRank', 'fw-lighter'])
        ratingRank.innerText=`rating rank : ${object.attributes.ratingRank}`
        //---
        //--make p tag status
        const status=createElement1('p', ['status','fw-lighter'])
        status.innerText=`status : ${object.attributes.status}`
        //--
        //--make p tag of episodes 
        const episodes=createElement1('p', ['bg-light', 'text-center', 'm-auto', 'p-1', 'fw-lighter'])
        episodes.innerText=`${object.attributes.episodeCount} Episodes`
        //--
        //--make link to watch anime
        const linkWatchAnime=createElement1('a', ['btn', 'text-center', 'm-auto', 'fw-lighter', 'p-1', 'w-100', 'buttonWatch'])
        linkWatchAnime.innerText='Watch Anime'
        linkWatchAnime.setAttribute('href',`https://kitsu.io${object.links.self}`)
        //---
        //--append p tags and link to modal body
        modalBody.append(ageRating)
        modalBody.append(ratingRank)
        modalBody.append(status)
        modalBody.append(episodes)
        modalBody.append(linkWatchAnime)
        //--
        //--append modal header and modal body to modal content
        contentModal.append(modalHeader)
        contentModal.append(modalBody)
        //---append modal content to moda dialoge
        scrollablelDivModal.append(contentModal)
        //--
        //--append modal dialoge to modal parent
        modalDivParent.append(scrollablelDivModal)
        //-- append modal bottom and modal to tranding slide content
        trandingSlideContent.append(trandingSlideContentBottom)
        trandingSlideContent.append(modalDivParent)
        //--
        //---
        swiperSlide.append(swiperSlideImage)
        swiperSlide.append(trandingSlideContent)
        //--and end
        swiperWrapper.append(swiperSlide)
    })
}
async function fetchData1(){
    const response=await fetch("https://kitsu.io/api/edge/trending/anime")
    const data=response.json()
    return data
}
async function getDataForTrandingSlider(){
    data2=await fetchData1()
    console.log(data2.data);
    await makeCardTrandAnime()
}
getDataForTrandingSlider()
//!end of slider tranding Anime

//?start qout character section
//selected elements
const qoutBtn=selectedElement('.qoutBtn')
const qoutInput=selectedElement('.inputSearchQout')
const characterNameTitle=selectedElement('.cardTitleQout')
const qoutText=selectedElement('.cardTextQout')
const nameAnime=selectedElement('.cardTextSmallQout')
//--
qoutBtn.addEventListener('click', ()=>{
    let characterName=qoutInput.value
    if(characterName){
        fetch(`https://animechan.xyz/api/random/character?name=${characterName}`)
        .then((response) => response.json())
        .then((quote) =>{ 
          if(quote.character){
          console.log(quote);
          characterNameTitle.innerText=quote.character
          qoutText.innerText=quote.quote
          nameAnime.innerText=quote.anime
          }else{
              console.log(quote);
              qoutText.innerText='No related quotes found! try another character🤍'
          }
          
          });
          qoutInput.value=''
    }else{
        alert('please write a character name')
    }

})
//--responsive chracter qout section
//--select elements
const parentInputQoute=selectedElement('.parentInputQout')
const inputGroup=selectedElement('.parentInputQout .mainInput')
const smallInput=selectedElement('.smallInput')
const smallInputSearch=selectedElement('.smallInput input')
const smallInputButtonSearch=selectedElement('.buttonSearchQoutSm')
//---
smallInputButtonSearch.addEventListener('click', ()=>{
    let characterName2=smallInputSearch.value
    if(characterName2){
        fetch(`https://animechan.xyz/api/random/character?name=${characterName2}`)
        .then((response) => response.json())
        .then((quote) =>{ 
          if(quote.character){
          console.log(quote);
          characterNameTitle.innerText=quote.character
          qoutText.innerText=quote.quote
          nameAnime.innerText=quote.anime
          }else{
              console.log(quote);
              characterNameTitle.innerText=''
              nameAnime.innerText=quote.anime=''
              qoutText.innerText='No related quotes found! try another character🤍'
          }
          
          });
          smallInputSearch.value=''
    }else{
        alert('please write a character name')
    }

})
if(window.innerWidth<=320){
    inputGroup.style.display='none'
    smallInput.style.display='flex'
}else{
    smallInput.style.display='none'
    inputGroup.style.display='flex'
}

window.addEventListener('resize',()=>{
    if(window.innerWidth<=320){
        smallInput.style.display='flex'
        inputGroup.style.display='none'
    }else{
        smallInput.style.display='none'
        inputGroup.style.display='flex'
    }
})




//?start card review

const parentOfCardReview=selectedElement('.parentOfCardsReview')
let data3
async function fetchData3(){
    const response=await fetch(`https://api.jikan.moe/v4/reviews/anime`)
    const data=await response.json()
    data3=await data.data.slice(3, 7)
    console.log(data3);
    await reviewCards()
    //--responsiv review cards 
//--select elements

const username=document.querySelectorAll(".nameUser")
const replyButton=document.querySelectorAll('.reply')
const ShareButton=document.querySelectorAll('.share')
const imageReview=document.querySelectorAll('.parentOfCardsReview img')
console.log(username);
if(window.innerWidth<=320){
    username.forEach((user)=>user.classList.remove('ms-5'))
    replyButton.forEach((button)=>button.classList.remove('ms-5'))
    replyButton.forEach((button)=>button.innerHTML='<span><i class="fa-solid fa-reply"></i></span>Reply')
    ShareButton.forEach((button)=>button.innerHTML='<i class="fa-solid fa-share-from-square"></i></span>Share')
}else{
    username.forEach((user)=>user.classList.add('ms-5'))
    replyButton.forEach((button)=>button.classList.add('ms-5'))
    replyButton.forEach((button)=>button.innerHTML='<span><i class="fa-solid fa-reply"></i></span>Reply to this review')
    ShareButton.forEach((button)=>button.innerHTML='<i class="fa-solid fa-share-from-square"></i></span>Share this review')
}

window.addEventListener('resize',()=>{
    if(window.innerWidth<=320){
    username.forEach((user)=>user.classList.remove('ms-5'))
    replyButton.forEach((button)=>button.classList.remove('ms-5'))
    replyButton.forEach((button)=>button.innerHTML='<span><i class="fa-solid fa-reply"></i></span>Reply')
    ShareButton.forEach((button)=>button.innerHTML='<i class="fa-solid fa-share-from-square"></i></span>Share')
    }else{
        username.forEach((user)=>user.classList.add('ms-5'))
        replyButton.forEach((button)=>button.classList.add('ms-5'))
        replyButton.forEach((button)=>button.innerHTML='<span><i class="fa-solid fa-reply"></i></span>Reply to this review')
        ShareButton.forEach((button)=>button.innerHTML='<i class="fa-solid fa-share-from-square"></i></span>Share this review')
    }
})
//----
}
fetchData3()
function reviewCards(){
    data3.forEach((object)=>{
        //--padding review card
        const paddingOfReviewCards=createElement1('div', ['paddingCardReview'])
        //--
        //--review card
        const reviewCard=createElement1('div', ['card', 'mb-3'])
        reviewCard.setAttribute('style', 'max-width: 700px; height: 190px;')
        //--
        //--row of review card
        const row=createElement1('div', ['row', 'g-0'])
        //--- 
        //--col for image
        const colOfImage=createElement1('div', ['col-md-2', 'col-5'])
        //--image
        const imageOfreviewCard=createElement1('img', ['img-fluid', 'rounded-start', 'mt-2'])
        imageOfreviewCard.setAttribute('src', `${object.entry.images.jpg.image_url}`)
        //--end of image
        //--append image to col image
        colOfImage.append(imageOfreviewCard)
        //--
        //--end of col image
        //--col of card body and text
        const colOfCardBody=createElement1('div', ['col-md-8', 'col-7'])
        //--
        //--card body
        const cardBodyReview=createElement1('div', ['card-body'])
        //--
        //--card header review
        const cardHeaderReview=createElement1('div', ['card-header', 'p-0', 'm-0', 'd-flex', 'justify-content-between', 'align-items-center'])
        // p tags of name user and date
        const nameUserP=createElement1('p', ['p-0', 'm-0', 'ms-5', 'nameUser'])
        nameUserP.innerText=`by ${object.user.username}`
        //--
        //--p tag of date review
        const dateReview=createElement1('div', ['p-0', 'm-0'])
        dateReview.innerText=calculateDate(object.date)
        //--
        //--append p tags to card header
        cardHeaderReview.append(nameUserP)
        cardHeaderReview.append(dateReview)
        //--
        //--h5 card title
        const cardTitleReview=createElement1('h5', ['card-title', 'text-start', 'mt-2'])
        cardTitleReview.innerText=object.entry.title
        if(window.innerWidth<=320){
            cardTitleReview.setAttribute('style', 'font-size: smaller;')
        }else{}
        window.addEventListener('resize', ()=>{
            if(window.innerWidth<=320){
                cardTitleReview.setAttribute('style', 'font-size: smaller;')
            }else{}
        })
        
        //--
        //--const text of review
        const textReview=createElement1('p', ['card-text', 'text-start'])
        textReview.innerText=`${object.review.slice(1, 230)} ...`
        //--
        //--append card header and text to card body
        cardBodyReview.append(cardHeaderReview)
        cardBodyReview.append(cardTitleReview)
        cardBodyReview.append(textReview)
        //--
        //--card footer
        const footerCardReview=createElement1('div', ['card-footer', 'd-flex', 'justify-content-between', 'align-items-center', 'm-0', 'mb-2'])
        //--button reply
        const replyBtn=createElement1('button', ['btn', 'btn-sm', 'm-0', 'p-0', 'ps-1', 'pe-1', 'align-self-center', 'fw-lighter', 'ms-5', 'reply', 'disabled'])
        replyBtn.innerHTML='<span><i class="fa-solid fa-reply"></i></span>Reply to this review'
        //--button share
        const shareBtn=createElement1('button', ['btn', 'btn-sm', 'm-0', 'p-0', 'ps-1', 'pe-1', 'fw-lighter', 'share', 'disabled'])
        shareBtn.innerHTML='<span><i class="fa-solid fa-share-from-square"></i></span>Share this review'
        //--
        //--append buttons to card footer 
        footerCardReview.append(replyBtn)
        footerCardReview.append(shareBtn)
        //--
        //--appends together
        colOfCardBody.append(cardBodyReview)
        colOfCardBody.append(footerCardReview)
        row.append(colOfImage)
        row.append(colOfCardBody)
        reviewCard.append(row)
        paddingOfReviewCards.append(reviewCard)
        parentOfCardReview.append(paddingOfReviewCards)
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

//------------------end of reviews--------------

//? start seasons

//*select elements
const airingNow=selectedElement('#now')
console.log(airingNow);
const spring=selectedElement('#spring')
const summer=selectedElement('#summer')
const fall=selectedElement('#fall')
const winter=selectedElement('#winter')
//---


async function getData(url){
    const res=await fetch(url)
    const data=(await res).json()
    return data
}
async function getDataNow(){
    const data=await getData('https://api.jikan.moe/v4/seasons/now')
    seasonsCard(data, airingNow)
}

async function getDataSummer(){
    const data=await getData(`https://api.jikan.moe/v4/seasons/${2024}/${"summer"}`)
    seasonsCard(data, summer)
}
async function getDataFall(){
    const data=await getData(`https://api.jikan.moe/v4/seasons/${2024}/${"fall"}`)
    seasonsCard(data, fall)
}
async function getDataSpring(){
    const data=await getData(`https://api.jikan.moe/v4/seasons/${2024}/${"spring"}`)
    seasonsCard(data, spring)
}
async function getDataWinter(){
    const data=await getData(`https://api.jikan.moe/v4/seasons/${2024}/${"winter"}`)
    seasonsCard(data, winter)
}
setTimeout(()=>{
getDataNow()
},2000)
setTimeout(()=>{
    getDataSpring()
    },4000)
setTimeout(() => {
    getDataFall()
}, 6000);
setTimeout(()=>{
    getDataWinter()
}, 8000)
setTimeout(()=>{
    getDataSummer()
}, 10000)
let seasonsAnimeObject
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
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
                                appendAlert('Added to list successfuly', 'success')
                                console.log('Added successfully');
                            }).catch((error)=>{
                                //todo you should show error in alert
                                appendAlert('There is a problem', 'warning')
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




//?alert function

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
//!------------functions for add to list button-----------------------
async function isWeHave(userId, animeId){
    const getUserRes=await fetch(`https://65c92f3aa4fbc162e112b19c.mockapi.io/users/${userId}`)
    const getUserData=await getUserRes.json()
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
            isWeHave=true
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

//------------------------------------------------------------------------------------
const homePageSearch=selectedElement('.buttonSearch')
const inputSearchHome=selectedElement('.inputSearchHome')
homePageSearch.addEventListener('click', async(e)=>{
    if(!inputSearchHome.value)alert('search anime name')
    else{
        e.preventDefault()
        console.log(inputSearchHome.value);
        setSearch(inputSearchHome.value)
        window.location.replace('/Anime/anime.html')
    }
})













