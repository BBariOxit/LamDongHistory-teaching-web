import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';

// Bài: "Thành phố Bảo Lộc (B’Lao) – đô thị cao nguyên phía Nam Lâm Đồng"
// lesson_id hiện tại: 63
const LESSON_ID = 63;

async function main() {
  try {
    logger.info({ lessonId: LESSON_ID }, 'Attaching VR image section to Bao Loc city lesson');

    // Lấy order_index lớn nhất hiện tại để chèn xuống cuối
    const r = await query(
      'SELECT COALESCE(MAX(order_index), 0) AS max_idx FROM lesson_sections WHERE lesson_id = $1',
      [LESSON_ID]
    );
    const maxIdx = Number(r.rows[0]?.max_idx || 0);
    const nextIndex = maxIdx + 1;

    const vrImage = {
      url: 'https://images.unsplash.com/photo-1521292270410-a8c53642e9d0?w=1600&auto=format&q=80',
      caption: 'Ảnh panorama minh hoạ không gian đô thị cao nguyên (VR 360° giả lập)',
    };

    await query(
      `INSERT INTO lesson_sections (lesson_id, type, title, content_html, data, order_index)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        LESSON_ID,
        'vr_image',
        'Trải nghiệm ảnh VR 360°',
        null,
        JSON.stringify({ images: [vrImage] }),
        nextIndex,
      ]
    );

    logger.info({ lessonId: LESSON_ID }, 'VR image section added for Bao Loc city lesson');
  } catch (e) {
    logger.error(e, 'Failed to add VR image section for Bao Loc city lesson');
    process.exitCode = 1;
  }
}

main();

