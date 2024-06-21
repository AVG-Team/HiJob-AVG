import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Aos from "aos";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), Aos],
});
