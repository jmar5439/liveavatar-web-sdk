# 🚀 Deployment (Vercel)

This project is deployed using Vercel.

## 📁 Root Directory

The application lives inside:

```
apps/demo
```

Make sure to configure this as the **Root Directory** in Vercel settings, or use the CLI with the correct path.

---

## ⚙️ Local Deployment via CLI

If you have the Vercel CLI installed:

```
npm i -g vercel
```

### 🔹 First-time setup
```
cd apps/demo
vercel
```

### 🔹 Deploy to production
```
vercel --prod --cwd apps/demo
```

---

## 💡 Alternative (from inside the folder)

```
cd apps/demo
vercel --prod
```

---

## 🧠 Notes

- This project uses a **monorepo structure**, so deployments must target the `apps/demo` directory.
- If deploying via the Vercel dashboard, set:
  - **Root Directory** → `apps/demo`
- Environment variables should be configured in the Vercel dashboard if required.
