import { GQLServerHandler as authHandler } from '~/auth/server/gql/saved-queries';
import fs from 'fs';
import { GQLServerHandler as libHandler } from '../lib/server/gql/saved-queries';
import { loader } from './loader';

const init = () => {
  const results = [loader(authHandler, 'auth'), loader(libHandler, 'lib')];

  const info = `# This file is auto generated don't modify it manually
# generated by pnpm gql:parse
`;

  fs.writeFileSync(
    'gql-queries-generator/doc/queries.graphql',
    `${info}\n${results.join('\n\n')}`
  );
};

init();
