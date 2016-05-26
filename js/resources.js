
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
                 
                 self.createSubscription(name, mail);                                  
             });
             
             self.getResoruces();
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
        
        self.getResoruces = function(){
           
               $.ajax({
                type: 'GET',
                url: 'http://dev.synchronit.com/appbase-webconsole/json?command=Get%20BOOKS',
                cache: false,
                //data: {catIs: catId},
                dataType: 'json',
                success: function (result) {
                    var headers = result.resultSet.headers;
                    var rows = result.resultSet.rows;
                    
                    var panelBlock = '<div class="panel panel-default">';
                    var closedDiv = '</div>'
                    for(var i=0; i< rows.length; i++){
                        var panel = '<div class="panel-body">';
                        var panelImage = '<div class="col-lg-2 col-md-3  col-sm-3 col-xs-5"><img src="./img/books/' + rows[i][8] + '"/>' + closedDiv;
                        var panelData = '<div class="col-lg-9 col-md-8  col-sm-8 col-xs-10">';
                        var tableData = '<table class="table">';
                        var bookTitle = '<tr><td>Title</td><td>' + rows[i][0] + '</td></tr>';
                        var bookSummary = '<tr><td>Summary</td><td>' + rows[i][3] + '</td></tr>';
                        var bookComments = '<tr><td>Comments</td><td>' + rows[i][4] + '</td></tr>';
                        var bookLevel = '<tr><td>Level</td><td>' + rows[i][5] + '</td></tr>';
                        var bookAudience = '<tr><td>Audience</td><td>' + rows[i][6] + '</td></tr>';
                        var bookWyl = '<tr><td>What you learn</td><td>' + rows[i][7] + '</td></tr>';
                        var bookAuthor = '<tr><td>Author</td><td>' + rows[i][1] + '</td></tr>';
                        
                        var tableElement = tableData + bookTitle + bookSummary + bookComments + bookLevel + bookAudience + bookWyl + bookAuthor + '</table>'
                        
                        var element = panelBlock + panel + panelImage + tableElement + closedDiv + closedDiv;  
                        $('#resourceStore').append(element)
                    }
                }
            }); 
        };
        
        self.createSubscription = function(name, mail){
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
        };
    }

});

$(function () {
    $.resourceView.initialize();
});

$('#form_modal').on('shown.bs.modal', function () {
    $('#title').focus()
})
