//------------------------------------------
// Start: 7/18/25
// Name: College Planner Status Checker
// Author: BanAnh Doan
// 
//Made with Google AppScript
//------------------------------------------

function checkStatus(input) {
  findStatus(input);
}




function findStatus(name = "PHYS 491 & 493") {

  const ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1tN6Ol2K9lseQw9dTqBCkjZaQ69CdELzamxqtcKXCqIU/edit?gid=0#gid=0");

  //--------test--------

  const cell = ss.getRange("Q2");

  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList([" ", "Yes", "No"])
    .build();

  cell.setDataValidation(rule);

  //--------------------

  // Retrieving ALL course's prerequisites



  // const row = loc.slice(1);
  // const course = ss.getRange(loc).getValue();

  const activeCell = new Course(name);

  const totPreqs = getPrerequisites(ss, activeCell.row, activeCell.name, 0, activeCell);
  const finalPreqs = dupeRemoval(totPreqs);

  console.log(finalPreqs);
  console.log(activeCell.level);

  // Indentifying Validity via Year and Semester

}

// Helper Functions --------------------------------------------

function getPrerequisites(ss, row, course, level, obj) {

  const preqLoc = ss.getRange("I" + row);
  const preqs = preqLoc.getValues();
  const preqList = preqListCooker(preqs[0]);
  const newList = [];
  level = level + 1;

  if (preqList.length == 0 || preqList.includes("")) {
    console.log(course + " has no preq. Moving on...");
    return [course];
  }
  else {
    const lenList = preqList.length;
    // console.log("Preqs of " + course + ": " + preqList);
    for (let i = 0; i < lenList; i++) {
      // console.log("--- getPrerequisites: " + preqList[i]);
      newList.push(preqList[i]);
      const inside = getPrerequisites(ss, getValueLoc(preqList[i], ss).slice(1), preqList[i], level, obj);

      for (const j of inside) {
        newList.push(j);
      }

      // console.log("--- After concatenation inside of " + course + ": " + newList);
    }
  }

  if (obj.level < level) { // level of classes to take before I qualify
    obj.level = level;
  }

  return newList;

}


function preqListCooker(rawList) {

  let rawStr = rawList[0];
  return rawStr.split(", ");

}

// to be removed once class Course is completed.

function getValueLoc(value = "PHYS 425", ss) {

  let firstRow = 2;
  let lastRow = 1;

  while (ss.getRange("E" + firstRow).getValue() != "" && ss.getRange("F" + firstRow).getValue() != "") {
    lastRow++;
    firstRow++;
  }

  // console.log("------ getValueLoc Fn for " + value);

  for (let i = 2; i < lastRow; i++) {
    const cell = "C" + i;

    if (ss.getRange(cell).getValue() == value) {
      return cell;
    }
  }

  console.log("Invalid");
  return "Invalid";

}



function dupeRemoval(dupeList) {

  for (let i = 0; i < dupeList.length; i++) {
    for (let j = i + 1; j < dupeList.length; j++) {
      if (dupeList[i] == dupeList[j]) {
        dupeList.splice(j, 1);
        j--;
      }
    }
  }

  return dupeList;

}











