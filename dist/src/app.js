import express from "express";
const app = express();
app.get("/api/health", (request, response) => {
    response.status(200).json({
        message: "API is running",
        uptime: `${process.uptime().toFixed(2)} seconds`,
    });
});
const PORT = process.env.PORT || "8000";
app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
export default app;
