<template>
  <div class="row">
    <div
      v-for="(message, i) in messages"
      :key="message.title"
      :class="[colSpan(breakpoint)[i], divClasses]"
    >
      <h2>{{ message.title }}</h2>
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>

<script>
import {
  requiredArray,
  notRequiredString,
  requiredString,
} from "../../../utilities/props";

import { isOdd } from "../../../utilities/booleans";
import { TheInstructionsMessage } from "../../../utilities/classes";

export default {
  created() {},
  props: {
    messages: requiredArray(TheInstructionsMessage),
    breakpoint: {
      ...requiredString,
      validator(value) {
        return ["xs", "sm", "md", "lg", "xl", "xxl"].includes(value);
      },
    },
    divClasses: notRequiredString,
  },
  methods: {
    /**
     * Counts the number of 'this.messages' and calculates the appropriate 'x' for
     * class 'col-{breakpoint}-{x}': if the 'm' messages are a 12 divisor
     *  12 % m == 0
     * then every x will be the same, otherwise the central colums will be larger.
     * @param {String} breakpoint The bootstrap breakpoing when cols changes behavior
     * @returns {Array<String>} An array containing computed 'col-{breakpoint}-{x}'
     */
    colSpan(breakpoint) {
      // Get the length of messages where both title and message exists
      const length = this.messages.filter((m) => m.title && m.message).length;
      // Bootstrap uses 12 columns, divide it by the messages length
      const span = Math.floor(12 / length);
      // Keep the rest of the division
      const exceding = 12 % length;

      // Prepare result array of 'messages.length' length
      const result = Array(length).fill(span);

      // If there is a rest, point to the result median (or the medians) and from there
      // spread the rest over neighboring items
      if (exceding) {
        let i = 0;
        let f = 0;

        if (isOdd(length)) {
          i = Math.floor(length / 2);
          f = i + 1;
        } else {
          i = f = length / 2;
        }

        for (let k = 0; k < exceding; k++) {
          if (isOdd(k)) result[f++]++;
          else result[i--]++;
        }
      }

      return result.map((x) => `col-${breakpoint}-${x}`);
    },
  },
};
</script>

<style lang="scss" scoped>
*:hover {
  cursor: default;
}
</style>
