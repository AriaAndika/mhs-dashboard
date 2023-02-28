migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("laaoskmrx75gv3n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gw5sxgkq",
    "name": "kel",
    "type": "text",
    "required": true,
    "unique": true,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("laaoskmrx75gv3n")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gw5sxgkq",
    "name": "kel",
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
