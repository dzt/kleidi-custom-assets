let card;
let complete = false;
let stripe = Stripe(publishable_key);
let form = document.getElementById('update-form')
window.onload = function () {
    
    var elements = stripe.elements({
        fonts: [{
            cssSrc: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap',
        }]
    });

    var elementStyles = {
        base: {
            color: '#fff',
            fontWeight: 600,
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '14px',
            fontSmoothing: 'antialiased',

            ':focus': {
                color: '#fff',
            },

            '::placeholder': {
                color: '#8E8E8E',
            },

            ':focus::placeholder': {
                color: '#CFD7DF',
            },
        },
        invalid: {
            color: '#fff',
            ':focus': {
                color: '#FA755A',
            },
            '::placeholder': {
                color: '#FFCCA5',
            },
        },
    };

    var elementClasses = {
        focus: 'focus',
        empty: 'empty',
        invalid: 'invalid',
    };

    card = elements.create('card', {
        style: elementStyles,
        classes: elementClasses,
        placeholder: ''
    });

    card.mount('#card-element');

    card.addEventListener('change', function (event) {
        complete = event.complete;
        if (event.error) {
            notify('error', event.error.message);
        }
    });

    var submit = document.getElementById('submit-button')
    submit.addEventListener('click', convertCard)

    window.loaded = true

}

function convertCard (e) {
    e.preventDefault()
    if (complete) {
        let tokenData = {
            name: document.getElementById('fullName').value
        }
        stripe.createToken(card, tokenData).then(function (result) {
            if (result.error) {
                notify('error', result.error.message);
            } else {
                stripeTokenHandler(result.token);
            }
        });
    } else {
        form.submit();
    }
}

function stripeTokenHandler(token) {
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);
    form.submit();
}

function notify (type, message) {
    return new Noty({
        type: type,
        text: message,
        layout: 'bottomRight',
        theme: 'nest',
        timeout: '4000',
        progressBar: true,
        closeWith: ['click'],
        killer: true
    }).show();
}