$(document).ready(() => {
    // alert("RADI");



    $("#ulogujSe").click(() => {

        let korime = $("#korime").val();
        let lozinka = $("#lozinka").val();


        let json =
            {
                korime: korime.trim(),
                lozinka: lozinka.hashCode()
            };

        console.log(json.lozinka);
        $.post('ajax/logovanje.php', {podaci: JSON.stringify(json)},
            response => {
            console.log(response);
                if(response === "false") {
                    $("#poruka").html("<p class='text-danger text-center'>\"Uneti podaci ne odgovaraju ni jednom nalogu\"</p>");
                    dobroIliNije(false,"#korime");
                    dobroIliNije(false,"#lozinka");
                }
                else {
                    $("form").submit();
                }

            }
        )

    })
});