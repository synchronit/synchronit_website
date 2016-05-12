
$.extend({
    resourceView: new function () {
        var self = this;
        
        self.initialize = function () {            
            attachBehavior();
        };
        
        var attachBehavior = function () {
           //alert('bind behavior'); 
        };
    }

});

$(function () {
    $.resourceView.initialize();
});