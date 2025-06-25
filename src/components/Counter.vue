<script setup lang="ts">
import { useCounter } from '../store/counter'
import CustomButton from './CustomButton.vue'
import { dataTestIds } from '../test/dataTestIds'

const { count, increment, decrement, reset } = useCounter(0)
const ids = dataTestIds.counter
</script>

<template>
  <div class="counter">
    <h2 :data-testid="ids.value">Counter: {{ count }}</h2>
    <div class="buttons">
      <CustomButton
        :data-testid="ids.incrementButton"
        label="Increment"
        @click="increment"
      />
      <CustomButton
        :data-testid="ids.decrementButton"
        label="Decrement"
        @click="decrement"
      />
      <CustomButton
        :data-testid="ids.resetButton"
        label="Reset"
        @click="reset"
      />
    </div>
  </div>
</template>

<style scoped>
.counter {
  text-align: center;
  padding: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}
</style>
