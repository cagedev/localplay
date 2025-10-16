class MediaFile {
  name;
  type;
  lastModified;
  size;
  data;

  key;

  constructor(name, type, lastModified, size, key) {
    this.name = name;
    this.type = type;
    this.lastModified = lastModified;
    this.size = size;
    this.key = key;
  }
}

/**
 * Create an HTMLTableRowElement from a MediaFile
 * @param {MediaFile} mf
 * @param {boolean} hdr
 * @returns {HTMLTableRowElement}
 */
function createTrFromMediaFile(mf, hdr = false, mnl = 24, mtl = 12) {
  const tn = hdr ? "th" : "td";
  let tr = document.createElement("tr");

  let thName = document.createElement(tn);
  thName.innerText =
    mf.name.length > mnl ? `${mf.name.substring(0, mnl)}...` : mf.name;
  tr.appendChild(thName);

  let thType = document.createElement(tn);
  thType.innerText =
    mf.type.length > mtl ? `${mf.type.substring(0, mtl)}...` : mf.type;
  tr.appendChild(thType);

  let thLastMod = document.createElement(tn);
  thLastMod.innerText = Number.isInteger(mf.size)
    ? new Date(mf.lastModified).toISOString()
    : mf.lastModified;
  tr.appendChild(thLastMod);

  let thSize = document.createElement(tn);
  // thSize.innerText = mf.size;
  thSize.innerText = Number.isInteger(mf.size) ? formatBytes(mf.size) : mf.size;
  thSize.style.textAlign = "right";
  tr.appendChild(thSize);

  let thActions = document.createElement(tn);
  // thSize.innerText = mf.size;
  thActions.innerHTML = hdr ? "Actions" : `<a>${mf.key}</a>`;
  tr.appendChild(thActions);

  return tr;
}

function formatBytes(bytes, decimals) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
