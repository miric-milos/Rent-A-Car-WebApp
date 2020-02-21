let rez;
let poruka="";
$(document).ready(function () {
    $("#poruka").html(`<p class='text-center h1'>${poruka}</p>`);
    rez=document.querySelector("#otkazi");
    $(".naslov").animate({opacity: '1'}, 1000);
    $("#btnAzuriraj").click(() => {
        // alert("RADI");

        if ($("#lozinkaRegister").val() == "" || $("#relozinka").val() == "") {
            alert("Oba polja su obavezna!");
        } else {
            let staraLozinka = $("#lozinkaRegister").val().hashCode();
            let novaLozinka = $("#relozinka").val().hashCode();
            // console.log(staraLozinka);
            // console.log(novaLozinka);

            $.ajax({
                url:"ajax/promeniLozinku.php",
                method:"POST",
                data: { korIme: $("#korisnickoIme").val(),stara:staraLozinka, nova:novaLozinka},
                error:xhr => {console.log(xhr.statusMessage);},
                success:data => {alert(data)}
            });
        }
    });
});

function popuniModal(id) {
    $.post("ajax/odabraniAuto.php",{id_auto:id},function (response) {
        let auto=JSON.parse(response)[0];
        $("#otkazRezerv").html(`<b>${auto.marka} ${auto.model} (${auto.godiste} god.)<br>
                                ${rez.getAttribute("data-datumOd")} - ${rez.getAttribute("data-datumOd")}  Cena: ${rez.getAttribute("data-cena")}</b>`)
    })
    $("#otkaziModal").modal({
        keyboard: false,
        backdrop: "static"
    });
}

$("#btnOtkazi").click(function () {
    console.log(rez.getAttribute("data-rez"));
    $.post("ajax/otkazivanjeRezerv.php",{id:rez.getAttribute("data-rez")},function (response) {
        poruka=response;
        location.reload();
    })
});