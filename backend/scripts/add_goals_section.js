import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';

// Script bổ sung / sửa lại phần "Mục tiêu bài học"
// cho tất cả các bài trong bảng lessons.
// Phần text được lưu trong file UTF-8 để tránh lỗi dấu tiếng Việt.

async function main() {
  const res = await query(
    'SELECT lesson_id, title, slug, content_html FROM lessons WHERE content_html IS NOT NULL ORDER BY lesson_id ASC',
  );

  for (const row of res.rows) {
    const { lesson_id, title, slug } = row;
    let html = row.content_html || '';

    if (!html.includes('<div class="lesson-content')) {
      logger.warn({ slug }, 'Skip lesson without standard wrapper');
      continue;
    }

    // Loại bỏ block goals cũ (nếu có) để tránh bị nhân đôi / lỗi mã hóa.
    const goalsRegex = new RegExp('<section class="goals-section">[\\s\\S]*?</section>', 'i');
    html = html.replace(goalsRegex, '');

    // Trường hợp đặc biệt: block cũ bị lỗi dấu tiếng Việt (M?c ti?u b?i h?c) do script tạm trước đó.
    const legacyMarker = 'M?c ti?u b?i h?c';
    if (html.includes(legacyMarker)) {
      const markerIndex = html.indexOf(legacyMarker);
      const startIndex = html.lastIndexOf('<section', markerIndex);
      const endIndex = html.indexOf('</section>', markerIndex);
      if (startIndex !== -1 && endIndex !== -1) {
        html = html.slice(0, startIndex) + html.slice(endIndex + '</section>'.length);
      }
    }

    const goalsSection = `
      <section class="goals-section">
        <h2>Mục tiêu bài học</h2>
        <ul>
          <li>Nắm được bối cảnh lịch sử và các đặc điểm chính của chủ đề: ${title}.</li>
          <li>Phân tích vai trò của chủ đề này trong tiến trình lịch sử và sự phát triển của Lâm Đồng.</li>
          <li>Rèn luyện kỹ năng đọc hiểu tư liệu, lập sơ đồ và trình bày lại kiến thức bằng ngôn ngữ của bản thân.</li>
        </ul>
      </section>
`;

    const insertIndex = html.indexOf('<section');
    let newHtml;
    if (insertIndex === -1) {
      newHtml = html.trimEnd() + goalsSection + '\n';
    } else {
      newHtml = html.slice(0, insertIndex) + goalsSection + html.slice(insertIndex);
    }

    await query('UPDATE lessons SET content_html=$1, updated_at=NOW() WHERE lesson_id=$2', [newHtml, lesson_id]);
    logger.info({ slug }, 'Updated goals section for lesson');
  }

  logger.info('Done updating goals sections for all lessons');
}

main().catch((err) => {
  logger.error({ err }, 'Failed to update goals sections');
  process.exitCode = 1;
});
