# Aprendizados

Registro curto do que aprendi construindo o MovieMood: erros, decisões e conceitos.

## Git

- **Nunca versionar `.env`.** No GoodMovies o `.env` foi commitado e o repositório era público. Apagar o arquivo depois não resolve, porque ele continua no histórico. O `.gitignore` do Vite só ignora `*.local`, então a regra de `.env` precisa ser adicionada antes do primeiro commit. Para conferir: `git log --all --oneline -- .env` tem que voltar vazio.
- **No `.gitignore`, a última regra que casa vence.** A exceção (`!.env.example`) vem depois da regra geral (`.env*`). `git check-ignore -v <arquivo>` mostra qual linha decidiu.
- **Um commit, um assunto.** `git add <arquivo>` em vez de `git add .` evita levar mudanças sem relação. Sempre `git status` antes de commitar.
- **`push` recusado com `Permission denied (publickey)`** significa remoto em SSH sem chave cadastrada. `git remote -v` mostra o endereço; `git remote set-url origin <url https>` troca.

## VS Code

- **`files.autoSave: afterDelay` não dispara o formatar ao salvar.** Só o `Ctrl+S` (ou `onFocusChange`) formata. Se o `format:check` reclamar de um arquivo que "devia estar formatado", é isso.

## Vite e TypeScript

- **O `index.html` na raiz é a entrada do projeto.** O servidor do Vite devolve ele em `/`, e o `<script type="module" src="/src/main.tsx">` puxa o resto. O Vite converte TSX para JS a cada pedido.
- **`tsc -b` só confere tipos** (`noEmit: true`). Quem gera os arquivos é o `vite build`, que não confere tipos. O `npm run dev` também não confere: erro de tipo aparece no editor, mas o app roda.
- **Três `tsconfig`:** `app` para o código do navegador (`src`), `node` para o `vite.config.ts` (roda no Node), e o da raiz só aponta para os dois.
- **Variáveis `VITE_*` vão para o JavaScript final.** Qualquer visitante vê o token na aba Network. O `.env` protege do GitHub, não do usuário; só um backend esconde. Nunca pôr no frontend chave com acesso de escrita ou que gere cobrança.
- **O Vite só lê o `.env` ao iniciar.** Mudou o `.env`, reinicie o `npm run dev`.
- **Dois consoles:** o terminal mostra erros do Vite (build, imports); o do navegador mostra erros do app (fetch, componentes).
- **Tipos da API seguem a resposta real:** datas chegam como `string`; campos que podem faltar são `string | null`. O `tmdbFetch<T>` é uma promessa ao TypeScript, não uma verificação.
- **`import type`** para importar só tipos (exigido pelo `verbatimModuleSyntax`).
- **Arquivo pelo assunto, não pela função:** `api/movies.ts` reúne as funções de filmes. Separar quando o arquivo incomodar.

## API e fetch

- **`fetch` não lança erro em 401 ou 404**, só em falha de rede. O `if (!response.ok) throw ...` é obrigatório.
- **`new URL` + `searchParams`** para montar endereços, em vez de juntar texto (trata espaços e `&`).
- **`await` ou `.then()`, nunca os dois juntos.**

## TanStack Query

- **Estado do servidor ≠ estado local.** Os filmes moram na API; o app só tem uma cópia. O TanStack Query gerencia essa cópia: busca, cache, evita requisições repetidas e atualiza.
- **`queryKey` é o nome do dado no cache** (`['movies', 'trending']`). Mesma chave = mesmo dado e uma requisição só. **`queryFn` recebe a função sem parênteses**: quem chama é a biblioteca.
- **No v5, usar `isPending`** ("ainda não tenho dado"). `isLoading` é outra coisa; tutoriais do v4 usam o nome antigo.
- **O `QueryClient` é criado fora de componentes**, senão um cache novo nasceria a cada renderização.
- **`staleTime` padrão é 0:** todo dado nasce "velho" e é buscado de novo ao voltar para a aba ou remontar o componente.

## React

- **`StrictMode` roda renderização e efeitos duas vezes em desenvolvimento**, de propósito, para revelar efeitos que não se limpam. Em produção roda uma vez. O banner de erro na tela é do Vite, não do StrictMode.
- **Fragment (`<>...</>`) só é necessário para retornar mais de um elemento.**
- **O `StrictMode` só afeta o que roda dentro de componentes:** uma chamada solta no `main.tsx` roda uma vez; dentro do `useEffect`, duas (em desenvolvimento).
- **`useEffect` sem lista de dependências roda a cada renderização.** Com um `set` dentro, vira laço infinito de requisições. `[]` = só quando o componente aparece.
- **A função do `useEffect` não pode ser `async`:** criar uma função `async` dentro dele e chamá-la.
- **Buscar dados tem quatro estados:** carregando (`isLoading` começa `true`), erro, vazio e sucesso. `setIsLoading(false)` vai no `finally`, senão um erro deixa a tela carregando para sempre. Um `if` com `return` por estado, sucesso por último.
- **`key` vai no elemento mais de fora que o `map` devolve**, e o `map` repete só o que se repete (`<li>`, não o `<ul>`). Usar o `id`, não o índice.
- **Estreitamento de tipo:** depois de `if (isPending) return` e `if (error) return`, o TypeScript sabe que `data` existe. A ordem dos `if`s importa.
- **Só envolver elementos com motivo** (estilo do grupo ou mais de um elemento). `<div>` ou Fragment em volta de um único elemento é camada sobrando.
