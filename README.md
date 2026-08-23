# VIZIATA Charter

Premium React landing page for chartering **VIZIATA**, a 130' Westport based in the Bahamas.

New GitHub repo: [shregime/viziata-charter](https://github.com/shregime/viziata-charter)  
Not `studio22-landing` or `studio22-site`.

## Local (complete, with brochure photos)

```bash
cd /Users/Regime/src/viziata-charter
npm install
npm run dev
```

Preview is also at `http://127.0.0.1:4173` if `npm run preview` is running.

## Push photos and latest source

This machine does not have GitHub HTTPS credentials. From a logged-in terminal:

```bash
cd /Users/Regime/src/viziata-charter
git remote add origin https://github.com/shregime/viziata-charter.git   # if needed
git push -u origin main
```

## Vercel Hobby (new project)

Do **not** reuse the Studio 22 Vercel projects. Import this repo as a new Hobby project:

1. Open [vercel.com/new](https://vercel.com/new)
2. Import `shregime/viziata-charter`
3. Framework: Vite. Root: `./`
4. Deploy

Or from the repo after login:

```bash
npx vercel@32.3.0 login --github --oob
npx vercel@32.3.0 --yes --name viziata-charter --prod
```

## Specs used

Fraser is treated as current (summer from $99,000; 2026 32' World Cat).  
YachtCharterFleet supplies beam, draft, range, cabin split, and 24/28 knot speeds.

## Inquiries

Set `VITE_INQUIRY_EMAIL` if you want FormSubmit to a different inbox. Default is the GitHub account email.
