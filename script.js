const IP_API_URL = 'https://api.ipify.org?format=json';
const HISTORY_KEY = 'ipHistory';

// Função para obter o IP atual
async function getCurrentIP() {
    try {
        const response = await fetch(IP_API_URL);
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Erro ao obter IP:', error);
        return 'Erro ao obter IP';
    }
}

// Função para carregar o histórico do localStorage
function loadHistory() {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

// Função para salvar o histórico no localStorage
function saveHistory(history) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

// Função para exibir o histórico
function displayHistory(history) {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="ip">${item.ip}</span>
            <span class="date">${item.date}</span>
        `;
        historyList.appendChild(li);
    });
}

// Função principal
async function init() {
    const currentIP = await getCurrentIP();
    document.getElementById('current-ip').textContent = `IP Atual: ${currentIP}`;

    let history = loadHistory();

    // Verifica se o IP atual é diferente do último no histórico
    const lastEntry = history.length > 0 ? history[history.length - 1] : null;
    if (!lastEntry || lastEntry.ip !== currentIP) {
        const now = new Date().toLocaleString('pt-BR');
        history.push({ ip: currentIP, date: now });
        saveHistory(history);
    }

    displayHistory(history);
}

// Inicia a aplicação
init();