<?php 

	header("Content-type:text/html;charset=utf-8");

	$username = $_POST["username"];
	$userpass = $_POST["userpass"];

	$conn = mysql_connect("localhost","root","root");

	if(!$conn){
		echo("数据库出错".mysql_error());
	}else{
		mysql_select_db("benqin",$conn);
		$sqlstr = "select * from usertable where username = '$username'";
		$result = mysql_query($sqlstr,$conn);
		$rows = mysql_num_rows($result);
		
		if($rows>0){
			mysql_close($conn);
			echo "-1";
		}else{
			$sqlstr = "insert into usertable(username,userpass) values('$username','$userpass')";
			$result = mysql_query($sqlstr,$conn);
			mysql_close($conn);
			if($result!=1){
				echo "0";
			}else{
				echo "1";
			}
		}
	}
?>