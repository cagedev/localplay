// function addMediaFile(evt, db) {
//   const transaction = db.transaction("mediaFiles", "readwrite");
//   const objSto = transaction.objectStore("mediaFiles");
// }

/**
 * @param {IDBDatabase} db
 * @param {int} idx - file index to retrieve
 * @param {Function} cb - callback to be called on the result
 */
function getMediaFile(db, idx, cb, ...args) {
  const objSto = db.transaction("mediaFiles").objectStore("mediaFiles");

  objSto.get(idx).onsuccess = (evt) => {
    const mf = evt.target.result;
    if (cb) {
      cb(mf, args);
    }
  };
}

/**
 *
 * @param {MediaFile} mf - media file to download
 */
function downloadMediaFile(mf) {
  // TODO check file validity
  let a = document.createElement("a");
  const blob = new Blob([mf.data], { type: mf.type });
  a.href = window.URL.createObjectURL(blob);
  a.download = mf.name;
  a.click();
  console.log(window.URL.revokeObjectURL(a.href));
}

/**
 *
 * @param {MediaFile} mf
 * @param {HTMLDivElement} pel - player container element
 */
function playMediaFile(mf, pel) {
  // TODO check validity
  // TODO handle other filetypes; use mf.type
  let p = pel[0];

  switch (mf.type.split("/")[0]) {
    case "image":
      let img = document.createElement("img");
      p.replaceChildren(img);

      const blob = new Blob([mf.data], { type: mf.type });
      const rdr = new FileReader();
      rdr.addEventListener("load", () => {
        img.src = rdr.result;
      });
      rdr.readAsDataURL(blob);
      break;
    default:
      console.log(`Cannot view file of type ${mf.type}`);
  }
}
