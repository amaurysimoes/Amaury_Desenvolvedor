# Build

```bash
npm install
npm run build
```

Saída em `dist/`. Para Hostinger, publicar o conteúdo dessa pasta em `public_html/`.

Teste local: `npm run dev` (http://localhost:5173).

# Publicação (GitHub Pages)

Repositório: https://github.com/amaurysimoes/Amaury_Desenvolvedor (projeto completo, não só `dist/`).

Endereço: https://amaurydesenvolvedor.com.br (também https://amaurysimoes.github.io/Amaury_Desenvolvedor/)

Cada `git push` na `main` faz o build e publica sozinho (`.github/workflows/deploy.yml`).

**Settings → Pages → Source precisa ficar em `GitHub Actions`.** Em "Deploy from a branch" o GitHub publica o código-fonte sem build e a página fica em branco (erro de `/src/main.jsx` no console). Mexer no domínio (Custom domain) pode voltar essa opção para branch: conferir depois.

Não subir só a `dist/` nem usar `git push --force`: isso apaga o projeto do repositório.

# Máquina nova

1. Instalar Git e Node.js 18+ (`winget install --id Git.Git -e`, https://nodejs.org) e reabrir o terminal/VS Code.
2. Configurar (uma vez por máquina):
   ```bash
   git config --global user.name "Amaury Simões"
   git config --global user.email "amaury.hs@gmail.com"
   ```
3. Baixar o projeto:
   ```bash
   git clone https://github.com/amaurysimoes/Amaury_Desenvolvedor.git
   cd Amaury_Desenvolvedor
   npm install
   ```
   Se a pasta já existir sem git (cópia de outra máquina), rodar dentro dela:
   ```bash
   git init -b main
   git remote add origin https://github.com/amaurysimoes/Amaury_Desenvolvedor.git
   git fetch origin
   git checkout -f -B main --track origin/main
   npm install
   ```
   O `checkout -f` deixa os arquivos iguais ao GitHub (os do `.gitignore` não são tocados).

No primeiro `git push` o navegador abre para login no GitHub; fica salvo no Windows.

# Dia a dia

```bash
git pull
# editar
git add .
git commit -m "o que mudou"
git push
```

# Página em branco

- Só num computador (no celular abre): cache do navegador. Ctrl+F5, aba anônima ou limpar os dados do site.
- Em todos: conferir **Settings → Pages → Source = GitHub Actions** e rodar **Actions → Deploy → Run workflow**.
