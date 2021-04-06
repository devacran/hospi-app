export default {
  API:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "https://hospital-app-backend.vercel.app/api",
};
