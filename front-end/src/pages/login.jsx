import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from "react";

import {useDispatch} from "react-redux"
import {login} from "../redux/userSlice"

export const LoginForm = () => {
     const dispatch = useDispatch();
    const navigate = useNavigate();
    const [JWToken, setJWToken] = useState();
// JWToken state, setJWToken setter
// untuk komponen react dpat aktif ketika mengubah sesuatu di state.
const flexColor = useColorModeValue("gray.50", "gray.800");
const boxColor = useColorModeValue("white", "gray.700");

  useEffect(() => { //useEffect adalah fx tambahan dri react yang bertujuan sebagai trigger, dilakukan ketika ada perubahan di array.
    localStorage.setItem("token", JWToken);
  }, [JWToken]); // array kedua indikator


    const onLogin = () => {
        try {
            const data = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value
            }
            // axios tempat untuk login

            axios.post("http://localhost:2000/auth/login", {
              email: data.email,
              password: data.password,
            })
            .then (result => {
              // sessionstorage ketika kita berhasil login kita memasang dta dibrwsr
              // ada 2 jenis sessionStorage dan LocalStorage.
              // supaya react mengerti ada perubahan data maka kita harus memakai setter dari state.
              setJWToken(result.data.token);
              console.log(result);
            })
            .catch(error => {
              console.error(error);
            });
    
            console.log(data);
            document.getElementById("email").value = ""
            document.getElementById("password").value = ""
        } catch (err) {
            console.log(err);
        }
      }

if (JWToken) {
  return <Navigate to ='/' />;
}
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={flexColor}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={boxColor}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link onClick={() => navigate("/")} color={"blue.400"}>
                  Back to home
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
