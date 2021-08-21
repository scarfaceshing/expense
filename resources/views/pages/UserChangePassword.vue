<template>
  <div>
    <v-row justify="center">
      <v-col sm="6">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit"
        >
          <v-text-field
            v-model="oldpassword"
            type="password"
            label="Old Password"
            :rules="rule.oldpassword"
          />
          <v-text-field
            v-model="newpassword"
            type="password"
            label="New Password"
            :rules="validator.required"
          />
          <v-text-field
            v-model="confirmpassword"
            type="password"
            label="Confirm Password"
            :rules="rule.confirmpassword"
          />
          <v-btn type="submit">
            Submit
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from '../../js/http'
import session from '../../js/session'
import Validator from '../../js/validator'

export default {
  data() {
    return {
      name: '',
      valid: true,
      validator: Validator,
      id: '',
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',
      rule: {
        oldpassword: [(v) => !!v || 'Field is required'],
        confirmpassword: [
          (v) => !!v || 'Field is required',
          (v) => v === this.newpassword || 'Password not match',
        ],
      },
    }
  },
  mounted() {
    session.getSession().then((res) => {
      const { data } = res
      this.id = data.id
      this.name = data.name
    })
  },
  methods: {
    ChangePass() {
      http
        .patch(`/data/changepassword/${this.id}`, {
          newpassword: this.newpassword,
        })
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            alert('After change password will logout')
            session.removeToken()
            this.$router.push({ name: 'login' })
          }
        })
        .catch((err) => {
          return false
        })
        .finally(() => {})
    },
    async ValidateUser() {
      try {
        return await http
          .post(`/data/validatepass/${this.id}`, {
            name: this.name,
            oldpassword: this.oldpassword,
          })
          .then((res) => {
            if (res.status === 200 && res.statusText === 'OK') {
              return true
            }
          })
          .catch((err) => {
            return false
          })
          .finally(() => {})
      } catch (err) {
        console.log(err)
      }
    },
    submit() {
      if (!this.$refs.form.validate()) {
        return
      }

      ;(async () => {
        if (await this.ValidateUser()) {
          this.ChangePass()
        } else {
          alert('Invalid old password')
        }
      })()
    },
  },
}
</script>

<style></style>
