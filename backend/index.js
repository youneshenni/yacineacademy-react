const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://root:example@localhost:27017/');

app.get('/api/menu', (req, res) => {
    mongoose.connection.useDb('yacineacademy').collection('menu').find({}).toArray().then(result => result[0].menu).then(x => res.json(x));
});

app.get('/api/data', async (req, res) => {
    const { page, rowsPerPage } = req.query;
    console.log(page, rowsPerPage)
    const data = await mongoose.connection.useDb('yacineacademy').collection('data').aggregate([
        {
            $facet: {
                metadata: [
                    {
                        $count: "total"
                    }
                ],
                ranges: [
                    {
                        $bucket:
                        {
                            groupBy: "$age",
                            boundaries: [0, 10, 18, 25, 40, 60],
                            default: "Over60",
                            output: {
                                count: {
                                    $sum: 1
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            label: {
                                $switch: {
                                    branches: [
                                        {
                                            case: {
                                                $eq: ["$_id", 0]
                                            },
                                            then: "0-9"
                                        },
                                        {
                                            case: {
                                                $eq: ["$_id", 10]
                                            },
                                            then: "10-17"
                                        },
                                        {
                                            case: {
                                                $eq: ["$_id", 18]
                                            },
                                            then: "18-24"
                                        },
                                        {
                                            case: {
                                                $eq: ["$_id", 25]
                                            },
                                            then: "25-39"
                                        },
                                        {
                                            case: {
                                                $eq: ["$_id", 40]
                                            },
                                            then: "40-59"
                                        },
                                        {
                                            case: {
                                                $eq: ["$_id", "Over60"]
                                            },
                                            then: "60+"
                                        }
                                    ],
                                    default: "Unknown"
                                }
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 0,
                            label: 1,
                            count: 1
                        }
                    }
                ],
                data: [
                    {
                        $skip: page * rowsPerPage
                    },
                    {
                        $limit: parseInt(rowsPerPage)
                    }
                ]
            }
        },
        {
            $project: {
                data: 1,
                count: {
                    $arrayElemAt: ["$metadata.total", 0]
                },
                ranges: "$ranges"
            }
        }
    ]).toArray();
    console.log(data)
    return res.json(data[0]);
})

app.post('/api/fill', (req, res) => {

    const tableData = Array.from({ length: 1e7 }, (_, index) => ({
        id: index,
        name: `Name ${index}`,
        age: Math.floor(Math.random() * 100),
    }));
    mongoose.connection.useDb('yacineacademy').collection('data').insertMany(tableData).then(() => res.json({ message: 'Data inserted' }));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});