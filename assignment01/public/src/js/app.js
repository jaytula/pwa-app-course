var button = document.querySelector("#start-button");
var button2 = document.querySelector("#start-button-02");
var button3 = document.querySelector("#start-button-03");

var output = document.querySelector("#output");

button.addEventListener("click", function() {
  // Create a new Promise here and use setTimeout inside the function you pass to the constructor
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      // <- Store this INSIDE the Promise you created!
      // Resolve the following URL: https://swapi.co/api/people/1
      resolve("https://swapi.co/api/people/1");
    }, 500);
  });

  // Handle the Promise "response" (=> the value you resolved) and return a fetch()
  // call to the value (= URL) you resolved (use a GET request)
  promise
    .then(url => fetch(url))

    // Handle the response of the fetch() call and extract the JSON data, return that
    // and handle it in yet another then() block
    .then(res => res.json())
    // Finally, output the "name" property of the data you got back (e.g. data.name) inside
    // the "output" element (see variables at top of the file)
    .then(data => {
      console.log(data.name);
      output.textContent = data.name;
    });
});

// Repeat the exercise with a PUT request you send to https://httpbin.org/put
// Make sure to set the appropriate headers (as shown in the lecture)
// Send any data of your choice, make sure to access it correctly when outputting it
// Example: If you send {person: {name: 'Max', age: 28}}, you access data.json.person.name
// to output the name (assuming your parsed JSON is stored in "data")
button2.addEventListener("click", function() {
  // Create a new Promise here and use setTimeout inside the function you pass to the constructor
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      // <- Store this INSIDE the Promise you created!
      resolve("https://httpbin.org/put");
    }, 500);
  });

  // Handle the Promise "response" (=> the value you resolved) and return a fetch()
  // call to the value (= URL) you resolved (use a GET request)
  promise
    .then(url =>
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ name: "Max", age: 28 })
      })
    )

    // Handle the response of the fetch() call and extract the JSON data, return that
    // and handle it in yet another then() block
    .then(res => res.json())
    // Finally, output the "name" property of the data you got back (e.g. data.name) inside
    // the "output" element (see variables at top of the file)
    .then(data => {
      console.log(data.json);
      output.textContent = data.json.name;
    });
});

// To finish the assignment, add an error to URL and add handle the error both as
// a second argument to then() as well as via the alternative taught in the module
button3.addEventListener("click", function() {
  // Create a new Promise here and use setTimeout inside the function you pass to the constructor
  var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
      // <- Store this INSIDE the Promise you created!
      resolve("https://httpbin.org/error-put");
    }, 500);
  });

  // Handle the Promise "response" (=> the value you resolved) and return a fetch()
  // call to the value (= URL) you resolved (use a GET request)
  promise
    .then(url =>
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ name: "Max", age: 28 })
      })
    )

    // Handle the response of the fetch() call and extract the JSON data, return that
    // and handle it in yet another then() block
    .then(
      res => res.json(),
      err => {
        console.log("Caught error early, providing fake data", err);
        return { json: { name: "Goofy", age: 101 } };
      }
    )
    // Finally, output the "name" property of the data you got back (e.g. data.name) inside
    // the "output" element (see variables at top of the file)
    .then(data => console.log(data.json))
    .catch(err => console.log("There was an error:", err));
});
