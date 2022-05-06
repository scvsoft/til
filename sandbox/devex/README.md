# Development Experience

This repository will provide a sort of cookbook to kick off a new project with the basic
structure and tools to handle the following development process topics:

* Code – code development and review, source code management tools, code merging.
* Configuration – infrastructure configuration and management, infrastructure as code tools.
* Build – continuous integration tools, build status.
* Testing – continuous testing tools that provide quick and timely feedback on business risks.
* Packaging – artifact repository, application pre-deployment staging.
* Release – change management, versioning, release automation.
* Monitoring – application performance monitoring, end-user experience.

## Code

The coding experience is one of the most significant topics in the development process. We write code
every day, so it's very important for a team to share some basics conventions to avoid conflicts and
misunderstandings. The following points are some code-related topics we can solve with tools:

* Naming conventions: camel case, snake case, kebab case
* Coding style
* Language features
* Directory organization
* Code documentation
* Code reuse

Depending on the programming language, there are different sets of tools we can use to reduce
discussions on the previous topics. Some are more opinionated than others, some have strong
community guidelines.

For JavaScript we can use [eslint](https://www.npmjs.com/package/eslint), [prettier](https://www.npmjs.com/package/prettier),
[jsdoc](https://www.npmjs.com/package/jsdoc), and [swagger](https://www.npmjs.com/package/swagger-ui-express), among others.

## Configuration

Configuration is a big topic because it depends on several aspects of the application like the user model
(in a multi-user/multi-tenant app), the deployment strategy, the runtime environments, etc.

In this project we're using environment variables to make the application environment-agnostic. Using
environment variables will allow the application to be deployed in any platform. We'll be able to
use docker and it will be transparent for the application.

The standard library to handle environment variables is [dotenv](https://www.npmjs.com/package/dotenv). We
will configure dotenv to specify some basic parameters.

## Build

The build lifecycle transforms the source code to the representation required to run in the target platform.
It is platform-dependant, so the build will generate different output for the browser, nodejs, native, etc.

The build also applies optimizations, and it links external libraries if required. If the target platform will
use a different version of the runtime library, the build ensures that the generated code is compatible with
the required version.

The more popular tools for JavaScript are [webpack](https://www.npmjs.com/package/webpack) and
[rollup](https://www.npmjs.com/package/rollup). In this project we'll use webpack.

## Testing

Testing is a huge topic. For the scope of this project, we'll configure one of the many test frameworks
for JavaScript. All frameworks share some core concepts:

* It should be possible to define test suites and test cases.
* Tests must run in an isolated environment.
* It should be possible to mock components.
* It should be possible to make assertions on expected values.

Some popular test frameworks for JavaScript are [jest](https://www.npmjs.com/package/jest) and
[mocha](https://www.npmjs.com/package/mocha). We will use jest in this project.
