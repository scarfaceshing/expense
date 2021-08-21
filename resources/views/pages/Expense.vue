<template>
  <div>
    <Dialog ref="deleteDialog" @Exit="ShowDeleteDialog(false)" @Save="Delete">
      <template v-slot:default>
        <h1>Are you sure?</h1>
      </template>
    </Dialog>
    <Dialog ref="dialog" @Exit="Exit" @Save="Save">
      <template v-slot:default>
        <v-select
          v-model="model.expenses_category"
          :items="form.expense"
          item-text="name"
          item-value="name"
        />
        <v-text-field label="Amount" v-model="model.amount" />
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="model.date_entry"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="model.date_entry"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="model.date_entry" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(model.date_entry)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
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
      menu: false,
      model: {
        id: '',
        expenses_category: '',
        amount: '',
        date_entry: '',
      },
      headers: [
        {
          text: 'Expenses Category',
          value: 'expenses_category',
        },
        {
          text: 'Amount',
          value: 'amount',
        },
        {
          text: 'Date Entry',
          value: 'date_entry',
        },
        {
          text: 'Action',
          value: 'action',
        },
      ],
      form: {
        expense: [],
      },
      items: [],
    }
  },
  methods: {
    async loadExpense() {
      const { data } = await http.get('/data/expense-categories')
      this.form.expense = data
    },
    async LoadData() {
      const { data } = await http.get('/data/expenses')
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
        expenses_category: '',
        amount: '',
        date_entry: this.date,
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
          .post('/data/expenses', {
            expenses_category: this.model.expenses_category,
            amount: this.model.amount,
            date_entry: this.model.date_entry,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              console.log(res)
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
          .patch(`/data/expenses/${this.model.id}`, {
            expenses_category: this.model.expenses_category,
            amount: this.model.amount,
            date_entry: this.model.date_entry,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              console.log(res)
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
          .delete(`/data/expenses/${this.model.id}`, {})
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              this.LoadData()
              console.log(res)
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
    this.loadExpense()
  },
}
</script>

<style></style>
