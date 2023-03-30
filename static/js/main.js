document.getElementById("consultar").addEventListener("click", consultarFundos);

async function consultarFundos() {
    let tipo = document.querySelector('input[name="tipo"]:checked').value;
    let data = document.getElementById("data").value;
    let payload = {
        tipo: tipo,
        data: data
    };

    let response = await fetch("/api/consulta", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    let dataJSON = await response.json();
    exibirResultado(dataJSON.resultado);
}

function exibirResultado(resultado) {
    let tabela = document.getElementById("resultado");
    tabela.innerHTML = "";

    let thead = document.createElement("thead");
    let trHead = document.createElement("tr");
    let thData = document.createElement("th");
    thData.textContent = "Data";
    let thCNPJ = document.createElement("th");
    thCNPJ.textContent = "CNPJ";
    let thNome = document.createElement("th");
    thNome.textContent = "Nome";
    let thValor = document.createElement("th");
    thValor.textContent = "Valor";
    trHead.appendChild(thData);
    trHead.appendChild(thCNPJ);
    trHead.appendChild(thNome);
    trHead.appendChild(thValor);
    thead.appendChild(trHead);
    tabela.appendChild(thead);

    let tbody = document.createElement("tbody");

    for (let item of resultado) {
        let tr = document.createElement("tr");
        let tdData = document.createElement("td");
        tdData.textContent = item["DT_COMPTC"];
        let tdCNPJ = document.createElement("td");
        tdCNPJ.textContent = item["CNPJ_FUNDO"];
        let tdNome = document.createElement("td");
        tdNome.textContent = item["DENOM_SOCIAL"];
        let tdValor = document.createElement("td");
        tdValor.textContent = item["VL_QUOTA"].replace(".", ",");
        tr.appendChild(tdData);
        tr.appendChild(tdCNPJ);
        tr.appendChild(tdNome);
        tr.appendChild(tdValor);
        tbody.appendChild(tr);
    }

    tabela.appendChild(tbody);
}
