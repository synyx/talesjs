[![build status][travis-image]][travis-url]
[![coverage status][coveralls-image]][coveralls-url]

# Tales

synyx presentation style for everyone

## Development

ensure installed

- NodeJS v8

checkout this project

```
git clone git@github.com:synyx/tales.git
```

and install all dependencies

```
npm install
```

Then you can start the configured [webpack-dev-server] which provides the application
on `http://localhost:8080`

```
npm run dev
```

Hot Module Replacement ist enabled.  
So saving an edited JavaScript file for instance will update the opened Browsertab automatically 🎉

### Git hooks

Installing the project dependencies via `npm install` will setup following git hooks.

- **pre-commit**  
  The pre-commit hook formats all edited files with [prettier].

- **pre-push**  
  The pre-push hook will run the tests before anything is pushed to the origin.

[travis-image]: https://travis-ci.org/synyx/tales.svg?branch=master
[travis-url]: https://travis-ci.org/synyx/tales
[coveralls-image]: https://coveralls.io/repos/github/synyx/tales/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/synyx/tales?branch=master
[prettier]: https://github.com/prettier/prettier
[webpack-dev-server]: https://webpack.js.org/configuration/dev-server
