import cv2, os, shutil, subprocess
import numpy as np

def main():
    video_src = 'editable/assets/1782224012851.mp4'
    cap = cv2.VideoCapture(video_src)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Total frames to render: {total_frames}")

    frames_dir = 'temp_flawless_frames'
    if os.path.exists(frames_dir):
        shutil.rmtree(frames_dir)
    os.makedirs(frames_dir, exist_ok=True)

    # Load and prepare user seal
    user_seal = cv2.imread('user_seal_250.jpg')
    sh, sw, _ = user_seal.shape
    cx, cy = 360, 640
    x1, y1 = cx - sw // 2, cy - sh // 2
    x2, y2 = x1 + sw, y1 + sh

    yu, xu = np.ogrid[:sh, :sw]
    dist_u = np.sqrt((xu - sw // 2)**2 + (yu - sh // 2)**2)
    # 74px radius covers all heart outlines with clean ruby wax and golden TM crest
    user_alpha = np.clip((74.0 - dist_u) / 8.0, 0.0, 1.0)[:, :, None]

    print("Reading source frames...")
    orig_frames = []
    for i in range(total_frames):
        ret, f = cap.read()
        if not ret: break
        orig_frames.append(f)
    cap.release()

    print("Rendering all frames from scratch...")
    for idx, frame in enumerate(orig_frames):
        h, w, _ = frame.shape
        f_fl = frame.astype(np.float32) / 255.0

        # 1. Base ruby velvet recoloring (denoised paper):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray_clean = cv2.bilateralFilter(gray, 9, 30, 30).astype(np.float32) / 255.0

        L = np.clip(gray_clean / 0.90, 0.0, 1.0)
        ruby_r = (0.18 + 0.48 * (L ** 1.8))
        ruby_g = (0.015 + 0.04 * (L ** 2.2))
        ruby_b = (0.025 + 0.06 * (L ** 2.2))
        ruby_pure = np.dstack([ruby_b, ruby_g, ruby_r])

        # Color difference to distinguish paper from gold/wax/flame
        r_clean = cv2.bilateralFilter(f_fl[:, :, 2], 9, 0.08, 9)
        b_clean = cv2.bilateralFilter(f_fl[:, :, 0], 9, 0.08, 9)
        color_diff = r_clean - b_clean

        paper_weight = np.clip((0.20 - color_diff) / 0.06, 0.0, 1.0)

        # Flame core only exists when flame opens (idx >= 66) and strictly within flame bounds
        if idx >= 66:
            flame_region = np.zeros((h, w), dtype=bool)
            flame_region[250:900, 200:520] = True
            is_flame_core = (f_fl[:, :, 2] > 0.95) & (f_fl[:, :, 1] > 0.93) & (f_fl[:, :, 0] > 0.84) & flame_region
        else:
            is_flame_core = np.zeros((h, w), dtype=bool)

        paper_weight[is_flame_core] = 0.0
        # Force top edge (y < 25) and bottom edge (y > h - 25) to be solid ruby velvet paper (no video edge bleed)
        paper_weight[:25, :] = 1.0
        paper_weight[-25:, :] = 1.0
        paper_weight = cv2.GaussianBlur(paper_weight, (9, 9), 0)[:, :, None]

        base = f_fl * (1.0 - paper_weight) + ruby_pure * paper_weight
        base_bgr = np.clip(base * 255.0, 0, 255).astype(np.uint8)

        # 2. Seal & Flame compositing
        if idx < 86:
            seal_roi = base_bgr[y1:y2, x1:x2].astype(np.float32)
            blended_seal = seal_roi * (1.0 - user_alpha) + user_seal.astype(np.float32) * user_alpha

            if idx >= 66:
                # Seal is cracking: let fissure cut through logo
                orig_roi = frame[y1:y2, x1:x2].astype(np.float32)
                cx_roi = sw // 2
                x_grid = np.arange(sw)
                dist_center_x = np.abs(x_grid - cx_roi)[None, :]
                is_crack = (dist_center_x < 12) & (orig_roi[:, :, 2] > 140) & (orig_roi[:, :, 1] > 60)
                crack_weight = cv2.GaussianBlur(is_crack.astype(np.float32), (5, 5), 0)[:, :, None]
                blended_seal = blended_seal * (1.0 - crack_weight) + orig_roi * crack_weight

            base_bgr[y1:y2, x1:x2] = np.clip(blended_seal, 0, 255).astype(np.uint8)

        else:
            # Opening frames (idx >= 86):
            # Pure flame & light burst overlay restricted to flame aperture:
            flame_region = np.zeros((h, w), dtype=bool)
            flame_region[200:1000, 180:540] = True
            is_flame_glow = np.clip((color_diff - 0.20) / 0.10, 0.0, 1.0) * np.clip((f_fl[:, :, 2] - 0.45) / 0.15, 0.0, 1.0) * flame_region
            flame_mask = np.clip(is_flame_glow + is_flame_core.astype(np.float32), 0.0, 1.0)
            flame_mask = cv2.GaussianBlur(flame_mask, (5, 5), 0)[:, :, None]

            # Blend flame onto base_bgr FIRST
            base_bgr = np.clip(base_bgr.astype(np.float32) * (1.0 - flame_mask) + frame.astype(np.float32) * flame_mask, 0, 255).astype(np.uint8)

            # Apply TM monogram seal on bottom stationary seal, preserving the central flame slit
            seal_roi = base_bgr[y1:y2, x1:x2].astype(np.float32)
            x_grid = np.arange(sw)[None, :]
            dist_cx = np.abs(x_grid - sw // 2)
            crack_mask = np.clip((8.0 - dist_cx) / 3.0, 0.0, 1.0)[:, :, None]
            effective_user_alpha = user_alpha * (1.0 - crack_mask)
            blended_seal = seal_roi * (1.0 - effective_user_alpha) + user_seal.astype(np.float32) * effective_user_alpha
            base_bgr[y1:y2, x1:x2] = np.clip(blended_seal, 0, 255).astype(np.uint8)

        # Write frame
        out_path = os.path.join(frames_dir, f"frame_{idx:04d}.jpg")
        cv2.imwrite(out_path, base_bgr, [cv2.IMWRITE_JPEG_QUALITY, 98])
        if idx % 30 == 0 or idx == len(orig_frames) - 1:
            print(f"Rendered {idx + 1}/{len(orig_frames)}")

    print("Encoding video with ffmpeg...")
    out_video = 'editable/assets/intro-envelope.mp4'
    cmd = [
        'ffmpeg', '-y',
        '-framerate', '24',
        '-i', 'temp_flawless_frames/frame_%04d.jpg',
        '-c:v', 'libx264',
        '-pix_fmt', 'yuv420p',
        '-profile:v', 'high',
        '-level', '4.0',
        '-crf', '18',
        '-movflags', '+faststart',
        out_video
    ]
    subprocess.run(cmd, check=True)
    print("Video rendered to:", out_video)

    # Copy to assets/images/intro-envelope.mp4
    if os.path.exists('assets/images'):
        shutil.copy(out_video, 'assets/images/intro-envelope.mp4')
        print("Copied to assets/images/intro-envelope.mp4")

    # Save Frame 0 as envelope-cover.png
    f0_img = cv2.imread('temp_flawless_frames/frame_0000.jpg')
    cv2.imwrite('editable/assets/envelope-cover.png', f0_img)
    if os.path.exists('assets/images'):
        shutil.copy('editable/assets/envelope-cover.png', 'assets/images/envelope-cover.png')
    print("Saved envelope-cover.png matching Frame 0 exactly!")

if __name__ == '__main__':
    main()
