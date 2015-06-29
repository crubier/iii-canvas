# iii Canvas
A binding for iii to JS + HTML canvas.

The binding that allow to execute iii interaction that comply to the `WIMP` interface in a HTML canvas.

    interface WIMP is
      {
        mouse: {} in,
        touch: {} in,
        time: Number in,
        keyboard: {} in,
        motion: {} in,
        motion: {} in,
        dimension: {} in
      }

Any iii interface that complies with this interface can be executed in the iii workshop
