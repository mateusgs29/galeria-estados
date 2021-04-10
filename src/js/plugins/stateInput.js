import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByState(state){
    $('[wm-region]').each(function(i, e) {
        const title = $(this).find('.card-title').html()
        if(title.toUpperCase().indexOf(state.toUpperCase()) > -1) {
            $(this).parent().css('display', '')
        } else {
            $(this).parent().css('display', 'none')
        }
    })
}

$.fn.stateInput = function() {
    const inputGroup = $('<div>').addClass(['input-group', 'mb-3'])
    const input = $('<input>').addClass('form-control').attr('type', 'text')
    const inputGroupAppend = $('<div>').addClass('input-group-append')
    const icone = $('<span>').addClass('input-group-text')
        .append($('<i>').addClass(['fa', 'fa-search']))

    input.keyup(function(e) {
        filterByState($(this).val())
    })
    inputGroupAppend.append(icone)
    inputGroup.append(input).append(inputGroupAppend)
    
    $(this).html(inputGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-state-input]').stateInput()
})