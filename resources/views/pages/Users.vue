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
            label="Username"
            v-model="model.name"
          />
          <v-text-field
            :rules="validator.email"
            label="Email"
            v-model="model.email"
          />
          <v-select
            :rules="validator.required"
            v-model="model.role"
            :items="form.roles"
            item-text="name"
            item-value="name"
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
              <td><strong>Email</strong></td>
              <td><strong>Role</strong></td>
            </tr>
            <tr>
              <td>{{ model.name }}</td>
              <td>{{ model.email }}</td>
              <td>{{ model.role }}</td>
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
        >
          <template #[`item.action`]="{ item }">
            <v-icon
              color="primary"
              v-text="`mdi-lead-pencil`"
              @click.stop="Edit(item)"
            />
            <v-icon
              color="red"
              v-text="`mdi-delete-empty`"
              @click.stop="OnDelete(item)"
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
      model: {
        id: '',
        name: '',
        email: '',
        role: '',
      },
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Email Address',
          value: 'email',
        },
        {
          text: 'Role',
          value: 'role',
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
      form: {
        roles: [],
      },
      items: [],
    }
  },
  methods: {
    async LoadRole() {
      const { data } = await http.get('/data/role')
      this.form.roles = data
    },
    async LoadData() {
      const { data } = await http.get('/data/user')
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
      this.type = 'ADD'
      this.model = {
        id: '',
        name: '',
        email: '',
        role: '',
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
          .post('/data/user', {
            name: this.model.name,
            email: this.model.email,
            role: this.model.role,
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
          .patch(`/data/user/${this.model.id}`, {
            name: this.model.name,
            email: this.model.email,
            role: this.model.role,
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
          .delete(`/data/user/${this.model.id}`, {})
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
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
    this.LoadRole()
  },
}
</script>

<style></style>
