migrate((db) => {
  const collection = new Collection({
    "id": "laaoskmrx75gv3n",
    "created": "2023-02-25 01:00:46.851Z",
    "updated": "2023-02-25 01:00:46.851Z",
    "name": "kelompok",
    "type": "base",
    "system": false,
    "schema": [
      {
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
  const collection = dao.findCollectionByNameOrId("laaoskmrx75gv3n");

  return dao.deleteCollection(collection);
})
