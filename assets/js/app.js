

const updateChart = (superHero) => {

    const chartContainer = $('#chartContainer')

    console.log(superHero)
    const powerStatsArray = $.map(superHero.powerstats, function (value, key) {
        return { y: value, label: key };
    })

    let options = {
        title: {
            text: `Estadisticas de Poder para ${superHero.name}`
        },
        animationEnabled: true,
        data: [{
            type: "pie",
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} ({y})",
            dataPoints: powerStatsArray
        }]

    }

    chartContainer.CanvasJSChart(options);

}


const showSuperHero = (superHero) => {
    const superHeroStage = $('#superHeroStage')
    superHeroStage.html(`
                <div class="card">
                <div class="row row-cols-2">
                    <img src="${superHero.image}" alt="">
                    <div class="card-body">
                        <h5>${superHero.name}</h5>
                        <p>Conexiones: ${superHero.connections}</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Publicado por: ${superHero.publisher} </li>
                            <li class="list-group-item">Ocupacion: ${superHero.occupation}</li>
                            <li class="list-group-item">Primera Aparicion: ${superHero.first_appearance}</li>
                            <li class="list-group-item">Altura: ${superHero.height.join(' - ')}</li>
                            <li class="list-group-item">Peso: ${superHero.weight.join(' - ')}</li>
                            <li class="list-group-item">Sobrenombres: ${superHero.aliases.join(', ')}.</li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div id="chartContainer" style="height: 450px; width: 50%;"></div>
    `)

    updateChart(superHero)
}


const getSuperHeroById = (id) => {
    $.ajax({
        url: `https://www.superheroapi.com/api.php/4905856019427443/${id}`,
        method: 'GET',
        success(response) {
            const mySuperHero = {
                image: response.image.url,
                name: response.name,
                connections: response.connections['group-affiliation'],
                publisher: response.biography.publisher,
                occupation: response.work.occupation,
                first_appearance: response.biography['first-appearance'],
                height: response.appearance.height,
                weight: response.appearance.weight,
                aliases: response.biography.aliases,
                powerstats: response.powerstats
            }

            showSuperHero(mySuperHero)
        },
        error(e) {
            console.log(e)
        }


    })

}




$('document').ready(function () {

    const superHeroForm = $('#superHeroForm')
    const superHeroInput = $('#superHeroInput')



    superHeroForm.on('submit', function (event) {
        event.preventDefault();
        superHeroInput.removeClass("is-valid is-invalid")


        const superHeroId = parseInt(superHeroInput.val())

        if (superHeroId > 0 && superHeroId < 733 && !isNaN(superHeroId)) {
            superHeroInput.addClass("is-valid")
            getSuperHeroById(superHeroId)
        } else {
            superHeroInput.addClass("is-invalid")
        }


    });





});