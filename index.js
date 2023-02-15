const thumbnailImg = document.querySelectorAll('.thumbnail-img')
const mainImg = document.getElementById('main-img')
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')
const total = document.getElementById('total')
const trolleyNav = document.getElementById('trolley-nav')
const currentPrice = document.getElementById('current-price').innerHTML
const addBtn = document.getElementById('add-btn')
const trolleyBox = document.getElementById('trolley-box')
const numberItems = document.getElementById('number-items')
const lightBox = document.createElement('div')
const slides = document.getElementsByClassName('slide')
const hamburger = document.getElementById('hamburger')
const sideMenu = document.getElementById('side-menu')
const x = document.getElementById('x')
const arrowPrev = document.getElementById('arrow-prev')
const arrowNext = document.getElementById('arrow-next')


let totalValue = parseInt(total.innerHTML)
let addedToCart = false
let trolleyOpen = false
let slideIndex = 1

// Switch the large product image by clicking on the small thumbnail images & give selected thumbnail img a border and greyed out effect

// removes clicked class from all thumbnail imgs
function clearClick(){
    thumbnailImg.forEach(img => {
        img.classList.remove('clicked')
    })
}

// adds class of clicked to the thumbnail (orange border and opacity)
thumbnailImg.forEach(img => {  
    img.addEventListener('click', ()=> {
        clearClick()
        let imgNum = img.dataset.ref
        mainImg.src = `./images/image-product-${imgNum}.jpg`
        img.classList.add('clicked')
    })
    
})

//Renders lightbox to screen
mainImg.addEventListener('click', lightBoxOn)

//the html code to render, gets created above and then appended to orginal body
function lightBoxOn(){
    document.body.appendChild(lightBox)
    
    lightBox.innerHTML = `
        <div class="img-box-light">
            <div class="lightbox">
                <img class="close-icon" src="./images/icon-close-white.svg" onclick="lightBoxOff()"/>
                <img class="arrow-icon prev" src="./images/icon-previous.svg" onClick="changeSlide(-1)"/>

                <div class="slide">
                    <img class="main-img main-light" src="./images/image-product-1.jpg" alt="pair of sneakers"/>
                </div>
                <div class="slide">
                    <img class="main-img main-light" src="./images/image-product-2.jpg" alt="pair of sneakers"/>
                </div>
                <div class="slide">
                    <img class="main-img main-light" src="./images/image-product-3.jpg" alt="pair of sneakers"/>
                </div>
                <div class="slide">
                    <img class="main-img main-light" src="./images/image-product-4.jpg" alt="pair of sneakers"/>
                </div>

                <img class="arrow-icon next" src="./images/icon-next.svg" onClick="changeSlide(1)"/>
                
                <div class="thumbnails light">
                        <img class="thumbnail-img modal-thumb" src="./images/image-product-1.jpg" />
                        <img class="thumbnail-img modal-thumb" src="./images/image-product-2.jpg" />
                        <img class="thumbnail-img modal-thumb" src="./images/image-product-3.jpg" />
                        <img class="thumbnail-img modal-thumb" src="./images/image-product-4.jpg" />
                </div>
            </div>
        </div>
    `
    //Will render the image selected on main screen to show as starting image in lightbox
    slides[slideIndex - 1].style.display = 'block'
}

//Fetches all thumbnail images and adds clicked class to them so shows which image is apprearing as main image
//Also calculates which image should show using the next and previous arrows
function showSlide(n){
    const modalThumb = document.querySelectorAll('.modal-thumb')

    modalThumb.forEach(img => {
        img.classList.remove('clicked')
    })
    

    if (n > slides.length){
        slideIndex = 1
    }

    if (n < 1){
        slideIndex = slides.length
    }

    for (let i = 0; i < slides.length; i++){
        slides[i].style.display = "none"
    }

    slides[slideIndex - 1].style.display = 'block'


    modalThumb[slideIndex - 1].classList.add('clicked')

}

//uses arrow keys to see if next (+1) or prev(-1)and then sets as arguments for the showslide function
function changeSlide(input){
    showSlide(slideIndex += input)
}

//closes the lightbox
function lightBoxOff(){
    document.body.removeChild(lightBox)
}

//Adds items on main page and update total rendered to screen
plus.addEventListener('click', ()=> {
    totalValue += 1
    total.innerHTML = totalValue
})

//minusses items on main page and update total rendered to screen
minus.addEventListener('click', ()=> {  
    if(totalValue > 0){
        totalValue -= 1
        total.innerHTML = totalValue
    } 
})

//open trolley box on icon click
addBtn.addEventListener('click', ()=> {
    addToCart()
    showNums()
})

//Adds the items to the cart and rerenders the trolley html to show the order
function addToCart(){
    addedToCart = true
    if (trolleyOpen){
        renderTrolleyHtml()
    }
}

//if cart more then 0 will display amount in small circle above trolley icon on nav bar
function showNums(){
    if(totalValue){
        numberItems.classList.remove('none')
        let nums = ''
        nums = `
            <h3 class="nums">${totalValue}</h3>
        `
        numberItems.innerHTML = nums
    }else{
        numberItems.classList.add('none')
    }
}

//will listen for click on shopping trolley and use function to open on screen
trolleyNav.addEventListener('click', openTrolley)

//changes display in css to block so troleey box shows on screen and renders the correct html depending on if anything added to cart
function openTrolley(){
    trolleyBox.classList.toggle('trolley-box-display')
    trolleyOpen = true;
    renderTrolleyHtml()
}

//Will delete all orders in trolley and set value to nil
function deleteOrder(){
    total.innerText = 0
    totalValue = 0
    addedToCart = false
    renderTrolleyHtml()
    showNums()
}

//The Html to render to the screen for the trolley-box to show what is ordered and amount owed
function renderTrolleyHtml(){
    let html = ""
    if(!addedToCart || totalValue === 0){
        html=`
            <div class="cart-top">
                <h5 class="cart">Cart</h5>
            </div>
            <p class="empty">Your cart is empty</p>
        `
    } else if (addedToCart){
        html = `
            <div class="cart-top">
                <h5 class="cart">Cart</h5>
            </div>
            <div class="item-line">
                <img class="trolly-img" src="./images/image-product-1-thumbnail.jpg" />
                <div class="ordered">
                    <p class="order-info">Fall Limited Edition Sneakers</p>
                    <p class="order-info">$ ${currentPrice} x ${totalValue}<span class="total-bold">  $</span><span class="total-bold">${(currentPrice * totalValue).toFixed(2)}</span></p>
                </div>
                <img class="delete-icon" onclick="deleteOrder()" src="./images/icon-delete.svg" />
            </div>
            <button class="checkout">Checkout</button>
    `
    }
    trolleyBox.innerHTML = html
}

hamburger.addEventListener('click', openSideMenu)
x.addEventListener('click', closeSideMenu)

function openSideMenu(){
    sideMenu.style.display = "block"
    hamburger.style.display ="none"
}

function closeSideMenu(){
    sideMenu.style.display = "none"
    hamburger.style.display = "block"
}


