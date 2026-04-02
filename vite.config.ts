import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { exec } from "child_process";

const OVERRIDES_FILE = path.resolve(__dirname, "src/data/slide-overrides.json");

const slideOverridesPlugin = {
  name: "slide-overrides-api",
  configureServer(server: any) {
    server.middlewares.use("/api/slide-overrides", (req: any, res: any) => {
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
          return res.end("{}");
        }
      }

      if (req.method === "POST") {
        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => chunks.push(chunk));
        req.on("end", () => {
          try {
            const body = Buffer.concat(chunks).toString("utf-8");
            JSON.parse(body); // validate JSON
            fs.writeFileSync(OVERRIDES_FILE, JSON.stringify(JSON.parse(body), null, 2), "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));

            // Auto commit + push
            const cwd = __dirname;
            exec(
              `git add -A && git commit -m "chore: salvar edições dos slides" && git push origin main`,
              { cwd },
              (err, stdout, stderr) => {
                if (err) console.error("[slide-overrides] git error:", stderr);
                else console.log("[slide-overrides] git push:", stdout.trim());
              }
            );
          } catch (e) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid JSON" }));
          }
        });
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
