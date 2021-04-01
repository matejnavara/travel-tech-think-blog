module.exports = {
  siteMetadata: {
    title: `Tech A Break`,
    name: `Matej Navara`,
    siteUrl: `https://techabreak.blog`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Travel ~ Tech ~ Think`,
      maxWidth: 652
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/matejnavara`
      },
      {
        name: `github`,
        url: `https://github.com/matejnavara`
      },
      {
        name: `instagram`,
        url: `https://instagram.com/matejnavara`
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/matejnavara/`
      }
    ]
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: false,
        sources: {
          local: true
          // contentful: true,
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {}
    }
  ]
};
