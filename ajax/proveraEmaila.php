<?php
$db=new PDO("mysql:host=localhost;dbname=rentacar_db","root","");
if(!$db){
    echo "Greska u konekciji sa bazom";
}
if(isset($_POST['email']) && $_POST['email']!=""){
    $email=$_POST['email'];
    $rez=$db->query("SELECT * FROM nalozi WHERE email_ad='$email'");
    if(!$rez->rowCount()>0)
        echo "<p class='text-success'>Validan email</p>";
    else
        echo "<p class='text-danger'>Email zauzet</p>";

    $db=null;

}

?>
