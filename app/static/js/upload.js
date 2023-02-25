let enable = -2;

// Update how many words a description has
countWords = (data) => {
    var n = data.value.length;
    document.getElementById("counter").innerHTML = `${n}/220`;
};

// Update the background of a card adding a cover to upload
changeCover = (data) => {
    document.getElementById("submit").disabled = true;
    image = window.URL.createObjectURL(data.files[0]);
    document.getElementById("preview").style.backgroundImage = `url(${image})`;
    document.getElementById("submit").disabled = !(verifyCover(document.getElementById("cover")) && verifyContent(document.getElementById("content"))); 
};

// List the names of the files to be uploaded in cards
displayUploads = (data) => {
    var files = data.files;
    var size = Object.values(files).length;
    var content = "";
    for (var i = 0; i < size; i++)
        content += `<div class="content-card">${files[i].name}</div>`;
    
    document.getElementById("content-uploaded").innerHTML = content;
    document.getElementById("submit").disabled = !(verifyCover(document.getElementById("cover")) && verifyContent(document.getElementById("content"))); 

};

verifyCover = (selector) => {
    const coverExt = new Set(["png", "jpg", "jpeg"]);
    let pathContent = selector.value.split('.');
    let extension = pathContent[pathContent.length - 1];

    return coverExt.has(extension);
}

verifyContent = (selector) => {
    document.getElementById("submit").disabled = false;

    const validExt = new Set(["png", "jpg", "jpeg", "md"]);

    var files = selector.files;
    var size = Object.values(files).length;
    for (var i = 0; i < size; i++) {
        let pathContent = files[i].name.split('.');
        let extension = pathContent[pathContent.length - 1];

        if (!validExt.has(extension)) {
            return false;
        } else if (extension == "md") {
            validExt.delete("md");
        }
    }

    return !validExt.has("md")
};