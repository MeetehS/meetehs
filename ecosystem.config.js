module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'MeetehS',
      script    : 'server/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',
      host : 'meetehs.com',
      ref  : 'origin/master',
      repo : 'https://github.com/MeetehS/meetehs.git',
      path : '/root/meetehs/production',
      'post-deploy' : 'cd server && npm install && pm2 reload ../ecosystem.config.js --env production'
    },
    dev : {
      user : 'root',
      host : 'meetehs.com',
      ref  : 'origin/master',
      repo : 'https://github.com/MeetehS/meetehs.git',
      path : '/root/meetehs/development',
      'post-deploy' : 'cd server && npm install && pm2 reload ../ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
