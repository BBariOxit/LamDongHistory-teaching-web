import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';
import {
  createQuizWithQuestions,
  deleteQuizAndQuestions
} from '../src/modules/quizzes/repositories/quizManagementRepo.js';

// Bài: "Trường Cao đẳng Sư phạm Đà Lạt: Từ Lycée Yersin đến trường đào tạo giáo viên"
// lesson_id hiện tại: 56
const LESSON_ID = 56;

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

  // Quiz 1: Dòng mốc thời gian chính
  quizzes.push({
    title: 'CĐSP Đà Lạt – Dòng mốc thời gian',
    description:
      'Các mốc 1927, 1935, 1976 và 2001 trong lịch sử hình thành – phát triển của cơ sở.',
    difficulty: 'Cơ bản',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Tiền thân sớm của cơ sở này bắt đầu hình thành theo mô hình trường trung học kiểu Pháp vào năm nào?',
        questionType: 'single_choice',
        options: ['1893', '1916', '1927', '1958'],
        correctIndex: 2,
        points: 1
      },
      {
        questionText:
          'Tên gọi “Lycée Yersin” được đặt vào năm nào (theo nội dung đã nêu)?',
        questionType: 'single_choice',
        options: ['1935', '1938', '1955', '1976'],
        correctIndex: 0,
        points: 1
      },
      {
        questionText:
          'Cơ sở này chuyển thành trường đào tạo giáo viên (sư phạm) từ năm nào?',
        questionType: 'single_choice',
        options: ['1959', '1976', '1994', '2010'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Mốc được công nhận là Di tích kiến trúc Quốc gia là:',
        questionType: 'single_choice',
        options: ['28/12/2001', '01/01/2004', '15/02/2017', '08/02/1994'],
        correctIndex: 0,
        points: 1
      }
    ]
  });

  // Quiz 2: Chuỗi lịch sử & chuyển đổi chức năng
  quizzes.push({
    title: 'CĐSP Đà Lạt – Lịch sử & chức năng',
    description:
      'Chuỗi mốc lịch sử và các chuyển đổi chức năng của địa danh giáo dục – di sản này.',
    difficulty: 'Trung bình',
    timeLimit: 12,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Những mốc nào thuộc chuỗi lịch sử hình thành & phát triển của địa danh này theo nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          '1927: hình thành/khai giảng trường trung học kiểu Pháp (tiền thân)',
          '1935: lấy tên Lycée Yersin',
          '1976: chuyển thành cơ sở đào tạo giáo viên',
          '2017: công nhận khu du lịch quốc gia Hồ Tuyền Lâm'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Những ý nào phản ánh đúng “chuyển đổi chức năng” của địa danh này theo nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Từ trường trung học kiểu Pháp → cơ sở giáo dục thay đổi theo thời cuộc',
          'Từ cơ sở giáo dục thuộc địa → trường đào tạo giáo viên sau 1975',
          'Từ nhà ga đường sắt → sân bay',
          'Từ công trình giáo dục → di sản kiến trúc được xếp hạng'
        ],
        answerSchema: { correctIndexes: [0, 1, 3] },
        points: 1
      },
      {
        questionText:
          'Vì sao năm 2001 là mốc quan trọng đối với địa danh này? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Được xếp hạng Di tích kiến trúc Quốc gia',
          'Trở thành khu du lịch quốc gia',
          'Mở đầu giai đoạn bảo tồn chính thức ở cấp nhà nước',
          'Chuyển công năng từ trường học sang hồ chứa'
        ],
        answerSchema: { correctIndexes: [0, 2] },
        points: 1
      },
      {
        questionText:
          'Năm ________, cơ sở tiền thân theo mô hình trường trung học kiểu Pháp ở Đà Lạt được hình thành/khai giảng. (điền vào chỗ trống)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: ['1927']
        },
        points: 1
      }
    ]
  });

  // Quiz 3: Vai trò, tên gọi & sự kiện gần đây
  quizzes.push({
    title: 'CĐSP Đà Lạt – Vai trò, tên gọi & sự kiện 2022',
    description:
      'Các vai trò giáo dục – di sản, gắn với tên Yersin và mốc sáp nhập 08/2022.',
    difficulty: 'Trung bình',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Những vai trò/đặc trưng nào được nhấn mạnh trong nội dung? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Địa danh giáo dục gắn với lịch sử đô thị Đà Lạt',
          'Dấu ấn kiến trúc và giá trị bảo tồn di sản',
          'Gắn với tên Alexandre Yersin (qua tên Lycée Yersin)',
          'Là công trình thủy lợi chặn Suối Tía'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Sự kiện hành chính mới được nhắc đến vào tháng 8/2022 là:',
        questionType: 'single_choice',
        options: [
          'Thành lập tỉnh Lâm Đồng',
          'Sáp nhập để hình thành Trường Cao đẳng Đà Lạt (mô hình tên gọi chung)',
          'Khởi công xây dựng công trình',
          'Công nhận khu du lịch quốc gia'
        ],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Năm ________, trường mang tên ____________ để tưởng niệm bác sĩ Alexandre Yersin. (điền vào chỗ trống, ghi dạng: 1935 – Lycée Yersin)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '1935 - Lycée Yersin',
            '1935 – Lycée Yersin',
            '1935- Lycée Yersin',
            '1935-Lycée Yersin',
            '1935 - Lycee Yersin'
          ]
        },
        points: 1
      },
      {
        questionText:
          'Tháng _/__, xuất hiện mốc sáp nhập theo mô hình tên gọi chung là Trường ____________. (điền vào chỗ trống, ghi dạng: 08/2022 – Cao đẳng Đà Lạt)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '08/2022 - Cao đẳng Đà Lạt',
            '8/2022 - Cao đẳng Đà Lạt',
            '08/2022 – Cao đẳng Đà Lạt',
            '8/2022 – Cao đẳng Đà Lạt',
            '08/2022- Cao đẳng Đà Lạt',
            '8/2022- Cao đẳng Đà Lạt',
            '08/2022-Cao đẳng Đà Lạt',
            '8/2022-Cao đẳng Đà Lạt',
            '08/2022 - Cao dang Da Lat'
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
    logger.info({ lessonId: LESSON_ID }, 'Attaching quizzes to CDSP Da Lat lesson');
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
      logger.info({ quizId, title: quiz.title }, 'Created quiz for CDSP Da Lat lesson');
    }

    logger.info('Done attaching quizzes to CDSP Da Lat lesson');
  } catch (e) {
    logger.error(e, 'Failed to attach quizzes to CDSP Da Lat lesson');
    process.exitCode = 1;
  }
}

main();

