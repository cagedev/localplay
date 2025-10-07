function addMediaFile(evt, db) {
  const transaction = db.transaction("mediaFiles", "readwrite");

  const objSto = transaction.objectStore("mediaFiles");
}
