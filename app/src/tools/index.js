const fetchApi = () => {};

const candidates = [
  {
    id: 0,
    name: "นายภูวเนศวร์ แย้มวิเศษ",
    image: `${process.env.PUBLIC_URL}/images/candidate/puwaned.jpg`,
    name_en: "puwaned",
  },
  {
    id: 1,
    name: "นายภูวเดช ประทุม",
    image: `${process.env.PUBLIC_URL}/images/candidate/puwadech.jpg`,
    name_en: "puwadech",
  },
  {
    id: 2,
    name: "นายสุวัจน์ ยืมกระโทก",
    image: `${process.env.PUBLIC_URL}/images/candidate/suwat.jpg`,
    name_en: "suwat",
  },
  {
    id: 3,
    name: "นางสาวตรีเนตร น้อยหัวหาด",
    image: `${process.env.PUBLIC_URL}/images/candidate/trinet.jpg`,
    name_en: "trinet",
  },
];

export { candidates, fetchApi };
