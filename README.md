# PM Site — Placeholder

This repository contains a minimal static site scaffold in the `public` folder and a GitHub Actions workflow to deploy to GitHub Pages when pushed to `main`.

Quick start

- Edit the files inside `public/` (start with `public/index.html` and `public/styles.css`).
- Commit and push to the `main` branch.
- The workflow in `.github/workflows/deploy.yml` will upload `public/` and deploy to Pages.

Verify deployment

- After the Action completes, GitHub will publish the site with a URL shown in the Pages settings or the deployment details.

Notes

- If your repository's default branch is not `main`, update the workflow trigger.
- To serve from the repository root instead of `public/`, move the site files and update the workflow `path` value.


