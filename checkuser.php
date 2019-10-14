<?php 

	header("Content-type:text/html;charset=utf-8");

	$username = $_GET("username");
	$conn = mysql_connect("localhost","root","root");

	if(!$conn){
		echo("数据库出错".mysql_error());
	}else{
		mysql_select_db("benqin",$conn);
		$sqlstr = "select from usertable where username = '$username'";
		$result = mysql_query($sqlstr,$conn);
		$rows = mysql_num_rows($result);
		mysql_close($conn);
		if(rows>0){
			echo "1";
		}else{
			echo "0";
		}
	}
	
?>