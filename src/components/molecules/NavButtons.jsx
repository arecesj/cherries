import React, { Component } from 'react'
import { FaRegUser, FaBars, FaRegQuestionCircle } from 'react-icons/fa'
import NavLink from '../atoms/NavLink'
import ShoppingBagIcon from '../atoms/ShoppingBagIcon'
import DropdownMenu from '../atoms/DropdownMenu'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5rem;
  padding-top: 0.3rem;
  background-color: white;
  margin: 0;
  a {
    margin-right: 0.7rem;
  }
  .hamburger {
    display: none;
  }
  .leftNav {
    display: flex;
    align-items: center;
    flex-basis: 45%;
    padding-left: 1rem;
  }
  .logo {
    display: flex;
    justify-content: center;
    flex-basis: 10%;
  }
  .rightNav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 45%;
  }
  @media (max-width: 420px) {
    width: 100%;
    padding: 1rem;
    padding-right: 0rem;
    min-width: 0px;
    position: sticky;
    background-color: #f7f7f7;
    top: 0;
    img {
      width: 9rem;
    }
    div {
      padding: 0rem;
    }
    svg {
      height: 2rem;
    }
    .leftNav {
      flex-basis: 20%;
      width: 100%;
      padding-left: 0rem;
      a {
        display: none;
      }
      .hamburger {
        display: initial;
      }
    }
    .logo {
      flex-basis: 55%;
    }
    .rightNav {
      flex-basis: 25%;
      div:nth-child(1) {
        display: none;
      }
      div:nth-child(2) {
        display: none;
      }
    }
  }
`

class NavButtons extends Component {
  constructor(props, context) {
    super(props)
  }
  render() {
    const { handleMobileSidebar, handleSidebar, curUser, logOut } = this.props
    const search = 'Hola!'
    const userLinks = !curUser
      ? [{ text: 'Sign Up', page: 'signup' }, { text: 'Log In', page: 'login' }]
      : [
          { text: 'Account', page: 'account' },
          { text: 'Log Out', page: '', onClick: logOut },
        ]
    const helpLinks = [
      { text: 'FAQ', page: 'faq' },
      { text: 'Help', page: 'faq' },
      { text: 'Returns', page: 'faq' },
      { text: 'team@lipslut.com', page: 'contact' },
    ]
    return (
      <Container>
        <div className="leftNav">
          {/* //TODO: Mobile
          <FaBars
            className="hamburger"
            onClick={handleMobileSidebar}
            size="1.5rem"
          /> */}
          <DropdownMenu links={search} dropdownText={'Search'} />
        </div>
        <div className="logo">
          <Link to="/">
            <img
              style={{
                margin: '0 auto',
                maxWidth: 175,
              }}
              src="https://static1.squarespace.com/static/5887fa45d482e9ca1fca0fcc/t/5a0f8b654192028235394491/1531257223005/?format=1500w"
              alt="Cherries Logo"
            />
          </Link>
        </div>
        <div className="rightNav">
          <DropdownMenu
            links={helpLinks}
            dropdownText={<FaRegQuestionCircle size="1.9rem" />}
          />
          <DropdownMenu
            links={userLinks}
            dropdownText={<FaRegUser size="1.9rem" />}
          />
          <ShoppingBagIcon click={handleSidebar} />
        </div>
      </Container>
    )
  }
}

export default NavButtons
