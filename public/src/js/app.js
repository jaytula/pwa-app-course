var deferredPrompt;
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").then(function() {
    console.log("Service worker registered!");
  });
}

window.addEventListener("beforeinstallprompt", function(event) {
  console.log("beforeinstallprompt fired");
  // event.preventDefault no longer has an effect after Chrome 68 with the Mini-infobar
  // https://developers.google.com/web/updates/2018/06/a2hs-updates
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

var promise = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve("This is executed one the timer is done!");
  }, 1000);
});

fetch("https://httpbin.org/ip")
  .then(resp => {
    return resp.json();
  })
  .then(json => {
    console.log(json);
  })
  .catch(err => {
    console.log(err);
  });

promise
  .then(text => {
    return text + "abc";
  })
  .then(newText => {
    console.log(newText);
  });
