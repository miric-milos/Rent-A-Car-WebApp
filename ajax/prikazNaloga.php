<?php
require_once ('..\klase\Baza.php');
    
    $nalozi = Baza::izvuci_u_asoc('nalozi', 'id_naloga');
    $nalozi = json_encode($nalozi);
    echo $nalozi;
?>