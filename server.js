const { syncAndSeed } =  require('./db');
const {app, jwtSecretKey} = require('./app');

const init = async()=> {
  await syncAndSeed();
  const port = 8080;
  console.log('The value of PORT is:', process.env.port);
  app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();