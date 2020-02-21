<?php
require_once ('klase/Baza.php');

session_start();

if(isset($_GET['odjava']))
{
    unset($_SESSION['korisnik']);
    session_destroy();
}

if(isset($_SESSION['korisnik'])){
    header("Location: administracija.php");
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Ulogujte se</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="font-awesome/css/all.css">
    <link rel="stylesheet" href="css/login.css">

    <script src="https://code.jquery.com/jquery-3.4.1.js"
            integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
    <script src="js/login.js"></script>
</head>
<body>

    <div class="container">
        <div class="border border-info" id="forma">
            <h1 class="text-center pb-2 display-4 border border-info">Administracija</h1>
            <div id="poruka"></div>
            <form action="login.php" method="post">
                <input type="text" id="korime" name="korime" class="form-control" placeholder="Korisničko ime..."><br>
                <input type="password" id="lozinka" name="lozinka" class="form-control" placeholder="Lozinka..."><br><br>

                <button type="submit" class="btn btn-info col-12" id="ulogusjSe">Ulogujte se</button>
            </form>
            <?php
                if(isset($_POST['korime']) && isset($_POST)){
                    $korime=$_POST['korime'];
                    $lozinka=$_POST['lozinka'];
                    $ulogovan=Baza::uloguj_korisnika($korime,$lozinka);

                    if($ulogovan){
                        $_SESSION['korisnik']=serialize($ulogovan);
                        header("Location: administracija.php");
                    }
                    else{
                        echo "<h4 class='mt-3 text-center text-danger'>Uneti podaci ne odgovaraju nijednom nalogu, pokušajte ponovo</h4>";
                    }
                }

            ?>
        </div>
    </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
    <script src="js/funkcije.js"></script>
    <script>
        $("#ulogusjSe").click(function () {
            $("#lozinka").val($("#lozinka").val().hashCode());
            $("form").submit();
        })
    </script>

</body>
</html>