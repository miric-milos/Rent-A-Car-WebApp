let automobils;
let minDate=new Date();
let modal = "myModal";
let modalProvere1 = "modalDodavanja";
let modalProvere2 = "modalBrisanja";
$(document).ready(() => {
    $(".naslov").animate({opacity: '1'}, 1000);

    popunjavanjeAutomobila();
    dugmeDodaj();
    $("#odaberiKola").change(popuniPoljaAuto);
    $("#odaberiKola").change(dugmeDodaj);
    $("#btnDodaj").on("click", novAuto);
    $("#btnSacuvaj").on("click", izmeni);
    $("#btnDodajNovi").on("click", novAuto);
    // $("#btnDodajNovi").click(() => { console.log($("#slikaAuto").val()); });
    $("#btnObrisi").on("click", obrisi);

    $("#btnDaObrisi").on('click', obrisiAuto);
    $("#btnDa").on('click', submit);

    $("#btnClose").click(function () {
        location.reload();
    });

    $("#slikaAuto").change(function () {
        let putanja = $("#slikaAuto").val().split("\\")[2];
        $("#slikaAutomobila").attr("src", "img/automobili/" + putanja);
    })


//PRETRAGA AUTOMOBILA ZA ADMIN

    $("#btnPretraga").click(function () {
        $.post("ajax/prikazAutomobila.php",function (response) {
            let automobili=JSON.parse(response);
            automobili=pretragaAutomobila(automobili,$("#pretraga").val());
            if(automobili.length===0){
                $("#automobili").html("<p class='display-4 mt-5 text-center'>Nema pronađenih</p>");
            }
            else
                prikaziAutomobileAdmin(automobili);

        })
    });

    $("#btnPretraziPoDatumu").click(() => {
        let datumOd = new Date($("#datumOd").val());
        let datumDo = new Date($("#datumDo").val());
        let rezervacije=null;
        let automobili=null;


        $.post("ajax/dohvatiDatumeZaSveRezervacije.php",function (response) {
            rezervacije=JSON.parse(response);

            $.post("ajax/prikazAutomobila.php",function (response) {
                automobili=JSON.parse(response);
                for (let r of rezervacije){
                    for (let a of automobili){
                        if(r.id_auto===a.id_auto){
                            if(dateRangeOverlaps(datumOd.getTime(),datumDo.getTime(),new Date(r.datum_od).getTime(),new Date(r.datum_do).getTime())){
                                automobili.splice(automobili.indexOf(a),1);
                            }
                        }
                    }
                }

                prikaziAutomobileAdmin(automobili);

            });

        });



    });

    $("#datumOd").datepicker({
        showAnimation: 'drop',
        numberOfMonth: 1,
        changeYear: true,
        changeMonth: true,
        showWeek: true,
        weekHeader: "",
        minDate:  minDate,
        showOtherMonths: true,
        dateFormat: 'yy-mm-dd',
        onClose: function (izabranDatum) {
            $("#datumDo").datepicker("option", "minDate", izabranDatum);
        }
    });

    $("#datumDo").datepicker({
        showAnimation: 'drop',
        numberOfMonth: 1,
        minDate: new Date(),
        showOtherMonths: true,
        dateFormat: 'yy-mm-dd',
        changeYear: true,
        changeMonth: true,
        showWeek: true,
        weekHeader: ""
    });

});

function prikaziAutomobileAdmin(auto) {
    let html="";
    html+="<div class='row'>";
    for (let a of auto){
        html+=`<div class="col-md-4">
                <div class="card mt-3 najnovij">
                    <img src="img/automobili/${a.putanja_slike}" class="card-img-top img-fluid" alt="${a.marka}">
                    <div class="card-body">
                        <h5 class="card-title">${a.marka} ${a.model} (${a.godiste} god.)</h5>
                        <h4 class="card-text"><b>${a.cena_po_danu}€</b></h4>
                        <a class='mt-3 btn btn-outline-info btn-block' href='administracija.php#selAuto' id='btnIzmeni' onclick='izmeniKola(${a.id_auto})'>Izmeni</a>
                    </div>
                </div>
            </div>`;
    }
    html+="</div>";

    $("#automobili").html(html);
}

function popunjavanjeAutomobila() {
    $("#odaberiKola").empty();
    $("#odaberiKola").append("<option value=\"null\">-- Odaberi automobili --</option>");
    izbrisiUneto();
    $.post('ajax/prikazAutomobila.php',
        data => {
            automobils = JSON.parse(data);
            for (let auto of automobils) {
                let pom = `${auto.marka} ${auto.model} (${auto.godiste}. god.)`;
                $("#odaberiKola").append(`<option value="${auto.id_auto}">${pom}</option>`);
            }
        });
}

/*DODAVANJA AUTOMOBILA*/
function novAuto() {
    let niz = document.querySelectorAll(".form-automobil");
    if (!proveraAutomobila(niz))
        return false;

    sigurnosnaPoruka("Da li sigurno želite da dodate dati automobil u sistem", modalProvere1);


}

function submit() {
    $("#" + modalProvere1).modal('hide');
    let marka = $("#marka").val();
    let model = $("#model").val();
    let godiste = $("#godiste").val();
    let kubikaza = $("#kubikaza").val();
    let karoserija = $("#karoserija").val();
    let gorivo = $("#gorivo").val();
    let pogon = $("#pogon").val();
    let menjac = $("#menjac").val();
    let broj_vrata = $("#brojVrata").val();
    let putanja = $("#slikaAutomobila").attr("src").split("/");
    let putanja_slike = putanja[putanja.length - 1];
    let cena_po_danu = $("#cena_po_danu").val();


    let auto = {
        marka: marka,
        model: model,
        godiste: godiste,
        kubikaza: kubikaza,
        karoserija: karoserija,
        pogon: pogon,
        menjac: menjac,
        broj_vrata: broj_vrata,
        gorivo: gorivo,
        putanja_slike: putanja_slike,
        cena_po_danu: cena_po_danu
    };
    let json = JSON.stringify(auto);

    $.post("ajax/dodajAutomobil.php", { automobil: json }, function (data) {
        prikazPoruke("Dodavanje automobila", data, modal);
    });
    console.log("SUBMIT");

}

/*****IZMENA AUTOMOBILA***********/
function izmeni() {
    let id_auto = $("#odaberiKola").val();
    let marka = $("#marka").val();
    let model = $("#model").val();
    let godiste = $("#godiste").val();
    let kubikaza = $("#kubikaza").val();
    let karoserija = $("#karoserija").val();
    let gorivo = $("#gorivo").val();
    let pogon = $("#pogon").val();
    let menjac = $("#menjac").val();
    let broj_vrata = $("#brojVrata").val();
    let putanja = $("#slikaAutomobila").attr("src").split("/");
    let putanja_slike = putanja[putanja.length - 1];
    let cena_po_danu=$("#cena_po_danu").val();


    let json = {
        id_auto: id_auto,
        marka: marka,
        model: model,
        godiste: godiste,
        kubikaza: kubikaza,
        karoserija: karoserija,
        pogon: pogon,
        menjac: menjac,
        broj_vrata: broj_vrata,
        gorivo: gorivo,
        putanja_slike: putanja_slike,
        cena_po_danu: cena_po_danu
    };

    $.post("ajax/izmeniAutomobil.php", { automobil: JSON.stringify(json) },
        data => {
            prikazPoruke("Čuvanje izmena", data, modal);

        });
    return true;

}

/***********BRISANJE AUTOMOBILA*****************/

function obrisi() {
    sigurnosnaPoruka("Da li sigurno želite da izbrišete automobil iz sistema", modalProvere2);

}
function obrisiAuto() {
    $("#" + modalProvere2).modal('hide');
    let id_auto = $("#odaberiKola").val();

    $.post('ajax/obrisiAutomobil.php', { id_auto: id_auto },
        data => {
            prikazPoruke("Brisanje automobila", data, modal);
        });

    return true;
}

/*********************************************NEKE PROVERE**********************************/
function izbrisiUneto() {
    let inputiAutomobila = document.querySelectorAll(".inputAutomobil");
    let selectiAutomobila = document.querySelectorAll(".selectiAutomobila");

    for (let i of inputiAutomobila) {
        $("#" + i.id).attr("class", "form-control form form-automobil inputAutomobil");
    }
    for (let i of selectiAutomobila) {
        $("#" + i.id).attr("class", "custom-select mb-3 form form-automobil selectiAutomobila");
    }

    $("#slikaAutomobila").attr("src", "");

}

function popuniPoljaAuto() {
    izbrisiUneto();
    let idAuto = $("#odaberiKola").val();
    if (idAuto === "null") {
        let niz = document.querySelectorAll(".form-automobil");
        for (let i of niz) {
            i.value = "";
        }
        $("#slikaAutomobila").attr("src", "");

        return false;
    }


    let auto;
    for (let a of automobils) {
        if (a.id_auto === idAuto) {
            auto = a;
            break;
        }
    }


    $("#marka").val(auto.marka);
    $("#model").val(auto.model);
    $("#godiste").val(auto.godiste);
    $("#kubikaza").val(auto.kubikaza);
    $("#brojVrata").val(auto.broj_vrata);
    $("#gorivo").val(auto.gorivo);
    $("#menjac").val(auto.menjac);
    $("#karoserija").val(auto.karoserija);
    $("#pogon").val(auto.pogon);
    $("#slikaAutomobila").attr("src", "img/automobili/" + auto.putanja_slike);
    $("#cena_po_danu").val(auto.cena_po_danu);
    return true;
}

function dugmeDodaj() {
    $("#btnDodaj").empty();
    $("#btnSacuvaj").empty();
    $("#btnDodajNovi").empty();
    $("#btnObrisi").empty();
    if ($("#odaberiKola").val() == "null") {
        $("#btnDodaj").html("<button type=\"button\" id=\"btnDodaj\" class=\"mb-5 mt-4 btn btn-warning btn-lg\">Dodaj automobil</button>")
    } else {
        $("#btnSacuvaj").html("<button class=\"mb-5 mt-4 btn btn-warning btn-lg\">Sačuvaj izmene</button>");
        $("#btnDodajNovi").html("<button class=\"mb-5 mt-4 btn btn-warning btn-lg\">Dodaj novi</button>");
        $("#btnObrisi").html("<button class=\"mb-5 mt-4 btn btn-warning btn-lg\">Obriši automobil</button>");
    }
}

function proveraAutomobila(niz) {
    console.log("Provera");
    let provera=proveraUnosa(niz);
    if ($("#slikaAutomobila").attr("src") === "") {
        console.log("Provera slike");
        provera = false;
        dobroIliNije(false, "#slikaAuto", "custom-file-input");
    }
    else {
        dobroIliNije(true, "#slikaAuto", "custom-file-input");
    }
    return provera;

}



