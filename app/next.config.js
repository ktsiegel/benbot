module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/practice/:path*",
        destination: "http://localhost:5000/practice/:path*",
      },
    ];
  };
  return {
    rewrites,
  };
};