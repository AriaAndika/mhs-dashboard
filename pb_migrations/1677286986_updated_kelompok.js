migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("laaoskmrx75gv3n")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "biwvx3mk",
    "name": "matkul",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": null,
      "collectionId": "8vjyfbe2kxun3ks",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("laaoskmrx75gv3n")

  // remove
  collection.schema.removeField("biwvx3mk")

  return dao.saveCollection(collection)
})
