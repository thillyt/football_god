import Base "../../backend/types/base_types";

module Countries {

  public let countries : [Base.Country] = [
    { id = 1; name = "Afghanistan"; code = "AF" },
    { id = 2; name = "Albania"; code = "AL" },
    { id = 3; name = "Algeria"; code = "DZ" },
    { id = 4; name = "Andorra"; code = "AD" },
    { id = 5; name = "Angola"; code = "AO" },
    { id = 6; name = "Antigua and Barbuda"; code = "AG" },
    { id = 7; name = "Argentina"; code = "AR" },
    { id = 8; name = "Armenia"; code = "AM" },
    { id = 9; name = "Australia"; code = "AU" },
    { id = 10; name = "Austria"; code = "AT" },
    { id = 11; name = "Azerbaijan"; code = "AZ" },
    { id = 12; name = "Bahamas"; code = "BS" },
    { id = 13; name = "Bahrain"; code = "BH" },
    { id = 14; name = "Bangladesh"; code = "BD" },
    { id = 15; name = "Barbados"; code = "BB" },
    { id = 16; name = "Belarus"; code = "BY" },
    { id = 17; name = "Belgium"; code = "BE" },
    { id = 18; name = "Belize"; code = "BZ" },
    { id = 19; name = "Benin"; code = "BJ" },
    { id = 20; name = "Bhutan"; code = "BT" },
    { id = 21; name = "Bolivia"; code = "BO" },
    { id = 22; name = "Bosnia and Herzegovina"; code = "BA" },
    { id = 23; name = "Botswana"; code = "BW" },
    { id = 24; name = "Brazil"; code = "BR" },
    { id = 25; name = "Brunei"; code = "BN" },
    { id = 26; name = "Bulgaria"; code = "BG" },
    { id = 27; name = "Burkina Faso"; code = "BF" },
    { id = 28; name = "Burundi"; code = "BI" },
    { id = 29; name = "Cabo Verde"; code = "CV" },
    { id = 30; name = "Cambodia"; code = "KH" },
    { id = 31; name = "Cameroon"; code = "CM" },
    { id = 32; name = "Canada"; code = "CA" },
    { id = 33; name = "Central African Republic"; code = "CF" },
    { id = 34; name = "Chad"; code = "TD" },
    { id = 35; name = "Chile"; code = "CL" },
    { id = 36; name = "China"; code = "CN" },
    { id = 37; name = "Colombia"; code = "CO" },
    { id = 38; name = "Comoros"; code = "KM" },
    { id = 39; name = "Congo, Democratic Republic of the"; code = "CD" },
    { id = 40; name = "Congo, Republic of the"; code = "CG" },
    { id = 41; name = "Costa Rica"; code = "CR" },
    { id = 42; name = "Cote d'Ivoire"; code = "CI" },
    { id = 43; name = "Croatia"; code = "HR" },
    { id = 44; name = "Cuba"; code = "CU" },
    { id = 45; name = "Cyprus"; code = "CY" },
    { id = 46; name = "Czech Republic"; code = "CZ" },
    { id = 47; name = "Denmark"; code = "DK" },
    { id = 48; name = "Djibouti"; code = "DJ" },
    { id = 49; name = "Dominica"; code = "DM" },
    { id = 50; name = "Dominican Republic"; code = "DO" },
    { id = 51; name = "Ecuador"; code = "EC" },
    { id = 52; name = "Egypt"; code = "EG" },
    { id = 53; name = "El Salvador"; code = "SV" },
    { id = 54; name = "Equatorial Guinea"; code = "GQ" },
    { id = 55; name = "Eritrea"; code = "ER" },
    { id = 56; name = "Estonia"; code = "EE" },
    { id = 57; name = "Eswatini"; code = "SZ" },
    { id = 58; name = "Ethiopia"; code = "ET" },
    { id = 59; name = "Fiji"; code = "FJ" },
    { id = 60; name = "Finland"; code = "FI" },
    { id = 61; name = "France"; code = "FR" },
    { id = 62; name = "Gabon"; code = "GA" },
    { id = 63; name = "Gambia"; code = "GM" },
    { id = 64; name = "Georgia"; code = "GE" },
    { id = 65; name = "Germany"; code = "DE" },
    { id = 66; name = "Ghana"; code = "GH" },
    { id = 67; name = "Greece"; code = "GR" },
    { id = 68; name = "Grenada"; code = "GD" },
    { id = 69; name = "Guatemala"; code = "GT" },
    { id = 70; name = "Guinea"; code = "GN" },
    { id = 71; name = "Guinea-Bissau"; code = "GW" },
    { id = 72; name = "Guyana"; code = "GY" },
    { id = 73; name = "Haiti"; code = "HT" },
    { id = 74; name = "Honduras"; code = "HN" },
    { id = 75; name = "Hungary"; code = "HU" },
    { id = 76; name = "Iceland"; code = "IS" },
    { id = 77; name = "India"; code = "IN" },
    { id = 78; name = "Indonesia"; code = "ID" },
    { id = 79; name = "Iran"; code = "IR" },
    { id = 80; name = "Iraq"; code = "IQ" },
    { id = 81; name = "Ireland"; code = "IE" },
    { id = 82; name = "Israel"; code = "IL" },
    { id = 83; name = "Italy"; code = "IT" },
    { id = 84; name = "Jamaica"; code = "JM" },
    { id = 85; name = "Japan"; code = "JP" },
    { id = 86; name = "Jordan"; code = "JO" },
    { id = 87; name = "Kazakhstan"; code = "KZ" },
    { id = 88; name = "Kenya"; code = "KE" },
    { id = 89; name = "Kiribati"; code = "KI" },
    { id = 90; name = "Korea, North"; code = "KP" },
    { id = 91; name = "Korea, South"; code = "KR" },
    { id = 92; name = "Kosovo"; code = "XK" },
    { id = 93; name = "Kuwait"; code = "KW" },
    { id = 94; name = "Kyrgyzstan"; code = "KG" },
    { id = 95; name = "Laos"; code = "LA" },
    { id = 96; name = "Latvia"; code = "LV" },
    { id = 97; name = "Lebanon"; code = "LB" },
    { id = 98; name = "Lesotho"; code = "LS" },
    { id = 99; name = "Liberia"; code = "LR" },
    { id = 100; name = "Libya"; code = "LY" },
    { id = 101; name = "Liechtenstein"; code = "LI" },
    { id = 102; name = "Lithuania"; code = "LT" },
    { id = 103; name = "Luxembourg"; code = "LU" },
    { id = 104; name = "Madagascar"; code = "MG" },
    { id = 105; name = "Malawi"; code = "MW" },
    { id = 106; name = "Malaysia"; code = "MY" },
    { id = 107; name = "Maldives"; code = "MV" },
    { id = 108; name = "Mali"; code = "ML" },
    { id = 109; name = "Malta"; code = "MT" },
    { id = 110; name = "Marshall Islands"; code = "MH" },
    { id = 111; name = "Mauritania"; code = "MR" },
    { id = 112; name = "Mauritius"; code = "MU" },
    { id = 113; name = "Mexico"; code = "MX" },
    { id = 114; name = "Micronesia"; code = "FM" },
    { id = 115; name = "Moldova"; code = "MD" },
    { id = 116; name = "Monaco"; code = "MC" },
    { id = 117; name = "Mongolia"; code = "MN" },
    { id = 118; name = "Montenegro"; code = "ME" },
    { id = 119; name = "Morocco"; code = "MA" },
    { id = 120; name = "Mozambique"; code = "MZ" },
    { id = 121; name = "Myanmar"; code = "MM" },
    { id = 122; name = "Namibia"; code = "NA" },
    { id = 123; name = "Nauru"; code = "NR" },
    { id = 124; name = "Nepal"; code = "NP" },
    { id = 125; name = "Netherlands"; code = "NL" },
    { id = 126; name = "New Zealand"; code = "NZ" },
    { id = 127; name = "Nicaragua"; code = "NI" },
    { id = 128; name = "Niger"; code = "NE" },
    { id = 129; name = "Nigeria"; code = "NG" },
    { id = 130; name = "North Macedonia"; code = "MK" },
    { id = 131; name = "Norway"; code = "NO" },
    { id = 132; name = "Oman"; code = "OM" },
    { id = 133; name = "Pakistan"; code = "PK" },
    { id = 134; name = "Palau"; code = "PW" },
    { id = 135; name = "Panama"; code = "PA" },
    { id = 136; name = "Papua New Guinea"; code = "PG" },
    { id = 137; name = "Paraguay"; code = "PY" },
    { id = 138; name = "Peru"; code = "PE" },
    { id = 139; name = "Philippines"; code = "PH" },
    { id = 140; name = "Poland"; code = "PL" },
    { id = 141; name = "Portugal"; code = "PT" },
    { id = 142; name = "Qatar"; code = "QA" },
    { id = 143; name = "Romania"; code = "RO" },
    { id = 144; name = "Russia"; code = "RU" },
    { id = 145; name = "Rwanda"; code = "RW" },
    { id = 146; name = "Saint Kitts and Nevis"; code = "KN" },
    { id = 147; name = "Saint Lucia"; code = "LC" },
    { id = 148; name = "Saint Vincent and the Grenadines"; code = "VC" },
    { id = 149; name = "Samoa"; code = "WS" },
    { id = 150; name = "San Marino"; code = "SM" },
    { id = 151; name = "Sao Tome and Principe"; code = "ST" },
    { id = 152; name = "Saudi Arabia"; code = "SA" },
    { id = 153; name = "Senegal"; code = "SN" },
    { id = 154; name = "Serbia"; code = "RS" },
    { id = 155; name = "Seychelles"; code = "SC" },
    { id = 156; name = "Sierra Leone"; code = "SL" },
    { id = 157; name = "Singapore"; code = "SG" },
    { id = 158; name = "Slovakia"; code = "SK" },
    { id = 159; name = "Slovenia"; code = "SI" },
    { id = 160; name = "Solomon Islands"; code = "SB" },
    { id = 161; name = "Somalia"; code = "SO" },
    { id = 162; name = "South Africa"; code = "ZA" },
    { id = 163; name = "South Sudan"; code = "SS" },
    { id = 164; name = "Spain"; code = "ES" },
    { id = 165; name = "Sri Lanka"; code = "LK" },
    { id = 166; name = "Sudan"; code = "SD" },
    { id = 167; name = "Suriname"; code = "SR" },
    { id = 168; name = "Sweden"; code = "SE" },
    { id = 169; name = "Switzerland"; code = "CH" },
    { id = 170; name = "Syria"; code = "SY" },
    { id = 171; name = "Taiwan"; code = "TW" },
    { id = 172; name = "Tajikistan"; code = "TJ" },
    { id = 173; name = "Tanzania"; code = "TZ" },
    { id = 174; name = "Thailand"; code = "TH" },
    { id = 175; name = "Timor-Leste"; code = "TL" },
    { id = 176; name = "Togo"; code = "TG" },
    { id = 177; name = "Tonga"; code = "TO" },
    { id = 178; name = "Trinidad and Tobago"; code = "TT" },
    { id = 179; name = "Tunisia"; code = "TN" },
    { id = 180; name = "Turkey"; code = "TR" },
    { id = 181; name = "Turkmenistan"; code = "TM" },
    { id = 182; name = "Tuvalu"; code = "TV" },
    { id = 183; name = "Uganda"; code = "UG" },
    { id = 184; name = "Ukraine"; code = "UA" },
    { id = 185; name = "United Arab Emirates"; code = "AE" },
    { id = 186; name = "England"; code = "Eng" },
    { id = 187; name = "United States"; code = "US" },
    { id = 188; name = "Uruguay"; code = "UY" },
    { id = 189; name = "Uzbekistan"; code = "UZ" },
    { id = 190; name = "Vanuatu"; code = "VU" },
    { id = 191; name = "Vatican City"; code = "VA" },
    { id = 192; name = "Venezuela"; code = "VE" },
    { id = 193; name = "Vietnam"; code = "VN" },
    { id = 194; name = "Yemen"; code = "YE" },
    { id = 195; name = "Zambia"; code = "ZM" },
    { id = 196; name = "Zimbabwe"; code = "ZW" },
    { id = 197; name = "Scotland"; code = "Sco" },
    { id = 198; name = "Wales"; code = "Wal" },
    { id = 199; name = "Northern Ireland"; code = "Nor" },
  ];
};
