// api/translate.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text, targetLang } = req.body;

    // 调用开源翻译 API（LibreTranslate）
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang || "zh"
      })
    });

    const data = await response.json();

    res.status(200).json({ translated: data.translatedText });
  } catch (err) {
    console.error("翻译出错:", err);
    res.status(500).json({ error: "翻译失败" });
  }
}
