
let botao = document.querySelector('.button')

botao.addEventListener('click', () => {
    let ano = document.querySelector('.input-dolar').value
    let url = 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/'
    url += 'CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?'
    url += '@dataInicial=%2701-01-' + ano.toString() + '%27&@dataFinalCotacao=%2712-31-' + ano.toString() + '%27&$format=json'
    
    fetch(url).then(resp => {
        return resp.json()
    })
        .then(elm => trataApi(elm.value))
        .catch(erro => console.log(erro))


    function trataApi(elemApi) {
        let meses = []

        for (let i = 1; i <= 12; i++) {
            let parseString = (i).toString()
            let mes = parseString.padStart(2, '0')
            const mes_filtrado = elemApi.filter(obj => obj.dataHoraCotacao.slice(5, 7) == mes)
            mes_filtrado.sort(function compara(a, b) {
                if (a.cotacaoVenda > b.cotacaoVenda) return 1
                if (a.cotacaoVenda < b.cotacaoVenda) return -1
                return 0
            })
            meses.push(mes_filtrado)
        }
        console.log('Ano de referência:', ano.toString())
        var x_lista = []
        var y_lista = []

        for (let val of meses) {
            let ultimoElemento = val.slice(-1)[0]

            x_lista.push(ultimoElemento.dataHoraCotacao.slice(5, 7))
            y_lista.push(ultimoElemento.cotacaoVenda)

        }

        let trace = {
            x: x_lista,
            y: y_lista,
            type: 'scatter',
            line: {
                color: 'green',
                width: 3
            }
        }

        let data = [trace];

        let layout = {
            title: 'Valor mais alto de cada mês do ano ' + ano
        };

        Plotly.newPlot('myDiv', data, layout);

    }
})

