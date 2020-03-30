const config = {
  title: 'Unimark', // Site title.
  titleShort: 'Unimark', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  description: 'Welcome to Unimark', // Website description used for RSS feeds/meta description tag.
  author: '@frank_seo', // Website description used for RSS feeds/meta description tag.
  email: 'donghyun.seo91@gmail.com',
  logo: 'src/images/logo.jpg', // Logo used for SEO and manifest.
  url: 'https://unimark.smilecat.dev', // Domain of your website without pathPrefix.
  copyright: `© 2020-${new Date().getFullYear()} smilecat.dev`, // Copyright string for the footer of the website and RSS feed.
};

// Validate

// Make sure siteUrl doesn't have an ending forward slash
if (config.url.substr(-1) === '/') {
  config.url = config.url.slice(0, -1);
}

module.exports = config;