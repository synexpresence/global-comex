<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Mantenha a exportação Hostinger em configuração de build separada e com pré-renderização de rotas e snapshot de feeds; o build padrão do Lovable continua dinâmico para não quebrar a prévia existente.
- Empacote os bytes originais das imagens referenciadas por ponteiros Lovable na saída estática; hospedagem externa não fornece `/__l5e/assets-v1/`.
