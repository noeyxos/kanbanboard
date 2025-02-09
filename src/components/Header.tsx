import { Box, Image, HStack, Button, Text } from "@chakra-ui/react";
import logo from "../assets/images/logo.png";
import profile from "../assets/images/profile.png";
function Header() {
  return (
    <Box
      display="absolute"
      width="100vw"
      bgColor="#FDFDFD"
      padding={5}
      left="0px"
      top="0px"
    >
      <HStack width="100%" justifyContent="space-between">
        <Box>
          <Image src={logo} alt="logo" width="162px" height="36px" />
        </Box>
        <Box display="flex" flexDirection="row" gap={1}>
          <Image src={profile} alt="user" width="39px" height="39px" />
          <Text pt={2} pl={2}>
            정소연
          </Text>
          <Button bgColor="transparent" color="black" p={0}>
            &or;
          </Button>
        </Box>
      </HStack>
    </Box>
  );
}

export default Header;
