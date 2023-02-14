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
const body = document.querySelector('body')
//const main = document.querySelector('main')
//const footer = document.querySelector('footer')
const infoDetails = document.querySelector('.info-details')

let totalValue = parseInt(total.innerHTML)
let addedToCart = false;
let trolleyOpen = false;

// Switch the large product image by clicking on the small thumbnail images & give selected img a border and greyed out effect

function clearClick(){
    thumbnailImg.forEach(img => {
        img.classList.remove('clicked')
    })
}

thumbnailImg.forEach(img => {  
    img.addEventListener('click', ()=> {
        clearClick()
        let imgNum = img.dataset.ref
        mainImg.src = `./images/image-product-${imgNum}.jpg`
        img.classList.add('clicked')
    })
    
})

//Add lightbox for images
mainImg.addEventListener('click', lightBoxOn)

function lightBoxOn(){
    //nav.classList.add('blackout')
    //main.classList.add('blackout')
    body.classList.add('blackout')
    infoDetails.classList.add('blackout')
    const lightBox = document.createElement('div')
    document.body.appendChild(lightBox)
    lightBox.innerHTML = `
        <div class="img-box-light">
            <div class="lightbox">
                <img class="close-icon" src="./images/icon-close.svg" />
                <img class="arrow-icon prev" src="./images/icon-previous.svg" />
                <img id="main-img" class="main-img main-light" src="./images/image-product-1.jpg" alt="pair of sneakers"/>
                <img class="arrow-icon next" src="./images/icon-next.svg" />
                <div class="thumbnails light">
                    <img class="thumbnail-img" src="./images/image-product-1-thumbnail.jpg" alt="pair of sneakers thumbnail" data-ref=1 />
                    <img class="thumbnail-img" src="./images/image-product-2-thumbnail.jpg" alt="sneakers on a stone thumbnail" data-ref=2 />
                    <img class="thumbnail-img" src="./images/image-product-3-thumbnail.jpg" alt="One sneaker on top of stone frontview thumbnail" data-ref=3 />
                    <img class="thumbnail-img" src="./images/image-product-4-thumbnail.jpg" alt="One sneaker on top of stone sideview thumbnail" data-ref=4 />
                </div>
            </div>
        </div>
    `
}

function lightBoxOff(){
    nav.classList.remove('blackout')
    main.classList.remove('blackout')
    footer.classList.remove('blackout')
    infoDetails.classList.remove('blackout')
}

//Add or minus items on main page and update total rendered to screen
plus.addEventListener('click', ()=> {
    totalValue += 1
    total.innerHTML = totalValue
})

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



