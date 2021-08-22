<template>
  <div>
    <Dialog
      ref="deleteDialog"
      :viewOnly="false"
      @Exit="ShowDeleteDialog(false)"
      @Save="Delete"
    >
      <template v-slot:title>
        {{ type }}
      </template>
      <template v-slot:default>
        <h1>Are you sure?</h1>
      </template>
    </Dialog>
    <Dialog ref="dialog" :viewOnly="false" @Exit="Exit" @Save="Save">
      <template v-slot:title>
        {{ type }}
      </template>
      <template v-slot:default>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            :rules="validator.required"
            label="Name"
            v-model="model.name"
            disabled
          />
          <v-text-field
            :rules="validator.required"
            label="Description"
            v-model="model.description"
          />
        </v-form>
      </template>
    </Dialog>
    <Dialog
      ref="viewDialog"
      :viewOnly="true"
      @Exit="ShowViewDialog(false)"
      @Save="Save"
    >
      <template v-slot:title>
        {{ type }}
      </template>
      <template v-slot:default>
        <v-simple-table>
          <tbody>
            <tr>
              <td><strong>Name</strong></td>
              <td><strong>Description</strong></td>
            </tr>
            <tr>
              <td>{{ model.name }}</td>
              <td>{{ model.description }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </template>
    </Dialog>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="Add">Add</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="5"
          class="elevation-1"
          @click:row="Show($event)"
        ></v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from '../../js/http'
import Dialog from '../component/Dialog'
import Validator from '../../js/validator'

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      valid: true,
      validator: Validator,
      type: '',
      viewDialog: false,
      model: {
        id: '',
        name: '',
        description: '',
      },
      headers: [
        {
          text: 'Display Name',
          value: 'name',
        },
        {
          text: 'Description',
          value: 'description',
        },
        {
          text: 'Created At',
          value: 'created_at',
        },
      ],
      items: [],
    }
  },
  methods: {
    async LoadData() {
      const { data } = await http.get('/data/role')
      this.items = data
    },
    ShowViewDialog(value) {
      this.$refs.viewDialog.visible = value
    },
    ShowDeleteDialog(value) {
      this.$refs.deleteDialog.visible = value
    },
    ShowDialog(value) {
      this.$refs.dialog.visible = value
    },
    Show($event) {
      this.type = 'VIEW'
      this.model = $event
      this.ShowViewDialog(true)
    },
    Add() {
      this.valid = true
      this.type = 'ADD'

      this.model = {
        id: '',
        name: 'User',
        description: '',
      }

      Promise.resolve(this.ShowDialog(true)).then((res) => {
        this.$refs.form.reset()
      })
    },
    OnDelete(item) {
      this.type = 'DELETE'
      this.model = item
      this.ShowDeleteDialog(true)
    },
    Delete() {
      this.Save()
    },
    Edit(item) {
      this.type = 'UPDATE'
      this.ShowDialog(true)
      this.model = item
    },
    Exit() {
      this.ShowDialog(false)
    },
    Save() {
      if (!this.$refs.form.validate()) {
        return
      }

      if (this.type === 'ADD') {
        http
          .post('/data/role', {
            name: this.model.name,
            description: this.model.description,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
            }
          })
          .catch((res) => {})
          .finally(() => {
            this.LoadData()
            this.ShowDialog(false)
          })
      }

      if (this.type === 'UPDATE') {
        http
          .patch(`/data/role/${this.model.id}`, {
            name: this.model.name,
            description: this.model.description,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
            }
          })
          .catch((err) => {})
          .finally(() => {
            this.LoadData()
            this.ShowDialog(false)
          })
      }

      if (this.type === 'DELETE') {
        http
          .delete(`/data/role/${this.model.id}`, {})
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              this.LoadData()
            }
          })
          .catch((err) => {})
          .finally(() => {
            this.LoadData()
            this.ShowDeleteDialog(false)
          })
      }
    },
  },
  mounted() {
    this.LoadData()
  },
}
</script>

<style></style>
