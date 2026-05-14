## LiveAvatar Web Resources

This repository contains the web resources for LiveAvatar.

### Packages

We offer the following web SDKs to help you quickly build with Live Avatar.

- `@heygen/liveavatar-web-sdk`: [The LiveAvatar Web SDK](https://www.npmjs.com/package/@heygen/liveavatar-web-sdk)

### Demos

Reference apps for building with LiveAvatar. Each is a standalone Next.js app under `apps/`.

| Demo               | Path                                             | Port | What it shows                                                                                                                   |
| ------------------ | ------------------------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------- |
| Basic demo         | [`apps/demo`](./apps/demo)                       | 3001 | Minimal LiveAvatar session — config form, video stream, voice chat. Good starting point.                                        |
| Background removal | [`apps/bg-removal-demo`](./apps/bg-removal-demo) | 3002 | Client-side chroma-key on the green-screen video stream. Swap background to color, image, or video URL with no session restart. |

Run a demo:

```bash
pnpm install
pnpm demo               # apps/demo (basic) on http://localhost:3001
pnpm demo:bg-removal    # apps/bg-removal-demo on http://localhost:3002
```

Each demo has its own README with setup details and required environment variables.

### Additional Resources

- LiveAvatar Website: [https://liveavatar.com](https://liveavatar.com)
- API Documentation: [https://docs.liveavatar.com](https://docs.liveavatar.com)

# Liveavatar NextJS Demo

This is a quick demo to demonstrate the various capabilities of the LiveAvatar Web SDK.

## Installation

This demo was built with NextJS, TailwindCSS and pnpm.

To start up the demo, run the following commands on your terminal within the base directory:

```bash
pnpm install
pnpm build
pnpm run demo
```

You can also run navigate to the `apps/demo` directory and run the following commands:

```bash
pnpm install
pnpm build
pnpm run dev
```
