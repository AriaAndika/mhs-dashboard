migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("m1fuuakj")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m1fuuakj",
    "name": "nim",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": 14,
      "max": 14,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
