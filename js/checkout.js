const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // contact info

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // shipping info

    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const address = document.getElementById("address").value.trim();
    const zip = document.getElementById("zip").value.trim();

    // empty field validation

    if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        phone === "" ||
        country === "" ||
        city === "" ||
        address === "" ||
        zip === ""
     ) {
        alert("Pleaser fill in all required fields");

        return;
    }

    // email validation 
    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {
        alert("Please enter a valid email address.");

        return;
    }
    //phone validation
    //if (isNaN(phone)) {
    const phonePattern = /^[+]?[0-9]+$/;
    if(!phonePattern.test(phone)) {
        alert("Please enter a valid phone number.")
        //alert("Phone number must contain numbers only.")

        return;
    }
    // success 
    alert("Order placed successfully!");

    // extra stuff save check out info
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    
    
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    
    
    localStorage.setItem("country", country);
    localStorage.setItem("city", city);
    localStorage.setItem("address", address);
    localStorage.setItem("zip", zip);

    localStorage.setItem(
        "paymentMethod",
        getSelectedPaymentMethod()
    );
    function getSelectedPaymentMethod() {
        if (document.getElementById("creditCard").checked) {
            return "Credit Card";
        }
        if (document.getElementById("paypal").checked){
            return "PayPal";
        }
        if (document.getElementById("bankTransfer").checked) {
            return "Bank Transfer";
        }
        return "Unknown";
    }
    window.location.href = "receipt.html";
}); 

/* toggle */
const creditCard =
document.getElementById("creditCard");

const paypal =
document.getElementById("paypal");

const bankTransfer =
document.getElementById("bankTransfer");

const creditCardSection = 
document.getElementById("creditCardSection")

const paypalSection = 
document.getElementById("paypalSection")

const bankTransferSection =
document.getElementById("bankTransferSection");

// default page load
    creditCardSection.style.display = "block";
    paypalSection.style.display = "none";
    bankTransferSection.style.display = "none";

// credit card 
creditCard.addEventListener ("change", function () {
   creditCardSection.style.display = "block";
    paypalSection.style.display = "none";
    bankTransferSection.style.display = "none";
});
// paypal 
paypal.addEventListener("change", function() {
    creditCardSection.style.display = "none";
    paypalSection.style.display = "block";
    bankTransferSection.style.display = "none";
});

// bank transfer 
bankTransfer.addEventListener("change", function () {
    creditCardSection.style.display = "none";
    paypalSection.style.display = "none";
    bankTransferSection.style.display = "block";
});

/* toggle delivery method */
const shipping =
document.getElementById("shipping");

const pickup =
document.getElementById("pickup");

const shippingSection =
document.getElementById("shippingSection");

const pickupSection = 
document.getElementById("pickupSection")

// default state
shippingSection.style.display = "none";
pickupSection.style.display = "none";


// shipping selected
shipping.addEventListener("change", function (){
    shippingSection.style.display = "block";
    pickupSection.style.display = "none";
});

// pickup selectedf
pickup.addEventListener("change", function() {
    shippingSection.style.display = "none";
    pickupSection.style.display = "block";
});