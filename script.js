const cards = document.querySelectorAll(".card"); //here, I am calling all the li tags that have the class name "card" and giving them the vaiable-name "CARDS" 
// const box = cards.querySelectorAll(".view");
// let card = cards[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard(a) {  //the function flipCard which would be used for the event listener "click"
   let clickedCard = a.target;  //trying to get the clicked card, cos if u console.log(a.target), we would be getting the html location of the card we just clicked
   if(clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");  //adding a new class list, and using css to style it so that we can have a flip animation
        if(!cardOne){
            //return the cardOne value to clickedCard 
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
   }
}



function matchCards(img1, img2) {
    if(img1 === img2){  // if two cards matches each other
        matchedCard++  //number of matched cards will be increased by 1
        if(matchedCard === 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);   //calling shuffle function after 1 sec
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne.classList.add("right");
        cardTwo.classList.add("right");

        cardOne = cardTwo = "";
        return disableDeck = false;   //returning the code if two cards are matched(so that the bottom codes dont run again!!)
    }
    
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");

        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    //creating an array for the cards whereby one image is on two cards
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);   //sorting array items randomly



    //removing flip class from all cards and passing random image to each card 
    cards.forEach((card, index) => {  
        card.classList.remove("flip");
        card.classList.remove("right");
        let imgTag = card.querySelector("img");
        imgTag.src = "images/img-" + arr[index] + ".png";
        card.addEventListener("click", flipCard);    //onclick any of the card, a flipCard function should be executed which was defined above
    });
    
}


shuffleCard();
clearColor();

cards.forEach(card => {  //here, i am now stating that every li should have its own name called "card" (i.e: for each li, a name should be given to it )
    card.addEventListener("click", flipCard);    //onclick any of the card, a flipCard function should be executed which was defined above
});