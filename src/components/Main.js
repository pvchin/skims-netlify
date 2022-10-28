import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Container,
  Flex,
  Heading,
  Grid,
  GridItem,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Appbanner from './Appbanner';
import RoutesMain from './RoutesMain';
import useUserContext from '../react-query/global/useUserQuery';

const Main = () => {
  const navigate = useNavigate();
  const [localstate, setLocalState] = useUserContext();
  const [select, setSelect] = React.useState('Dashboard');

  useEffect(() => {
    setLocalState({ user: 'User', level: 'Admin' });
  }, []);

  return (
    <Grid flexDirection="rows">
      <GridItem>
        <Appbanner />
      </GridItem>
      <GridItem>
        <RoutesMain />
      </GridItem>
    </Grid>
  );
};

export default Main;
