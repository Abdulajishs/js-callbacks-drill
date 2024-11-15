const fs = require('fs');
const path = require('path');
let dirPath = path.join(__dirname, 'jsonFiles')

module.exports = function createAndDelete() {

    fs.mkdir(dirPath, (err) => {
        if (err && err.code !== 'EEXIST') {
            console.log("Error creating directory", err);
            return
        }
        console.log('Directory is created.')

        for (let i = 0; i < 5; i++) {
            let fileName = `file_${Math.floor(Math.random() * 1000)}.json`
            let filePath = path.join(__dirname, 'jsonFiles', fileName);
            let data = JSON.stringify({ user: 'Random', id: i + 1 });

            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    console.log(err);
                    return
                }
                console.log('File is created', fileName)
            })
        }

        setTimeout(() => {
            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    console.log('Error reading ', err)
                    return
                }

                files.forEach((file) => {
                    fs.unlink(path.join(__dirname, 'jsonFiles', file), (err) => {
                        if (err) {
                            console.log("Error deleting", err);
                            return
                        }
                        console.log(`${file} deleted`)
                    })
                })
            })
        }, 1000)

        setTimeout(() => {
            fs.rmdir(dirPath, (err) => {
                if (err) {
                    console.log('Error deleting directory ', err)
                    return
                }
                console.log('Directory succesfully deleted')
            })
        }, 2000)
    })

}
