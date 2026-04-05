module.exports = {
  apps: [{
    name: "certihomes-videos",
    cwd: "/home/krish/certihomes-videos",
    script: "npx",
    args: "remotion studio --port 3043",
    env: {
      NODE_ENV: "production"
    },
    watch: false,
    max_restarts: 5,
    restart_delay: 5000
  }]
};
