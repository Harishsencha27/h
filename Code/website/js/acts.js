

// Get the modal
var modalAdd = document.getElementById('myModal');
var modalDelete = document.getElementById('myModal1');

// Get the button that opens the modal
var btn = document.getElementById("upload");
var btn1 = document.getElementById("delete");

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modalAdd.style.display = "block";
}
btn1.onclick = function() {
    modalDelete.style.display = "block";
}

