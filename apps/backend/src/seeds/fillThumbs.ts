/**
 * fillThumbs.ts
 * Prints thumb URLs for your seed games — no API call needed.
 * Usage: npx tsx src/seeds/fillThumbs.ts
 */

const steamAppIds: Record<string, number> = {
  "Minecraft": 1140190,
  "Grand Theft Auto V": 271590,
  "Red Dead Redemption 2": 1174180,
  "PUBG: Battlegrounds": 578080,
  "Terraria": 105600,
  "The Witcher 3: Wild Hunt": 292030,
  "Call of Duty: Modern Warfare": 393080,
  "The Elder Scrolls V: Skyrim": 489830,
  "Counter-Strike: Global Offensive": 730,
  "Starfield": 1716740,
  "Baldur's Gate 3": 1086940,
  "Horizon Zero Dawn": 1151640,
  "BioShock": 7670,
  "Mass Effect 2": 24980,
  "Portal 2": 620,
  "Elden Ring": 1245620,
  "Assassin's Creed Valhalla": 2208920,
  "Rocket League": 252950,
  "Cyberpunk 2077": 1091500,
  "Dead Space": 17470,
  "Final Fantasy VII Remake": 1462040,
  "Doom Eternal": 782330,
  "Resident Evil 4 Remake": 2050650,
  "Sekiro: Shadows Die Twice": 814380,
  "Persona 5 Royal": 1687950,
  "Street Fighter V": 310950,
  "Forza Horizon 5": 1551360,
  "Dragon Age: Inquisition": 1222690,
  "God of War Ragnarök": 2322010,
  "Halo: Combat Evolved": 976730,
  "Star Wars Jedi: Fallen Order": 1172380,
};

// Not on Steam — official/press URLs
const fallbackThumbs: Record<string, string> = {
  "Tetris": "https://upload.wikimedia.org/wikipedia/en/7/7c/Tetris_logo_2017.svg",
  "Wii Sports": "https://upload.wikimedia.org/wikipedia/en/f/f2/Wii_Sports_Europe.jpg",
  "Mario Kart 8 Deluxe": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000000119/a1e3c9eeceda7a0fa3cf7a1f97f1b5f13bc66db2bef52a0d32ae90b7a7e95d5d.png",
  "Super Mario Odyssey": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000001130/c42553b4f1d0b9f4f51c2b0bb38c6f9cf2f2c95b27e31cc7e4dcffbde8b5d08.png",
  "The Legend of Zelda: Breath of the Wild": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/9f4fa2df891a16e3afe5a26dc0e21f4282f8b60a68eb7e7d2985fb16f79df20a.png",
  "World of Warcraft": "https://bnetcmsus-a.akamaihd.net/cms/template_resource/BGDUN1MNKXE21502389292693.jpg",
  "League of Legends": "https://www.leagueoflegends.com/static/open-graph-2e582ae9fae8b0b396ca46ff21fd47a8.jpg",
  "Fortnite": "https://cdn2.unrealengine.com/social-image-chapter4-s3-3840x2160-d35912cc25ad.jpg",
  "Animal Crossing: New Horizons": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000025623/5a2a2cf00a53dbce0a76c3dd2eb9bbac56e2fdcab4c2c5b9a2e47ef3bb40b17.png",
  "Splatoon 3": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000053648/87a529a5c06d3a966e7dde9e76e5bcf0fd04c49fe3b5c8a8a0c4c8d3f82d2a.png",
  "The Last of Us Part II": "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/niMUubpD9GlGnAnjAsDRb6Hm.png",
  "Metroid Dread": "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000043136/a58b4d12a17da1b6e04f49e73c01b2a7c9cb9e73c4d1b3a8d5b3a7e6f4c2b1.png",
  "Overwatch": "https://blz-contentstack-images.akamaized.net/v3/assets/blt9c12f249ac15c7ec/blt77cfb4c53bce9a19/62a0685fa8f0ae3030c1e9a3/Masthead_Overwatch2.png",
};

const titles = [
  "Tetris", "Minecraft", "Grand Theft Auto V", "Wii Sports",
  "Red Dead Redemption 2", "Mario Kart 8 Deluxe", "PUBG: Battlegrounds",
  "Terraria", "The Witcher 3: Wild Hunt", "Call of Duty: Modern Warfare",
  "Fortnite", "The Elder Scrolls V: Skyrim", "Super Mario Odyssey",
  "The Legend of Zelda: Breath of the Wild", "World of Warcraft",
  "League of Legends", "Counter-Strike: Global Offensive", "Starfield",
  "Baldur's Gate 3", "Horizon Zero Dawn", "Halo: Combat Evolved",
  "BioShock", "Mass Effect 2", "Portal 2", "Elden Ring",
  "God of War Ragnarök", "Assassin's Creed Valhalla", "Overwatch",
  "Rocket League", "Cyberpunk 2077", "Animal Crossing: New Horizons",
  "Dead Space", "Final Fantasy VII Remake", "Doom Eternal",
  "Resident Evil 4 Remake", "Sekiro: Shadows Die Twice", "Persona 5 Royal",
  "Street Fighter V", "Forza Horizon 5", "Dragon Age: Inquisition",
  "Splatoon 3", "The Last of Us Part II", "Metroid Dread",
  "Star Wars Jedi: Fallen Order",
];

for (const title of titles) {
  const appid = steamAppIds[title];
  let thumb = "";

  if (appid) {
    thumb = `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
  } else if (fallbackThumbs[title]) {
    thumb = fallbackThumbs[title];
  }

  console.log(`"${title}": "${thumb}",`);
}