import bookshelf from 'bookshelf';
import bookshelfparanoia from 'bookshelf-paranoia';
import Mysql from '../../bootstrap/Initializers/mysql';

const Knex = (new Mysql()).connection;
const Bookshelf = bookshelf(Knex);
Bookshelf.plugin(bookshelfparanoia);

export { Knex, Bookshelf };
