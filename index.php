<?php include_once("assets/html/header.html"); ?>

<body class="background">
    <div class="search-center">
        <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
                <form action="assets/html/summoner" method="POST">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Nome do Summoner" name="summonerName">
                        </div>
                        <div class="form-group form-centered">
                            <button class="btn btn-primary">Buscar</button>
                        </div>
                </form>
            </div>
            <div class="col-4"></div>
        </div>
        
    </div>

<?php include_once("assets/html/footer.html"); ?>