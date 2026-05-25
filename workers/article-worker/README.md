# Article Worker

AI Product Build Labの記事下書きをローカルテンプレートから生成するワーカーです。

この初期版は外部AI APIに接続しません。静的なseed topicsとテンプレートを使い、公開前レビュー用のMarkdownを `docs/article-drafts` に保存します。

## Commands

```bash
npm install
npm run generate -- --dry-run
npm run generate
npm run generate -- --count 3
```

## Output

デフォルトの出力先:

```txt
../../docs/article-drafts
```

VPSなどで出力先を明示する場合:

```bash
ARTICLE_DRAFT_OUTPUT_DIR=/opt/ai-business/apps/ai-product-build-lab/docs/article-drafts npm run generate
```

## Safety

- 既存の公開記事を読み取り、slugや内容の重複を避けます。
- 既存記事・既存draftは削除、上書きしません。
- slugが衝突する場合は `-2`, `-3` のように連番を付けます。
- 生成記事は `status: "draft"` と `review_status: "needs_review"` を持ちます。
- 公開する場合は、人間がレビューした後に `apps/web/src/content/articles` へ移動してください。
