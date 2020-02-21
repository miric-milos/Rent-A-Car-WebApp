$(document).ready(() => {

    $.post("ajax/prikazLokacija.php", 
        data => {
            lokacije = JSON.parse(data);
            console.log(data);

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
});