import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { exec } from "child_process";

// ⚠️ Arquivo FORA de src/ para não disparar HMR do Vite
const OVERRIDES_FILE = path.resolve(__dirname, "data/slide-overrides.json");

const slideOverridesPlugin = {
  name: "slide-overrides-api",
  configureServer(server: any) {
    // Parse JSON body helper
    const parseBody = (req: any): Promise<string> =>
      new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
        req.on("error", reject);
      });

    server.middlewares.use("/api/slide-overrides", async (req: any, res: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");

      if (req.method === "OPTIONS") {
        res.statusCode = 204;
        return res.end();
      }

      if (req.method === "GET") {
        try {
          const data = fs.existsSync(OVERRIDES_FILE)
            ? fs.readFileSync(OVERRIDES_FILE, "utf-8")
            : "{}";
          res.setHeader("Content-Type", "application/json");
          return res.end(data);
        } catch {
          res.setHeader("Content-Type", "application/json");
          return res.end("{}");
        }
      }

      if (req.method === "POST") {
        try {
          const body = await parseBody(req);
          const parsed = JSON.parse(body);
          const pretty = JSON.stringify(parsed, null, 2);

          // Ensure data/ directory exists
          const dir = path.dirname(OVERRIDES_FILE);
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

          fs.writeFileSync(OVERRIDES_FILE, pretty, "utf-8");
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));

          // Background: git commit + push
          exec(
            `git add -A && git commit -m "chore: salvar edições dos slides" && git push origin main`,
            { cwd: __dirname },
            (err, stdout, stderr) => {
              if (err) console.error("[slide-overrides] git error:", stderr);
              else console.log("[slide-overrides] git push:", stdout.trim());
            }
          );
        } catch (e) {
          console.error("[slide-overrides] POST error:", e);
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Invalid JSON" }));
        }
        return;
      }

      res.statusCode = 405;
      res.end();
    });
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && slideOverridesPlugin,
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
