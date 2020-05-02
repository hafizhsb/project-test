module.exports = {
  getAll(request) {
    return request.pg.client.query(
      `SELECT id, name, sku, CONCAT('${process.env.UPLOAD_URL}/', image) image, description, price FROM products WHERE is_deleted = 0 ORDER BY added_at DESC`
    )
  },

  getOne(request, id) {
    return request.pg.client.query(
      `SELECT id, name, sku, CONCAT('${process.env.UPLOAD_URL}/', image) image, description, price FROM products WHERE id = $1 LIMIT 1`,
      [id]
    )
  },

  insert(request, preparedData) {
    return request.pg.client.query(
      `INSERT INTO products (${preparedData.fields.join(
        ","
      )}) VALUES (${preparedData.args.join(",")})`,
      preparedData.data
    )
  },

  update(request, preparedData) {
    return request.pg.client.query(
      `UPDATE products SET ${preparedData.args.join(
        ","
      )} , updated_at=now() WHERE ${preparedData.where.join(",")}`,
      preparedData.data
    )
  },

  delete(request, preparedData) {
    return request.pg.client.query(
      `UPDATE products SET ${preparedData.args.join(
        ","
      )} , deleted_at=now() WHERE ${preparedData.where.join(",")}`,
      preparedData.data
    )
  },
}
