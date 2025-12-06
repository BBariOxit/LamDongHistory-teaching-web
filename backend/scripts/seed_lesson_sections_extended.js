import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 55432,
  database: process.env.DB_NAME || 'webgiangday_db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'admin123',
});

// Các section được viết chi tiết hơn cho địa danh + nhân vật
// Dữ liệu được tổng hợp và diễn đạt lại từ các nguồn mở (Wikipedia, cổng thông tin Lâm Đồng…)
// và đã rút gọn cho phù hợp bối cảnh bài học.

const SECTION_BANK = [
  {
    slug: 'lang-biang-lich-su-hinh-thanh',
    sections: [
      {
        type: 'heading',
        title: 'Lang Biang – không gian cư trú cổ',
        content_html:
          '<p>Khối núi Lang Biang là vùng cư trú lâu đời của người K’Ho – Lạch – Chil, đồng thời là vùng lõi của Khu dự trữ sinh quyển Langbiang được UNESCO công nhận. Hiểu Lang Biang giúp ta thấy được “lớp gốc” văn hóa – sinh thái của Lâm Đồng.</p>',
      },
      {
        type: 'text',
        title: '1. Cảnh quan và khí hậu',
        content_html:
          '<ul><li>Độ cao trên 2.000m, khí hậu mát quanh năm, nhiệt độ trung bình thấp hơn vùng đồng bằng.</li><li>Rừng thông, rừng hỗn giao và các suối đầu nguồn tạo nguồn nước ổn định cho vùng hạ du.</li><li>Cảnh quan núi đôi Lang – Biang gắn với truyền thuyết tình yêu cùng tên.</li></ul>',
      },
      {
        type: 'text',
        title: '2. Cộng đồng bản địa K’Ho – Lạch – Chil',
        content_html:
          '<p>Các nhóm K’Ho – Lạch – Chil tổ chức buôn làng quanh các thung lũng, phát triển tri thức bản địa về rừng, đất và nguồn nước.</p><ul><li>Nhà dài quay mặt ra rẫy, phía sau là rừng thiêng và bến nước chung.</li><li>Luật tục chia sẻ nguồn nước, cấm chặt phá rừng đầu nguồn phản ánh ý thức bảo vệ môi trường.</li></ul>',
      },
      {
        type: 'text',
        title: '3. Di sản Langbiang ngày nay',
        content_html:
          '<ul><li>Khu dự trữ sinh quyển Langbiang là “phòng thí nghiệm sinh thái” cho nghiên cứu và giáo dục môi trường.</li><li>Nhiều mô hình du lịch cộng đồng K’Ho gắn với văn hóa cồng chiêng, ẩm thực và nghề truyền thống.</li></ul>',
      },
      {
        type: 'text',
        title: '4. Câu hỏi gợi mở',
        content_html:
          '<p>Vì sao khi nói về lịch sử Lâm Đồng, người ta thường bắt đầu từ Lang Biang? Học sinh hãy lập sơ đồ thể hiện các lớp ý nghĩa: tự nhiên – cư dân – truyền thuyết – di sản thế giới.</p>',
      },
    ],
  },
  {
    slug: 'djiring-di-linh-cua-ngo-khai-pha',
    sections: [
      {
        type: 'heading',
        title: 'Djiring (Di Linh) – cửa ngõ lên cao nguyên',
        content_html:
          '<p>Djiring là trạm trung chuyển quan trọng trên tuyến đường từ duyên hải Nam Trung Bộ lên cao nguyên Lâm Viên, giữ vai trò hậu cần và kiểm soát địa bàn trong giai đoạn khai phá thuộc địa.</p>',
      },
      {
        type: 'text',
        title: '1. Vị trí trên tuyến đường lịch sử',
        content_html:
          '<ul><li>Nằm giữa Phan Rang/Phan Thiết và Đà Lạt, Di Linh là điểm dừng chân trước khi vượt lên cao nguyên.</li><li>Các đoàn khảo sát của Yersin, Doumer sử dụng đường mòn người bản địa để mở tuyến vận tải mới.</li></ul>',
      },
      {
        type: 'text',
        title: '2. Trạm trung chuyển và đồn điền',
        content_html:
          '<ul><li>Các đồn điền chè, cà phê, cao su ra đời quanh ga Djiring và quốc lộ.</li><li>Dân cư từ nhiều vùng khác di cư tới làm thuê, tạo nên sự đa dạng về văn hóa.</li></ul>',
      },
      {
        type: 'text',
        title: '3. Dấu ấn còn lại',
        content_html:
          '<p>Các đồi chè bậc thang, đường cổ qua đèo Gia Bắc và những câu chuyện về chợ Djiring là tư liệu sống để hiểu quá trình chuyển từ buôn làng bản địa sang thị trấn thuộc địa.</p>',
      },
    ],
  },
  {
    slug: 'da-lat-trung-tam-khi-hau-hanh-chinh',
    sections: [
      {
        type: 'heading',
        title: 'Đà Lạt – thành phố trên cao nguyên',
        content_html:
          '<p>Đà Lạt được hình thành từ các quyết định quy hoạch đô thị thuộc địa dựa trên báo cáo khí hậu của Yersin và trở thành trung tâm khí hậu – hành chính – giáo dục của vùng.</p>',
      },
      {
        type: 'text',
        title: '1. Đô thị nghỉ dưỡng thuộc địa',
        content_html:
          '<ul><li>Quy hoạch đường cong, mật độ xây dựng thấp, nhiều khoảng xanh.</li><li>Xây biệt thự, khách sạn, hồ Xuân Hương, vườn hoa và các cơ sở y tế – giáo dục.</li></ul>',
      },
      {
        type: 'text',
        title: '2. Trung tâm hành chính – quân sự và giáo dục',
        content_html:
          '<p>Giai đoạn 1945–1975, Đà Lạt vừa là “thủ đô mùa hè”, vừa là nơi đặt các cơ quan, học viện quan trọng.</p><ul><li>Trường Võ bị Quốc gia, các trường dòng, cơ sở đào tạo chuyên môn.</li></ul>',
      },
      {
        type: 'text',
        title: '3. Đô thị di sản hôm nay',
        content_html:
          '<ul><li>Phát triển giáo dục, nghiên cứu nông nghiệp công nghệ cao.</li><li>Du lịch gắn với kiến trúc Pháp, cảnh quan rừng – hồ và văn hóa bản địa.</li></ul>',
      },
    ],
  },
  {
    slug: 'lien-khuong-ha-tang-ket-noi',
    sections: [
      {
        type: 'heading',
        title: 'Liên Khương – nút giao thông chiến lược',
        content_html:
          '<p>Sân bay Liên Khương cùng mạng lưới quốc lộ biến khu vực này trở thành cửa ngõ hàng không và đường bộ quan trọng của Lâm Đồng.</p>',
      },
      {
        type: 'text',
        title: '1. Hình thành sân bay',
        content_html:
          '<ul><li>Từ sân bay dã chiến phục vụ quân sự đến sân bay dân dụng đón khách du lịch.</li><li>Các lần nâng cấp đường băng, nhà ga sau năm 2000 mở ra cơ hội kết nối mới.</li></ul>',
      },
      {
        type: 'text',
        title: '2. Tác động kinh tế – xã hội',
        content_html:
          '<ul><li>Rút ngắn thời gian di chuyển từ TP.HCM và các đô thị lớn tới Đà Lạt.</li><li>Tăng khả năng vận chuyển nhanh nông sản tươi như rau, hoa, cà phê đặc sản.</li></ul>',
      },
    ],
  },
  {
    slug: 'bao-loc-truc-nong-cong-nghiep',
    sections: [
      {
        type: 'heading',
        title: 'Bảo Lộc – trục nông công nghiệp phía Nam cao nguyên',
        content_html:
          '<p>Bảo Lộc nằm trên cao nguyên Di Linh, được xem là "thủ phủ chè và tơ tằm" của Lâm Đồng. Khí hậu mát, đất bazan màu mỡ đã thu hút các đồn điền cây công nghiệp từ đầu thế kỷ XX.</p><p>Hành trình của Bảo Lộc từ một vùng đồn điền Blao tới thành phố công nghiệp – dịch vụ ngày nay cho thấy cách một địa danh miền núi tham gia vào mạng lưới kinh tế quốc gia và quốc tế.</p>',
      },
      {
        type: 'text',
        title: '1. Từ đồn điền Blao đến thị trấn công nghiệp (1905–1945)',
        content_html:
          '<p>Đầu thế kỷ XX, các công ty Pháp thành lập nhiều đồn điền chè và cà phê ở vùng Blao (tên cũ của Bảo Lộc).</p><ul><li>Đường vận chuyển nông sản được mở xuống các cảng biển Phan Thiết, Phan Rang, giúp chè Blao có mặt tại nhiều thị trường.</li><li>Người Nùng, người Hoa, người Kinh từ đồng bằng di cư lên làm thuê, tạo ra khu dân cư dọc Quốc lộ 20 với quán xá, chợ nhỏ và dịch vụ đi kèm.</li><li>Cấu trúc kinh tế – xã hội bắt đầu thay đổi từ mô hình buôn làng sang thị trấn công nghiệp sơ khai.</li></ul>',
      },
      {
        type: 'text',
        title: '2. Trung tâm tơ tằm (1945–1975)',
        content_html:
          '<p>Giai đoạn này, Bảo Lộc trở thành điểm tập trung ngành tơ tằm của khu vực Nam Trung Bộ và Tây Nguyên.</p><ul><li>Nhiều nông trại dâu tằm và nhà ươm tơ xuất hiện, cung cấp tơ sống cho các cơ sở dệt lụa trong và ngoài nước.</li><li>Thương hiệu lụa Blao được biết đến rộng rãi; đội ngũ thợ ươm tơ, dệt lụa hình thành làng nghề mang bản sắc riêng.</li><li>Cùng với đó là hệ thống giáo xứ, trường học, chợ trung tâm… làm phong phú đời sống văn hóa đô thị.</li></ul>',
      },
      {
        type: 'text',
        title: '3. Chuỗi giá trị hiện đại',
        content_html:
          '<p>Ngày nay, Bảo Lộc tiếp tục phát huy thế mạnh nông nghiệp – công nghiệp chế biến với nhiều sản phẩm giá trị cao.</p><ul><li>Chè Ô Long, chè xanh chất lượng cao, cà phê đặc sản, ca cao hữu cơ được trồng theo tiêu chuẩn VietGAP, GlobalGAP.</li><li>Ngành tơ tằm chuyển dần sang sản xuất sợi tơ chất lượng cao, phục vụ dệt lụa cao cấp và xuất khẩu.</li><li>Các khu công nghiệp, làng nghề và doanh nghiệp khởi nghiệp nông nghiệp công nghệ cao xuất hiện, tạo việc làm cho lao động địa phương.</li></ul>',
      },
      {
        type: 'text',
        title: '4. Hoạt động trải nghiệm',
        content_html:
          '<p>Giáo viên có thể tổ chức cho học sinh:</p><ul><li>Thiết kế infographic giới thiệu chuỗi giá trị chè – cà phê – tơ tằm của Bảo Lộc (từ nông trại đến nhà máy và thị trường).</li><li>Đề xuất tour du lịch trải nghiệm “Một ngày làm nông dân đồi chè” hoặc “Hành trình của sợi tơ lụa”.</li><li>Phỏng vấn người làm nghề lâu năm về những thay đổi trong sản xuất và đời sống sau mỗi giai đoạn lịch sử.</li></ul>',
      },
    ],
  },
  {
    slug: 'bac-si-yersin-kham-pha-lang-biang',
    sections: [
      {
        type: 'heading',
        title: 'Yersin – nhà khoa học và người mở đường',
        content_html:
          '<p>Bài học tập trung vào hành trình khảo sát của Yersin lên cao nguyên Lâm Viên và ảnh hưởng của ông đối với việc hình thành Đà Lạt.</p>',
      },
      {
        type: 'text',
        title: '1. Cuộc đời khoa học',
        content_html:
          '<ul><li>Nhà vi sinh vật học gắn với phát hiện trực khuẩn gây bệnh dịch hạch.</li><li>Làm việc lâu năm tại các cơ sở của Viện Pasteur ở Đông Dương.</li></ul>',
      },
      {
        type: 'text',
        title: '2. Chuyến khảo sát 1893',
        content_html:
          '<p>Yersin vượt rừng núi từ duyên hải tới Lang Biang, ghi nhận khí hậu mát và đề xuất xây dựng trung tâm nghỉ dưỡng trên cao nguyên.</p>',
      },
    ],
  },
  {
    slug: 'ho-xuan-huong-lich-su',
    sections: [
      {
        type: 'heading',
        title: 'Hồ Xuân Hương – hồ nhân tạo giữa lòng Đà Lạt',
        content_html:
          '<p>Hồ Xuân Hương được hình thành từ thung lũng suối Cam Ly sau khi các đập chắn được xây dựng trong quá trình quy hoạch Đà Lạt đầu thế kỷ XX. Lịch sử của hồ gắn chặt với lịch sử quy hoạch và mở rộng không gian đô thị Đà Lạt.</p>',
      },
      {
        type: 'text',
        title: '1. Thung lũng suối Cam Ly trước khi có hồ',
        content_html:
          '<p>Trước khi đắp đập, khu vực Hồ Xuân Hương là thung lũng của suối Cam Ly với các đầm nhỏ, ruộng cỏ và rừng thông thấp. Dòng suối vừa đảm nhận chức năng thoát nước, vừa là không gian sản xuất và sinh hoạt của cư dân quanh vùng.</p>',
      },
      {
        type: 'text',
        title: '2. Xây dựng hồ trong giai đoạn quy hoạch thuộc địa',
        content_html:
          '<p>Khi người Pháp quy hoạch Đà Lạt thành thành phố nghỉ dưỡng, họ xây dựng các đập chắn trên suối Cam Ly để tạo hồ nước lớn ở trung tâm. Hồ được nạo vét, mở rộng và kè bờ qua nhiều đợt, song song với việc hình thành đường dạo ven hồ, công viên và các công trình hành chính – nghỉ dưỡng hướng mặt về phía mặt nước.</p>',
      },
      {
        type: 'text',
        title: '3. Tên gọi “Hồ Xuân Hương” và ý nghĩa văn hóa',
        content_html:
          '<p>Sau nhiều giai đoạn tồn tại, hồ nhân tạo trung tâm này được đặt tên “Hồ Xuân Hương” theo tên nữ sĩ thơ Nôm nổi tiếng. Tên gọi mới cho thấy nỗ lực gắn kết cảnh quan Đà Lạt với truyền thống văn hóa – văn học Việt Nam và dần trở thành ký hiệu quen thuộc trong thơ ca, âm nhạc, hồi ký về thành phố.</p>',
      },
      {
        type: 'text',
        title: '4. Vai trò của hồ trong lịch sử đô thị Đà Lạt',
        content_html:
          '<p>Hồ Xuân Hương luôn giữ vai trò trung tâm trong cấu trúc không gian Đà Lạt: là trục nước ngăn cách và đồng thời kết nối khu hành chính, khu thương mại, khu nghỉ dưỡng. Những lần nạo vét, gia cố bờ hồ phản ánh nhu cầu bảo vệ khu nội thị khỏi ngập lụt và duy trì hình ảnh “thành phố bên hồ” trong suốt thế kỷ XX.</p>',
      },
    ],
  },
  {
    slug: 'nha-tho-con-ga-da-lat',
    sections: [
      {
        type: 'heading',
        title: 'Nhà thờ Con Gà – nhà thờ chính tòa Đà Lạt',
        content_html:
          '<p>Nhà thờ Chính tòa Đà Lạt, thường gọi là Nhà thờ Con Gà, là một trong những công trình tôn giáo cổ nhất của thành phố, gắn với quá trình hình thành giáo phận và đô thị Đà Lạt.</p>',
      },
      {
        type: 'text',
        title: '1. Bối cảnh xây dựng',
        content_html:
          '<p>Khi dân cư và cộng đồng Công giáo tại Đà Lạt tăng lên, nhu cầu về một nhà thờ lớn xuất hiện. Công trình được xây dựng từ đầu thập niên 1930 trên một ngọn đồi cao, hướng tầm nhìn về trung tâm thành phố và hồ Xuân Hương.</p>',
      },
      {
        type: 'text',
        title: '2. Kiến trúc và biểu tượng con gà',
        content_html:
          '<p>Nhà thờ mang phong cách kiến trúc châu Âu với tháp chuông cao, mái dốc lợp ngói, cửa sổ kính màu. Trên đỉnh tháp là tượng con gà gió – biểu tượng gắn liền với tên gọi dân gian “Nhà thờ Con Gà”. Hình ảnh tháp chuông và con gà đã trở thành một trong những icon của Đà Lạt.</p>',
      },
      {
        type: 'text',
        title: '3. Vai trò tôn giáo và du lịch',
        content_html:
          '<p>Nhà thờ là trung tâm sinh hoạt của giáo phận, đồng thời là điểm tham quan yêu thích. Những dịp lễ lớn như Giáng sinh thu hút đông đảo người dân và du khách, tạo nên không khí lễ hội đặc trưng của thành phố cao nguyên.</p>',
      },
    ],
  },
  {
    slug: 'ga-da-lat-lich-su',
    sections: [
      {
        type: 'heading',
        title: 'Ga Đà Lạt – dấu ấn đường sắt răng cưa',
        content_html:
          '<p>Nhà ga Đà Lạt gắn với tuyến đường sắt răng cưa Phan Rang – Đà Lạt, từng là đầu mối giao thông quan trọng đưa hàng hóa và hành khách lên cao nguyên.</p>',
      },
      {
        type: 'text',
        title: '1. Tuyến đường sắt lên cao nguyên',
        content_html:
          '<p>Để khắc phục độ dốc lớn, tuyến đường sắt sử dụng hệ thống răng cưa đặc biệt trên một số đoạn đường. Điều này cho thấy tham vọng khai phá và khả năng ứng dụng kỹ thuật của thời kỳ thuộc địa trong việc kết nối Đà Lạt với duyên hải.</p>',
      },
      {
        type: 'text',
        title: '2. Kiến trúc ga Đà Lạt',
        content_html:
          '<p>Mặt đứng nhà ga với ba chóp nhọn gợi hình ba đỉnh núi Lang Biang, trở thành hình ảnh quen thuộc trên các bưu thiếp, tranh vẽ về Đà Lạt. Không gian nội thất, sân ga, đường ray cũ ngày nay vẫn còn lưu giữ, là tư liệu quý về lịch sử đường sắt Việt Nam.</p>',
      },
      {
        type: 'text',
        title: '3. Ga Đà Lạt trong thời hiện đại',
        content_html:
          '<p>Hiện nay, một đoạn tuyến được phục hồi để chạy tàu du lịch Đà Lạt – Trại Mát. Ga trở thành điểm tham quan kết hợp trưng bày, giúp thế hệ trẻ hiểu thêm về lịch sử giao thông và quy hoạch đô thị thời kỳ đầu.</p>',
      },
    ],
  },
  {
    slug: 'truong-cao-dang-su-pham-da-lat-lich-su',
    sections: [
      {
        type: 'heading',
        title: 'Trường CĐSP Đà Lạt – ngôi trường trên đồi',
        content_html:
          '<p>Từ Lycée Yersin thời thuộc địa đến trường Cao đẳng Sư phạm Đà Lạt, khu trường trên đồi là nơi đào tạo nhiều thế hệ học sinh, sinh viên và giáo viên cho vùng cao nguyên.</p>',
      },
      {
        type: 'text',
        title: '1. Lycée Yersin thời thuộc địa',
        content_html:
          '<p>Trường được xây dựng để phục vụ con em quan chức và một bộ phận thanh niên ưu tú, với kiến trúc gạch đỏ, dãy lớp uốn cong theo triền đồi, tháp chuông nổi bật trên nền rừng thông.</p>',
      },
      {
        type: 'text',
        title: '2. Trường đào tạo giáo viên sau 1975',
        content_html:
          '<p>Sau ngày thống nhất, khu trường trở thành cơ sở đào tạo giáo viên cho Lâm Đồng và các tỉnh lân cận. Nhiều thế hệ giáo viên trưởng thành từ ngôi trường này, mang theo ký ức về không gian học đường độc đáo.</p>',
      },
    ],
  },
  {
    slug: 'dinh-iii-bao-dai-da-lat',
    sections: [
      {
        type: 'heading',
        title: 'Dinh III Bảo Đại – biệt điện mùa hè',
        content_html:
          '<p>Dinh III là nơi nghỉ ngơi và làm việc mùa hè của vua Bảo Đại, nằm trên đồi thông phía Nam Đà Lạt, phản ánh phong cách sống và thẩm mỹ của tầng lớp thượng lưu thời kỳ giao thoa Đông – Tây.</p>',
      },
      {
        type: 'text',
        title: '1. Không gian kiến trúc',
        content_html:
          '<p>Khối nhà hai tầng mang phong cách hiện đại châu Âu, với mái bằng, cửa sổ lớn và ban công nhìn ra rừng thông. Bên trong bố trí phòng làm việc, phòng nghỉ, phòng sinh hoạt gia đình và không gian nghi lễ.</p>',
      },
      {
        type: 'text',
        title: '2. Dinh thự trong dòng chảy lịch sử',
        content_html:
          '<p>Sau các biến cố chính trị giữa thế kỷ XX, Dinh III không còn là nơi ở của hoàng gia nhưng được giữ lại tương đối nguyên vẹn. Ngày nay, dinh trở thành bảo tàng nhỏ, nơi trưng bày nhiều tư liệu, hình ảnh về triều Nguyễn giai đoạn cuối.</p>',
      },
    ],
  },
  {
    slug: 'ho-tuyen-lam-lich-su',
    sections: [
      {
        type: 'heading',
        title: 'Hồ Tuyền Lâm – không gian hồ và rừng phía Nam Đà Lạt',
        content_html:
          '<p>Hồ Tuyền Lâm được hình thành từ việc xây dựng đập trên suối Tía, tạo nên quần thể hồ – rừng quan trọng cho sinh thái và du lịch Đà Lạt.</p>',
      },
      {
        type: 'text',
        title: '1. Hình thành hồ',
        content_html:
          '<p>Công trình đập đầu nguồn được xây dựng nhằm điều tiết nước và phục vụ tưới tiêu. Qua thời gian, mặt nước hồ mở rộng, trở thành điểm nhấn cảnh quan với nhiều nhánh nhỏ len giữa rừng thông.</p>',
      },
      {
        type: 'text',
        title: '2. Không gian sinh thái và du lịch',
        content_html:
          '<p>Hồ Tuyền Lâm hiện là nơi tập trung các khu sinh thái, khu nghỉ dưỡng, bến thuyền tham quan. Hoạt động du lịch cần đi kèm biện pháp bảo vệ rừng, chống ô nhiễm nguồn nước để giữ gìn hệ sinh thái.</p>',
      },
    ],
  },
  {
    slug: 'thien-vien-truc-lam-da-lat',
    sections: [
      {
        type: 'heading',
        title: 'Thiền viện Trúc Lâm – trung tâm Phật giáo trên cao nguyên',
        content_html:
          '<p>Thiền viện Trúc Lâm Đà Lạt nằm trên đồi cao nhìn xuống hồ Tuyền Lâm, là một trong những thiền viện lớn của dòng Trúc Lâm Yên Tử.</p>',
      },
      {
        type: 'text',
        title: '1. Quá trình xây dựng',
        content_html:
          '<p>Thiền viện được xây dựng vào cuối thế kỷ XX, trong bối cảnh phong trào phục hưng Thiền phái Trúc Lâm. Khuôn viên được quy hoạch hài hòa với rừng thông, mặt hồ, tạo không gian tu học yên tĩnh.</p>',
      },
      {
        type: 'text',
        title: '2. Vai trò tôn giáo và du lịch',
        content_html:
          '<p>Nơi đây vừa là chốn tu tập của tăng ni, Phật tử, vừa đón nhiều đoàn khách tham quan. Việc giữ gìn cảnh quan, trật tự, sự tĩnh lặng của thiền viện là trách nhiệm chung của người hành hương và du khách.</p>',
      },
    ],
  },
  {
    slug: 'khu-hoa-binh-cho-da-lat-lich-su',
    sections: [
      {
        type: 'heading',
        title: 'Khu Hòa Bình – Chợ Đà Lạt: lịch sử trung tâm thương mại',
        content_html:
          '<p>Khu Hòa Bình và Chợ Đà Lạt là “trái tim” buôn bán – giao lưu của thành phố, phản ánh sự thay đổi qua các giai đoạn từ thị trấn thuộc địa đến đô thị hiện đại.</p>',
      },
      {
        type: 'text',
        title: '1. Từ chợ tạm đến chợ trung tâm',
        content_html:
          '<p>Thời kỳ đầu, việc mua bán diễn ra tại chợ tạm bên suối, các quán nhỏ ven đường. Khi Đà Lạt được quy hoạch, những ngôi chợ kiên cố dần xuất hiện, biến khu vực ngày nay thành trung tâm thương mại của thành phố.</p>',
      },
      {
        type: 'text',
        title: '2. Kiến trúc chợ và khu phố xung quanh',
        content_html:
          '<p>Tòa nhà chợ nhiều tầng, hệ bậc thang và phố dốc xung quanh tạo nên “không gian bậc thang” độc đáo. Các rạp chiếu phim, quán cà phê, ki-ốt và khu Hòa Bình cũ góp phần làm phong phú hình ảnh chợ Đà Lạt trong ký ức nhiều thế hệ.</p>',
      },
      {
        type: 'text',
        title: '3. Biến đổi và bài toán bảo tồn',
        content_html:
          '<p>Các dự án cải tạo, tái thiết khu trung tâm gợi ra nhiều cuộc trao đổi về việc làm mới đô thị nhưng vẫn phải tôn trọng di sản. Việc lựa chọn phương án quy hoạch cần cân nhắc giữa nhu cầu phát triển và giữ lại bản sắc chợ Đà Lạt – phố dốc.</p>',
      },
    ],
  },
  {
    slug: 'thac-dambri-lich-su',
    sections: [
      {
        type: 'heading',
        title: 'Thác Dambri – biểu tượng du lịch của Bảo Lộc',
        content_html:
          '<p>Thác Dambri gắn với truyền thuyết về lòng chờ đợi chung thủy của cô gái K’Ho, đồng thời là minh chứng cho cách một cảnh quan tự nhiên được quy hoạch thành khu du lịch sinh thái.</p>',
      },
      {
        type: 'text',
        title: '1. Truyền thuyết và ý nghĩa tên gọi',
        content_html:
          '<p>Tên “Dambri” thường được hiểu là “chờ đợi”. Truyền thuyết kể rằng nước thác là nước mắt của cô gái khóc chờ người yêu, phản ánh tình cảm sâu nặng và cách cộng đồng nhân cách hóa thiên nhiên.</p>',
      },
      {
        type: 'text',
        title: '2. Thác nước trong không gian rừng núi',
        content_html:
          '<p>Thác cao hàng chục mét, bao quanh là rừng cây xanh rậm rạp. Từ lâu, khu vực này là nơi người dân lui tới để săn bắt, hái lượm và tổ chức một số nghi lễ gắn với nước và rừng.</p>',
      },
      {
        type: 'text',
        title: '3. Phát triển khu du lịch',
        content_html:
          '<p>Ngày nay, Dambri được khai thác với cáp treo, đường xuống chân thác, các dịch vụ vui chơi. Hoạt động du lịch đem lại thu nhập cho địa phương nhưng cũng đòi hỏi ý thức bảo vệ rừng và hạn chế rác thải, tiếng ồn.</p>',
      },
    ],
  },
  {
    slug: 'khuat-phu-quan-trieu-nguyen-o-cao-nguyen',
    sections: [
      {
        type: 'heading',
        title: 'Khuất Phù – khung bài học về quan triều Nguyễn',
        content_html:
          '<p>Phần này gợi ý cách tiếp cận nhân vật quan lại triều Nguyễn gắn với vùng cao nguyên, nhấn mạnh tầm quan trọng của việc kiểm chứng nguồn tài liệu.</p>',
      },
      {
        type: 'text',
        title: '1. Bối cảnh quản lý miền núi',
        content_html:
          '<p>Triều Nguyễn cử các quan trấn thủ, tuần phủ, án sát… tới vùng thượng du để giữ an ninh, thu thuế và quản lý quan hệ với tộc người bản địa.</p>',
      },
      {
        type: 'text',
        title: '2. Hướng dẫn nghiên cứu nhân vật',
        content_html:
          '<p>Học sinh được khuyến khích khai thác địa chí, kỷ yếu, tư liệu lưu trữ và so sánh với truyền khẩu khi tìm hiểu nhân vật như Khuất Phù.</p>',
      },
    ],
  },
  {
    slug: 'anh-hung-knai-hinh-tuong-nguoi-chiensi-ban-dia',
    sections: [
      {
        type: 'heading',
        title: 'Anh hùng K’Nai – hình tượng chiến sĩ buôn làng',
        content_html:
          '<p>K’Nai được sử dụng như hình tượng chung cho những người đứng lên bảo vệ buôn làng trong ký ức cộng đồng bản địa.</p>',
      },
      {
        type: 'text',
        title: '1. Anh hùng trong sử thi',
        content_html:
          '<p>Các sử thi Tây Nguyên thường kể về những nhân vật dám đối mặt với thế lực xâm lấn, bảo vệ đất rừng và danh dự buôn làng.</p>',
      },
      {
        type: 'text',
        title: '2. Từ truyện kể tới bài học công dân',
        content_html:
          '<p>Qua hình tượng K’Nai, học sinh liên hệ tới trách nhiệm với cộng đồng, bảo vệ môi trường và xây dựng đời sống văn hóa mới ở buôn làng.</p>',
      },
    ],
  },
];

async function getLessonIdBySlug(client, slug) {
  const r = await client.query('SELECT lesson_id FROM lessons WHERE slug=$1 LIMIT 1', [slug]);
  return r.rows[0]?.lesson_id || null;
}

async function seedSections(client, lessonId, sections) {
  await client.query('DELETE FROM lesson_sections WHERE lesson_id=$1', [lessonId]);
  let order = 1;
  for (const s of sections) {
    await client.query(
      `
      INSERT INTO lesson_sections (lesson_id, type, title, content_html, data, order_index)
      VALUES ($1,$2,$3,$4,$5,$6)
    `,
      [lessonId, s.type, s.title || null, s.content_html || null, '{}', order++],
    );
  }
}

async function main() {
  const client = await pool.connect();
  try {
    console.log('🔁 Seeding extended lesson sections...');
    await client.query('BEGIN');
    for (const item of SECTION_BANK) {
      const lessonId = await getLessonIdBySlug(client, item.slug);
      if (!lessonId) {
        console.warn('⚠️  Lesson not found for slug:', item.slug);
        continue;
      }
      await seedSections(client, lessonId, item.sections);
      console.log('✅ Seeded sections for', item.slug);
    }
    await client.query('COMMIT');
    console.log('🎉 Extended lesson sections seed completed.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('❌ Seed extended lesson sections failed:', e);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
