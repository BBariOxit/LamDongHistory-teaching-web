import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';

// Update VR image for: "Thành phố Bảo Lộc (B’Lao) – đô thị cao nguyên phía Nam Lâm Đồng"
// lesson_id: 63
const LESSON_ID = 63;

async function main() {
  try {
    logger.info({ lessonId: LESSON_ID }, 'Updating VR image section for Bao Loc city lesson');

    const payload = {
      images: [
        {
          // Ảnh đồi chè / cảnh quan gợi nhớ Bảo Lộc (không phải 360 thật nhưng phù hợp nội dung)
          url: 'https://images.unsplash.com/photo-1587045525133-b85362f4f43e?w=2000&auto=format&q=80',
          caption: 'Ảnh VR minh hoạ thành phố Bảo Lộc (đồi chè và cao nguyên)',
        },
      ],
    };

    const result = await query(
      `UPDATE lesson_sections
       SET data = $1
       WHERE lesson_id = $2 AND type = 'vr_image'
       RETURNING section_id`,
      [JSON.stringify(payload), LESSON_ID],
    );

    logger.info(
      { lessonId: LESSON_ID, updatedSections: result.rowCount },
      'Updated VR image section payload for Bao Loc city lesson',
    );
  } catch (e) {
    logger.error(e, 'Failed to update VR image section for Bao Loc city lesson');
    process.exitCode = 1;
  }
}

main();
