$.extend({
    indexView: new function() {
        var self = this;
        var smController = new ScrollMagic.Controller();

        self.initialize = function() {
            attachBehavior();
        };


        var attachBehavior = function() {
            $('#contact-btn').bind('click', function() {
                if (checkFields() == false) {
                    self.showMessage('You must fill the required fields');
                    return;
                }
                $.ajax({
                    type: 'POST',
                    url: 'contact.php',
                    cache: false,
                    data: $('#contact-form').serialize(),
                    dataType: 'json',
                    success: function(result) {
                        cleanFields();
                        $('#answer-token').val(result.token);
                        $('#answer').attr('placeholder', result.question);

                        if (result.success == true) {
                            self.showMessage('You message has been send');
                        } else {
                            self.showMessage('Some problem sending your message');
                        }
                    }
                });
            });

            self.getCaptcha();

            self.getTeamMembers();

        }

        var cleanFields = function() {
            $('input[name="from"').val('');
            $('input[name="message"').val('');
            $('#answer').val('');
        }

        var checkFields = function() {
            if ($('input[name="from"').val() == null || $('input[name="message"').val() | $('#answer').val())
                return false;
            return true;
        }


        self.getCaptcha = function() {
            $.ajax({
                type: 'GET',
                url: 'contact.php?get_capcha=true',
                cache: false,
                //data: $('#contact-form').serialize(),
                dataType: 'json',
                success: function(result) {
                    $('#answer-token').val(result.token);
                    $('#answer').attr('placeholder', result.question);
                }
            });
        };

        self.getTeamMembers = function() {
            $.ajax({
                type: 'GET',
                url: 'http://prod.synchronit.com/appbase-webconsole/json',
                cache: false,
                data: {
                    command: ' GET PEOPLE with  isActive = true'
                },
                dataType: 'json',
                success: function(result) {
                    var headers = result.resultSet.headers;
                    var rows = result.resultSet.rows.sort(function(itemA, itemB) {
                        let nameA = itemA[0] + ' ' + itemA[1];
                        let nameB = itemB[0] + ' ' + itemB[1];

                        if (nameA > nameB)
                            return 1;
                        if (nameA < nameB)
                            return -1

                        return 0;
                    });

                    var panelBlock = '<div class="col-lg-3 col-md-4  col-sm-4 col-xs-6 col-exsm-12 team-item" style="opacity: 1;">';
                    var closedDiv = '</div>'
                    for (var i = 0; i < rows.length; i++) {

                        var block = '<div class="ch-item ch-img-' + rows[i][5] + '" ><div class="ch-info-wrap">';

                        var aLink = '<a href="#" data-toggle="modal" data-target="#' + rows[i][5] + '_modal">';
                        var info = '<div class="ch-info">';
                        var infoFront = '<div class="ch-info-front"></div>'
                        var infoBack = '<div class="ch-info-back">'
                        var backUpLine = '<h3>' + rows[i][0] + ' ' + rows[i][1] + '</h3>';
                        let titleFormated = rows[i][3].toString().replaceAll(',', '</br>')
                        var backDownLine = '<p>' + titleFormated + '</p>';
                        infoBack += backUpLine + backDownLine + closedDiv
                        info += infoFront + infoBack + closedDiv;

                        block += aLink + info + '</a>' + closedDiv + closedDiv;
                        var element = panelBlock + block + closedDiv;
                        $('.row', '#team-section ').append(element);
                    }

                    var tween = TweenMax.staggerFrom(".team-item", 0.8, {
                        opacity: 0,
                        delay: 0.3,
                        ease: Circ.easeOut
                    }, 0.03);
                    var scene = new ScrollMagic.Scene({
                        triggerElement: "#team-section"
                    }).setTween(tween).addTo(smController);
                }
            });
        }

        self.showMessage = function(message) {
            var response = '<h2 class="text-second">' + message + '</h2>';
            $('#send-message').html(response);
            $('#send-message').show();
        }

        var cleanFields = function() {
            $('input[name=from]').val('');
            $('textarea[name=message]').val('');
            $('input[name=answer]').val('');
        };

        var checkFields = function() {
            var fromr = $('input[name=from]').val();
            var message = $('textarea[name=message]').val();
            var answer = $('input[name=answer]').val();
            if (fromr == '' || message == '' || answer == '')
                return false;
            return true;
        };
    }
});

String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};

$(function() {
    $.indexView.initialize();
});