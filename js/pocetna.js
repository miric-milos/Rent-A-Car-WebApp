var automobiliPocetna = [];
$(document).ready(function () {
    $.post("ajax/prikazAutomobila.php", function (response) {
        automobiliPocetna = JSON.parse(response);

        let pocetnaPonude = automobiliPocetna.slice(0, 6);

        for (let auto of pocetnaPonude) {
            $("#ponudePocetna").append(
                `<div class="col-md-4">
                <div class="card mt-3 cardHover">
                    <img src="img/automobili/${auto['putanja_slike']}" class="card-img-top img-fluid" alt="najnoviji modeli">
                    <div class="card-body">
                        <h5 class="card-title">${auto['marka']} ${auto['model']} (${auto['godiste']} god.)</h5>
                        <h4 class="card-text"><b>${auto['cena_po_danu']}€</b></h4>

                    </div><a href="ponude.php?id_auto=${auto['id_auto']}" class="btn btn-info mt-3 mb-3 mr-4 ml-4 pt-2 pb-2">Detaljnije</a>
                </div>
            </div>`
            );
        }


        automobiliPocetna.sort((a, b) => {
            return a.godiste < b.godiste ? 1 : -1;
        });
        automobiliPocetna = automobiliPocetna.slice(0, 3);

        for (let auto of automobiliPocetna) {
            $("#najnovijiModeli").append(
                `<div class="col-md-4">
                <div class="card mt-3 najnovij">
                    <img src="img/automobili/${auto['putanja_slike']}" class="card-img-top img-fluid" alt="najnoviji modeli">
                    <div class="card-body">
                        <h5 class="card-title">${auto['marka']} ${auto['model']} (${auto['godiste']} god.)</h5>
                        <h4 class="card-text"><b>${auto['cena_po_danu']}€</b></h4>

                    </div>
                </div>
            </div>
        </div>`
            );

        };
    });
    $("#pretrazi").click(function () {
        window.location.href="ponude.php?pretraga="+$("#pretraga").val();
    })
});
