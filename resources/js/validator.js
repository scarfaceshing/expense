export default {
  required: [(v) => !!v || 'Field is required'],
  email: [
    (v) => !!v || 'Field is required',
    (v) => /.+@.+/.test(v) || 'E-mail must be valid',
  ],
  number: [
    (v) => !!v || 'Field is required',
    (v) => !v || /^[0-9]*$/.test(v) || 'Enter numbers only.',
  ],
}
