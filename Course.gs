class Course {

  constructor(name, ss) {
    this._ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1tN6Ol2K9lseQw9dTqBCkjZaQ69CdELzamxqtcKXCqIU/edit?gid=0#gid=0");

    this._name = name;
    this._row = this.getLoc().slice(1);
    this._year = this._ss.getRange("K" + this._row).getValue();
    this._semester = this._ss.getRange("L" + this._row).getValue();
    this._level = 0;

  }



  // display information
  show() {
    console.log(`Course: ${this._name}\nYear: ${this._year},\nSemester: ${this._semester}`);
  }

  // getters
  get fullName() { return this._name;}

  get year() { return this._year;}

  get sem() { return this._semester;}

  get row() { return this._row;}

  get level() { return this._level;}

  // setters
  set fullName(name) { this._name = name;}

  set year(year) { this._year = year;}

  set sem(sem) { this._semester = sem;}

  set row(row) { this._row = row;}

  set level(lvl) { this._level = lvl; }



  getLoc() {

    let firstRow = 2;
    let lastRow = 1;

    while (this._ss.getRange("E" + firstRow).getValue() != "" && this._ss.getRange("F" + firstRow).getValue() != "") {
      lastRow++;
      firstRow++;
    }

    // ("------ getValueLoc Fn for " + value)

    for (let i = 2; i < lastRow; i++) {
      const cell = "C" + i;

      if (this._ss.getRange(cell).getValue() == this._name) {
        // ("getValueLoc Fn: " + cell)
        return cell;
      }
    }

    console.log("Invalid");
    return "Invalid";

  }




}
