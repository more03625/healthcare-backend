import swaggerAutogen from "swagger-autogen";
import fs from "fs";
import path from "path";
import routes from "./routes"; // Import the route config


// Scan folders dynamically based on `routes.js`
const endpointsFiles: string[] = [];
routes.forEach(({ folder }) => {
    const routePath = path.join(__dirname, folder, "routes.ts");
    if (fs.existsSync(routePath)) {
        endpointsFiles.push(routePath);
    }
});

const outputFile = "./swagger-output.json";

swaggerAutogen()(outputFile, endpointsFiles).then(() => {
    console.log("✅ Swagger documentation generated dynamically!");
});
