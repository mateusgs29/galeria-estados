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

function loadCards() {
    $.getJSON('/data.json', function(result) {
        const cards = []
        $.each(result, function(i, e) {
            const div = $('<div>').addClass(['col-12', 'col-md-6', 'col-lg-3'])
            const card = $('<div>').addClass(['card', 'mx-auto', 'mb-4']).css('width', '15rem')
            const image = $('<img>')
                .addClass(['card-img-top', 'border-bottom', 'border-secondary'])
                .attr('src', e.url)
                .attr('alt', `Bandeira ${e.nome}`)
            const cardBody = $('<div>').addClass('card-body')
            const h5 = $('<h5>').addClass('card-title').html(e.nome)
            const h6 = $('<h6>').addClass(['card-subtitle', 'mb-2', 'text-muted']).html(`Região ${e.regiao}`)

            cardBody.append(h5).append(h6)
            card.append(image).append(cardBody)
            div.append(card)

            cards.push(div)
        })

        $('[wm-includeCards]').html(cards)
    })
}

loadIncludes()
loadCards()
