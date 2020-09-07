var stripe = Stripe(document.getElementById("publishable_key").value)
var elements = stripe.elements()
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

// Handle form submission
var form = document.getElementById('payment-form');
var submitButton = document.getElementById('submit-button');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    submitButton.disabled = true
    stripe.createToken(card, {
        name: document.getElementById('fullName').value
    }).then(function (result) {
        if (result.error) {
            submitButton.disabled = false
            new Noty({
                type: 'error',
                timeout: 5000,
                text: result.error.message
            }).show();
        } else {
            stripeTokenHandler(result.token);
        }
    });
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