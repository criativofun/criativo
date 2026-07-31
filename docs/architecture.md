# Arquitetura inicial

## Objetivo

Validar a experiência completa antes de assumir custos e complexidade de
infraestrutura. A primeira versão separa apresentação, estado do fluxo e futuras
integrações.

## Fluxo do MVP

1. Família conhece a proposta na landing page.
2. Adulto envia ou fotografa o desenho.
3. Criança apresenta o personagem.
4. Criança escolhe uma aventura.
5. O sistema cria e exibe uma prévia do livro.

## Limites atuais

- Sem autenticação ou banco de dados.
- Sem envio de arquivos para servidores.
- Transformação e livro demonstrativos.
- Dados permanecem apenas durante a sessão do navegador.

## Evolução recomendada

- Frontend: migrar os componentes para Next.js com TypeScript.
- Dados: contas de adultos, perfis de crianças, personagens e aventuras.
- Arquivos: armazenamento privado com URLs temporárias.
- IA: uma camada de serviço própria, sem chamadas do navegador para provedores.
- Segurança: consentimento do responsável, moderação e exclusão de dados.
- PDF: geração no servidor a partir das páginas aprovadas.

## Entidades principais

`Conta -> Crianças -> Personagens -> Aventuras -> Páginas`

As integrações futuras devem ficar atrás de interfaces internas. Assim, modelos
de texto ou imagem podem ser substituídos sem alterar o restante do produto.

