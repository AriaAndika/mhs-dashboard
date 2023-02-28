migrate((db) => {
  const collection = new Collection({
    "id": "ltin5cgghyj529u",
    "created": "2023-02-26 04:35:16.192Z",
    "updated": "2023-02-26 04:35:16.192Z",
    "name": "jadwal",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "owvikm1i",
        "name": "jam1",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "2023-02-09 12:00:00.000Z",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "2s1cmsvi",
        "name": "jam2",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("ltin5cgghyj529u");

  return dao.deleteCollection(collection);
})
