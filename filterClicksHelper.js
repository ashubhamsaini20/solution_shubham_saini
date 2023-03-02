function filterClicksFunc(clicks) {
  // sorting clicks on the bases of time
  clicks.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  // creating map & set
  const clickMapObj = new Map();
  const ipCount = new Map();
  const moreThenCount = new Set();

  // iterating through clicks to get click according to condition
  for (const click of clicks) {
    let { ip, amount, timestamp } = click;
    timestamp = new Date(timestamp).getTime();
    if (ipCount.get(ip) >= 10) {
      moreThenCount.add(ip);
      continue;
    }

    const startHour = new Date(Math.floor(timestamp / 3600000) * 3600000);
    const key = ip + "-" + startHour.getTime();
    if (!clickMapObj.has(key) || amount > clickMapObj.get(key).amount) {
      clickMapObj.set(key, click);
    }
    ipCount.set(ip, (ipCount.get(ip) || 0) + 1);
  }

  // return unique click
  return Array.from(clickMapObj.values()).filter(
    (item) => !moreThenCount.has(item.ip)
  );
}

module.exports = filterClicksFunc;
