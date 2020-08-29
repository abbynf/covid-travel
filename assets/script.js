console.log(window);
var state = "ut";


function callStateCases (){

// AJAX REQUEST for state cases
$.ajax({
    url: "https://api.covidtracking.com/v1/states/" + state + "/current.json",
    method: 'GET'
}).then(function(response){
    console.log(response)
    console.log(response.positive);
})
}

// callStateCases();

function callStateParks(){

// AJAX REQUEST for parks in state
$.ajax({
    url: "https://developer.nps.gov/api/v1/parks?stateCode=" + state + "&api_key=CNEwj4WXnx6aTMxwtuZLAJ2QUVMvvoeX3JMb1euj",
    method: 'GET'
}).then(function(response){
    console.log(response)
    // for (i=0; i<response.data.length; i++){
    //     // console.log(response.data[i]);
    //     console.log(response.data[i].fullName);
    //     console.log(response.data[i].description);
    //     console.log(response.data[i].images[0].url);
    //     console.log(response.data[i].entranceFees[0].cost)
    //     console.log(response.data[i].entranceFees[0].description)
    //     console.log(response.data[i].url)
    // }
})
}

// callStateParks();
