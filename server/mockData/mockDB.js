const mockUsers = [
  {
    "_id": "5e7f8f1f70929351fee75b90",
    "cart": {
      "_id": "5e7f8f1f70929351fee75b8f" ,
      "items": [],
      "status": "Active"
    },
    "rentedDesigns": [],
    "fname": "Bob",
    "lname": "Bobbert",
    "email": "bob@bob.com",
    "password": "$2a$10$tvTk6FHq/PDpxASCEWC8ueP5dzs5zYSS7YePyTIYjmvW5vBf42jji",
    "designs": [
      {
        "_id": "5e8788ed834a3a02a9204b39",
        "name": "dasdas",
        "details": "details here...",
        "garmentColor": "colorID06",
        "garmentTypeName": "gt002",
        "images": ["insta_2.jpg", "insta_4.jpg"],
        "created": "01-01-2020"
      },
      {
        "_id": "5e878aea834a3a02a9204b69",
        "name": "adasa",
        "details": "details here...",
        "garmentColor": "colorID04",
        "garmentTypeName": "gt002",
        "images": ["insta_1.jpg"],
        "created": "01-01-2020"
      },
      {
        "_id": "5e87915d834a3a02a9204ba2",
        "name": "asdasfass",
        "details": "details here...",
        "garmentColor": "colorID04",
        "garmentTypeName": "gt002",
        "images": ["insta_3.jpg", "insta_4.jpg", "fb_cover.jpg"],
        "created": "01-01-2020"
      },
      {
        "_id": "5e8794e6834a3a02a9204bcb",
        "name": "asdadsaasf",
        "details": "details here...",
        "garmentColor": "colorID03",
        "garmentTypeName": "gt001",
        "images": ["insta_2.jpg"],
        "created": "01-01-2020"
      }
    ],
    "orders": [],
    "date": { "$date": { "$numberLong": "1585418015837" } },
    "__v": { "$numberInt": "91" }
  }
]

exports.mockUsers = mockUsers;