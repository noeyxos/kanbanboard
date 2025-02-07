import { ChakraProvider, defaultSystem, Flex } from "@chakra-ui/react";
import router from "./routes/router";
import "./App.css";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Flex width="100vw" bg={"white"} alignItems={"center"}>
        <RouterProvider router={router}></RouterProvider>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
