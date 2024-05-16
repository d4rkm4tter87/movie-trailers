import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import logo from "../assets/movies.png";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import Login from "./Login";
import { BsSearch } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  return (
    <HStack padding="10px">
      <Link to="/">
        <Image src={logo} />
      </Link>
      <Login />
      <InputGroup></InputGroup>
      {/* <SearchInput onSearch={onSearch} /> */}
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
