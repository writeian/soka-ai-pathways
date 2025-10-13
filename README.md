# Soka AI Approaches Explorer (Static Site)

A tiny, static choose‑your‑own‑path site to explore four approaches to AI in the classroom at **Soka University of America**.

## Features
- Single‑page app with hash routing (`/#node=...`), no backend
- Content is **data‑driven** via `nodes.json`
- Scene pages show **narrative**, **resources**, and **choices**
- Works on **GitHub Pages**; zero build steps
- Built for quick authoring in **Cursor** with the **Codex** extension

## Local Preview
Just open `index.html` in your browser (or use a simple static server).

```bash
# optional
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy to GitHub Pages
1. Create a new GitHub repo and add these files: `index.html`, `app.js`, `nodes.json`, `README.md`.
2. Commit & push to `main`.
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `/ (root)`
5. Save. After a minute, your site will be live at `https://<username>.github.io/<repo>/`.

## Editing with Cursor (Codex)
- Open the folder in **Cursor**.
- Use the AI sidebar to:
  - Update narratives/resources directly in `nodes.json`.
  - Add new nodes (IDs like `B5`, `E2B`, etc.).
  - Ask Codex to generate consistent micro‑copy or validation on links.
- Preview by running a static server or using Cursor’s built‑in preview.

## URL Conventions
- Start: `/#node=D1`
- Example: `/#node=B2A&trail=D1>B1>B2A`
- “Copy link to this step” button places the current URL on your clipboard.

## Content Structure (`nodes.json`)
```json
{
  "P1": {
    "id": "P1",
    "path": "prohibitive",
    "pathLabel": "Prohibitive",
    "title": "Setting the Boundary",
    "narrative": "…",
    "resources": [{"label":"…","url":"…","why":"…"}],
    "choices": [{"label":"…","to":"…"}]
  }
}
```

## License
MIT (or adapt to your institution’s preference)
