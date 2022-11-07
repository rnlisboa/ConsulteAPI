/// CLIMA
/*
fetch('https://apitempo.inmet.gov.br/condicao/capitais/2022-11-06')
.then(resp => resp.json())
.then(elem => trataApiClima(elem))

function trataApiClima(elem){
    var cidades = []
    for (let val of elem){
        //console.log(val.CAPITAL, val.TMAX18.replace('*', '°'))
        console.log(val)
        cidades.push(val)
    }

    setInterval(()=>{
        let cidadeNome = document.querySelector('.cidade-nome')
        let infoNome = document.querySelector('.info-cidade')
        let tempMax = document.querySelector('.temp-max')
        let tempMin = document.querySelector('.temp-min')

        let index = Math.floor(Math.random() * 26)
        console.log(index)
        cidadeNome.innerHTML = cidades[index].CAPITAL
        infoNome.innerHTML = cidades[index].CAPITAL
        tempMax.innerHTML  = cidades[index].TMAX18
        tempMin.innerHTML = cidades[index].TMIN18
                     
    }, 3000)
}
*/
/// CLIMA

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation não é suportada neste navegador.");
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var latConcat = (Number(latitude).toFixed(2)).toString()
    var longitude = position.coords.longitude;
    var lonConcat = (Number(longitude).toFixed(2)).toString()

    trataApiClima(latConcat, lonConcat)
}


function trataApiClima(latConcat, lonConcat){
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latConcat +'&longitude='+ lonConcat +'&hourly=temperature_2m')
    .then(resp => resp.json())
    .then(elem => trataApiClima(elem))

function trataApiClima(elem) {
    let listaHoras_X = []
    let listaTemp_Y = []

    let date = new Date()

    let data_atual = document.querySelector('.info-data');
    let hight = document.querySelector('.hight-temp');
    let low = document.querySelector('.low-temp');
    let temp_now = document.querySelector('.now-temp');
    let elevation = document.querySelector('.elevation-temp');
    
    
    
    
    
    for (let i = 0; i < elem.hourly.time.length; ++i){
        listaHoras_X.push(Number((elem.hourly.time[i].slice(11, 16)).slice(0, 2)))
        listaTemp_Y.push(elem.hourly.temperature_2m[i])
        
    }
    
    console.log(elem)
    let day_x = [...listaHoras_X.slice(0,24)]
    let day_y = [...listaTemp_Y.slice(0,24)]
    
    var max_temp = Math.max.apply(null, day_y);
    var min_temp = Math.min.apply(null, day_y);
    

    hight.innerHTML = `${max_temp.toString()}°`
    low.innerHTML = `${min_temp.toString()}°`
    elevation.innerHTML = elem.elevation

    let trace = {
        x: day_x,
        y: day_y,
        type: 'scatter',
        line: {
            color: 'blue',
            width: 3
        }
    }

    let data = [trace];

    let layout = {
        title: 'Variação da temperatura por hora (na escala celsius)'
    };

    Plotly.newPlot('myDivWeather', data, layout);
    
}
}

getLocation()


