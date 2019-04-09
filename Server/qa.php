<?php
$host = SAE_MYSQL_HOST_M;
$user = SAE_MYSQL_USER;
$pass = SAE_MYSQL_PASS;
$dbname = SAE_MYSQL_DB;
$port = SAE_MYSQL_PORT;
$question = $_POST['question'];
try {
    $dbh = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $user, $pass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $sql = 'SELECT answer FROM qatable WHERE question LIKE :question';
    $result = $dbh->prepare($sql);
    $result->execute(array(':question'=> "%$question%"));
    $data = $result->fetch(PDO::FETCH_ASSOC);
    if($data) { 
		header('Access-Control-Allow-Origin:*');
        header('content-type:application/json;charset=utf-8');
        echo json_encode($data); 
    }
    $dbh = null;
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>