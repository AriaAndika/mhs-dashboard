migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5sujiwcuu0lxinb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "10b9pj8a",
    "name": "sakit",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5sujiwcuu0lxinb")

  // remove
  collection.schema.removeField("10b9pj8a")

  return dao.saveCollection(collection)
})
