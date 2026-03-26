import {drizzleZeroConfig} from '../../src';
import * as manyToManySelfReferentialFk from './many-to-many-self-referential-fk.schema';

export const schema = drizzleZeroConfig(manyToManySelfReferentialFk, {
  tables: {
    doc: {
      id: true,
      title: true,
    },
    related: {
      fk_from_doc: true,
      fk_to_doc: true,
    },
  },
});
