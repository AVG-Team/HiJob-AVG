import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '~': '/src', // Hoặc bất kỳ thư mục gốc nào bạn muốn
        },
    },
});
