class JsonData {
    constructor(){
        this.apiKey = "RGAPI-62a5218d-925d-42d7-bda3-9e46236185ae";
        this.getData();
    }

    async getData(){
        try{
            this.championsList = await this.generateChampionList();
            console.log("championList:")
            console.log(this.championsList);
            this.itemList = await this.generateItemList();
            console.log("itemList:");
            console.log(this.itemList);
        } catch (error) {
            console.log(error);
        }
    }

    getSummonerData(summonerName){
        try{
            return axios.get('https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + this.apiKey);
        } catch (error) {
            console.log(error);
        } 
    }
    
    getPositionData(summonerId){
        try{
            return axios.get('https://br1.api.riotgames.com/lol/league/v4/positions/by-summoner/' + summonerId + '?api_key=' + this.apiKey);
        } catch (error) {
            console.log(error);
        }
    }

    getMatchHistoryData(accountId){
        try{
            return axios.get('https://br1.api.riotgames.com/lol/match/v4/matchlists/by-account/' + accountId +'?endIndex=10&api_key=' + this.apiKey);
        } catch (error) {
            console.log(error);
        }
    }
    
    getMatchDetails(matchId){
        try{
            return axios.get('https://br1.api.riotgames.com/lol/match/v4/matches/'+ matchId + '?api_key=' + this.apiKey);
        } catch (error) {
            console.log(error);
        }
    }

    generateChampionList(){
        try{
            let championsList = []; // inicializa um array
            axios.get('http://localhost/teste-api-js/assets/ddragon/data/champion.json') // Busca o dado estatico dos campeos atraves de um JSON
                // Caso encontre
                .then(function(response){ 
                    for(let champion of Object.values(response.data.data)){ // Itera toda a lista de campeões
                        championsList.push({ // adiciona um objeto contendo ID e NAME ao array
                            id: champion.key,
                            name: champion.id
                        });
                    }
                })
                // Caso não encontre
                .catch(function(error) {
                    console.log(error); // imprime o erro no console
                });
            return championsList; // retorna o array
        } catch (error){
            console.log(error);
        }
    }

    generateItemList(){
        try {
            let itemList = []; // inicializa um array
            axios.get('http://localhost/teste-api-js/assets/ddragon/data/item.json') // Busca o dado estatico dos campeos atraves de um JSON
            // Caso encontre
            .then(function (response) {
              for (let item of Object.values(response.data.data)) {
                // Itera toda a lista de campeões
                itemList.push({
                  // adiciona um objeto contendo ID e NAME ao array
                  id: item.image.full.slice(0,4),
                  name: item.name
                });
              }
            }) // Caso não encontre
            .catch(function (error) {
              console.log(error); // imprime o erro no console
            });
            return itemList; // retorna o array
        } catch (error) {
            console.log(error);
        }
    }
}