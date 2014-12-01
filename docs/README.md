# Algorithm Docs

For the official spec of algorithms used, see `algo.tex`. For the raw PADI dive table data used to generate the algorithms, see `raw_algo_data.md`.

## Rationale

Implementing a direct translation of a dive table to code presents a number of challenges:

- The [PADI Dive Table](http://www.orka.lt/img/planner.jpg) used contains over 1000 numbers arranged in a sparse matrix with nonlinear scales
- The table is cyclic for multiple dives
- Certain operations (such as minimizing a surface interval) require traversing the table backwards, starting from a point in the middle of the table

It turns out that dive tables are largely based on physical models -- they may be complex physical models involving huge gas pressure equations and the like, but they are models nonetheless. This means that the table can be reduced to a series of formulas.

To do so, we used a method called *curve fitting*. The raw PADI table data was fed into [ZunZun Online Curve Fitting](http://zunzun.com/) and formulas obtained: either 2D lines for relationships involving two variables (like depth-time) or 3D surfaces for relationships involving three variables (like depth-time-PG). This presents several advantages:

- Formulas have no decision points and are idempotent
- Repeat dives can be reduced to recursively calling the formulas instead of maintaining state
- One can solve for any variable in the formula to run the table "backwards"

## Safety

The curves obtained all approximate the table with 99% confidence. Curves were tweaked to err on the side of caution; the formulas should produce more conservative results than the dive table.
