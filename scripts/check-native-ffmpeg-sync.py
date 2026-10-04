"""Decode the synchronized capture fixture using the real software encoder.
Run from the repository root. Requires cargo, ffmpeg and ffprobe on PATH.
"""
import json
import os
import struct
import subprocess
import tempfile
from pathlib import Path

ffmpeg = os.environ.get('FFMPEG_BIN', 'ffmpeg')
ffprobe = os.environ.get('FFPROBE_BIN', 'ffprobe')
with tempfile.TemporaryDirectory(prefix='retro-ffmpeg-sync-') as directory:
    root = Path(directory)
    fixture = root / 'input.mkv'
    output = root / 'output'
    subprocess.run(['cargo', 'run', '-p', 'tetorica-native-capture', '--example', 'timed_sync', '--', str(fixture)], check=True)
    subprocess.run(['cargo', 'run', '-p', 'tetorica-native-capture', '--example', 'ffmpeg_sync', '--', str(fixture), str(output)], check=True)
    recording = str(output / 'recording.mp4')
    frames = json.loads(subprocess.check_output([ffprobe, '-v', 'error', '-select_streams', 'v', '-show_frames', '-show_entries', 'frame=best_effort_timestamp_time', '-of', 'json', recording]))['frames']
    video = subprocess.check_output([ffmpeg, '-v', 'error', '-i', recording, '-map', '0:v', '-vf', 'crop=100:100,scale=1:1,format=gray', '-fps_mode', 'passthrough', '-f', 'rawvideo', 'pipe:1'])
    audio = subprocess.check_output([ffmpeg, '-v', 'error', '-i', recording, '-map', '0:a', '-ac', '1', '-f', 'f32le', 'pipe:1'])
    samples = struct.unpack('<' + 'f' * (len(audio) // 4), audio)
    flash = next(float(frame['best_effort_timestamp_time']) for frame, value in zip(frames, video) if value > 10)
    beep = next(index / 48000 for index, value in enumerate(samples) if abs(value) > 0.02)
    assert abs(flash - beep) < 1 / 30, (flash, beep)
    timestamps = [float(frame['best_effort_timestamp_time']) for frame in frames]
    assert max(b - a for a, b in zip(timestamps, timestamps[1:])) > 0.09, 'Dropped frames compressed the timeline'
    assert not (output / 'index.m3u8').exists(), 'Window recording must not start a preview stream'
    print(f'PASS: flash/beep difference {(flash - beep) * 1000:.2f} ms; video gaps preserved; MP4-only output.')
