import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';
import {
  createQuizWithQuestions,
  deleteQuizAndQuestions
} from '../src/modules/quizzes/repositories/quizManagementRepo.js';

// Bài: "Hồ Tuyền Lâm: Lịch sử hình thành hồ và vùng sinh thái phía Nam Đà Lạt"
// lesson_id hiện tại: 58
const LESSON_ID = 58;

async function findAdminUserId() {
  const r = await query(
    `SELECT user_id
     FROM users
     WHERE email = 'admin@lamdong.edu.vn' OR role_id = 1
     ORDER BY user_id
     LIMIT 1`
  );
  return r.rows[0]?.user_id || null;
}

async function clearExistingQuizzes(lessonId) {
  const r = await query('SELECT quiz_id FROM quizzes WHERE lesson_id = $1', [lessonId]);
  for (const row of r.rows) {
    await deleteQuizAndQuestions(row.quiz_id);
  }
}

function buildQuizzes() {
  const quizzes = [];

  // Quiz 1: Hình thành hồ & giai đoạn xây dựng
  quizzes.push({
    title: 'Hồ Tuyền Lâm – Hình thành & xây dựng',
    description:
      'Kiểm tra kiến thức về công trình đập Suối Tía, giai đoạn xây hồ và tên ban đầu.',
    difficulty: 'Cơ bản',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText: 'Hồ Tuyền Lâm được hình thành chủ yếu do công trình nào?',
        questionType: 'single_choice',
        options: [
          'Đào kênh dẫn nước từ hồ Xuân Hương',
          'Đắp đập chặn Suối Tía tạo hồ chứa',
          'Nạo vét biển tạo vịnh',
          'Khoan giếng artesian quy mô lớn'
        ],
        correctIndex: 1,
        points: 1
      },
      {
        questionText: 'Giai đoạn xây dựng tạo hồ (theo nội dung đã nêu) là:',
        questionType: 'single_choice',
        options: ['1932–1938', '1958–1959', '1982–1987', '2004–2017'],
        correctIndex: 2,
        points: 1
      },
      {
        questionText: 'Tên ban đầu của hồ (theo nội dung đã nêu) là:',
        questionType: 'single_choice',
        options: ['Hồ Xuân Hương', 'Hồ Suối Vàng', 'Hồ Quang Trung', 'Hồ Đa Nhim'],
        correctIndex: 2,
        points: 1
      },
      {
        questionText:
          'Hồ Tuyền Lâm được tạo thành do đắp đập chặn ____________. (điền vào chỗ trống)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: ['Suối Tía', 'Suoi Tia', 'suoi tia']
        },
        points: 1
      }
    ]
  });

  // Quiz 2: Mốc phát triển & khu du lịch quốc gia
  quizzes.push({
    title: 'Hồ Tuyền Lâm – Mốc phát triển & khu du lịch',
    description:
      'Các mốc 1982–1987, 01/01/2004 và 15/02/2017 gắn với khu du lịch Hồ Tuyền Lâm.',
    difficulty: 'Trung bình',
    timeLimit: 12,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Mốc “Khu du lịch Hồ Tuyền Lâm bắt đầu hoạt động” là ngày nào?',
        questionType: 'single_choice',
        options: ['21/6/1893', '08/04/1993', '01/01/2004', '15/02/2017'],
        correctIndex: 2,
        points: 1
      },
      {
        questionText:
          'Mốc được công nhận Khu du lịch quốc gia Hồ Tuyền Lâm là năm nào?',
        questionType: 'single_choice',
        options: ['1987', '1994', '2004', '2017'],
        correctIndex: 3,
        points: 1
      },
      {
        questionText:
          'Những mốc nào thuộc “lịch sử hình thành & phát triển” của Hồ Tuyền Lâm theo nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          '1982–1987: xây đập tạo hồ',
          '01/01/2004: khu du lịch bắt đầu hoạt động',
          '15/02/2017: được công nhận khu du lịch quốc gia',
          '19/02/1959: đổi tên B’Lao thành Bảo Lộc'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Giai đoạn xây dựng tạo hồ là ________ đến ________, hoàn thành năm ________. (điền vào chỗ trống, ghi dạng: 1982 – 1987 – 1987)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '1982 - 1987 - 1987',
            '1982 – 1987 – 1987',
            '1982-1987-1987'
          ]
        },
        points: 1
      }
    ]
  });

  // Quiz 3: Chuyển đổi chức năng & lịch sử địa danh
  quizzes.push({
    title: 'Hồ Tuyền Lâm – Chức năng & lịch sử địa danh',
    description:
      'Từ Suối Tía, hồ Quang Trung đến Tuyền Lâm và quá trình chuyển đổi chức năng.',
    difficulty: 'Trung bình',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Những ý nào đúng về quá trình chuyển đổi chức năng của Hồ Tuyền Lâm? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Từ dòng suối/khu Suối Tía → hồ chứa nhân tạo',
          'Từ hồ chứa/thủy lợi → không gian du lịch – dịch vụ có quy hoạch',
          'Từ khu công nghiệp nặng → cảng biển du lịch',
          'Từ thắng cảnh → điểm đến cấp quốc gia (sau 2017)'
        ],
        answerSchema: { correctIndexes: [0, 1, 3] },
        points: 1
      },
      {
        questionText:
          'Những yếu tố nào làm nên “lịch sử địa danh” của Tuyền Lâm theo nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Lớp tên gọi thay đổi (hồ Quang Trung → hồ Tuyền Lâm)',
          'Công trình đập chặn Suối Tía tạo ra địa danh mới',
          'Mốc pháp lý (QĐ 205/QĐ-TTg năm 2017)',
          'Tuyền Lâm vốn là núi cao nhất Lâm Đồng'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Theo nội dung đã nêu, khu vực trước khi có hồ gắn với địa danh nào?',
        questionType: 'multi_select',
        options: ['Suối Tía', 'Suối Cam Ly', 'Sông Đa Nhim', 'Suối Vàng'],
        answerSchema: { correctIndexes: [0] },
        points: 1
      },
      {
        questionText:
          'Tên ban đầu của hồ theo nội dung đã nêu là hồ ____________, về sau đổi thành hồ ____________. (điền vào chỗ trống, ghi dạng: Quang Trung – Tuyền Lâm)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            'Quang Trung - Tuyền Lâm',
            'Quang Trung – Tuyền Lâm',
            'Quang Trung- Tuyền Lâm',
            'Quang Trung-Tuyền Lâm',
            'Quang Trung - Tuyen Lam'
          ]
        },
        points: 1
      }
    ]
  });

  return quizzes;
}

async function main() {
  try {
    logger.info({ lessonId: LESSON_ID }, 'Attaching quizzes to Ho Tuyen Lam lesson');
    const adminId = await findAdminUserId();
    logger.info({ adminId }, 'Using admin user as quiz creator');

    await clearExistingQuizzes(LESSON_ID);

    const quizzes = buildQuizzes();
    for (const quiz of quizzes) {
      const payload = {
        title: quiz.title,
        description: quiz.description,
        lessonId: LESSON_ID,
        createdBy: adminId,
        questions: quiz.questions,
        timeLimit: quiz.timeLimit,
        difficulty: quiz.difficulty,
        assessmentType: quiz.assessmentType || 'mixed'
      };
      const { quizId } = await createQuizWithQuestions(payload);
      logger.info({ quizId, title: quiz.title }, 'Created quiz for Ho Tuyen Lam lesson');
    }

    logger.info('Done attaching quizzes to Ho Tuyen Lam lesson');
  } catch (e) {
    logger.error(e, 'Failed to attach quizzes to Ho Tuyen Lam lesson');
    process.exitCode = 1;
  }
}

main();

