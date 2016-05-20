//$.extend({
//    indexView: new function () {
//        var self = this;
//        var smController = new ScrollMagic.Controller();
        
//        self.initialize = function () {            
//            attachBehavior();
//        };
        
//        var attachBehavior = function () {
//            $.ajax({
//                type: 'GET',
//                url: 'http://dev.synchronit.com/appbase-webconsole/json?command=Get%20PEOPLE',
//                cache: false,
//                //data: {catIs: catId},
//                dataType: 'json',
//                success: function (result) {
//                    var headers = result.resultSet.headers;
//                    var rows = result.resultSet.rows;
                    
//                    var panelBlock = '<div class="col-lg-3 col-md-4  col-sm-4 col-xs-6 team-item">';
//                    var closedDiv = '</div>'                    
//                    for(var i=0; i< rows.length; i++){
//                        var background = 'background-image: url(' + /*window.location +*/ './img/team/' + rows[i][4] + ')'
//                        var block = '<div class="ch-item" style=" '+ background +'" ><div class="ch-info-wrap"><div class="ch-info">';
                        
//                        var infoFront = '<div class="ch-info-front">' + closedDiv;
                        
//                        var infoBack = '<div class="ch-info-back">'
//                        var backUpLine = '<h3>' + rows[i][0] + ' ' + rows[i][1] + '</h3>';
//                        var backDownLine = '<p>' + rows[i][3] + '</p>';
//                        infoBack += backUpLine + backDownLine + closedDiv
                        
//                        block += infoFront + infoBack + closedDiv;
//                        var element = panelBlock + block + closedDiv;
//                        $('.row', '#team-section ').append(element);
//                    }
                    
//                    var tween = TweenMax.staggerFrom(".team-item", 0.8, { opacity: 0, delay: 0.3, ease: Circ.easeOut }, 0.03);
//                    var scene = new ScrollMagic.Scene({ triggerElement: "#team-section" }).setTween(tween).addTo(smController);
//                }
//            });
//        }
//    }
//});

//$(function () {
//    $.indexView.initialize();
//});