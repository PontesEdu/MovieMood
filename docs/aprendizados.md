# Aprendizados

Registro curto do que aprendi construindo o MovieMood: erros, decisões e conceitos.

## Git

- **Nunca versionar `.env`.** No GoodMovies o `.env` foi commitado e o repositório era público. Apagar o arquivo depois não resolve, porque ele continua no histórico. O `.gitignore` do Vite só ignora `*.local`, então a regra de `.env` precisa ser adicionada antes do primeiro commit. Para conferir: `git log --all --oneline -- .env` tem que voltar vazio.
- **No `.gitignore`, a última regra que casa vence.** A exceção (`!.env.example`) vem depois da regra geral (`.env*`). `git check-ignore -v <arquivo>` mostra qual linha decidiu.
- **Um commit, um assunto.** `git add <arquivo>` em vez de `git add .` evita levar mudanças sem relação. Sempre `git status` antes de commitar.
- **`push` recusado com `Permission denied (publickey)`** significa remoto em SSH sem chave cadastrada. `git remote -v` mostra o endereço; `git remote set-url origin <url https>` troca.

## Vite e TypeScript

- **O `index.html` na raiz é a entrada do projeto.** O servidor do Vite devolve ele em `/`, e o `<script type="module" src="/src/main.tsx">` puxa o resto. O Vite converte TSX para JS a cada pedido.
- **`tsc -b` só confere tipos** (`noEmit: true`). Quem gera os arquivos é o `vite build`, que não confere tipos. O `npm run dev` também não confere: erro de tipo aparece no editor, mas o app roda.
- **Três `tsconfig`:** `app` para o código do navegador (`src`), `node` para o `vite.config.ts` (roda no Node), e o da raiz só aponta para os dois.

## React

- **`StrictMode` roda renderização e efeitos duas vezes em desenvolvimento**, de propósito, para revelar efeitos que não se limpam. Em produção roda uma vez. O banner de erro na tela é do Vite, não do StrictMode.
- **Fragment (`<>...</>`) só é necessário para retornar mais de um elemento.**
