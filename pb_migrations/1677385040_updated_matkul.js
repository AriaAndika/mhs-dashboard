migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vjyfbe2kxun3ks")

  // remove
  collection.schema.removeField("fkxbcst9")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("8vjyfbe2kxun3ks")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fkxbcst9",
    "name": "ruangan",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
