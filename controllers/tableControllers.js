const fetch = require('node-fetch');
let endPoint = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

const fetchApi = async ()=>{
    const data = await fetch(endPoint, {headers:{"conten-type":"application/json"}})
    return data.json()
}

module.exports.table_get = async(req , res) =>{
    const allCryptos = await fetchApi()
    let cryptos = allCryptos.slice(0, 16)

    res.render("Table", {cryptos})
}

module.exports.tableUpdate_get = async (req, res)=> {
    //array for saving the index of added crypto for increasing the cryptos array
    let crypto_index = []
    let queryString= ""
    queryString = req.query.keys

    for(let i=0;i<queryString.length;i=i+3){
        crypto_index.push(queryString[i]+queryString[i+1])
    }
    const allCryptos = await fetchApi()
    let cryptos = allCryptos.slice(0, 16)
    if(crypto_index.length > 0){
        for(let i=0;i<crypto_index.length;i++){
            let num=parseInt(crypto_index[i], 10)
            cryptos = cryptos.concat(allCryptos.slice(num, num+1))
        }
    }
    res.json({cryptos}) 
}
//added the new crypto currency
module.exports.tableAdd_get = async (req, res)=>{
    
    const allCryptos = await fetchApi()
    let index = allCryptos.findIndex(element=>{   
        if(element.symbol === req.params.sym){     
            return true
        }
    })
    if(index != -1){
        //add index property to wanted crypto for having the index of the wanted cryptos in frontend and sending them for updating
        allCryptos[index].index = index
        res.send(allCryptos[index])
    } 
}