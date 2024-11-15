const fs = require('fs');
const path = require('path');

module.exports = () => {

    fs.readFile(path.join(__dirname, 'lipsum.txt'), (err, data) => {
        if (err) {
            console.log('Error raeding', err);
            return
        }
        // console.log('Successfully read lipsum.txt');
        let upperCaseData = data.toString().toUpperCase()
        fs.writeFile(path.join(__dirname, 'uppercaseLipsum.txt'), upperCaseData, (err) => {
            if (err) {
                console.log('Error writing to uppercase', err);
                return
            }
            fs.appendFile(path.join(__dirname, 'filename.txt'), 'uppercaseLipsum.txt\n', (err) => {
                if (err) {
                    console.log(err);
                    return
                }
                fs.readFile(path.join(__dirname, 'uppercaseLipsum.txt'), (err, data) => {
                    if (err) {
                        console.log('Error reading uppercase', err);
                        return
                    }
                    let sentences = data.toString().toLowerCase().split('.');
                    let sentencesData = sentences.join('\n');
                    fs.writeFile(path.join(__dirname, 'sentences.txt'), sentencesData, (err) => {
                        if (err) {
                            console.log('Error writing sentences', err);
                            return
                        }
                        console.log('Successfully read sentences.txt');

                        fs.appendFile(path.join(__dirname, 'filename.txt'), 'sentences.txt\n', (err) => {
                            if (err) {
                                console.log('Error appending', err)
                                return
                            }
                            fs.readFile(path.join(__dirname, 'sentences.txt'), (err, data) => {
                                if (err) {
                                    console.log('Error reading sentences', err)
                                    return
                                }
                                let sortContent = data.toString().split('\n').sort().join('\n');
                                fs.writeFile(path.join(__dirname, 'sorted.txt'), sortContent, err => {
                                    if (err) {
                                        console.log('Error writing sortContent', err);
                                        return
                                    }
                                    fs.appendFile(path.join(__dirname, 'filename.txt'), 'sorted.txt\n', err => {
                                        if (err) {
                                            console.log('Error appending', err);
                                            return
                                        }
                                        fs.readFile(path.join(__dirname, 'filename.txt'), (err, filesList) => {
                                            if (err) {
                                                console.log('Error reading filename', err);
                                                return
                                            }
                                            let filesToDelete = filesList.toString().trim().split('\n');

                                            filesToDelete.forEach((file) => {
                                                fs.unlink(path.join(__dirname,file), (err) => {
                                                    if (err) {
                                                        console.log('Error deleting', err)
                                                        return
                                                    }
                                                    console.log(`${file} is deleted`)
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    })
}