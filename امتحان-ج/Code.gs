var HEADERS = ["الوقت", "الاسم", "الشعبة", "العلامة", "من", "النسبة", "عدد الأخطاء", "السياسات", "التهديدات", "الأثر", "الحماية", "الأخلاق", "القانون", "المعايير", "الإدارة", "الحالة والسياسة", "لماذا وُضعت السياسة"];
var SECTIONS = HEADERS.slice(7);

function doPost(e) {
  var data = {};
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    data = {};
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getName().indexOf("Untitled") === 0) ss.rename("نتائج امتحان الهدف ج");
  var sheet = ss.getSheetByName("النتائج");
  if (!sheet) {
    sheet = ss.getSheets()[0];
    sheet.setName("النتائج");
  }
  if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== HEADERS[0]) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  var sections = data.sections || {};
  var row = [
    new Date(),
    data.name || "",
    data.group || "",
    Number(data.correct) || 0,
    Number(data.total) || 0,
    Number(data.percent) || 0,
    Number(data.wrong) || 0
  ];
  SECTIONS.forEach(function (name) {
    var part = sections[name] || {};
    row.push((Number(part.correct) || 0) + "/" + (Number(part.total) || 0));
  });
  sheet.appendRow(row);
  ensureSummary(ss);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput("ready");
}

function ensureSummary(ss) {
  var summary = ss.getSheetByName("الملخص");
  if (!summary) summary = ss.insertSheet("الملخص");
  var src = "'النتائج'!";
  var empty = String.fromCharCode(34) + String.fromCharCode(34);
  summary.getRange("A1").setValue("عدد الطلاب");
  summary.getRange("B1").setFormula("=COUNTA(" + src + "B2:B)");
  summary.getRange("A2").setValue("متوسط العلامة");
  summary.getRange("B2").setFormula("=IF(COUNTA(" + src + "D2:D)=0," + empty + ",AVERAGE(" + src + "D2:D))");
  summary.getRange("A3").setValue("متوسط النسبة");
  summary.getRange("B3").setFormula("=IF(COUNTA(" + src + "F2:F)=0," + empty + ",AVERAGE(" + src + "F2:F))");
}
