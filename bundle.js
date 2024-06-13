/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   allDestinationsData: () => (/* binding */ allDestinationsData),
/* harmony export */   allTripsData: () => (/* binding */ allTripsData),
/* harmony export */   displayTrips: () => (/* binding */ displayTrips),
/* harmony export */   fetchingAllData: () => (/* binding */ fetchingAllData),
/* harmony export */   getAllLocations: () => (/* binding */ getAllLocations),
/* harmony export */   travelersData: () => (/* binding */ travelersData),
/* harmony export */   updatedWelcomeMessage: () => (/* binding */ updatedWelcomeMessage)
/* harmony export */ });
/* harmony import */ var _fetchCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _userFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _testedFunctions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);



const userMessage = document.querySelector('.welcome-traveler');
const loginButton = document.querySelector('.submitLogin');
const loginSection = document.querySelector('.login-section');
const userTotal = document.querySelector('.user-total');
const bookNewTrip = document.querySelector('.book-trip');
const tripDisplay = document.querySelector('.display-user-info');
const buttonSection = document.querySelector('.buttonSection');
const bookTrip = document.querySelector('.newTrips');
const pastTripsButton = document.querySelector('.pastTrips');
const pendingTripsButton = document.querySelector('.pendingTrips');
const upcomingTripsButton = document.querySelector('.upcomingTrips')
const totalCostText = document.querySelector('.total-text');
const selectionForForm = document.querySelector('.selection');
const newTripBookedButton = document.querySelector('.confirmButton');
const getEstimateButton = document.querySelector('.estimateButton');
const destinationValue = document.getElementById('selectionMenu');
const guestCount = document.querySelector('.travelerTotal');
const durationDays = document.querySelector('.durationTotal');

let travelersData = []
let allTripsData = []
let allDestinationsData = []
let firstName;


loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const usernameInput = document.getElementById('usernameInput').value;
    const passwordInput = document.getElementById('passwordInput').value;
    (0,_userFunctions__WEBPACK_IMPORTED_MODULE_1__.loginTraveler)(usernameInput, passwordInput);
    tripDisplay.innerHTML = `<h3>${firstName}'s Trips, click a button to see any previous, pending, or upcoming trips!</h3>`
    ;(0,_userFunctions__WEBPACK_IMPORTED_MODULE_1__.totalTravelerSpentAmount)()
});

bookTrip.addEventListener('click', (e)=> {
    e.preventDefault()
    bookNewTrip.classList.remove('hidden');
    tripDisplay.classList.add('hidden')
    getAllLocations()
})

pastTripsButton.addEventListener('click', (e) => {
    e.preventDefault();
        bookNewTrip.classList.add('hidden');
        tripDisplay.classList.remove('hidden')
        const pastTrips = (0,_userFunctions__WEBPACK_IMPORTED_MODULE_1__.travelerTrips)(allTripsData, 'approved', 3, _userFunctions__WEBPACK_IMPORTED_MODULE_1__.travelerId);
        displayTrips(pastTrips, 'past')
       
})

pendingTripsButton.addEventListener('click', async(e) =>{
    e.preventDefault();
        bookNewTrip.classList.add('hidden');
        tripDisplay.classList.remove('hidden');
        await (0,_userFunctions__WEBPACK_IMPORTED_MODULE_1__.fetchUpdatedTripsData)();
        const pastTrips = (0,_userFunctions__WEBPACK_IMPORTED_MODULE_1__.travelerTrips)(allTripsData, 'pending', 1, 0, _userFunctions__WEBPACK_IMPORTED_MODULE_1__.travelerId);
        displayTrips(pastTrips, );
})


upcomingTripsButton.addEventListener('click', (e) => {
    e.preventDefault();
    bookNewTrip.classList.add('hidden');
    tripDisplay.classList.remove('hidden')
    tripDisplay.innerHTML = `<h3>${firstName}'s upcoming trips are waiting for agent approval</h3>`
})

newTripBookedButton.addEventListener('click',  async (e) => {
    e.preventDefault();
    (0,_userFunctions__WEBPACK_IMPORTED_MODULE_1__.postNewTrip)();
    await (0,_userFunctions__WEBPACK_IMPORTED_MODULE_1__.fetchUpdatedTripsData)()
    tripDisplay.innerHTML = `<h3>${firstName}'s pending trips</h3>`
    tripDisplay.classList.remove('hidden')
    
    
    bookNewTrip.classList.add('hidden');
    document.getElementById('selectionMenu').value = '';
    document.querySelector('.dateStart').value = '';
    document.querySelector('.travelerTotal').value = '';
    document.querySelector('.durationTotal').value = '';
});

getEstimateButton.addEventListener('click', (e) => {
    e.preventDefault();
    const estimate = (0,_testedFunctions_js__WEBPACK_IMPORTED_MODULE_2__.calculateTripCost)(destinationValue.value, guestCount.value, durationDays.value, allDestinationsData)
    tripDisplay.classList.remove('hidden')
    tripDisplay.innerHTML = `Your total estimated cost for the trip is $${estimate}`
    setTimeout(() => {
        tripDisplay.classList.add('hidden');
        tripDisplay.innerHTML = '';
    }, 5000); 
})

const fetchingAllData = async() => {
    try {
        const [travelersDataResponse, tripsData, destinationsData] = await Promise.all([
            (0,_fetchCalls__WEBPACK_IMPORTED_MODULE_0__.fetchTravelersData)(), 
            (0,_fetchCalls__WEBPACK_IMPORTED_MODULE_0__.fetchTripsData)(),
            (0,_fetchCalls__WEBPACK_IMPORTED_MODULE_0__.fetchDestinationData)(),
        ]);
        travelersData = travelersDataResponse;
        allTripsData = tripsData;
        allDestinationsData = destinationsData;
    } catch (err) {
        console.error('Could not properly fetch Traveler information', err);
        throw err; 
    }
}

   const displayTrips = async(trips, status = 'pending') => {
    tripDisplay.innerHTML = ''
    tripDisplay.innerHTML += '<div class="trip-container"></div>'
    if (trips.length > 0) {
        tripDisplay.innerHTML += `<h3>${firstName}'s ${status} trips</h3><br/> `
        
        trips.forEach(trip => {
            const destinations = allDestinationsData.find(destination => destination.id === trip.destinationID);
            let travelpics;
            if (destinations) {
                travelpics = destinations.image;
            }
        tripDisplay.innerHTML += `
        <div class="trip-display">
        <img src="${travelpics}" class="location-pic" alt="destination-pic">
        <div class="trip-details">
                <p class="tripLocation">Location: ${destinations.destination}</p>
                <p class="pastTripDate">Date: ${trip.date}</p>
                <p class="pastTripDuration">Duration: ${trip.duration} days</p>
                <p class="totalTravelers">Travelers: ${trip.travelers}</p>
                <p class="pastTripStatus">Status: ${trip.status}</p>
            </div>
        </div>`
        })
} else {
    tripDisplay.innerHTML = '<h3>No trips to show</h3>';
    }
}

const getAllLocations = () => {
    let allDestinations = [];
    allDestinationsData.forEach(dest => {
        allDestinations.push(`<option value="${dest.destination}">${dest.destination}</option>`)
    })
    allDestinations.sort()
    selectionForForm.innerHTML = `${allDestinations}`
}

const updatedWelcomeMessage = (person) => {
    buttonSection.classList.remove('hidden')
    tripDisplay.classList.remove('hidden')
    userTotal.classList.remove('hidden')
    loginSection.classList.add('hidden')
    userMessage.classList.remove('hidden')
   firstName = person.name.split(' ')[0]
    totalCostText.innerText = `${firstName}'s trip cost for the past 3 years`
    userMessage.innerText = `Welcome Back, ${firstName}!`
    tripDisplay.innerHTML = `<h3>${firstName}'s Trips, please choose a button to see trips!</h3>`
}





/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchDestinationData: () => (/* binding */ fetchDestinationData),
/* harmony export */   fetchTravelersData: () => (/* binding */ fetchTravelersData),
/* harmony export */   fetchTripsData: () => (/* binding */ fetchTripsData)
/* harmony export */ });
const fetchTravelersData = () => {
    return fetch('http://localhost:3001/api/v1/travelers')
       .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
       .then(data => data.travelers) 
       .catch(error => handleError(error)); 
};


const fetchTripsData = () => {
    return fetch('http://localhost:3001/api/v1/trips')
       .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
       .then(data => data.trips)
       .catch(error => handleError(error));
};

const fetchDestinationData = () => {
    return fetch('http://localhost:3001/api/v1/destinations')
       .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
       .then(data => data.destinations)
       .catch(error => handleError(error));
};


const handleError = (error) => {
    console.error("An error occurred:", error);
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchUpdatedTripsData: () => (/* binding */ fetchUpdatedTripsData),
/* harmony export */   loginTraveler: () => (/* binding */ loginTraveler),
/* harmony export */   postNewTrip: () => (/* binding */ postNewTrip),
/* harmony export */   totalTravelerSpentAmount: () => (/* binding */ totalTravelerSpentAmount),
/* harmony export */   travelerId: () => (/* binding */ travelerId),
/* harmony export */   travelerTrips: () => (/* binding */ travelerTrips)
/* harmony export */ });
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _testedFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);


const userNameError = document.querySelector('.error-message-username');
const passwordError = document.querySelector('.error-message-password');
const tripDisplay = document.querySelector('.display-user-info');

let travelersLoggedIn = []
let travelerId;

const loginTraveler = (username, password) => {
    if( password === 'travel' && username.length > 8){
        document.querySelector('.submitLogin').disabled = true;
    }  else {
        document.querySelector('.submitLogin').disabled = false;
    }
     username = usernameInput.value.trim();

    if (username.startsWith("Traveler") && password === "travel") {
         travelerId = Number(username.slice(8));

         travelersLoggedIn = _domUpdates__WEBPACK_IMPORTED_MODULE_0__.travelersData.find(traveler => traveler.id === travelerId);
        
    if (travelersLoggedIn) {
        userNameError.classList.remove('hidden');
        passwordError.classList.remove('hidden')
        ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_0__.updatedWelcomeMessage)(travelersLoggedIn)
    } else {
        userNameError.classList.add('hidden');
        passwordError.classList.add('hidden');
    }
}
}

const postNewTrip =  async() => {
    const newTripBookedButton = document.querySelector('.confirmButton');
    const destinationValue = document.getElementById('selectionMenu').value;
    const dateValue = document.querySelector('.dateStart').value;
    const guestCount = document.querySelector('.travelerTotal').value;
    const durationDays = document.querySelector('.durationTotal').value;

    newTripBookedButton.disabled = true
    if (!destinationValue) {
        alert('Please select a destination.');
        newTripBookedButton.disabled = false
    }

    if (!dateValue) {
        alert('Please enter a start date.');
        newTripBookedButton.disabled = false
    }

    if (!guestCount.match(/^\d+$/)) {
        alert('Please enter a valid number for the guest count.');
        newTripBookedButton.disabled = false
    }

    if (!durationDays.match(/^\d+$/)) {
        alert('Please enter a valid number for the duration.');
        newTripBookedButton.disabled = false
    }

    const newDestination = _domUpdates__WEBPACK_IMPORTED_MODULE_0__.allDestinationsData.find(location => location.destination === destinationValue)
    const locationId = newDestination.id

    const usersDate = dateValue.split("-").join("/")
    const id = Date.now().toString()
    const status = 'pending'
    let suggestActiviites = []

    const bookingData = {
        id: id,
        userID: travelerId,
        destinationID: locationId,
        travelers: guestCount,
        date: usersDate,
        duration: durationDays,
        status: status,
        suggestedActivities: suggestActiviites
    };


    fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    }).then(response => response.json()).then(data => data).catch(error =>
    console.error('Error:', error))
}

const fetchUpdatedTripsData =  async () => {
        fetch('http://localhost:3001/api/v1/trips', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch updated trips');
            }
            return response.json()
        })
        .then(data => {
            const updated = travelerTrips(data.trips, 'pending', 1, travelerId)
            ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_0__.displayTrips)(updated)
            
        })
        .catch((error) => {
        console.error('Error fetching updated trips:', error);
        return []; 
    })
    }
    const travelerTrips = (trips, status = 'pending', yearsAgo = 0, Id) => {
        const currentDate = new Date();
    
        
        const startDate = new Date();
        startDate.setFullYear(currentDate.getFullYear() - yearsAgo);
    
        
        const filteredTrips = trips.filter(trip => {
            const tripDate = new Date(`${trip.date.split('/')[0]}/${trip.date.split('/')[1]}/${trip.date.split('/')[2]}`);
            
            return trip.status === status && tripDate >= startDate  && trip.userID === Id;
        });
        console.log(filteredTrips)
        return filteredTrips;
    }

const totalTravelerSpentAmount = () => {
    const totalCostAmount = document.querySelector('.total-text-cost');
    const totalCost = (0,_testedFunctions__WEBPACK_IMPORTED_MODULE_1__.calculateTotalTripCost)(_domUpdates__WEBPACK_IMPORTED_MODULE_0__.allTripsData, _domUpdates__WEBPACK_IMPORTED_MODULE_0__.allDestinationsData, travelerId);
    totalCostAmount.innerHTML = `$${totalCost}`;
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateTotalTripCost: () => (/* binding */ calculateTotalTripCost),
/* harmony export */   calculateTripCost: () => (/* binding */ calculateTripCost)
/* harmony export */ });
const calculateTripCost = (destinationValue, guestCount, durationDays, destinationData) => {

    const costPerDestination = destinationData.find(location => location.destination === destinationValue);
    if (!costPerDestination) {
        throw new Error(`Destination "${destinationValue}" not found.`);
    }

    if (durationDays > 0) {
        
        const lodgingCost = costPerDestination.estimatedLodgingCostPerDay * durationDays;
        const flightCost = (costPerDestination.estimatedFlightCostPerPerson * guestCount); 
        const totalCost = (lodgingCost + flightCost * 1.1);
        return totalCost.toFixed(2)
    } else {
        
        const otherTotal = (costPerDestination.estimatedFlightCostPerPerson * guestCount) * 1.1;
        return otherTotal.toFixed(2)
    }
}

const calculateTotalTripCost = (tripsData, destinationsData, userId) => {
    const threeYearsAgo = new Date();
    threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

    const recentTrips = tripsData.filter(trip => {
        const tripDate = new Date(`${trip.date.split('/')[0]}/${trip.date.split('/')[1]}/${trip.date.split('/')[2]}`);
        return tripDate >= threeYearsAgo && trip.userID === userId && trip.status === 'approved';
    });

    const totalCost = recentTrips.reduce((acc, trip) => {
        const matchingDestination = destinationsData.find(destination => destination.id === trip.destinationID);
        if (matchingDestination) {
            const flightCosts = (matchingDestination.estimatedFlightCostPerPerson * trip.travelers) 
            const  lodgingCosts = (matchingDestination.estimatedLodgingCostPerDay * trip.duration) ;
            const totalPlusFee = (flightCosts + lodgingCosts) * 1.1
            return acc + totalPlusFee;
        }
        return acc;
    }, 0);

    return totalCost.toFixed(2);
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 6 */
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),
/* 8 */
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 10 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),
/* 11 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_pexels_gashifrheza_1486121_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(16);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_pexels_gashifrheza_1486121_jpg__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nbody {\n  background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-size: cover;\n  background-repeat: no-repeat;\n  width: 100vw;\n  margin: 0;\n  padding: 0;\n}\n\n* {\n  font-family: \"Oswald\", sans-serif;\n  font-optical-sizing: auto;\n  font-weight: 50;\n  font-style: normal;\n}\n\n.body-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh; \n}\n\nmain {\n  display: grid;\n}\n\nh1 {\n  font-size: 100px;\n  position: fixed; \n  top: 0; \n  left: 0; \n  width: 100%; \n  text-align: center;\n  z-index: 1000; \n  animation: slideInFromLeft 1.5s ease-in-out forwards;\n  letter-spacing: 2px;\n  margin: 5px;\n  opacity: 0;\n}\n\n.welcome-traveler {\n  font-size: 100px;\n  position: fixed; \n  top: 0; \n  left: 0; \n  width: 100%; \n  text-align: center;\n  z-index: 1000; \n  animation: slideInFromLeft 1.5s ease-in-out forwards;\n  letter-spacing: 2px;\n  margin: 100px 5px 0 0;\n  opacity: 0;\n}\n\n@keyframes slideInFromLeft {\n  0% {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes slideInFromTop {\n  0% {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(25);\n    opacity: 1;\n  }\n}\n@keyframes slideInFromBottom {\n  0% {\n    transform: translateY(100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.display-user-info {\n  position: absolute;\n  right: 25%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  width: fit-content; \n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  margin-top: 275px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 30px;\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: start;\n  h3 {\n    margin: 0 15px 0 0;\n  }\n}\n.user-total {\n  position: absolute;\n  right: 3%;\n  top: 25%;\n  transform: translateY(-50%);\n  align-items: center;\n  width: fit-content; \n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  max-width: 1600px; \n  margin-top: 5px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 30px;\n  margin: 0 50px 0 0;\n}\n.book-trip {\n  position: absolute;\n  justify-content: center;\n  width: fit-content; \n  left: 15%;\n  top: 35%;\n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  max-width: 1600px; \n  margin-top: 5px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 22px;\n}\n\n.buttonSection {\n  position: absolute;\n  top: 22%;\n  transform: translateY(-50%);\n  width: fit-content; \n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  max-width: 1600px; \n  margin: 0 0 0 25px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 24px;\n  height: 100px; \n  div {\n    padding: 20px;\n  }\n  button {\n    font-size: 20px; \n    color: white;\n    background-color: #007bff;\n    padding: 10px 20px; \n    margin: 5px; \n    border-radius: 5px; \n    cursor: pointer; \n    transition: background-color 0.3s ease; \n  }\n}\n\n.login-section {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  width: 15%; \n  max-width: 1600px; \n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 34px;\n  animation: slideInFromTop 1.5s ease-in-out forwards;\n  animation-duration: 2s;\n  animation-fill-mode: forwards;\n  opacity: 0;\n}\n\n.book-trip,\n.buttonSection {\n  animation: slideInFromLeft 1.5s ease-in-out forwards;\n  animation-duration: 2s;\n  animation-fill-mode: forwards;\n  opacity: 0;\n}\n.display-user-info,\n.user-total {\n  animation: slideInFromBottom 1.5s ease-in-out backwards;\n  animation-duration: 2s;\n  animation-fill-mode: forwards;\n  opacity: 0;\n}\n\n.login-form label,\n.login-form input[type=\"text\"],\n.login-form input[type=\"password\"] {\n  display: block;\n  width: 100%;\n  height: 50px;\n  margin-bottom: 5px;\n  text-align: center;\n  font-size: 24px;\n}\n\n.login-form input[type=\"submit\"] {\n  text-align: center;\n  font-size: 24px;\n  margin: 5px 0 15px 25px;\n  width: 80%;\n  border-radius: 5%;\n}\n\n#bookingForm label,\n#bookingForm select,\n#bookingForm input[type='number'],\n#bookingForm input[type='date'] {\n  display: block;\n  width: 60%;\n  margin: 0 0 10px 130px;\n  text-align: center;\n  font-size: 22px;\n}\n#bookingForm input[type=\"button\"] {\n  width: 50%;\n  font-size: 20px;\n  margin: 0 0 8px 160px;\n}\n\n.total-text-cost {\n  margin: 0 0 0 110px;\n  font-size: 40px;\n}\n\n.submitLogin, \n.confirmButton, \n.estimateButton {\n  background-color: #007bff;\n  border: none;\n  color: white;\n  cursor: pointer;\n  padding: 10px 20px;\n  text-transform: uppercase;\n}\n\n.error-message-username,\n.error-message-password {\n  color: red;\n}\n\n.trip-display {\n  display: block;\n  gap: 20px; \n  width: fit-content;\n  padding: 15px;\n  border-radius: 10px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  background-color: rgba(211, 211, 211, .55);\n}\n\n.location-pic {\n  width: 160px; \n  height: 200px; \n}\n\n.trip-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 20px;\n  padding: 20px;\n  width: fit-content;\n}\n\n\n.trip-details {\n  display: block;\n  flex-direction: row; \n  gap: 5px; \n  width: fit-content;\n  font-size: 22px;\n} \n\n.pastTripDate,\n.pastTripDuration,\n.pastTripStatus,\n.totalTravelers,\n.tripLocation {\n  margin: 0; \n  padding: 5px 0; \n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  background-color: rgba(255, 255, 255, 0.9);\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["\nbody {\n  background: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);\n  background-image: url('../images/pexels-gashifrheza-1486121.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n  width: 100vw;\n  margin: 0;\n  padding: 0;\n}\n\n* {\n  font-family: \"Oswald\", sans-serif;\n  font-optical-sizing: auto;\n  font-weight: 50;\n  font-style: normal;\n}\n\n.body-wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100vh; \n}\n\nmain {\n  display: grid;\n}\n\nh1 {\n  font-size: 100px;\n  position: fixed; \n  top: 0; \n  left: 0; \n  width: 100%; \n  text-align: center;\n  z-index: 1000; \n  animation: slideInFromLeft 1.5s ease-in-out forwards;\n  letter-spacing: 2px;\n  margin: 5px;\n  opacity: 0;\n}\n\n.welcome-traveler {\n  font-size: 100px;\n  position: fixed; \n  top: 0; \n  left: 0; \n  width: 100%; \n  text-align: center;\n  z-index: 1000; \n  animation: slideInFromLeft 1.5s ease-in-out forwards;\n  letter-spacing: 2px;\n  margin: 100px 5px 0 0;\n  opacity: 0;\n}\n\n@keyframes slideInFromLeft {\n  0% {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes slideInFromTop {\n  0% {\n    transform: translateY(-100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(25);\n    opacity: 1;\n  }\n}\n@keyframes slideInFromBottom {\n  0% {\n    transform: translateY(100%);\n    opacity: 0;\n  }\n  100% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n.display-user-info {\n  position: absolute;\n  right: 25%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  width: fit-content; \n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  margin-top: 275px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 30px;\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: start;\n  h3 {\n    margin: 0 15px 0 0;\n  }\n}\n.user-total {\n  position: absolute;\n  right: 3%;\n  top: 25%;\n  transform: translateY(-50%);\n  align-items: center;\n  width: fit-content; \n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  max-width: 1600px; \n  margin-top: 5px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 30px;\n  margin: 0 50px 0 0;\n}\n.book-trip {\n  position: absolute;\n  justify-content: center;\n  width: fit-content; \n  left: 15%;\n  top: 35%;\n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  max-width: 1600px; \n  margin-top: 5px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 22px;\n}\n\n.buttonSection {\n  position: absolute;\n  top: 22%;\n  transform: translateY(-50%);\n  width: fit-content; \n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  max-width: 1600px; \n  margin: 0 0 0 25px;\n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 24px;\n  height: 100px; \n  div {\n    padding: 20px;\n  }\n  button {\n    font-size: 20px; \n    color: white;\n    background-color: #007bff;\n    padding: 10px 20px; \n    margin: 5px; \n    border-radius: 5px; \n    cursor: pointer; \n    transition: background-color 0.3s ease; \n  }\n}\n\n.login-section {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  border-radius: 1.5rem;\n  backdrop-filter: blur(5px);\n  width: 15%; \n  max-width: 1600px; \n  background-color: rgba(211, 211, 211, .55);\n  color: black;\n  font-size: 34px;\n  animation: slideInFromTop 1.5s ease-in-out forwards;\n  animation-duration: 2s;\n  animation-fill-mode: forwards;\n  opacity: 0;\n}\n\n.book-trip,\n.buttonSection {\n  animation: slideInFromLeft 1.5s ease-in-out forwards;\n  animation-duration: 2s;\n  animation-fill-mode: forwards;\n  opacity: 0;\n}\n.display-user-info,\n.user-total {\n  animation: slideInFromBottom 1.5s ease-in-out backwards;\n  animation-duration: 2s;\n  animation-fill-mode: forwards;\n  opacity: 0;\n}\n\n.login-form label,\n.login-form input[type=\"text\"],\n.login-form input[type=\"password\"] {\n  display: block;\n  width: 100%;\n  height: 50px;\n  margin-bottom: 5px;\n  text-align: center;\n  font-size: 24px;\n}\n\n.login-form input[type=\"submit\"] {\n  text-align: center;\n  font-size: 24px;\n  margin: 5px 0 15px 25px;\n  width: 80%;\n  border-radius: 5%;\n}\n\n#bookingForm label,\n#bookingForm select,\n#bookingForm input[type='number'],\n#bookingForm input[type='date'] {\n  display: block;\n  width: 60%;\n  margin: 0 0 10px 130px;\n  text-align: center;\n  font-size: 22px;\n}\n#bookingForm input[type=\"button\"] {\n  width: 50%;\n  font-size: 20px;\n  margin: 0 0 8px 160px;\n}\n\n.total-text-cost {\n  margin: 0 0 0 110px;\n  font-size: 40px;\n}\n\n.submitLogin, \n.confirmButton, \n.estimateButton {\n  background-color: #007bff;\n  border: none;\n  color: white;\n  cursor: pointer;\n  padding: 10px 20px;\n  text-transform: uppercase;\n}\n\n.error-message-username,\n.error-message-password {\n  color: red;\n}\n\n.trip-display {\n  display: block;\n  gap: 20px; \n  width: fit-content;\n  padding: 15px;\n  border-radius: 10px;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  background-color: rgba(211, 211, 211, .55);\n}\n\n.location-pic {\n  width: 160px; \n  height: 200px; \n}\n\n.trip-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  gap: 20px;\n  padding: 20px;\n  width: fit-content;\n}\n\n\n.trip-details {\n  display: block;\n  flex-direction: row; \n  gap: 5px; \n  width: fit-content;\n  font-size: 22px;\n} \n\n.pastTripDate,\n.pastTripDuration,\n.pastTripStatus,\n.totalTravelers,\n.tripLocation {\n  margin: 0; \n  padding: 5px 0; \n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  background-color: rgba(255, 255, 255, 0.9);\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 14 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 15 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/pexels-gashifrheza-1486121.jpg");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file



// An example of how you tell webpack to use an image (also need to link to it in the index.html)



// console.log('This is the JavaScript entry file - your code begins here.');
(0,_domUpdates__WEBPACK_IMPORTED_MODULE_0__.fetchingAllData)()
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map