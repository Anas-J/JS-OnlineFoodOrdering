// main row element to show the hotel list
let mainRow = document.getElementById("HotelList");
// error message element to show the message likr no search, no favourite etc
let errorMessageElement = document.getElementById("notificationMessage");
// select dropdown for sort using event delegation
let selectSorting = document.getElementById("dropdown-sort");
// select dropdown for filter using event delegation
let selectFilter = document.getElementById("dropdown-filter");

// to copy the hotels once my page is loaded
let allHotelsDataCopy = [];

// getting data using fetch form API folder
let getData = () => {
    return [
        {
          "name": "Subway(MCF)",
          "id": 20423,
          "location": "udyog vihar",
          "rating": 4.2,
          "eta": 25,
          "tags": ["American", "Fast Food"],
          "img": "./images/1.png"
        },
        {
          "name": "Prince Ki Rasoi",
          "id": 27213,
          "location": "Ramada Hotel, Huda City",
          "rating": 3.8,
          "eta": 30,
          "tags": ["North Indian", "Chinese", "Mughlai", "Fast Food"],
          "img": "./images/2.jpg"
        },
        {
          "name": "Aggarwal Sweets & Restaurant",
          "id": 52778,
          "location": "Near Jain Dharamshala, Huda City",
          "rating": 3.4,
          "eta": 25,
          "tags": ["North Indian", "Chinese", "Sweets"],
          "img": "./images/3.jpg"
        },
        {
          "name": "Rasoi",
          "id": 13018,
          "location": "Near Hanuman Mandir, Sector-14",
          "rating": 3.9,
          "eta": 50,
          "tags": ["Indian", "Chinese", "North Indian"],
          "img": "./images/4.jpg"
        },
        {
          "name": "Fork with Sticks",
          "id": 1015,
          "location": "DLF Phase 4, New DLF Phase 4",
          "rating": 4.0,
          "eta": 44,
          "tags": ["Chinese", "Fast Food"],
          "img": "./images/5.jpg"
        },
        {
          "name": "South Store",
          "id": 23893,
          "location": "sector 14 Market, Sector-14",
          "rating": 4.1,
          "eta": 53,
          "tags": ["American", "South Indian"],
          "img": "./images/6.jpg"
        },
        {
          "name": "Chinese Corner",
          "id": 30361,
          "location": "Sushant Lok, DLF Phase 4",
          "rating": 4.1,
          "eta": 47,
          "tags": ["Chinese", "Thai"],
          "img": "./images/7.jpg"
        },
        {
          "name": "Sandburg Shakes",
          "id": 63660,
          "location": "Sushant Lok, New DLF Phase 4",
          "rating": 4.4,
          "eta": 51,
          "tags": ["Cafe", "Italian", "Healthy Food"],
          "img": "./images/8.jpg"
        },
        {
          "name": "Royal Spice",
          "id": 29123,
          "location": "Near Unitech Cyber Park, sohna road",
          "rating": 4.1,
          "eta": 31,
          "tags": ["Indian", "Chinese", "Continental", "Snacks"],
          "img": "./images/9.jpg"
        },
        {
          "name": "Madurai Meenakshi Bhawan",
          "id": 26761,
          "location": "Sector 14 Market, Sector-14",
          "rating": 4.2,
          "eta": 25,
          "tags": ["American", "South Indian"],
          "img": "./images/10.jpg"
        },
        {
          "name": "Koolchas",
          "id": 68159,
          "location": "Dlf Phase 1, DLF Phase 4",
          "rating": 4.3,
          "eta": 53,
          "tags": ["North Indian", "Fast Food"],
          "img": "./images/11.jpg"
        },
        {
          "name": "Punjabi Chaap Corner",
          "id": 49213,
          "location": "Sector 14, Sector-14",
          "rating": 3.8,
          "eta": 52,
          "tags": ["North Indian", "Fast Food"],
          "img": "./images/12.jpg"
        },
        {
          "name": "Burger BC",
          "id": 21340,
          "location": "Near Gold Souk Mall, DLF Phase 4",
          "rating": 4.1,
          "eta": 57,
          "tags": ["Fast Food","Continental"],
          "img": "./images/13.jpg"
        },
        {
          "name": "Mucchad's SamosaZz & More",
          "id": 17281,
          "location": "Maruti Vihar, DLF Phase 4",
          "rating": 4.1,
          "eta": 43,
          "tags": ["Mughlai", "North Indian", "Street Food", "Fast Food"],
          "img": "./images/14.jpg"
        },
        {
          "name": "The Burger Homes",
          "id": 63913,
          "location": "Huda City, Huda City",
          "rating": 3.9,
          "eta": 45,
          "tags": ["North Indian", "Fast Food"],
          "img": "./images/15.jpg"
        },
        {
          "name": "STANLEY KA DIBBA",
          "id": 51766,
          "location": "Chakkarpur, DLF Phase 4",
          "rating": 3.7,
          "eta": 41,
          "tags": ["American", "Thalis", "Indian", "Fast Food"],
          "img": "./images/16.jpg"
        }
    
      ]    
}

// returns single hotel card
let getHotelCard = singleHotelData => {
    // check on loading the view whether the hotel already in local storage then change class to show favourite icon red already
    let a = JSON.parse(localStorage.getItem('fav'));
    if (a !== null) {
        var favIconClass = (!a.find(hotel => hotel.id == singleHotelData.id)) ? "fa-heart" : "fa-heart-red";
    } else {
        var favIconClass = "fa-heart"
    }
     
    return `<div class="col-md-3">
      <div class="card">
        <img class="card-img-top" src="${singleHotelData.img}" alt="Card image">
        <div class="card-body">
          <h6 class="card-title">${singleHotelData.name}</h6>
          <p class="card-text tags" >${singleHotelData.tags}</p>
          <a onclick="markFavourite(this, ${singleHotelData.id})" id="${favIconClass}"><i class="fa fa-heart" ></i><a>
          <div>
            <div class="rating">
                <span class="fa fa-star checked" > ${singleHotelData.rating} </span>
            </div>
             <span class="eta"> ${singleHotelData.eta} MINS </span>
              <a href="#" class="view-menu" >View Menu</a>
              </div>
        </div>
      </div>
</div>`;

}

// generate view
let generateView = data => data.map(hotel => getHotelCard(hotel));

// display all the hotels  
let displayAllHotels = () => {
    let data = getData()
            allHotelsDataCopy = JSON.parse(JSON.stringify(data));
            mainRow.innerHTML = generateView(data).join('')
}

displayAllHotels();

// display searched hotels as per entered text and showing result by tags
function searchResult() {
       console.log("called!!")
       let d = document.getElementById("myInput");
       let searchMatchingHotels = allHotelsDataCopy.filter(hotel => hotel.tags.toString().toUpperCase().indexOf(d.value.toUpperCase()) > -1)
       mainRow.innerHTML = generateView(searchMatchingHotels).join('')
       errorMessageElement.innerText = (searchMatchingHotels == 0) ? `No hotels Found for ${d.value}` : '';
}

// debounce function which takes search function and delay
let debounce = (fn, delay) => {
    let timeout;
    return function () {
       clearTimeout(timeout)
       timeout = setTimeout(()=> fn(), delay)
    }
}
let search = debounce(searchResult, 400);

// sorting all the hotels
selectSorting.addEventListener("click", e => {
    if (e.target.innerText === "Sort by ETA") {
        let sortByEta = allHotelsDataCopy.sort((hotel1, hotel2) => hotel1.eta - hotel2.eta);
        mainRow.innerHTML = generateView(sortByEta).join('');
    } else if (e.target.innerText === "Sort by Rating") {
        let sortByRating = allHotelsDataCopy.sort((hotel1, hotel2) => hotel2.rating - hotel1.rating);
        mainRow.innerHTML = generateView(sortByRating).join('');
    }
})

// filter the hotels as per tags
selectFilter.addEventListener("click", e => {
    let filteredHotels = allHotelsDataCopy.filter(hotel => hotel.tags.toString().toUpperCase().indexOf(e.target.innerText.toUpperCase()) > -1);
    mainRow.innerHTML = generateView(filteredHotels).join('');
    errorMessageElement.innerText = (filteredHotels.length == 0)? `No Restro belong to ${e.target.innerText}` : '';
})

//mark favourite - add red color if item is pushed into the localstorage or mark white if item is removed form the local storage
function markFavourite(abc, id) {
    if (!localStorage.getItem("fav")) {
         var a = [];
         localStorage.setItem('fav', JSON.stringify(a));
    }
    var a = [];
    a = JSON.parse(localStorage.getItem('fav'));
    let markedHotel = allHotelsDataCopy.filter(hotel => hotel.id == id);
    if (!a.find(hotel => hotel.id == id)) {
        a.push(...markedHotel);
        abc.setAttribute("style", "color: red !important;");
    } else {
        let indexOfExistingHotel = a.indexOf(a.find(hotel => hotel.id == id));
        a.splice(indexOfExistingHotel, 1);
        abc.setAttribute("style", "color: white !important;");
    }
    localStorage.setItem('fav', JSON.stringify(a));
}

// see all favourite resetro
function seeAllFavouriteRestro() {
    let allFavourite = JSON.parse(localStorage.getItem("fav"));
    mainRow.innerHTML = generateView(allFavourite).join('');
    errorMessageElement.innerText = (allFavourite.length == 0)? "No Favourite Selected Yet!!" : '';
}
