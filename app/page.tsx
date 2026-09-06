/* eslint-disable nextjs/no-img-element -- Local assets are pre-optimized WebP files; source pages remain directly viewable without an image service. */
'use client';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Waves,
  Maximize2,
  Minimize2,
  Grid2X2,
  X,
  BookOpen,
  StickyNote,
  Play,
  Pause,
  Monitor,
  List,
  ChevronRight,
  Thermometer,
  Droplets,
  ScanLine,
  Cpu,
  Camera,
  Cloud,
  Activity,
  Check,
  RotateCcw,
  ExternalLink,
  Leaf,
} from 'lucide-react';
import { slides, hardware, journey } from './deck-data';

const img = (name: string) => `/assets/${name}.webp`;
const number = (n: number) => String(n).padStart(2, '0');
const mobileQuery = '(max-width: 760px)';
const motionQuery = '(prefers-reduced-motion: reduce)';
const subscribeMobile = (notify: () => void) => {
  const m = window.matchMedia(mobileQuery);
  m.addEventListener('change', notify);
  return () => m.removeEventListener('change', notify);
};
const subscribeMotion = (notify: () => void) => {
  const m = window.matchMedia(motionQuery);
  m.addEventListener('change', notify);
  return () => m.removeEventListener('change', notify);
};
const getMobile = () => window.matchMedia(mobileQuery).matches;
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const serverFalse = () => false;
const researchUrl = 'https://onlinelibrary.wiley.com/doi/10.1111/jwas.13119';
function Ocean() {
  return (
    <div className="ocean-scene" aria-hidden="true">
      <img className="ocean-photo" src={img('ocean')} alt="" />
      <img className="ocean-light" src={img('light')} alt="" />
    </div>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}
function Caption({ children }: { children: React.ReactNode }) {
  return <p className="caption">{children}</p>;
}
function HeaderText({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div className="section-heading">
      <Eyebrow>{slides[index].en}</Eyebrow>
      <h2>{children}</h2>
    </div>
  );
}
function Hero({ go }: { go: (n: number) => void }) {
  return (
    <>
      <Ocean />
      <div className="hero-copy">
        <Eyebrow>A BETTER BEGINNING</Eyebrow>
        <h1>
          ดูแลทุกจุดเริ่มต้น
          <br />
          ของ<span className="serene">ชีวิต.</span>
        </h1>
        <p>
          เครื่องฟักไข่ปลาดุกอัจฉริยะ
          <br />
          ผสานการควบคุมสภาพน้ำ กับพลังของ AI
        </p>
        <button className="primary" onClick={() => go(6)}>
          สำรวจนวัตกรรม <ArrowUpRight size={20} />
        </button>
        <div className="hero-credit">
          <span className="small-line" />
          จากปัญหาจริง สู่โอกาสเติบโตที่ดีกว่า
        </div>
      </div>
      <div className="hero-visual">
        <span className="giant-word" aria-hidden="true">
          CATFISH
        </span>
        <img
          className="hero-fish"
          src={img('catfish')}
          alt="ภาพปลาดุกจากเอกสารโครงการ"
          fetchPriority="high"
        />
        <div className="visual-label">
          <span className="status-dot" />
          SMART CATFISH EGG INCUBATOR
        </div>
      </div>
      <div className="hero-pillars">
        {['Temperature control', 'McDonald Jar', 'AI fish counting'].map(
          (x, i) => (
            <button key={x} onClick={() => go(7 + i)}>
              <span>0{i + 1}</span>
              <strong>{x}</strong>
              <ArrowRight size={18} />
            </button>
          ),
        )}
      </div>
    </>
  );
}
function Research() {
  const [hot, setHot] = useState(false);
  return (
    <div className="research-layout">
      <div>
        <Eyebrow>{slides[4].en}</Eyebrow>
        <h2>
          เพียง <span className="serene">3°C</span>
          <br />
          ก็สร้างความต่าง
        </h2>
        <p className="lede">
          อัตราการฟักของปลาดุกลูกผสม
          <br />
          ภายใต้อุณหภูมิที่ต่างกัน
        </p>
        <div className="segmented" aria-label="เลือกอุณหภูมิเปรียบเทียบ">
          <button aria-pressed={!hot} onClick={() => setHot(false)}>
            29°C
          </button>
          <button aria-pressed={hot} onClick={() => setHot(true)}>
            32°C
          </button>
        </div>
        <div className="research-callout">
          <strong>
            {hot ? '26.6' : '43.4'}
            <small>%</small>
          </strong>
          <span>อัตราฟักที่ {hot ? '32' : '29'}°C</span>
        </div>
        <Caption>ผลวิจัยอ้างอิง • ไม่ใช่ผลทดสอบเครื่องของทีม</Caption>
      </div>
      <div className="chart-panel">
        <div className="chart-top">
          <span>HATCHING RATE</span>
          <span>Rey et al., 2025</span>
        </div>
        <div className="bar-chart">
          <div className="chart-guides" aria-hidden="true">
            {[50, 40, 30, 20, 10, 0].map((n) => (
              <div key={n}>
                <span>{n}%</span>
              </div>
            ))}
          </div>
          <div className={'bar-column ' + (!hot ? 'selected' : '')}>
            <strong>
              43.4<span>%</span>
            </strong>
            <div className="bar-fill" style={{ height: '86.8%' }} />
            <span>29°C</span>
          </div>
          <div className={'bar-column warm ' + (hot ? 'selected' : '')}>
            <strong>
              26.6<span>%</span>
            </strong>
            <div className="bar-fill" style={{ height: '53.2%' }} />
            <span>32°C</span>
          </div>
        </div>
        <div className="chart-bottom">
          <span>ต่างกัน 16.8 จุดเปอร์เซ็นต์</span>
          <ArrowUpRight size={20} />
        </div>
        <Caption>
          ลูกผสม C. gariepinus × C. macrocephalus
          <br />
          <a href={researchUrl} target="_blank" rel="noreferrer">
            อ่านบทความต้นทาง <ExternalLink size={12} />
          </a>
        </Caption>
      </div>
    </div>
  );
}
function Hardware() {
  const [selected, setSelected] = useState(0);
  const item = hardware[selected];
  return (
    <>
      <HeaderText index={7}>
        รู้สภาพน้ำ
        <br />
        <span className="serene">แล้วตอบสนอง.</span>
      </HeaderText>
      <div className="hardware-layout">
        <div className="product-plinth">
          <img
            key={item.image}
            src={img(item.image)}
            alt={item.name}
            className="hardware-product"
          />
          <span className="product-label">{item.name}</span>
        </div>
        <div className="hardware-info">
          <div className="hardware-tabs" aria-label="เลือกอุปกรณ์">
            {hardware.map((h, i) => (
              <button
                key={h.name}
                className={i === selected ? 'selected' : ''}
                onClick={() => setSelected(i)}
                aria-pressed={i === selected}
              >
                <img src={img(h.image)} alt="" />
                <span>{number(i + 1)}</span>
              </button>
            ))}
          </div>
          <span className="mini-label">{item.label}</span>
          <h3>{item.th}</h3>
          <p>{item.body}</p>
          <div className="quiet-line">
            <Activity size={18} />
            <span>แนวคิดการควบคุมจาก Pitching.pdf</span>
          </div>
        </div>
      </div>
    </>
  );
}
function Counting() {
  const [calc, setCalc] = useState(false);
  const [eggs, setEggs] = useState('12500');
  const [fish, setFish] = useState('10000');
  const valid =
    eggs.trim() !== '' &&
    fish.trim() !== '' &&
    Number(eggs) > 0 &&
    Number.isInteger(Number(eggs)) &&
    Number.isInteger(Number(fish)) &&
    Number(fish) >= 0 &&
    Number(fish) <= Number(eggs);
  return (
    <>
      <HeaderText index={9}>
        จากภาพ
        <br />
        <span className="serene">สู่จำนวนที่มองเห็น.</span>
      </HeaderText>
      <div className="counting-layout">
        <div className="fry-photo">
          <img src={img('fry')} alt="ภาพลูกปลาที่ใช้ประกอบแนวคิดการนับใน PDF" />
          <div className="image-corner">
            <Camera size={16} /> SOURCE IMAGE / PITCHING.PDF
          </div>
        </div>
        <div className="counting-info">
          <span className="outlined-tag">IMAGE → INFORMATION</span>
          <h3>
            เปลี่ยนการสังเกต
            <br />
            ให้เป็นข้อมูล
          </h3>
          <p>
            บันทึกภาพ ประมวลผล และนับลูกปลา
            <br />
            เพื่อนำไปประเมินอัตราการฟัก
          </p>
          <div className="counting-flow">
            <Camera />
            <ChevronRight />
            <Cpu />
            <ChevronRight />
            <ScanLine />
          </div>
          <button
            className="text-button"
            onClick={() => setCalc((v) => !v)}
            aria-expanded={calc}
          >
            {calc ? 'ปิดเครื่องคำนวณ' : 'ลองคำนวณอัตราฟัก'}{' '}
            <ArrowUpRight size={17} />
          </button>
          {calc && (
            <div className="calculator">
              <span className="mini-label">ข้อมูลจำลอง • ไม่ใช่ผลการนับจากภาพ</span>
              <div className="input-row">
                <label>
                  จำนวนไข่ตั้งต้น
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={eggs}
                    onChange={(e) => setEggs(e.target.value)}
                  />
                </label>
                <label>
                  จำนวนที่ฟัก
                  <input
                    type="number"
                    min="0"
                    step="1"
                    max={eggs}
                    value={fish}
                    onChange={(e) => setFish(e.target.value)}
                  />
                </label>
              </div>
              <output aria-live="polite">
                {valid
                  ? `${((Number(fish) / Number(eggs)) * 100).toFixed(1)}%`
                  : 'ตรวจสอบจำนวน'}
              </output>
              <p>
                {valid
                  ? 'จำนวนที่ฟัก ÷ ไข่ตั้งต้น × 100'
                  : 'ใช้จำนวนเต็ม ไข่ตั้งต้นต้องมากกว่า 0 และจำนวนที่ฟักต้องไม่เกินไข่ตั้งต้น'}
              </p>
            </div>
          )}
          <Caption>
            หน้านี้อธิบายแนวคิด AI ตามเอกสาร
            <br />
            ยังไม่ได้ประมวลผลภาพด้วยโมเดลจริง
          </Caption>
        </div>
      </div>
    </>
  );
}
function Journey() {
  const [step, setStep] = useState(0);
  const item = journey[step];
  return (
    <>
      <HeaderText index={11}>
        ตั้งแต่ไข่
        <br />
        <span className="serene">จนถึงข้อมูล.</span>
      </HeaderText>
      <div className="journey-tabs" aria-label="ขั้นตอนการทำงาน">
        {journey.map((s, i) => (
          <button
            key={s.en}
            onClick={() => setStep(i)}
            aria-pressed={step === i}
          >
            <span>{number(i + 1)}</span>
            <strong>{s.title}</strong>
            <small>{s.en}</small>
          </button>
        ))}
      </div>
      <div className="journey-detail">
        <div>
          <span className="mini-label">
            STEP {number(step + 1)} / {item.en}
          </span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
        <img
          key={item.image}
          src={img(item.image)}
          alt={item.title}
          className={['net', 'fry'].includes(item.image) ? 'photo' : 'cutout'}
        />
      </div>
      <Caption>ลำดับสำหรับอธิบายแนวคิด • เรียบเรียงจากองค์ประกอบใน PDF</Caption>
    </>
  );
}
function SlideBody({
  index,
  go,
  source,
}: {
  index: number;
  go: (n: number) => void;
  source: () => void;
}) {
  switch (index) {
    case 0:
      return <Hero go={go} />;
    case 1:
      return (
        <div className="editorial-layout">
          <div className="editorial-photo">
            <img src={img('visit')} alt="การรับฟังและเรียนรู้จากพื้นที่เพาะเลี้ยงสัตว์น้ำ" />
            <span className="photo-tag">FIELD NOTES / PATHUM THANI</span>
          </div>
          <div className="editorial-copy">
            <Eyebrow>{slides[1].en}</Eyebrow>
            <h2>
              จุดเริ่มต้น
              <br />
              อยู่ที่<span className="serene">ฟาร์ม.</span>
            </h2>
            <p className="lede">
              นวัตกรรมที่เริ่มจากการรับฟัง
              <br />
              และเห็นปัญหาด้วยตัวเอง
            </p>
            <div className="editorial-rule" />
            <p>
              เราอยากให้ผู้เพาะฟักมีโอกาสได้ลูกปลาที่มากขึ้น
              และให้ผู้เลี้ยงได้ลูกปลาที่มีคุณภาพและแข็งแรง
            </p>
            <Caption>ความตั้งใจของโครงการ • Pitching.pdf หน้า 18</Caption>
            <img
              className="inset-photo"
              src={img('farm')}
              alt="บ่อเพาะฟักในเอกสารโครงการ"
            />
          </div>
        </div>
      );
    case 2:
      return (
        <>
          <HeaderText index={2}>
            จุดเล็ก ๆ ที่เชื่อมกับ
            <br />
            <span className="serene">เศรษฐกิจท้องถิ่น.</span>
          </HeaderText>
          <div className="market-layout">
            <div className="map-panel">
              <img src={img('map')} alt="แผนที่ประเทศไทยจาก PDF" />
              <div className="map-label">
                <span className="status-dot" />
                ปทุมธานี<small>PATHUM THANI</small>
              </div>
            </div>
            <div className="market-stats">
              <span className="mini-label">ผลผลิตปลาดุกจังหวัดปทุมธานี / 2568</span>
              <div className="huge-number">
                11,528<span>ตัน</span>
              </div>
              <div className="stat-rule">
                <strong>
                  13.57<span>%</span>
                </strong>
                <p>
                  สัดส่วนของประเทศ
                  <br />
                  ตามข้อมูลในเอกสาร
                </p>
              </div>
              <Caption>
                ที่มาใน PDF: สถิติผลการเลี้ยงสัตว์น้ำจืด กรมประมง 2568
                <br />
                ตัวเลขตาม PDF • ยังไม่ได้ยืนยันตารางต้นทาง
              </Caption>
              <button className="text-button" onClick={source}>
                ดูข้อมูลในเอกสาร <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <div className="full-photo">
            <img src={img('farm')} alt="บ่อเพาะฟักปลาดุกในเอกสาร" />
          </div>
          <div className="climate-copy">
            <Eyebrow>{slides[3].en}</Eyebrow>
            <h2>
              อุณหภูมิเปลี่ยน
              <br />
              <span className="serene">ชีวิตก็เปลี่ยน.</span>
            </h2>
            <p className="lede">
              ช่วงฟักไข่ต้องอาศัยสภาพแวดล้อม
              <br />
              ที่เอื้อต่อการพัฒนาของลูกปลา
            </p>
            <div className="climate-factors">
              <div>
                <Thermometer />
                <span>อุณหภูมิน้ำ</span>
                <small>ปัจจัยที่ต้องติดตาม</small>
              </div>
              <div>
                <Droplets />
                <span>คุณภาพน้ำ</span>
                <small>สภาพแวดล้อมที่ต้องดูแล</small>
              </div>
            </div>
            <button className="text-button" onClick={source}>
              ดูกราฟอุณหภูมิใน PDF <ArrowUpRight size={18} />
            </button>
          </div>
        </>
      );
    case 4:
      return <Research />;
    case 5:
      return (
        <>
          <HeaderText index={5}>
            วิธีเดิม
            <br />
            <span className="serene">ยังมีช่องว่าง.</span>
          </HeaderText>
          <div className="comparison-grid">
            <article>
              <div className="comparison-image">
                <img src={img('net')} alt="การฟักไข่ด้วยมุ้งเขียวตามเอกสาร" />
                <span>01 / TRADITIONAL</span>
              </div>
              <h3>การฟักด้วยมุ้งเขียว</h3>
              <p>
                เอกสารระบุข้อจำกัดเรื่องอัตราฟัก
                <br />
                ที่ต่ำและไม่คงที่
              </p>
            </article>
            <article>
              <div className="comparison-image">
                <img src={img('jars')} alt="ระบบน้ำวนที่ใช้เป็นตัวอย่างในเอกสาร" />
                <span>02 / WATER CIRCULATION</span>
              </div>
              <h3>ระบบน้ำวน</h3>
              <p>
                ยังมีโอกาสพัฒนาการเข้าถึง
                <br />
                และการควบคุมอุณหภูมิน้ำ
              </p>
            </article>
          </div>
        </>
      );
    case 6:
      return (
        <>
          <Ocean />
          <div className="innovation-intro">
            <Eyebrow>{slides[6].en}</Eyebrow>
            <h2>
              สามระบบ
              <br />
              <span className="serene">หนึ่งจุดหมาย.</span>
            </h2>
            <p className="lede">เครื่องฟักไข่ปลาดุกอัจฉริยะ</p>
            <div className="innovation-links">
              {[
                { name: 'Temperature control', icon: Thermometer },
                { name: 'McDonald Jar', icon: Droplets },
                { name: 'AI fish counting', icon: ScanLine },
              ].map((x, i) => (
                <button key={x.name} onClick={() => go(i + 7)}>
                  <span>0{i + 1}</span>
                  <x.icon size={22} />
                  <strong>{x.name}</strong>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
          </div>
          <div className="machine-visual">
            <img
              src={img('machine')}
              alt="แบบจำลองเครื่องฟักไข่ปลาดุกจาก PDF หน้า 27"
            />
            <span className="outlined-tag">แบบจำลองเครื่อง / CONCEPT MODEL</span>
          </div>
        </>
      );
    case 7:
      return <Hardware />;
    case 8:
      return (
        <>
          <HeaderText index={8}>
            ให้น้ำเคลื่อนไหว
            <br />
            <span className="serene">เพื่อชีวิต.</span>
          </HeaderText>
          <div className="jar-layout">
            <div className="jar-visual">
              <span className="jar-word" aria-hidden="true">
                FLOW
              </span>
              <img src={img('jar')} alt="ภาพโหล McDonald Jar จากเอกสาร" />
              <span className="jar-caption">McDonald Jar</span>
            </div>
            <div className="numbered-list">
              {[
                ['น้ำเข้าจากด้านล่าง', 'ทิศทางน้ำตามหลักการของโหลฟัก'],
                ['ช่วยให้ไข่เคลื่อนไหว', 'มุ่งลดการจับตัวและการติดกันของไข่'],
                ['หมุนเวียนอย่างต่อเนื่อง', 'ดูแลสภาพแวดล้อมระหว่างการฟัก'],
              ].map(([a, b], i) => (
                <div key={a}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{a}</h3>
                    <p>{b}</p>
                  </div>
                </div>
              ))}
              <Caption>
                หลักการตาม PDF หน้า 36
                <br />
                ยังไม่ระบุตัวเลขประสิทธิภาพของเครื่องต้นแบบ
              </Caption>
            </div>
          </div>
        </>
      );
    case 9:
      return <Counting />;
    case 10:
      return (
        <>
          <HeaderText index={10}>
            เชื่อมทุกส่วน
            <br />
            <span className="serene">ให้ทำงานร่วมกัน.</span>
          </HeaderText>
          <div className="architecture">
            <div className="system-path">
              <span className="path-label">สภาพน้ำ</span>
              {[
                { Icon: Thermometer, a: 'Sensors', b: 'ตรวจวัด' },
                { Icon: Cpu, a: 'ESP32', b: 'ควบคุม' },
                { Icon: Activity, a: 'Actuators', b: 'ตอบสนอง' },
              ].map(({ Icon, a, b }, i) => (
                <div className="system-step" key={a}>
                  <Icon />
                  <strong>{a}</strong>
                  <span>{b}</span>
                  {i < 2 && <ArrowRight className="connector" />}
                </div>
              ))}
            </div>
            <div className="system-path">
              <span className="path-label">ข้อมูลภาพ</span>
              {[
                { Icon: Camera, a: 'Camera', b: 'รับภาพ' },
                { Icon: Cloud, a: 'Cloud + AI', b: 'ประมวลผล' },
                { Icon: Monitor, a: 'Web App', b: 'แสดงข้อมูล' },
              ].map(({ Icon, a, b }, i) => (
                <div className="system-step" key={a}>
                  <Icon />
                  <strong>{a}</strong>
                  <span>{b}</span>
                  {i < 2 && <ArrowRight className="connector" />}
                </div>
              ))}
            </div>
          </div>
          <Caption>
            สถาปัตยกรรมตามแนวคิดใน PDF • สถานะการเชื่อมต่อจริงต้องยืนยันกับทีม
          </Caption>
        </>
      );
    case 11:
      return <Journey />;
    case 12:
      return (
        <>
          <HeaderText index={12}>
            พิสูจน์ด้วย
            <br />
            <span className="serene">การทดลอง.</span>
          </HeaderText>
          <div className="experiment-grid">
            <div className="experiment-main">
              <span className="mini-label">WHAT WE WILL MEASURE</span>
              <h3>
                ประสิทธิภาพ
                <br />
                ที่ประเมินได้
              </h3>
              {[
                'อัตราการฟักของไข่',
                'จำนวนและความแข็งแรงของลูกปลา',
                'ความคลาดเคลื่อนในการนับ*',
              ].map((t) => (
                <div className="measure" key={t}>
                  <Check size={17} />
                  {t}
                </div>
              ))}
              <Caption>
                *ตัวชี้วัดเพิ่มเติมที่เสนอสำหรับการทดสอบ AI
                <br />
                ยังไม่มีผลทดลองเครื่องที่ยืนยันในเอกสาร
              </Caption>
            </div>
            <div className="experiment-vars">
              <div>
                <span>01 / ตัวแปรต้น</span>
                <h3>เครื่องฟักไข่ปลาดุกอัจฉริยะ</h3>
              </div>
              <div>
                <span>02 / ตัวแปรตาม</span>
                <h3>ประสิทธิภาพของเครื่องฟัก</h3>
              </div>
              <div>
                <span>03 / ตัวแปรควบคุม</span>
                <p>
                  สายพันธุ์ · จำนวนไข่ · ระยะเวลาฟัก
                  <br />
                  แหล่งน้ำ · สภาพแวดล้อม
                </p>
              </div>
            </div>
          </div>
        </>
      );
    case 13:
      return (
        <>
          <div className="impact-heading">
            <Eyebrow>{slides[13].en}</Eyebrow>
            <h2>
              โอกาสเติบโต
              <br />
              ของ<span className="serene">เกษตรกร.</span>
            </h2>
            <span className="outlined-tag">ผลที่คาดว่าจะได้รับ</span>
          </div>
          <div className="impact-layout">
            <img src={img('fieldwork')} alt="ภาพการลงพื้นที่และเรียนรู้ร่วมกับเกษตรกร" />
            <div className="impact-items">
              {[
                {
                  Icon: Waves,
                  t: 'โอกาสได้ลูกปลามากขึ้น',
                  b: 'มุ่งเพิ่มประสิทธิภาพในแต่ละรอบการฟัก',
                },
                {
                  Icon: Leaf,
                  t: 'เริ่มต้นอย่างแข็งแรง',
                  b: 'มุ่งให้ผู้เลี้ยงได้ลูกปลาที่มีคุณภาพ',
                },
                {
                  Icon: ScanLine,
                  t: 'มีข้อมูลเพื่อประเมิน',
                  b: 'ต่อยอดการสังเกตด้วยเทคโนโลยีภาพ',
                },
              ].map(({ Icon, t, b }) => (
                <div key={t}>
                  <Icon />
                  <h3>{t}</h3>
                  <p>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    case 14:
      return (
        <div className="team-layout">
          <div>
            <Eyebrow>{slides[14].en}</Eyebrow>
            <h2>
              เราเริ่มต้น
              <br />
              จาก<span className="serene">การลงมือ.</span>
            </h2>
            <div className="team-name">Wongnaieiei</div>
            <p className="lede">AI and Digital Innovations</p>
            <p>โรงเรียนเตรียมอุดมศึกษาพัฒนาการ ปทุมธานี</p>
            <Caption>
              ชื่อสถาบันอ้างอิงตามหน้าทีมในเอกสาร
              <br />
              ภาพกิจกรรมจาก Pitching.pdf
            </Caption>
          </div>
          <div className="team-photos">
            <div className="team-portraits">
              {[109, 110, 111, 112].map((id, i) => (
                <div key={id}>
                  <img
                    src={img(`team-${id}`)}
                    alt={`สมาชิกทีมตามภาพใน PDF คนที่ ${i + 1}`}
                  />
                </div>
              ))}
            </div>
            <img src={img('fieldwork')} alt="ภาพลงพื้นที่ของคณะนักเรียน" />
          </div>
        </div>
      );
    case 15:
      return (
        <>
          <Ocean />
          <div className="closing">
            <Eyebrow>{slides[15].en}</Eyebrow>
            <h2>
              ให้ทุกการเริ่มต้น
              <br />
              มีโอกาส<span className="serene">เติบโต.</span>
            </h2>
            <p>
              เทคโนโลยีที่เริ่มจากปัญหาจริง
              <br />
              เพื่ออนาคตของการเพาะเลี้ยง
            </p>
            <div className="closing-actions">
              <button className="primary" onClick={source}>
                พูดคุยและสำรวจข้อมูล <ArrowUpRight size={19} />
              </button>
              <button className="text-button" onClick={() => go(0)}>
                กลับสู่จุดเริ่มต้น <RotateCcw size={17} />
              </button>
            </div>
            <span className="closing-brand">
              WONGNAIEIEI <span>/</span> SMART CATFISH HATCHERY
            </span>
          </div>
        </>
      );
    default:
      return null;
  }
}

export default function Home() {
  const [active, setActive] = useState(0),
    [readingOverride, setReading] = useState<boolean | null>(null),
    [auto, setAuto] = useState(false),
    [motionOverride, setMotion] = useState<boolean | null>(null),
    [fullscreen, setFullscreen] = useState(false),
    [modal, setModal] = useState<'menu' | 'sources' | 'notes' | null>(null),
    [sourcePage, setSourcePage] = useState(1),
    [notice, setNotice] = useState('');
  const mobile = useSyncExternalStore(subscribeMobile, getMobile, serverFalse);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getReducedMotion,
    serverFalse,
  );
  const reading = readingOverride ?? mobile;
  const motion = motionOverride ?? !reducedMotion;
  const dialog = useRef<HTMLDialogElement>(null);
  const touchStart = useRef({ x: 0, y: 0 });
  const returnFocus = useRef<HTMLElement | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const go = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(slides.length - 1, n));
      setAuto(false);
      setActive(next);
      window.location.hash = `slide-${next + 1}`;
      setModal(null);
      if (reading)
        document
          .getElementById(`slide-${next + 1}`)
          ?.scrollIntoView({ behavior: motion ? 'smooth' : 'instant' });
      else container.current?.scrollTo({ top: 0 });
    },
    [reading, motion],
  );
  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)');
    const hash = () => {
      const m = window.location.hash.match(/^#slide-(\d+)$/);
      if (m) {
        const n = Math.max(0, Math.min(15, Number(m[1]) - 1));
        setAuto(false);
        setActive(n);
        container.current?.scrollTo({ top: 0 });
        if (media.matches)
          setTimeout(
            () => document.getElementById(`slide-${n + 1}`)?.scrollIntoView(),
            50,
          );
      }
    };
    const frame = requestAnimationFrame(hash);
    window.addEventListener('hashchange', hash);
    const fs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', fs);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', hash);
      document.removeEventListener('fullscreenchange', fs);
    };
  }, []);
  useEffect(() => {
    if (!reading) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0])
          setActive(Number((visible[0].target as HTMLElement).dataset.slide));
      },
      { rootMargin: '-80px 0px -35% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    );
    document
      .querySelectorAll('[data-slide]')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [reading]);
  useEffect(() => {
    if (!auto || modal || reading) return;
    if (active >= 15) return;
    const t = setInterval(() => {
      if (document.hidden) return;
      window.history.replaceState(null, '', `#slide-${active + 2}`);
      container.current?.scrollTo({ top: 0 });
      setActive(active + 1);
      if (active === 14) setAuto(false);
    }, 16000);
    return () => clearInterval(t);
  }, [auto, modal, reading, active]);
  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen)
        await document.documentElement.requestFullscreen();
      else setNotice('เบราว์เซอร์นี้ไม่รองรับโหมดเต็มจอ');
    } catch {
      setNotice('เปิดเต็มจอไม่ได้ ลองใช้ปุ่มเต็มจอของเบราว์เซอร์');
    }
  }, []);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        modal ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      )
        return;
      if (
        (e.key === ' ' || e.key === 'Enter') &&
        (e.target instanceof HTMLButtonElement ||
          e.target instanceof HTMLAnchorElement)
      )
        return;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        go(active + 1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(active - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        go(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        go(15);
      } else if (e.key.toLowerCase() === 'f') void toggleFullscreen();
      else if (e.key.toLowerCase() === 'm') setMotion(!motion);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [active, go, modal, toggleFullscreen, motion]);
  useEffect(() => {
    if (modal) {
      returnFocus.current = document.activeElement as HTMLElement;
      dialog.current?.showModal();
    } else if (dialog.current?.open) {
      dialog.current.close();
      returnFocus.current?.focus();
    }
  }, [modal]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(''), 4500);
    return () => clearTimeout(t);
  }, [notice]);
  const sources = (n = active) => {
    setActive(n);
    setSourcePage(slides[n].pages[0]);
    setModal('sources');
  };
  const toggleReading = () => {
    setAuto(false);
    const next = !reading;
    setReading(next);
    if (next)
      setTimeout(
        () => document.getElementById(`slide-${active + 1}`)?.scrollIntoView(),
        30,
      );
    else window.scrollTo({ top: 0 });
  };
  return (
    <main
      className={`deck ${reading ? 'reading' : 'presenting'} ${motion ? '' : 'motion-off'}`}
    >
      <a className="skip-link" href="#deck-content">
        ข้ามไปยังเนื้อหา
      </a>
      <header className="topbar">
        <button
          className="brand"
          onClick={() => go(0)}
          aria-label="CATFISH กลับหน้าแรก"
        >
          <Waves size={27} />
          <span>
            CATFISH<span className="brand-sub">INTELLIGENT HATCHERY</span>
          </span>
        </button>
        <nav className="top-nav" aria-label="หมวดเนื้อหา">
          {[
            { t: 'เรื่องราว', n: 1 },
            { t: 'นวัตกรรม', n: 6 },
            { t: 'ผลกระทบ', n: 12 },
          ].map((x) => (
            <button
              key={x.t}
              className={
                active >= x.n && active < (x.n === 1 ? 6 : x.n === 6 ? 12 : 16)
                  ? 'current'
                  : ''
              }
              onClick={() => go(x.n)}
            >
              {x.t}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button motion-toggle"
            aria-label={motion ? 'หยุดภาพเคลื่อนไหว' : 'เปิดภาพเคลื่อนไหว'}
            aria-pressed={!motion}
            title={motion ? 'หยุดภาพเคลื่อนไหว (M)' : 'เปิดภาพเคลื่อนไหว (M)'}
            onClick={() => setMotion(!motion)}
          >
            {motion ? <Waves size={18} /> : <Pause size={18} />}
          </button>
          <button
            className="present-button"
            onClick={() => void toggleFullscreen()}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{fullscreen ? 'ออกเต็มจอ' : 'พรีเซนต์'}</span>
          </button>
        </div>
      </header>
      <aside className="side-rail" aria-label="หน้าสไลด์">
        <span className="rail-caption">THE STORY</span>
        {slides.map((s, i) => (
          <button
            key={s.title}
            title={`${number(i + 1)} ${s.title}`}
            aria-label={`ไปสไลด์ ${i + 1}: ${s.title}`}
            aria-current={i === active ? 'step' : undefined}
            onClick={() => go(i)}
          >
            <span>{i === active ? number(i + 1) : ''}</span>
            <i />
          </button>
        ))}
      </aside>
      <div
        id="deck-content"
        ref={container}
        className="slide-viewport"
        tabIndex={-1}
        onTouchStart={(e) => {
          touchStart.current = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY,
          };
        }}
        onTouchEnd={(e) => {
          if (reading || modal) return;
          const dx = e.changedTouches[0].clientX - touchStart.current.x,
            dy = e.changedTouches[0].clientY - touchStart.current.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5)
            go(active + (dx < 0 ? 1 : -1));
        }}
      >
        {(reading ? slides.map((_, i) => i) : [active]).map((i) => (
          <section
            key={i}
            id={`slide-${i + 1}`}
            data-slide={i}
            aria-label={`สไลด์ ${i + 1}: ${slides[i].title}`}
            className={`slide slide-${i + 1} ${i === 0 ? 'hero' : ''} ${i === 6 ? 'innovation' : ''}`}
          >
            <SlideBody index={i} go={go} source={() => sources(i)} />
            <button className="slide-source" onClick={() => sources(i)}>
              <BookOpen size={12} />
              แหล่งข้อมูล <span>↗</span>
            </button>
          </section>
        ))}
      </div>
      <footer className="deck-footer">
        <div className="footer-left">
          <button
            className="icon-button"
            aria-label="เปิดสารบัญ"
            title="สารบัญ"
            onClick={() => setModal('menu')}
          >
            <Grid2X2 size={16} />
          </button>
          <span className="footer-chapter">
            {slides[active].chapter}
            <span className="footer-divider">/</span>WONGNAIEIEI
          </span>
        </div>
        <div className="footer-center">
          <button
            className="icon-button"
            aria-label="เปิดบันทึกผู้บรรยาย"
            title="บันทึกผู้บรรยาย"
            onClick={() => setModal('notes')}
          >
            <StickyNote size={16} />
          </button>
          <button
            className="icon-button"
            aria-label={reading ? 'เปลี่ยนเป็นโหมดสไลด์' : 'เปลี่ยนเป็นโหมดอ่าน'}
            title={reading ? 'โหมดสไลด์' : 'โหมดอ่าน'}
            aria-pressed={reading}
            onClick={toggleReading}
          >
            {reading ? <Monitor size={16} /> : <List size={16} />}
          </button>
          <button
            className="icon-button auto-button"
            disabled={reading || active === 15}
            aria-label={auto ? 'หยุดเล่นอัตโนมัติ' : 'เล่นอัตโนมัติ ทุก 16 วินาที'}
            title={auto ? 'หยุดเล่นอัตโนมัติ' : 'เล่นอัตโนมัติ ทุก 16 วินาที'}
            aria-pressed={auto}
            onClick={() => setAuto((v) => !v)}
          >
            {auto ? <Pause size={15} /> : <Play size={15} />}
          </button>
        </div>
        <div className="footer-right">
          <span className="page-counter" aria-live="polite">
            {number(active + 1)}
            <span> / 16</span>
          </span>
          <button
            className="round-button"
            disabled={active === 0}
            onClick={() => go(active - 1)}
            aria-label="สไลด์ก่อนหน้า"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="round-button next"
            disabled={active === 15}
            onClick={() => go(active + 1)}
            aria-label="สไลด์ถัดไป"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </footer>
      <div className="progress-track" aria-hidden="true">
        <div style={{ width: `${((active + 1) / 16) * 100}%` }} />
      </div>
      <dialog
        ref={dialog}
        aria-label={
          modal === 'menu'
            ? 'สารบัญ'
            : modal === 'notes'
              ? 'บันทึกผู้บรรยาย'
              : 'แหล่งข้อมูล'
        }
        className={`deck-dialog ${modal === 'menu' ? 'menu-dialog' : ''}`}
        onCancel={() => setModal(null)}
      >
        <div className="dialog-content">
          <div className="dialog-header">
            <div>
              <Eyebrow>
                {modal === 'menu'
                  ? 'EXPLORE THE DECK'
                  : modal === 'notes'
                    ? 'PRESENTER NOTES'
                    : 'BEHIND THE STORY'}
              </Eyebrow>
              <h2>
                {modal === 'menu'
                  ? 'สารบัญ'
                  : modal === 'notes'
                    ? 'บันทึกผู้บรรยาย'
                    : 'แหล่งข้อมูล'}
              </h2>
            </div>
            <button
              className="icon-button"
              onClick={() => setModal(null)}
              aria-label="ปิดหน้าต่าง"
            >
              <X size={22} />
            </button>
          </div>
          {modal === 'menu' && (
            <div className="contents-grid">
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => go(i)}
                  className={i === active ? 'selected' : ''}
                >
                  <span>{number(i + 1)}</span>
                  <div>
                    <small>{s.chapter}</small>
                    <strong>{s.title}</strong>
                  </div>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          )}
          {modal === 'notes' && (
            <div className="notes-content">
              <span className="mini-label">
                {number(active + 1)} / {slides[active].en}
              </span>
              <h3>{slides[active].title}</h3>
              <p>{slides[active].note}</p>
              <div className="note-help">
                <strong>คีย์ลัด</strong>
                <p>
                  ← → หรือ Space เปลี่ยนสไลด์ · F เต็มจอ · M หยุดภาพเคลื่อนไหว · Home /
                  End หน้าแรกและหน้าสุดท้าย
                </p>
                <p>กด Esc เพื่อปิดบันทึกก่อนนำเสนอต่อ</p>
              </div>
            </div>
          )}
          {modal === 'sources' && (
            <div className="source-content">
              <p>
                เนื้อหาและภาพประกอบจาก <strong>Pitching.pdf</strong> • ทีม
                Wongnaieiei
              </p>
              <p className="source-context">{slides[active].note}</p>
              {active === 4 && (
                <a
                  className="research-link"
                  href={researchUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Rey et al., 2025 — บทความต้นทางที่ใช้แก้ตัวเลข{' '}
                  <ExternalLink size={16} />
                </a>
              )}
              <div className="source-tabs" aria-label="หน้าเอกสารอ้างอิง">
                {slides[active].pages.map((p) => (
                  <button
                    key={p}
                    aria-pressed={sourcePage === p}
                    onClick={() => setSourcePage(p)}
                  >
                    หน้า {p}
                  </button>
                ))}
              </div>
              <a
                className="source-page-link"
                href={`/sources/page-${sourcePage}.webp`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`/sources/page-${sourcePage}.webp`}
                  alt={`Pitching.pdf หน้า ${sourcePage} เอกสารต้นฉบับ`}
                />
                <span>
                  เปิดภาพเอกสารขนาดเต็ม <ExternalLink size={13} />
                </span>
              </a>
              <Caption>
                ภาพเครื่องเป็นแบบจำลองตามเอกสาร • ภาพและค่าตัวอย่างไม่ใช่ผลทดสอบที่ยืนยันแล้ว
              </Caption>
            </div>
          )}
        </div>
      </dialog>
      {notice && (
        <output className="toast" aria-live="polite">
          {notice}
        </output>
      )}
    </main>
  );
}
