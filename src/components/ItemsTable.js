import React, { useState } from 'react';

import {
  Box,
  Flex,
  Heading,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  //ModalHeader,
  //ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { AlertDialogBox } from '../helpers/AlertDialogBox';
import CustomDataTable from './CustomDataTable';
import { useItems } from '../react-query/items/useItems';
import { useAddItem } from '../react-query/items/useAddItem';
import { useUpdateItem } from '../react-query/items/useUpdateItem';
import { useDeleteItem } from '../react-query/items/useDeleteItem';
import ItemForm from './ItemForm';

const initial_item = [
  {
    item_no: '',
    item_desp: '',
    item_unit: '',
    item_packing: '',
    item_category: '',
    item_brand: '',
    item_location: '',
    item_dept: '',
    item_uprice_pc: 0,
  },
];

const ItemsTable = () => {
  const { items } = useItems();
  const addItem = useAddItem();
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();
  const [state, setState] = useState({});
  const [statustype, setStatusType] = useState('');
  const [filterText, setFilterText] = React.useState('');

  const filteredData = items.filter(
    item =>
      item.item_desp &&
      item.item_desp.toLowerCase().includes(filterText.toLowerCase())
  );

  const {
    isOpen: isAlertDeleteOpen,
    onOpen: onAlertDeleteOpen,
    onClose: onAlertDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isItemOpen,
    onOpen: onItemOpen,
    onClose: onItemClose,
  } = useDisclosure();

  const titles = 'Items Table';

  const columns = [
    // {
    //   id: 1,
    //   key: 'addaction',
    //   text: 'Action',
    //   align: 'center',
    //   sortable: false,
    //   width: '60px',

    //   cell: record => {
    //     return (
    //       <>
    //         <IconButton
    //           size="sm"
    //           icon={<AiOutlinePlus />}
    //           onClick={() => {
    //             handleAddCust(record);
    //           }}
    //         ></IconButton>
    //       </>
    //     );
    //   },
    // },
    {
      id: 2,
      key: 'editaction',
      text: 'Action',
      sortable: false,
      width: '60px',
      cell: record => {
        return (
          <>
            <IconButton
              icon={<AiFillEdit />}
              size="sm"
              onClick={() => {
                handleEditItem(record);
              }}
            ></IconButton>
          </>
        );
      },
    },
    {
      id: 3,
      key: 'deleteaction',
      text: 'Action',
      width: '60px',
      sortable: false,
      cell: record => {
        return (
          <>
            <IconButton
              icon={<AiFillDelete />}
              size="sm"
              onClick={() => {
                handleDeleteItem(record);
              }}
            />
          </>
        );
      },
    },
    {
      id: 4,
      name: 'Item No',
      selector: row => row.item_no,
      sortable: true,
      filterable: true,
      width: '120px',
    },
    {
      id: 5,
      name: 'Desciption',
      selector: row => row.item_desp,
      minWidth: '150px',
      sortable: true,
      filterable: true,
      align: 'left',
      wrap: false,
      cell: row => (
        <div style={{ overflow: 'hidden', textAlign: 'left' }}>
          {row.item_desp}
        </div>
      ),
    },
    {
      id: 6,
      name: 'Packing',
      selector: row => row.item_packing,
      minWidth: '150px',
      sortable: true,
      filterable: true,
      align: 'left',
      wrap: false,
      cell: row => (
        <div style={{ overflow: 'hidden', textAlign: 'left' }}>
          {row.item_packing}
        </div>
      ),
    },
    {
      id: 7,
      name: 'Unit',
      selector: row => row.item_unit,
      wrap: true,
      width: '100px',
      //align: 'left',
      left: true,
      grow: 4,
      cell: row => (
        <div
          style={{
            color: 'grey',
            overflow: 'hidden',
            whiteSpace: 'wrap',
            textOverflow: 'ellipses',
            textAlign: 'left',
          }}
        >
          {row.item_unit}
        </div>
      ),
    },
    {
      id: 8,
      name: 'UPrice',
      selector: row => row.item_uprice_pc,
      wrap: true,
      width: '100px',
      //align: 'left',
      left: true,
      grow: 4,
      cell: row => (
        <div
          style={{
            color: 'grey',
            overflow: 'hidden',
            whiteSpace: 'wrap',
            textOverflow: 'ellipses',
            textAlign: 'left',
          }}
        >
          {row.item_uprice_pc}
        </div>
      ),
    },
    {
      id: 9,
      name: 'Department',
      selector: row => row.item_dept,
      sortable: true,
      wrap: true,
      width: '120px',
      //align: 'left',
      left: true,
      grow: 4,
      cell: row => (
        <div
          style={{
            color: 'grey',
            overflow: 'hidden',
            whiteSpace: 'wrap',
            textOverflow: 'ellipses',
            textAlign: 'left',
          }}
        >
          {row.item_dept}
        </div>
      ),
    },
    {
      id: 10,
      name: 'Brand',
      selector: row => row.item_brand,
      sortable: true,
      width: '150px',
    },
    {
      id: 11,
      name: 'Category',
      selector: row => row.item_category,
      sortable: true,
      width: '250px',
    },
  ];

  const handleOnDeleteConfirm = () => {
    deleteItem(state);
  };

  const handleAddItem = () => {
    setStatusType(prev => (prev = 'add'));
    const data = { ...initial_item };
    setState(data);
    onItemOpen(true);
  };

  const handleEditItem = data => {
    setStatusType(prev => (prev = 'edit'));
    setState(data);
    onItemOpen(true);
  };

  const handleDeleteItem = rowData => {
    setState(prev => (prev = { ...rowData }));
    onAlertDeleteOpen();
  };

  const add_Item = data => {
    addItem(data);
  };

  const update_Item = data => {
    updateItem(data);
  };

  return (
    <Flex p={5}>
      <Box
        width="100%"
        borderWidth={1}
        borderColor="teal.800"
        borderRadius={10}
        overflow="scroll"
      >
        <CustomDataTable
          title={titles}
          columns={columns}
          filteredData={filteredData}
          handleAddRec={handleAddItem}
          filterText={filterText}
          setFilterText={setFilterText}
          filterbyname="filter by item description"
          defaultSortFieldId="4"
          defaultSortAsc={true}
        />
      </Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isItemOpen}
        onClose={onItemClose}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Product Form</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <ItemForm
              state={state}
              setState={setState}
              add_Item={add_Item}
              update_Item={update_Item}
              statustype={statustype}
              onItemClose={onItemClose}
            />
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onProductClose}>
              Close
              </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
      <AlertDialogBox
        onClose={onAlertDeleteClose}
        onConfirm={handleOnDeleteConfirm}
        isOpen={isAlertDeleteOpen}
        title="Delete Item"
      >
        <Heading size="md">
          Are you sure you want to delete this item {state.ic_stkno}{' '}
          {state.ic_desp} ?
        </Heading>
      </AlertDialogBox>
    </Flex>
  );
};

export default ItemsTable;
