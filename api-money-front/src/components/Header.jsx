import { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState, setGlobalState } from "../store";
import { connectWallet } from "../shared/ApiMonetization";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import { Button } from "@material-tailwind/react";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";

const Header = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [isLoggedIn] = useGlobalState("isLoggedIn");
  const [connectedAccount] = useGlobalState("connectedAccount");

  function disconnectedWallet() {
    setGlobalState("connectedAccount", "");
    setGlobalState("isLoggedIn", false);
  }

  return (
    <Navbar color="green" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <Link to="/">
            <NavbarBrand>Pinboou</NavbarBrand>
          </Link>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="white"
          />
        </NavbarWrapper>

        <Nav leftSide>
          <NavItem ripple="light">
            <Link to="/requestsmade">Requests made</Link>
          </NavItem>
        </Nav>

        <NavbarCollapse open={openNavbar}>
          <Nav rightSide>
            {isLoggedIn ? (
              <Button onClick={disconnectedWallet} variant="outlined">
                <span>Connected with address: {connectedAccount}</span>
              </Button>
            ) : (
              <NavItem onClick={connectWallet} active="light" ripple="light">
                <span className="cursor-pointer">Connect Wallet</span>
              </NavItem>
            )}
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
};

export default Header;
