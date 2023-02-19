// Update how many words a description has
countWords = (data) => {
    var n = data.value.length;
    document.getElementById("counter").innerHTML = `${n}/220`;
};

// Update the background of a card adding a cover to upload
changeCover = (data) => {
    image = window.URL.createObjectURL(data.files[0]);
    document.getElementById("preview").style.backgroundImage = `url(${image})`;
};

// List the names of the files to be uploaded in cards
displayUploads = (data) => {
    var files = data.files;
    var size = Object.values(files).length;
    var content = "";
    for (var i = 0; i < size; i++) {
        content += `<div class="content-card">${files[i].name}</div>`;
    }
    document.getElementById("content-uploaded").innerHTML = content;
};