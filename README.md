# NASA APOD - Cosmic Day

Este projeto permite que você descubra qual foi a "Foto Astronômica do Dia" (APOD) da NASA na data de sua escolha.

## Estrutura do Projeto

- `/back`: Servidor backend em Python (FastAPI).
- `/front`: Interface web (HTML/CSS/JS).

## Como Iniciar o Projeto

Siga estes passos na ordem:

### 1. Configurar o Backend

Navegue até a pasta `back` e siga as instruções:

**No Windows (PowerShell):**
```powershell
cd back

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Ativar o ambiente virtual
.\venv\Scripts\Activate.ps1

# Pesquise e instale as dependências (se ainda não o fez)
pip install -r requirements.txt

# Iniciar o servidor
python -m uvicorn main:app --reload
```

O servidor estará rodando em: `http://127.0.0.1:8000`

> **Nota:** Certifique-se de que o arquivo `.env` dentro da pasta `back` contenha sua chave da NASA:
> `NASA_API_KEY=SUA_CHAVE_AQUI`

### 2. Iniciar o Frontend

O frontend é composto por arquivos estáticos simples. Você não precisa de um servidor especial para rodá-lo localmente:

1. Navegue até a pasta `front`.
2. Abra o arquivo `index.html` em qualquer navegador (Chrome, Edge, Firefox).

---

## Tecnologias Utilizadas

- **Backend:** FastAPI, Uvicorn, Requests.
- **Frontend:** Vanilla HTML5, CSS3 (com efeitos de Glassmorphism e Estrela), JavaScript.
- **API:** NASA APOD API.
