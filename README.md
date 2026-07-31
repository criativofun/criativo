# crIAtivo

Onde a imaginação das crianças ganha vida.

O crIAtivo transforma desenhos infantis em personagens únicos e livros
ilustrados para famílias criarem e guardarem juntas.

## Protótipo navegável

A versão inicial inclui a landing page e o fluxo demonstrativo:

`desenho → personagem → aventura → prévia do livro`

O protótipo não possui dependências. Abra `index.html` no navegador ou execute:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Estrutura

- `index.html`: conteúdo e interface principal
- `src/styles.css`: identidade visual e responsividade
- `src/app.js`: navegação e estado do fluxo de criação
- `docs/`: estratégia, experiência e arquitetura do produto
- `assets/`: logos, ícones e materiais gráficos

## Estado atual

O upload, a transformação do desenho e a geração do livro são simulados. A
interface já delimita onde autenticação, armazenamento e IA serão integrados.
