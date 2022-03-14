# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Local Development

Install Visual Studio Code and NPM 16 lts, checkout this repo in visual studio code and run the following in the visual studio terminal:

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server. A few changes may require you to ctrl-c the npm server and re-run the start command.

### Deployment

Deployments are automatically handled by Cloudflare Pages build agent when an org member opens a pr, or when a pr is merged into the main branch.