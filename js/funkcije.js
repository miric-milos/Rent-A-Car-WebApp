
var nasloviParametraAuto={
    marka : "Marka",
    model : "Model",
    godiste : "Godište",
    kubikaza : "Kubikaža",
    karoserija : "Karoserija",
    gorivo : "Gorivo",
    pogon : "Pogon",
    menjac : "Menjač",
    broj_vrata : "Broj vrata",
    cena_po_danu: "Cena po danu"

};


String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

function sadrziSlova(string) {
    if(string.match(/[a-z]/i)) {
        return true;
    }

    return false;


}
function dobroIliNije(bool,val) {
    $(val).attr("class",$(val).attr("class").replace("is-invalid","").replace("is-valid",""));
    $(val).addClass(bool?"is-valid":"is-invalid");
}

function prikazPoruke(title,body,idModal) {
    console.log("Udjoh 2");
    $(".modal-title").html(title);
    $(".modal-body").html("<p>"+body+"</p>");
    $('#'+idModal).modal('show');
}

function sigurnosnaPoruka(poruka,idModal) {
    $(".modal-title").html("Sigurnosna poruka");
    $(".modal-body").html("<p>"+poruka+"?</p>");
    $('#'+idModal).modal('show');
}

function izvuciUrlParametar(imeParametra) {
    return new URL(window.location.href).searchParams.get(imeParametra);
}

function proveraUnosa(niz) {
    let provera=true;

    for (let i of niz) {
        let klasa = $("#" + i.id).attr("class").replace("is-invalid","").replace("is-valid","");

        if (i.value === "" || i.value == "null") {
            dobroIliNije(false, "#" + i.id, klasa);
            provera = false;
            console.log(i);
        }
        else
            dobroIliNije(true, "#" + i.id, klasa);
    }
    return provera;
}

function getMetoda(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return false;
}
function dobavljanjeBezPonavljanja(niz,element) {
    let res=[];
    for (let i of niz){
        res.push(i[element]);
    }
    return [...new Set(res)];
}

function racunanjeRazlikeDatuma(date1, date2) {
    return new Date(date1-date2);
}

function validanEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        return true;
    }

    return false;
}

function proveriSifru(lozinka) {
    let velikaSlova=0;

    for (let i = 0; i < lozinka.length; i++) {
        if(isNaN(lozinka[i]) && lozinka[i]===lozinka[i].toUpperCase())
            velikaSlova++;
    }

    return !(new RegExp(/[-!$@#%^&*()+|~=`{}\[\]:";'<>?,.\/]/).test(lozinka) || velikaSlova < 2 || lozinka.length < 5);





}

function nizDatuma(datumi) {
    let niz=[];
    for (let datum of datumi){
        let datumOd=datum['datum_od'];
        let datumDo=datum['datum_do'];
        for (let i = 0; i < 16; i++) {
            let datum=new Date(datumOd);
            let sledeciDan=(new Date(datumOd).getDate()+i)+"";
            let mesec=(datum.getMonth()+1)+"";
            let mesecUpis=mesec.length<2?"0"+mesec:mesec;
            let danUpis=sledeciDan.length<2?"0"+sledeciDan:sledeciDan;
            let upis=datum.getFullYear()+"-"+mesecUpis+"-"+danUpis;
            niz.push(upis);

            if(sledeciDan == new Date(datumDo).getDate()) break;
        }
    }
    return niz;
}

function dateRangeOverlaps(datum1Od, datum1Do, datum2Od, datum2Do) {
    if (datum1Od <= datum2Od && datum2Od <= datum1Do) return true; // b starts in a
    if (datum1Od <= datum2Do   && datum2Do   <= datum1Do) return true; // b ends in a
    if (datum2Od <  datum1Od && datum1Do   <  datum2Do) return true; // a in b
    return false;
}