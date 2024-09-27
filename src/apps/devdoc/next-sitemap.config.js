/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://kloudlite.io',
  generateIndexSitemap: false,
  generateRobotsTxt: true, // (optional)
  transform: async (config, path) => {
    // custom function to ignore the path
    console.log(path);
    if (ignoreFunction(path)) {
      return null;
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};

const ignorePaths = [
  '/writer',
  '/blog/template',
  '/change-logs',
  '/customer-stories',
  '/customer-stories/anscer-robotics',
  '/new-home',
  '/help-and-support',
  '/help-and-support/kloudlite-overview',
  '/help-and-support/kloudlite-overview/what-is-kloudlite',
  '/privacy-policy-2',
  '/events/1',
  '/events/_md/1',
];

//@ts-ignore
const ignoreFunction = (path) => {
  return ignorePaths.includes(path);
};
