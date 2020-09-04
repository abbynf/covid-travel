console.log(window);
var state = "ut";
callStateParks();

$("#searchButton").on("click", function(event){
    event.preventDefault();
    state = $("#dropdownList").val();
    $('#parksAppearHere').empty();
    callStateParks();
    callStateParks();
})

function callStateCases (){

// AJAX REQUEST for state cases
$.ajax({
    url: "https://api.covidtracking.com/v1/states/" + state + "/current.json",
    method: 'GET'
}).then(function(response){
    console.log(response)
    console.log(response.positive);
    // Needs to fill out information in state covid cases card
})

}

function callStateParks(){

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
            var weirdFees = response.data[i].entranceFees[0].cost
            // trim the string so that it is in a readable form.
            var normalFees = weirdFees.slice(0,5)
            if(normalFees === '0.000'){
                normalFees = '0.00'
            }
            console.log(normalFees)
            var entryCost = $('<h4>Entry Cost: ' + '$'+ normalFees + '</h4>');
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
