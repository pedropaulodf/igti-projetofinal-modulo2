/** 

(✔️) 1. Criar uma função que irá criar um arquivo JSON para cada estado representado no arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser o UF do estado, por exemplo: MG.json. 

(✔️) 2. Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. 

(✔️) 3. Criar um método que imprima no console um array com o UF dos cinco estados que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”] 

(✔️) 4. Criar um método que imprima no console um array com o UF dos cinco estados que menos possuem cidades, seguidos da quantidade, em ordem decrescente. Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF - 27”, “UF - 25”, “UF - 23”, “UF - 21”] 

(✔️) 5. Criar um método que imprima no console um array com a cidade de maior nome de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...]. 

(✔️) 6. Criar um método que imprima no console um array com a cidade de menor nome de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...]. 

(✔️) 7. Criar um método que imprima no console a cidade de maior nome entre todos os estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF". 

(✔️) 8. Criar um método que imprima no console a cidade de menor nome entre todos os estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF". 

Observações: 
- Nos itens que tratam a respeito do tamanho do nome da cidade, em caso de empate no tamanho entre várias cidades, você deve considerar a ordem alfabética para ordenar as cidades pelo seu nome, e então retornar a primeira cidade. 

- Você deve considerar os nomes das cidades da forma que estão no arquivo, mesmo que tenha observações no nome entre parênteses. Exemplo: Cidade X (antiga Cidade Y). 

- Ao rodar o projeto, ele deve executar os métodos em sequência e depois finalizar a execução.

 */

import { promises as fs } from "fs";

const pathFileStates = "modulo2/trabalho-pratico-modulo-2/";

let allStates = [];
let allCities = [];

constructor();

async function constructor() {
    await Promise.all([setAllStates(), setAllCities()]);
    // mergeStatesAndCities();

    // Function for activity 1
    // createEachStatesFiles();

    // Function for activity 2
    // stateTotalCities("MG");

    // Function for activity 3
    // mostFivePopulateStates();

    // Function for activity 4
    // lessFivePopulateStates();

    // Function for activity 5
    // mostLongNameCitiesEachState();

    // Function for activity 6
    // mostShortNameCitiesEachState();

    // Function for activity 7
    // mostPopulateCity();

    // Function for activity 8
    // lessPopulateCity();
}

async function setAllStates() {
    try {
        const res = await fs.readFile(`${pathFileStates}/js/Estados.json`, "utf-8");
        allStates = JSON.parse(res);
    } catch (error) {
        console.log('Erro #1: ' + error);
    }
}

async function setAllCities() {
    try {
        const res = await fs.readFile(`${pathFileStates}/js/Cidades.json`, 'utf-8');
        allCities = JSON.parse(res);
    } catch (error) {
        console.log('Erro #2: ' + error);
    }
}

function createEachStatesFiles() {
    let allStateCities = [];

    allStates.forEach(state => {
        allStateCities = allCities.filter(city => {
            return parseInt(city.Estado) === parseInt(state.ID);
        });

        fs.writeFile(`${pathFileStates}/statesFiles/${state.Sigla}.json`, JSON.stringify(allStateCities, null, 2));
    })
}

/**
 * Question item 2
 */
async function stateTotalCities(uf) {
    try {
        const res = JSON.parse(await fs.readFile(`${pathFileStates}/statesFiles/${uf}.json`, "utf-8"));
        console.log(res.length);

    } catch (error) {
        console.log("Erro #4: " + error)
    }
}

/**
 * Function who auxiliates resolutions of questions 3 and 4
 */
async function getTotalCitiesInStates() {
    let mostPopulateStates = [];
    try {
        const statesFiles = await fs.readdir(`${pathFileStates}/statesFiles`, "utf-8");

        for (let i = 0; i < statesFiles.length; i++) {
            let res = JSON.parse(await fs.readFile(`${pathFileStates}/statesFiles/${statesFiles[i]}`, "utf-8"));
            mostPopulateStates.push(statesFiles[i].slice(0, 2) + " - " + res.length);
        }

        return mostPopulateStates;
    } catch (error) {
        console.log("Erro #5: " + error)
    }
}

/**
 * Funtion who sorts arrays by the number in the each string value
 */
function sortByNumberInArrayAB(a, b) {
    return (Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]));
}

function sortByNumberInArrayBA(b, a) {
    return (Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]));
}

/**
 * Question item 3
 */
async function mostFivePopulateStates() {
    try {
        let mostPopulateStates = await getTotalCitiesInStates();
        // Show the resolution of the question
        console.clear();
        console.log(mostPopulateStates.sort(sortByNumberInArrayBA).slice(0, 5));
    } catch (error) {
        console.log("Erro #6: " + error)
    }
}

/**
 * Question item 4
 */
async function lessFivePopulateStates() {
    try {
        let lessPopulateStates = await getTotalCitiesInStates();
        // Show the resolution of the question
        console.clear();
        console.log(lessPopulateStates.sort(sortByNumberInArrayAB).slice(0, 5));
    } catch (error) {
        console.log("Erro #7: " + error);
    }
}

/**
 * Question item 5
 */
async function mostLongNameCitiesEachState() {
    let maiorNomeCadaEstado = [];
    let maiorNome = "";

    try {
        allStates.forEach(estado => {
            allCities.filter(city => {
                if (city.Nome.length > maiorNome.length && parseInt(city.Estado) === parseInt(estado.ID)) {
                    maiorNome = city.Nome;
                }
            })
            maiorNomeCadaEstado.push(`${estado.Sigla}: ${maiorNome} - ${maiorNome.length}`)
            maiorNome = "";
        })

        // Show the resolution of the question
        console.clear();
        console.log(maiorNomeCadaEstado.sort(sortByNumberInArrayBA));

    } catch (error) {
        console.log("Erro #8: " + error)
    }
}
/**
 * Question item 6
 */
async function mostShortNameCitiesEachState() {
    let menorNomeCadaEstado = [];
    let menorNome = allCities[0].Nome;
    try {
        allStates.forEach(estado => {
            allCities.filter(city => {
                if (city.Nome.length < menorNome.length && parseInt(city.Estado) === parseInt(estado.ID)) {
                    menorNome = city.Nome;
                }
            })

            menorNomeCadaEstado.push(`${estado.Sigla}: ${menorNome} - ${menorNome.length}`);
            menorNome = allCities[0].Nome;
        })

        // Show the resolution of the question
        console.clear();
        console.log(menorNomeCadaEstado.sort(sortByNumberInArrayAB));

    } catch (error) {
        console.log(error);
    }
}

/**
 * Question item 7
 */
async function mostPopulateCity() {
    let maiorNomeCadaEstado = [];
    let maiorNome = "";
    let stateOfCity = "";

    try {
        allCities.filter(city => {
            if (city.Nome.length > maiorNome.length) {
                maiorNome = city.Nome;
                stateOfCity = city.Estado;
            }
        })

        stateOfCity = allStates.find(state => {
            return state.ID === stateOfCity;
        })

        maiorNomeCadaEstado.push(`${maiorNome} - ${stateOfCity.Sigla}`);

        // Show the resolution of the question
        console.clear();
        console.log(maiorNomeCadaEstado.sort(sortByNumberInArrayBA));

    } catch (error) {
        console.log("Erro #8: " + error)
    }
}

/**
 * Question item 8
 */
async function lessPopulateCity() {
    let menorNomeCadaEstado = [];
    let menorNome = allCities[0].Nome;

    try {
        allStates.forEach(state => {
            allCities.filter(city => {
                if (city.Nome.length <= menorNome.length) {
                    menorNome = city.Nome;
                    menorNomeCadaEstado.push(`${menorNome} - ${state.Sigla}`);
                }
            })
        })

        // Show the resolution of the question
        console.clear();
        console.log(menorNomeCadaEstado.sort().sort((a, b) => a.length - b.length).slice(0, 1));

    } catch (error) {
        console.log(error);
    }
}



