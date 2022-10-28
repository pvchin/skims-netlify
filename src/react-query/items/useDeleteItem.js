import { useMutation, useQueryClient } from '@tanstack/react-query';
//import { items_url } from '../../utils/constants';
import { useCustomToast } from '../../helpers/useCustomToast';
import { GraphQLClient, gql } from 'graphql-request';

const API_URL = `http://localhost:4000/graphql`;
const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

async function deleteItem(data) {
  const { itemdata } = await graphQLClient.request(
    gql`
      mutation DeleteItem($item_id: ID) {
        deleteItem(item_id: $item_id) {
          item_id
        }
      }
    `,
    data
  );
  return itemdata;
}

export function useDeleteItem(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(data => deleteItem(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      toast({
        title: 'Item being deleted!',
        status: 'warning',
      });
    },
    onError: () => {
      toast({
        title: 'Items Delete Error! Please check your internet connection!',
        status: 'warning',
      });
    },
  });

  return mutate;
}
