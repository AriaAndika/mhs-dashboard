migrate((db) => {
  const collection = new Collection({
    "id": "8vjyfbe2kxun3ks",
    "created": "2023-02-25 01:01:10.744Z",
    "updated": "2023-02-25 01:01:10.744Z",
    "name": "matkul",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "etd780hs",
        "name": "nama",
        "type": "text",
        "required": true,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8vjyfbe2kxun3ks");

  return dao.deleteCollection(collection);
})
