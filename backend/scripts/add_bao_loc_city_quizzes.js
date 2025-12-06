import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';
import {
  createQuizWithQuestions,
  deleteQuizAndQuestions
} from '../src/modules/quizzes/repositories/quizManagementRepo.js';

// Hiện tại bài Bảo Lộc (Blao): Trục nông – công nghiệp chế biến có lesson_id = 42
// (bạn có thể đổi sang bài mới nếu tạo riêng "Thành phố Bảo Lộc (B’Lao) – đô thị cao nguyên phía Nam Lâm Đồng")
const LESSON_ID = 42;

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

  // Quiz 1: Địa danh & chuỗi mốc 1958–1959
  quizzes.push({
    title: 'Bảo Lộc – Địa danh & mốc 1958–1959',
    description:
      'Kiểm tra kiến thức về tên gọi B’Lao/Bảo Lộc và các mốc đổi tên 1958–1959.',
    difficulty: 'Cơ bản',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Tên gọi lịch sử/bản địa gắn với Bảo Lộc thường được nhắc là:',
        questionType: 'single_choice',
        options: ['Djiring', 'B’Lao', 'Lang Biang', 'Tháp Chàm'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Mốc đổi tên B’Lao thành Bảo Lộc theo nội dung đã nêu là ngày nào?',
        questionType: 'single_choice',
        options: ['19/5/1958', '19/2/1959', '11/7/1994', '8/4/2010'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Sự kiện hành chính quan trọng ngày 19/5/1958 được nhắc là:',
        questionType: 'single_choice',
        options: [
          'Thành lập TP Bảo Lộc',
          'Chia huyện Bảo Lộc thành thị xã và huyện',
          'Đổi tên tỉnh Đồng Nai Thượng thành tỉnh Lâm Đồng và dời tỉnh lỵ về B’Lao',
          'Công nhận khu du lịch quốc gia'
        ],
        correctIndex: 2,
        points: 1
      },
      {
        questionText:
          'Những mốc nào thuộc chuỗi 1958–1959 theo nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          '19/5/1958 (đổi tên tỉnh Đồng Nai Thượng thành Lâm Đồng, dời tỉnh lỵ về B’Lao)',
          '19/2/1959 (đổi tên B’Lao thành Bảo Lộc)',
          '11/7/1994 (thành lập thị xã Bảo Lộc)',
          '8/4/2010 (thành lập TP Bảo Lộc)'
        ],
        answerSchema: { correctIndexes: [0, 1] },
        points: 1
      },
      {
        questionText:
          'Tên gọi bản địa/lịch sử của vùng Bảo Lộc là ____________. (điền vào chỗ trống)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: ['B’Lao', "B'Lao", 'Blao', "b'lao", 'blao']
        },
        points: 1
      }
    ]
  });

  // Quiz 2: Nâng cấp đô thị & văn bản hành chính
  quizzes.push({
    title: 'Bảo Lộc – Nâng cấp đô thị',
    description:
      'Chuỗi mốc thị xã (1994), thành phố (2010) và các văn bản hành chính liên quan.',
    difficulty: 'Trung bình',
    timeLimit: 12,
    assessmentType: 'mixed',
    questions: [
      {
        questionText: 'Năm nào Bảo Lộc được nâng cấp thành thị xã?',
        questionType: 'single_choice',
        options: ['1979', '1994', '2004', '2017'],
        correctIndex: 1,
        points: 1
      },
      {
        questionText: 'Năm nào Bảo Lộc trở thành thành phố?',
        questionType: 'single_choice',
        options: ['2010', '1994', '1959', '1920'],
        correctIndex: 0,
        points: 1
      },
      {
        questionText:
          'Văn bản được trích dẫn cho việc thành lập TP Bảo Lộc là:',
        questionType: 'single_choice',
        options: [
          'Nghị định 65/CP',
          'Nghị quyết 19/NQ-CP',
          'Quyết định 1240/QĐ-TTg',
          'Dụ 19/3/1916'
        ],
        correctIndex: 1,
        points: 1
      },
      {
        questionText:
          'Những mốc nào thuộc nhóm “nâng cấp đô thị” trong nội dung đã nêu? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          '1994: Thị xã Bảo Lộc',
          '2010: Thành phố Bảo Lộc',
          '1959: Đổi tên B’Lao thành Bảo Lộc',
          '1893: Yersin thám hiểm Lang Biang'
        ],
        answerSchema: { correctIndexes: [0, 1] },
        points: 1
      },
      {
        questionText:
          'Ngày //____: đổi tên B’Lao thành ____________. (điền vào chỗ trống, ghi đầy đủ dạng: 19/02/1959 – Bảo Lộc)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '19/02/1959 - Bảo Lộc',
            '19/2/1959 - Bảo Lộc',
            '19/02/1959 – Bảo Lộc',
            '19/2/1959 – Bảo Lộc',
            '19/02/1959- Bảo Lộc',
            '19/2/1959- Bảo Lộc',
            '19/02/1959-Bảo Lộc',
            '19/2/1959-Bảo Lộc',
            '19/02/1959 - Bao Loc',
            '19/2/1959 - Bao Loc'
          ]
        },
        points: 1
      },
      {
        questionText:
          'Năm ________: ban hành Nghị định 65/CP, chia huyện Bảo Lộc thành ____________ Bảo Lộc và huyện Bảo Lâm. (điền vào chỗ trống, ghi đầy đủ dạng: 1994 – thị xã)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '1994 - thị xã',
            '1994 – thị xã',
            '1994- thị xã',
            '1994-thị xã',
            '1994 - thi xa',
            '1994 – thi xa',
            '1994- thi xa',
            '1994-thi xa'
          ]
        },
        points: 1
      },
      {
        questionText:
          'Năm ________: ban hành Nghị quyết 19/NQ-CP, thành lập ____________ Bảo Lộc. (điền vào chỗ trống, ghi đầy đủ dạng: 2010 – thành phố)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '2010 - thành phố',
            '2010 – thành phố',
            '2010- thành phố',
            '2010-thành phố',
            '2010 - thanh pho',
            '2010 – thanh pho',
            '2010- thanh pho',
            '2010-thanh pho'
          ]
        },
        points: 1
      }
    ]
  });

  // Quiz 3: Bản sắc địa danh & kinh tế – xã hội
  quizzes.push({
    title: 'Bảo Lộc – Địa danh & bản sắc kinh tế',
    description:
      'Từ lớp địa danh B’Lao tới bản sắc “xứ trà B’Lao” và “tơ lụa Bảo Lộc”.',
    difficulty: 'Trung bình',
    timeLimit: 10,
    assessmentType: 'mixed',
    questions: [
      {
        questionText:
          'Theo nội dung đã nêu, “lịch sử địa danh học” của Bảo Lộc thể hiện ở điểm nào? (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'B’Lao là lớp tên bản địa và còn lưu trong tên phường B’Lao',
          'Có các cách diễn giải nghĩa tên B’Lao khác nhau giữa cộng đồng cư trú',
          'Tên B’Lao → Bảo Lộc là một mốc Việt hóa/hành chính hóa rõ rệt',
          'Bảo Lộc vốn là cảng biển lớn của Nam Trung Bộ'
        ],
        answerSchema: { correctIndexes: [0, 1, 2] },
        points: 1
      },
      {
        questionText:
          'Những trụ cột bản sắc phát triển kinh tế thường gắn với Bảo Lộc theo nội dung đã nêu là: (chọn tất cả đáp án đúng)',
        questionType: 'multi_select',
        options: [
          'Trà (B’Lao)',
          'Dâu tằm – tơ lụa',
          'Dầu khí ngoài khơi',
          'Cà phê (chỉ là trọng tâm duy nhất)'
        ],
        answerSchema: { correctIndexes: [0, 1] },
        points: 1
      },
      {
        questionText:
          'Ngày //____: đổi tên tỉnh Đồng Nai Thượng thành tỉnh ____________ và dời tỉnh lỵ về B’Lao. (điền vào chỗ trống, ghi đầy đủ dạng: 19/05/1958 – Lâm Đồng)',
        questionType: 'fill_blank',
        answerSchema: {
          acceptedAnswers: [
            '19/05/1958 - Lâm Đồng',
            '19/5/1958 - Lâm Đồng',
            '19/05/1958 – Lâm Đồng',
            '19/5/1958 – Lâm Đồng',
            '19/05/1958- Lâm Đồng',
            '19/5/1958- Lâm Đồng',
            '19/05/1958-Lâm Đồng',
            '19/5/1958-Lâm Đồng',
            '19/05/1958 - Lam Dong',
            '19/5/1958 - Lam Dong'
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
    logger.info({ lessonId: LESSON_ID }, 'Attaching quizzes to Bao Loc lesson');
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
      logger.info({ quizId, title: quiz.title }, 'Created quiz for Bao Loc lesson');
    }

    logger.info('Done attaching quizzes to Bao Loc lesson');
  } catch (e) {
    logger.error(e, 'Failed to attach quizzes to Bao Loc lesson');
    process.exitCode = 1;
  }
}

main();

