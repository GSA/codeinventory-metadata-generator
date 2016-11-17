# CodeInventory Metadata Generator

Generates a project metadata YAML or JSON file that can be used to build an organization-wide code inventory.

This is a static website that does all the work in client-side JavaScript. You can run this site locally or deploy to GitHub Pages.

## Setup

You will need [Node.js](https://nodejs.org/).

After cloning the repository, install the dependencies:

```
npm install
```

To run the site on your local machine:

```
gulp dev
```

To build the GitHub Pages site in the `/docs` folder:

```
gulp build
```
