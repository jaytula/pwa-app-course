self.addEventListener("install", function(event) {
  console.log("[Service Worker] Installing Server Worker ...", event);
});

self.addEventListener("active", function(event) {
  console.log("[Service Worker] Activating Server Worker ...", event);
  return self.clients.claim();
});
