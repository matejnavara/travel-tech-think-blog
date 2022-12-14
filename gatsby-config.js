module.exports = {
  siteMetadata: {
    title: `Tech A Break`,
    name: `Matej Navara`,
    siteUrl: `https://techabreak.blog`,
    description: `Tech ~ Travel ~ Thoughts`,
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
        url: `https://www.linkedin.com/in/matejnavara/`
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
        pageLength: 10,
        authorsPage: false,
        sources: {
          local: true
        }
      }
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `https-techabreak-blog`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tech a Break Blog`,
        short_name: `TechABreakBlog`,
        description: `Tech ~ Travel ~ Thoughts`,
        lang: `en`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`
      }
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {}
    }
  ]
};
