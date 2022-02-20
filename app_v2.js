let resultsInfo = document.getElementById("resultsInfo");
let numOfResults = document.getElementById("numOfResults");
let copyBtn = document.getElementById("copyBtn");
let kofi_btn = document.getElementById("ko-fi_btn");
let separator = "";
let collateCheckBox = document.getElementById("collateCheckBox");
let collateField = document.getElementById("NumOfCollateInput");

document.getElementById("calcBtn").addEventListener("click", calculate);
document.getElementById("firstNumberInput").defaultValue = 1;
document.getElementById("firstStringInput").defaultValue = "Numbers";
document.getElementById("numOfDocsInput").defaultValue = 90;
document.getElementById("howManyUpInput").defaultValue = 12;
// document.getElementById("NumOfCollateInput").defaultValue = 8;
document.getElementById("IncrementInput").defaultValue = 1;
document.getElementById("PaddingInput").defaultValue = 0;
document.getElementById("NumOfPaddingInput").defaultValue = 3;
document.getElementById("placeholderInput").defaultValue = "Extra";

function resultsDisplay() {
  resultsInfo.style.display = "none";
  numOfResults.style.display = "inline-block";
  copyBtn.style.display = "inline-block";
}

function hideResults() {
  resultsInfo.style.display = "inline-block";
  numOfResults.style.display = "none";
  copyBtn.style.display = "none";
}

function placeholderDisplay() {
  let checkBox = document.getElementById("flexCheckChecked");
  let placeholderParentDiv = document.getElementById("placeholderParentDiv");
  if (checkBox.checked == false) {
    placeholderParentDiv.style.display = "none";
  } else {
    placeholderParentDiv.style.display = "inline-block";
  }
}

function collateDisplay() {
  let collateParentDiv = document.getElementById("collateParentDiv");
  if (collateCheckBox.checked == false) {
    collateParentDiv.style.display = "none";
  } else {
    collateParentDiv.style.display = "inline-block";
  }
}

let docsForColl = document.getElementById("numOfDocsInput");
let upForColl = document.getElementById("howManyUpInput");

function collateFill() {
  collateField.value = Math.ceil(docsForColl.value/upForColl.value);
}

function error(startingNumber, documentsWanted, upCount, incrementAmount, collateCount) {
  if (
    isNaN(startingNumber) ||
    isNaN(documentsWanted) ||
    isNaN(upCount) ||
    isNaN(incrementAmount)
  ) {
    hideResults();
    resultsArea.value = null;
    alert("Please fill in all required fields!");
  } else if (incrementAmount <= 0 || documentsWanted <= 0 || upCount <= 0) {
    hideResults();
    resultsArea.value = null;
    alert("can't be 0 or Negative!");
  } else if (startingNumber < 0) {
    hideResults();
    resultsArea.value = null;
    alert("Starting Number can't be Negative!");
  
  } else if (collateCount < Math.ceil(documentsWanted / upCount) && collateCheckBox == true) {
    hideResults();
    resultsArea.value = null;
    alert("Collate amount can't less than the number of sheets!");
  } else if (documentsWanted < upCount){
    hideResults();
    resultsArea.value = null;
    alert("You only need one sheet!")
    return false;   
  } else if (collateCheckBox.checked == true && collateCount<Math.ceil(documentsWanted / upCount)) {
    hideResults();
    resultsArea.value = null;
    alert("The relation between the number of resulting sheets and the Collate value doesn't make any sense!");
    return false;  }
}

function removeFirstSpace() {
  var cleanedFirst = document.getElementById("resultsArea").value;
  cleanedFirst = cleanedFirst.replace(/^\s/, "");
  resultsArea.value = cleanedFirst;
}
function removeLastSpace() {
  var cleaned = document.getElementById("resultsArea").value;
  cleaned = cleaned.replace(/\s$/, "");
  resultsArea.value = cleaned;
}

function copyFunction() {
  if (
    (resultsArea.value == null, resultsArea.value == "") |
    (resultsArea.value == /\s/)
  ) {
    return false;
  }
  copying();
}

function copying() {
  let copyText = document.getElementById("resultsArea");
  copyText.select();
  document.execCommand("copy");
  alert("Copied!");
}

function separatorChoser() {
  let separatorChoice = document.getElementById("separatorChoice").value;
  switch (separatorChoice) {
    case "New Line":
      separator = String.fromCharCode(13, 10);
      break;
    case "Comma":
      separator = String.fromCharCode(44);
      break;
    case "Semicolon":
      separator = String.fromCharCode(59);
      break;
    case "Space":
      separator = String.fromCharCode(32);
  }
}

function validatePHInput(placeholderInput) {
  if (placeholderInput.value == "" && flexCheckChecked.checked == true) {
    hideResults();
    resultsArea.value = null;
    alert("Specify Placeholder!");
    return false;
  } else {
    resultsDisplay();
  }
}

function createCleaned(rawStacks, biggestNumber, placeholder) {
  return rawStacks.map(function (num) {
    if (num >= biggestNumber && flexCheckChecked.checked == true) {
      return placeholder;
    } else {
      return num;
    }
  });
}

//creating rawStacks by incrementing first positions
function CreateRawStack(
  valuesInFirstPos,
  upCount,
  numberOfSheets,
  incrementAmount,
  rawStacks,
  startingNumber,
  b,
  documentsWanted
) {
  valuesInFirstPos.forEach((item) => {
    for (
      let j = 0;
      j <= upCount * numberOfSheets * incrementAmount - numberOfSheets;
      j += incrementAmount * numberOfSheets
    ) {
      rawStacks.push(startingNumber + item + j);
      b++;
      if (b >= documentsWanted * numberOfSheets) {
        break;
      }
    }
  });
  return b;
}

//calculating values in the first positions
function CountingFirstPosS(numberOfSheets, incrementAmount) {
  let valuesInFirstPos = [];
  for (let i = 0; i < numberOfSheets * incrementAmount; i += incrementAmount) {
    valuesInFirstPos.push(i);
  }
  return valuesInFirstPos;
}

function calculate(e) {
    //Input values
    const starting = document.getElementById("firstNumberInput");
    const startingString = document.getElementById("firstStringInput").value;
    const startingNumber = parseInt(starting.value);
    const documents = document.getElementById("numOfDocsInput");
    let documentsWanted = parseInt(documents.value);
    const collate = document.getElementById("NumOfCollateInput")
    const collateCount = parseInt(collate.value);
    const up = document.getElementById("howManyUpInput");
    const upCount = parseInt(up.value);
    const increment = document.getElementById("IncrementInput");
    const incrementAmount = parseInt(increment.value);
    const placeholderInput = document.getElementById("placeholderInput");
    const prefix = document.getElementById("PrefixInput").value;
    const suffix = document.getElementById("SuffixInput").value;
    const Padding = document.getElementById("PaddingInput").value;
    const NumOfPadding = document.getElementById("NumOfPaddingInput").value;
    const resultsArea = document.getElementById("resultsArea");

  //calculate from userinput

  let numberOfSheets = [];
  
  if (collateCheckBox.checked == true) {
    numberOfSheets = Math.ceil(documentsWanted / upCount)+(collateCount-(Math.ceil(documentsWanted / upCount)));;
  } else {
    numberOfSheets = Math.ceil(documentsWanted / upCount);
  }
   //~8  

  let valuesInFirstPos = CountingFirstPosS(numberOfSheets, incrementAmount);
  let biggestNumber = startingNumber + incrementAmount * documentsWanted;

  let placeholder = placeholderInput.value;

  let b = "";
  let rawStacks = [];
  b = CreateRawStack(
    valuesInFirstPos,
    upCount,
    numberOfSheets,
    incrementAmount,
    rawStacks,
    startingNumber,
    b,
    documentsWanted
  );

  let cleaned = createCleaned(rawStacks, biggestNumber, placeholder);

  let reversed = [];
  function reverseArray(cleaned) {
    for (let i = cleaned.length - 1; i >= 0; i--) reversed.push(cleaned[i]);
    return reversed;
  }

  function resultsInfo() {
    let showNumbers = cleaned.length;
    let showExtras = cleaned.length - documentsWanted;
    document.getElementById("showNumbers").innerHTML = showNumbers;
    document.getElementById("showExtras").innerHTML = showExtras;
  }

  let cleanedString = "";
  let reversedString = "";

  function write() {

    if (document.getElementById("up").checked == true) {
      for (let p = 0; p < cleaned.length; p++) {
        if (cleaned[p] !== placeholder || isNaN(placeholder) !== true) {
          cleanedString +=
            prefix +
            cleaned[p].toString().padStart(NumOfPadding, Padding) +
            suffix +
            separator;
        } else if (isNaN(placeholder) == true) {
          cleanedString += cleaned[p].toString() + separator;
        }
      }
      if (startingString) {
        let resultsWillBe = startingString + separator + cleanedString;
        let results = resultsWillBe.substring(0, resultsWillBe.length - 1);
        resultsArea.value = results;
      } else {
        let resultsWillBe = startingString + separator + cleanedString;
        let results = resultsWillBe.substring(1, resultsWillBe.length - 1);
        resultsArea.value = results;
      }
    } else {
      for (let p = 0; p < reversed.length; p++) {
        if (reversed[p] !== placeholder || isNaN(placeholder) !== true) {
          reversedString +=
            prefix +
            reversed[p].toString().padStart(NumOfPadding, Padding) +
            suffix +
            separator;
        } else if (isNaN(placeholder) == true) {
          reversedString += reversed[p].toString() + separator;
        }
      }
      if (startingString) {
        let resultsWillBe = startingString + separator + reversedString;
        let results = resultsWillBe.substring(0, resultsWillBe.length - 1);
        resultsArea.value = results;
      } else {
        let resultsWillBe = startingString + separator + reversedString;
        let results = resultsWillBe.substring(1, resultsWillBe.length - 1);
        resultsArea.value = results;
      }
    }

  }
  
  reverseArray(cleaned);
  separatorChoser();
  write();
  resultsInfo();
  validatePHInput(placeholderInput);
  error(startingNumber, documentsWanted, upCount, incrementAmount, collateCount, numberOfSheets);
  removeFirstSpace();
  removeLastSpace();
  
  e.preventDefault();

}
