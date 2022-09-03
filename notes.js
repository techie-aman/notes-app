const fs = require('fs')
const chalk = require('chalk');
const { title } = require('process');

const listNotes = () => {
  let notes = loadNotes();
  console.log(chalk.inverse('Your Notes:'));
  notes.forEach((note, i) => {
    console.log((i+1) + '. ' + note.title)
  });
  console.log(`Total: ${notes.length}`);
}

const addNote = (title, body) => {
  let notes = loadNotes();
  let duplicateNotes = notes.filter(note => note.title === title);

  debugger

  if(duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.green.bold('Note added successfully!'))
  } else {
    console.log(chalk.red.bold('Note title taken. Please add with different title.'))
  }
}

const removeNote = title => {
  let notes = loadNotes();
  let noteWithTitle = notes.find(note => note.title === title)
  if(noteWithTitle !== undefined) {
    let newNotes = notes.filter(note => note.title !== title)
    saveNotes(newNotes);
    console.log(chalk.green.bold('Note removed successfully'))
  } else {
    console.log(chalk.yellow.bold('Note does not exits!'))
  }
}

const readNote = title => {
  let notes = loadNotes();
  let noteWithTitle = notes.find(note => note.title === title)
  if(noteWithTitle) {
    console.log(chalk.green.bold(`Title: ${noteWithTitle.title}`))
    console.log(chalk.green.bold(`Body: ${noteWithTitle.body}`))
  } else {
    console.log(chalk.yellow.bold('Note does not exits!'))
  }
}

// Function to read the notes from JSON file and parse it into JS Object
const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON);
  } catch(e) {
    return [];
  }
}

// Function to stringfy the JS Object and save it into the notes.json file
const saveNotes = notes => {
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', notesJSON)
}

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote
};