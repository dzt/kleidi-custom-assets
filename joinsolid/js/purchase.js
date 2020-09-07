let cardNumber;
let stripe = Stripe(publishable_key);
window.onload = function () {
    
    var elements = stripe.elements({
        fonts: [{
            cssSrc: 'https://fonts.googleapis.com/css?family=Quicksand',
        }]
    });

    var elementStyles = {
        base: {
            color: '#fff',
            fontWeight: 600,
            fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':focus': {
                color: '#fff',
            },
            '::placeholder': {
                color: '#9BACC8',
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

    cardNumber = elements.create('cardNumber', {
        style: elementStyles,
        classes: elementClasses,
        placeholder: ''
    });
    cardNumber.mount('#cardNumber');

    var postalCode = elements.create('postalCode', {
        style: elementStyles,
        classes: elementClasses,
        placeholder: ''
    });
    postalCode.mount('#postalCode');

    var cardExpiry = elements.create('cardExpiry', {
        style: elementStyles,
        classes: elementClasses,
        placeholder: ''
    });
    cardExpiry.mount('#exp');

    var cardCvc = elements.create('cardCvc', {
        style: elementStyles,
        classes: elementClasses,
        placeholder: ''
    });
    cardCvc.mount('#cvc');

    var submit = document.getElementById('submit-button')
    submit.addEventListener('click', convertCard)

    window.loaded = true

}

function convertCard (e) {
    e.preventDefault()
    return stripe.createToken(cardNumber).then(function (result) {
        if (result.error) {
            new Noty({
                type: 'error',
                text: result.error.message,
                layout: 'bottomRight',
                theme: 'nest',
                timeout: '4000',
                progressBar: true,
                closeWith: ['click'],
                killer: true
            }).show();
            return
        }

        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', result.token.id);
        form.appendChild(hiddenInput);

        var bundleInput = document.createElement('input');
        bundleInput.setAttribute('type', 'hidden');
        bundleInput.setAttribute('name', 'bundle');
        bundleInput.setAttribute('value', selected);
        form.appendChild(bundleInput);

        return form.submit();
    })
}