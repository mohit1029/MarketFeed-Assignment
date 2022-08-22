const fetch = require('node-fetch');
const axios = require('axios')


async function  numberOfContributorsfunctions(numberOfContributors,json,reposmodel){
    for(let j = 0 ; j < numberOfContributors ; j++){
                    
        if(j > json.length - 1){
            console.log("Repo not have any " + (j + 1)  + " contributor");
            break;
        }else{
            const contributor = {
                ContributorName: json[j].login,
                Conrtributions : json[j].contributions
            };
            reposmodel.push(contributor);
            
        }

    }

    return reposmodel;
}

async function getData (request,response){
    let model = [];
    console.log(request.params.n + " and " + request.params.m);
    
    const numberOfRepos = Number(request.params.n);
    
    const numberOfContributors = Number(request.params.m);
    
    let repouri = await fetch('https://api.github.com/search/repositories?q=forks;%3E&sort=forks');
    
    let data = await repouri.json();
    let items = await data.items;
    for(let i = 0 ; i < numberOfRepos ; i++){
        let reposmodel = [];
        const anot = await items[i].contributors_url
        let Contributorsuri = await fetch(anot);
        let ConvertContributorsuritoJson = await Contributorsuri.json();
        let details = await numberOfContributorsfunctions(numberOfContributors,ConvertContributorsuritoJson,reposmodel);
        const result = {
            Name: await items[i].full_name,
            Details: await details
        };

        model.push(result);
    }
    
    response.json(model);
};


module.exports = {
    getData
};