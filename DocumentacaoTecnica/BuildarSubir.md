# Build

```bash
npm install
npm run build
```

Saída em `dist/`. Publicar o conteúdo dessa pasta (Hostinger: `public_html/`).

Teste local: `npm run dev` (http://localhost:5173).

# Subir no GitHub (somente a página)

Sobe apenas o conteúdo de `dist/`.

```bash
npm run build
cd dist
git init
git add .
git commit -m "site"
git branch -M main
git remote add origin https://github.com/amaurysimoes/Amaury_Desenvolvedor.git
git push -u origin main --force
```

Ativar o site: GitHub → repositório → **Settings → Pages** → Source: **Deploy from a branch** → `main` / `/ (root)` → Save.

Endereço: https://amaurysimoes.github.io/Amaury_Desenvolvedor/

## Atualizar

```bash
npm run build
cd dist
git add .
git commit -m "atualiza"
git push
```

Se `dist/` for apagada e recriada (o build faz isso), repita o bloco acima de `git init` em diante.

# Subir no GitHub (projeto completo)

Na raiz do projeto (não em `dist/`):

```bash
git init
git add .
git commit -m "portfolio"
git branch -M main
git remote add origin https://github.com/amaurysimoes/Amaury_Desenvolvedor.git
git push -u origin main
```

Ativar o site: **Settings → Pages → Source: GitHub Actions**. Cada `git push` na `main` faz o build e publica sozinho (`.github/workflows/deploy.yml`).

Se o repositório já tiver a versão "somente a página", use `git push -u origin main --force` no primeiro envio.

## Atualizar

```bash
git add .
git commit -m "atualiza"
git push
```
