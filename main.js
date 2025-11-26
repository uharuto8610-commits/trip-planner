import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDnfFFRggET9B2hndWS6y0L2nNLK7_8zvo",
  authDomain: "trip-planner-data.firebaseapp.com",
  projectId: "trip-planner-data",
  storageBucket: "trip-planner-data.appspot.com",
  messagingSenderId: "1065188396872",
  appId: "1:1065188396872:web:35d2edb391fc95993bed7d"
};

// 今の旅のIDを覚えておくための変数
let currentTripId = null;

// 旅を作成して Firestore に保存する関数
async function createTrip({ destination, baseCurrency }) {
  const tripsRef = collection(db, "trips");
  const docRef = await addDoc(tripsRef, {
    destination,
    baseCurrency,
    createdAt: serverTimestamp()
  });
  currentTripId = docRef.id;        // 作った tripId を保存しておく
  console.log("Trip created in Firestore:", currentTripId);
  return currentTripId;
}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





const STORAGE_KEY = 'trip-split-v1';

// 目安レート（1通貨あたりの円）
const currencyDefaultRates = {
  JPY: 1, USD: 150, EUR: 160, GBP: 190, AUD: 100, CAD: 110, CHF: 170, CNY: 20, HKD: 19, TWD: 5,
  KRW: 0.11, SGD: 110, THB: 4.2, MYR: 35, VND: 0.006, IDR: 0.0095, PHP: 2.7, INR: 1.8, NZD: 90,
  BRL: 28, MXN: 9, SAR: 40, AED: 41, TRY: 4.7, ZAR: 8
};

const currencyOptions = [
  { code: 'JPY', label: '日本円', symbol: '¥', defaultRate: currencyDefaultRates.JPY },
  { code: 'USD', label: 'USD ドル', symbol: '$', defaultRate: currencyDefaultRates.USD },
  { code: 'EUR', label: 'EUR ユーロ', symbol: '€', defaultRate: currencyDefaultRates.EUR },
  { code: 'GBP', label: 'GBP ポンド', symbol: '£', defaultRate: currencyDefaultRates.GBP },
  { code: 'AUD', label: 'AUD 豪ドル', symbol: 'A$', defaultRate: currencyDefaultRates.AUD },
  { code: 'CAD', label: 'CAD カナダドル', symbol: 'C$', defaultRate: currencyDefaultRates.CAD },
  { code: 'CHF', label: 'CHF フラン', symbol: '₣', defaultRate: currencyDefaultRates.CHF },
  { code: 'CNY', label: 'CNY 元', symbol: '¥', defaultRate: currencyDefaultRates.CNY },
  { code: 'HKD', label: 'HKD 香港ドル', symbol: 'HK$', defaultRate: currencyDefaultRates.HKD },
  { code: 'TWD', label: 'TWD 台湾ドル', symbol: 'NT$', defaultRate: currencyDefaultRates.TWD },
  { code: 'KRW', label: 'KRW ウォン', symbol: '₩', defaultRate: currencyDefaultRates.KRW },
  { code: 'SGD', label: 'SGD シンガポールドル', symbol: 'S$', defaultRate: currencyDefaultRates.SGD },
  { code: 'THB', label: 'THB バーツ', symbol: '฿', defaultRate: currencyDefaultRates.THB },
  { code: 'MYR', label: 'MYR リンギット', symbol: 'RM', defaultRate: currencyDefaultRates.MYR },
  { code: 'VND', label: 'VND ドン', symbol: '₫', defaultRate: currencyDefaultRates.VND },
  { code: 'IDR', label: 'IDR ルピア', symbol: 'Rp', defaultRate: currencyDefaultRates.IDR },
  { code: 'PHP', label: 'PHP ペソ', symbol: '₱', defaultRate: currencyDefaultRates.PHP },
  { code: 'INR', label: 'INR ルピー', symbol: '₹', defaultRate: currencyDefaultRates.INR },
  { code: 'NZD', label: 'NZD ニュージーランドドル', symbol: 'NZ$', defaultRate: currencyDefaultRates.NZD },
  { code: 'BRL', label: 'BRL レアル', symbol: 'R$', defaultRate: currencyDefaultRates.BRL },
  { code: 'MXN', label: 'MXN ペソ', symbol: '$', defaultRate: currencyDefaultRates.MXN },
  { code: 'ZAR', label: 'ZAR ランド', symbol: 'R', defaultRate: currencyDefaultRates.ZAR },
  { code: 'SAR', label: 'SAR リヤル', symbol: '﷼', defaultRate: currencyDefaultRates.SAR },
  { code: 'AED', label: 'AED ディルハム', symbol: 'د.إ', defaultRate: currencyDefaultRates.AED },
  { code: 'TRY', label: 'TRY リラ', symbol: '₺', defaultRate: currencyDefaultRates.TRY },
  { code: 'OTHER', label: 'その他（自分で通貨コードを入力）', symbol: '', defaultRate: 1 }
];

const categoryOptions = [
  { id: 'food', icon: '🍽️', label: '食べ物' },
  { id: 'transport', icon: '🚌', label: '交通' },
  { id: 'souvenir', icon: '🎁', label: 'おみやげ' },
  { id: 'stay', icon: '🏨', label: '宿泊' },
  { id: 'activity', icon: '🎡', label: '体験' },
  { id: 'other', icon: '🧾', label: 'その他' }
];

// 国名→通貨コードの簡易マップ（主要国＋多くの地域をカバー）
const countryCurrencyMap = [
  { currency: 'JPY', names: ['japan', '日本'] },
  { currency: 'USD', names: ['united states', 'usa', 'america', 'アメリカ', '米国', 'ハワイ', 'グアム'] },
  { currency: 'EUR', names: ['france', 'germany', 'italy', 'spain', 'netherlands', 'belgium', 'greece', 'portugal', 'austria', 'ireland', 'finland', 'estonia', 'latvia', 'lithuania', 'slovakia', 'slovenia', 'luxembourg', 'malta', 'cyprus', 'ユーロ', 'フランス', 'ドイツ', 'イタリア', 'スペイン', 'オランダ', 'ポルトガル', 'ギリシャ', 'ベルギー', 'オーストリア', 'アイルランド'] },
  { currency: 'GBP', names: ['united kingdom', 'uk', 'england', 'scotland', 'wales', 'london', 'イギリス', '英国', 'ロンドン'] },
  { currency: 'CHF', names: ['switzerland', 'zurich', 'geneva', 'スイス'] },
  { currency: 'CAD', names: ['canada', 'トロント', 'バンクーバー', 'カナダ'] },
  { currency: 'AUD', names: ['australia', 'sydney', 'melbourne', 'perth', 'オーストラリア'] },
  { currency: 'NZD', names: ['new zealand', 'auckland', 'wellington', 'ニュージーランド'] },
  { currency: 'CNY', names: ['china', 'beijing', 'shanghai', '中国', '上海', '北京'] },
  { currency: 'HKD', names: ['hong kong', '香港'] },
  { currency: 'TWD', names: ['taiwan', 'taipei', '高雄', '台北', '台湾'] },
  { currency: 'KRW', names: ['korea', 'south korea', 'seoul', '韓国', 'ソウル'] },
  { currency: 'THB', names: ['thailand', 'bangkok', 'phuket', 'バンコク', 'タイ'] },
  { currency: 'MYR', names: ['malaysia', 'kuala lumpur', 'langkawi', 'malacca', 'マレーシア', 'クアラルンプール', 'ランカウイ', 'マラッカ'] },
  { currency: 'SGD', names: ['singapore', 'シンガポール'] },
  { currency: 'VND', names: ['vietnam', 'hanoi', 'ho chi minh', 'da nang', 'ベトナム', 'ハノイ', 'ホーチミン', 'ダナン'] },
  { currency: 'IDR', names: ['indonesia', 'bali', 'jakarta', 'インドネシア', 'バリ'] },
  { currency: 'PHP', names: ['philippines', 'manila', 'セブ', 'フィリピン', 'マニラ'] },
  { currency: 'INR', names: ['india', 'delhi', 'mumbai', 'goa', 'インド', 'デリー', 'ムンバイ'] },
  { currency: 'AED', names: ['uae', 'dubai', 'abu dhabi', 'アラブ首長国連邦', 'ドバイ'] },
  { currency: 'SAR', names: ['saudi arabia', 'riyadh', 'サウジアラビア'] },
  { currency: 'TRY', names: ['turkey', 'istanbul', 'トルコ', 'イスタンブール'] },
  { currency: 'ZAR', names: ['south africa', 'cape town', 'johannesburg', '南アフリカ'] },
  { currency: 'BRL', names: ['brazil', 'sao paulo', 'rio de janeiro', 'ブラジル', 'リオ', 'サンパウロ'] },
  { currency: 'MXN', names: ['mexico', 'cancun', 'mexico city', 'メキシコ', 'カンクン'] },
  { currency: 'ARS', names: ['argentina', 'buenos aires', 'アルゼンチン'] },
  { currency: 'CLP', names: ['chile', 'santiago', 'チリ'] },
  { currency: 'COP', names: ['colombia', 'bogota', 'メデジン', 'コロンビア'] },
  { currency: 'PEN', names: ['peru', 'lima', 'ペルー'] },
  { currency: 'DKK', names: ['denmark', 'copenhagen', 'デンマーク'] },
  { currency: 'SEK', names: ['sweden', 'stockholm', 'スウェーデン'] },
  { currency: 'NOK', names: ['norway', 'oslo', 'ノルウェー'] },
  { currency: 'PLN', names: ['poland', 'warsaw', 'ポーランド'] },
  { currency: 'CZK', names: ['czech', 'prague', 'チェコ', 'プラハ'] },
  { currency: 'HUF', names: ['hungary', 'budapest', 'ハンガリー'] },
  { currency: 'ILS', names: ['israel', 'tel aviv', 'jerusalem', 'イスラエル'] },
  { currency: 'EGP', names: ['egypt', 'cairo', 'エジプト', 'カイロ'] },
  { currency: 'KES', names: ['kenya', 'nairobi', 'ケニア'] },
  { currency: 'TZS', names: ['tanzania', 'zanzibar', 'タンザニア', 'ザンジバル'] },
  { currency: 'MAD', names: ['morocco', 'marrakech', 'モロッコ'] },
  { currency: 'QAR', names: ['qatar', 'doha', 'カタール'] },
  { currency: 'OMR', names: ['oman', 'マスカット', 'オマーン'] },
  { currency: 'LKR', names: ['sri lanka', 'colombo', 'スリランカ'] },
  { currency: 'NPR', names: ['nepal', 'kathmandu', 'ネパール'] },
  { currency: 'MMK', names: ['myanmar', 'ヤンゴン', 'ミャンマー'] },
  { currency: 'KHR', names: ['cambodia', 'プノンペン', 'カンボジア'] },
  { currency: 'LAK', names: ['laos', 'ルアンパバーン', 'ビエンチャン', 'lao'] },
  { currency: 'MVR', names: ['maldives', 'モルディブ'] },
  { currency: 'RUB', names: ['russia', 'moscow', 'ロシア', 'モスクワ'] },
  { currency: 'UAH', names: ['ukraine', 'ウクライナ'] },
  { currency: 'RON', names: ['romania', 'ルーマニア'] },
  { currency: 'BGN', names: ['bulgaria', 'ブルガリア'] },
  { currency: 'HRK', names: ['croatia', 'クロアチア'] },
  { currency: 'ISK', names: ['iceland', 'アイスランド'] },
  { currency: 'DOP', names: ['dominican', 'ドミニカ'] },
  { currency: 'JMD', names: ['jamaica', 'ジャマイカ'] },
  { currency: 'CRC', names: ['costa rica', 'コスタリカ'] },
  { currency: 'GTQ', names: ['guatemala', 'グアテマラ'] },
  { currency: 'UYU', names: ['uruguay', 'ウルグアイ'] },
  { currency: 'PAB', names: ['panama', 'パナマ'] },
  { currency: 'BWP', names: ['botswana', 'ボツワナ'] },
  { currency: 'GHS', names: ['ghana', 'ガーナ'] },
  { currency: 'NGN', names: ['nigeria', 'ナイジェリア'] },
  { currency: 'ETB', names: ['ethiopia', 'エチオピア'] },
  { currency: 'UGX', names: ['uganda', 'ウガンダ'] },
  { currency: 'ZMW', names: ['zambia', 'ザンビア'] },
  { currency: 'MZN', names: ['mozambique', 'モザンビーク'] },
  { currency: 'SCR', names: ['seychelles', 'セーシェル'] },
  { currency: 'MUR', names: ['mauritius', 'モーリシャス'] },
  { currency: 'FJD', names: ['fiji', 'フィジー'] },
  { currency: 'WST', names: ['samoa', 'サモア'] },
  { currency: 'VUV', names: ['vanuatu', 'バヌアツ'] },
  { currency: 'PGK', names: ['papua new guinea', 'パプアニューギニア'] }
];

const els = {
  participantCount: document.getElementById('participantCount'),
  participantName: document.getElementById('participantName'),
  destination: document.getElementById('destination'),
  addParticipant: document.getElementById('addParticipant'),
  nextToCount: document.getElementById('nextToCount'),
  nextToNames: document.getElementById('nextToNames'),
  participantList: document.getElementById('participantList'),
  participantGuard: document.getElementById('participantGuard'),
  startScreen: document.getElementById('startScreen'),
  startBtn: document.getElementById('startBtn'),
  confirmSummary: document.getElementById('confirmSummary'),
  confirmDestination: document.getElementById('confirmDestination'),
  confirmEdit: document.getElementById('confirmEdit'),
  confirmDestinationInput: document.getElementById('confirmDestinationInput'),
  confirmNamesList: document.getElementById('confirmNamesList'),
  confirmAddName: document.getElementById('confirmAddName'),
  confirmAddNameBtn: document.getElementById('confirmAddNameBtn'),
  editPrep: document.getElementById('editPrep'),
  confirmGo: document.getElementById('confirmGo'),
  autoCurrencyInfo: document.getElementById('autoCurrencyInfo'),
  resetAll: document.getElementById('resetAll'),
  payer: document.getElementById('payer'),
  title: document.getElementById('title'),
  category: document.getElementById('category'),
  amount: document.getElementById('amount'),
  expenseForm: document.getElementById('expenseForm'),
  expenseParticipants: document.getElementById('expenseParticipants'),
  photoBtn: document.getElementById('photoBtn'),
  photoInput: document.getElementById('photoInput'),
  photoPreview: document.getElementById('photoPreview'),
  expenseList: document.getElementById('expenseList'),
  settlement: document.getElementById('settlement'),
  currencyTotals: document.getElementById('currencyTotals'),
  dayTabs: document.getElementById('dayTabs'),
  addDayBtn: document.getElementById('addDayBtn'),
  deleteDayBtn: document.getElementById('deleteDayBtn'),
  journeyBar: document.getElementById('journeyBar')
};

const defaultState = {
  expectedCount: '',
  participants: [],
  expenses: [],
  destination: '',
  selectedDay: 1,
  dayCount: 1,
  stage: 'start',
  prepStep: 'dest',
  currentCurrencyCode: 'JPY',
  currentRate: 1,
  confirmEditing: false,
  autoAdvance: true
};
let state = loadState();
let shareSelection = new Set(state.participants.map((p) => p.id));
let pendingPhoto = '';
let photoLoading = false;

init();

function init() {
  // 初回は必ずスタート画面から始める
  state.stage = 'start';
  state.prepStep = 'dest';
  state.autoAdvance = false; // 起動直後は自動で確認画面へ進めない
  populateSelects();
  restoreInputs();
  bindEvents();
  autoSetCurrencyFromDestination(state.destination, { skipEmpty: true });
  renderParticipants();
  renderExpenses();
  renderSettlement();
  updateVisibility();
  updateNameLock();
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...defaultState, ...JSON.parse(stored) } : { ...defaultState };
  } catch (e) {
    console.warn('Failed to load saved data, starting fresh.', e);
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save data to localStorage', e);
    alert('保存容量を超えました。写真付きのデータは保存できない場合があります。写真を減らすか、必要に応じて再入力してください。');
  }
}

function populateSelects() {
  els.category.innerHTML = categoryOptions
    .map((c) => `<option value="${c.id}">${c.icon} ${c.label}</option>`)
    .join('');
  renderPayerOptions();
}

function renderPayerOptions() {
  els.payer.innerHTML = '<option value="">選択してください</option>' +
    state.participants.map((p) => `<option value="${p.id}">${p.name}</option>`).join('');
}

function restoreInputs() {
  els.participantCount.value = state.expectedCount || '';
  els.destination.value = state.destination || '';
  updatePrepSteps();
}

function bindEvents() {
  els.participantCount.addEventListener('change', () => {
    const val = Number(els.participantCount.value);
    state.expectedCount = Number.isFinite(val) && val > 0 ? val : '';
    if (state.expectedCount && state.participants.length > state.expectedCount) {
      state.expectedCount = state.participants.length;
      els.participantCount.value = state.expectedCount;
      alert('すでに登録した人数を下回る数にはできません');
    }
    state.autoAdvance = true;
    saveState();
    if (state.expectedCount) state.prepStep = 'names';
    updateFormLock();
    updateVisibility();
    updateNameLock();
    updatePrepSteps();
    renderConfirmSummary();
  });

  els.destination.addEventListener('input', () => {
    state.destination = els.destination.value.trim();
    const normalized = normalizeDestinationName(state.destination);
    if (normalized && normalized !== state.destination) {
      state.destination = normalized;
      els.destination.value = normalized;
    }
    // 編集時に自動でページが切り替わらないようにする
    state.autoAdvance = false;
    saveState();
    autoSetCurrencyFromDestination(state.destination);
    updateFormLock();
    updateVisibility();
    updatePrepSteps();
    renderConfirmSummary();
  });

  els.addParticipant.addEventListener('click', () => {
    const count = Number(els.participantCount.value);
    const name = els.participantName.value.trim();
    if (!count) return alert('参加者人数を先に入力してください');
    if (!name) return alert('名前を入力してください');
    if (state.participants.length >= count) return alert('参加人数の上限に達しました');
    if (state.participants.some((p) => p.name === name)) return alert('同じ名前が登録されています');

    const id = crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}-${Math.random()}`;
    state.participants.push({ id, name });
    els.participantName.value = '';
    shareSelection.add(id);
    state.autoAdvance = true;
    saveState();
    renderParticipants();
    renderExpenses();
    renderSettlement();
    updateVisibility();
    updateNameLock();
    maybeAutoAdvance();
    updatePrepSteps();
    renderConfirmSummary();
  });

  els.startBtn.addEventListener('click', () => {
    state.stage = 'prep';
    state.prepStep = 'dest';
    state.autoAdvance = true; // ユーザー操作後は自動遷移を許可
    saveState();
    updateVisibility();
  });
  els.nextToCount?.addEventListener('click', () => {
    if (!state.destination) return alert('行く場所を入力してください');
    state.prepStep = 'count';
    saveState();
    updatePrepSteps();
  });
  els.nextToNames?.addEventListener('click', () => {
    if (!Number(state.expectedCount)) return alert('参加者人数を選んでください');
    state.prepStep = 'names';
    saveState();
    updatePrepSteps();
  });
  els.editPrep.addEventListener('click', () => {
    state.stage = 'confirm'; // 最終確認のまま編集
    state.prepStep = 'dest';
    state.autoAdvance = false;
    state.confirmEditing = true;
    saveState();
    if (els.confirmEdit) els.confirmEdit.classList.remove('hidden');
    if (els.confirmDestinationInput) {
      els.confirmDestinationInput.value = state.destination || '';
    }
    renderConfirmEditNames();
    updateVisibility();
  });
  els.confirmGo.addEventListener('click', () => {
    const ready = state.participants.length > 0 && !!state.expectedCount && !!state.destination;
    if (!ready) return alert('行き先・人数・名前をすべて入力してください');
    state.stage = 'main';
    saveState();
    updateVisibility(true);
    document.getElementById('expenseSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  // 確認画面で直接編集
  els.editPrep.addEventListener('click', () => {
    if (!els.confirmEdit) return;
    state.autoAdvance = false;
    const len = state.participants.length;
    if (len && (!state.expectedCount || Number(state.expectedCount) < len)) {
      state.expectedCount = len;
      saveState();
    }
    els.confirmEdit.classList.remove('hidden');
    if (els.confirmDestinationInput) {
      els.confirmDestinationInput.value = state.destination || '';
      // フォーカスは当てず、その場で編集可能にする
    }
    renderConfirmEditNames();
  });
  els.resetAll.addEventListener('click', resetAll);

  els.photoBtn.addEventListener('click', () => els.photoInput.click());
  els.photoInput.addEventListener('change', onPhotoSelected);

  els.expenseForm.addEventListener('submit', onAddExpense);
  els.addDayBtn.addEventListener('click', () => {
    const dayCount = Math.max(state.dayCount || 1, 1);
    if (state.selectedDay < dayCount) {
      state.selectedDay += 1;
    } else {
      state.dayCount = dayCount + 1;
      state.selectedDay = state.dayCount;
    }
    saveState();
    renderExpenses();
  });
  els.deleteDayBtn.addEventListener('click', () => {
    const dayCount = Math.max(state.dayCount || 1, 1);
    if (dayCount <= 1) {
      alert('Day1は削除できません');
      return;
    }
    if (!confirm(`Day${state.selectedDay}を削除しますか？`)) return;
    const removeDay = state.selectedDay;
    // remove expenses of this day
    state.expenses = state.expenses.filter((e) => (e.day || 1) !== removeDay);
    // shift days above removed down by 1
    state.expenses = state.expenses.map((e) => {
      const day = e.day || 1;
      return day > removeDay ? { ...e, day: day - 1 } : e;
    });
    state.dayCount = dayCount - 1;
    state.selectedDay = Math.min(removeDay, state.dayCount);
    saveState();
    renderExpenses();
  });
}

function autoSetCurrencyFromDestination(place, opts = {}) {
  const { silent = false, skipEmpty = false } = opts;
  const trimmed = (place || '').trim();
  if (!trimmed && skipEmpty) {
    if (!silent) updateAutoCurrencyInfo(null);
    return;
  }

  const guess = guessCurrencyFromDestination(trimmed);
  if (guess) {
    state.currentCurrencyCode = guess.code;
    state.currentRate = guess.rate || currencyDefaultRates[guess.code] || 1;
    updateAutoCurrencyInfo(guess);
  } else if (!silent) {
    updateAutoCurrencyInfo(null);
  }
}

function guessCurrencyFromDestination(place) {
  if (!place) return null;
  const lower = place.toLowerCase();
  for (const hint of countryCurrencyMap) {
    if (hint.names.some((k) => lower.includes(k.toLowerCase()))) {
      const meta = currencyOptions.find((c) => c.code === hint.currency);
      const rate = meta?.defaultRate || currencyDefaultRates[hint.currency] || null;
      return { code: hint.currency, rate };
    }
  }
  return null;
}

function updateAutoCurrencyInfo(guess) {
  if (!els.autoCurrencyInfo) return;
  if (!guess) {
    els.autoCurrencyInfo.textContent = '行き先から通貨を自動セットします';
    els.autoCurrencyInfo.className = 'pill pill--warn';
    return;
  }
  const meta = currencyOptions.find((c) => c.code === guess.code);
  const label = meta ? meta.label : guess.code;
  const rate = guess.rate ?? meta?.defaultRate ?? null;
  els.autoCurrencyInfo.textContent = rate
    ? `${label} をセットしました (¥${rate.toFixed(4)})`
    : `${label} をセットしました。レートを入力してください`;
  els.autoCurrencyInfo.className = 'pill pill--info';
}

function onPhotoSelected(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  photoLoading = true;
  compressAndSetPhoto(file)
    .then((dataUrl) => {
      pendingPhoto = dataUrl;
      photoLoading = false;
      renderPhotoPreview();
    })
    .catch(() => {
      photoLoading = false;
      alert('写真の読み込みに失敗しました。もう一度お試しください。');
    });
}

function renderPhotoPreview() {
  els.photoPreview.innerHTML = '';
  if (!pendingPhoto) {
    els.photoPreview.textContent = '写真は未添付';
    return;
  }
  const img = document.createElement('img');
  img.src = pendingPhoto;
  img.alt = '添付写真';
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'delete-btn';
  remove.textContent = '削除';
  remove.onclick = () => {
    pendingPhoto = '';
    els.photoInput.value = '';
    renderPhotoPreview();
  };
  els.photoPreview.appendChild(img);
  els.photoPreview.appendChild(remove);
}

function renderParticipants() {
  els.participantList.innerHTML = '';
  if (!state.participants.length) {
    els.participantList.innerHTML = '<span class="hint">まだ参加者が登録されていません</span>';
  } else {
    state.participants.forEach((p, idx) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = `${idx + 1}. ${p.name}`;
      els.participantList.appendChild(chip);
    });
  }
  renderPayerOptions();
  ensureShareSelection();
  renderShareChips();
  updateFormLock();
  updateNameLock();
  renderParticipantSummary();
  renderSettlementSummary();
  updatePrepSteps();
  renderConfirmSummary();
}

function ensureShareSelection() {
  const ids = state.participants.map((p) => p.id);
  if (!ids.length) {
    shareSelection = new Set();
    return;
  }
  if (!shareSelection.size) {
    shareSelection = new Set(ids);
  } else {
    shareSelection = new Set(ids.filter((id) => shareSelection.has(id)));
    if (!shareSelection.size) shareSelection = new Set(ids);
  }
}

function renderShareChips() {
  els.expenseParticipants.innerHTML = '';
  state.participants.forEach((p) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `chip${shareSelection.has(p.id) ? ' active' : ''}`;
    btn.textContent = p.name;
    btn.onclick = () => toggleShare(p.id);
    els.expenseParticipants.appendChild(btn);
  });
}

function toggleShare(id) {
  if (shareSelection.has(id)) {
    if (shareSelection.size === 1) return; // 必ず1人は残す
    shareSelection.delete(id);
  } else {
    shareSelection.add(id);
  }
  renderShareChips();
}

function updateFormLock() {
  const ready = state.participants.length > 0 && !!state.expectedCount && !!state.destination;
  els.expenseForm.setAttribute('aria-disabled', ready ? 'false' : 'true');
  els.participantGuard.textContent = ready
    ? `登録済 ${state.participants.length}/${state.expectedCount || '?'}・行き先: ${state.destination || '未入力'}`
    : '参加者と行き先を登録すると使えます';
  els.participantGuard.className = ready ? 'pill pill--info' : 'pill pill--warn';
}

function updateVisibility(forceMain = false) {
  const ready = state.participants.length > 0 && !!state.expectedCount && !!state.destination;
  if (!state.stage) state.stage = ready ? 'confirm' : 'start';
  if (forceMain && ready) state.stage = 'main';
  if (state.stage === 'main' && !ready) state.stage = 'prep';
  // 編集時は最終確認に留まれるよう、confirmではステージを落とさない

  const startVisible = state.stage === 'start';
  const prepVisible = state.stage === 'prep';
  const confirmVisible = state.stage === 'confirm';
  const mainVisible = state.stage === 'main';

  toggleSection(els.startScreen, startVisible);
  document.querySelectorAll('.prep-flow').forEach((el) => toggleSection(el, prepVisible));
  document.querySelectorAll('.confirm-flow').forEach((el) => toggleSection(el, confirmVisible));
  document.querySelectorAll('.main-flow').forEach((el) => toggleSection(el, mainVisible));

  if (els.confirmEdit && !confirmVisible) {
    els.confirmEdit.classList.add('hidden');
    state.confirmEditing = false;
  }

  document.body.classList.toggle('only-start', startVisible || !mainVisible);
  document.body.classList.remove('stage-start', 'stage-prep', 'stage-main', 'stage-confirm');
  document.body.classList.add(`stage-${state.stage}`);
  saveState();
}

function toggleSection(el, show) {
  if (!el) return;
  el.classList.toggle('hidden', !show);
}

function onAddExpense(e) {
  e.preventDefault();
  const ready = state.participants.length > 0 && !!state.expectedCount && !!state.destination;
  if (!ready) return alert('最初に参加者人数と全員の名前、行き先を入力してください');
  if (photoLoading) return alert('写真を読み込み中です。完了するまでお待ちください');

  const payerId = els.payer.value;
  const title = els.title.value.trim();
  const category = els.category.value;
  const dayIndex = state.selectedDay || 1;
  const amount = Number(els.amount.value);
  const splitWith = Array.from(shareSelection);
  const guess = guessCurrencyFromDestination(state.destination) || { code: 'JPY', rate: 1 };
  const currencyMeta = currencyOptions.find((c) => c.code === guess.code) || currencyOptions[0];
  const rate = guess.rate || currencyMeta?.defaultRate || 1;
  const currencySymbol = currencyMeta?.symbol || `${guess.code} `;

  if (!payerId) return alert('支払った人を選択してください');
  if (!title) return alert('内容を入力してください');
  if (!amount) return alert('金額を入力してください');
  if (!splitWith.length) return alert('割り勘する人を選んでください');

  const expense = {
    id: crypto.randomUUID ? crypto.randomUUID() : `e-${Date.now()}-${Math.random()}`,
    title,
    category,
    day: dayIndex,
    payerId,
    amount,
    currencyCode: guess.code,
    currencyLabel: guess.code,
    currencySymbol,
    rate,
    participants: splitWith,
    photo: pendingPhoto,
    createdAt: new Date().toISOString()
  };

  state.expenses.unshift(expense);
  if (!state.selectedDay) state.selectedDay = 1;
  els.title.value = '';
  els.amount.value = '';
  pendingPhoto = '';
  photoLoading = false;
  els.photoInput.value = '';
  renderPhotoPreview();
  shareSelection = new Set(state.participants.map((p) => p.id));
  renderShareChips();
  saveState();
  renderExpenses();
  renderSettlement();
  updateVisibility();
}

function renderExpenses() {
  const dayCount = Math.max(state.dayCount || 1, 1);
  const selectedDay = Math.min(Math.max(state.selectedDay || 1, 1), dayCount);
  state.selectedDay = selectedDay;

  // day tabs
  const tabs = [];
  for (let i = 1; i <= dayCount; i++) {
    tabs.push(`<button type="button" class="chip${i === selectedDay ? ' active' : ''}" data-day="${i}">Day ${i}</button>`);
  }
  els.dayTabs.innerHTML = tabs.join('');
  els.dayTabs.querySelectorAll('button').forEach((btn) => {
    btn.onclick = () => {
      state.selectedDay = Number(btn.dataset.day);
      saveState();
      renderExpenses();
    };
  });

  const filtered = state.expenses.filter((e) => (e.day || 1) === selectedDay);
  if (!filtered.length) {
    els.expenseList.innerHTML = '<p class="hint">この日の支払いはまだありません</p>';
  }

  const totals = {};
  filtered.forEach((e) => {
    totals[e.currencyLabel] = (totals[e.currencyLabel] || 0) + Number(e.amount);
  });
  els.currencyTotals.innerHTML = Object.entries(totals)
    .map(([code, total]) => `<span class="chip">${code}: ${formatNumber(total)}</span>`)
    .join('');

  els.expenseList.innerHTML = '';
  filtered.forEach((exp) => {
    const card = document.createElement('div');
    card.className = 'expense-card';

    const perHead = exp.amount / exp.participants.length;
    const perHeadJpy = perHead * exp.rate;
    const amountJpy = exp.amount * exp.rate;

    const payerName = findParticipantName(exp.payerId);
    const shareNames = exp.participants.map(findParticipantName).join(' / ');
    const categoryMeta = categoryOptions.find((c) => c.id === exp.category);

    card.innerHTML = `
      <div>
        <p class="expense-card__label">${categoryMeta?.icon || ''} ${exp.title}</p>
        <div class="expense-card__amount">${exp.currencySymbol}${formatNumber(exp.amount)} <span class="expense-card__share">(¥${formatNumber(amountJpy)})</span></div>
        <div class="expense-card__share">1人あたり ${exp.currencySymbol}${formatNumber(perHead)} / ¥${formatNumber(perHeadJpy)}</div>
        <div class="expense-card__meta">
          <span>支払: ${payerName}</span>
          <span>割り勘: ${shareNames}</span>
          <span>通貨: ${exp.currencyLabel} @ ¥${exp.rate.toFixed(4)}</span>
        </div>
      </div>
      <div class="expense-card__actions">
        ${exp.photo ? `<div class="expense-card__photo"><img src="${exp.photo}" alt="支払いの写真"></div>` : ''}
        <button class="delete-btn" type="button" data-id="${exp.id}">削除</button>
      </div>
    `;

    card.querySelector('.delete-btn').onclick = () => deleteExpense(exp.id);
    els.expenseList.appendChild(card);
  });
}

function deleteExpense(id) {
  if (!confirm('この支払いを削除しますか？')) return;
  state.expenses = state.expenses.filter((e) => e.id !== id);
  saveState();
  renderExpenses();
  renderSettlement();
}

function renderSettlement() {
  els.settlement.innerHTML = '';
  if (!state.participants.length) {
    els.settlement.innerHTML = '<p class="hint">参加者を登録すると清算結果が表示されます</p>';
    renderSettlementSummary();
    return;
  }

  const results = calculateSettlement();

  const destGuess = guessCurrencyFromDestination(state.destination) || { code: 'JPY', rate: 1 };
  const destMeta = currencyOptions.find((c) => c.code === destGuess.code);
  const destRate = destGuess.rate || destMeta?.defaultRate || 1; // 円 / 1通貨
  const destSymbol = destMeta?.symbol || `${destGuess.code} `;

  results.forEach((r) => {
    const balanceDest = r.balance / destRate;
    const paidDest = r.paid / destRate;
    const shareDest = r.share / destRate;
    const card = document.createElement('div');
    card.className = 'settlement__card';
    card.innerHTML = `
      <h3>${r.name}</h3>
      <p class="stat">支払合計: ${destSymbol}${formatNumber(paidDest)} <small>(¥${formatNumber(r.paid)})</small></p>
      <p class="stat">使った分: ${destSymbol}${formatNumber(shareDest)} <small>(¥${formatNumber(r.share)})</small></p>
      <p class="settlement__balance ${r.balance >= 0 ? 'positive' : 'negative'}">${r.balance >= 0 ? '+' : ''}${destSymbol}${formatNumber(balanceDest)} <small>(¥${formatNumber(r.balance)})</small></p>
    `;
    els.settlement.appendChild(card);
  });
  renderSettlementSummary();
}

function calculateSettlement() {
  const base = {};
  state.participants.forEach((p) => {
    base[p.id] = { id: p.id, name: p.name, paid: 0, share: 0 };
  });

  state.expenses.forEach((exp) => {
    const jpyAmount = exp.amount * exp.rate;
    if (!base[exp.payerId]) return;
    base[exp.payerId].paid += jpyAmount;

    const splits = exp.participants.length ? exp.participants : state.participants.map((p) => p.id);
    const perHead = jpyAmount / splits.length;
    splits.forEach((id) => {
      if (base[id]) base[id].share += perHead;
    });
  });

  return Object.values(base).map((r) => ({ ...r, balance: r.paid - r.share }));
}

function findParticipantName(id) {
  return state.participants.find((p) => p.id === id)?.name || '未登録';
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString('ja-JP', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
}

function resetAll() {
  if (!confirm('全てリセットしますか？保存データも消去されます。')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = { ...defaultState };
  pendingPhoto = '';
  shareSelection = new Set();
  els.participantCount.value = '';
  els.participantName.value = '';
  els.participantName.disabled = false;
  els.destination.value = '';
  els.title.value = '';
  els.amount.value = '';
  els.photoInput.value = '';
  autoSetCurrencyFromDestination('', { skipEmpty: true, silent: true });
  updateAutoCurrencyInfo(null);
  state.dayCount = 1;
  state.selectedDay = 1;
  state.stage = 'start';
  state.prepStep = 'dest';
  state.currentCurrencyCode = 'JPY';
  state.currentRate = 1;
  state.autoAdvance = true;
  state.confirmEditing = false;
  renderParticipants();
  renderExpenses();
  renderSettlement();
  updateFormLock();
  updateVisibility();
  updateNameLock();
  renderParticipantSummary();
  renderSettlementSummary();
  updatePrepSteps();
  renderConfirmSummary();
}

function updateNameLock() {
  const expected = Number(state.expectedCount) || 0;
  const remaining = expected - state.participants.length;
  const lock = expected > 0 && remaining <= 0;
  els.participantName.disabled = lock;
  els.addParticipant.disabled = lock;
  if (lock) {
    els.participantName.placeholder = '定員に達しました';
  } else {
    const nextIndex = expected > 0 ? state.participants.length + 1 : null;
    els.participantName.placeholder = nextIndex ? `${nextIndex}人目の名前を入力してください` : '例: 山田';
  }
  maybeAutoAdvance();
}

function renderParticipantSummary() {
  if (!els.participantSummary) return;
  if (!state.participants.length) {
    els.participantSummary.innerHTML = '<span class="hint">行き先と参加者を入力するとここに表示されます</span>';
  } else {
    renderSummaryList(els.participantSummary);
  }
  renderJourneyBar();
  maybeAutoAdvance();
}

function renderSettlementSummary() {
  if (!els.settlementSummary) return;
  if (!state.participants.length) {
    els.settlementSummary.innerHTML = '<span class="hint">行き先と参加者を入力するとここに表示されます</span>';
    return;
  }
  renderSummaryList(els.settlementSummary);
  renderJourneyBar();
}

function updatePrepSteps() {
  const hasDestination = !!state.destination;
  const hasCount = Number(state.expectedCount) > 0;
  if (!hasDestination) state.prepStep = 'dest';
  if (state.prepStep === 'names' && !hasCount) state.prepStep = hasDestination ? 'count' : 'dest';
  const stepDest = document.getElementById('step-destination');
  const stepCount = document.getElementById('step-count');
  const stepNames = document.getElementById('step-names');
  if (stepDest) stepDest.classList.toggle('hidden', state.prepStep !== 'dest');
  if (stepCount) stepCount.classList.toggle('hidden', state.prepStep !== 'count');
  if (stepNames) stepNames.classList.toggle('hidden', state.prepStep !== 'names');
  maybeAutoAdvance();
}

function renderConfirmSummary() {
  if (!els.confirmSummary) return;
  if (!state.destination && !state.participants.length) {
    els.confirmDestination && (els.confirmDestination.textContent = '行き先未入力');
    els.confirmSummary.innerHTML = '<span class="hint">行き先と参加者を入力するとここに表示されます</span>';
    renderConfirmEditNames();
    renderJourneyBar();
    if (els.confirmEdit) els.confirmEdit.classList.add('hidden');
    return;
  }
  // 参加者がいるのにexpectedCountが空の場合は自動補正（編集時に進めないのを防ぐ）
  if (!Number(state.expectedCount) && state.participants.length) {
    state.expectedCount = state.participants.length;
    saveState();
  }
  const dest = state.destination || '行き先未入力';
  const sentence = buildTripSentence();
  if (els.confirmDestination) els.confirmDestination.textContent = dest;
  els.confirmSummary.textContent = sentence;
  renderConfirmEditNames();
  renderJourneyBar();
  if (els.confirmEdit) {
    if (state.confirmEditing) els.confirmEdit.classList.remove('hidden');
    else els.confirmEdit.classList.add('hidden');
  }
}

function maybeAutoAdvance() {
  const ready = state.participants.length > 0 && !!state.expectedCount && !!state.destination && state.participants.length >= Number(state.expectedCount);
  if (state.stage !== 'main' && state.stage !== 'confirm' && ready && state.autoAdvance !== false) {
    state.stage = 'confirm';
    saveState();
    updateVisibility();
    renderConfirmSummary();
  }
  // 編集中はステージを変えず、編集欄の状態だけ更新
}

function buildJourneyTitle() {
  return state.destination || '行き先未入力';
}

// 行き先と参加者から表示用の文言を作成
function buildTripSentence() {
  const dest = state.destination || '行き先未設定';
  if (!state.participants.length) return dest;
  const names = state.participants.map((p) => p.name).join('と');
  return `${names}の${dest}旅行`;
}

function buildSummaryLine() {
  return buildTripSentence();
}

function renderSummaryList(target) {
  target.textContent = buildTripSentence();
}

function renderJourneyBar() {
  if (!els.journeyBar) return;
  if (!state.participants.length && !state.destination) {
    els.journeyBar.innerHTML = '<span class="hint">行き先と参加者を入力するとここに表示されます</span>';
    return;
  }
  renderSummaryList(els.journeyBar);
}

function normalizeDestinationName(input) {
  if (!input) return '';
  const lower = input.trim().toLowerCase();
  const map = {
    japan: '日本',
    tokyo: '日本',
    osaka: '日本',
    kyoto: '日本',
    'united states': 'アメリカ',
    usa: 'アメリカ',
    america: 'アメリカ',
    hawaii: 'ハワイ',
    'south korea': '韓国',
    korea: '韓国',
    seoul: 'ソウル',
    taiwan: '台湾',
    taipei: '台北',
    thailand: 'タイ',
    bangkok: 'バンコク',
    malaysia: 'マレーシア',
    'kuala lumpur': 'クアラルンプール',
    singapore: 'シンガポール',
    vietnam: 'ベトナム',
    hanoi: 'ハノイ',
    'ho chi minh': 'ホーチミン',
    indonesia: 'インドネシア',
    bali: 'バリ',
    philippines: 'フィリピン',
    manila: 'マニラ',
    india: 'インド',
    china: '中国',
    beijing: '北京',
    shanghai: '上海',
    'hong kong': '香港',
    uk: 'イギリス',
    'united kingdom': 'イギリス',
    england: 'イギリス',
    france: 'フランス',
    germany: 'ドイツ',
    italy: 'イタリア',
    spain: 'スペイン',
    canada: 'カナダ',
    australia: 'オーストラリア',
    mexico: 'メキシコ',
    brazil: 'ブラジル'
  };
  return map[lower] || input;
}

function renderConfirmEditNames() {
  if (!els.confirmNamesList) return;
  if (state.participants.length && (!state.expectedCount || Number(state.expectedCount) < state.participants.length)) {
    state.expectedCount = state.participants.length;
    saveState();
  }
  const list = els.confirmNamesList;
  list.innerHTML = '';
  state.participants.forEach((p, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${idx + 1}. ${p.name}</span>`;
    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete-btn';
    del.textContent = '削除';
    del.onclick = () => {
      state.participants.splice(idx, 1);
      state.expectedCount = state.participants.length;
      shareSelection = new Set(state.participants.map((m) => m.id));
      saveState();
      renderParticipants();
      renderExpenses();
      renderSettlement();
      renderConfirmSummary();
      updateFormLock();
      updateNameLock();
      updatePrepSteps();
    };
    li.appendChild(del);
    list.appendChild(li);
  });
  if (els.confirmDestinationInput) {
    els.confirmDestinationInput.value = state.destination || '';
    els.confirmDestinationInput.oninput = () => {
      state.destination = els.confirmDestinationInput.value.trim();
      const normalized = normalizeDestinationName(state.destination);
      if (normalized && normalized !== state.destination) {
        state.destination = normalized;
        els.confirmDestinationInput.value = normalized;
      }
      state.autoAdvance = false;
      saveState();
      autoSetCurrencyFromDestination(state.destination);
      renderConfirmSummary();
      renderParticipants();
      renderSettlement();
    };
  }
  if (els.confirmAddNameBtn) {
    els.confirmAddNameBtn.onclick = () => {
      const name = (els.confirmAddName?.value || '').trim();
      if (!name) return alert('名前を入力してください');
      if (state.participants.some((p) => p.name === name)) return alert('同じ名前が登録されています');
      const id = crypto.randomUUID ? crypto.randomUUID() : `p-${Date.now()}-${Math.random()}`;
      state.participants.push({ id, name });
      state.expectedCount = state.participants.length;
      shareSelection.add(id);
      els.confirmAddName.value = '';
      saveState();
      renderParticipants();
      renderExpenses();
      renderSettlement();
      renderConfirmSummary();
      updateFormLock();
      updateNameLock();
      updatePrepSteps();
    };
  }
}

// 画像を圧縮してDataURLを返す（容量節約のため長辺を1000pxに収め、品質を0.6に）
function compressAndSetPhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('read error'));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        try {
          const maxSize = 1000;
          let { width, height } = img;
          if (width > height && width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
          resolve(dataUrl);
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error('image load error'));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
