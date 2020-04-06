/*eslint-disable */

module.exports = {
  apps : [{
    name: 'projectx',
    script: 'npx',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'babel-node --presets=@babel/preset-env -- app.js',
    instances: 1,
    "exec_mode" : "cluster", 
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user: 'ubuntu',
      ref  : 'origin/master',
      repo : 'git@github.com:AbrahamGeorge8547/projectx.git',
      path : '/home/ubuntu/apis/',
    }
  }
};
 /* eslint-enable */
