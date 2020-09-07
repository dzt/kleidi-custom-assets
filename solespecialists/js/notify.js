var notificationPosition = 'bottomRight';

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    notificationPosition = 'bottomCenter';
}

Noty.overrideDefaults({    
    layout: notificationPosition,
    theme: 'nest',
    timeout: '4000',
    progressBar: true,
    closeWith: ['click'],
    killer: true
});