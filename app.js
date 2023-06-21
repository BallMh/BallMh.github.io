document.getElementById("calcBtn").addEventListener("click", calculate);
document.getElementById("firstNumberInput").defaultValue = 1;
document.getElementById("numOfDocsInput").defaultValue = 1000;
document.getElementById("howManyUpInput").defaultValue = 12;
document.getElementById("IncrementInput").defaultValue = 1;
document.getElementById("collateByInput").defaultValue = 50;
document.getElementById("placeholderInput").defaultValue = "Extra";
document.getElementById("PaddingInput").defaultValue = 0;
document.getElementById("NumOfPaddingInput").defaultValue = 4;
document.getElementById("firstStringInput").defaultValue = "Sequence";
const copyBtn = document.getElementById("copyBtn");
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
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
  let collateCheckBox = document.getElementById("collateCheckChecked");
  let collateParentDiv = document.getElementById("collateParentDiv");
  if (collateCheckBox.checked == false) {
    collateParentDiv.style.display = "none";
  } else {
    collateParentDiv.style.display = "inline-block";
  }
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

function resultsDisplay() {
  resultsInfo.style.display = "none";
  numOfResults.style.display = "inline-block";
  copyBtn.style.display = "inline-block";
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

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function calculate() {
  lv1 = [];
  remaininglv1s = [];
  let collateCheckBox = document.getElementById("collateCheckChecked");
  const startingString = document.getElementById("firstStringInput").value;
  const docsNeeded = document.getElementById("numOfDocsInput").value;
  const starter = parseInt(document.getElementById("firstNumberInput").value);
  const docsPersheet = document.getElementById("howManyUpInput").value;
  const incrementBy = parseInt(document.getElementById("IncrementInput").value);
  let sheetsInEachStack = "";
  if (collateCheckBox.checked == false) {
    sheetsInEachStack = parseInt(Math.ceil(docsNeeded / docsPersheet));
  } else {
    sheetsInEachStack = parseInt(
      document.getElementById("collateByInput").value
    );
  }
  const placeholderInput = document.getElementById("placeholderInput");
  const resultsArea = document.getElementById("resultsArea");
  const placeholder = placeholderInput.value;
  const prefix = document.getElementById("PrefixInput").value;
  const suffix = document.getElementById("SuffixInput").value;
  const Padding = document.getElementById("PaddingInput").value;
  const NumOfPadding = document.getElementById("NumOfPaddingInput").value;
  let separator = "";
  let firstExtraNumber = "";

  function firstExtra() {
    if (incrementBy > 0) {
      firstExtraNumber = starter + docsNeeded * incrementBy;
    } else if (incrementBy < 0) {
      firstExtraNumber = starter - docsNeeded * -1 * incrementBy;
    }
    console.log(firstExtraNumber);
  }

  firstExtra();
  ///////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
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
  separatorChoser();

  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const docsInEachStack = sheetsInEachStack * docsPersheet;
  let stacksRequired = "";
  if (sheetsInEachStack >= docsNeeded / docsPersheet) {
    stacksRequired = Math.ceil(docsNeeded / docsInEachStack);
  } else {
    stacksRequired = Math.floor(docsNeeded / docsInEachStack);
  }
  const differenceFromNeighbor = sheetsInEachStack * incrementBy;
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  for (let i = 0; i < stacksRequired; i++) {
    lv1.push(starter + docsInEachStack * i * incrementBy);
  }

  let lv1Calcd = [];
  let lv2Calcd = [];
  let RemaindersCalcd = [];

  lv1.forEach(calclv1);

  function calclv1(params) {
    for (let j = 0; j < sheetsInEachStack; j++) {
      lv1Calcd.push(params + j * incrementBy);
    }
  }

  lv1Calcd.forEach(calclv2);

  function calclv2(params) {
    for (let k = 0; k < docsPersheet; k++) {
      lv2Calcd.push(params + k * differenceFromNeighbor);
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const fullStacks = Math.floor(docsNeeded / docsInEachStack);
  let numberOfRemainingValues = "";
  if (sheetsInEachStack >= docsNeeded / docsPersheet) {
    numberOfRemainingValues = 0;
  } else {
    numberOfRemainingValues = docsNeeded % docsInEachStack;
  }

  const sheetsNeededForRemainingValues = Math.ceil(
    numberOfRemainingValues / docsPersheet
  );
  // const lastValueOfFulls = fullStacks * sheetsInEachStack * docsPersheet;
  const firstValueOfRemainingValues =
    lv2Calcd[lv2Calcd.length - 1] + incrementBy;
  const differenceFromNeighboringRemainder =
    sheetsNeededForRemainingValues * incrementBy;
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  for (let l = 0; l < sheetsNeededForRemainingValues; l++) {
    remaininglv1s.push(firstValueOfRemainingValues + l * incrementBy);
  }

  remaininglv1s.forEach(calcRemainders);

  function calcRemainders(params) {
    for (let m = 0; m < docsPersheet; m++) {
      RemaindersCalcd.push(params + m * differenceFromNeighboringRemainder);
    }
  }
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  const combined = lv2Calcd.concat(RemaindersCalcd);
  let paddedElements = [];
  let fixedNegPads = [];

  negPadVal = parseInt(NumOfPadding) + 1;
  function addPaddingToCombined(params) {
    for (let n = 0; n < combined.length; n++) {
      if (params[n] < 0) {
        paddedElements.push(params[n].toString().padStart(negPadVal, Padding));
      } else {
        paddedElements.push(
          params[n].toString().padStart(NumOfPadding, Padding)
        );
      }
    }
  }

  addPaddingToCombined(combined);

  function fixNegPad(paddedArray) {
    paddedArray.map(function (numNeg) {
      if (numNeg.includes("-")) {
        fixedNegPads.push("-" + numNeg.replace("-", ""));
        // return num;
      } else {
        fixedNegPads.push(numNeg);
      }
    });
  }

  function createCleaned(fixedNegPads, firstExtraNumber, placeholder) {
    return fixedNegPads.map(function (num) {
      if (num >= firstExtraNumber && flexCheckChecked.checked == true) {
        return placeholder;
      } else {
        return num;
      }
    });
  }

  function createCleanedForNeg(fixedNegPads, firstExtraNumber, placeholder) {
    return fixedNegPads.map(function (num) {
      if (num <= firstExtraNumber && flexCheckChecked.checked == true) {
        return placeholder;
      } else {
        return num;
      }
    });
  }

  fixNegPad(paddedElements);

  let cleaned = createCleaned(fixedNegPads, firstExtraNumber, placeholder);
  let cleanedForNeg = createCleanedForNeg(
    fixedNegPads,
    firstExtraNumber,
    placeholder
  );

  function resultsInfo() {
    let showNumbers = cleaned.length;
    let showSheets = cleaned.length / docsPersheet;
    let showExtras = cleaned.length - docsNeeded;
    document.getElementById("showNumbers").innerHTML = showNumbers;
    document.getElementById("showSheets").innerHTML = showSheets;
    document.getElementById("showExtras").innerHTML = showExtras;
  }

  function erasePreviuos() {
    if (resultsArea.value != null) {
      resultsArea.value = null;
    }
  }
  function write() {
    resultsArea.value = startingString + separator;
    for (let q = 0; q < cleaned.length; q++) {
      if (incrementBy > 0) {
        resultsArea.value += prefix + cleaned[q] + suffix + separator;
      } else {
        resultsArea.value += prefix + cleanedForNeg[q] + suffix + separator;
      }
    }
  }
  erasePreviuos();
  resultsInfo();
  write();
  removeFirstSpace();
  removeLastSpace();
  resultsDisplay();
}
