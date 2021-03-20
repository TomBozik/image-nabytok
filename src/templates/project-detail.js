import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import styles from './project-detail.module.css'


class ProjectDetailTemplate extends React.Component {
  render() {
    const project = get(this.props, 'data.contentfulProject')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${project.name} | ${siteTitle}`} />
            <Img
              className={styles.heroImage}
              alt={project.name}
              fluid={project.mainImage.fluid}
            />
          <div className="wrapper">
            <h1 className="project-headline">{project.name}</h1>
            <div
              dangerouslySetInnerHTML={{
                __html: project.description.childMarkdownRemark.html,
              }}
            />

            <ul className={styles.image_list}>
              {project.images.map((img, index) => {
                return (
                  <li key={index}>
                  <Img alt="" fluid={img.fluid}  style={{ height: "100%", width: "100%" }} />
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

export default ProjectDetailTemplate

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    contentfulProject(slug: { eq: $slug }) {
      name
      description {
        childMarkdownRemark {
          html
        }
      }
      mainImage {
        fluid(maxWidth: 1180, quality:100) {
          ...GatsbyContentfulFluid
        }
      }
      images {
        fluid(maxWidth: 1180, quality:100) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`
