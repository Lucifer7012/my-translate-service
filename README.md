# Translator API (for SaleSmartly)

这是一个简易的翻译 API，基于 [LibreTranslate](https://libretranslate.com)，可以直接部署到 [Vercel](https://vercel.com)。

## 🚀 部署步骤

1. **准备仓库**
   - 在 GitHub 新建一个仓库，例如 `translator-api`
   - 把本项目里的 `api/translate.js` 文件复制进去

2. **部署到 Vercel**
   - 登录 [Vercel](https://vercel.com)
   - 点击 "New Project" → 导入你的 GitHub 仓库
   - 自动检测到 `api/translate.js`，点击 Deploy
   - 成功后会得到一个 API 地址，例如：
     ```
     https://translator-api.vercel.app/api/translate
     ```

3. **在 SaleSmartly 前端调用**
   在你的 SaleSmartly Chat Plugin 脚本后面加入：
   ```html
   <script>
     let visitorLang = "en";

     // 监听访客消息
     ssq.push(["on", "message", async function(message) {
       if (message.content_type === "text") {
         const resp = await fetch("https://translator-api.vercel.app/api/translate", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ text: message.content, targetLang: "zh" })
         });
         const data = await resp.json();
         visitorLang = message.lang || "en";

         ssq.push(["sendMessage", {
           content: "访客说(翻译): " + data.translated,
           content_type: "text"
         }]);
       }
     }]);

     // 监听客服消息
     ssq.push(["on", "agentMessage", async function(message) {
       if (message.content_type === "text") {
         const resp = await fetch("https://translator-api.vercel.app/api/translate", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ text: message.content, targetLang: visitorLang })
         });
         const data = await resp.json();

         ssq.push(["sendMessage", {
           content: data.translated,
           content_type: "text"
         }]);
       }
     }]);
   </script>
