// Variable to get state abbreviation and full state name
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
var dropDown = $("#dropdownList")
$("#loaderDiv").hide();
$("#divider").hide();

//When button is  clicked search APIs from user choice
$("#searchButton").on("click", function(event){
    event.preventDefault();
    var state = dropDown.val();
    var stateName = stateFullName[state]; 
    $('#parksAppearHere').empty();
    callStateParks(state);
    callStateCases(state,stateName);
    $('*').removeClass('startHidden');
    $('#explanation').remove();
    $( "#coronaCard" ).first().fadeIn( "slow" );
})



function callStateCases (state,stateName){

// AJAX REQUEST for state cases
$.ajax({
    url: "https://api.covidtracking.com/v1/states/" + state + "/current.json",
    method: 'GET'
}).then(function(response){
    
    // Needs to fill out information in state covid cases card
    $('#coronaState').text(stateName);
    $('#coronaDeaths').text("Deaths: " + response.death);
    $('#coronaPos').text("Positive Cases: " + response.positive);
    $('#coronaHosp').text("Hospitalized: " + response.hospitalizedCurrently);

    //variable for if statement
    var recovered = response.recovered
    $('#coronaRecov').css("display","block")
    
    //if value is null hide info
    if (recovered){
        $('#coronaRecov').text("Recovered: " + response.recovered); 
    }else{
        $('#recoveredHeader').css("display","none")
        $('#coronaRecov').css("display","none")
    }
 })
}

function callStateParks(state){

// AJAX REQUEST for parks in state with a loader while it fetches information
$.ajax({
    url: "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=CNEwj4WXnx6aTMxwtuZLAJ2QUVMvvoeX3JMb1euj",
    method: 'GET',
    beforeSend: function(){
        $("#loaderDiv").show();
     },
}).then(function(response){
    $("#loaderDiv").hide();
    $("#divider").show();

   //Loop throughand create a card for every park and include all their info
   for (i=0; i<response.data.length; i++){

        // these are the variables for the logic
        var image = response.data[i].images[0]
        var fees = response.data[i].entranceFees[0]
        
        //This is the creation of the card bodys and info on them
        var parkCard = $('<div></div>');
        var parkCardBody = $('<div class="uk-card uk-card-primary uk-card-body blue borderRadius"></div>');
        var parkHeader = $('<h1 class="uk-card-title center changeFont">' + response.data[i].fullName + '</h1>');
        var aboutParkHeader = $('<h4 class="changeFont">About:</h4>');
        var aboutPark = $('<p>' + response.data[i].description + '</p>');
        var parkURLHeader = $('<h2 class="changeFont"></h2>')
        var parkURL = $('<a class="uk-link-heading" href="' + response.data[i].url + '">Visit Park!</a>')
        parkCard.append(parkCardBody);
        parkCardBody.append(parkHeader);

        // This is the logic, in case there aren't any images or fees
        if(image){
            var parkImage = $('<img data-src="' + response.data[i].images[0].url + '" width="1800" height="1200" alt="" uk-img>');
            parkCardBody.append(parkImage);
        };
        if(!image){
            var parkImagePlaceholder =  $('<img data-src="assets/parkplaceholder.jpg" width="1800" height="1200" alt="" uk-img>');
            var imageMessage = $('<p>Placeholder image, since no image for park found.</p>');
            parkCardBody.append(parkImagePlaceholder);
            parkCardBody.append(imageMessage);
        };
        if(fees){
            var weirdFees = response.data[i].entranceFees[0].cost
            // trim the string so that it is in a readable form.
            var normalFees = weirdFees.slice(0,5)
            if(normalFees === '0.000'){
                normalFees = '0.00'
            }
            var entryCost = $('<h4>Entry Cost: ' + '$'+ normalFees + '</h4>');
            var entryCostDescription = $('<p>' + response.data[i].entranceFees[0].description + '</p>');
        };

        //Append the rest of the items and the card itself.
        parkCardBody.append(aboutParkHeader);
        parkCardBody.append(aboutPark);
        parkCardBody.append(entryCost);
        parkCardBody.append(entryCostDescription);
        parkCardBody.append(parkURLHeader);
        parkURLHeader.append(parkURL);
        $('#parksAppearHere').prepend(parkCard)
   }
 })
}