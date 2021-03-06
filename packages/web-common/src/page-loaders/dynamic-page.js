const createError = require('http-errors');
const buildQuery = require('../gql/query-factories/with-dynamic-page');

/**
 * @param {ApolloClient} apolloClient The Apollo GraphQL client that will perform the query.
 * @param {object} params
 * @param {string} params.alias The content page alias to query.
 * @param {string} [params.queryFragment] The `graphql-tag` fragment
 *                                        to apply to the `contentPage` query.
 * @param {object} [params.additionalInput] Additional query input params.
 */
module.exports = async (apolloClient, {
  alias,
  queryFragment,
  additionalInput,
} = {}) => {
  if (!alias) {
    // No content page alias was provided. Return a 400.
    throw createError(400, 'No content page alias was provided.');
  }

  // Query for the content page using the alias.
  const input = { ...additionalInput, alias };
  const variables = { input };
  const { data } = await apolloClient.query({ query: buildQuery({ queryFragment }), variables });
  const { contentPage: page } = data;

  if (!page) {
    // No content page was found for this alias. Return a 404.
    throw createError(404, `No content page was found for alias '${alias}'`);
  }
  return page;
};
