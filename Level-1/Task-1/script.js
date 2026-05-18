function follow_up() {
            let name = prompt("What is your full name?");
            let company = prompt("What is your company/business name?");
            let job = prompt("Briefly tell us how you'd like us to help you?");
            let email = prompt("What is your email?");

            alert(`Thankyou ${name} for reaching out to us, we'll be in touch by email!✅`)
}

let button = document.querySelector(".BM-button");
        button.addEventListener("click", follow_up);
