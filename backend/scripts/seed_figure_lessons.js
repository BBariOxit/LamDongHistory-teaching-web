import 'dotenv/config';
import { query } from '../src/config/pool.js';
import { logger } from '../src/utils/logger.js';
import { createLesson } from '../src/modules/lessons/repositories/lessonRepo.js';

// Bài học nhân vật lịch sử gắn với Lâm Đồng.
// Nội dung tóm tắt dựa trên các tư liệu phổ biến về lịch sử Đà Lạt,
// hành trình thám hiểm cao nguyên của bác sĩ Alexandre Yersin
// và các bài viết giới thiệu nhân vật địa phương. 
// Bạn nên rà soát lại với nguồn tài liệu chính thức của tỉnh trước khi dùng giảng dạy chính thức.

const FIGURE_LESSONS = [
  {
    title: 'Bác sĩ Yersin và hành trình khám phá Lang Biang',
    slug: 'bac-si-yersin-kham-pha-lang-biang',
    summary:
      'Từ các chuyến thám hiểm năm 1893 đến việc kiến nghị xây dựng trung tâm nghỉ dưỡng Đà Lạt, bác sĩ Alexandre Yersin đã để lại dấu ấn sâu đậm trên cao nguyên Lâm Viên.',
    contentHtml: `
      <div class="lesson-content">
        <h1>Bác sĩ Alexandre Yersin và hành trình khám phá Lang Biang</h1>

        <section>
          <h2>1. Yersin là ai?</h2>
          <p>
            Alexandre Yersin (1863–1943) là bác sĩ, nhà vi sinh học người Pháp gốc Thụy Sĩ,
            nổi tiếng với việc cùng cộng sự xác định tác nhân gây bệnh dịch hạch
            (sau này được gọi là trực khuẩn Yersinia pestis).
          </p>
          <p>
            Ông làm việc nhiều năm cho Viện Pasteur, tham gia các chương trình nghiên cứu y học
            và thám hiểm thuộc địa tại Đông Dương.
          </p>
        </section>

        <section>
          <h2>2. Hành trình lên cao nguyên Lâm Viên (1893)</h2>
          <ul>
            <li>Năm 1893, theo đề nghị của Toàn quyền Đông Dương, Yersin tổ chức chuyến khảo sát dọc dãy Trường Sơn Nam.</li>
            <li>
              Từ vùng biển Nha Trang, ông đi bộ, cưỡi ngựa và voi, băng qua các buôn làng của người bản địa
              để tìm kiếm cao nguyên có khí hậu mát thích hợp xây dựng trạm nghỉ dưỡng.
            </li>
            <li>
              Ngày 21–6–1893, Yersin đặt chân lên cao nguyên Lâm Viên, khu vực Lang Biang,
              ghi nhận khí hậu mát, thảm thực vật phong phú, ít muỗi sốt rét.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Từ báo cáo khảo sát tới ý tưởng thành phố Đà Lạt</h2>
          <p>
            Sau chuyến đi, Yersin gửi nhiều báo cáo cho chính quyền thuộc địa,
            nhấn mạnh ưu thế khí hậu của cao nguyên Lâm Viên so với vùng duyên hải nóng ẩm.
          </p>
          <ul>
            <li>Đề xuất xây dựng một trung tâm nghỉ dưỡng và điều dưỡng cho binh lính, quan chức ở độ cao trên 1.400 m.</li>
            <li>
              Những gợi ý này trở thành cơ sở quan trọng để Toàn quyền Paul Doumer sau đó quyết định quy hoạch
              một thành phố nghỉ dưỡng – tiền thân của Đà Lạt ngày nay.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Quan hệ với cư dân bản địa và di sản tại Lâm Đồng</h2>
          <ul>
            <li>Trong các chuyến đi, Yersin dựa nhiều vào kinh nghiệm dẫn đường của người K\'Ho, Lạch và các nhóm bản địa khác.</li>
            <li>
              Các ghi chép của ông góp phần giúp giới khoa học châu Âu biết đến điều kiện tự nhiên, khí hậu
              và đời sống cư dân ở cao nguyên Lâm Viên cuối thế kỷ XIX.
            </li>
            <li>
              Tại Đà Lạt, tên ông được đặt cho một số công trình và trường học, thể hiện sự ghi nhận
              đối với đóng góp khoa học và vai trò trong việc khơi mở vùng đất này.
            </li>
          </ul>
        </section>

        <section class="summary">
          <h2>5. Ý nghĩa lịch sử</h2>
          <p>
            Hành trình của Yersin không chỉ là một chuyến thám hiểm khoa học,
            mà còn mở đường cho sự hình thành đô thị Đà Lạt và quá trình khai phá cao nguyên Lâm Viên.
          </p>
        </section>

        <section>
          <h2>Tư liệu tham khảo gợi ý</h2>
          <ul>
            <li>Các bài viết về Alexandre Yersin trên Wikipedia tiếng Việt và Wikipedia tiếng Pháp.</li>
            <li>Một số công trình nghiên cứu về lịch sử hình thành Đà Lạt, do Viện Sử học và Sở Văn hóa, Thể thao và Du lịch Lâm Đồng xuất bản.</li>
          </ul>
        </section>
      </div>
    `,
    instructor: 'Ban biên soạn Lịch sử Lâm Đồng',
    duration: '22 phút',
    difficulty: 'Cơ bản',
    category: 'Nhân vật lịch sử',
    tags: ['Nhân vật lịch sử', 'Khoa học', 'Lang Biang', 'Đà Lạt'],
    images: [
      {
        url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Petit-Yersin.jpg',
        caption: 'Chân dung bác sĩ Alexandre Yersin',
        description: 'Nhà bác học đã thực hiện các chuyến thám hiểm lên cao nguyên Lâm Viên cuối thế kỷ XIX.',
      },
    ],
  },
  {
    title: 'Khuất Phù: Dấu ấn quan triều Nguyễn ở cao nguyên',
    slug: 'khuat-phu-quan-trieu-nguyen-o-cao-nguyen',
    summary:
      'Khái quát vai trò của một số quan lại triều Nguyễn trong việc quản lý vùng Tây Nguyên – Nam Trung Bộ, từ đó gợi mở cách tiếp cận nhân vật địa phương như Khuất Phù qua tư liệu địa phương chí.',
    contentHtml: `
      <div class="lesson-content">
        <h1>Khuất Phù: Gợi mở về dấu ấn quan triều Nguyễn ở vùng cao</h1>

        <section>
          <h2>1. Hạn chế tư liệu và cách tiếp cận</h2>
          <p>
            Trong các tài liệu lịch sử phổ biến trên mạng hiện nay,
            thông tin cụ thể về nhân vật Khuất Phù gắn với Lâm Đồng còn khá hạn chế
            và thường chỉ xuất hiện trong một số bài viết giới thiệu địa phương hoặc truyền khẩu.
          </p>
          <p>
            Bài học này gợi ý cấu trúc khai thác nhân vật quan lại triều Nguyễn có liên hệ với vùng cao nguyên
            (bao gồm cả Khuất Phù nếu giáo viên có nguồn tư liệu địa phương tin cậy),
            đồng thời nhắc rõ cho học sinh về tầm quan trọng của việc kiểm chứng nguồn.
          </p>
        </section>

        <section>
          <h2>2. Bối cảnh triều Nguyễn quản lý vùng cao nguyên</h2>
          <ul>
            <li>
              Từ thế kỷ XIX, triều Nguyễn thiết lập hệ thống đồn biên phòng, dinh trấn và các chức quan phụ trách miền Thượng
              để kiểm soát giao thương, an ninh và thu thuế.
            </li>
            <li>
              Một số quan lại được giao nhiệm vụ khảo sát đường sá, bố trí dân cư, hòa giải xung đột
              giữa cư dân Kinh và các tộc người bản địa.
            </li>
            <li>
              Đây là giai đoạn chuyển tiếp quan trọng trước khi thực dân Pháp mở rộng chiếm đóng và lập các trung tâm mới như Đà Lạt.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Hướng dẫn học sinh khai thác tư liệu về nhân vật địa phương</h2>
          <ul>
            <li>Tìm đọc <em>địa chí</em>, kỷ yếu hội thảo, kỷ yếu ngành giáo dục địa phương về các nhân vật có công khai phá vùng đất.</li>
            <li>Phỏng vấn người cao tuổi, cán bộ văn hóa xã và các nhà nghiên cứu địa phương (nếu có điều kiện).</li>
            <li>Đối chiếu giữa tư liệu chính thống và truyền thuyết dân gian để nhận diện phần lịch sử và phần huyền thoại.</li>
          </ul>
        </section>

        <section class="summary">
          <h2>4. Ghi chú sư phạm</h2>
          <p>
            Giáo viên nên bổ sung thông tin chi tiết về nhân vật Khuất Phù từ tài liệu địa phương chính thức
            (Sở Giáo dục và Đào tạo, Sở Văn hóa, Thể thao và Du lịch, hoặc các nhà nghiên cứu)
            trước khi sử dụng bài học như tài liệu tham khảo chính thức cho học sinh.
          </p>
        </section>
      </div>
    `,
    instructor: 'Ban biên soạn Lịch sử Lâm Đồng',
    duration: '18 phút',
    difficulty: 'Trung bình',
    category: 'Nhân vật lịch sử',
    tags: ['Nhân vật lịch sử', 'Triều Nguyễn', 'Khai phá vùng cao'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
        caption: 'Minh họa quan lại triều Nguyễn ở vùng núi',
        description: 'Hình minh họa dùng tạm cho bài học về nhân vật quan lại gắn với vùng cao nguyên.',
      },
    ],
  },
  {
    title: 'Anh hùng K’Nai: Hình tượng người chiến sĩ bản địa',
    slug: 'anh-hung-knai-hinh-tuong-nguoi-chiensi-ban-dia',
    summary:
      'Sử dụng hình tượng anh hùng K’Nai như một ví dụ để tìm hiểu cách người dân bản địa ghi nhớ những người lãnh đạo cộng đồng trong các phong trào bảo vệ đất đai và bản sắc văn hóa.',
    contentHtml: `
      <div class="lesson-content">
        <h1>Anh hùng K’Nai: Hình tượng người chiến sĩ bản địa</h1>

        <section>
          <h2>1. Truyền thống ghi nhớ anh hùng ở các buôn làng</h2>
          <p>
            Ở nhiều tộc người bản địa Tây Nguyên (như K’Ho, Mạ, Chu Ru...), 
            những người có công lãnh đạo cộng đồng chống lại sự xâm lấn đất đai, 
            bảo vệ buôn làng thường được nhắc nhớ qua sử thi, truyện kể và lễ hội.
          </p>
          <p>
            Nhân vật K’Nai trong bài học này được sử dụng như một hình tượng tiêu biểu,
            thay vì một nhân vật đã được biên soạn đầy đủ trong sách sử phổ thông.
          </p>
        </section>

        <section>
          <h2>2. Bối cảnh xung đột đất đai và bản sắc</h2>
          <ul>
            <li>Quá trình mở rộng đồn điền, khai thác lâm sản và lập các trung tâm hành chính mới thường gây áp lực lên không gian sống truyền thống.</li>
            <li>Cộng đồng bản địa phải điều chỉnh cách canh tác, đường di chuyển, nghi lễ gắn với rừng và suối.</li>
            <li>Trong bối cảnh đó, một số già làng, người có uy tín đứng ra tập hợp cộng đồng, thương lượng, hoặc đấu tranh bảo vệ quyền lợi.</li>
          </ul>
        </section>

        <section>
          <h2>3. Hình tượng anh hùng bản địa qua lăng kính lịch sử – văn hóa</h2>
          <ul>
            <li>Được ghi nhớ như người dám đứng lên bảo vệ buôn làng, nhưng câu chuyện thường được kể bằng ngôn ngữ huyền thoại.</li>
            <li>Có thể không xuất hiện trong các bộ sử chính thống, mà nằm trong kho tàng truyện kể, trường ca, lễ hội.</li>
            <li>Việc đưa các nhân vật này vào bài học giúp học sinh nhận ra lịch sử không chỉ tồn tại trong văn bản hành chính, mà còn trong ký ức cộng đồng.</li>
          </ul>
        </section>

        <section>
          <h2>4. Gợi ý hoạt động học tập</h2>
          <ul>
            <li>Tổ chức cho học sinh sưu tầm truyện kể tại địa phương về những người có công với buôn làng.</li>
            <li>Vẽ sơ đồ hoặc poster về “anh hùng bản địa” mà các em tìm hiểu được.</li>
            <li>Thảo luận sự khác biệt giữa nhân vật trong truyện dân gian và nhân vật lịch sử được ghi chép bằng văn bản.</li>
          </ul>
        </section>

        <section class="summary">
          <h2>5. Ghi chú về nguồn tư liệu</h2>
          <p>
            Bài học nên được gắn với các nguồn tư liệu điền dã, địa chí hoặc nghiên cứu dân tộc học cụ thể của giáo viên.
            Ở đây, tên gọi K’Nai được dùng như một nhãn để đại diện cho nhóm anh hùng buôn làng nói chung, 
            chứ không khẳng định một nhân vật lịch sử duy nhất.
          </p>
        </section>
      </div>
    `,
    instructor: 'Ban biên soạn Lịch sử Lâm Đồng',
    duration: '15 phút',
    difficulty: 'Cơ bản',
    category: 'Nhân vật lịch sử',
    tags: ['Nhân vật lịch sử', 'Cộng đồng', 'Bản sắc văn hóa', 'Buôn làng'],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518091043644-c1f4c8e3df60?w=1200',
        caption: 'Không gian núi rừng Tây Nguyên',
        description: 'Hình minh họa cho bối cảnh buôn làng và rừng núi trong các câu chuyện về anh hùng bản địa.',
      },
    ],
  },
];

async function seedFigures() {
  for (const lesson of FIGURE_LESSONS) {
    const slug = lesson.slug;
    const existing = await query('SELECT lesson_id FROM lessons WHERE slug=$1', [slug]);
    if (existing.rows.length > 0) {
      logger.info({ slug }, 'Figure lesson already exists, skipping');
      continue;
    }

    logger.info({ slug }, 'Creating figure lesson');
    await createLesson({
      ...lesson,
      createdBy: null,
      isPublished: true,
    });
  }
}

async function main() {
  try {
    await seedFigures();
    logger.info('Seed figure lessons complete');
  } catch (e) {
    logger.error(e);
    process.exitCode = 1;
  }
}

main();

