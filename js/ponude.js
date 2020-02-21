let pretraga = "";
let auto;

$(document).ready(() => {
    let datumOd = izvuciUrlParametar("datumOd");
    let datumDo = izvuciUrlParametar("datumDo");
    let id_auto = izvuciUrlParametar("id_auto");
    let minDate=new Date();

        // $.post('ajax/prikazAutomobila.php', function (response) {
        //     auto = JSON.parse(response);
        //     if(!getMetoda("pretraga")){
        //         if(!getMetoda("id_auto")){
        //             prikaziAutomobile(auto);
        //         }
        //         else{
        //             let tmpAuto=auto.filter( a => a['id_auto']==getMetoda("id_auto"));
        //             prikaziAutomobile(tmpAuto);
        //         }
        //     }
        //     else {
        //         prikaziAutomobile(pretragaAutomobila(auto,getMetoda("pretraga")));
        //         let pretraga=getMetoda("pretraga").split("%20").join(" ");
        //         $("#pretraga").val(pretraga);
        //     }
        //
        //
        //     popuniFiltere(auto);
        // });
    $.ajax({
        url: "ajax/pretragaAutomobila.php",
        method: "POST",
        data: { id_auto: id_auto, datumOd: datumOd, datumDo, datumDo },
        error: error => console.log(error.statusMessage),
        success: data => {
            auto = JSON.parse(data);
            prikaziAutomobile(auto);
            popuniFiltere(auto);
        }
    });
        $("#btnPretraga").click(function () {
            if ($("#pretraga").val() == "")
                prikaziAutomobile(auto);

            prikaziAutomobile(pretragaAutomobila(auto,$("#pretraga").val()));
        });
        $("#sortiranjePoCeni").change(sortiraj);

    $("#btnPretraziPoDatumu").click(() => {
        // alert("RADI");
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


                prikaziAutomobile(automobili);
                popuniFiltere(automobili);
                auto=automobili;
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



function sortiraj() {

    let sortirani = [];
    switch ($("#sortiranjePoCeni").val())
    {
        case "null" : prikaziAutomobile(auto);
        case "rastuca":
        {
            sortirani = auto.sort((a, b) => (parseInt(a.cena_po_danu) > parseInt(b.cena_po_danu) ) ? 1 : -1);
            prikaziAutomobile(sortirani);
            break;
        }
        case "opadajuca":
        {
            sortirani = auto.sort((a, b) => (parseInt(a.cena_po_danu) < parseInt(b.cena_po_danu)) ? 1 : -1);
            prikaziAutomobile(sortirani);
            break;
        }
    }
}
function prikaziAutomobile(automob) {
    $("#prikasz").empty();
    let automobili = automob;
    if(automobili.length<1){
        $("#prikaz").html("<p class='text-center h3'>Nema pronađenih</p>")
        return;
    }

    $("#ukupanBroj").html(automobili.length);
    let naslovi = {
        marka: "Marka",
        model: "Model",
        godiste: "Godište",
        kubikaza: "Kubikaža",
        karoserija: "Karoserija",
        gorivo: "Gorivo",
        pogon: "Pogon",
        menjac: "Menjač",
        broj_vrata: "Broj vrata"
    };
    let rezultat = "";
    for (let auto of automobili) {
        let putanja = auto['putanja_slike'];
        rezultat += `<div class="card ml-3 mt-3">
                            <div class="row">

                                <div class="col-lg-6">
                                    <img class="card-img" height="100%" src="img/automobili/${putanja}" alt="">
                                </div>

                                <div class="col-lg-6">`;

        rezultat += `<div class="row mt-sm-0 mt-lg-2">`;
        for (let i in naslovi) {
            rezultat += `<div class="col-md-6 mt-1">
                            <b>${naslovi[i]}</b> : ${auto[i]} ${naslovi[i]==="Kubikaža"?"cm3":""}
                        </div><br>`;
        }
        let ulogovan=$("#ulogovan").text().length<1;
        rezultat += `</div>
                <h3 class="text-right mt-lg-3 mr-3">Cena: ${auto['cena_po_danu']} EUR</h3>
                ${ulogovan?"<p class='text-warning text-center mt-3'>Morate biti ulogovani da bi ste izvršili rezervaciju</p>":""}
                <a type="button" href="rezervacija.php?id_auto=${auto['id_auto']}" class="btn btn-info btn-lg m-2 ${ulogovan?"disabled":""}" style="float: right; text-decoration: none">Rezerviši</a>
            </div>
    
        </div>
    </div>
`;
    }

    $("#prikaz").html(rezultat);
}

function popuniFiltere(automobili) {
    $("#marka").empty();
    let niz = ["marka"];

    for (let i of niz) {
        let dobavljeno = dobavljanjeBezPonavljanja(automobili, i);
        for (let a of dobavljeno) {
            let html = `<input type="checkbox" class="form-check-input" value="${a}" id="${a}">${a}<br>`;
            $("#" + i).append(html);
        }
    }
    let sviFilteri = $('.form-check-input');
    obradaFiltera(sviFilteri);
}


function obradaFiltera(listaFiltera) {

    let wrapper =
        {
            'marka': [],
            'karoserija': [],
            'gorivo': [],
            'pogon': [],
            'menjac': []
        };
    let funkcije =
        [
            filtrirajPoMarki, filtrirajPoKaroseriji,
            filtrirajPoGorivu, filtrirajPoPogonu, filtrirajPoMenjacu
        ];

    for (let f of listaFiltera) {

        f.addEventListener('change', () => {
            let nov = auto;
            let kljuc = f.parentNode.id;

            if (f.checked) {
                wrapper[kljuc].push(f.value);
            }

            else {
                wrapper[kljuc].splice(wrapper[kljuc].indexOf(f.value), 1);
            }

            // nov = filtrirajPoMarki(nov, wrapper);
            // nov = filtrirajPoKaroseriji(nov, wrapper);

            for (let func of funkcije) {
                nov = func(nov, wrapper);
            }

            console.log(nov);

            prikaziAutomobile(nov);
        });
    }
}

function filtrirajPoMarki(niz, wrapper) {
    if (wrapper['marka'].length == 0) return niz;
    let novNiz = [];
    for (let automobil of niz) {
        for (let marka of wrapper['marka']) {
            if (automobil.marka == marka) {
                novNiz.push(automobil);
                break;
            }
        }
    }
    return novNiz;
}

function filtrirajPoKaroseriji(niz, wrapper) {

    if (wrapper['karoserija'].length == 0) return niz;
    let novNiz = [];
    for (let automobil of niz) {
        for (let k of wrapper['karoserija']) {
            if (automobil.karoserija == k) {
                novNiz.push(automobil);
                break;
            }
        }
    }
    return novNiz;
}

function filtrirajPoGorivu(niz, wrapper) {
    if (wrapper['gorivo'].length == 0) return niz;
    let novNiz = [];
    for (let automobil of niz) {
        for (let gorivo of wrapper['gorivo']) {
            if (automobil.gorivo == gorivo) {
                novNiz.push(automobil);
                break;
            }
        }
    }
    return novNiz;
}

function filtrirajPoMenjacu(niz, wrapper) {
    if (wrapper['menjac'].length == 0) return niz;
    let novNiz = [];
    for (let automobil of niz) {
        for (let menjac of wrapper['menjac']) {
            if (automobil.menjac == menjac) {
                novNiz.push(automobil);
                break;
            }
        }
    }
    return novNiz;

}

function filtrirajPoPogonu(niz, wrapper) {
    if (wrapper['pogon'].length == 0) return niz;
    let novNiz = [];
    for (let automobil of niz) {
        for (let pogon of wrapper['pogon']) {
            if (automobil.pogon == pogon) {
                novNiz.push(automobil);
                break;
            }
        }
    }
    return novNiz;

}




// var pretraga="";
// var autoPonude;
// $(document).ready(() => {
//     $.post('ajax/prikazAutomobila.php', function (response) {
//         autoPonude = JSON.parse(response);
//         prikaziAutomobile(autoPonude);
//         popuniFiltere(autoPonude);
//     });
//     $("#btnPretraga").click(function () {
//         if($("#pretraga").val()=="")
//             prikaziAutomobile(autoPonude);
//
//         prikaziAutomobile(pretragaAutomobila(autoPonude));
//     })
//     $("#sortiranjePoCeni").change(sortiraj);
// });
//
//
// function prikaziAutomobile(automob) {
//     $("#prikasz").empty();
//     let automobili = automob;
//     $("#ukupanBroj").html(automobili.length);
//     let naslovi = {
//         marka: "Marka",
//         model: "Model",
//         godiste: "Godiste",
//         kubikaza: "Kubikaza",
//         karoserija: "Karoserija",
//         gorivo: "Gorivo",
//         pogon: "Pogon",
//         menjac: "Menjac",
//         broj_vrata: "Broj vrata"
//     };
//     let rezultat = "";
//     let pom = 1;
//     for (let autoPonude of automobili) {
//         let putanja=autoPonude['putanja_slike'];
//         console.log(putanja);
//         rezultat +=`<div class="card ml-3 mt-3">
//                             <div class="row">
//
//                                 <div class="col-lg-6">
//                                     <img class="card-img" height="100%" src="img/automobili/${putanja}" alt="">
//                                 </div>
//
//                                 <div class="col-lg-6">`;
//
//         rezultat+=`<div class="row mt-sm-0 mt-lg-2">`
//         for (let i in naslovi) {
//             rezultat+=`<div class="col-md-6 mt-1">
//                             <b>${naslovi[i]}</b> : ${autoPonude[i]}
//                         </div><br>`;
//         }
//         rezultat+=`</div>
//                 <h3 class="text-right mt-lg-3 mr-3">Cena: ${autoPonude['cena_po_danu']} €</h3>
//                 <a type="button" href="rezervacija.php?id_auto=${autoPonude['id_auto']}" class="btn-info btn-lg m-2" style="float: right; text-decoration: none">Rezerviši</a>
//             </div>
//
//         </div>
//     </div>
// `;
//     }
//
//     $("#prikasz").html(rezultat);
// }
//
//
// function sortiraj() {
//
//     let sortirani = [];
//     switch ($("#sortiranjePoCeni").val())
//     {
//         case "null" : prikaziAutomobile(auto);
//         case "rastuca":
//         {
//             sortirani = auto.sort((a, b) => (a.cena_po_danu > b.cena_po_danu) ? 1 : -1);
//             prikaziAutomobile(sortirani);
//             break;
//         }
//         case "opadajuca":
//         {
//             sortirani = auto.sort((a, b) => (a.cena_po_danu < b.cena_po_danu) ? 1 : -1);
//             prikaziAutomobile(sortirani);
//             break;
//         }
//     }
// }
//
//
// function popuniFiltere(automobili) {
//     let niz = ["marka"]
//
//     for (let i of niz) {
//         let dobavljeno = dobavljanjeBezPonavljanja(automobili, i);
//         for (let a of dobavljeno) {
//             let html = `<input type="checkbox" class="form-check-input" value="${a}" id="${a}">${a}<br>`;
//             $("#" + i).append(html);
//         }
//     }
//     let sviFilteri = $('.form-check-input');
//     obradaFiltera(sviFilteri);
// }
//
//
// function obradaFiltera(listaFiltera) {
//
//     let wrapper =
//         {
//             'marka': [],
//             'karoserija': [],
//             'gorivo': [],
//             'pogon': [],
//             'menjac': []
//         };
//     let funkcije =
//         [
//             filtrirajPoMarki, filtrirajPoKaroseriji,
//             filtrirajPoGorivu, filtrirajPoPogonu, filtrirajPoMenjacu
//         ];
//
//     for (let f of listaFiltera) {
//
//         f.addEventListener('change', () => {
//             let nov = auto;
//             let kljuc = f.parentNode.id;
//
//             if (f.checked) {
//                 wrapper[kljuc].push(f.value);
//             }
//
//             else {
//                 wrapper[kljuc].splice(wrapper[kljuc].indexOf(f.value), 1);
//             }
//
//             // nov = filtrirajPoMarki(nov, wrapper);
//             // nov = filtrirajPoKaroseriji(nov, wrapper);
//
//             for (let func of funkcije) {
//                 nov = func(nov, wrapper);
//             }
//
//             console.log(nov);
//
//             prikaziAutomobile(nov);
//         });
//     }
// }
//
// function filtrirajPoMarki(niz, wrapper) {
//     if (wrapper['marka'].length == 0) return niz;
//     let novNiz = [];
//     for (let automobil of niz) {
//         for (let marka of wrapper['marka']) {
//             if (automobil.marka == marka) {
//                 novNiz.push(automobil);
//                 break;
//             }
//         }
//     }
//     return novNiz;
// }
//
// function filtrirajPoKaroseriji(niz, wrapper) {
//
//     if (wrapper['karoserija'].length == 0) return niz;
//     let novNiz = [];
//     for (let automobil of niz) {
//         for (let k of wrapper['karoserija']) {
//             if (automobil.karoserija == k) {
//                 novNiz.push(automobil);
//                 break;
//             }
//         }
//     }
//     return novNiz;
// }
//
// function filtrirajPoGorivu(niz, wrapper) {
//     if (wrapper['gorivo'].length == 0) return niz;
//     let novNiz = [];
//     for (let automobil of niz) {
//         for (let gorivo of wrapper['gorivo']) {
//             if (automobil.gorivo == gorivo) {
//                 novNiz.push(automobil);
//                 break;
//             }
//         }
//     }
//     return novNiz;
// }
//
// function filtrirajPoMenjacu(niz, wrapper) {
//     if (wrapper['menjac'].length == 0) return niz;
//     let novNiz = [];
//     for (let automobil of niz) {
//         for (let menjac of wrapper['menjac']) {
//             if (automobil.menjac == menjac) {
//                 novNiz.push(automobil);
//                 break;
//             }
//         }
//     }
//     return novNiz;
//
// }
//
// function filtrirajPoPogonu(niz, wrapper) {
//     if (wrapper['pogon'].length == 0) return niz;
//     let novNiz = [];
//     for (let automobil of niz) {
//         for (let pogon of wrapper['pogon']) {
//             if (automobil.pogon == pogon) {
//                 novNiz.push(automobil);
//                 break;
//             }
//         }
//     }
//     return novNiz;
//
// }
//
//
//
