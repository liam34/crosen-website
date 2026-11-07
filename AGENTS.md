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

- Keep the cleaning service categories and illustrative gallery content in `src/lib/content.ts` so all pages use the same service definitions.
- Use the uploaded logo through its asset pointer and a real downscaled favicon in `public/` so branding is shared without bundling the original upload.
