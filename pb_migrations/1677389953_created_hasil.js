migrate((db) => {
  const collection = new Collection({
    "id": "5sujiwcuu0lxinb",
    "created": "2023-02-26 05:39:13.798Z",
    "updated": "2023-02-26 05:39:13.798Z",
    "name": "hasil",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yxguf9rb",
        "name": "hadir",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "mwaoxxfi",
        "name": "izin",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("5sujiwcuu0lxinb");

  return dao.deleteCollection(collection);
})
