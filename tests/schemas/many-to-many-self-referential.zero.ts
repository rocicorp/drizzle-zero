import {drizzleZeroConfig} from '../../src';
import * as manyToManySelfReferential from './many-to-many-self-referential.schema';

export const schema = drizzleZeroConfig(manyToManySelfReferential, {
  tables: {
    user: {
      id: true,
      name: true,
    },
    friendship: {
      requestingId: true,
      acceptingId: true,
      accepted: true,
    },
  },
});
