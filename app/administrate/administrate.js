const { kafka } = require('../kafka');

const admin = kafka.admin();

console.log("adminstrate started")


async function administrate(){

    await admin.connect()

    await admin.listGroups().then(
        response => (console.log(response))
    )

    await admin.disconnect()
}
