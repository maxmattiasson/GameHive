import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GameHive API",
      version: "1.0.0",
      description: "API documentation for GameHive",
    },
    servers: [
      { url: "http://localhost:3000/api", description: "Local server" }
    ],
  },
  apis: ["./src/routes/*.ts", "./src/auth/*.ts"], // or wherever your route files are
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;