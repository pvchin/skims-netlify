import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import Main from './components/Main';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RecoilRoot>
            <Box textAlign="center" fontSize="xl">
              {/* <Grid minH="100vh" p={3}> */}
              {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
              <Main />
              {/* </Grid> */}
            </Box>
            <ReactQueryDevtools />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
