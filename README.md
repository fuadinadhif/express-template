# Deploy an Express.js App to Vercel (the Serverless Way)

Vercel is mainly designed for frontend apps like Next.js — but you can absolutely deploy small backend apps (like Express.js) using Vercel Serverless Functions. You just need to adapt your app a bit.

Let’s walk through it together.

## Requirements

1. Node.js and NPM installed
2. Vercel CLI (npm i -g vercel)
3. A Vercel account (vercel login)
4. A working Express application (clone from this repository)

## Project Structure

```bash
.
├── dist/
├── prisma/
│ ├── schema.prisma
│ └── seed.ts
├── src/
│ ├── app.ts ← # Express app
│ └── configs/
│ └── prisma.config.ts
├── api/
│ └── index.ts ← # Vercel serverless entry
├── package.json
├── tsconfig.json
└── vercel.json ← # Vercel configuration file
```

## Deployment Step

1. Make sure the Express application working properly
2. Export the Express app
3. Create an api/index.ts file for the Vercel entry point
4. Create a vercel.json file to set up the Vercel configuration
5. Deploy to Vercel

### `src/app.ts`

```ts
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/api/health", (request: Request, response: Response) => {
  response.status(200).json({
    message: "API is running",
    uptime: `${process.uptime().toFixed(2)} seconds`,
  });
});

const PORT: string = process.env.PORT || "8000";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

export default app; // Export app so it can be used in the api/index.ts file
```

### `api/index.ts`

```ts
// api/index.ts
import app from "../src/app.js"; // uses .js because we're using es module and importing compiled code

export default app;
```

#### Explanation:

Vercel doesn’t run a background server. It only runs your code when a request comes in. So we just export the app, and Vercel will take care of the rest.

### `vercel.json`

```json
{
  "version": 2,
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }],
  "builds": [
    {
      "src": "api/index.ts",
      "use": "@vercel/node"
    }
  ]
}
```

#### Explanation

- `rewrites`: Sends all traffic to the Express app.
- `builds`: Compiles api/index.ts into a serverless function using @vercel/node.

### Deploy to Vercel

1. Make sure you have the Vercel CLI

   ```bash
   npm install -g vercel
   ```

2. Next, login to Vercel to authorize the Vercel CLI to run commands on your Vercel account.

   ```bash
   vercel login
   ```

3. Run the deployment command

   ```bash
   vercel
   ```

4. Follow the prompts (you can hit Enter for most of them)
5. After deployment, Vercel will give you a live URL like: `https://your-project-name.vercel.app/api/hello`

   Try visiting it in the browser — you’ll see your Express app running!
