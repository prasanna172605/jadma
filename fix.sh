sed -i -e 's/import { blogApi }/import { blogApi } from "..\/lib\/api\/blogApi";/g' src/pages/Blog.tsx
sed -i -e 's/import { blogApi }/import { blogApi } from "..\/lib\/api\/blogApi";/g' src/pages/BlogPostDetail.tsx
sed -i -e 's/import { blogApi }/import { blogApi } from "..\/..\/lib\/api\/blogApi";/g' src/pages/Admin/BlogManager.tsx
