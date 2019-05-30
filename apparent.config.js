// need to use 'pm2 start npm -- start'	 

module.exports = {
    apps : [{
      name        : "apparent-api",
      script      : "./server.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
       "NODE_ENV": "production"
      }
    },
    {
      name       : "apparent-client",
      cwd        : "./client",
      script     : "npm",
      args       : "start",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }]
  }



