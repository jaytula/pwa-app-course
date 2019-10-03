var dbPromise = idb.open("posts-store", 1, function(db) {
  if (!db.objectStoreNames.contains("posts")) {
    db.createObjectStore("posts", { keyPath: "id" });
  }
});

function writeData(st, data) {
    dbPromise.then(function(db) {
        var tx = db.transaction("posts", "readwrite");
        var store = tx.objectStore("posts");

        store.put(data);
        return tx.complete;
      });
}
