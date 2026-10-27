// Content data for the microsite (resident profiles + floating numbers)
const U = id => `img/${id}.jpg`;

const OVERCOMERS = [
  { days: 2456, name: "Daniel T.",  role: "Head Chef, 38",        quote: "Every morning I wake up is another day I choose freedom.",   img: U("1542207342-464d0c94c21c"), cell: "c0 r0 w2 h2" },
  { days: 365,  name: "Marcus L.",  role: "Barber, 29",           quote: "One year felt impossible. Then it happened.",                img: U("1576510004509-1fcc964b7927"), cell: "c2 r0" },
  { days: 1825, name: "Raymond K.", role: "Carpenter, 44",        quote: "I built furniture. Then I learned to build a life.",         img: U("1635214961752-160496fd3145"), cell: "c3 r0" },
  { days: 4380, name: "Alvin S.",   role: "Social Worker, 52",    quote: "Twelve years. I still count every single one.",              img: U("1498490724692-0de80895f8d1"), cell: "c2 r1 h2" },
  { days: 730,  name: "Jason W.",   role: "Deliveryman, 31",      quote: "Two years. Every package I deliver is a gift to myself.",    img: U("1513350027966-f016e1adcecd"), cell: "c0 r2 w2" },
  { days: 1095, name: "Ben H.",     role: "Kitchen Staff, 36",    quote: "Three years ago I had nothing. Now I have purpose.",         img: U("1676733591527-bacc1adb0d78"), cell: "c3 r2" },
  { days: 547,  name: "Wei Liang",  role: "Student, 24",          quote: "I am not my past. I proved that every single day.",          img: U("1507003211169-0a1dd7228f2d"), cell: "c0 r3" },
  { days: 3285, name: "Henry C.",   role: "Restaurant Owner, 47", quote: "Nine years on. Now I give others the same chance.",          img: U("1500648767791-00dcc994a43e"), cell: "c1 r3 w2" },
  { days: 182,  name: "Kelvin P.",  role: "Factory Worker, 27",   quote: "Six months. God is not finished with me yet.",               img: U("1506794778202-cad84cf45f1d"), cell: "c3 r3 h2" },
  { days: 2190, name: "Samuel T.",  role: "Security Officer, 41", quote: "I used to run from authority. Now I protect my community.",  img: U("1463453091185-61582044d556"), cell: "c0 r4" },
  { days: 912,  name: "David O.",   role: "Plumber, 33",          quote: "Two and a half years fixing pipes. And fixing myself.",      img: U("1472099645785-5658abf4ff4e"), cell: "c1 r4" },
  { days: 1460, name: "Ernest G.",  role: "Driver, 39",           quote: "Four years on the right road. Not looking back.",            img: U("1534958532666-e04de78db3b4"), cell: "c2 r4" },
];

// Floating numbers in the hero (order = page text order). x = vw*0.55 on a 350vw canvas, y = %, fs = rem.
const FLOATING = [
  [365, 3, 20, 3.2, .12], [2456, 12, 70, 5.2, .16], [1825, 0, 38, 4.2, .14], [4380, 22, 88, 5, .15],
  [730, 28, 14, 3.4, .11], [1095, 72, 68, 4.3, .16], [547, 87, 27, 3.2, .11], [3285, 103, 78, 4, .14],
  [182, 116, 6, 2.8, .1], [2190, 132, 88, 3.6, .13], [912, 147, 18, 3.1, .11], [1460, 160, 70, 3.8, .15],
  [1240, 176, 29, 4.1, .13], [2856, 190, 81, 3.2, .11], [93, 207, 10, 5, .16], [1678, 221, 74, 3.7, .12],
  [421, 235, 24, 3, .1], [3065, 252, 86, 4.5, .15], [804, 266, 7, 3.6, .12], [1987, 281, 69, 4.2, .14],
  [275, 295, 20, 3, .11], [3520, 309, 84, 4.4, .15], [118, 322, 9, 2.8, .1], [2334, 337, 72, 3.9, .13],
  [679, 351, 26, 3.2, .11], [1542, 366, 80, 3.8, .13], [398, 380, 12, 3, .1], [2711, 395, 71, 4.1, .14],
  [1045, 410, 22, 3.5, .12], [326, 424, 85, 3, .1], [1888, 439, 15, 3.9, .13], [4520, 453, 68, 4.8, .16],
  [756, 468, 30, 3.2, .11], [213, 482, 82, 2.8, .1], [1347, 497, 11, 3.8, .13], [2999, 511, 75, 4.3, .15],
  [582, 526, 25, 3.1, .11], [1724, 540, 87, 3.7, .12], [943, 555, 14, 3.3, .11], [3611, 569, 73, 4.2, .14],
];
