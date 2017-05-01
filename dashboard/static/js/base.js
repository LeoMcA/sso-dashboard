$(document).ready(function(){
    'use strict';

    $('[data-toggle~=collapse]').click(function(){
        $('.opacity').toggle();
    });

    // This is the js that powers the search box
    $(':input[name=filter]').on('input', function() {
        // Get value just typed into textbox -- see .toLowerCase()
        var val = this.value.toLowerCase();

        // Find all .user-profile divs
        $('#app-grid').find('.app-tile')
        // Find those that should be visible
        .filter(function() {
            return $(this).data('id').toLowerCase().indexOf( val ) > -1;
        })
        // Make them visible
        .show()
        // Now go back and get only the visible ones
        .end().filter(':visible')
        // Filter only those for which typed value 'val' does not match the `data-id` value
        .filter(function() {
            return $(this).data('id').toLowerCase().indexOf( val ) === -1;
        })
        // Fade those out
        .fadeOut();
    });

    // Search input: Highlight, Align, Focus
    var filter = $(':input[name=filter]');
    $(filter).focus();
    $('.filter .mui-textfield').addClass('yellow-border');
    $('.filter img').addClass('yellow-border');
    $('svg.clear').addClass('yellow-border');
    $(filter).focusin(function() {
        $(filter).css('text-align', 'left');
    });
    $(filter).on('focusin mouseover', function() {
        $('.filter .mui-textfield').addClass('yellow-border');
        $('.filter img').addClass('yellow-border');
        $('svg.clear').addClass('yellow-border');
    });
    $(filter).mouseout(function() {
        var focus = $(filter).is(':focus');
        if (!focus) {
            $('.filter .mui-textfield').removeClass('yellow-border');
            $('.filter img').removeClass('yellow-border');
            $('svg.clear').removeClass('yellow-border');
        }
    });
    $(filter).focusout(function() {
        $('.filter .mui-textfield').removeClass('yellow-border');
        $('.filter img').removeClass('yellow-border');
        $('svg.clear').removeClass('yellow-border');
        if ($(filter).val() == '') {
            $(filter).css('text-align', 'center');
        } else {
            $(filter).css('text-align', 'left');
        }
    });

    // Clear the search
    $('svg.clear').click(function() {
        $(filter).val('');
        $('#app-grid').find('.app-tile').show();
        $(filter).css('text-align', 'center');
    });

    // Search input mobile: Align
    var filter_mobile = $('.search-mobile :input[name=filter]');
    $(filter_mobile).focusin(function() {
        $(filter_mobile).css('text-align', 'left');
    });
    $(filter_mobile).focusout(function() {
        if ($(filter_mobile).val() == '') {
            $(filter_mobile).css('text-align', 'center');
        } else {
            $(filter_mobile).css('text-align', 'left');
        }
    });

    // Highlight app tiles
    $('a.app-tile').hover(
        function() {
            $(this).find('.app-logo').addClass('yellow-border');
        },
        function() {
            $(this).find('.app-logo').removeClass('yellow-border');
        }
    );

    // Mobile search toggle
    $('.search-button a').click(function() {
        $('.search-mobile').fadeToggle();
        $('.search-button').toggleClass('invert');
    });
});
