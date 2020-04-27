var schedule = require("node-schedule");
var cp = require("child_process");
var path = require("path");
var fs = require("fs");
var config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "./assets/setting.json"))
);
var { hour = [], minute = [], title = "", content = "" } = config || {};
var startTime = new Date();

function timingBreak() {
  var rule = new schedule.RecurrenceRule();
  // rule.dayOfWeek = [new schedule.Range(0, 6)];
  // rule.hour = [new schedule.Range(10, 11), new schedule.Range(13, 18)];
  // rule.minute = [new schedule.Range(1, 59)];
  // rule.date = [new schedule.Range(1, 31)];
  // rule.month = [new schedule.Range(0, 11)];
  rule.hour = [new schedule.Range(0, 23)];
  if (typeof minute === "object") {
    rule.minute = [new schedule.Range(minute[0][0], minute[0][1])];
  } else {
    rule.minute = minute;
  }

  var j = schedule.scheduleJob(rule, function () {
    if (startTime.toDateString() !== new Date().toDateString()) {
      j && j.cancel();
    }
    // exp1: 调用vb,此办法没办法实现弹出内容的换行
    // var vbsPath = path.join(process.cwd(), "./assets/message.vbs");
    // cp.exec(
    //   "cscript.exe " +
    //     vbsPath +
    //     ` ${JSON.stringify(title)} ${JSON.stringify(content)}`,
    //   function (err, stdout, stderr) {
    //     if (err) {
    //       fs.writeFileSync("log.log", err.toString());
    //     }
    //   }
    // );

    // exp2: ActiveXObject示例
    cp.exec(
      'mshta "javascript:var wshYesNoDialog = 0; var wshQuestionMark = 64; var vbSystemModal = 4096; var content = ' +
        JSON.stringify(content) +
        '; var sh=new ActiveXObject("WScript.Shell"); sh.Popup(content, 5, ' +
        JSON.stringify(title) +
        ', wshYesNoDialog + vbSystemModal + wshQuestionMark);close()"',
      function (err, stdout, stderr) {
        if (err) {
          fs.writeFileSync("log.log", err.toString());
        }
      }
    );
  });
}

(function initApp() {
  console.log("定时闹钟已开启！");
  timingBreak();
})();
