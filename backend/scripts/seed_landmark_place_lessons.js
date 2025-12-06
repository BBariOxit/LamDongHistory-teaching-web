import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 55432,
  database: process.env.DB_NAME || 'webgiangday_db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
});

// Danh sách bài học về LỊCH SỬ CÁC ĐỊA DANH nổi bật ở Lâm Đồng.
// Nội dung được biên soạn lại từ các tư liệu mở (Wikipedia, cổng thông tin địa phương…)
// theo hướng tóm lược, nhấn mạnh quá trình hình thành – biến đổi – giá trị hiện nay.

const PLACE_LESSONS = [
  {
    slug: 'lang-biang-lich-su-hinh-thanh',
    title: 'Lang Biang: Di sản văn hóa – sinh thái của cao nguyên Lâm Viên',
    summary:
      'Từ không gian cư trú cổ của người K’Ho – Lạch – Chil đến Khu dự trữ sinh quyển Langbiang được UNESCO công nhận, Lang Biang ghi lại những lớp lịch sử lâu dài của vùng Lâm Viên.',
    duration: '30 phút',
    difficulty: 'Trung bình',
    tags: ['Lịch sử', 'Địa danh', 'Lang Biang'],
    image: 'https://picsum.photos/seed/langbiang/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Lang Biang: Di sản văn hóa – sinh thái của cao nguyên Lâm Viên</h1>

        <section>
          <h2>1. Không gian tự nhiên và vị trí chiến lược</h2>
          <p>
            Khối núi Lang Biang nằm ở phía Bắc Đà Lạt, cao trên 2.000m, là điểm cao nổi bật của cao nguyên Lâm Viên.
            Địa hình núi cao, thung lũng sâu cùng hệ thống suối đầu nguồn tạo nên vi khí hậu mát và nguồn nước ổn định cho cả vùng hạ du.
          </p>
          <ul>
            <li>Rừng thông, rừng kín thường xanh và nhiều loài động thực vật quý hiếm.</li>
            <li>Vị trí trung gian giữa duyên hải Nam Trung Bộ và Tây Nguyên, là “cửa ngõ” giao thương cổ.</li>
            <li>Ngày nay là vùng lõi của Khu dự trữ sinh quyển Langbiang do UNESCO công nhận.</li>
          </ul>
        </section>

        <section>
          <h2>2. Dấu ấn cư trú của cộng đồng K’Ho – Lạch – Chil</h2>
          <p>
            Nhiều nghiên cứu dân tộc học cho thấy các nhóm K’Ho, đặc biệt là Lạch và Chil, đã cư trú lâu đời quanh chân núi Lang Biang.
            Họ tổ chức buôn làng theo cấu trúc gắn với rừng – rẫy – suối, hình thành hệ thống luật tục bảo vệ rừng đầu nguồn.
          </p>
          <ul>
            <li>Nhà dài quay mặt ra rẫy, phía sau là rừng thiêng và bến nước chung.</li>
            <li>Lễ hội mừng lúa mới, cúng thần núi, thần suối gắn với chu kỳ canh tác nương rẫy.</li>
            <li>Tri thức bản địa về giống cây, nguồn nước, đường đi rừng trở thành “bản đồ sống” cho cư dân sau này.</li>
          </ul>
        </section>

        <section>
          <h2>3. Truyền thuyết Lang – Biang và ý nghĩa lịch sử</h2>
          <p>
            Truyền thuyết về chàng K’Lang và nàng H’Biang phản ánh những xung đột – hòa giải giữa các nhóm thị tộc,
            đồng thời gửi gắm khát vọng vượt qua ranh giới để xây dựng cộng đồng chung.
            Ngọn núi đôi Lang Biang được xem như biểu tượng của tình yêu, lòng dũng cảm và sự gắn kết buôn làng.
          </p>
          <p>
            Dù mang màu sắc huyền thoại, truyền thuyết giúp ta thấy được tầng sâu văn hóa của địa danh:
            một không gian nơi con người đối thoại với thiên nhiên, với luật tục và với những thay đổi của thời đại.
          </p>
        </section>

        <section>
          <h2>4. Lang Biang trong tiến trình phát triển Lâm Đồng</h2>
          <ul>
            <li>Cuối thế kỷ XIX, các đoàn khảo sát của Pháp (trong đó có Yersin) dựa vào tri thức bản địa để tiếp cận cao nguyên Lâm Viên qua vùng Lang Biang.</li>
            <li>Những ghi nhận về khí hậu, thảm thực vật, nguồn nước tại đây góp phần hình thành ý tưởng xây dựng Đà Lạt – “thành phố trên cao nguyên”.</li>
            <li>Ngày nay, Lang Biang vừa là điểm du lịch, vừa là “phòng thí nghiệm tự nhiên” cho nghiên cứu sinh thái và văn hóa bản địa.</li>
          </ul>
        </section>

        <section class="summary">
          <h2>5. Gợi ý hoạt động học tập</h2>
          <ul>
            <li>Vẽ sơ đồ thể hiện các lớp ý nghĩa của Lang Biang: tự nhiên – cộng đồng – truyền thuyết – di sản UNESCO.</li>
            <li>Sưu tầm và kể lại một phiên bản truyền thuyết Lang – Biang, sau đó phân biệt yếu tố lịch sử và yếu tố hư cấu.</li>
          </ul>
        </section>
      </div>
    `,
  },
  {
    slug: 'ho-xuan-huong-lich-su',
    title: 'Hồ Xuân Hương: Lịch sử hồ nhân tạo giữa lòng Đà Lạt',
    summary:
      'Từ thung lũng suối Cam Ly hoang sơ đến hồ nhân tạo trung tâm thành phố, Hồ Xuân Hương phản ánh các bước quy hoạch, mở rộng và cải tạo Đà Lạt hơn một thế kỷ qua.',
    duration: '30 phút',
    difficulty: 'Trung bình',
    tags: ['Lịch sử', 'Địa danh', 'Hồ Xuân Hương'],
    image: 'https://picsum.photos/seed/hoxuanhuongdalat/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Hồ Xuân Hương: Lịch sử hồ nhân tạo giữa lòng Đà Lạt</h1>

        <section>
          <h2>1. Thung lũng suối Cam Ly trước khi có hồ</h2>
          <p>
            Trước khi trở thành hồ nước rộng như ngày nay, khu vực Hồ Xuân Hương là thung lũng của suối Cam Ly
            với những đoạn đầm lầy, ruộng cỏ và dải rừng thông thấp chạy dọc theo lòng suối.
            Đây là vùng trũng tự nhiên nằm giữa các đồi thông, vừa là nơi thoát nước của cao nguyên,
            vừa là không gian sản xuất, sinh hoạt của cư dân bản địa và những nhóm dân cư đầu tiên lên Đà Lạt.
          </p>
        </section>

        <section>
          <h2>2. Xây dựng hồ trong giai đoạn quy hoạch Đà Lạt đầu thế kỷ XX</h2>
          <p>
            Khi người Pháp quy hoạch Đà Lạt thành thành phố nghỉ dưỡng trên cao nguyên, việc tạo ra một hồ nước lớn
            ở trung tâm được xem là giải pháp vừa điều tiết dòng chảy suối Cam Ly, vừa tăng giá trị cảnh quan.
            Trong những thập niên đầu thế kỷ XX, hệ thống đập được xây dựng để chặn nước, hình thành hồ nhân tạo
            với mặt nước trải dài từ khu Hòa Bình tới gần thung lũng Suối Tía.
          </p>
          <p>
            Hồ được gia cố, nạo vét và mở rộng qua nhiều đợt, gắn liền với các kế hoạch chỉnh trang đô thị:
            đường dạo ven hồ, công viên, bến thuyền và những công trình công cộng quan trọng đều hướng mặt về phía hồ.
          </p>
        </section>

        <section>
          <h2>3. Các lần trùng tu, mở rộng và biến đổi chức năng</h2>
          <p>
            Trong suốt thế kỷ XX, hồ nhiều lần được sửa chữa, củng cố bờ đập do ảnh hưởng của lũ lụt và bồi lắng.
            Việc nâng cấp hệ thống đập, kè bờ và cải tạo mặt nước phản ánh nhu cầu mới của thành phố:
            bảo vệ khu nội thị, tạo cảnh quan cho các công trình hành chính, khách sạn, trường học và khu dân cư.
          </p>
          <p>
            Qua từng giai đoạn, ranh giới và bờ hồ được điều chỉnh, nhưng vai trò của hồ trong tổ chức không gian Đà Lạt
            – như một “trục nước” mềm mại – vẫn luôn được giữ lại.
          </p>
        </section>

        <section>
          <h2>4. Tên gọi “Hồ Xuân Hương” và dấu ấn văn hóa</h2>
          <p>
            Việc đặt tên “Hồ Xuân Hương” – theo tên nữ sĩ thơ Nôm nổi tiếng – thể hiện mong muốn gắn cảnh quan Đà Lạt
            với truyền thống văn chương Việt Nam. Từ chỗ chỉ là một hồ nhân tạo phục vụ quy hoạch kỹ thuật,
            địa danh này dần trở thành biểu tượng văn hóa khi xuất hiện trong thơ ca, âm nhạc và ký ức của nhiều thế hệ người Đà Lạt.
          </p>
        </section>

        <section class="summary">
          <h2>5. Hồ Xuân Hương trong nghiên cứu lịch sử địa danh</h2>
          <p>
            Qua câu chuyện hình thành, trùng tu và đặt tên, Hồ Xuân Hương cho thấy cách một yếu tố địa lý tự nhiên
            được biến đổi bởi quyết định quy hoạch, và dần mang thêm tầng ý nghĩa văn hóa – lịch sử.
            Khi tìm hiểu các địa danh khác của Lâm Đồng, học sinh có thể sử dụng cách tiếp cận tương tự:
            xuất phát từ không gian tự nhiên, lần theo các mốc quy hoạch và nhận diện những lớp tên gọi – ký ức gắn với địa danh.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'nha-tho-con-ga-da-lat',
    title: 'Nhà thờ Con Gà: Lịch sử nhà thờ chính tòa Đà Lạt',
    summary:
      'Nhà thờ Chính tòa Đà Lạt, thường gọi là Nhà thờ Con Gà, là một trong những công trình tôn giáo cổ nhất của thành phố, phản ánh quá trình hình thành giáo phận và đô thị Đà Lạt.',
    duration: '22 phút',
    difficulty: 'Cơ bản',
    tags: ['Lịch sử', 'Địa danh', 'Nhà thờ Con Gà'],
    image: 'https://picsum.photos/seed/nhathocongadalat/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Nhà thờ Con Gà: Lịch sử nhà thờ chính tòa Đà Lạt</h1>

        <section>
          <h2>1. Bối cảnh ra đời</h2>
          <p>
            Khi Đà Lạt dần hình thành như một trung tâm nghỉ dưỡng và hành chính, cộng đồng tín hữu Công giáo cũng tăng lên.
            Đầu thế kỷ XX, nhu cầu có một nhà thờ lớn cho giáo phận và cư dân tại đây trở nên rõ rệt, dẫn đến quyết định xây dựng
            nhà thờ chính tòa trên một ngọn đồi cao nhìn xuống khu trung tâm.
          </p>
          <p>
            Công trình được thiết kế theo phong cách kiến trúc châu Âu kết hợp một số chi tiết địa phương,
            bắt đầu xây dựng vào đầu thập niên 1930 và hoàn thiện trước Thế chiến thứ hai.
          </p>
        </section>

        <section>
          <h2>2. Đặc điểm kiến trúc và biểu tượng con gà</h2>
          <ul>
            <li>Mặt bằng theo kiểu basilica, với tháp chuông cao ở phía trước, mái dốc lợp ngói.</li>
            <li>Cửa sổ kính màu, vòm cong và các chi tiết trang trí đơn giản, phù hợp khí hậu cao nguyên.</li>
            <li>Trên đỉnh tháp chuông có tượng con gà gió bằng kim loại – biểu tượng gắn liền với tên gọi dân gian “Nhà thờ Con Gà”.</li>
          </ul>
          <p>
            Hình ảnh nhà thờ với tháp chuông và con gà trở thành một trong những biểu tượng quen thuộc khi nhắc tới Đà Lạt.
          </p>
        </section>

        <section>
          <h2>3. Vai trò tôn giáo và văn hóa</h2>
          <p>
            Nhà thờ là trung tâm sinh hoạt tôn giáo của giáo phận Đà Lạt, đồng thời là điểm đến của nhiều du khách.
            Các thánh lễ, lễ Giáng sinh, lễ Phục sinh thu hút cả người dân và khách tham quan, tạo nên không khí lễ hội đặc trưng của thành phố cao nguyên.
          </p>
          <p>
            Bảo tồn kiến trúc và không gian xung quanh nhà thờ góp phần giữ gìn hình ảnh “thành phố nhà thờ và biệt thự” của Đà Lạt trong dòng chảy hiện đại hóa.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'ga-da-lat-lich-su',
    title: 'Ga Đà Lạt: Tuyến đường sắt răng cưa và di sản kiến trúc',
    summary:
      'Nhà ga Đà Lạt gắn với tuyến đường sắt răng cưa độc đáo từ Phan Rang lên cao nguyên, là minh chứng cho tham vọng khai phá và quy hoạch đô thị nghỉ dưỡng đầu thế kỷ XX.',
    duration: '28 phút',
    difficulty: 'Trung bình',
    tags: ['Lịch sử', 'Địa danh', 'Ga Đà Lạt'],
    image: 'https://picsum.photos/seed/gadalat/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Ga Đà Lạt: Tuyến đường sắt răng cưa và di sản kiến trúc</h1>

        <section>
          <h2>1. Lý do xây dựng tuyến đường sắt lên Đà Lạt</h2>
          <p>
            Để phát triển Đà Lạt thành trung tâm nghỉ dưỡng và hành chính của xứ Đông Dương, chính quyền thuộc địa cần
            một tuyến vận tải ổn định từ cảng biển lên cao nguyên. Địa hình dốc đứng khiến đường sắt thông thường khó vận hành,
            vì vậy tuyến đường sắt răng cưa Phan Rang – Đà Lạt được thiết kế trong những năm 1930.
          </p>
          <p>
            Ga Đà Lạt là ga cuối trên tuyến, được đặt trên một đồi cao hướng về trung tâm thành phố, đóng vai trò “cửa ngõ đường sắt” của cao nguyên.
          </p>
        </section>

        <section>
          <h2>2. Đặc điểm kiến trúc nhà ga</h2>
          <ul>
            <li>Mặt đứng với ba chóp nhọn tượng trưng cho ba đỉnh núi Lang Biang, trở thành hình ảnh nhận diện quen thuộc.</li>
            <li>Hệ mái dốc lợp ngói, cửa sổ kính màu, hiên rộng phù hợp khí hậu nhiều mưa và sương mù.</li>
            <li>Bên trong là các phòng chờ, quầy vé, kho hàng… được tổ chức đơn giản nhưng hài hòa với cảnh quan xung quanh.</li>
          </ul>
        </section>

        <section>
          <h2>3. Từ tuyến vận tải chiến lược đến di sản du lịch</h2>
          <p>
            Sau nhiều biến động lịch sử, tuyến đường sắt răng cưa dần ngừng hoạt động.
            Nhà ga được bảo tồn như di tích kiến trúc – kỹ thuật, và một phần tuyến đường được khôi phục phục vụ tàu du lịch Đà Lạt – Trại Mát.
          </p>
          <p>
            Ga Đà Lạt ngày nay là điểm tham quan nổi tiếng, nơi du khách có thể tìm hiểu về lịch sử đường sắt răng cưa,
            chụp ảnh với kiến trúc cổ và trải nghiệm tàu hoài niệm chạy bằng đầu máy cổ điển.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'truong-cao-dang-su-pham-da-lat-lich-su',
    title: 'Trường Cao đẳng Sư phạm Đà Lạt: Từ Lycée Yersin đến trường đào tạo giáo viên',
    summary:
      'Khu trường nằm trên đồi cao với dãy lớp hình chữ C và tháp chuông đặc trưng, là một trong những công trình giáo dục lâu đời và tiêu biểu của Đà Lạt.',
    duration: '27 phút',
    difficulty: 'Trung bình',
    tags: ['Lịch sử', 'Địa danh', 'Cao đẳng Sư phạm', 'Lycée Yersin'],
    image: 'https://picsum.photos/seed/cdspdalat/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Trường Cao đẳng Sư phạm Đà Lạt: Từ Lycée Yersin đến trường đào tạo giáo viên</h1>

        <section>
          <h2>1. Trường trung học thời thuộc địa</h2>
          <p>
            Khu trường được xây dựng trên một quả đồi cao nhìn xuống Đà Lạt, ban đầu là Lycée Yersin –
            trường trung học dành cho con em quan chức và một bộ phận học sinh ưu tú.
            Kiến trúc gạch đỏ, tháp chuông và dãy lớp cong theo đường đồi tạo nên diện mạo rất khác biệt.
          </p>
        </section>

        <section>
          <h2>2. Chuyển đổi chức năng sau 1975</h2>
          <p>
            Sau khi đất nước thống nhất, khu trường được sử dụng làm cơ sở đào tạo giáo viên,
            sau này là Trường Cao đẳng Sư phạm Đà Lạt. Nhiều thế hệ giáo viên tiểu học, trung học cơ sở của Lâm Đồng
            đã học tập tại đây, mang theo dấu ấn kiến trúc và không khí học đường đặc biệt của ngôi trường trên đồi.
          </p>
        </section>

        <section>
          <h2>3. Giá trị kiến trúc và bảo tồn</h2>
          <p>
            Khu trường được đánh giá cao về giá trị lịch sử – kiến trúc, từng được đề xuất xếp hạng di tích.
            Việc bảo tồn, sử dụng khuôn viên vừa để dạy học, vừa để tham quan nghiên cứu là bài toán quan trọng đối với địa phương.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'dinh-iii-bao-dai-da-lat',
    title: 'Dinh III Bảo Đại: Biệt điện mùa hè trên đồi thông',
    summary:
      'Dinh III là nơi nghỉ hè của vua Bảo Đại và gia đình, phản ánh một giai đoạn lịch sử đặc biệt khi Đà Lạt được chọn làm “thủ đô mùa hè” của triều đình và chính quyền sau này.',
    duration: '24 phút',
    difficulty: 'Cơ bản',
    tags: ['Lịch sử', 'Địa danh', 'Dinh Bảo Đại'],
    image: 'https://picsum.photos/seed/dinhbaodai/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Dinh III Bảo Đại: Biệt điện mùa hè trên đồi thông</h1>

        <section>
          <h2>1. Lý do xây dựng dinh thự</h2>
          <p>
            Đà Lạt với khí hậu mát mẻ được chọn làm nơi nghỉ ngơi, làm việc mùa hè của vua Bảo Đại – vị hoàng đế cuối cùng của triều Nguyễn.
            Dinh III được xây dựng trên đồi thông phía Nam thành phố, gồm khu nhà chính, vườn hoa, rừng thông bao quanh.
          </p>
        </section>

        <section>
          <h2>2. Kiến trúc và không gian sinh hoạt</h2>
          <p>
            Dinh được thiết kế theo phong cách hiện đại châu Âu thập niên 1930 với khối nhà 2 tầng, mái bằng, cửa sổ lớn mở ra cảnh quan.
            Bên trong có phòng làm việc, phòng ngủ, phòng sinh hoạt gia đình, phòng tiếp khách và không gian dành cho các hoạt động nghi lễ.
          </p>
          <p>
            Những vật dụng, ảnh chụp, trang phục còn lưu giữ giúp người xem hình dung cuộc sống của hoàng gia trong giai đoạn cuối thời quân chủ.
          </p>
        </section>

        <section>
          <h2>3. Di tích lịch sử – văn hóa</h2>
          <p>
            Sau năm 1945, dinh trải qua nhiều biến động nhưng vẫn được giữ lại, trở thành điểm tham quan quan trọng của Đà Lạt.
            Dinh III không chỉ là địa điểm du lịch mà còn là “phòng học mở” về lịch sử triều Nguyễn, thời thuộc địa và những chuyển đổi chính trị ở Việt Nam giữa thế kỷ XX.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'ho-tuyen-lam-lich-su',
    title: 'Hồ Tuyền Lâm: Lịch sử hình thành hồ và vùng sinh thái phía Nam Đà Lạt',
    summary:
      'Hồ Tuyền Lâm hình thành từ việc xây dựng đập đầu nguồn suối Tía, trở thành không gian du lịch – sinh thái quan trọng gắn với Thiền viện Trúc Lâm và rừng thông Đà Lạt.',
    duration: '26 phút',
    difficulty: 'Cơ bản',
    tags: ['Lịch sử', 'Địa danh', 'Hồ Tuyền Lâm'],
    image: 'https://picsum.photos/seed/hotuyenlam/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Hồ Tuyền Lâm: Lịch sử hình thành hồ và vùng sinh thái phía Nam Đà Lạt</h1>

        <section>
          <h2>1. Bối cảnh hình thành hồ</h2>
          <p>
            Khu vực Tuyền Lâm vốn là thung lũng rừng thông với hệ thống suối nhỏ đổ về sông Đa Tam.
            Cuối thế kỷ XX, công trình đập đầu nguồn được xây dựng, tạo nên hồ nước rộng với nhiều nhánh,
            góp phần điều tiết nước cho khu vực và mở ra tiềm năng phát triển du lịch sinh thái.
          </p>
        </section>

        <section>
          <h2>2. Không gian sinh thái – du lịch</h2>
          <p>
            Hồ Tuyền Lâm được bao quanh bởi rừng thông và các khu sinh thái, khu nghỉ dưỡng.
            Hệ thống bến thuyền, đường mòn, đảo nhỏ giữa hồ tạo nên phong cảnh yên bình,
            trở thành điểm đến quen thuộc của người dân và du khách.
          </p>
        </section>

        <section>
          <h2>3. Vai trò hiện nay</h2>
          <p>
            Hồ Tuyền Lâm không chỉ có giá trị cảnh quan mà còn là không gian quan trọng trong chiến lược phát triển du lịch xanh của Đà Lạt.
            Bảo vệ chất lượng nước, rừng và kiểm soát mật độ xây dựng quanh hồ là nhiệm vụ cấp thiết để giữ gìn địa danh này cho tương lai.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'thien-vien-truc-lam-da-lat',
    title: 'Thiền viện Trúc Lâm Đà Lạt: Trung tâm Phật giáo gắn với hồ Tuyền Lâm',
    summary:
      'Thiền viện Trúc Lâm được xây dựng trên đồi cao nhìn xuống hồ Tuyền Lâm, là một trong những thiền viện lớn của phái Trúc Lâm Yên Tử ở Tây Nguyên.',
    duration: '20 phút',
    difficulty: 'Cơ bản',
    tags: ['Lịch sử', 'Địa danh', 'Thiền viện Trúc Lâm'],
    image: 'https://picsum.photos/seed/thienvientruclam/1200/800',
    contentHtml: `
      <div class="lesson-content">
        <h1>Thiền viện Trúc Lâm Đà Lạt: Trung tâm Phật giáo gắn với hồ Tuyền Lâm</h1>

        <section>
          <h2>1. Bối cảnh xây dựng</h2>
          <p>
            Thiền viện được xây dựng vào cuối thế kỷ XX trên một ngọn đồi cao phía Nam Đà Lạt,
            nằm giữa rừng thông và nhìn thẳng xuống hồ Tuyền Lâm.
            Đây là một trong những thiền viện lớn của dòng Thiền Trúc Lâm Yên Tử, góp phần lan tỏa đời sống tâm linh tại vùng cao nguyên.
          </p>
        </section>

        <section>
          <h2>2. Không gian kiến trúc</h2>
          <p>
            Quần thể gồm cổng tam quan, chánh điện, nhà tổ, vườn hoa, khu nội viện và hệ thống bậc thang xuống bến thuyền Tuyền Lâm.
            Kiến trúc kết hợp giữa truyền thống chùa Việt và cảnh quan rừng – hồ, tạo cảm giác thanh tịnh, gần gũi thiên nhiên.
          </p>
        </section>

        <section>
          <h2>3. Vai trò tôn giáo và du lịch</h2>
          <p>
            Thiền viện là nơi tu học của tăng ni, Phật tử và đồng thời là điểm tham quan nổi tiếng.
            Việc tổ chức tham quan, hành hương cần đi kèm ý thức giữ gìn sự tĩnh lặng, sạch đẹp của không gian tu học.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'khu-hoa-binh-cho-da-lat-lich-su',
    title: 'Khu Hòa Bình – Chợ Đà Lạt: Lịch sử trung tâm thương mại của thành phố',
    summary:
      'Khu Hòa Bình và Chợ Đà Lạt là “trái tim” buôn bán – giao lưu của thành phố, phản ánh sự thay đổi qua các giai đoạn từ thị trấn thuộc địa đến đô thị hiện đại.',
    duration: '30 phút',
    difficulty: 'Trung bình',
    tags: ['Lịch sử', 'Địa danh', 'Chợ Đà Lạt', 'Khu Hòa Bình'],
    image:
      'https://images.unsplash.com/photo-1587033411194-e62206c57cdb?w=1200',
    contentHtml: `
      <div class="lesson-content">
        <h1>Khu Hòa Bình – Chợ Đà Lạt: Lịch sử trung tâm thương mại của thành phố</h1>

        <section>
          <h2>1. Từ chợ tạm đến chợ trung tâm</h2>
          <p>
            Khi Đà Lạt mới hình thành, các hoạt động trao đổi hàng hóa diễn ra tại những chợ tạm, lều quán gần bờ suối.
            Cùng với quá trình đô thị hóa, chính quyền lần lượt xây dựng các ngôi chợ kiên cố hơn,
            tạo nên khu vực trung tâm thương mại ngày nay gọi là Khu Hòa Bình – Chợ Đà Lạt.
          </p>
        </section>

        <section>
          <h2>2. Kiến trúc chợ và khu phố xung quanh</h2>
          <p>
            Tòa nhà chợ nhiều tầng, bậc thang nối với phố dốc xung quanh tạo nên “không gian bậc thang” đặc trưng.
            Các ki-ốt, dãy nhà phố, rạp chiếu phim, quán cà phê, khu Hòa Bình – Hòa Bình cũ… hình thành nên một quần thể kiến trúc – thương mại sống động.
          </p>
        </section>

        <section>
          <h2>3. Những biến đổi và bài toán bảo tồn</h2>
          <p>
            Qua thời gian, chợ và khu trung tâm nhiều lần sửa chữa, nâng cấp; các dự án cải tạo, tái thiết đặt ra câu hỏi về việc
            giữ lại ký ức đô thị và hình ảnh quen thuộc của “chợ Đà Lạt – phố dốc” trong lòng người dân.
            Cuộc tranh luận về phương án quy hoạch mới cho thấy tầm quan trọng của việc tôn trọng lịch sử địa danh khi phát triển hiện đại.
          </p>
        </section>
      </div>
    `,
  },
  {
    slug: 'thac-dambri-lich-su',
    title: 'Thác Dambri (Bảo Lộc): Từ truyền thuyết đến khu du lịch',
    summary:
      'Thác Dambri gắn với truyền thuyết về lòng chung thủy của cô gái K’Ho, đồng thời là minh chứng cho cách một địa danh tự nhiên được khai thác thành khu du lịch sinh thái phía Nam Lâm Đồng.',
    duration: '24 phút',
    difficulty: 'Cơ bản',
    tags: ['Lịch sử', 'Địa danh', 'Thác Dambri'],
    image:
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200',
    contentHtml: `
      <div class="lesson-content">
        <h1>Thác Dambri (Bảo Lộc): Từ truyền thuyết đến khu du lịch</h1>

        <section>
          <h2>1. Truyền thuyết về thác nước</h2>
          <p>
            Theo truyền thuyết địa phương, Dambri nghĩa là “chờ đợi” trong tiếng K’Ho.
            Câu chuyện kể về cô gái khóc chờ người yêu đến nỗi nước mắt hóa thành dòng thác trắng xóa giữa núi rừng.
            Hình ảnh ấy phản ánh chiều sâu tình cảm và trí tưởng tượng của cư dân bản địa đối với cảnh quan thiên nhiên.
          </p>
        </section>

        <section>
          <h2>2. Thác nước trong không gian tự nhiên Bảo Lộc</h2>
          <p>
            Thác Dambri cao hàng chục mét, nằm giữa rừng cây xanh, là nơi hợp lưu của nhiều dòng suối nhỏ.
            Từ lâu, thác là địa điểm quan trọng trong đời sống cư dân: nơi săn bắt, hái lượm, lấy nước và tổ chức một số nghi lễ dân gian.
          </p>
        </section>

        <section>
          <h2>3. Phát triển khu du lịch và yêu cầu bảo tồn</h2>
          <p>
            Từ cuối thế kỷ XX, Dambri được quy hoạch thành khu du lịch sinh thái với đường xuống chân thác, hệ thống cáp treo, khu vui chơi.
            Việc khai thác du lịch mang lại lợi ích kinh tế cho địa phương nhưng cũng đặt ra yêu cầu về bảo vệ rừng, nguồn nước và giữ gìn bản sắc văn hóa bản địa gắn với thác.
          </p>
        </section>
      </div>
    `,
  },
];

async function upsertPlaceLesson(client, place) {
  const {
    slug,
    title,
    summary,
    duration,
    difficulty,
    tags,
    image,
    contentHtml,
  } = place;

  const r = await client.query('SELECT lesson_id FROM lessons WHERE slug=$1', [slug]);
  const images = image
    ? JSON.stringify([{ url: image, caption: title, description: summary }])
    : JSON.stringify([]);

  if (r.rows.length === 0) {
    await client.query(
      `
      INSERT INTO lessons (
        title, slug, summary, content_html,
        instructor, duration, difficulty,
        rating, study_sessions_count,
        category, tags, images, status,
        created_by, is_published
      )
      VALUES (
        $1,$2,$3,$4,
        $5,$6,$7,
        $8,$9,
        $10,$11,$12,$13,
        $14,$15
      )
    `,
      [
        title,
        slug,
        summary,
        contentHtml,
        'Ban biên soạn Lịch sử Lâm Đồng',
        duration,
        difficulty,
        5,
        0,
        'Lịch sử địa danh',
        tags,
        images,
        'Chưa học',
        null,
        true,
      ],
    );
    console.log('➕ Created place lesson', slug);
  } else {
    await client.query(
      `
      UPDATE lessons
      SET title=$2,
          summary=$3,
          content_html=$4,
          instructor=$5,
          duration=$6,
          difficulty=$7,
          category=$8,
          tags=$9,
          images=$10,
          is_published=true,
          updated_at=NOW()
      WHERE slug=$1
    `,
      [
        slug,
        title,
        summary,
        contentHtml,
        'Ban biên soạn Lịch sử Lâm Đồng',
        duration,
        difficulty,
        'Lịch sử địa danh',
        tags,
        images,
      ],
    );
    console.log('✅ Updated place lesson', slug);
  }
}

async function demoteOldAreaLessons(client) {
  const oldSlugs = [
    'djiring-di-linh-cua-ngo-khai-pha',
    'da-lat-trung-tam-khi-hau-hanh-chinh',
    'lien-khuong-ha-tang-ket-noi',
    'bao-loc-truc-nong-cong-nghiep',
  ];
  await client.query(
    `
    UPDATE lessons
    SET is_published=false,
        tags=ARRAY['Lịch sử','Lịch sử địa phương'],
        category='Lịch sử địa phương'
    WHERE slug = ANY($1)
  `,
    [oldSlugs],
  );
  console.log('ℹ️  Demoted old khu vực lessons from Địa danh section');
}

async function main() {
  const client = await pool.connect();
  try {
    console.log('📚 Seeding landmark place lessons...');
    await client.query('BEGIN');

    await demoteOldAreaLessons(client);

    for (const place of PLACE_LESSONS) {
      await upsertPlaceLesson(client, place);
    }

    await client.query('COMMIT');
    console.log('🎉 Landmark place lessons seed completed.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('❌ Seed landmark place lessons failed:', e);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
