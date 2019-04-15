<?php
    include_once("header.html");
    if(isset($_POST['summonerName'])){
		$summonerName = $_POST['summonerName'];
		echo "<input type='hidden' id='summonerName' value='{$summonerName}'>";
	}
?>

<body>
<div>
    
</div>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline my-2 my-lg-0" method="post">
                <input class="form-control mr-sm-2" type="text" placeholder="Nome do summoner" name="summonerName">
                <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Buscar</button>
            </form>
        </div>
    </nav>
</div>
<div class="container-fluid">
	<div class="row">
		<div class="col-md-3">
			<div class="row">
				<div class="col-md-4 form-centered" >
					<img id="summonerProfileIcon" class="img-fluid" />
				</div>
				<div class="col-md-8">
					<p>
                        <p><strong id="summonerProfileName"></strong></p>
                        <p id="summonerProfileLevel"></p>
                        <p id="summonerProfileRank"></p>
					</p>
				</div>
			</div>
		</div>
		<div class="col-md-9" id="matchHistoryContainer">
			
		</div>
	</div>
</div>
    
<?php include_once("footer.html"); ?>