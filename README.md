# MatchHistory-LoL-RiotAPI
Aplicação que lista o histórico de partidas do League of Legends do jogador utilizando a API da Riot

Necessário Yarn e NodeJS

Executar na pasta raiz:
  - yarn add babel/cli
  - yarn add babel/core
  - yarn add babel/preset-env

 Obter static data:
  - https://riotapi.dev/en/latest/ddragon.html
  - adicionar static data a pasta assets (assets/ddragon)
  
 Adicionar no package.json:
  - "scripts": { "dev": "babel ./assets/js/summoner.js ./assets/js/jsonData.js ./assets/js/main.js -o ./assets/js/bundle.js -w" }
    
 Criar arquivo .babelirc:
  - inserir linha: { "presets": [@babel/preset-env] }
