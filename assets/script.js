var stateFullName = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}
console.log(window);
var dropDown = $("#dropdownList")

$("#searchButton").on("click", function(event){
    event.preventDefault();
    var state = dropDown.val();
    var stateName = stateFullName[state]; 
    $('#parksAppearHere').empty();
    callStateParks(state);
    callStateCases(state,stateName);

})



function callStateCases (state,stateName){

// AJAX REQUEST for state cases
$.ajax({
    url: "https://api.covidtracking.com/v1/states/" + state + "/current.json",
    method: 'GET'
}).then(function(response){
    console.log(response)
    console.log(response.positive);
    // Needs to fill out information in state covid cases card

    $('#coronaState').text(stateName + '?');
    $('#coronaDeaths').text(response.death);
    $('#coronaPos').text(response.positive);
    $('#coronaHosp').text(response.hospitalizedCurrently);

    //variable for if statement
    var recovered = response.recovered
    $('#recoveredHeader').css("display","block")
    $('#coronaRecov').css("display","block")
    
    //if value is null hide info
    if (recovered){
        $('#coronaRecov').text(response.recovered); 
    }else{
        $('#recoveredHeader').css("display","none")
        $('#coronaRecov').css("display","none")
    }
    


})

}

function callStateParks(state){

// AJAX REQUEST for parks in state
$.ajax({
    url: "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=CNEwj4WXnx6aTMxwtuZLAJ2QUVMvvoeX3JMb1euj",
    method: 'GET'
}).then(function(response){
    console.log(response)
   //Create a card for every park and include all their info
   for (i=0; i<response.data.length; i++){
        // these are the variables for the logic
        var image = response.data[i].images[0]
        var fees = response.data[i].entranceFees[0]
        
        //This is the creation of the card bodys and info on them
        var parkCard = $('<div></div>');
        var parkCardBody = $('<div class="uk-card uk-card-primary uk-card-body"></div>');
        var parkHeader = $('<h2 class="uk-card-title center">' + response.data[i].fullName + '</h2>');
        var aboutParkHeader = $('<h4>About:</h4>');
        var aboutPark = $('<p>' + response.data[i].description + '</p>');
        var parkURLHeader = $('<h2></h2>')
        var parkURL = $('<a class="uk-link-heading" href="' + response.data[i].url + '">Visit Park!</a>')

        // This is the logic, in case there aren't any images or fees
        if(image){
            var parkImage = $('<img data-src="' + response.data[i].images[0].url + '" width="1800" height="1200" alt="" uk-img>');
        }
        if(fees){
            var entryCost = $('<h4>Entry Cost: ' + '$'+ response.data[i].entranceFees[0].cost + '</h4>');
            var entryCostDescription = $('<p>' + response.data[i].entranceFees[0].description + '</p>');
        }

        //All appends to the doc
        parkCard.append(parkCardBody);
        parkCardBody.append(parkHeader);
        parkCardBody.append(parkImage);
        parkCardBody.append(aboutParkHeader);
        parkCardBody.append(aboutPark);
        parkCardBody.append(entryCost);
        parkCardBody.append(entryCostDescription);
        parkCardBody.append(parkURLHeader);
        parkURLHeader.append(parkURL);
        $('#parksAppearHere').prepend(parkCard)

        //* console logs for all the info used
        // console.log(response.data[i]);
        // console.log(response.data[i].fullName);
        // console.log(response.data[i].description);
        // console.log(response.data[i].images[0].url);
        // console.log(response.data[i].entranceFees[0].cost)
        // console.log(response.data[i].entranceFees[0].description)
        // console.log(response.data[i].url)
    }
})
}

// callStateParks();
