let mongoose = require('mongoose');

class Database {
  constructor(server, database) {
    this.connect(server, database)
  }

  connect(server, database) {
    mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true})
      .then(() => console.log('Database connection successful'))
      .catch(err => console.error('Database connection error'))
    ;
  }
}

export { Database };
