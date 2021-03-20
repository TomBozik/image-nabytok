import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import styles from './blog.module.css'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

class ProjectIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const projects = get(this, 'props.data.allContentfulProject.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          <div className={styles.hero}>Projekty</div>
          <div className="wrapper">
            <ul className="project-list">
              {projects.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <Link to={`/project/${node.slug}`}> 
                      <Img alt="" fluid={node.mainImage.fluid} 
                                  imgStyle={{ objectFit: `none` }} 
                                  style={{ height: "100%", width: "100%" }} 
                      /> 
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProjectIndex

export const pageQuery = graphql`
  query ProjectIndexQuery {
    allContentfulProject {
      edges {
        node {
          name
          slug
          mainImage {
            fluid(maxWidth: 640, background: "rgb:000000") {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
