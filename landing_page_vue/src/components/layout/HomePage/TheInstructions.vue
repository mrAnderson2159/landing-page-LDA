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
    colSpan(breakpoint) {
      const length = this.messages.length;
      const span = Math.floor(12 / length);
      const exceding = 12 % length;

      const result = Array(length).fill(span);

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
