$(document).ready(() => {

    $.post("ajax/prikazLokacija.php", 
        response => {
            lokacije = JSON.parse(response);
            console.log(response);

            let rezultat  = "<div class='row'>";
            let pom       = 1;


            for(let l of lokacije)
            {
                rezultat += '<div class="col-md-3 border p-3 text-light">';
                rezultat +=     `<i class="fas fa-home"></i>   <b>${l.adresa}</b><br>`;
                rezultat +=     `<i class="fas fa-envelope"></i>  ${l.email}<br>`;
                rezultat +=     `<i class="fas fa-phone"></i>     ${l.telefon}`;
                rezultat += "</div>";

                if(pom % 4 == 0)
                {
                    rezultat += "</div>";
                    rezultat += "<div class='row'>";
                }
                pom++;
            }

            $("#lokacije").html(rezultat);
        });

    $("#email").keydown((proveraEmaila));

    $("#posalji").click(() => {
        let check=true;
        if(!validanEmail($("#email").val())){
            dobroIliNije(false,"#email");
            check=false;
        }
        if($("#tekst").val()==""){
            dobroIliNije(false,"#tekst");
            check=false;
        }

        if(check)
            prikazPoruke("Uspešno ste poslali poruku","Hvala Vam što ste nas kontaktirali<br>" +
                "Odgovor će Vam stići u najkraćem mogućem roku","modalKontakt");

    });
    $("#btnClose").click(function () {
        $("#modalKontakt").modal('hide');
        window.location.href="index.php";
    })
});

function proveraEmaila()
{
    let email = $("#email").val();

    if (validanEmail(email)) {
        dobroIliNije(true, $("#email"));
    }

    else dobroIliNije(false, $("#email"));

}