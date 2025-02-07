import { Box, Image, HStack, Button } from "@chakra-ui/react";
import logo from "../assets/images/logo.png";
import profile from "../assets/images/profile.png";

function Header() {
  return (
    <Box width="100vw" bgColor={"#FDFDFD"} padding={5}>
      <HStack width="100%" justifyContent="space-between">
        <Box>
          <Image src={logo} alt="logo" width="162px" height="36px" />
        </Box>
        <Box display="flex" flexDirection="row">
          <Image src={profile} alt="user" width="39px" height="39px"></Image>
          <Box color={"black"} alignItems={"center"}>
            정소연
          </Box>
          <Button bgColor={"transparent"} color={"black"}>
            &or;
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}

export default Header;
