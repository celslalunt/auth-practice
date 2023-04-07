import { Button, Flex, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// ketika nvbar di load, hal yang pertma kali dilakukan dia membuat state "token" yang didapat dari sessionstorage

export const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logMeOut = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  
  return (
    <VStack 
    justify='space-evenly' 
    align='flex-end' 
    shadow="base" 
    bgColor="gray.50" 
    w="100vw" 
    h="16"
    >
      <Flex justify='space-evenly'>
        {
        token 
        ? <div style={{ display: "flex", marginRight: "16px"}}>
          Welcome user{" "}
          <button
          style={{ marginLeft: "10px", color: "blue"}}
          onClick={logMeOut}
          >
            Logout

          </button>
          </div>
        : <><Button
        onClick={() => navigate("/login")}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        mr='2'
      >
        Login
      </Button>
      <Button mr='2' rounded={"full"} onClick={() => navigate("/register")}>
        Register
      </Button></> // fragment
        }
      </Flex>
    </VStack>
  );
};
