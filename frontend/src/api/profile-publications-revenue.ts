import { REVENUE_QUERY } from 'src/configs/constants';
import { apolloClient } from '../apollo-client';

import {
    ApolloClient,
    ApolloLink,
    DefaultOptions,
    from,
    HttpLink,
    InMemoryCache,
  } from '@apollo/client/core'

  
export const profilePublicationsRevenueRequest = async (
  request: any
) => {
  const result = await apolloClient.query({
    query: REVENUE_QUERY,
    variables: {
      request,
    },
  });

  return result.data.profilePublicationRevenue;
};

export const profilePublicationsRevenue = async () => {
  const result = await profilePublicationsRevenueRequest({ profileId: '0x41' });
  console.log('publications profile revenues: result', result);

  return result;
};

(async () => {
  await profilePublicationsRevenue();
})();