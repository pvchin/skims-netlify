import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
import { GraphQLClient, gql } from 'graphql-request';
//import { gql } from "@apollo/client";
//import { employees_url } from "../../utils/constants";
import { filterByItemId } from './utils';

import axios from 'axios';
import { queryKeys } from '../constants';

const API_URL = `http://localhost:4000/graphql`;
//const API_URL = `http://192.168.0.107:4000/graphql`;

async function getItemGroups() {
  const { allItemGroup } = await graphQLClient.request(gql`
    query {
      allItemGroup {
        group_id
        group_code
        group_desp
        group_buttondesp
        group_pos
        group_addon
      }
    }
  `);
  return allItemGroup;
}

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export function useItemGroups() {
  const [filter, setFilter] = useState('all');
  const [groupId, setGroupId] = useState('');

  const selectFn = useCallback(
    unfiltered => filterByItemId(unfiltered, filter),
    [filter]
  );

  const fallback = [];
  const { data: itemgroups = fallback } = useQuery(
    [queryKeys.itemgroups],
    () => getItemGroups(),
    {
      select: filter !== 'all' ? selectFn : undefined,
    }
  );

  return { itemgroups, filter, setFilter, setGroupId };
}
