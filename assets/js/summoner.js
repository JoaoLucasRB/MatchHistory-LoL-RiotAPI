class Summoner {

    constructor(user) {
        this.summonerName = user;
        console.log(this.summonerName);
        this.jsonData = new JsonData();
        this.loadProfile();
    }

    async loadProfile(){
        await this.summonerProfile();
        await this.generateDOMProfile();
        await this.summonerMatchHistory();
        await this.generateDOMMatchHistory();
    }

    async summonerProfile(){
        let sumRes = await this.jsonData.getSummonerData(this.summonerName);
        this.summonerData = sumRes.data;
        console.log("summonerData:");
        console.log(this.summonerData);
        let posRes = await this.jsonData.getPositionData(this.summonerData.id);
        this.positionData = posRes.data;
        console.log("positionData:");
        console.log(this.positionData);
    }

    async summonerMatchHistory(){
        let matchHisRes = await this.jsonData.getMatchHistoryData(this.summonerData.accountId);
        this.matchHistoryData = matchHisRes.data.matches;
        console.log("matchHistoryData:");
        console.log(this.matchHistoryData);
    }
    
    generateDOMProfile(){
        let summonerProfileIcon = document.getElementById("summonerProfileIcon");
        let summonerProfileName = document.getElementById("summonerProfileName");
        let summonerProfileLevel = document.getElementById("summonerProfileLevel");
        let summonerProfileRank = document.getElementById("summonerProfileRank");
        summonerProfileIcon.setAttribute("src", "/teste-api-js/assets/ddragon/img/profileicon/" + this.summonerData.profileIconId + ".png");
        let nameNode = document.createTextNode(this.summonerData.name);
        summonerProfileName.appendChild(nameNode);
        let levelNode = document.createTextNode("Level: " + this.summonerData.summonerLevel);
        summonerProfileLevel.appendChild(levelNode);
        let rankNode = document.createTextNode(this.positionData[0].tier + " " + this.positionData[0].rank);
        summonerProfileRank.appendChild(rankNode);
    }

    generateDOMPlayedIcon(match, rowInfo){
        let containerIcon = document.createElement('div');
        containerIcon.setAttribute('class', 'col-md-2  form-centered');
        let championIcon = document.createElement('img');
        for(let champion of this.jsonData.championsList){
            if(champion.id == match.champion){
                championIcon.setAttribute('src', '/teste-api-js/assets/ddragon/img/champion/' + champion.name + '.png');
                break;
            }
        }
        containerIcon.appendChild(championIcon);
        rowInfo.appendChild(containerIcon);
    }

    generateDOMMatchPlayerScore(matchDetails, rowInfo){
        let containerMPS = document.createElement('div');
        containerMPS.setAttribute('class', 'col-md-3  form-centered');
        let containerScore = document.createElement('div');
        containerScore.setAttribute('class', ' score-space');
        let paragraphScore = document.createElement('p');
        let strongScore = document.createElement('strong');
        let containerKDA = document.createElement('div');
        containerKDA.setAttribute('class', ' score-space');
        let paragraphKDA = document.createElement('p');
        let strongKDA = document.createElement('strong');
        let team1Kills = 0;
        let team2Kills = 0;
        let kills;
        let deaths;
        let assists;
        for(let part of matchDetails.participants){
            if(part.participantId <= 5){
                team1Kills += part.stats.kills;
            } else {
                team2Kills += part.stats.kills;
            }
        }
        for(let participant of matchDetails.participantIdentities){
            if(participant.player.accountId === this.summonerData.accountId){
                let part = matchDetails.participants[participant.participantId-1];
                kills = part.stats.kills;
                deaths = part.stats.deaths;
                assists = part.stats.assists;
            }
        }
        let textNodeScore = document.createTextNode(team1Kills + " x " + team2Kills);
        let textNodeKDA = document.createTextNode(kills + "/" + deaths + "/" + assists);
        strongScore.appendChild(textNodeScore);
        strongKDA.appendChild(textNodeKDA);
        paragraphScore.appendChild(strongScore);
        paragraphKDA.appendChild(strongKDA);
        containerScore.appendChild(paragraphScore);
        containerKDA.appendChild(paragraphKDA);
        containerMPS.appendChild(containerScore);
        containerMPS.appendChild(containerKDA);
        rowInfo.appendChild(containerMPS);
    }

    generateDOMFinalItems(matchDetails, rowInfo){
        let containerItems = document.createElement('div');
        containerItems.setAttribute('class', 'col-md-5  form-centered');
        let rowItems = document.createElement('div');
        rowItems.setAttribute('class', 'row');
        let items = [];
        for(let participant of matchDetails.participantIdentities){
            if(participant.player.accountId === this.summonerData.accountId){
                let part = matchDetails.participants[participant.participantId-1];
                items[0] = part.stats.item0;
                items[1] = part.stats.item1;
                items[2] = part.stats.item2;
                items[3] = part.stats.item3;
                items[4] = part.stats.item4;
                items[5] = part.stats.item5;
                items[6] = part.stats.item6;
            }
        }
        for(let item of items){
            let containerItem = document.createElement('div');
            containerItem.setAttribute('class', 'col-md ');
            let itemIcon = document.createElement('img');
            itemIcon.setAttribute('class', 'img-fluid item-icon');
            itemIcon.setAttribute('src', '/teste-api-js/assets/ddragon/img/item/' + item + '.png');
            containerItem.appendChild(itemIcon);
            rowItems.appendChild(containerItem);
        }
        containerItems.appendChild(rowItems);
        rowInfo.appendChild(containerItems);
    }

    generateDOMMatchResult(matchDetails, matchHistoryContainer, rowInfo){
        let containerResult = document.createElement('div');
        containerResult.setAttribute('class', 'col-md-2  form-centered');
        let paragraphResult = document.createElement('p');
        let strongResult = document.createElement('strong');
        for(let participant of matchDetails.participantIdentities){
            if(participant.player.accountId === this.summonerData.accountId){
                if(participant.participantId <= 5){
                    if(matchDetails.teams[0].win === "Win"){
                        let textNodeResult = document.createTextNode("VITÓRIA");
                        strongResult.style.color = "blue";
                        strongResult.appendChild(textNodeResult);
                        matchHistoryContainer.style.borderBottomColor = "blue";
                    } else {
                        let textNodeResult = document.createTextNode("DERROTA");
                        strongResult.style.color = "red";
                        strongResult.appendChild(textNodeResult);
                        matchHistoryContainer.style.borderBottomColor = "red";
                    }
                } else {
                    if(matchDetails.teams[1].win === "Win"){
                        let textNodeResult = document.createTextNode("VITÓRIA");
                        strongResult.style.color = "blue";
                        strongResult.appendChild(textNodeResult);
                        matchHistoryContainer.style.borderBottomColor = "blue";
                    } else {
                        let textNodeResult = document.createTextNode("DERROTA");
                        strongResult.style.color = "red";
                        strongResult.appendChild(textNodeResult);
                        matchHistoryContainer.style.borderBottomColor = "red";
                    }
                }
            }
        }
        paragraphResult.appendChild(strongResult);
        containerResult.appendChild(paragraphResult);
        rowInfo.appendChild(containerResult);
    }

    generateDOMPicks(team, matchDetails, col){
        let rowPT = document.createElement('div');
        rowPT.setAttribute('class', 'row');
        let colPT = document.createElement('div');
        colPT.setAttribute('class', 'col-md-12 ');
        let paragraphPT = document.createElement('p');
        let strongPT = document.createElement('strong');
        let textNodePT = document.createTextNode('Picks Team ' + team);
        let rowPick = document.createElement('div');
        rowPick.setAttribute('class', 'row');

        for(let part of matchDetails.participants){
            if((part.participantId > ((5*team)-5)) && (part.participantId <= (5*team))) {
                let colPick = document.createElement('div');
                colPick.setAttribute('class', 'col-md ');
                let centralizer = document.createElement('div');
                centralizer.setAttribute('class', 'form-centered');
                let champIcon = document.createElement('img');
                champIcon.setAttribute('class', 'img-fluid pick-icon');
                for(let champion of this.jsonData.championsList){
                    if(champion.id == part.championId){
                        champIcon.setAttribute('src', '/teste-api-js/assets/ddragon/img/champion/' + champion.name + '.png');
                        break;
                    }
                }
                centralizer.appendChild(champIcon);
                colPick.appendChild(centralizer);
                rowPick.appendChild(colPick);
            }
        }
        strongPT.appendChild(textNodePT);
        paragraphPT.appendChild(strongPT);
        colPT.appendChild(paragraphPT);
        colPT.appendChild(rowPick);
        rowPT.appendChild(colPT);
        col.appendChild(rowPT);
    }

    generateDOMBans(team, matchDetails, col){
        let rowBT = document.createElement('div');
        rowBT.setAttribute('class', 'row');
        let colBT = document.createElement('div');
        colBT.setAttribute('class', 'col-md-12 ');
        let paragraphBT = document.createElement('p');
        let strongBT = document.createElement('strong');
        let textNodeBT = document.createTextNode('Bans Team ' + (team+1));
        let rowBan = document.createElement('div');
        rowBan.setAttribute('class', 'row');
        for(let ban of matchDetails.teams[team].bans){
            let colBan = document.createElement('div');
            colBan.setAttribute('class', 'col-md ');
            let centralizer = document.createElement('div');
            centralizer.setAttribute('class', 'form-centered');
            let champIcon = document.createElement('img');
            champIcon.setAttribute('class', 'img-fluid pick-icon');
            for(let champion of this.jsonData.championsList){
                if(champion.id == ban.championId){
                    champIcon.setAttribute('src', '/teste-api-js/assets/ddragon/img/champion/' + champion.name + '.png');
                    break;
                }
            }
            centralizer.appendChild(champIcon);
            colBan.appendChild(centralizer);
            rowBan.appendChild(colBan);
        }
        strongBT.appendChild(textNodeBT);
        paragraphBT.appendChild(strongBT);
        colBT.appendChild(paragraphBT);
        colBT.appendChild(rowBan);
        rowBT.appendChild(colBT);
        col.appendChild(rowBT);
    }
    
    async generateDOMMatchHistory() {
        let matchHistoryContainer = document.getElementById("matchHistoryContainer");
        for(let match of this.matchHistoryData){
            let detailRes = await this.jsonData.getMatchDetails(match.gameId);
            let matchDetails = detailRes.data;
            console.log('matchDetails:');
            console.log(matchDetails);
            let divGeneral = document.createElement('div');
            divGeneral.setAttribute('class', 'container-space');
            // DOM Player Info
            let rowPlayerInfo = document.createElement('div');
            rowPlayerInfo.setAttribute('class', 'row');
            let colPlayerInfo = document.createElement('div');
            colPlayerInfo.setAttribute('class', 'col-md-12');
            let rowInfo = document.createElement('div');
            rowInfo.setAttribute('class', 'row');
            this.generateDOMPlayedIcon(match, rowInfo);
            this.generateDOMMatchPlayerScore(matchDetails, rowInfo);
            this.generateDOMFinalItems(matchDetails, rowInfo);
            this.generateDOMMatchResult(matchDetails, matchHistoryContainer, rowInfo);
            colPlayerInfo.appendChild(rowInfo);
            rowPlayerInfo.appendChild(colPlayerInfo);
            divGeneral.appendChild(rowPlayerInfo);
            // Fim DOM Player Info
            
            // DOM Picks e Bans
            let rowPB = document.createElement('div');
            rowPB.setAttribute('class', 'row');
            let colPB = document.createElement('div');
            colPB.setAttribute('class', 'col-md-12');
            let rowPB2 = document.createElement('div');
            rowPB2.setAttribute('class', 'row');
            let colT1 = document.createElement('div');
            colT1.setAttribute('class', 'col-md-6');
            let colT2 = document.createElement('div');
            colT2.setAttribute('class', "col-md-6");
            this.generateDOMPicks(1, matchDetails, colT1);
            this.generateDOMBans(0, matchDetails,colT1);
            this.generateDOMPicks(2, matchDetails, colT2);
            this.generateDOMBans(1, matchDetails,colT2);
            rowPB2.appendChild(colT1);
            rowPB2.appendChild(colT2);
            colPB.appendChild(rowPB2);
            rowPB.appendChild(colPB);
            divGeneral.appendChild(rowPB);
            // Fim DOM Picks e Bans
            matchHistoryContainer.appendChild(divGeneral);
        }
    }
}