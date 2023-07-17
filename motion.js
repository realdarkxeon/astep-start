var accordion = document.getElementsByClassName("hobby-item")

for(var i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function() {
        this.classList.toggle("active-accordion");
        var knowMore = this.nextElementSibling;
        if(knowMore.style.display == "block") {
            knowMore.style.display = "none";
        }
        else {
            knowMore.style.display = "block";
        }
    });
}
