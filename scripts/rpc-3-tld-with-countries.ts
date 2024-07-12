import { Knex } from "knex";

import { populate } from "./utils";

const COUNTRY_WITH_TLD = [
  {
    extension: "tld",
    country: "Afghanistan",
  },
  {
    extension: ".af",
    country: "Åland",
  },
  {
    extension: ".ax",
    country: "Albania",
  },
  {
    extension: ".al",
    country: "Algeria",
  },
  {
    extension: ".dz",
    country: "American Samoa",
  },
  {
    extension: ".as",
    country: "Andorra",
  },
  {
    extension: ".ad",
    country: "Angola",
  },
  {
    extension: ".ao",
    country: "Anguilla",
  },
  {
    extension: ".ai",
    country: "Antarctica",
  },
  {
    extension: ".aq",
    country: "Antigua and Barbuda",
  },
  {
    extension: ".ag",
    country: "Argentina",
  },
  {
    extension: ".ar",
    country: "Armenia",
  },
  {
    extension: ".am",
    country: "Aruba",
  },
  {
    extension: ".aw",
    country: "Ascension Island",
  },
  {
    extension: ".ac",
    country: "Australia",
  },
  {
    extension: ".au",
    country: "Austria",
  },
  {
    extension: ".at",
    country: "Azerbaijan",
  },
  {
    extension: ".az",
    country: "Bahamas",
  },
  {
    extension: ".bs",
    country: "Bahrain",
  },
  {
    extension: ".bh",
    country: "Bangladesh",
  },
  {
    extension: ".bd",
    country: "Barbados",
  },
  {
    extension: ".bb",
    country: "Basque Country",
  },
  {
    extension: ".eus",
    country: "Belarus",
  },
  {
    extension: ".by",
    country: "Belgium",
  },
  {
    extension: ".be",
    country: "Belize",
  },
  {
    extension: ".bz",
    country: "Benin",
  },
  {
    extension: ".bj",
    country: "Bermuda",
  },
  {
    extension: ".bm",
    country: "Bhutan",
  },
  {
    extension: ".bt",
    country: "Bolivia",
  },
  {
    extension: ".bo",
    country: "Bonaire",
  },
  {
    extension: ".bq",
    country: "Bonaire",
  },
  {
    extension: ".ba",
    country: "Botswana",
  },
  {
    extension: ".bw",
    country: "Bouvet Island",
  },
  {
    extension: ".bv",
    country: "Brazil",
  },
  {
    extension: ".br",
    country: "British Indian Ocean Territory",
  },
  {
    extension: ".io",
    country: "British Virgin Islands",
  },
  {
    extension: ".vg",
    country: "Brunei",
  },
  {
    extension: ".bn",
    country: "Bulgaria",
  },
  {
    extension: ".bg",
    country: "Burkina Faso",
  },
  {
    extension: ".bf",
    country: "Burma (officially: Myanmar)",
  },
  {
    extension: ".bi",
    country: "Cambodia",
  },
  {
    extension: ".kh",
    country: "Cameroon",
  },
  {
    extension: ".cm",
    country: "Canada",
  },
  {
    extension: ".ca",
    country: "Cape Verde (in Portuguese: Cabo Verde)",
  },
  {
    extension: ".cv",
    country: "Catalonia",
  },
  {
    extension: ".cat",
    country: "Cayman Islands",
  },
  {
    extension: ".ky",
    country: "Central African Republic",
  },
  {
    extension: ".cf",
    country: "Chad",
  },
  {
    extension: ".td",
    country: "Chile",
  },
  {
    extension: ".cl",
    country: "China",
  },
  {
    extension: ".cn",
    country: "Christmas Island",
  },
  {
    extension: ".cx",
    country: "Cocos (Keeling) Islands",
  },
  {
    extension: ".cc",
    country: "Colombia",
  },
  {
    extension: ".co",
    country: "Comoros",
  },
  {
    extension: ".km",
    country: "Congo",
  },
  {
    extension: ".cd",
    country: "Congo",
  },
  {
    extension: ".cg",
    country: "Cook Islands",
  },
  {
    extension: ".ck",
    country: "Costa Rica",
  },
  {
    extension: ".cr",
    country: "Côte d’Ivoire (Ivory Coast)",
  },
  {
    extension: ".ci",
    country: "Croatia",
  },
  {
    extension: ".hr",
    country: "Cuba",
  },
  {
    extension: ".cu",
    country: "Curaçao",
  },
  {
    extension: ".cw",
    country: "Cyprus",
  },
  {
    extension: ".cy",
    country: "Czechia (Czech Republic)",
  },
  {
    extension: ".cz",
    country: "Denmark",
  },
  {
    extension: ".dk",
    country: "Djibouti",
  },
  {
    extension: ".dj",
    country: "Dominica",
  },
  {
    extension: ".dm",
    country: "Dominican Republic",
  },
  {
    extension: ".do",
    country: "East Timor (Timor-Leste)",
  },
  {
    extension: ".tl",
    country: "East Timor (Timor-Leste)",
  },
  {
    extension: ".tp",
    country: "Ecuador",
  },
  {
    extension: ".ec",
    country: "Egypt",
  },
  {
    extension: ".eg",
    country: "El Salvador",
  },
  {
    extension: ".sv",
    country: "Equatorial Guinea",
  },
  {
    extension: ".gq",
    country: "Eritrea",
  },
  {
    extension: ".er",
    country: "Estonia",
  },
  {
    extension: ".ee",
    country: "Ethiopia",
  },
  {
    extension: ".et",
    country: "European Union",
  },
  {
    extension: ".eu",
    country: "Falkland Islands",
  },
  {
    extension: ".fk",
    country: "Faeroe Islands",
  },
  {
    extension: ".fo",
    country: "Federated States of Micronesia",
  },
  {
    extension: ".fm",
    country: "Fiji",
  },
  {
    extension: ".fj",
    country: "Finland",
  },
  {
    extension: ".fi",
    country: "France",
  },
  {
    extension: ".gf",
    country: "French Polynesia",
  },
  {
    extension: ".pf",
    country: "French Southern and Antarctic Lands",
  },
  {
    extension: ".tf",
    country: "Gabon (officially: Gabonese Republic)",
  },
  {
    extension: ".ga",
    country: "Galicia",
  },
  {
    extension: ".gal",
    country: "Gambia",
  },
  {
    extension: ".gm",
    country: "Gaza Strip (Gaza)",
  },
  {
    extension: ".ps",
    country: "Georgia",
  },
  {
    extension: ".ge",
    country: "Germany",
  },
  {
    extension: ".de",
    country: "Ghana",
  },
  {
    extension: ".gh",
    country: "Gibraltar",
  },
  {
    extension: ".gi",
    country: "Greece",
  },
  {
    extension: ".gr",
    country: "Greenland",
  },
  {
    extension: ".gl",
    country: "Grenada",
  },
  {
    extension: ".gd",
    country: "Guadeloupe",
  },
  {
    extension: ".gp",
    country: "Guam",
  },
  {
    extension: ".gu",
    country: "Guatemala",
  },
  {
    extension: ".gt",
    country: "Guernsey",
  },
  {
    extension: ".gg",
    country: "Guinea",
  },
  {
    extension: ".gn",
    country: "Guinea-Bissau",
  },
  {
    extension: ".gw",
    country: "Guyana",
  },
  {
    extension: ".gy",
    country: "Haiti",
  },
  {
    extension: ".ht",
    country: "Heard Island and McDonald Islands",
  },
  {
    extension: ".hm",
    country: "Honduras",
  },
  {
    extension: ".hn",
    country: "Hong Kong",
  },
  {
    extension: ".hk",
    country: "Hungary",
  },
  {
    extension: ".hu",
    country: "Iceland",
  },
  {
    extension: ".is",
    country: "India",
  },
  {
    extension: ".in",
    country: "Indonesia",
  },
  {
    extension: ".id",
    country: "Iran",
  },
  {
    extension: ".ir",
    country: "Iraq",
  },
  {
    extension: ".iq",
    country: "Ireland",
  },
  {
    extension: ".ie",
    country: "Isle of Man",
  },
  {
    extension: ".im",
    country: "Israel",
  },
  {
    extension: ".il",
    country: "Italy",
  },
  {
    extension: ".it",
    country: "Jamaica",
  },
  {
    extension: ".jm",
    country: "Japan",
  },
  {
    extension: ".jp",
    country: "Jersey",
  },
  {
    extension: ".je",
    country: "Jordan",
  },
  {
    extension: ".jo",
    country: "Kazakhstan",
  },
  {
    extension: ".kz",
    country: "Kenya",
  },
  {
    extension: ".ke",
    country: "Kiribati",
  },
  {
    extension: ".ki",
    country: "Kuwait",
  },
  {
    extension: ".kw",
    country: "Kyrgyzstan",
  },
  {
    extension: ".kg",
    country: "Laos",
  },
  {
    extension: ".la",
    country: "Latvia",
  },
  {
    extension: ".lv",
    country: "Lebanon",
  },
  {
    extension: ".lb",
    country: "Lesotho",
  },
  {
    extension: ".ls",
    country: "Liberia",
  },
  {
    extension: ".lr",
    country: "Libya",
  },
  {
    extension: ".ly",
    country: "Liechtenstein",
  },
  {
    extension: ".li",
    country: "Lithuania",
  },
  {
    extension: ".lt",
    country: "Luxembourg",
  },
  {
    extension: ".lu",
    country: "Macau",
  },
  {
    extension: ".mg",
    country: "Malawi",
  },
  {
    extension: ".mw",
    country: "Malaysia",
  },
  {
    extension: ".my",
    country: "Maldives",
  },
  {
    extension: ".mv",
    country: "Mali",
  },
  {
    extension: ".ml",
    country: "Malta",
  },
  {
    extension: ".mt",
    country: "Marshall Islands",
  },
  {
    extension: ".mh",
    country: "Martinique",
  },
  {
    extension: ".mq",
    country: "Mauritania",
  },
  {
    extension: ".mr",
    country: "Mauritius",
  },
  {
    extension: ".mu",
    country: "Mayotte",
  },
  {
    extension: ".yt",
    country: "Mexico",
  },
  {
    extension: ".mx",
    country: "Moldova",
  },
  {
    extension: ".md",
    country: "Monaco",
  },
  {
    extension: ".mc",
    country: "Mongolia",
  },
  {
    extension: ".mn",
    country: "Montenegro",
  },
  {
    extension: ".me",
    country: "Montserrat",
  },
  {
    extension: ".ms",
    country: "Morocco",
  },
  {
    extension: ".ma",
    country: "Mozambique",
  },
  {
    extension: ".mz",
    country: "Myanmar",
  },
  {
    extension: ".mm",
    country: "Namibia",
  },
  {
    extension: ".na",
    country: "Nauru",
  },
  {
    extension: ".nr",
    country: "Nepal",
  },
  {
    extension: ".np",
    country: "Netherlands",
  },
  {
    extension: ".nl",
    country: "New Caledonia",
  },
  {
    extension: ".nc",
    country: "New Zealand",
  },
  {
    extension: ".nz",
    country: "Nicaragua",
  },
  {
    extension: ".ni",
    country: "Niger",
  },
  {
    extension: ".ne",
    country: "Nigeria",
  },
  {
    extension: ".ng",
    country: "Niue",
  },
  {
    extension: ".nu",
    country: "Norfolk Island",
  },
  {
    extension: ".kp",
    country: "Northern Mariana Islands",
  },
  {
    extension: ".mp",
    country: "Norway",
  },
  {
    extension: ".no",
    country: "Oman",
  },
  {
    extension: ".om",
    country: "Pakistan",
  },
  {
    extension: ".pk",
    country: "Palau",
  },
  {
    extension: ".pw",
    country: "Palestine",
  },
  {
    extension: ".pa",
    country: "Papua New Guinea",
  },
  {
    extension: ".pg",
    country: "Paraguay",
  },
  {
    extension: ".py",
    country: "Peru",
  },
  {
    extension: ".pe",
    country: "Philippines",
  },
  {
    extension: ".ph",
    country: "Pitcairn Islands",
  },
  {
    extension: ".pn",
    country: "Poland",
  },
  {
    extension: ".pl",
    country: "Portugal",
  },
  {
    extension: ".pt",
    country: "Puerto Rico",
  },
  {
    extension: ".pr",
    country: "Qatar",
  },
  {
    extension: ".qa",
    country: "Romania",
  },
  {
    extension: ".ro",
    country: "Russia",
  },
  {
    extension: ".ru",
    country: "Rwanda",
  },
  {
    extension: ".rw",
    country: "Réunion Island",
  },
  {
    extension: ".re",
    country: "Saba",
  },
  {
    extension: ".fr",
    country: "France",
  },
  {
    extension: ".sh",
    country: "Saint Kitts and Nevis",
  },
  {
    extension: ".kn",
    country: "Saint Lucia",
  },
  {
    extension: ".lc",
    country: "Saint Martin (officially the Collectivity of Saint Martin)",
  },
  {
    extension: ".mf",
    country: "Saint Martin (officially the Collectivity of Saint Martin)",
  },
  {
    extension: ".pm",
    country: "Saint Vincent and the Grenadines",
  },
  {
    extension: ".vc",
    country: "Samoa",
  },
  {
    extension: ".ws",
    country: "San Marino",
  },
  {
    extension: ".sm",
    country: "São Tomé and Príncipe",
  },
  {
    extension: ".st",
    country: "Saudi Arabia",
  },
  {
    extension: ".sa",
    country: "Senegal",
  },
  {
    extension: ".sn",
    country: "Serbia",
  },
  {
    extension: ".rs",
    country: "Seychelles",
  },
  {
    extension: ".sc",
    country: "Sierra Leone",
  },
  {
    extension: ".sl",
    country: "Singapore",
  },
  {
    extension: ".sg",
    country: "Sint Eustatius",
  },
  {
    extension: ".sx",
    country: "Sint Maarten",
  },
  {
    extension: ".an",
    country: "Slovakia",
  },
  {
    extension: ".sk",
    country: "Slovenia",
  },
  {
    extension: ".si",
    country: "Solomon Islands",
  },
  {
    extension: ".sb",
    country: "Somalia",
  },
  {
    extension: ".so",
    country: "South Africa",
  },
  {
    extension: ".za",
    country: "South Georgia and the South Sandwich Islands",
  },
  {
    extension: ".gs",
    country: "South Korea",
  },
  {
    extension: ".kr",
    country: "South Sudan",
  },
  {
    extension: ".ss",
    country: "Spain",
  },
  {
    extension: ".es",
    country: "Sri Lanka",
  },
  {
    extension: ".lk",
    country: "Sudan",
  },
  {
    extension: ".sd",
    country: "Suriname",
  },
  {
    extension: ".sr",
    country: "Svalbard and Jan Mayen Islands",
  },
  {
    extension: ".sj",
    country: "Swaziland",
  },
  {
    extension: ".sz",
    country: "Sweden",
  },
  {
    extension: ".se",
    country: "Switzerland",
  },
  {
    extension: ".ch",
    country: "Syria",
  },
  {
    extension: ".sy",
    country: "Taiwan",
  },
  {
    extension: ".tw",
    country: "Tajikistan",
  },
  {
    extension: ".tj",
    country: "Tanzania",
  },
  {
    extension: ".tz",
    country: "Thailand",
  },
  {
    extension: ".th",
    country: "Togo",
  },
  {
    extension: ".tg",
    country: "Tokelau",
  },
  {
    extension: ".tk",
    country: "Tonga",
  },
  {
    extension: ".to",
    country: "Trinidad & Tobago",
  },
  {
    extension: ".tt",
    country: "Tunisia",
  },
  {
    extension: ".tn",
    country: "Turkey",
  },
  {
    extension: ".tr",
    country: "Turkmenistan",
  },
  {
    extension: ".tm",
    country: "Turks and Caicos Islands",
  },
  {
    extension: ".tc",
    country: "Tuvalu",
  },
  {
    extension: ".tv",
    country: "Uganda",
  },
  {
    extension: ".ug",
    country: "Ukraine",
  },
  {
    extension: ".ua",
    country: "United Arab Emirates (UAE)",
  },
  {
    extension: ".co.uk",
    country: "United Kingdom (UK)",
  },
  {
    extension: ".uk",
    country: "United States of America (USA)",
  },
  {
    extension: ".us",
    country: "United States Virgin Islands",
  },
  {
    extension: ".vi",
    country: "Uruguay",
  },
  {
    extension: ".uy",
    country: "Uzbekistan",
  },
  {
    extension: ".uz",
    country: "Vanuatu",
  },
  {
    extension: ".vu",
    country: "Vatican City",
  },
  {
    extension: ".va",
    country: "Venezuela",
  },
  {
    extension: ".ve",
    country: "Vietnam",
  },
  {
    extension: ".vn",
    country: "Wallis and Futuna",
  },
  {
    extension: ".wf",
    country: "Western Sahara",
  },
  {
    extension: ".eh",
    country: "Western Sahara",
  },
  {
    extension: ".ye",
    country: "Zambia",
  },
  {
    extension: ".zm",
    country: "Zimbabwe",
  },
];

export default async function populateCompanies(
  client: Knex,
): Promise<number[]> {
  const tableName = "countries_with_extension";

  await client.raw(`DROP TABLE IF EXISTS "${tableName}" CASCADE`);

  await client.schema.createTable(tableName, (table) => {
    table.string("country").notNullable();
    table.string("id").notNullable().primary();
  });

  return populate(client, tableName, COUNTRY_WITH_TLD.length, (i) => ({
    country: COUNTRY_WITH_TLD[i].country,
    id: COUNTRY_WITH_TLD[i].extension,
  }));
}
