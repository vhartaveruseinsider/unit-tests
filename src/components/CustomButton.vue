<script setup lang="ts">
import { computed } from 'vue'
import { dataTestIds } from '../test/dataTestIds'

const props = defineProps<{
  label: string
  disabled?: boolean
  name?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()

// Computed properties for internal logic
const testId = computed(() => 
  props.name ? dataTestIds.button.withName(props.name) : dataTestIds.button.root
)

// This computed is for demonstration - we'll test its outcome, not the property itself
const buttonClasses = computed(() => ({
  'custom-button': true,
  'custom-button--disabled': props.disabled
}))
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click')"
    :data-testid="testId"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.custom-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover:not(:disabled) {
  background-color: #45a049;
}

.custom-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
