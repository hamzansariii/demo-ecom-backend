const express = require('express')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const routeFiles = fs.readdirSync(__dirname).filter((file) => {
    if (file !== 'index.js' && file.endsWith('.js')) {
        return file
    }
})

for (const file of routeFiles) {
    const route = require(path.join(__dirname, file))
    router.use(route)
}

module.exports = router