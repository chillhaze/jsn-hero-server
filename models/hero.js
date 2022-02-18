const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

// Hero schema
const heroSchema = Schema(
  {
    // _id: {
    //   type: Object,
    //   required: [true, 'Unknown hero name'],
    // },
    nickname: {
      type: String,
      required: [true, 'Unknown hero name'],
    },
    real_name: {
      type: String,
      required: [true, 'Unknown hero real name'],
    },
    origin_description: {
      type: String,
      required: [true, 'Unknown hero description'],
    },
    superpowers: {
      type: String,
      required: [true, 'Unknown hero super powers'],
    },
    catch_phrase: {
      type: String,
      required: [true, 'Unknown hero phrase'],
    },
    images: {
      type: Array,
      required: [true, 'Please add hero image'],
    },
  },
  { versionKey: false, timestamps: true },
)

//  Joi Schema
const joiSchema = Joi.object({
  nickname: Joi.string(),
  real_name: Joi.string(),
  origin_description: Joi.string(),
  superpowers: Joi.string(),
  catch_phrase: Joi.string(),
  images: Joi.array().items(Joi.string()),
  // images: Joi.string().required(),
})

const Hero = model('heroes', heroSchema)

module.exports = {
  Hero,
  joiSchema,
}
