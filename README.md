![Zoinks](https://raw.github.com/willyg302/zoinks/master/zoinks-logo.png "Zoinks, like hey SCUBA!")

---

SCUBA Dive Planner Project for ICS 414.

## Disclaimer

**This system is a PROTOTYPE and should NOT be used to plan real dives!**

## Developing

### Quick Start

1. Install [strap](https://github.com/willyg302/strap.py)

2. Grab Zoinks, build it, and start the development server

   ```bash
   strap init gh:willyg302/zoinks -d zoinks
   cd zoinks
   strap run build
   strap
   ```

You should now be able to visit `http://localhost:8080/` in your favorite browser to see Zoinks.

### Testing

By default, tests are run every time you build. However, if you want to run tests independently you can call `strap run test`.

Tests are written using [Jest](http://facebook.github.io/jest/) and live in `__tests__` directories next to the files that they test. They should be suffixed with `-test.js`. The configuration is the `jest` property of `package.json`. If you need to modify any preprocessing tasks, they are in `jest-preprocessor.js`.

### Tools

Call `strap run cloc` to get LOC statistics for the project. Only `*.js` and `*.jsx` files are included, and they are bucketed into the following categories:

- **Functionality**: Code for implementing dive table calculations
- **Interface**: Any code related to the UI
- **Test**: Code residing in a `__tests__` directory

## Credits

- **[dive](https://github.com/nyxtom/dive)** by `@nyxtom`
