import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';

// Bài: "Tiêu điểm: Bác sĩ Yersin và hành trình khám phá Lang Biang"
// lesson_id hiện tại trong DB: 50

const LESSON_ID = 50;

async function upsertQuiz() {
  // Tạo (hoặc tìm) một quiz chính cho bài học này
  const existing = await query(
    'SELECT quiz_id FROM quizzes WHERE lesson_id = $1 ORDER BY created_at DESC LIMIT 1',
    [LESSON_ID],
  );

  let quizId;
  if (existing.rows.length > 0) {
    quizId = existing.rows[0].quiz_id;
    logger.info({ quizId }, 'Updating existing Yersin Lang Biang quiz');
    await query('DELETE FROM quiz_questions WHERE quiz_id = $1', [quizId]);
  } else {
    const insertQuiz = await query(
      `
        INSERT INTO quizzes (lesson_id, title, description, difficulty, time_limit, created_by, assessment_type)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING quiz_id
      `,
      [
        LESSON_ID,
        'Tiêu điểm: Bác sĩ Yersin và hành trình khám phá Lang Biang',
        'Kiểm tra kiến thức về mốc 1893, chuỗi sự kiện Lang Biang và đóng góp khoa học của bác sĩ Alexandre Yersin.',
        'Trung bình',
        15,
        null,
        'mixed',
      ],
    );
    quizId = insertQuiz.rows[0].quiz_id;
    logger.info({ quizId }, 'Created new Yersin Lang Biang quiz');
  }

  const questions = [
    // A) Trắc nghiệm 1 đáp án
    {
      questionText:
        'Mốc Yersin đặt chân lên cao nguyên Lang Biang thường được nhắc là ngày nào?',
      options: ['21/06/1893', '19/03/1916', '08/04/1993', '15/02/2017'],
      correctIndex: 0,
      explanation:
        'Nhiều tài liệu địa phương ghi nhận mốc 21/6/1893 là ngày Yersin đặt chân lên cao nguyên Lâm Viên – Lang Biang.',
    },
    {
      questionText:
        'Theo mô tả tư liệu địa phương, Yersin đến Lang Biang vào khoảng thời gian nào trong ngày?',
      options: ['7 giờ sáng', '12 giờ trưa', '15 giờ 30', '20 giờ tối'],
      correctIndex: 2,
      explanation:
        'Tư liệu ghi nhận Yersin tới khu vực Lang Biang vào khoảng 15 giờ 30 chiều.',
    },
    {
      questionText:
        'Sau khi đến Lang Biang năm 1893, Yersin được mô tả là đã nghỉ lại một đêm ở đâu?',
      options: ['Cam Ly', 'Dankia', 'Trại Mát', 'Liên Khương'],
      correctIndex: 1,
      explanation:
        'Sau khi lên cao nguyên, Yersin nghỉ lại một đêm ở khu vực Dankia (Đan Kia).',
    },
    {
      questionText:
        'Năm 1897, Yersin giới thiệu cao nguyên Lang Biang với ai (theo nội dung đã nêu)?',
      options: ['Bảo Đại', 'Paul Doumer', 'Ernest Hébrard', 'Ngô Đình Diệm'],
      correctIndex: 1,
      explanation:
        'Năm 1897, Yersin giới thiệu tiềm năng cao nguyên Lang Biang với Toàn quyền Paul Doumer.',
    },
    {
      questionText:
        'Mốc khoa học nổi bật gắn với Yersin được nhắc trong nội dung là gì?',
      options: [
        'Lập tỉnh Lâm Viên',
        'Phân lập/ghi nhận vi khuẩn dịch hạch (1894)',
        'Xây Dinh III',
        'Thành lập KDL Hồ Tuyền Lâm',
      ],
      correctIndex: 1,
      explanation:
        'Năm 1894, Yersin cùng cộng sự phân lập tác nhân gây bệnh dịch hạch – sau này mang tên Yersinia pestis.',
    },

    // B) Trắc nghiệm nhiều đáp án
    {
      questionText:
        'Những mốc nào thuộc “chuỗi sự kiện Lang Biang” theo nội dung đã nêu?',
      options: [
        '21/06/1893: Yersin đến Lang Biang',
        '19/07/1897: giới thiệu/đề nghị về Lang Biang với Paul Doumer',
        '03/1899: Yersin cùng Doumer khảo sát Lang Biang',
        '28/12/2001: xếp hạng di tích kiến trúc',
      ],
      questionType: 'multi_select',
      correctIndexes: [0, 1, 2],
      explanation:
        'Chuỗi sự kiện Lang Biang gồm các mốc 1893, 1897 và 3/1899; mốc 2001 liên quan tới di tích khác.',
    },
    {
      questionText:
        'Những ý nào đúng về vai trò của chuyến đi Lang Biang theo nội dung đã nêu?',
      options: [
        'Mở “cửa sổ địa lý” để người Pháp nhìn thấy tiềm năng khí hậu cao nguyên',
        'Tạo tiền đề cho ý tưởng xây dựng trung tâm nghỉ dưỡng trên cao nguyên',
        'Là nguyên nhân trực tiếp thành lập TP Bảo Lộc năm 2010',
        'Góp phần làm Lang Biang/Lâm Viên đi vào câu chuyện hình thành Đà Lạt',
      ],
      questionType: 'multi_select',
      correctIndexes: [0, 1, 3],
      explanation:
        'Chuyến đi Lang Biang giúp người Pháp nhìn thấy tiềm năng khí hậu cao nguyên và là tiền đề cho ý tưởng Đà Lạt.',
    },
    {
      questionText:
        'Những nhân vật nào được nhắc trong nội dung liên quan trực tiếp đến câu chuyện Lang Biang?',
      options: [
        'Alexandre Yersin',
        'Paul Doumer',
        'Ernest Outrey',
        'Nguyễn Vỹ',
      ],
      questionType: 'multi_select',
      correctIndexes: [0, 1],
      explanation:
        'Trong phần Lang Biang, hai nhân vật trọng tâm là Yersin và Toàn quyền Paul Doumer.',
    },
    {
      questionText:
        'Theo nội dung đã nêu, năm 1894 gắn với đóng góp nào của Yersin?',
      options: [
        'Đặt tên hồ Tuyền Lâm',
        'Phát hiện/phân lập vi khuẩn gây bệnh dịch hạch',
        'Thiết kế Dinh III',
        'Lập thị xã Đà Lạt',
      ],
      correctIndex: 1,
      explanation:
        'Năm 1894, Yersin phân lập tác nhân gây bệnh dịch hạch – một cột mốc lớn trong y học.',
    },

    // C) Điền vào chỗ trống – dùng kiểu fill_blank
    {
      questionText:
        'Yersin đến Lang Biang ngày nào và vào khoảng mấy giờ (ghi dạng: 21/06/1893 – 15 giờ 30 phút)?',
      questionType: 'fill_blank',
      acceptedAnswers: [
        '21/06/1893 – 15 giờ 30 phút',
        '21/6/1893 – 15 giờ 30 phút',
        '21-06-1893 – 15 giờ 30 phút',
      ],
      explanation:
        'Các tư liệu địa phương thường ghi mốc 21/6/1893, khoảng 15 giờ 30 chiều.',
    },
    {
      questionText:
        'Sau khi đến Lang Biang, Yersin được mô tả là nghỉ lại một đêm tại đâu?',
      questionType: 'fill_blank',
      acceptedAnswers: ['Dankia', 'Đan Kia', 'Đankia'],
      explanation: 'Ông nghỉ lại tại khu vực Dankia (Đan Kia).',
    },
    {
      questionText:
        'Ngày 19/07/1897, Yersin giới thiệu cao nguyên Lang Biang với Toàn quyền nào (ghi: Paul Doumer)?',
      questionType: 'fill_blank',
      acceptedAnswers: ['Paul Doumer', 'Doumer'],
      explanation:
        'Yersin gửi báo cáo và giới thiệu cao nguyên với Toàn quyền Paul Doumer.',
    },
    {
      questionText:
        'Năm nào Yersin gắn với mốc phân lập vi khuẩn dịch hạch mang tên Yersinia pestis?',
      questionType: 'fill_blank',
      acceptedAnswers: ['1894'],
      explanation: 'Mốc khoa học này được xác lập năm 1894.',
    },
  ];

  let position = 1;
  for (const q of questions) {
    if (q.questionType === 'fill_blank') {
      await query(
        `
          INSERT INTO quiz_questions
          (quiz_id, question_text, options, correct_index, explanation, position, points, question_type, answer_schema)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          quizId,
          q.questionText,
          null,
          null,
          q.explanation || null,
          position++,
          1,
          'fill_blank',
          { acceptedAnswers: q.acceptedAnswers },
        ],
      );
    } else if (q.questionType === 'multi_select') {
      await query(
        `
          INSERT INTO quiz_questions
          (quiz_id, question_text, options, correct_index, explanation, position, points, question_type, answer_schema)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          quizId,
          q.questionText,
          q.options,
          null,
          q.explanation || null,
          position++,
          1,
          'multi_select',
          { correctIndexes: q.correctIndexes },
        ],
      );
    } else {
      await query(
        `
          INSERT INTO quiz_questions
          (quiz_id, question_text, options, correct_index, explanation, position, points, question_type, answer_schema)
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          quizId,
          q.questionText,
          q.options,
          q.correctIndex,
          q.explanation || null,
          position++,
          1,
          'single_choice',
          null,
        ],
      );
    }
  }

  logger.info({ quizId, count: questions.length }, 'Seeded Yersin Lang Biang quiz questions');
}

async function main() {
  try {
    await upsertQuiz();
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

main();

