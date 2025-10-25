export const currencySigns: { [key: string]: string } = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  CNY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  SEK: "kr",
  NZD: "NZ$",
  SGD: "S$",
  HKD: "HK$",
  ZAR: "R",
  AED: "د.إ",
  SAR: "﷼",
  KRW: "₩",
  THB: "฿",
  RUB: "₽",
  BRL: "R$",
  MXN: "Mex$",
  TRY: "₺",
};

export type AirlineNamedLogo = {
  iata: string;
  name: string;
  logo: string;
};

export const airlineNamedLogos = [
  {
    iata: "VS",
    name: "Virgin Atlantic Airways",
    logo: "https://airhex.com/images/airline-logos/alt/virgin-atlantic.png",
  },
  {
    iata: "GP",
    name: "APG Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/apg-airlines.png",
  },
  {
    iata: "HR",
    name: "Hahn Air",
    logo: "https://airhex.com/images/airline-logos/alt/hahn-air.png",
  },
  {
    iata: "AI",
    name: "Air India",
    logo: "https://airhex.com/images/airline-logos/alt/air-india.png",
  },
  {
    iata: "6E",
    name: "IndiGo",
    logo: "https://airhex.com/images/airline-logos/alt/indigo.png",
  },
  {
    iata: "UK",
    name: "Vistara",
    logo: "https://airhex.com/images/airline-logos/alt/vistara.png",
  },
  {
    iata: "G8",
    name: "Go First",
    logo: "https://airhex.com/images/airline-logos/alt/go-first.png",
  },
  {
    iata: "IX",
    name: "Air India Express",
    logo: "https://airhex.com/images/airline-logos/alt/air-india-express.png",
  },
  {
    iata: "SG",
    name: "SpiceJet",
    logo: "https://airhex.com/images/airline-logos/alt/spicejet.png",
  },
  {
    iata: "I5",
    name: "AirAsia India",
    logo: "https://airhex.com/images/airline-logos/alt/airasia.png",
  },
  {
    iata: "9W",
    name: "Jet Airways",
    logo: "https://airhex.com/images/airline-logos/alt/jet-airways.png",
  },
  {
    iata: "QR",
    name: "Qatar Airways",
    logo: "https://airhex.com/images/airline-logos/alt/qatar-airways.png",
  },
  {
    iata: "EK",
    name: "Emirates",
    logo: "https://airhex.com/images/airline-logos/alt/emirates.png",
  },
  {
    iata: "EY",
    name: "Etihad Airways",
    logo: "https://airhex.com/images/airline-logos/alt/etihad-airways.png",
  },
  {
    iata: "GF",
    name: "Gulf Air",
    logo: "https://airhex.com/images/airline-logos/alt/gulf-air.png",
  },
  {
    iata: "SV",
    name: "Saudia",
    logo: "https://airhex.com/images/airline-logos/alt/saudia.png",
  },
  {
    iata: "RJ",
    name: "Royal Jordanian",
    logo: "https://airhex.com/images/airline-logos/alt/royal-jordanian.png",
  },
  {
    iata: "TK",
    name: "Turkish Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/turkish-airlines.png",
  },
  {
    iata: "LH",
    name: "Lufthansa",
    logo: "https://airhex.com/images/airline-logos/alt/lufthansa.png",
  },
  {
    iata: "LX",
    name: "Swiss International Air Lines",
    logo: "https://airhex.com/images/airline-logos/alt/swiss.png",
  },
  {
    iata: "OS",
    name: "Austrian Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/austrian-airlines.png",
  },
  {
    iata: "AF",
    name: "Air France",
    logo: "https://airhex.com/images/airline-logos/alt/air-france.png",
  },
  {
    iata: "KL",
    name: "KLM Royal Dutch Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/klm.png",
  },
  {
    iata: "BA",
    name: "British Airways",
    logo: "https://airhex.com/images/airline-logos/alt/british-airways.png",
  },
  {
    iata: "IB",
    name: "Iberia",
    logo: "https://airhex.com/images/airline-logos/alt/iberia.png",
  },
  {
    iata: "UX",
    name: "Air Europa",
    logo: "https://airhex.com/images/airline-logos/alt/air-europa.png",
  },
  {
    iata: "SK",
    name: "Scandinavian Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/sas.png",
  },
  {
    iata: "DY",
    name: "Norwegian Air Shuttle",
    logo: "https://airhex.com/images/airline-logos/alt/norwegian.png",
  },
  {
    iata: "AY",
    name: "Finnair",
    logo: "https://airhex.com/images/airline-logos/alt/finnair.png",
  },
  {
    iata: "SU",
    name: "Aeroflot",
    logo: "https://airhex.com/images/airline-logos/alt/aeroflot.png",
  },
  {
    iata: "LO",
    name: "LOT Polish Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/lot.png",
  },
  {
    iata: "AZ",
    name: "ITA Airways",
    logo: "https://airhex.com/images/airline-logos/alt/ita-airways.png",
  },
  {
    iata: "A3",
    name: "Aegean Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/aegean.png",
  },
  {
    iata: "U2",
    name: "easyJet",
    logo: "https://airhex.com/images/airline-logos/alt/easyjet.png",
  },
  {
    iata: "FR",
    name: "Ryanair",
    logo: "https://airhex.com/images/airline-logos/alt/ryanair.png",
  },
  {
    iata: "VY",
    name: "Vueling Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/vueling.png",
  },
  {
    iata: "TK",
    name: "Turkish Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/turkish-airlines.png",
  },
  {
    iata: "QR",
    name: "Qatar Airways",
    logo: "https://airhex.com/images/airline-logos/alt/qatar-airways.png",
  },
  {
    iata: "CX",
    name: "Cathay Pacific",
    logo: "https://airhex.com/images/airline-logos/alt/cathay-pacific.png",
  },
  {
    iata: "SQ",
    name: "Singapore Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/singapore-airlines.png",
  },
  {
    iata: "MH",
    name: "Malaysia Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/malaysia-airlines.png",
  },
  {
    iata: "TG",
    name: "Thai Airways",
    logo: "https://airhex.com/images/airline-logos/alt/thai-airways.png",
  },
  {
    iata: "VN",
    name: "Vietnam Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/vietnam-airlines.png",
  },
  {
    iata: "JL",
    name: "Japan Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/japan-airlines.png",
  },
  {
    iata: "NH",
    name: "All Nippon Airways",
    logo: "https://airhex.com/images/airline-logos/alt/ana.png",
  },
  {
    iata: "KE",
    name: "Korean Air",
    logo: "https://airhex.com/images/airline-logos/alt/korean-air.png",
  },
  {
    iata: "OZ",
    name: "Asiana Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/asiana.png",
  },
  {
    iata: "CI",
    name: "China Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/china-airlines.png",
  },
  {
    iata: "CA",
    name: "Air China",
    logo: "https://airhex.com/images/airline-logos/alt/air-china.png",
  },
  {
    iata: "MU",
    name: "China Eastern Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/china-eastern.png",
  },
  {
    iata: "CZ",
    name: "China Southern Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/china-southern.png",
  },
  {
    iata: "BR",
    name: "EVA Air",
    logo: "https://airhex.com/images/airline-logos/alt/eva-air.png",
  },
  {
    iata: "CI",
    name: "China Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/china-airlines.png",
  },
  {
    iata: "CX",
    name: "Cathay Pacific",
    logo: "https://airhex.com/images/airline-logos/alt/cathay-pacific.png",
  },
  {
    iata: "UA",
    name: "United Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/united-airlines.png",
  },
  {
    iata: "AA",
    name: "American Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/american-airlines.png",
  },
  {
    iata: "DL",
    name: "Delta Air Lines",
    logo: "https://airhex.com/images/airline-logos/alt/delta.png",
  },
  {
    iata: "WN",
    name: "Southwest Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/southwest.png",
  },
  {
    iata: "AS",
    name: "Alaska Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/alaska.png",
  },
  {
    iata: "B6",
    name: "JetBlue",
    logo: "https://airhex.com/images/airline-logos/alt/jetblue.png",
  },
  {
    iata: "F9",
    name: "Frontier Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/frontier.png",
  },
  {
    iata: "NK",
    name: "Spirit Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/spirit.png",
  },
  {
    iata: "WS",
    name: "WestJet",
    logo: "https://airhex.com/images/airline-logos/alt/westjet.png",
  },
  {
    iata: "AC",
    name: "Air Canada",
    logo: "https://airhex.com/images/airline-logos/alt/air-canada.png",
  },
  {
    iata: "LA",
    name: "LATAM Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/latam.png",
  },
  {
    iata: "AV",
    name: "Avianca",
    logo: "https://airhex.com/images/airline-logos/alt/avianca.png",
  },
  {
    iata: "CM",
    name: "Copa Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/copa.png",
  },
  {
    iata: "AM",
    name: "Aeroméxico",
    logo: "https://airhex.com/images/airline-logos/alt/aeromexico.png",
  },
  {
    iata: "AR",
    name: "Aerolineas Argentinas",
    logo: "https://airhex.com/images/airline-logos/alt/aerolineas-argentinas.png",
  },
  {
    iata: "JJ",
    name: "TAM Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/tam.png",
  },
  {
    iata: "NZ",
    name: "Air New Zealand",
    logo: "https://airhex.com/images/airline-logos/alt/air-new-zealand.png",
  },
  {
    iata: "VA",
    name: "Virgin Australia",
    logo: "https://airhex.com/images/airline-logos/alt/virgin-australia.png",
  },
  {
    iata: "JQ",
    name: "Jetstar Airways",
    logo: "https://airhex.com/images/airline-logos/alt/jetstar.png",
  },
  {
    iata: "QF",
    name: "Qantas",
    logo: "https://airhex.com/images/airline-logos/alt/qantas.png",
  },
  {
    iata: "FI",
    name: "Icelandair",
    logo: "https://airhex.com/images/airline-logos/alt/icelandair.png",
  },
  {
    iata: "TP",
    name: "TAP Air Portugal",
    logo: "https://airhex.com/images/airline-logos/alt/tap-air-portugal.png",
  },
  {
    iata: "PS",
    name: "Ukraine International Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/ukraine-international.png",
  },
  {
    iata: "RO",
    name: "TAROM",
    logo: "https://airhex.com/images/airline-logos/alt/tarom.png",
  },
  {
    iata: "SN",
    name: "Brussels Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/brussels.png",
  },
  {
    iata: "HV",
    name: "Transavia",
    logo: "https://airhex.com/images/airline-logos/alt/transavia.png",
  },
  {
    iata: "PC",
    name: "Pegasus Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/pegasus.png",
  },
  {
    iata: "FZ",
    name: "Flydubai",
    logo: "https://airhex.com/images/airline-logos/alt/flydubai.png",
  },
  {
    iata: "W6",
    name: "Wizz Air",
    logo: "https://airhex.com/images/airline-logos/alt/wizz-air.png",
  },
  {
    iata: "XY",
    name: "Flynas",
    logo: "https://airhex.com/images/airline-logos/alt/flynas.png",
  },
  {
    iata: "SV",
    name: "Saudia",
    logo: "https://airhex.com/images/airline-logos/alt/saudia.png",
  },
  {
    iata: "KU",
    name: "Kuwait Airways",
    logo: "https://airhex.com/images/airline-logos/alt/kuwait-airways.png",
  },
  {
    iata: "ME",
    name: "Middle East Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/mea.png",
  },
  {
    iata: "MS",
    name: "EgyptAir",
    logo: "https://airhex.com/images/airline-logos/alt/egyptair.png",
  },
  {
    iata: "ET",
    name: "Ethiopian Airlines",
    logo: "https://airhex.com/images/airline-logos/alt/ethiopian.png",
  },
  {
    iata: "KQ",
    name: "Kenya Airways",
    logo: "https://airhex.com/images/airline-logos/alt/kenya-airways.png",
  },
  {
    iata: "SA",
    name: "South African Airways",
    logo: "https://airhex.com/images/airline-logos/alt/south-african.png",
  },
];
