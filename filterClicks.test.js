const filterClicks = require("./filterClicksHelper");

// test for expensive ip in one hour
test("expensive IP in one hour", () => {
  const clicks = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:02:58", amount: 7.0 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 01:52:32", amount: 5.5 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
  ];
  const results = filterClicks(clicks);
  expect(results).toEqual([
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 7.25 },
  ]);
});

// test for same clicks for same ip
test("same expensive clicks for same IP", () => {
  const clicks = [
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:17:11", amount: 5.5 },
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:13:11", amount: 6.5 },
  ];
  const results = filterClicks(clicks);
  expect(results).toEqual([
    { ip: "11.11.11.11", timestamp: "3/11/2020 02:12:32", amount: 6.5 },
  ]);
});

// test more than 10 click for same
test("more than 10 clicks for same IP", () => {
  const clicks = [
    { ip: "33.33.33.33", timestamp: "3/11/2020 02:13:54", amount: 7.75 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 05:02:45", amount: 11.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 02:02:58", amount: 7.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 13:02:21", amount: 6.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 08:02:22", amount: 3.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 10:02:54", amount: 5.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 11:05:35", amount: 10.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 07:01:53", amount: 1.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 16:02:36", amount: 8.0 },
    { ip: "55.55.55.55", timestamp: "3/11/2020 02:12:32", amount: 7.5 },
    { ip: "55.55.55.55", timestamp: "3/11/2020 02:12:32", amount: 7.5 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 06:35:12", amount: 2.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 07:03:15", amount: 12.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 09:41:50", amount: 4.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 06:35:12", amount: 2.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 07:03:15", amount: 12.0 },
    { ip: "22.22.22.22", timestamp: "3/11/2020 09:41:50", amount: 4.0 },
  ];
  const results = filterClicks(clicks);
  expect(results).toEqual([
    { ip: "55.55.55.55", timestamp: "3/11/2020 02:12:32", amount: 7.5 },
    { ip: "33.33.33.33", timestamp: "3/11/2020 02:13:54", amount: 7.75 },
  ]);
});
