import {zql} from './zero-schema.gen';

zql.message.whereExists(
  'sender',
  q => q.where('name', '=', 'James').where('partner', '=', true),
  {scalar: true},
);

// @ts-expect-error The compound unique key also requires partner.
zql.message.whereExists('sender', q => q.where('name', '=', 'James'), {
  scalar: true,
});

// @ts-expect-error countryIso is not a unique key.
zql.message.whereExists('sender', q => q.where('countryIso', '=', 'US'), {
  scalar: true,
});
