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
   strap init gh:willyg302/zoinks
   cd zoinks
   strap run build
   strap
   ```

You should now be able to visit `http://localhost:8080/` in your favorite browser to see Zoinks.

### Testing

By default, unit tests are run every time you build. However, if you want to run tests independently you can call `strap run test`. All unit tests should be placed in the `test/` directory and be suffixed with `-spec.js`.

## Credits

- **[dive](https://github.com/nyxtom/dive)** by `@nyxtom`
