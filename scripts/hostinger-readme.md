# Hostinger Shared Hosting — exportação estática

A pasta que vai para `public_html/` é **somente o conteúdo de `.output/client/`**, gerado fora do ambiente Lovable (por exemplo, por CI). Nunca envie `.output/server`, `src/` ou `node_modules/`.

1. Em ambiente de build remoto com Bun instalado, execute `bun install --frozen-lockfile` e `bun run build:hostinger`. Se o código estiver no GitHub, execute manualmente a ação **Hostinger static package** e baixe o artefato `hostinger-public-html`; o pacote também é gerado em atualizações da branch `main`. Essa ação não envia nada à Hostinger. Não é necessário instalar Node.js no computador nem ativar Node.js na Hostinger.
2. Confirme que `.output/client/index.html`, `.output/client/quem-somos/index.html`, `.output/client/servicos/index.html`, `.output/client/blog/index.html` e `.output/client/contato/index.html` existem.
3. Envie o conteúdo de `.output/client/` para `public_html/`, preservando diretórios, arquivos ocultos e `__l5e/assets-v1/`. No Apache, URLs como `/blog` devem servir o arquivo `/blog/index.html`; valide links diretos e recarregamentos antes de trocar o domínio. Caso o ambiente não resolva `/blog` sem barra final, configure apenas um redirecionamento para `/blog/`, não um fallback genérico que oculte páginas distintas.
4. O Formspree recebe POST diretamente do navegador em `https://formspree.io/f/xqpajyza`. Teste no domínio final após a migração.

## Notícias

O build remoto coleta os feeds oficiais e salva `src/data/trade-news.snapshot.json`, preservando o último retrato confirmado caso todas as fontes falhem. Para notícias novas, gere e envie novamente o pacote. Agendamento e envio automático dependem da configuração de um CI externo e de credenciais da hospedagem (não incluídos no projeto); não há agendamento na Hostinger nem no navegador.

O modo padrão do Lovable não foi alterado: a Central continua consultando os feeds pelo servidor da prévia. O modo Hostinger lê exclusivamente o retrato estático.
