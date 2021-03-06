import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import ModalLayout from '../layouts/ModalLayout'
import { DropdownMenu, ShoppingBagIcon } from '../atoms'
import SearchModal from './SearchModal'
import SideBarMobile from './SideBarMobile'
import { navigate } from '@reach/router'

const windowGlobal = typeof window !== 'undefined' && window

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

  .leftNav {
    display: flex;
    align-items: center;
    flex-basis: 33%;
    padding-left: 1rem;
    img:hover {
      opacity: 0.7;
      cursor: pointer;
    }
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
    flex-basis: 33%;
  }
  .logo {
    flex-basis: 33%;
  }
  .rightNavHamburger {
    display: none;
  }

  @media (max-width: 420px) {
    width: 100%;
    padding: 1rem;
    padding-right: 0rem;
    min-width: 0px;
    position: sticky;
    background-color: #f7f7f7;
    top: 0;
    .rightNavHamburger {
      display: inline;
      flex-basis: 33%;
    }

    div {
      padding: 0rem;
    }
    svg {
      height: 2rem;
    }
    .leftNav {
      flex-basis: 33%;
      width: 100%;
      padding-left: 0rem;

      a {
        display: none;
      }
    }

    .rightNav {
      div:nth-child(1) {
        display: none;
      }
      div:nth-child(2) {
        display: none;
      }
    }

    #hamburgerIcon {
      height: 28px;
      margin-bottom: 0rem;
    }
  }
`

class NavButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPopup: false,
      showSideBarMobile: false,
    }
    this.togglePopup = this.togglePopup.bind(this)
    this.toggleShowSideBarMobile = this.toggleShowSideBarMobile.bind(this)
    this.logOutUser = this.logOutUser.bind(this)
  }

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup })
  }
  
  toggleShowSideBarMobile() {
    this.setState({ showSideBarMobile: !this.state.showSideBarMobile })
  }

  // Sets curUser in UserContext state to null to log user out
  logOutUser() {
    this.props.logOutUser({ curUser: null })
    windowGlobal.localStorage.removeItem('curUser')
    navigate('/')
  }
  render() {
    const {
      searchIcon,
      cherriesIcon,
      helpIcon,
      userIcon,
      cartIcon,
      cart,
      handleSidebar,
      curUser,
    } = this.props
    // Get user links and help links that are passed down as props from NavBar - come from contentful
    // If user is logged in, show account/signout; otherwise show signup/login links
    let userLinks = curUser
      ? this.props.userLinks[1].dropdownLinks
      : this.props.userLinks[0].dropdownLinks
    let helpLinks = this.props.helpLinks[0].dropdownLinks
    return (
      <Container>
        {this.state.showPopup ? (
          <ModalLayout>
            <SearchModal
              searchIcon={searchIcon}
              togglePopup={this.togglePopup}
            />
          </ModalLayout>
        ) : null}
        <div className="leftNav">
          <img
            style={{
              margin: 10,
              maxWidth: 28,
              maxHeight: 28,
            }}
            src={searchIcon}
            alt="search-icon"
            onClick={this.togglePopup}
          />
        </div>
        <div className="logo">
          <Link to="/">
            <img
              style={{
                margin: '0 auto',
                maxWidth: 48,
                maxHeight: 48,
              }}
              src={cherriesIcon}
              alt="Cherries Logo"
            />
          </Link>
        </div>
        <div className="rightNav">
          <DropdownMenu links={helpLinks} icon={helpIcon} />
          <DropdownMenu
            links={userLinks}
            icon={userIcon}
            logOutUser={this.logOutUser}
          />
          <ShoppingBagIcon
            cart={cart}
            cartIcon={cartIcon}
            click={handleSidebar}
          />
          {/* This is only displayed when screen width is less than 420 */}
          <div className="rightNavHamburger">
            <img
              id="hamburgerIcon"
              src="https://css-tricks.com/wp-content/uploads/2012/10/threelines.png"
              onClick={this.toggleShowSideBarMobile}
              alt="open menu"
            />
          </div>
        </div>
        {this.state.showSideBarMobile ? (
          <ModalLayout>
            <SideBarMobile
              toggleShowSideBarMobile={this.toggleShowSideBarMobile}
              cart={cart}
              cartIcon={cartIcon}
              click={handleSidebar}
              helpLinks={helpLinks}
              helpIcon={helpIcon}
              userLinks={userLinks}
              userIcon={userIcon}
            />
          </ModalLayout>
        ) : null}
      </Container>
    )
  }
}

export default NavButtons
