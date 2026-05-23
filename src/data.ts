import { Product } from './types';

export const products: Product[] = [
  // CATEGORY 1: Стиль и Гардероб
  {
    id: 'cap-princess',
    title: 'Кепка "PRINCESS"',
    description: 'Стильная хлопковая кепка из лимитированной коллекции. «Незаменимый аксессуар, который скажет за тебя всё без слов». Идеально дополнит любой стритстайл-образ.',
    url: 'https://detalinasheyu.com/women/aksessuary/cap-princess',
    image: 'https://postimg.cc/ygmsKzST',
    category: 'Шмот',
    badge: 'Лимитка',
    priceTag: 'Аксессуары'
  },
  {
    id: 'skims-tshirt',
    title: 'Футболка SKIMS (Cherry Blossom)',
    description: 'Легендарная базовая футболка от бренда Ким Кардашьян в красивом пыльно-розовом цвете. Мягкая ткань и идеальная посадка.',
    url: 'https://market.yandex.ru/card/skims-t-shirt-womens-cherry-blossomcherry-blossom-44-46/4459143115',
    image: 'https://postimg.cc/nj4pxtQG',
    category: 'Шмот',
    badge: 'Хит продаж',
    priceTag: 'Базовый гардероб'
  },
  {
    id: 'cider-dress',
    title: 'Черное базовое платье Cider',
    description: 'Элегантное черное платье в азиатском стиле из вискозы и эластана от бренда Cider.',
    url: 'https://www.ozon.ru/product/plate-cider-3827726367/',
    image: 'https://postimg.cc/4Y232Zzg',
    category: 'Шмот',
    badge: 'Качество',
    priceTag: 'Вечерний шик'
  },
  {
    id: 'cider-store',
    title: 'Бренд Cider на OZON',
    description: 'Ссылка на всю официальную витрину бренда Cider на Ozon, если захочется выбрать что-то другое.',
    url: 'https://ozon.ru/t/7WySFsW',
    image: 'https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?auto=format&fit=crop&w=800&q=80',
    category: 'Шмот',
    badge: 'Витрина',
    priceTag: 'Шопинг-тур'
  },
  {
    id: 'nkys-scarf',
    title: 'Фиолетовый шарф NKYS Violet Scarf',
    description: 'Длинный (224 см) шарф для нищевых модников от бренда .solutions',
    url: 'https://www.nobody.solutions/product/nkys-violet-scarf',
    image: 'https://postimg.cc/v42m2MWM',
    category: 'Шмот',
    badge: 'Эксклюзив',
    priceTag: 'Уют и тепло'
  },

  // CATEGORY 2: Красота, Релакс и Здоровье
  {
    id: 'massage-mattress',
    title: 'Массажный матрас с подогревом',
    description: 'Электрический матрас из экокожи с подогревом и 9 программами массажа для всего тела, а также подушкой для шеи.',
    url: 'https://ozon.ru/t/QiLY01y',
    image: 'https://postimg.cc/qNvRGgCM',
    category: 'Чилл',
    badge: 'Релакс',
    priceTag: 'СПА дома'
  },
  {
    id: 'massage-collar',
    title: 'Массажер для шеи и плеч GrossFit RL-2200',
    description: 'Портативный аккумуляторный массажер с инфракрасным подогревом. Имитирует ручной массаж Шиацу, отлично снимая напряжение.',
    url: 'https://ozon.ru/t/zMs36QD',
    image: 'https://postimg.cc/K1pYpFnX',
    category: 'Чилл',
    badge: 'Must Have',
    priceTag: 'Антистресс'
  },
  {
    id: 'primorskie-bani',
    title: 'Клубная карта в «Приморских банях»',
    description: 'Клубная карта для отдыха в банном клубе в СПб: бассейны, джакузи, хаммам, спа-процедуры и ресторан.',
    url: 'https://primorskiebani.ru/',
    image: 'https://postimg.cc/5X20mjFx',
    category: 'Чилл',
    badge: 'Премиум',
    priceTag: 'Идеальный день'
  },

  // CATEGORY 3: Уют, Хобби и Путешествия
  {
    id: 'mini-projector',
    title: 'Мини-проектор для фильмов (Android 12)',
    description: 'Компактный смарт-проектор с поддержкой Wi-Fi 6 и Bluetooth 5.0 для создания атмосферных домашних киновечеров.',
    url: 'https://market.yandex.ru/card/proyektor-dlya-filmov-wi-fi6-bluetooth-50-android-12-1280x600-full-hd-4k-mini-proyektor-dlya-telefona/5477531052',
    image: 'https://postimg.cc/mPprpRQB',
    category: 'Другое',
    badge: 'Гаджеты',
    priceTag: 'Кинотеатр'
  },
  {
    id: 'valyanie-pridurok',
    title: 'Творческий бокс для валяния «Придурок»',
    description: 'Набор для сухого валяния из шерсти, чтобы своими руками создать забавного персонажа. В комплекте видеоинструкция.',
    url: 'https://murmurizm.com/mk/tproduct/119475212102-boks-dlya-valyaniya-pridurok?utm_source=inst_highlights',
    image: 'https://postimg.cc/hXZGZgVk',
    category: 'Другое',
    badge: 'Творчество',
    priceTag: 'Своими руками'
  },
  {
    id: 'taburet-backpack',
    title: 'Складной табурет-рюкзак',
    description: 'Практичный рюкзак-трансформер для пикников, который легким движением превращается в прочный и удобный табурет.',
    url: 'https://market.yandex.ru/card/iznosostoykiy-skladnoy-taburet-ryukzak-prochnyy-nesushchiy-sportivnyy-skladnoy-stul-sumka-cherez-plecho-penal-taburet/4581271325',
    image: 'https://postimg.cc/PCVqVhmd',
    category: 'Другое',
    badge: 'Походы',
    priceTag: 'Пикник с уютом'
  }
];
