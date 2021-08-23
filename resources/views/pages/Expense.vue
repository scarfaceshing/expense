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
          <v-select
            v-model="model.expenses_category"
            :items="form.expense"
            item-text="name"
            item-value="id"
            :rules="validator.required"
          />
          <v-text-field
            :rules="validator.number"
            label="Amount"
            v-model="model.amount"
          />
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
                :rules="validator.required"
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
              <td><strong>Expense Category</strong></td>
              <td><strong>Amount</strong></td>
              <td><strong>Date Entry</strong></td>
            </tr>
            <tr>
              <td v-if="model.expense_cat_relation">
                {{ model.expense_cat_relation.name }}
              </td>
              <td>{{ model.amount }}</td>
              <td>{{ model.date_entry }}</td>
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
          <template #[`item.expenses_category`]="{ item }">
            <span v-if="item.expense_cat_relation">
              {{ item.expense_cat_relation.name }}
            </span>
          </template>
          <template #[`item.amount`]="{ item }">$ {{ item.amount }}</template>
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
      type: '',
      valid: true,
      validator: Validator,
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
        expenses_category: '',
        amount: '',
        date_entry: this.date,
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
      http
        .delete(`/data/expenses/${this.model.id}`, {})
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
          }
        })
        .catch((err) => {})
        .finally(() => {
          this.LoadData()
          this.ShowDeleteDialog(false)
        })
    },
    Edit(item) {
      this.type = 'UPDATE'
      this.ShowDialog(true)

      this.model = {
        id: item.id,
        expenses_category: item.expense_cat_relation
          ? item.expense_cat_relation.id
          : '',
        amount: item.amount,
        date_entry: item.date_entry,
      }
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
          .post('/data/expenses', {
            expenses_category: this.model.expenses_category,
            amount: this.model.amount,
            date_entry: this.model.date_entry,
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
          .patch(`/data/expenses/${this.model.id}`, {
            expenses_category: this.model.expenses_category,
            amount: this.model.amount,
            date_entry: this.model.date_entry,
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
    },
  },
  mounted() {
    /* http
      .patch(`/data/expenses/1`, {
        expenses_category: '1',
        amount: Math.random(),
        date_entry: '2021-08-21',
      })
      .then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
        }
      })
      .catch((err) => {})
      .finally(() => {
        this.LoadData()
        this.ShowDialog(false)
      }) */

    this.LoadData()
    this.loadExpense()
  },
}
</script>

<style></style>
