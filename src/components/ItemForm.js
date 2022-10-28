import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formatPrice } from '../helpers/utils';
import { FiSave } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import {
  AspectRatio,
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Wrap,
  WrapItem,
  useRadio,
  useRadioGroup,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

import { useItems } from '../react-query/items/useItems';
import { useItemGroups } from '../react-query/itemgroup/useItemGroups';
import { useLocations } from '../react-query/location/useLocations';

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
    item_uprice_ctn: 0,
    item_pfactor: 1,
    item_qtyhand: 0,
    item_nonstock: false,
    item_type: '',
    item_smcode: '',
  },
];

const ItemForm = ({
  state,
  setState,
  add_Item,
  update_Item,
  statustype,
  onItemClose,
}) => {
  const navigate = useNavigate();
  const field_width = '150';
  const field_gap = '3';
  const { items } = useItems();
  const { itemgroups } = useItemGroups();
  const { locations } = useLocations();
  const [isnonstock, setIsnonstock] = useState(false);
  const [itemtype, setItemtype] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting, id },
  } = useForm({
    defaultValues: {
      ...state,
    },
  });

  const onSubmit = values => {
    const data = values;
    console.log("data", data)
    if (statustype === 'edit') {
      update_Item(values);
    }
    if (statustype === 'add') {
      add_Item(data);
    }
    onItemClose()
  };

  const handleClose = () => {
    onItemClose();
  };

  useEffect(() => {
    setIsnonstock(state.item_nonstock);
    setItemtype(state.item_type);
  }, []);

  return (
    <Box
      h={{ base: 'auto', md: 'auto' }}
      py={[0, 0, 0]}
      direction={{ base: 'column-reverse', md: 'row' }}
      overflowY="scroll"
    >
      <VStack
        w={{ base: 'auto', md: 'full' }}
        h={{ base: 'auto', md: 'full' }}
        spacing="10"

        //alignItems="flex-start"
      >
        <VStack pt={2} spacing="3" alignItems="center">
          <Heading size="lg">Item Update</Heading>
        </VStack>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid templateColumns="repeat(12, 1fr)" gap={1}>
              <GridItem
                colSpan={6}
                w="100%"
                h="auto"
                border="1px solid"
                borderRadius={10}
                gap={0}
                px={2}
              >
                <Grid templateColumns="repeat(6, 1fr)" gap={1}>
                  <GridItem colSpan={4}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_no"
                        defaultValue={state.item_no}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm">
                              Item No
                            </Text>
                            <Input
                              name="item_no"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="item no"
                              //minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2} mt={field_gap} pt={5} pl={2}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_nonstock"
                        defaultValue={isnonstock}
                        render={({ field: { onChange, value, ref } }) => (
                          <HStack>
                            <Checkbox
                              name="item_nonstock"
                              value={value}
                              width="full"
                              onChange={e => {
                                onChange(e.target.checked);
                                setIsnonstock(e.target.checked);
                              }}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                            >
                              <Text as="b">Non-Stock</Text>
                            </Checkbox>
                          </HStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_desp"
                        defaultValue={state.item_desp}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            {/* <FormLabel>Description</FormLabel> */}
                            <Text as="b" fontSize="sm">
                              Description
                            </Text>
                            <Input
                              name="item_desp"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="description"

                              //minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={6}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_packing"
                        defaultValue={state.item_packing}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack align="left">
                            <Text as="b" fontSize="sm">
                              Packing
                            </Text>
                            <Input
                              name="item_packing"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="packing"
                              //minWidth="100"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </GridItem>

              <GridItem
                colSpan={6}
                w="100%"
                h="auto"
                px={1}
                border="1px solid"
                borderRadius={10}
              >
                <Grid templateColumns="repeat(6, 1fr)" gap={1}>
                  <GridItem colSpan={3}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_unit"
                        defaultValue={state.item_unit}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack w="100%" py={1} align="left">
                            <Text as="b" fontSize="sm">
                              Unit
                            </Text>
                            <Input
                              name="item_unit"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="unit"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={3}>
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_type"
                        defaultValue={state.item_type}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack w="100%" py={1} align="left">
                            <Text as="b" fontSize="sm">
                              Type
                            </Text>
                            <Select
                              name="item_type"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              //placeholder="category"
                            >
                              <option value="Normal">Normal</option>
                              <option value="Package">Package</option>
                            </Select>
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    colSpan={3}
                    w="100%"
                    h="auto"
                    px={1}
                    //border="1px solid"
                  >
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_group"
                        defaultValue={state.item_group}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack w="100%" py={1} align="left">
                            <Text as="b" fontSize="sm">
                              Group
                            </Text>
                            <Select
                              name="item_group"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              //placeholder="category"
                            >
                              <option value="">None</option>
                              {itemgroups &&
                                itemgroups.map(rec => {
                                  return (
                                    <option
                                      key={rec.group_id}
                                      value={rec.group_code}
                                    >
                                      {rec.group_code}
                                    </option>
                                  );
                                })}
                            </Select>
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    colSpan={3}
                    w="100%"
                    h="auto"
                    px={1}
                    //border="1px solid"
                  >
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_category"
                        defaultValue={state.item_category}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack w="100%" py={1} align="left">
                            <Text as="b" fontSize="sm">
                              Category
                            </Text>
                            <Input
                              name="item_category"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="category"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    colSpan={3}
                    w="100%"
                    h="auto"
                    px={1}
                    //border="1px solid"
                  >
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_brand"
                        defaultValue={state.item_brand}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack w="100%" py={1} align="left">
                            <Text as="b" fontSize="sm">
                              Brand
                            </Text>
                            <Input
                              name="item_brand"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="brand"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    colSpan={3}
                    w="100%"
                    h="auto"
                    px={1}
                    //border="1px solid"
                  >
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_smcode"
                        defaultValue={state.item_smcode}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack w="100%" py={1} align="left">
                            <Text as="b" fontSize="sm">
                              Salesman Code
                            </Text>
                            <Input
                              name="item_smcode"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              placeholder="salesman code"
                            />
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    colSpan={3}
                    w="100%"
                    h="auto"
                    px={1}
                    //border="1px solid"
                  >
                    <FormControl>
                      <Controller
                        control={control}
                        name="item_location"
                        defaultValue={state.item_location}
                        render={({ field: { onChange, value, ref } }) => (
                          <VStack w="100%" py={1} align="left">
                            <Text as="b" fontSize="sm">
                              Location
                            </Text>
                            <Select
                              name="item_location"
                              value={value}
                              width="full"
                              onChange={onChange}
                              borderColor="gray.400"
                              //textTransform="capitalize"
                              ref={ref}
                              //placeholder="category"
                            >
                              <option value="">None</option>
                              {locations &&
                                locations.map(rec => {
                                  return (
                                    <option
                                      key={rec.loc_id}
                                      value={rec.loc_desp}
                                    >
                                      {rec.loc_desp}
                                    </option>
                                  );
                                })}
                            </Select>
                          </VStack>
                        )}
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
            <Box>
              <Center>
                <Button
                  mt={4}
                  ml={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  mt={4}
                  ml={10}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Center>
            </Box>
          </form>
        </Box>
      </VStack>
    </Box>
  );
};

export default ItemForm;
