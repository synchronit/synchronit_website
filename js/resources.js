
$.extend({
    resourceView: new function () {
        var self = this;
        
        self.initialize = function () {            
            attachBehavior();
        };
        
        var attachBehavior = function () {
             $('#send-btn').bind('click', function(){
                 if(self.checkFields() == false ){
                     self.showMessage('You must type all fields');
                     return;
                 }
                 
                 var name = $('input[name=name]').val(); 
                 var mail = $('input[name=mail]').val();
                 
                 $.ajax({
                        type: 'GET',
                        url: 'http://dev.synchronit.com/appbase-webconsole/json',//command=Create%20New%20SUBSCRIPTIONS%20(%20' + name + ',%20' + mail + '%20)',
                        cache: false,                        
                        dataType: 'json',
                        data:{
                            command:'Create New SUBSCRIPTIONS ( "' + name + '", "' + mail + '" )'
                        },
                        success: function (result) {
                            self.cleanFields();
                            
                            if(result.code == 102){
                                self.showMessage('Your subscription has been stored successfuly');
                            }
                            else{
                                self.showMessage('Problem stored your subscription');
                            }
                        }
                    });
                 
             });
             
           $.ajax({
                type: 'GET',
                url: 'http://dev.synchronit.com/appbase-webconsole/json?command=Get%20BOOKS',
                cache: false,
                //data: {catIs: catId},
                dataType: 'json',
                success: function (result) {
                    var headers = result.resultSet.headers;
                    var rows = result.resultSet.rows;
                    
                    var panelBlock = '<div class="col-lg-4 col-md-4 col-sm-12 text-center">';
                    var closedDiv = '</div>'
                    for(var i=0; i< rows.length; i++){
                        var panel = '<div class="panel panel-creative-black">';
                        var panelHead = '<div class="panel-heading"><h3>' + rows[i][1] + '</h3>' + '</div>';
                        var panelImage = '<div class="panel-body"><img src="img/mapas/suecia.png" class="img-responsive center-block" /></div>';
                        var panelFooter = '<div class="panel-footer">';
                        var summary = '<label>Summary: </label><span>' + rows[i][2] + '</span></br>';
                        var comment = '<label>Comments: </label><span>' + rows[i][3] + '</span></br>';
                        var author = '<label>Author: </label><span>' + rows[i][4] + '</span></br>';
                        panelFooter += summary + comment + author + closedDiv;
                         
                        
                        var element = panelBlock + panel + panelHead + panelImage + panelFooter + closedDiv + closedDiv;  
                        $('#resourceStore').append(element)
                    }
                }
            });
        };
        
        self.showMessage = function(message){
            var response = '<h2 class="text-second">'+ message + '</h2>';
            $('#send-message').html(response);
            $('#send-message').show();
        }
        self.cleanFields = function(){
            $('input[name=name]').val(''); 
            $('input[name=mail]').val(''); 
        }
        
        self.checkFields = function(){
            var name = $('input[name=name]').val(); 
            var mail = $('input[name=mail]').val(); 
            
            if((name == '' || name == undefined) || (mail == '' || mail == undefined))
                return false;
            return true;
        };
    }

});

$(function () {
    $.resourceView.initialize();
});

$('#form_modal').on('shown.bs.modal', function () {
    $('#title').focus()
})
