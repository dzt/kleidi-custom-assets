var stripe = Stripe(document.getElementById("publishable_key").value)
var elements = stripe.elements()
var complete = false;
var stripeSettings = {
    hidePostalCode: false,
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#fff",
            color: "#ffffff ",
            fontWeight: 400,
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            fontSize: "1rem",
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#495057"
            },
            ":-webkit-autofill": {
                color: "#fce883"
            }
        },
        invalid: {
            iconColor: "#eb1c26",
            color: "#eb1c26"
        }
    }
};

var card = elements.create('card', stripeSettings);

card.mount('#card-element')

card.addEventListener('change', function (event) {
    complete = event.complete;
    var displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});
/* Handle form submission */
var form = document.getElementById('payment-form');
var submitButton = document.getElementById('submit-button');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log(`complete: ${complete}`)
    if (complete) {
        submitButton.disabled = true
        let tokenData = {
            name: document.getElementById('fullName').value
        }
        stripe.createToken(card, tokenData).then(function (result) {
            if (result.error) {
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
                submitButton.disabled = false
            } else {
                stripeTokenHandler(result.token);
            }
        });
    } else {
        form.submit();
    }
});

function stripeTokenHandler(token) {
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    form.submit();
}