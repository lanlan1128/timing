var schedule = require("node-schedule");
var cp = require("child_process");
var path = require("path");
var fs = require("fs");
var { convertTimeToSecond } = require("./utils/time");
var config = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "./assets/setting.json"))
);
// var config = require("./assets/setting");
var {
  dayOfWeek = [],
  hour = [],
  minute,
  date = [],
  month = [],
  delay,
  title = "",
  content = "",
} = config || {};

// 处理hour
if (minute == 0) {
  --hour[0][0];
  --hour[0][1];
  --hour[1][0];
  --hour[1][1];
}

function timingBreak() {
  var rule = new schedule.RecurrenceRule();
  // rule.dayOfWeek = [new schedule.Range(0, 6)];
  // rule.hour = [new schedule.Range(10, 11), new schedule.Range(13, 18)];
  // rule.minute = [new schedule.Range(1, 59)];
  // rule.date = [new schedule.Range(1, 31)];
  // rule.month = [new schedule.Range(0, 11)];
  rule.dayOfWeek = [new schedule.Range(dayOfWeek[0], dayOfWeek[1])];
  rule.hour = [
    new schedule.Range(hour[0][0], hour[0][1]),
    new schedule.Range(hour[1][0], hour[1][1]),
  ];
  if (typeof minute === "object") {
    rule.minute = [new schedule.Range(minute[0][0], minute[0][1])];
  } else {
    rule.minute = minute;
  }
  rule.date = [new schedule.Range(date[0][0], date[0][1])];
  rule.month = [new schedule.Range(month[0][0], month[0][1])];

  schedule.scheduleJob(rule, function () {
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
      'mshta "javascript:var wshYesNoDialog = 0;  var wshExclamationMark = 48; var vbSystemModal = 4096; var content = ' +
        JSON.stringify(content) +
        '; var sh=new ActiveXObject("WScript.Shell"); sh.Popup(content, ' +
        convertTimeToSecond(delay) +
        ", " +
        JSON.stringify(title) +
        ', wshYesNoDialog + vbSystemModal + wshExclamationMark);close()"',
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
