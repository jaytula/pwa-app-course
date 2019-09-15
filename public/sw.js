self.addEventListener("install", function(event) {
  console.log("[Service Worker] Installing Server Worker ...", event);
});

self.addEventListener("activate", function(event) {
  console.log("[Service Worker] Activating Server Worker ...", event);
  return self.clients.claim();
});
