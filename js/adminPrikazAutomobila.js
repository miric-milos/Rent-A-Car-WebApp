var automobili;
var modal = "myModal";
var modalProvere1 = "modalDodavanja";
var modalProvere2 = "modalBrisanja";
$(document).ready(() => {
    slideNaGore();
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

});

function popunjavanjeAutomobila() {
    $("#odaberiKola").empty();
    $("#odaberiKola").append("<option value=\"null\">-- Odaberi automobili --</option>");
    izbrisiUneto();
    $.post('ajax/prikazAutomobila.php',
        data => {
            automobili = JSON.parse(data);
            console.log(automobili);
            for (let auto of automobili) {
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
    console.log(automobili);
    for (let a of automobili) {
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
        $("#btnDodaj").html("<button type=\"button\" id=\"btnDodaj\" class=\"mb-5 mt-4 btn btn-lg\">Dodaj automobil</button>")
    } else {
        $("#btnSacuvaj").html("<button class=\"mb-5 mt-4 btn btn-lg\">Sačuvaj izmene</button>");
        $("#btnDodajNovi").html("<button class=\"mb-5 mt-4 btn btn-lg\">Dodaj novi</button>");
        $("#btnObrisi").html("<button class=\"mb-5 mt-4 btn btn-lg\">Obriši automobil</button>");
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


