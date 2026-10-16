"""確認 config.js 裡的語音名稱都存在：python3 tools/check_voices.py"""
import asyncio, re, os, edge_tts
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cfg = open(os.path.join(ROOT, "docs/js/config.js"), encoding="utf-8").read()
want = set(re.findall(r'"(en-[A-Z]{2}-\w+Neural)"', cfg))
have = {v["ShortName"] for v in asyncio.run(edge_tts.list_voices())}
missing = want - have
print("全部語音都可用" if not missing else f"找不到這些語音：{missing}")
