function DailySaleAlertToLine() {
  
  ///// สิ่งที่ต้องแก้ไข //////
  var key = "NlUFBX0TmKUHnnbEpa7pUz60tIDDAitBiRw7tiU8K1u";
  var ssID = '1Vamb9XD-L6Ua0jNgwasM8hpLhTKJXO-8VO50Ru8Y0PM';
  var sheetname = "รายงานยอดประจำเดือน";
  //////////////////////

  var url = "https://notify-api.line.me/api/notify";
  var wsData = SpreadsheetApp.openById(ssID).getSheetByName(sheetname);
  var msg = "";

  ///// ข้อความที่ต้องการส่ง //////
  msg = wsData.getRange('N1').getValue()+"\n";
  msg = msg + "💸จำนวนที่ขาย: "+ wsData.getRange('P2').getValue().toLocaleString()+". \n";
  msg = msg + "💰มูลค่ารวม: "+ wsData.getRange('N2').getValue().toLocaleString()+" K.\n";
  msg = msg + "🛢ต้นทืน: "+ wsData.getRange('R2').getValue().toLocaleString()+" K.\n";
  msg = msg + "🎉กำไร: "+ wsData.getRange('S2').getValue().toLocaleString()+" K.\n";
  msg = msg +"\n"; //เวั้นเถว

  msg = msg + "📆ยอดขายทั้งเดือน: "+ wsData.getRange('Y2').getValue().toLocaleString()+" K.\n";
  msg = msg +"\n"; //เวั้นเถว
  msg = msg + "🧧ยอด Cod: "+ wsData.getRange('K2').getValue().toLocaleString()+" K.\n";
  msg = msg + "💰เงินคงเหลือ: "+ wsData.getRange('L2').getValue().toLocaleString()+" K.\n";

  


  //////////////////////

    var jsonData = {
                    "message": msg
            }
    var options =
            {
              "method" : "post",
              "contentType" : "application/x-www-form-urlencoded",
              "payload" : jsonData,
              "headers": {"Authorization": "Bearer " + key}
            };
    var res = UrlFetchApp.fetch(url, options);
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////

function TotalAlertToLine(e) {
  // รายชื่อชีทที่ต้องการดักจับ
  var targetSheets = ["Orders", "รายจ่าย", "Pre New"];
  var activeSheet = e.source.getActiveSheet(); // ชีทที่เกิดการเปลี่ยนแปลง
  var activeSheetName = activeSheet.getName(); // ชื่อของชีท

  // ตรวจสอบว่าชีทที่เปลี่ยนแปลงอยู่ในลิสต์ที่กำหนดหรือไม่
  if (!targetSheets.includes(activeSheetName)) return; // หากไม่ใช่ ให้จบการทำงาน

  ///// สิ่งที่ต้องแก้ไข ////// 
  var key = "NlUFBX0TmKUHnnbEpa7pUz60tIDDAitBiRw7tiU8K1u"; // LINE Notify Token
  var ssID = '1Vamb9XD-L6Ua0jNgwasM8hpLhTKJXO-8VO50Ru8Y0PM'; // Spreadsheet ID
  var sheetname = "รายงานยอดประจำเดือน"; // ชีทที่ต้องการส่งข้อมูล
  ////////////////////////////

  var url = "https://notify-api.line.me/api/notify";
  var wsData = SpreadsheetApp.openById(ssID).getSheetByName(sheetname);
  var msg = "";

  ///// ข้อความที่ต้องการส่ง ////// 
  msg = msg + "💰เงินคงเหลือ: " + wsData.getRange('L2').getValue().toLocaleString() + " K.\n";
  ////////////////////////////

  var jsonData = {
    "message": msg
  };

  var options = {
    "method": "post",
    "contentType": "application/x-www-form-urlencoded",
    "payload": jsonData,
    "headers": { "Authorization": "Bearer " + key }
  };

  UrlFetchApp.fetch(url, options);
}




///////////////////////////////////////////////////////////////////////////////////////


function StockAlertToLine() {
  
  ///// สิ่งที่ต้องแก้ไข //////
  var key = "NlUFBX0TmKUHnnbEpa7pUz60tIDDAitBiRw7tiU8K1u";
  var ssID = "1Vamb9XD-L6Ua0jNgwasM8hpLhTKJXO-8VO50Ru8Y0PM";
  var sheetname = "รายงานสินค้าคงเหลือ V2";
  //////////////////////
  
  var url = "https://notify-api.line.me/api/notify";
  var wsData = SpreadsheetApp.openById(ssID).getSheetByName(sheetname);

  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth() , now.getDate());
  var showDate = DateConvert(today);
  
  wsData.getRange('A3').activate();
  wsData.getSelection().getNextDataRange(SpreadsheetApp.Direction.DOWN).activate();
  var numRow = wsData.getActiveRange().getNumRows();
  var msg = "";


      msg = showDate + "\n" + "🎁🛒ສຶນຄ້າຍັງຄົງເຫຼືອ🛒🎁\n";
      msg = msg +"\n";
      
      for(var i=2; i<numRow+3; i++)
      {
        msg = msg + (i-1) + ". " +wsData.getRange(i,1).getValue()+ ":  " +wsData.getRange(i,2).getValue()+ "\n";
      }

      var jsonData = {
                    "message": msg
            }
          var options =
            {
              "method" : "post",
              "contentType" : "application/x-www-form-urlencoded",
              "payload" : jsonData,
              "headers": {"Authorization": "Bearer " + key}
            };
      var res = UrlFetchApp.fetch(url, options);

  }
///////////////////////////////////////////////////////////////////////////////////////


function DateConvert(date) {         

    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();

    return (dd[1]?dd:"0"+dd[0]) + '.' + (mm[1]?mm:"0"+mm[0]) + '.' + yyyy;
};

///////////////////////////////////////////////////////////////////////////////////////


function doPost(e) {
  var postdata = JSON.parse(e.postData.contents);
  var row = postdata.row;
  var sheet = SpreadsheetApp.getActive().getSheetByName("ชื่อสินค้า");
  var arrpath = sheet.getRange('H'+row).getDisplayValue().split("/");
  var foldername = arrpath[0];
  var filename = arrpath[1];
  var fileid = DriveApp.getFoldersByName(foldername).next().getFilesByName(filename).next().getId();
  var fileurl = "https://drive.google.com/uc?export=view&id="+fileid;
  sheet.getRange('I'+row).setValue(fileurl);
}

