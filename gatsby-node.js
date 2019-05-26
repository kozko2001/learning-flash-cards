/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require('lodash')

const createCategories = async (actions, graphql) => {
    let { data } = await graphql(`
    query {
        allMarkdownRemark(
          sort: {order: DESC, fields: [frontmatter___date]}
        ) {
          edges {
            node {
              fileAbsolutePath
              htmlAst
            }
          }
        }
      }
    `)

    const getCategory = (path) => {
        splitted = path.split('/')
        return splitted[splitted.length - 2]
    }

    data = data.allMarkdownRemark.edges
    data = data.map(d => ({
        category: getCategory(d.node.fileAbsolutePath),
        ast: d.node.htmlAst
    }))

    grouped = _.groupBy(data, 'category')

    for (let category in grouped) {
        const cards = grouped[category]
        actions.createPage({
            path: `category/${category}`,
            component: require.resolve(`./src/templates/CategoryListTemplate.js`),
            context: { 
                cards,
                category
             },
        })
    }

}


exports.createPages = async ({actions, graphql}) => {
  await createCategories(actions, graphql);
}