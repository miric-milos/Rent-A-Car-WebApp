<?php
$db=new PDO("mysql:host=localhost;dbname=rentacar_db","root","");
if(!$db){
    echo "Greska u konekciji sa bazom";
}
if(isset($_POST['username']) && $_POST['username']!=""){
    $username=$_POST['username'];
    $rez=$db->query("SELECT * FROM nalozi WHERE username='$username'");

    if(!$rez->rowCount()>0)
        echo "<p class='text-success'>Validan username</p>";
    else
        echo "<p class='text-danger'>Username zauzet</p>";

    $db=null;
}

?>