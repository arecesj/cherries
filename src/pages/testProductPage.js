import React from 'react'
import { Link } from 'gatsby'
import NavBar from '../components/NavBar'

import Layout from '../components/Layout'
import ProductPageInfoContainer from '../components/ProductPageInfoContainer'

const testProductPage = () => (
  <Layout>
    <NavBar/>
    <ProductPageInfoContainer />
  </Layout>
)

export default testProductPage