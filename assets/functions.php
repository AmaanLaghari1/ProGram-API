<?php

function showView($pg){
    header("location: ./src/views/{$pg}.php");
}