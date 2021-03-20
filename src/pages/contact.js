import React from 'react'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import styles from './project.module.css'
import Layout from '../components/layout'


class Contact extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff', flex: 1 }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Kontakt</div>
        </div>
      </Layout>
    )
  }
}

export default Contact