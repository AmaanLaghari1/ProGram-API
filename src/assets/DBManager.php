<?php

class DBManager{
    // Database Connection function
    public function dbConn(){
        define('SERVER', 'localhost');
        define('USERNAME', 'root');
        define('PASSWORD', '');
        define('DB', 'program');

        $con = mysqli_connect(SERVER, USERNAME, PASSWORD, DB) OR die("Connection failed!");
        return $con;
    }
}