import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { NavBar, Footer } from '..'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        {/* <UserProvider
          value={{
            customer: windowGlobal.localStorage.getItem('curUser') || {},
          }}
        > */}
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        >
          <html lang="en" />
        </Helmet>

        {/* placeholder div for Modal's children*/}
        <div id="modalContainer" />

        <NavBar />
        <div
          style={{
            margin: '0 auto',
            fontFamily: 'Montserrat',
          }}
        >
          {children}
        </div>
        {/* </UserProvider> */}
        <Footer />
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
