# GH Lens
A github explorer application

This repository aims show how to develop [JAMStack](https://jamstack.org/) apps on [Netlify](https://www.netlify.com).
You'll learn how to authorize your app through Github's OAuth api.

We use [Netlify Functions](https://www.netlify.com/products/functions/) as our "backend", powered by [AWS Lambda](https://aws.amazon.com/lambda/).

 ## What's the stack?

* [typescript](https://www.typescriptlang.org/) - It's 2021, you probably shouldn't be writing plain JS
* [create-react-app](https://create-react-app.dev/) - for quick react application setup
* [unstated-next](https://github.com/jamiebuilds/unstated-next) - for simple shared state
* [react-query](https://react-query.tanstack.com/) - for remote state/cache management
* [graphql-code-generator](https://graphql-code-generator.com/) - Well, 'cause writing types for APIs sucks