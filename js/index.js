$.extend({
    indexView: new function () {
        var self = this;
        var smController = new ScrollMagic.Controller();
        
        self.initialize = function () {            
            attachBehavior();
        };
        
        var attachBehavior = function () {
            $('#contact-btn').bind('click', function(){
                if(checkFields() == false)
                {
                    self.showMessage('You must fill the required fields');
                    return;
                }
                $.ajax({
                    type: 'POST',
                    url: 'contact.php',
                    cache: false,
                    data: $('#contact-form').serialize(),
                    dataType: 'json',
                    success: function (result) {
                            cleanFields();
                            $('#answer-token').val(result.token);
                            $('#answer').attr('placeholder',result.question);
                        
                            if(result.success == true){
                                self.showMessage('You message has been send');
                            }
                            else{
                                self.showMessage('Some problem sending your message');
                            }
                        }
                    });
            });
            
            self.getCaptcha();
            
            self.getTeamMembers();          
            
        }
        
        self.getCaptcha = function(){
            $.ajax({
                type: 'GET',
                url: 'contact.php?get_capcha=true',
                cache: false,
                //data: $('#contact-form').serialize(),
                dataType: 'json',
                success: function (result) {
                    $('#answer-token').val(result.token);
                    $('#answer').attr('placeholder',result.question);
                }
                });
        };
        
        self.getTeamMembers = function(){
            $.ajax({
                type: 'GET',
                url: 'http://dev.synchronit.com/appbase-webconsole/json?command=Get%20PEOPLE',
                cache: false,
                //data: {catIs: catId},
                dataType: 'json',
                success: function (result) {
                    var headers = result.resultSet.headers;
                    var rows = result.resultSet.rows;
                    
                    var panelBlock = '<div class="col-lg-3 col-md-4  col-sm-4 col-xs-6 team-item">';
                    var closedDiv = '</div>'                    
                    for(var i=0; i< rows.length; i++){
                        var background = 'background-image: url(' + /*window.location +*/ './img/team/' + rows[i][4] + ')'
                        var block = '<div class="ch-item" style=" '+ background +'" ><div class="ch-info-wrap"><div class="ch-info">';
                        
                        var infoFront = '<div class="ch-info-front">' + closedDiv;
                        
                        var infoBack = '<div class="ch-info-back">'
                        var backUpLine = '<h3>' + rows[i][0] + ' ' + rows[i][1] + '</h3>';
                        var backDownLine = '<p>' + rows[i][3] + '</p>';
                        infoBack += backUpLine + backDownLine + closedDiv
                        
                        block += infoFront + infoBack + closedDiv;
                        var element = panelBlock + block + closedDiv;
                        $('.row', '#team-section ').append(element);
                    }
                    
                    var tween = TweenMax.staggerFrom(".team-item", 0.8, { opacity: 0, delay: 0.3, ease: Circ.easeOut }, 0.03);
                    var scene = new ScrollMagic.Scene({ triggerElement: "#team-section" }).setTween(tween).addTo(smController);
                }
            });
        };
        
        self.showMessage = function(message){
            var response = '<h2 class="text-second">'+ message + '</h2>';
            $('#send-message').html(response);
            $('#send-message').show();
        }
        
        var cleanFields = function(){
          $('input[name=name]').val('');  
          $('input[name=from]').val('');
          $('input[name=subject]').val('');
          $('textarea[name=message]').val('');
          $('input[name=answer]').val('');
        };
        
        var checkFields = function(){
            var fromr = $('input[name=from]').val(); 
            var subject = $('input[name=subject]').val(); 
            var message = $('textarea[name=message]').val(); 
            var answer = $('input[name=answer]').val(); 
            if(fromr == '' || subject == '' || message == '' || answer == '' )
                return false;
            return true;
        };
    }
});

$(function () {
    $.indexView.initialize();
});