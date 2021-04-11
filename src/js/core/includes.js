import $ from 'jquery'

const loadHtmlSuccessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSuccessCallbacks.includes(callback)) {
        loadHtmlSuccessCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data) {
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSuccessCallbacks.forEach(
                    callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

function createCard(element){
    const div = $('<div>').addClass(['col-12', 'col-md-6', 'col-lg-3'])
    const card = $('<div>').addClass(['card', 'mx-auto', 'mb-4'])
        .css('width', '15rem')
        .attr('wm-region', element.regiao)
    const image = $('<img>')
        .addClass(['card-img-top', 'border-bottom', 'border-secondary'])
        .attr({'src': element.url, 'alt': `Bandeira ${element.nome}`})
    const cardBody = $('<div>').addClass('card-body')
    const h5 = $('<h5>').addClass('card-title').html(element.nome)
    const h6 = $('<h6>').addClass(['card-subtitle', 'mb-2', 'text-muted']).html(`Região ${element.regiao}`)

    cardBody.append(h5).append(h6)
    card.append(image).append(cardBody)
    div.append(card)

    return div
}

function loadCards() {
    $.getJSON({
        url: '/data.json',
        success(data) {
            const cards = []
            $(data).each(function(i, e) {
                cards.push(createCard(e))
            })
            
            $('[wm-includeCards]').html(cards)
        }
    })
}

loadIncludes()
loadCards()
