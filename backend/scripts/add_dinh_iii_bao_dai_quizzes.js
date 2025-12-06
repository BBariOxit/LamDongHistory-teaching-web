import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';
import {
  createQuizWithQuestions,
  deleteQuizAndQuestions
} from '../src/modules/quizzes/repositories/quizManagementRepo.js';

// Bài: "Dinh III Bảo Đại: Biệt điện mùa hè trên đồi thông"
// lesson_id hiện tại: 57
const LESSON_ID = 57;

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

  // Quiz 1: Giai đoạn xây dựng & chức năng cơ bản
  quizzes.push({
    title: 'Dinh III – Xây dựng & chức năng',
    description:
      'Câu hỏi về giai đoạn xây dựng, loại công trình và vai trò cơ bản của Dinh III Bảo Đại.',
    difficulty: 'Cơ bản',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText: 'Dinh III Bảo Đại được xây dựng trong giai đoạn nào?',
        questionType: 'single_choice',
        options: ['1893–1916', '1933–1938', '1958–1959', '1982–1987'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Dinh III thường được mô tả là loại công trình gì trong lịch sử Đà Lạt?',
        questionType: 'single_choice',
        options: [
          'Đập thủy lợi',
          'Biệt điện mùa hè/biệt thự nghỉ dưỡng – làm việc',
          'Nhà ga xe lửa',
          'Chợ trung tâm'
        ],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Giai đoạn Dinh III gắn mạnh với sinh hoạt – làm việc của hoàng gia Bảo Đại theo nội dung đã nêu là:',
        questionType: 'single_choice',
        options: ['1938–1954', '1982–1987', '2004–2017', '1976–1979'],
        correctIndex: 0,
        points: 1
      },
      {
        questionText:
          'Theo nội dung đã nêu, sau năm 1955 Dinh III được sử dụng với vai trò nào?',
        questionType: 'single_choice',
        options: [
          'Trụ sở tỉnh lỵ Lâm Đồng',
          'Nơi nghỉ của tổng thống chế độ VNCH',
          'Cảng hàng không',
          'Nhà máy thủy điện'
        ],
        correctIndex: 1,
        points: 1
      }
    ]
  });

  // Quiz 2: Dòng lịch sử chức năng & địa danh di sản
  quizzes.push({
    title: 'Dinh III – Dòng lịch sử chức năng & di sản',
    description:
      'Dòng phát triển chức năng, vai trò di sản du lịch và hồ sơ tư liệu của Dinh III.',
    difficulty: 'Trung bình',
    timeLimit: 12,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Những ý nào đúng về “dòng lịch sử phát triển chức năng” của Dinh III theo bài đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Xây dựng thời kỳ 1933–1938',
          'Là nơi sinh sống/làm việc của Bảo Đại giai đoạn 1938–1954',
          'Sau 1955 chuyển sang vai trò nơi nghỉ của tổng thống VNCH',
          'Vốn là hồ chứa nhân tạo phục vụ thủy lợi'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Những nhận định nào phản ánh đúng “địa danh di sản” của Dinh III hiện nay theo nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Được mở tham quan như điểm di sản – du lịch',
          'Có xu hướng bảo tồn/khôi phục không gian trưng bày',
          'Không còn liên quan gì đến lịch sử Đà Lạt',
          'Là một công trình kiến trúc có hồ sơ tư liệu cần đối chiếu bổ sung'
        ],
        answerSchema: { correctIndexes: [0, 1, 3] },
        points: 1
      },
      {
        questionText:
          'Dinh III được khởi công năm ________ và hoàn thành khoảng năm ________. (điền vào chỗ trống, ghi dạng: 1933 – 1938)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '1933 - 1938',
            '1933 – 1938',
            '1933-1938'
          ]
        },
        points: 1
      },
      {
        questionText:
          'Giai đoạn Dinh III gắn với hoạt động sinh sống/làm việc của Bảo Đại là ________ đến ________. (điền vào chỗ trống, ghi dạng: 1938 – 1954)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '1938 - 1954',
            '1938 – 1954',
            '1938-1954'
          ]
        },
        points: 1
      }
    ]
  });

  // Quiz 3: Nhân vật, mốc 1955 & tư liệu 2020
  quizzes.push({
    title: 'Dinh III – Nhân vật, mốc 1955 & tư liệu 2020',
    description:
      'Mốc 1955, vai trò sau 1955 và sự kiện năm 2020 liên quan hồ sơ thiết kế Dinh III.',
    difficulty: 'Trung bình',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Tin tức năm 2020 được nhắc đến liên quan đến Dinh III là gì?',
        questionType: 'single_choice',
        options: [
          'Khánh thành tuyến đường sắt mới',
          'Trao bản sao sơ đồ thiết kế Dinh III (tư liệu từ phía Pháp)',
          'Công nhận khu du lịch quốc gia',
          'Thành lập thành phố Đà Lạt'
        ],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Về kiến trúc sư thiết kế Dinh III, nội dung đã nêu cho thấy điều gì? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Có sự khác nhau giữa các nguồn về tên kiến trúc sư',
          'Một nguồn nêu Paul Veysseyre & Arthur Kruze',
          'Một nguồn khác nêu Paul Veysseyre & Huỳnh Tấn Phát',
          'Tất cả nguồn đều thống nhất tuyệt đối về 2 kiến trúc sư'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Theo nội dung đã nêu, sau năm ________ Dinh III được sử dụng làm nơi nghỉ của tổng thống chế độ VNCH. (điền vào chỗ trống, ghi năm)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: ['1955']
        },
        points: 1
      },
      {
        questionText:
          'Năm ________, có thông tin về việc phía Pháp trao ____________ liên quan Dinh III. (điền vào chỗ trống, ghi dạng: 2020 – bản sao sơ đồ thiết kế)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '2020 - bản sao sơ đồ thiết kế',
            '2020 – bản sao sơ đồ thiết kế',
            '2020- bản sao sơ đồ thiết kế',
            '2020-bản sao sơ đồ thiết kế',
            '2020 - ban sao so do thiet ke'
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
    logger.info({ lessonId: LESSON_ID }, 'Attaching quizzes to Dinh III Bao Dai lesson');
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
      logger.info({ quizId, title: quiz.title }, 'Created quiz for Dinh III Bao Dai lesson');
    }

    logger.info('Done attaching quizzes to Dinh III Bao Dai lesson');
  } catch (e) {
    logger.error(e, 'Failed to attach quizzes to Dinh III Bao Dai lesson');
    process.exitCode = 1;
  }
}

main();

