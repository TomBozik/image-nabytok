const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const projectDetail = path.resolve('./src/templates/project-detail.js')
    resolve(
      graphql(
        `
          {
            allContentfulProject {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const projects = result.data.allContentfulProject.edges
        projects.forEach(project => {
          createPage({
            path: `/project/${project.node.slug}`,
            component: projectDetail,
            context: {
              slug: project.node.slug,
            },
          })
        })
      })
    )
  })
}
