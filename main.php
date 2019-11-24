<?php
require_once "db.php";
if($_SERVER['REQUEST_METHOD'] == 'PUT') {
	$_PUT = array();  
  	$putdata = file_get_contents('php://input');
 	 $exploded = explode('&', $putdata);  
  foreach($exploded as $pair) { 
    $item = explode('=', $pair); 
    if(count($item) == 2) { 
      $_PUT[urldecode($item[0])] = urldecode($item[1]);
    } 
  } 
}
if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
	$_DELETE = array();  
  	$deletedata = file_get_contents('php://input');
 	 $exploded = explode('&', $deletedata);  
  foreach($exploded as $pair) { 
    $item = explode('=', $pair); 
    if(count($item) == 2) { 
      $_DELETE[urldecode($item[0])] = urldecode($item[1]);
    } 
  } 
}

if(isset($_POST['addItem'])){
	$list = R::dispense("itemlist"); 
	$list->id;
	$list->text = $_POST['addItem'];
	if (R::store($list))
		 header("HTTP/1.0 200 Everything is ok!");
	else 
		 header("HTTP/1.0 405 Invalid inpute");

	$list  = R::findone( 'itemlist', '  text = ? ',array($_POST['addItem']));
	echo $list->id;
}

if(isset($_PUT['editItem'])){	
	$list  = R::load( 'itemlist', $_PUT['itemID']);
	$list->text = $_PUT['editItem'];
	if (R::store($list))
		 header("HTTP/1.0 200 Everything is ok!");
	else 
		 header("HTTP/1.0 405 Invalid input");
}


if(isset($_DELETE['itemID'])){	
	$list = R::load( 'itemlist', $_DELETE['itemID']);
	$removeStat = R::trash($list);
	if ($removeStat)
		 header("HTTP/1.0 200 Item was successfully remote");
	else 
		 header("HTTP/1.0 404  Item not found");
}

if (isset($_GET['ShowItems'])){
	 $list = R::findAll( 'itemlist' );
	 if (empty($list)){
	 	header("HTTP/1.0 400 Something wrong");
	 }
	 else{
	 	header("HTTP/1.0 200 Everything is ok!");
	    echo json_encode($list);
	 }
	
}
?>