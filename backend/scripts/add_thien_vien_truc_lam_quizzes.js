import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';
import {
  createQuizWithQuestions,
  deleteQuizAndQuestions
} from '../src/modules/quizzes/repositories/quizManagementRepo.js';

// Bài: "Thiền viện Trúc Lâm Đà Lạt: Trung tâm Phật giáo gắn với hồ Tuyền Lâm"
// lesson_id hiện tại: 59
const LESSON_ID = 59;

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

  // Quiz 1: Khởi lập & vị trí Thiền viện
  quizzes.push({
    title: 'Thiền viện Trúc Lâm – Khởi lập & vị trí',
    description:
      'Củng cố các mốc khởi lập, người sáng lập và vị trí gắn với núi Phụng Hoàng – hồ Tuyền Lâm.',
    difficulty: 'Cơ bản',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText: 'Thiền viện Trúc Lâm Đà Lạt được khởi lập vào năm nào?',
        questionType: 'single_choice',
        options: ['1987', '1993', '2004', '2017'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText: 'Người gắn với việc khởi lập Thiền viện Trúc Lâm Đà Lạt là:',
        questionType: 'single_choice',
        options: ['Thích Nhất Hạnh', 'Thích Thanh Từ', 'Thích Trí Quang', 'Thích Quảng Đức'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText: 'Thiền viện tọa lạc trên ngọn núi nào (theo nội dung đã nêu)?',
        questionType: 'single_choice',
        options: ['Núi Langbiang', 'Núi Phụng Hoàng', 'Núi Voi', 'Núi Bà'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText: 'Thiền viện gắn trực tiếp với mặt nước/hồ nào?',
        questionType: 'single_choice',
        options: ['Hồ Xuân Hương', 'Hồ Tuyền Lâm', 'Hồ Đan Kia', 'Hồ Đại Ninh'],
        correctIndex: 1,
        points: 1
      }
    ]
  });

  // Quiz 2: Mốc thời gian & bối cảnh Tuyền Lâm
  quizzes.push({
    title: 'Thiền viện Trúc Lâm – Mốc thời gian & bối cảnh Tuyền Lâm',
    description:
      'Các mốc 1993–1994 của thiền viện và bối cảnh phát triển vùng Tuyền Lâm – Khu du lịch quốc gia.',
    difficulty: 'Trung bình',
    timeLimit: 12,
    assessmentType: 'mixed',
    questions: [
      {
        questionText: 'Mốc hoàn thành Thiền viện Trúc Lâm Đà Lạt (theo nội dung đã nêu) là ngày nào?',
        questionType: 'single_choice',
        options: ['08/04/1993', '08/02/1994', '15/02/2017', '11/07/1994'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Những mốc nào liên quan đến “bối cảnh phát triển vùng Tuyền Lâm” trong bài? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          '15/02/2017: Hồ Tuyền Lâm được công nhận Khu du lịch quốc gia',
          '08/04/1993: Khởi lập thiền viện',
          '08/02/1994: Hoàn thành thiền viện',
          '1893: Yersin thám hiểm Lang Biang'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Thiền viện Trúc Lâm Đà Lạt được khởi lập ngày //____ và hoàn thành ngày //____. (điền vào chỗ trống, ghi đầy đủ dạng: 08/04/1993 – 08/02/1994)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '08/04/1993 - 08/02/1994',
            '8/4/1993 - 8/2/1994',
            '08/04/1993 – 08/02/1994',
            '8/4/1993 – 8/2/1994',
            '08/04/1993-08/02/1994',
            '8/4/1993-8/2/1994'
          ]
        },
        points: 1
      },
      {
        questionText:
          'Ngày //____, Hồ Tuyền Lâm được công nhận là ____________. (điền vào chỗ trống, ghi đầy đủ dạng: 15/02/2017 – Khu du lịch quốc gia)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '15/02/2017 - Khu du lịch quốc gia',
            '15/2/2017 - Khu du lịch quốc gia',
            '15/02/2017 – Khu du lịch quốc gia',
            '15/2/2017 – Khu du lịch quốc gia',
            '15/02/2017- Khu du lịch quốc gia',
            '15/2/2017- Khu du lịch quốc gia',
            '15/02/2017-Khu du lịch quốc gia',
            '15/2/2017-Khu du lịch quốc gia'
          ]
        },
        points: 1
      }
    ]
  });

  // Quiz 3: Vai trò, chức năng & Thiền phái
  quizzes.push({
    title: 'Thiền viện Trúc Lâm – Vai trò & Thiền phái',
    description:
      'Các chức năng tu học, hành hương, tham quan và gắn kết với Thiền phái Trúc Lâm.',
    difficulty: 'Trung bình',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Những ý nào đúng về quá trình hình thành – phát triển của Thiền viện Trúc Lâm Đà Lạt? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Khởi lập năm 1993',
          'Hoàn thành năm 1994',
          'Gắn với Thiền phái Trúc Lâm',
          'Là sân bay chính của Đà Lạt'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Theo nội dung đã nêu, vì sao vị trí Hồ Tuyền Lâm – núi Phụng Hoàng phù hợp để lập thiền viện? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Tạo không gian tĩnh, thuận tu tập',
          'Gần Đà Lạt nhưng tách khỏi ồn ào đô thị',
          'Thuận kết nối cảnh quan – hành hương',
          'Vì là trung tâm công nghiệp nặng'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Các chức năng/vai trò nào của thiền viện được nhấn mạnh trong nội dung? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Tu học – thiền tập',
          'Hành hương/chiêm bái',
          'Điểm tham quan văn hóa – cảnh quan',
          'Khai thác mỏ'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Thiền viện tọa lạc trên núi ____________, nhìn xuống hồ ____________. (điền vào chỗ trống, ghi dạng: Phụng Hoàng – Tuyền Lâm)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            'Phụng Hoàng - Tuyền Lâm',
            'Phụng Hoàng – Tuyền Lâm',
            'Phung Hoang - Tuyen Lam',
            'phung hoang - tuyen lam'
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
    logger.info({ lessonId: LESSON_ID }, 'Attaching quizzes to Thien Vien Truc Lam lesson');
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
      logger.info({ quizId, title: quiz.title }, 'Created quiz for Thien Vien Truc Lam lesson');
    }

    logger.info('Done attaching quizzes to Thien Vien Truc Lam lesson');
  } catch (e) {
    logger.error(e, 'Failed to attach quizzes to Thien Vien Truc Lam lesson');
    process.exitCode = 1;
  }
}

main();

