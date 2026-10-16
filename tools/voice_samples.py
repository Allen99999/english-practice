"""產生試聽用語音：python3 tools/voice_samples.py（或 .venv/bin/python）
輸出到 samples/，會自動打開資料夾。每組對話都用一女一男兩種聲音。"""
import asyncio, os, subprocess, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "samples"); os.makedirs(OUT, exist_ok=True)

DIALOG = [
    ("Jenny", "Hello?"),
    ("Ray", "Hi, Jenny. It's Ray. I'm calling from Sapporo!"),
    ("Jenny", "Wow! How's the weather there? Is it snowy?"),
    ("Ray", "Yes, it snowed all night. The streets are white, and my hands are freezing."),
]
PAIRS = {  # 女聲, 男聲
    "A_Jenny+Guy（目前設定）": ("en-US-JennyNeural", "en-US-GuyNeural"),
    "B_Aria+Christopher": ("en-US-AriaNeural", "en-US-ChristopherNeural"),
    "C_Ava+Andrew（較新、較自然）": ("en-US-AvaNeural", "en-US-AndrewNeural"),
    "D_Emma+Brian": ("en-US-EmmaNeural", "en-US-BrianNeural"),
}
SINGLE = [
    ("1_文章朗讀", "en-US-AriaNeural", "Every summer and fall, typhoons come to Taiwan. They bring strong winds and heavy rain. When a typhoon is coming, the government sometimes gives people a typhoon day."),
    ("2_單選題題目", "en-US-AriaNeural", "Remember to turn off the lights blank you leave the classroom."),
    ("3_單字發音", "en-US-JennyNeural", "temperature"),
]

async def tts(text, voice, path):
    await edge_tts.Communicate(text, voice).save(path)

async def main():
    have = {v["ShortName"] for v in await edge_tts.list_voices()}
    for name, voice, text in SINGLE:
        await tts(text, voice, os.path.join(OUT, f"{name}_{voice}.mp3"))
    for label, (f, m) in PAIRS.items():
        if f not in have or m not in have:
            print("略過（語音不存在）：", label); continue
        parts = []
        for i, (who, line) in enumerate(DIALOG):
            p = os.path.join(OUT, f".part_{label}_{i}.mp3")
            await tts(line, f if who == "Jenny" else m, p); parts.append(p)
        # MP3 可以直接串接成一個檔，方便一次聽完整段對話
        with open(os.path.join(OUT, f"對話_{label}.mp3"), "wb") as w:
            for p in parts:
                w.write(open(p, "rb").read()); os.remove(p)
    print("完成，檔案在", OUT)
    if sys.platform == "darwin": subprocess.run(["open", OUT])

asyncio.run(main())
