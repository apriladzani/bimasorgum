import { Recipe } from '../types';

/**
 * Konten statis modul edukasi "Belajar". Angka waktu dan takaran adalah
 * perkiraan umum untuk dapur rumahan, bukan hasil dari backend RAG.
 */

export interface ProcessingStep {
  title: string;
  instruction: string;
  duration?: string;
  tip?: string;
}

export interface SorghumForm {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  level: 'Pemula' | 'Menengah' | 'Lanjutan';
  totalTime: string;
  usedFor: string[];
  steps: ProcessingStep[];
  storage: string;
  warning?: string;
}

export const SORGHUM_FORMS: SorghumForm[] = [
  {
    id: 'beras',
    name: 'Beras Sorgum',
    tagline: 'Biji sosoh, bahan dasar hampir semua olahan.',
    icon: 'grain',
    level: 'Pemula',
    totalTime: '8–12 jam (termasuk rendam)',
    usedFor: ['Nasi', 'Bubur', 'Salad', 'Risotto'],
    steps: [
      {
        title: 'Sortir dan tampi',
        instruction: 'Buang kerikil, biji rusak, dan kotoran. Tampi agar sekam ringan terpisah.',
        duration: '10 menit',
      },
      {
        title: 'Sosoh kulit luar',
        instruction: 'Kikis kulit luar dengan mesin penyosoh. Di rumah, cara termudah adalah membeli sorgum yang sudah disosoh.',
        tip: 'Kulit luar mengandung tanin yang membuat rasa sepat. Warna yang lebih terang biasanya berarti lebih banyak kulit yang terkikis.',
      },
      {
        title: 'Cuci sampai bening',
        instruction: 'Cuci 3–4 kali sambil diremas ringan sampai air tidak lagi keruh.',
        duration: '5 menit',
      },
      {
        title: 'Rendam',
        instruction: 'Rendam dalam air bersih dengan permukaan air 3 cm di atas biji. Ganti air sekali di tengah waktu rendam.',
        duration: '8–12 jam',
        tip: 'Rendam di kulkas kalau dapur panas agar tidak berbau asam.',
      },
    ],
    storage: 'Kering: wadah kedap di tempat sejuk, hingga 6 bulan. Sudah direndam: segera masak, atau kulkas maksimal 1 hari.',
  },
  {
    id: 'nasi',
    name: 'Nasi Sorgum',
    tagline: 'Pengganti nasi yang pulen dan sedikit kenyal.',
    icon: 'rice_bowl',
    level: 'Pemula',
    totalTime: '45–60 menit setelah rendam',
    usedFor: ['Nasi goreng', 'Nasi bowl', 'Makanan bekal'],
    steps: [
      {
        title: 'Takar dan tiriskan',
        instruction: 'Tiriskan beras sorgum yang sudah direndam. Takar air 1 : 2,5 terhadap volume sorgum.',
        duration: '2 menit',
      },
      {
        title: 'Rebus',
        instruction: 'Didihkan dengan api sedang, lalu kecilkan api dan tutup panci. Masak sampai air terserap dan biji empuk.',
        duration: '30–40 menit',
        tip: 'Rice cooker juga bisa. Jalankan siklus masak dua kali jika biji masih keras.',
      },
      {
        title: 'Diamkan',
        instruction: 'Matikan api, biarkan tertutup agar uap meratakan kematangan.',
        duration: '10 menit',
      },
      {
        title: 'Aduk dan sajikan',
        instruction: 'Aduk dengan garpu agar butirnya terpisah. Sajikan hangat atau dinginkan untuk nasi goreng.',
      },
    ],
    storage: 'Kulkas dalam wadah tertutup 3 hari. Freezer hingga 1 bulan, panaskan sampai benar-benar panas.',
  },
  {
    id: 'tepung',
    name: 'Tepung Sorgum',
    tagline: 'Bebas gluten, untuk kue, roti, dan pengental.',
    icon: 'bakery_dining',
    level: 'Menengah',
    totalTime: '1–2 hari (termasuk rendam dan jemur)',
    usedFor: ['Kue kering', 'Bolu kukus', 'Pancake', 'Roti campuran'],
    steps: [
      {
        title: 'Rendam beras sorgum',
        instruction: 'Rendam beras sorgum yang sudah disosoh, lalu tiriskan sampai tidak menetes.',
        duration: '8–12 jam',
      },
      {
        title: 'Keringkan',
        instruction: 'Jemur di tampah bersih atau keringkan dengan oven 50–60°C. Biji siap digiling kalau mudah patah saat ditekan.',
        duration: '4–6 jam oven, 1–2 hari jemur',
        tip: 'Biji yang masih lembap membuat gilingan menggumpal dan mudah berjamur.',
      },
      {
        title: 'Giling',
        instruction: 'Giling sedikit demi sedikit dengan blender kering atau mesin penepung. Istirahatkan mesin agar tidak terlalu panas.',
        duration: '15 menit',
      },
      {
        title: 'Ayak',
        instruction: 'Ayak dengan ayakan halus (±80 mesh). Giling ulang butiran kasar yang tertahan.',
        duration: '10 menit',
      },
      {
        title: 'Dinginkan dan simpan',
        instruction: 'Biarkan tepung mencapai suhu ruang sebelum dimasukkan ke wadah kedap.',
        duration: '30 menit',
      },
    ],
    storage: 'Wadah kedap di tempat sejuk 2–3 bulan, di kulkas lebih lama. Buang jika tercium tengik atau apek.',
  },
  {
    id: 'popped',
    name: 'Sorgum Sangrai',
    tagline: 'Berondong mungil untuk camilan dan taburan.',
    icon: 'local_fire_department',
    level: 'Pemula',
    totalTime: '10 menit',
    usedFor: ['Camilan', 'Granola', 'Topping sup dan salad'],
    steps: [
      {
        title: 'Siapkan biji kering',
        instruction: 'Pakai biji sorgum utuh yang kering dan tidak direndam. Biji basah tidak akan meletup.',
      },
      {
        title: 'Panaskan wajan',
        instruction: 'Panaskan wajan tebal tanpa minyak dengan api sedang-besar sampai sangat panas.',
        duration: '3 menit',
      },
      {
        title: 'Sangrai bertahap',
        instruction: 'Masukkan 2 sdm biji, tutup wajan, lalu goyangkan terus sampai letupan melambat. Tidak semua biji akan meletup, dan itu normal.',
        duration: '2–3 menit per adonan',
        tip: 'Sangrai sedikit-sedikit agar biji tidak gosong.',
      },
      {
        title: 'Bumbui',
        instruction: 'Pindahkan ke wadah dan bumbui selagi hangat dengan garam, madu, atau kayu manis.',
      },
    ],
    storage: 'Stoples kedap 1 minggu. Sangrai ulang sebentar kalau mulai melempem.',
  },
  {
    id: 'kecambah',
    name: 'Kecambah & Malt',
    tagline: 'Rasa lebih manis, untuk minuman dan tepung malt.',
    icon: 'psychiatry',
    level: 'Lanjutan',
    totalTime: '3–4 hari',
    usedFor: ['Minuman nutrisi', 'Tepung malt', 'Bubur'],
    steps: [
      {
        title: 'Rendam biji utuh',
        instruction: 'Pilih biji utuh yang masih bisa tumbuh, cuci bersih, lalu rendam.',
        duration: '12–24 jam',
      },
      {
        title: 'Kecambahkan',
        instruction: 'Tiriskan dan tebar tipis di wadah berlubang yang ditutup kain bersih. Bilas dua kali sehari.',
        duration: '2–3 hari',
        tip: 'Buang seluruh adonan jika berlendir, berbau, atau berjamur.',
      },
      {
        title: 'Buang akar dan pucuk',
        instruction: 'Keringkan dengan oven suhu rendah, lalu gosok agar akar dan pucuk lepas, kemudian ayak hingga bersih.',
        duration: '4–6 jam',
      },
      {
        title: 'Giling atau masak',
        instruction: 'Giling menjadi tepung malt. Selalu masak hingga matang sebelum dikonsumsi.',
      },
    ],
    storage: 'Tepung malt: wadah kedap di kulkas, hingga 2 bulan.',
    warning: 'Kecambah muda sorgum dapat mengandung senyawa penghasil sianida. Jangan dimakan mentah, selalu buang akar dan pucuknya, lalu masak hingga matang. Tidak disarankan untuk balita.',
  },
];

export interface PrepTool {
  name: string;
  purpose: string;
  icon: string;
}

export const PREP_TOOLS: PrepTool[] = [
  { name: 'Panci berdasar tebal', purpose: 'Panas merata, sorgum tidak gosong di dasar', icon: 'skillet' },
  { name: 'Wadah rendam', purpose: 'Bisa menampung sorgum yang mengembang', icon: 'water_full' },
  { name: 'Saringan halus', purpose: 'Biji sorgum kecil, mudah lolos dari saringan kasar', icon: 'filter_alt' },
  { name: 'Takaran atau timbangan', purpose: 'Rasio air menentukan tekstur akhir', icon: 'scale' },
  { name: 'Blender kering', purpose: 'Untuk membuat tepung dalam jumlah kecil', icon: 'blender' },
  { name: 'Wadah kedap udara', purpose: 'Menjaga sorgum dan tepung dari lembap dan kutu', icon: 'inventory_2' },
];

export interface CookingRatio {
  form: string;
  water: string;
  time: string;
  result: string;
}

export const COOKING_RATIOS: CookingRatio[] = [
  { form: 'Beras sorgum, sudah direndam', water: '1 : 2,5', time: '30–40 menit', result: 'Pulen, kenyal' },
  { form: 'Beras sorgum, tanpa rendam', water: '1 : 3', time: '45–60 menit', result: 'Sedikit lebih keras' },
  { form: 'Biji utuh', water: '1 : 3,5', time: '50–60 menit', result: 'Kenyal, cocok untuk salad' },
  { form: 'Bubur', water: '1 : 6', time: '40–50 menit', result: 'Lembut, mudah ditelan' },
];

export const PREP_CHECKLIST: string[] = [
  'Sorgum direndam semalam, kecuali untuk sangrai',
  'Sorgum dicuci sampai air rendaman bening',
  'Air dan bumbu sudah ditakar',
  'Bahan pendamping dicuci dan dipotong',
  'Tepung diayak sebelum dipakai',
  'Permukaan dapur dan peralatan bersih',
];

export interface CommonMistake {
  problem: string;
  cause: string;
  fix: string;
}

export const COMMON_MISTAKES: CommonMistake[] = [
  { problem: 'Nasi masih keras', cause: 'Rendaman kurang lama atau air terlalu sedikit', fix: 'Tambah air panas 1/4 bagian, tutup, dan masak 10 menit lagi.' },
  { problem: 'Rasa sepat atau pahit', cause: 'Kulit luar masih banyak dan mengandung tanin', fix: 'Pilih sorgum sosoh, lalu rendam dan ganti airnya.' },
  { problem: 'Kue rapuh dan mudah hancur', cause: 'Tepung sorgum tidak mengandung gluten', fix: 'Tambahkan pengikat seperti telur atau pisang, lalu diamkan adonan 15 menit.' },
  { problem: 'Tepung menggumpal atau apek', cause: 'Biji belum kering atau wadah tidak kedap', fix: 'Keringkan biji sampai mudah patah dan simpan di wadah kedap. Buang jika berjamur.' },
];

/** Bentuk olahan sorgum yang dipakai sebuah menu, dibaca dari nama bahannya. */
export function detectSorghumForms(recipe: Recipe): SorghumForm[] {
  const sorghumLines = (recipe.ingredients || [])
    .map((i) => (i.name || '').toLowerCase())
    .filter((name) => /sorgum|sorghum/.test(name));

  // Tiap baris bahan = satu olahan; urutan mengikuti bahan, jadi yang pertama adalah olahan utama.
  const ids = new Set(
    sorghumLines.map((name) => {
      if (/tepung|flour/.test(name)) return 'tepung';
      if (/nasi/.test(name)) return 'nasi';
      if (/popped|popping|sangrai|berondong/.test(name)) return 'popped';
      if (/kecambah|malt/.test(name)) return 'kecambah';
      return 'beras';
    })
  );

  return [...ids].map((id) => SORGHUM_FORMS.find((f) => f.id === id)!);
}
