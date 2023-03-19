module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/practice/:path*",
        // destination: process.env.NODE_ENV === "production" ? "https://benbot-server.onrender.com/practice/:path*" : "http://localhost:5000/practice/:path*",
        destination: "http://localhost:8000/practice/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};