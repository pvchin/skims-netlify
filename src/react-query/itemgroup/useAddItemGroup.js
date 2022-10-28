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

const paramdata = {
  stkno: 'S12',
  desp: 'Sprite Test 2',
  dept: 'S',
  cat: 'C',
  pack: '12',
  unit: 'Pc',
  brand: 'S',
  wsp: 3.0,
  factor: 1,
  qty: 0,
};

async function addItem(data) {
  const { itemdata } = await graphQLClient.request(
    gql`
      mutation AddItem(
        $ic_stkno: String
        $ic_desp: String
        $ic_dept: String
        $ic_cat: String
        $ic_pack: String
        $ic_unit: String
        $ic_brand: String
        $ic_wsp: Float
        $ic_qq: Int
        $ic_qty: Float
      ) {
        addItem(
          ic_stkno: $ic_stkno
          ic_desp: $ic_desp
          ic_dept: $ic_dept
          ic_cat: $ic_cat
          ic_pack: $ic_pack
          ic_unit: $ic_unit
          ic_brand: $ic_brand
          ic_wsp: $ic_wsp
          ic_qq: $ic_qq
          ic_qty: $ic_qty
        ) {
          ic_stkno
        }
      }
    `,
    data
  );
  return itemdata;
}

export function useAddItem(data) {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation(data => addItem(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('items');
      toast({
        title: 'New item being added!',
        status: 'success',
      });
    },
    onError: () => {
      toast({
        title: 'Item Add Error! Please check your internet connection!',
        status: 'warning',
      });
    },
  });

  return mutate;
}
