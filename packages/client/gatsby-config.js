const config = require('./site-config');

module.exports = {
  siteMetadata: {
    title: config.title,
    description: config.description,
    author: config.author,
    copyright: config.copyright,
  },
  plugins: [
    // TypeScript
    `gatsby-plugin-typescript`,

    // Font
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ['Noto Sans KR:400,700'],
        },
      },
    },

    // Style
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        modifyVars: {
          '@font-family': 'Noto Sans KR, -apple-system, sans-serif',
          '@primary-color': '#1890ff', // primary color for all components
          '@link-color': '##1890ff', // link color
          '@success-color': '#52c41a', // success state color
          '@warning-color': '#faad14', // warning state color
          '@error-color': '#f5222d', // error state color
          '@font-size-base': '14px', // major text font size
          '@line-height-base': '1.2',
          '@font-size-lg': '@font-size-base + 2px',
          '@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
          '@text-color': 'rgba(0, 0, 0, 0.65)', // major text color
          '@text-color-secondary ': 'rgba(0, 0, 0, .45)', // secondary text color
          '@disabled-color ': 'rgba(0, 0, 0, .25)', // disable state color
          '@border-color-base': '#d9d9d9', // major border color
          '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // major shadow for layers
          '@border-radius-base': '4px',
          '@table-padding-vertical': '8px',
          '@table-padding-horizontal': '8px'
        }
      },
    },
    `gatsby-plugin-styled-components`,

    // Helmet(for document head changes)
    `gatsby-plugin-react-helmet`,

    // Content
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // Manifest
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.title,
        short_name: config.titleShort,
        description: config.description,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/logo.svg`, // This path is relative to the root of the site.
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
