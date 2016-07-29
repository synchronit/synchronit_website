$.extend({
    indexView: new function() {
        var self = this;
        var smController = new ScrollMagic.Controller();
        var appBaseUrl = "http://prod.synchronit.com/appbase-webconsole/json";

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
                    data: $('form#contact-form').serialize(),
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
                url: appBaseUrl,
                cache: false,
                data: {
                    command: ' GET TEAM_MEMBERS with  isActive = true'
                },
                dataType: 'json',
                success: function(result) {

                    $('#loader').hide();

                    var headers = result.resultSet.headers;
                    var rows = result.resultSet.rows.sort(function(itemA, itemB) {
                        var nameA = itemA[0] + ' ' + itemA[1];
                        var nameB = itemB[0] + ' ' + itemB[1];

                        if (nameA > nameB)
                            return 1;
                        if (nameA < nameB)
                            return -1

                        return 0;
                    });

                    var panelBlock = '<div class="col-lg-3 col-md-4  col-sm-4 col-xs-6 col-exsm-12 team-item" style="opacity: 1;">';
                    var closedDiv = '</div>'
                    for (var i = 0; i < rows.length; i++) {

                        var block = '<div class="ch-item ">';
                        var image = '<img src="' + rows[i][4] + '" />'

                        var blockA = '<div class="ch-info-wrap">';
                        var aLink = '<a href="#" data-toggle="modal" data-target="#' + rows[i][7] + '_modal">';
                        var info = '<div class="ch-info">';
                        var infoFront = '<div class="ch-info-front"></div>'
                        var infoBack = '<div class="ch-info-back">'
                        var name = rows[i][0] + ' ' + rows[i][1];
                        var backUpLine = '<h3>' + rows[i][0] + ' ' + rows[i][1] + '</h3>';
                        var titleFormated = rows[i][3].toString().replaceAll(',', '</br>')
                        var backDownLine = '<p>' + titleFormated + '</p>';
                        infoBack += backUpLine + backDownLine + closedDiv
                        info += infoFront + infoBack + closedDiv;

                        block += image + blockA + aLink + info + '</a>' + closedDiv + closedDiv;
                        var element = panelBlock + block + closedDiv;
                        $('.row', '#team-section ').append(element);
                        var itemDialog = createModal(rows[i][5], rows[i][6], name, rows[i][7]);
                        $('#modals-values').append(itemDialog);
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

        function createModal(modalPicture, modalText, peopleName, invariant) {

            var closedDiv = '</div>'
            var dialog = '<div id="' + invariant + '_modal" class="modal fade" tabindex="-1" role="dialog">';
            var modal = '<div class="modal-dialog  modal-lg">';
            var modalContentDialog = '<div id="' + invariant + '_dialog" class="modal-content">';
            var modalHeader = '<div class="modal-header text-center">';
            var headerBtn = '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            var imgHeader = '<img src="' + modalPicture + '" width="200px">';
            var modalBodyBox = '<div class="modal-body clearfix">';
            var bodyTitle = '<h2 class="modal-title">' + peopleName + '</h2><hr>';

            modalBodyBox += bodyTitle + modalText + closedDiv;
            modalHeader += headerBtn + imgHeader + closedDiv;
            modalContentDialog += modalHeader + modalBodyBox + closedDiv;
            modal += modalContentDialog + closedDiv;
            dialog += modal + closedDiv;

            return dialog;
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