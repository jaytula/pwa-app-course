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
