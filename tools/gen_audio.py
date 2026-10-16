"""產生朗讀 MP3（Microsoft Edge 神經語音，透過 edge-tts）
用法：
  pip install edge-tts
  node tools/build_tts_jobs.mjs
  python3 tools/gen_audio.py            # 只產生還沒有的檔案，可重複執行
完成後會更新 docs/audio/manifest.json
"""
import asyncio, json, os, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "docs", "audio")
JOBS = os.path.join(ROOT, "tools", "tts_jobs.json")
CONCURRENCY = int(os.environ.get("TTS_CONCURRENCY", "6"))

async def one(job, sem, stats):
    path = os.path.join(OUT, job["name"] + ".mp3")
    if os.path.exists(path) and os.path.getsize(path) > 0:
        stats["skip"] += 1; return
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(job["text"], job["voice"]).save(path + ".part")
                os.replace(path + ".part", path); stats["ok"] += 1
                if stats["ok"] % 100 == 0: print(f"  已完成 {stats['ok']} 個", flush=True)
                return
            except Exception as e:
                if attempt == 3:
                    stats["fail"] += 1; print("失敗：", job["voice"], job["text"][:60], e, file=sys.stderr)
                await asyncio.sleep(2 * (attempt + 1))

async def main():
    os.makedirs(OUT, exist_ok=True)
    jobs = json.load(open(JOBS, encoding="utf-8"))
    sem = asyncio.Semaphore(CONCURRENCY); stats = {"ok": 0, "skip": 0, "fail": 0}
    await asyncio.gather(*(one(j, sem, stats) for j in jobs))
    names = sorted(f[:-4] for f in os.listdir(OUT) if f.endswith(".mp3"))
    json.dump(names, open(os.path.join(OUT, "manifest.json"), "w"))
    print(f"新產生 {stats['ok']}、略過 {stats['skip']}、失敗 {stats['fail']}；manifest 共 {len(names)} 個檔案")

asyncio.run(main())
