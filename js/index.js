var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var displayContainer = document.getElementById("displayContainer");
var modalAlert = document.getElementById("modalAlert");


localStorage.getItem("bookmarksList")?(bookmarksList =JSON.parse(localStorage.getItem("bookmarksList")),displayFavourite()):bookmarksList =[];

var urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
var nameRegex = /^[a-zA-Z].{2,99}$/i;


function validateform(regex,element) {

    if (!regex.test(element.value)) {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    }
    else {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true  
    }


}

function  addBookmark(event){
    event.preventDefault();
    if(validateform(nameRegex,siteNameInput) && validateform(urlRegex,siteUrlInput)){
        var bookmark = {
            siteName:siteNameInput.value,
            siteUrl:siteUrlInput.value
        };
        bookmarksList.push(bookmark);
        localStorage.setItem("bookmarksList",JSON.stringify(bookmarksList));
        displayFavourite();
        clearForm();
    }
    else{
        showModal()
    }
   
}

function showModal() {
    modalAlert.classList.replace("d-none","d-flex");
}

function hideModal() {
    modalAlert.classList.replace("d-flex","d-none");
}

modalAlert.addEventListener('click', function(event) {
    var modalDialog = document.querySelector('.modal-dialog');
    if (!modalDialog.contains(event.target)) {
        hideModal();
    }
});

function clearForm(){
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.classList.remove("is-valid", "is-invalid");
    siteUrlInput.classList.remove("is-valid", "is-invalid");

}

//submit event
submitBtn.addEventListener("click", addBookmark);

function displayFavourite(){
    var cartona ="";
    for(var i=0 ; i<bookmarksList.length ; i++){
        cartona+=`<div  class="row text-capitalize py-2 border-bottom text-center" >
                            <p class="col-3">${i+1}</p>
                            <p class="col-3">${bookmarksList[i].siteName}</p>
                            <a target="_blank" href="${bookmarksList[i].siteUrl}" class="col-3 text-decoration-none">
                                <button class="btn btn-visit ">
                                    <i class="fa-solid fa-eye pe-2"></i> Visit
                                </button>
                            </a>
                            <div class="col-3 ">
                                <button onclick="deleteFavourite(${i})" class="btn btn-delete btn-danger ">
                                    <i class="fa-solid fa-trash-can pe-2"></i> Delete
                                </button>
                            </div>
    </div>`
    }
    displayContainer.innerHTML = cartona;
}

function deleteFavourite(index){
    bookmarksList.splice(index,1);
    localStorage.setItem("bookmarksList",JSON.stringify(bookmarksList));
    displayFavourite();
}





