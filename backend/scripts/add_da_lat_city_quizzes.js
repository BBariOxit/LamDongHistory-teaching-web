import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';
import {
  createQuizWithQuestions,
  deleteQuizAndQuestions
} from '../src/modules/quizzes/repositories/quizManagementRepo.js';

const LESSON_ID = 62; // Thành phố Đà Lạt – hình thành đô thị nghỉ dưỡng cao nguyên

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
  /** 
   * Mỗi bài khoảng 4–5 câu, đủ các dạng:
   * - single_choice (1 đáp án)
   * - multi_select (nhiều đáp án đúng)
   * - fill_blank (điền vào chỗ trống – hệ thống hiện tại hỗ trợ 1 ô trả lời cho mỗi câu)
   */

  const quizzes = [];

  // Quiz 1: Tiền đề & mốc 1893–1923
  quizzes.push({
    title: 'Đà Lạt – Tiền đề hình thành',
    description: 'Kiểm tra kiến thức về mốc 1893, nhân vật Yersin và các văn bản 1916–1920, 1923.',
    difficulty: 'Cơ bản',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Mốc mở đầu thường được dùng khi nói về tiền đề hình thành Đà Lạt là năm nào?',
        questionType: 'single_choice',
        options: ['1916', '1893', '1932', '1976'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Nhân vật gắn với chuyến thám hiểm mở đầu cho câu chuyện hình thành Đà Lạt là ai?',
        questionType: 'single_choice',
        options: ['Ernest Hébrard', 'Alexandre Yersin', 'Bảo Đại', 'Ngô Đình Diệm'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Những mốc/văn bản nào thuộc giai đoạn “hợp thức hóa – hành chính” (1916–1920) theo nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Dụ 19/3/1916',
          'Dụ 20/4/1916',
          'Nghị định 31/10/1920',
          'Quyết định 205/QĐ-TTg (2017)'
        ],
        // A, B, C đúng
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Đồ án quy hoạch đô thị Đà Lạt năm 1923 được gắn với kiến trúc sư nào?',
        questionType: 'fill_blank',
        // Hệ thống sẽ so sánh chuỗi nhập với các đáp án chấp nhận, sau khi chuẩn hóa
        answerSchema: {
          acceptedAnswers: [
            'Ernest Hébrard',
            'Hébrard',
            'ernest hebrard',
            'hebrard'
          ]
        },
        points: 1
      }
    ]
  });

  // Quiz 2: Lớp phát triển & Tuyên Đức – tỉnh lỵ
  quizzes.push({
    title: 'Đà Lạt – Các lớp phát triển đô thị',
    description:
      'Tổng hợp các giai đoạn hình thành – phát triển: 1954–1975, tỉnh Tuyên Đức và mốc sau 1975.',
    difficulty: 'Trung bình',
    timeLimit: 12,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Tỉnh Tuyên Đức (gắn với Đà Lạt giai đoạn 1954–1975) được ghi nhận thành lập năm nào?',
        questionType: 'single_choice',
        options: ['1958', '1975', '1976', '1938'],
        correctIndex: 0,
        points: 1
      },
      {
        questionText:
          'Sau 1975, mốc nào được nêu như bước xác lập Đà Lạt là tỉnh lỵ của tỉnh Lâm Đồng?',
        questionType: 'single_choice',
        options: ['1920', '1932', '1976', '1991'],
        correctIndex: 2,
        points: 1
      },
      {
        questionText:
          'Những giai đoạn nào được nhắc riêng như các “lớp phát triển” của Đà Lạt? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Tiền đề 1893',
          'Hợp thức hóa 1916–1920',
          'Giai đoạn 1954–1975 gắn với Tuyên Đức',
          'Sau 1975 (tỉnh lỵ Lâm Đồng, điều chỉnh địa giới)'
        ],
        answerSchema: { correctIndexes: [0, 1, 2, 3] },
        points: 1
      },
      {
        questionText:
          'Tỉnh ____________ được ghi nhận thành lập năm 1958 và giải thể năm 1975, gắn với quản trị Đà Lạt trong giai đoạn 1954–1975. (điền vào chỗ trống)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: ['Tuyên Đức', 'Tuyen Duc', 'tuyen duc']
        },
        points: 1
      }
    ]
  });

  // Quiz 3: Đặc trưng đô thị nghỉ dưỡng & lịch sử hành chính sau 1975
  quizzes.push({
    title: 'Đà Lạt – Đô thị nghỉ dưỡng & hành chính',
    description:
      'Đặc trưng “đô thị nghỉ dưỡng thời Pháp” và các yếu tố lịch sử hành chính – lãnh thổ sau 1975.',
    difficulty: 'Trung bình',
    timeLimit: 12,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Những ý nào phù hợp với đặc trưng “đô thị nghỉ dưỡng thời Pháp” của Đà Lạt theo phần nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Có các đồ án quy hoạch định hình cấu trúc đô thị',
          'Có sự tổ chức không gian theo khu chức năng',
          'Có xu hướng phân khu (khu bản xứ / khu kiểu châu Âu) trong bối cảnh thuộc địa',
          'Đà Lạt hình thành chủ yếu do công nghiệp khai khoáng'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Theo nội dung đã nêu, “lịch sử hành chính – lãnh thổ” của Đà Lạt sau 1975 có thể thể hiện qua yếu tố nào? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Quy hoạch đô thị 1923',
          'Các mốc thành lập/hợp nhất tỉnh và tỉnh lỵ',
          'Các quyết định sắp xếp đơn vị hành chính, điều chỉnh địa giới',
          'Truyền thuyết địa danh'
        ],
        answerSchema: { correctIndexes: [1, 2] },
        points: 1
      },
      {
        questionText:
          'Sau thống nhất, năm ________ được nêu là mốc Đà Lạt trở thành tỉnh lỵ của tỉnh ____________. (điền vào chỗ trống, ghi đầy đủ dạng: 1976 – Lâm Đồng)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '1976 - Lâm Đồng',
            '1976 – Lâm Đồng',
            '1976-Lâm Đồng',
            '1976–Lâm Đồng',
            '1976 lam dong',
            '1976 - lam dong'
          ]
        },
        points: 1
      },
      {
        questionText:
          'Năm 1916, văn bản hành chính nêu việc lập tỉnh ____________ và xác định tỉnh lỵ là ____________. (điền vào chỗ trống, ghi đầy đủ dạng: Lâm Viên – Đà Lạt)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            'Lâm Viên - Đà Lạt',
            'Lâm Viên – Đà Lạt',
            'Lam Vien - Da Lat',
            'lam vien - da lat'
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
    logger.info({ lessonId: LESSON_ID }, 'Attaching quizzes to Đà Lạt city lesson');
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
      logger.info({ quizId, title: quiz.title }, 'Created quiz for Đà Lạt city lesson');
    }

    logger.info('Done attaching quizzes to Đà Lạt city lesson');
  } catch (e) {
    logger.error(e, 'Failed to attach quizzes to Đà Lạt city lesson');
    process.exitCode = 1;
  }
}

main();

