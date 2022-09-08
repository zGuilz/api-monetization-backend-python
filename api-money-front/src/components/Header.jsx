import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setAlert, useGlobalState } from '../store'
import { connectWallet } from '../shared/ApiMonetization'
import Navbar from '@material-tailwind/react/Navbar'
import NavbarContainer from '@material-tailwind/react/NavbarContainer'
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper'
import NavbarBrand from '@material-tailwind/react/NavbarBrand'
import NavbarToggler from '@material-tailwind/react/NavbarToggler'
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse'
import { Button } from '@material-tailwind/react'
import Nav from '@material-tailwind/react/Nav'
import NavItem from '@material-tailwind/react/NavItem'

const Header = () => {
  const [openNavbar, setOpenNavbar] = useState(false)
  const [cart] = useGlobalState('cart')
  // const [isLoggedIn] = useGlobalState('isLoggedIn')
  const isLoggedIn = true
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <Navbar color="green" navbar>
      <NavbarContainer>
        <NavbarWrapper>
          <Link to="/">
            <NavbarBrand>LosPrimos</NavbarBrand>
          </Link>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="white"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav rightSide>
                  <Button
                    onClick={connectWallet}
                    variant="outlined"
                  >
                    <span>Connect Wallet</span>
                  </Button>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  )
}

export default Header