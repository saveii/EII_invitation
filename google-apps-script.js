/**
 * ====================================================================
 * GOOGLE APPS SCRIPT FOR E-INVITATION RSVP SYSTEM
 * របៀបប្រើប្រាស់៖
 * 1. បង្កើត Google Sheets ថ្មីមួយ (ឧ. "Wedding_RSVP_List")
 * 2. នៅលើ Menu ជ្រើសរើស: Extensions (ផ្នែកបន្ថែម) > Apps Script
 * 3. លុបកូដចាស់ចោល ហើយចម្លង (Copy-Paste) កូដខាងក្រោមនេះចូល
 * 4. ចុច Save (រក្សាទុក)
 * 5. ចុចប៊ូតុង "Deploy" (ដាក់ពង្រាយ) > "New deployment"
 * 6. ត្រង់ "Select type" ចុចលើរូបកង់ Settings រើសយក "Web app"
 * 7. កំណត់ "Who has access" ទៅជា "Anyone" (សំខាន់បំផុត!)
 * 8. ចុច Deploy > Copy យក Web App URL ទៅដាក់ក្នុង js/config.js ត្រង់ rsvpEndpoint
 * ====================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // បង្កើត Header ប្រសិនបើសន្លឹកកិច្ចការទទេ
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "កាលបរិច្ឆេទ (Timestamp)",
        "ឈ្មោះភ្ញៀវ (Guest Name)",
        "លេខទូរស័ព្ទ / Telegram",
        "ការចូលរួម (Status)",
        "ចំនួនភ្ញៀវ (Pax)",
        "ពាក្យជូនពរ (Wishes)"
      ]);
      // តុបតែង Header
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#c59b27").setFontColor("#ffffff");
    }

    var data = JSON.parse(e.postData.contents);
    
    var timestamp = new Date();
    var name = data.name || "មិនស្គាល់ឈ្មោះ";
    var phone = data.phone || "-";
    var status = data.status === "attending" ? "ចូលរួម (Attending)" : "មិនបានចូលរួម (Declined)";
    var count = data.guests || 1;
    var message = data.message || "-";

    sheet.appendRow([timestamp, name, "'" + phone, status, count, message]);

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      message: "Data recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("E-Invitation RSVP Endpoint is ACTIVE!").setMimeType(ContentService.MimeType.TEXT);
}
