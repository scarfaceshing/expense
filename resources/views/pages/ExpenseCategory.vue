<template>
  <div>
    <Dialog ref="deleteDialog" @Exit="ShowDeleteDialog(false)" @Save="Delete">
      <template v-slot:default>
        <h1>Are you sure?</h1>
      </template>
    </Dialog>
    <Dialog ref="dialog" @Exit="Exit" @Save="Save">
      <template v-slot:default>
        <v-text-field label="Name" v-model="model.name" />
        <v-text-field label="Description" v-model="model.email" />
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
        >
          <template #[`item.action`]="{ item }">
            <v-icon
              color="primary"
              v-text="`mdi-lead-pencil`"
              @click="Edit(item)"
            />
            <v-icon
              color="red"
              v-text="`mdi-delete-empty`"
              @click="OnDelete(item)"
            />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from '../../js/http'
import Dialog from '../component/Dialog'

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      type: '',
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
        {
          text: 'Action',
          value: 'action',
        },
      ],
      items: [],
    }
  },
  methods: {
    async LoadData() {
      const { data } = await http.get('/data/expense-categories')
      this.items = data
    },
    ShowDeleteDialog(value) {
      this.$refs.deleteDialog.visible = value
    },
    ShowDialog(value) {
      this.$refs.dialog.visible = value
    },
    Add() {
      this.type = 'ADD'

      this.model = {
        id: '',
        name: '',
        description: '',
      }

      this.ShowDialog(true)
    },
    OnDelete(item) {
      this.model = item
      this.ShowDeleteDialog(true)
    },
    Delete() {
      this.type = 'DELETE'
      this.Save()
    },
    Edit(item) {
      this.type = 'UPDATE'
      this.ShowDialog(true)
      this.model = item
    },
    Exit() {
      console.log('Close')
      this.ShowDialog(false)
    },
    Save() {
      console.log('Save')
      if (this.type === 'ADD') {
        http
          .post('/data/expense-categories', {
            name: this.model.name,
            email: this.model.email,
            role: this.model.role,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              console.log(res)
            }
          })
          .catch((res) => {})
          .finally(() => {
            this.ShowDialog(false)
          })
      }

      if (this.type === 'UPDATE') {
        http
          .patch(`/data/expense-categories/${this.model.id}`, {
            name: this.model.name,
            email: this.model.email,
            role: this.model.role,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              console.log(res)
            }
          })
          .catch((err) => {})
          .finally(() => {
            this.ShowDialog(false)
          })
      }

      if (this.type === 'DELETE') {
        http
          .delete(`/data/expense-categories/${this.model.id}`, {})
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              this.LoadData()
              console.log(res)
            }
          })
          .catch((err) => {})
          .finally(() => {
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
