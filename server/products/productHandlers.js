const fs = require('fs')
const path = require('path')
const uuid = require('uuid')
const Boom = require('@hapi/boom')

const apiResponse = require(path.join(process.env.ROOT_DIR, '/lib/apiResponse'))
const productModel = require('./productModel')
const productSchema = require('./productSchema')

module.exports = {
  async getProducts(request, h) {
    try {
      const result = await productModel.getAll(request)
      // result.rows.map(row => row.id = 100)

      if (result.rows.length > 0) {
        return h.response(apiResponse(200, 'Data found', result.rows)).code(200)
      } else {
        return h.response(apiResponse(200, 'Data not found', [])).code(200)
      }
    } catch (err) {
      request.log('error', err.message)
    }
  },

  async getProduct(request, h) {
    try {
      const id = request.params.id
      const result = await productModel.getOne(request, id)
      
      if (result.rows.length > 0) {
        return h.response(apiResponse(200, 'Data Found', result.rows[0])).code(200)
      } else {
        return h.response(apiResponse(200, 'Data not found')).code(200)
      }
    } catch (err) {
      request.log('error', err.message)
    }
  },

  async insertProduct(request, h) {
    try {
      const {payload} = request
      const {error:validationError, value} = productSchema.validate(payload, {abortEarly: false})
      if (validationError) {
        return Boom.badData(validationError)
      }

      if (payload.image) {
        const {path, filename, headers } = payload.image
        if (headers['content-type'] != 'image/png' && headers['content-type'] != 'image/jpeg') return Boom.unsupportedMediaType('content-type not allowed')
        
        const fileType = headers['content-type'].split('/')[1]
        const fileName = uuid.v4()
        uploadFile(path, fileName, fileType)
        payload.image = `${fileName}.${fileType}`
      }

      const preparedData = prepareDataInsert(payload)
      await productModel.insert(request, preparedData)

      return h.response(apiResponse(200, 'success')).code(200)
    } catch (err) {
      request.log('error', err.message)
      return Boom.internal()
    }
  },

  async updateProduct(request, h) {
    try {
      const {payload} = request
      const {error:validationError, value} = productSchema.validate(payload, {abortEarly: false})
      if (validationError) {
        return Boom.badData(validationError)
      }

      if (payload.image) {
        const {path, filename, headers } = payload.image
        if (headers['content-type'] != 'image/png' && headers['content-type'] != 'image/jpeg') return Boom.unsupportedMediaType('content-type not allowed')
        
        const fileType = headers['content-type'].split('/')[1]
        const fileName = uuid.v4()
        uploadFile(path, fileName, fileType)
        payload.image = `${fileName}.${fileType}`
      }

      const preparedData = prepareDataUpdate(payload, {id: request.params.id})
      await productModel.update(request, preparedData)

      return h.response(apiResponse(200, 'success')).code(200)
    } catch (err) {
      request.log('error', err.message)
      return Boom.internal()
    }
  },

  async deleteProduct(request, h) {
    try {
      const preparedData = prepareDataUpdate({is_deleted: 1}, {id: request.params.id})
      await productModel.delete(request, preparedData)

      return h.response(apiResponse(200, 'success')).code(200)
    } catch (err) {
      request.log('error', err.message)
    }
  }
}

function uploadFile(path, fileName, fileType) {
  try {
    fs.linkSync(path, `${process.env.UPLOAD_PATH}${fileName}.${fileType}`)
    fs.unlinkSync(path)
  } catch (err) {
    throw new Error(err)
  }
}

function prepareDataInsert(payload) {
  try {
    const dataToInsert = []
    const fields = []
    const args = []

    let i = 1

    for (let key in payload) {
      fields.push(key)
      dataToInsert.push(payload[key])
      args.push(`$${i}`)
      i++
    }

    return {
      data: dataToInsert,
      fields: fields,
      args: args
    }
  } catch (err) {
    throw new Error(err)
  }
}

function prepareDataUpdate(payload, id) {
  try {
    const data = []
    const args = []
    const where = []
    let i = 1
  
    for (let key in payload) {
      args.push(`${key} = $${i}`)
      data.push(payload[key])
      i++
    }
  
    where.push(`id = $${args.length + 1}`)
    data.push(id.id)
  
    return {
      data,
      args,
      where
    }
  } catch (err) {
    throw new Error(err)
  }
  
}