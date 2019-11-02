var app = require('../config');

app.component('preloader', {
    
    templateUrl: 'app/views/preloader.html',
    
    controller: function () {
        var element = document.getElementById("preloader");
        element.setAttribute('class', 'on-load');
        setTimeout(function () {
            element.parentNode.removeChild(element);
        }, 2500);
    }
});


