export default {
    UserDBData: [
        {
            id: "U001",
            fname: "bob",
            lname: "bobson",
            email: "bob@bob.com",
            password: "123",//?
            designs: [
                {
                    id: "001",
                    name: "name 4",
                    created: "01/01/20"
                },
                {
                    id: "002",
                    name: "name 34",
                    created: "02/01/20"
                },
                {
                    id: "003",
                    name: "name 3",
                    created: "03/01/20",
                    artistID: "a001"
                },
                {
                    id: "004",
                    name: "Best design ever",
                    created: "01/01/20"
                },
                {
                    id: "005",
                    name: "oioioioi",
                    created: "02/01/20"
                },
                {
                    id: "006",
                    name: "broooooo",
                    created: "03/01/20",
                    artistID: "a003"
                }
            ],
            orders: [
                {
                    id: "001",
                    name: "order 1234",
                    price: "250.00",
                    placed: "01/01/20",
                    status: "In Production",
                    productLines : [
                        {
                          productLineID: "pl001",
                          type: "tshirt",
                          material: "Gildan Cotton",
                          design: "d012",
                          price: 30,
                          qtty: 3
                        },
                        {
                          productLineID: "pl003",
                          type: "v-neck",
                          material: "Gildan Heavy",
                          design: "d003",
                          price: 20,
                          qtty: 1
                        }
                      ]
                },
                {
                    id: "002",
                    name: "order 99",
                    price: "250.00",
                    placed: "02/01/20",
                    status: "Paid for",
                    productLines : [
                        {
                          productLineID: "pl002",
                          type: "hoodie",
                          material: "Fruity of the Loom Cotton",
                          design: "d924",
                          price: 70,
                          qtty: 10
                        }
                      ]
                }
            ]
        },
        {
            id: "U002",
            fname: "mate",
            lname: "krisztian",
            email: "m@k.com",
            password: "pass",
            designs: [
                {
                    id: "032",
                    name: "design 32",
                    created: "01/01/20"
                },
                {
                    id: "076",
                    name: "design 76",
                    created: "02/01/20"
                },
                {
                    id: "031",
                    name: "design 31",
                    created: "03/01/20",
                    artistID: "a001"
                },
                {
                    id: "098",
                    name: "cool design",
                    created: "01/01/20"
                },
                {
                    id: "101",
                    name: "yeayeah",
                    created: "02/01/20"
                }
            ],
            orders: [
                {
                    id: "003",
                    name: "order 1234",
                    price: "250.00",
                    created: "03/01/20"
                },
                {
                    id: "004",
                    name: "order 1234",
                    price: "250.00",
                    created: "01/01/20"
                },
                {
                    id: "005",
                    name: "order 1234",
                    price: "250.00",
                    created: "02/01/20"
                },
                {
                    id: "006",
                    name: "order 1234",
                    price: "250.00",
                    created: "03/01/20"
                }
            ]
        }
    ]
}