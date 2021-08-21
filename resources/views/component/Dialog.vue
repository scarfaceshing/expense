<template>
  <div ref="dialog">
    <v-dialog v-model="visible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <slot name="title"></slot>
        </v-card-title>
        <v-card-text>
          <v-container>
            <slot></slot>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-show="viewOnly === false"
            color="blue darken-1"
            text
            @click="$emit('Save')"
          >
            Save
          </v-btn>
          <v-btn color="blue darken-1" text @click="$emit('Exit')">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['viewOnly'],
  data() {
    return {
      visible: false,
    }
  },
}
</script>

<style></style>
