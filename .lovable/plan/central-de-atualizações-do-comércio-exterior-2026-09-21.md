# Central de Atualizações do Comércio Exterior

## Objetivo
Transformar somente a página `/blog` em uma central de notícias oficiais, mantendo a URL, a identidade visual aprovada e todas as demais páginas intactas.

## Implementação
- Criar uma função de servidor para consultar os feeds oficiais do MDIC e do Siscomex, sem requisições RSS diretas do navegador.
- Ler os feeds de Informativos do MDIC e de notícias Siscomex de Importação, Exportação e Sistemas.
- Normalizar título, fonte, data, resumo, categoria e URL original; remover marcação do resumo, limitar seu tamanho e validar links HTTPS oficiais.
- Ordenar pelas datas mais recentes e eliminar duplicidades por URL e por título normalizado.
- Tratar cada fonte de forma independente: se um feed falhar, os demais continuam; se todos falharem, a página mantém os conteúdos anteriores sem expor erro técnico.
- Usar cache HTTP na resposta dos feeds para reduzir chamadas, sem afirmar que existe um agendamento diário.

## Experiência da página
- Atualizar o título da área para “Central de Atualizações do Comércio Exterior”.
- Destacar a notícia mais recente e apresentar as demais em uma grade editorial assimétrica, integrada à estética atual.
- Exibir fonte, data, categoria, resumo curto e o comando “Ler notícia completa”, sempre abrindo a publicação oficial em nova aba.
- Adicionar filtros leves: Todos, Comércio Exterior, Importação, Exportação, Aduana, Siscomex e Legislação e regulamentação.
- Mostrar apenas filtros que tenham resultados e informar um estado vazio claro quando uma seleção não tiver notícias.
- Preservar os dois conteúdos atuais em “Conteúdos anteriores”, sem inventar URLs de detalhe inexistentes.

## Navegação e SEO
- Manter a URL `/blog` para preservar indexação e links existentes.
- Renomear somente os rótulos visíveis ligados à área: navegação, chamada da Home e metadados da própria página.
- Definir título, descrição, Open Graph e Twitter adequados à Central.

## Validação
- Conferir carregamento real dos feeds, ordenação, deduplicação, filtros e links externos.
- Revisar a página em desktop e celular, incluindo falha silenciosa dos feeds e ausência de mensagens técnicas.
- Fazer uma busca final por referências antigas a “Blog” onde o novo nome deve aparecer.
