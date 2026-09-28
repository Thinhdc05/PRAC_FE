const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function getProfile() { await sleep(1000); return "User Thịnh"; }
async function getOrders() { await sleep(1000); return ["Đơn hàng 1", "Đơn hàng 2"]; }
async function getNotifications() { await sleep(1000); return ["Thông báo mới"]; }
// Cách 1: Newbie viết tuần tự
async function loadDataWaterfall() {
  console.time("Cách 1 (Tuần tự)");
  const profile = await getProfile();
  const orders = await getOrders();
  const notifs = await getNotifications();
  console.timeEnd("Cách 1 (Tuần tự)");
}
// Cách 2: Senior viết song song
async function loadDataParallel() {
  console.time("Cách 2 (Song song)");
  const [profile, orders, notifs] = await Promise.all([
    getProfile(),
    getOrders(),
    getNotifications()
  ]);
  console.timeEnd("Cách 2 (Song song)");
}
// Chạy thử nghiệm:
async function run() {
  await testFetchBug();
  await loadDataWaterfall();
  await loadDataParallel();
}
run();
