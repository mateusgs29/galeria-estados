import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByRegion(region){
    $('[wm-region]').each(function(i, e) {
        const isTarget = $(this).attr('wm-region') === region
            || region === null
        if(isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.regionButtons = function() {
    const cities = new Set
    $('[wm-region]').each(function(i, e) {
        cities.add($(e).attr('wm-region'))
    })
    
    const btns = Array.from(cities).map(region => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info']).html(region)
        btn.click(e => filterByRegion(region))
        return btn
    })
    
    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info', 'active']).html('Todas')
    btnAll.click(e => filterByRegion(null))
    btns.push(btnAll)
    
    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)
    
    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-region-buttons]').regionButtons()
})
