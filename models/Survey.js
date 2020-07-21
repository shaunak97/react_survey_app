const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema], //Sub document collection
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schmea.Types.ObjectId, ref: 'User' }, //It is a relationship field between a given schema and a User
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('surveys', surveySchema);
