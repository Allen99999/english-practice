/* ===== 網站設定（部署時由 Claude Code 填入） ===== */
const SITE_CONFIG = {
  // Google Apps Script 網頁應用程式的網址（https://script.google.com/macros/s/.../exec）
  SYNC_URL: "https://script.google.com/macros/s/AKfycbxUOJh6cY5d-FLqT1JgWKAulP2mtr1Pw40fBy8nXt7kFCy-PCB2GNrgOaL4-oRKi58/exec",
  // 語音（Microsoft Edge 神經語音，edge-tts 的名稱）
  TTS: {
    word: "en-US-JennyNeural",
    narrator: "en-US-AriaNeural",
    female: ["en-US-AvaNeural", "en-US-EmmaNeural"],
    male: ["en-US-AndrewNeural", "en-US-BrianNeural"],
    // 托福聽力：WB/MB 英國腔、WA/MA 澳洲腔、WC/MC 加拿大腔（script 裡用 "WB: " 這種標記）
    accents: {
      B: { female: ["en-GB-SoniaNeural", "en-GB-LibbyNeural"], male: ["en-GB-RyanNeural", "en-GB-ThomasNeural"] },
      A: { female: ["en-AU-NatashaNeural"], male: ["en-AU-WilliamMultilingualNeural"] },
      C: { female: ["en-CA-ClaraNeural"], male: ["en-CA-LiamNeural"] }
    }
  }
};
