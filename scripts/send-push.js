import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

async function sendPush() {
  const historyFile = ".sent-posts.json";
  const feedPath = join("dist", "feed.xml");

  // 1. Check history
  let sentPosts = [];
  if (existsSync(historyFile)) {
    sentPosts = JSON.parse(readFileSync(historyFile, "utf8"));
  }

  // 2. Read feed
  if (!existsSync(feedPath)) {
    console.log("feed.xml not found in dist/");
    return;
  }
  const xmlText = readFileSync(feedPath, "utf8");

  // 3. Match <entry>
  const entryMatch = xmlText.match(/<entry[\s\S]*?>([\s\S]*?)<\/entry>/i);
  if (!entryMatch) {
    console.log("No feed items found.");
    return;
  }

  const entryXml = entryMatch[1];
  const titleMatch = entryXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const linkMatch = entryXml.match(/<link[^>]+href=["']([^"']+)["']/i);
  
  // Extract summary or content tag from Atom feed
  const summaryMatch = entryXml.match(/<(?:summary|content)[^>]*>([\s\S]*?)<\/(?:summary|content)>/i);

  if (!titleMatch || !linkMatch) {
    console.log("Could not parse title or link from entry.");
    return;
  }

  const title = titleMatch[1].trim();
  const url = linkMatch[1].trim();

  // Strip HTML tags if summary contains markup, fallback if empty
  let description = summaryMatch ? summaryMatch[1].replace(/<[^>]*>?/gm, "").trim() : "";
  if (!description) {
    description = "Click to read the latest updates.";
  }

  // 4. Duplicate check
  if (sentPosts.includes(url)) {
    console.log("Post already notified:", url);
    return;
  }

  console.log(`New post found: "${title}". Sending push notification...`);

  // 5. OneSignal API request
  const res = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Basic ${process.env.ONESIGNAL_REST_API_KEY}`
    },
    body: JSON.stringify({
      app_id: process.env.ONESIGNAL_APP_ID,
      included_segments: ["Total Subscriptions"],
      headings: { en: title },
      contents: { en: description },
      url: url
    })
  });

  const responseData = await res.json();
  console.log("OneSignal response:", responseData);

  // 6. Update history
  sentPosts.push(url);
  writeFileSync(historyFile, JSON.stringify(sentPosts, null, 2));
}

sendPush();