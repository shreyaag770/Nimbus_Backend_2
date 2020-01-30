const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventSchema = new schema({
    name: {type: String, required: true},
    info: {type: String, required: true},
    venue: {type: String, required: true},
    date: {type: Date, required: true},
    image: {type: String, required: true},
    regUrl: {type: String, required: true},
    type: {type: Number, required: true},   /**
                        0 for departmentEvents
                        1 for instituteEvents
                        2 for Talks
                        3 for Exhibitions
                        4 for Workshops
                    */
})

eventSchema.index({type:1})


const Events = mongoose.model('Events', eventSchema);

module.exports = Events;