# Aprendizados

Registro curto do que aprendi construindo o MovieMood: erros, decisões e conceitos.

## Git

- **Nunca versionar `.env`.** No GoodMovies o `.env` foi commitado e o repositório era público. Apagar o arquivo depois não resolve, porque ele continua no histórico. O `.gitignore` do Vite só ignora `*.local`, então a regra de `.env` precisa ser adicionada antes do primeiro commit. Para conferir: `git log --all --oneline -- .env` tem que voltar vazio.
- **No `.gitignore`, a última regra que casa vence.** A exceção (`!.env.example`) vem depois da regra geral (`.env*`). `git check-ignore -v <arquivo>` mostra qual linha decidiu.
- **Um commit, um assunto.** `git add <arquivo>` em vez de `git add .` evita levar mudanças sem relação. Sempre `git status` antes de commitar.
- **`push` recusado com `Permission denied (publickey)`** significa remoto em SSH sem chave cadastrada. `git remote -v` mostra o endereço; `git remote set-url origin <url https>` troca.

## CI e Pull Requests

- **CI roda num Linux limpo, só com o que está no commit.** Pega o que "funciona na minha máquina": arquivo esquecido fora do commit, formatação, lock desatualizado, maiúsculas em imports.
- **Workflows só são lidos em `.github/workflows/`** (com **s**). Com outro nome, o GitHub ignora sem avisar.
- **Um `git add` com um caminho errado não adiciona nada**, e os comandos seguintes falham em cascata. Ler a saída de cada comando e rodar `git status` entre `add` e `commit`.
- **Alterar workflow exige a permissão `workflow` no token** (`gh auth refresh -h github.com -s workflow`).
- **`npm ci` no CI:** instala exatamente o `package-lock.json` e falha se ele não bater com o `package.json`.
- **Log do CI: ler a partir do primeiro erro.** Os passos seguintes nem rodaram. Reproduzir localmente com o mesmo comando.
- **PR acompanha a branch:** corrigir é só commitar e enviar de novo na mesma branch.
- **Squash and merge:** cada PR vira um commit na `main`, com o título do PR como mensagem (por isso o título segue Conventional Commits). `--delete-branch` apaga a branch depois.

## VS Code

- **`files.autoSave: afterDelay` não dispara o formatar ao salvar.** Só o `Ctrl+S` (ou `onFocusChange`) formata. Se o `format:check` reclamar de um arquivo que "devia estar formatado", é isso.

## TypeScript

- **Derivar tipos em vez de copiar:** `Omit<Movie, 'genre_ids'> & { genres: Genre[] }` = o `Movie` sem um campo, mais outros.

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
- **Parâmetros como objeto** (`tmdbFetch(path, { query })`): `Object.entries` + `for` + `searchParams.set`. O `params` do axios fazia o mesmo por dentro. `{ query }` é atalho para `{ query: query }`.
- **Decidir pelo dado, não pelo texto formatado:** `movie.vote_average > 0`, e não `rating === '0'`. Booleanos com nome de pergunta (`hasRating`).

## Dependências

- **Conferir o campo `engines` antes de instalar.** O React Router 8 exige Node 22.22+; com Node mais antigo o npm só mostra um aviso `EBADENGINE` e instala assim mesmo. Depois de atualizar o Node, reiniciar o VS Code para o terminal enxergar a versão nova.
- **Tutoriais antigos envelhecem rápido.** No React Router 8 o `react-router-dom` não existe mais: tudo vem de `react-router`, e o `RouterProvider` de `react-router/dom`.

## React Router

- **Modos:** Declarativo (`<BrowserRouter>`), Data (`createBrowserRouter`, rotas fora dos componentes) e Framework (plugin do Vite, parecido com Next.js). Usamos Data, com os dados no TanStack Query.
- **Layout com `<Outlet />`:** a rota pai tem o que se repete (cabeçalho) e o `<Outlet />` marca onde a página filha entra. `index: true` é a filha do endereço exato do pai; `'*'` pega o que nenhuma rota casou.
- **`pages/` x `components/`:** página é o componente ligado a uma rota; componentes são peças usadas pelas páginas.
- **`<Link to>` em vez de `<a href>`:** troca de tela sem recarregar, mantendo o cache.
- **A URL é o estado da busca** (`useSearchParams`), não um `useState` sincronizado com `useEffect`. Endereço compartilhável, recarregar mantém, "voltar" funciona.
- **`<Form>` do React Router com `method="get"`** (o padrão) transforma cada campo com `name` em parâmetro da URL, sem recarregar. Busca é navegação: não precisa de Actions do React 19, que são para operações que mudam algo.
- **`key` fora de listas reinicia o elemento.** Campo não controlado só lê o `defaultValue` ao aparecer; com `key={query}`, o "voltar" recria o campo com o termo certo.
- **Query desligada (`enabled: false`) fica `isPending: true` para sempre.** Tratar "sem busca" antes do `isPending`. `isLoading` é `isPending && isFetching`, mas trocar por ele deixaria `data` indefinido nos `if`s seguintes.
- **SPA não restaura a rolagem sozinho:** o documento é sempre o mesmo, então a página nova abre onde a anterior estava. `<ScrollRestoration />`, uma vez no layout raiz, abre links novos no topo e devolve a posição ao voltar.
- **Card inteiro como link** é simples, mas impede botões dentro dele (HTML proíbe elemento clicável dentro de link).
- **`useParams()` devolve `string | undefined`**, porque não sabe em qual rota o componente está. `movieId!` (ou `as string`) é uma asserção: silencia o TypeScript. Aceitável quando a rota garante o parâmetro, mas a garantia fica invisível: se a rota for renomeada, ninguém avisa.

## TanStack Query

- **Estado do servidor ≠ estado local.** Os filmes moram na API; o app só tem uma cópia. O TanStack Query gerencia essa cópia: busca, cache, evita requisições repetidas e atualiza.
- **`queryKey` é o nome do dado no cache** (`['movies', 'trending']`). Mesma chave = mesmo dado e uma requisição só. **`queryFn` recebe a função sem parênteses**: quem chama é a biblioteca.
- **No v5, usar `isPending`** ("ainda não tenho dado"). `isLoading` é outra coisa; tutoriais do v4 usam o nome antigo.
- **O `QueryClient` é criado fora de componentes**, senão um cache novo nasceria a cada renderização.
- **`staleTime` padrão é 0:** todo dado nasce "velho" e é buscado de novo ao voltar para a aba ou remontar o componente.
- **Padrão no `QueryClient`, exceção na query.** `defaultOptions.queries.staleTime` vale para todas; uma query pode definir o próprio.
- **`staleTime` ≠ `refetchInterval`.** O `staleTime` só diz se o dado está velho; a busca precisa de um gatilho (montar, foco, reconexão). Buscar sozinho de tempos em tempos é `refetchInterval`.
- **Custom hook devolve o resultado do `useQuery` inteiro.** Desmontar em variáveis e montar um objeto novo quebra a ligação entre `isPending`, `error` e `data`, e o TypeScript volta a achar que `data` pode ser `undefined`.

- **Tudo o que a `queryFn` usa entra na `queryKey`** (`['movies', 'details', movieId]`). Sem o id, todos os filmes dividem a mesma posição do cache. Com argumento, `queryFn: () => getMovieDetails(id)`; sem o `() =>`, a busca rodaria na hora.
- **O TanStack Query repete buscas que falharam 3 vezes.** Inútil para 404. Com uma classe `TmdbError` que carrega o `status`, o `retry` decide: `false` para 404, até 3 para o resto.

## Camadas

- **componente → hook → api → cliente.** `api/` são funções comuns, sem React (podem rodar em qualquer lugar). `hooks/` só funciona dentro de componentes. Custom hook = função que começa com `use` e usa outros hooks.

## React

- **`StrictMode` roda renderização e efeitos duas vezes em desenvolvimento**, de propósito, para revelar efeitos que não se limpam. Em produção roda uma vez. O banner de erro na tela é do Vite, não do StrictMode.
- **Fragment (`<>...</>`) só é necessário para retornar mais de um elemento.**
- **O `StrictMode` só afeta o que roda dentro de componentes:** uma chamada solta no `main.tsx` roda uma vez; dentro do `useEffect`, duas (em desenvolvimento).
- **`useEffect` sem lista de dependências roda a cada renderização.** Com um `set` dentro, vira laço infinito de requisições. `[]` = só quando o componente aparece.
- **A função do `useEffect` não pode ser `async`:** criar uma função `async` dentro dele e chamá-la.
- **Buscar dados tem quatro estados:** carregando (`isLoading` começa `true`), erro, vazio e sucesso. `setIsLoading(false)` vai no `finally`, senão um erro deixa a tela carregando para sempre. Um `if` com `return` por estado, sucesso por último.
- **`key` vai no elemento mais de fora que o `map` devolve**, e o `map` repete só o que se repete (`<li>`, não o `<ul>`). Usar o `id`, não o índice.
- **Estreitamento de tipo:** depois de `if (isPending) return` e `if (error) return`, o TypeScript sabe que `data` existe. A ordem dos `if`s importa.
- **Props são a entrada do componente**, tipadas com um `type ...Props`. O componente só lê, nunca altera. Texto vai entre aspas; outros valores entre chaves.
- **O que não depende de props ou estado fica fora do componente** (ex.: `new Intl.NumberFormat`), senão é recriado a cada renderização.
- **Card = partes empilhadas.** A caixa com `aspect-2/3` é só do pôster; título e ano ficam fora dela, senão transbordam.
- **Caixa com proporção fixa evita layout shift:** o espaço da imagem é reservado antes dela carregar. `loading="lazy"` faz o navegador só baixar imagens perto da área visível.
- **`<img>` x `background-image`:** imagem que vem dos dados vai em `<img>` (Tailwind não gera classe para URL dinâmica, e `<img>` tem `loading="lazy"` e `alt`). Decoração fixa do estilo (grade, textura) vai no CSS.
- **Camadas com `absolute inset-0`** (imagem, degradê) e conteúdo com `relative` por cima. Prefixo `md:` = a partir de 768px.
- **`{cond && <el />}` com número desenha o número:** `{lista.length && ...}` mostra `0`. Usar `lista.length > 0`.
- **`group` / `group-hover:`** faz um filho reagir ao estado do pai. **`focus-visible:`** mostra o contorno só na navegação por teclado.
- **Funções puras em `utils/`** (formatar nota, ano, duração): sem React, sem API. Tratar `null` dentro da função em vez de forçar com `!`.
- **Hierarquia de títulos:** um `h1` por página, `h2` por seção, `h3` por item. Leitores de tela e o Google navegam por ela.
- **Tipo de união de literais** (`'w342' | 'w780'`) restringe um parâmetro a valores conhecidos.
- **Retorno antecipado vale para o componente inteiro.** Se o `App` faz `if (isPending) return`, o cabeçalho some junto. A busca de dados fica no componente que usa os dados.
- **Conteúdo variável sob um título fixo:** calcular o conteúdo numa variável (`let content` + `if/else if/else`) e usar `{content}` num único `return`. JSX é um valor como outro qualquer.
- **Código morto passa no lint, no TypeScript e no build.** Esqueci os `if ... return` antigos acima da versão nova, e o título continuou sumindo. Só o teste na tela mostrou. Ler o `git diff` antes do commit pega esse tipo de sobra.
- **`<a href>` recarrega a página inteira** (perde estado e cache). Com React Router usa-se `<Link to>`, que vira um `<a>` no HTML mas troca de tela sem recarregar.
- **Regra dos hooks:** sempre chamados, na mesma ordem, em toda renderização. Nunca depois de um `return` condicional nem dentro de `if`. Por isso os `if ... return` ficam depois de todos os hooks.
- **Nem toda busca tem os mesmos estados.** Uma lista pode vir vazia; um filme ou vem ou dá 404. Erros do mais específico para o mais genérico (`404` antes do `if (error)`).
- **Escolher o padrão pela necessidade:** `let content` serve para manter um título fixo; sem título fixo, retornos antecipados são mais simples.
- **Não ampliar um componente compartilhado para um uso provisório** (ex.: fazer o `MovieCard` aceitar `MovieDetails`).
- **`<p>` só contém texto:** `div` ou `p` dentro de `p` é HTML inválido, e o React avisa no console.
- **Só envolver elementos com motivo** (estilo do grupo ou mais de um elemento). `<div>` ou Fragment em volta de um único elemento é camada sobrando.
