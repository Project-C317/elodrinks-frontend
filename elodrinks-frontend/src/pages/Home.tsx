import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Carousel from '../pages/Carousel';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Header />

      {/* HERO SECTION */}
      <section className='hero-section'>
        <img src={`src/images/banner${currentIndex + 1}.png`} alt={`Banner ${currentIndex + 1}`} />
        <div className='divTexto'>
          <h1>
            Trabalhamos com os melhores produtos do mercado,
            <br />
            insumos frescos e ingredientes artesanais.
          </h1>
        </div>
      </section>

      {/* SOBRE / TEXTO INSTITUCIONAL */}
      <section style={{ backgroundColor: '#9D4815', padding: '2rem' }}>
        <div className='sectionInfo'>
          <div className='sectionInfo2'>
            <div className='line1'>
              <svg width='12' height='217' viewBox='0 0 12 217' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M6 0.226497L0.226497 6L6 11.7735L11.7735 6L6 0.226497ZM6 216.774L11.7735 211L6 205.226L0.226497 211L6 216.774ZM5 6L5 211H7L7 6H5Z' fill='white' />
              </svg>
            </div>
            <div className='text-sectionInfo'>
              <h2>SEU DRINK EM NOSSAS MÃOS</h2>
              <p>Sabe aquela alegria que simples detalhes nos proporcionam, como um abraço, um beijo, um drink com quem tanto amamos… A companhia de quem é importante para nós?</p>
              <p>Foram esses sentimentos que nos motivaram a abrir a Elo Drinks. Queremos que vivenciem a alegria que é a celebração da vida e do amor.</p>
            </div>
            <div
              style={{
                position: 'relative',
                marginTop: '20px'
              }}
            >
              <img src='/elodrinks-frontend/src/images/equipe.png' alt='Equipe 1' className='fotoAtras' />
              <img src='/elodrinks-frontend/src/images/equipe2.png' alt='Equipe 2' className='fotoFrente' />
            </div>
          </div>
        </div>
      </section>

      {/* NOSSOS SERVIÇOS */}
      <section className='servicos' style={{ backgroundColor: '#101820', padding: '2rem' }}>
        <h2>NOSSOS SERVIÇOS</h2>
        <div className='flexBoxGeral'>
          <div className='grid-3 tipo1'>
            <picture>
              <img src='/elodrinks-frontend/src/images/equipe.png' alt='imagem 1' />
            </picture>
            <p>
              Drinks <br /> Personalizados
            </p>
          </div>
          <div className='grid-3 tipo2'>
            <picture>
              <img src='/elodrinks-frontend/src/images/equipe2.png' alt='imagem 1' />
            </picture>
            <p>
              Eventos <br /> Corporativos
            </p>
          </div>
          <div className='grid-3 tipo1'>
            <picture>
              <img src='/elodrinks-frontend/src/images/equipe.png' alt='imagem 1' />
            </picture>
            <p>
              Coffee <br /> Break
            </p>
          </div>
          <div className='grid-3 tipo2'>
            <picture>
              <img src='/elodrinks-frontend/src/images/equipe2.png' alt='imagem 1' />
            </picture>
            <p>
              Eventos <br /> Corporativos
            </p>
          </div>
          <div className='grid-3 tipo1'>
            <picture>
              <img src='/elodrinks-frontend/src/images/equipe.png' alt='imagem 1' />
            </picture>
            <p>
              Eventos <br /> Corporativos
            </p>
          </div>
          <div className='grid-3 tipo2'>
            <picture>
              <img src='/elodrinks-frontend/src/images/equipe2.png' alt='imagem 1' />
            </picture>
            <p>
              Eventos <br /> Corporativos
            </p>
          </div>
        </div>
      </section>

      {/* CARDÁPIO E ESPECIALISTAS */}
      <section className='cardapio' style={{ backgroundColor: '#5D4A38', padding: '2rem' }}>
        <h2>CARDÁPIO</h2>
        <p className='p-texto'>Selecione o tipo de cardápio que pretende servir para visualizar nossas melhores opções</p>
        <div className='flexBoxGeral pt1'>
          <div className='grid-3'>
            <svg width='110' height='110' viewBox='0 0 110 110' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M77.447 6.875C73.2013 6.88408 69.1322 8.57468 66.1301 11.5768C63.1279 14.5789 61.4373 18.6481 61.4282 22.8937H46.4751C45.6272 22.8937 44.8141 23.2306 44.2146 23.8301C43.615 24.4296 43.2782 25.2428 43.2782 26.0906C43.2782 26.9385 43.615 27.7516 44.2146 28.3512C44.8141 28.9507 45.6272 29.2875 46.4751 29.2875H74.2501V35.6812H43.897L25.6095 8.18125C25.108 7.58807 24.4078 7.19775 23.6395 7.0832C22.8713 6.96865 22.0876 7.13771 21.435 7.55879C20.7823 7.97988 20.3052 8.62418 20.0929 9.37134C19.8806 10.1185 19.9476 10.9174 20.2814 11.6188L27.5001 22.9625H19.7314C18.8835 22.9625 18.0704 23.2993 17.4708 23.8988C16.8713 24.4984 16.5345 25.3115 16.5345 26.1594V42.1437C16.5299 43.409 16.7758 44.6626 17.2579 45.8324C17.74 47.0023 18.4488 48.0651 19.3435 48.9598C20.2381 49.8545 21.301 50.5633 22.4708 51.0453C23.6406 51.5274 24.8942 51.7733 26.1595 51.7688C26.5856 51.7716 27.0067 51.8615 27.3968 52.0329C27.7869 52.2044 28.1379 52.4537 28.4282 52.7656C28.7251 53.0566 28.9603 53.4044 29.1198 53.7883C29.2792 54.1722 29.3597 54.5843 29.3564 55C29.3564 57.5527 30.3704 60.0009 32.1755 61.8059C33.9805 63.6109 36.4287 64.625 38.9814 64.625H45.3751V87.0719H42.1782C39.6255 87.0719 37.1774 88.0859 35.3723 89.891C33.5673 91.696 32.5532 94.1442 32.5532 96.6969V99.8937C32.5532 100.742 32.89 101.555 33.4896 102.154C34.0891 102.754 34.9022 103.091 35.7501 103.091H61.3939C62.2417 103.091 63.0549 102.754 63.6544 102.154C64.2539 101.555 64.5907 100.742 64.5907 99.8937V96.6969C64.5907 94.1442 63.5767 91.696 61.7716 89.891C59.9666 88.0859 57.5184 87.0719 54.9657 87.0719H51.7689V64.625H58.197C59.4622 64.6295 60.7159 64.3837 61.8857 63.9016C63.0555 63.4195 64.1183 62.7107 65.013 61.816C65.9077 60.9214 66.6165 59.8585 67.0986 58.6887C67.5807 57.5189 67.8265 56.2652 67.822 55C67.831 54.149 68.1755 53.3359 68.7805 52.7374C69.3855 52.1388 70.2022 51.8031 71.0532 51.8031C73.6059 51.8031 76.0541 50.7891 77.8591 48.984C79.6642 47.179 80.6782 44.7308 80.6782 42.1781V26.1938C80.6782 25.3459 80.3414 24.5327 79.7419 23.9332C79.1424 23.3337 78.3292 22.9969 77.4814 22.9969H67.822C67.7436 21.6868 67.9339 20.3746 68.3813 19.1408C68.8287 17.907 69.5237 16.7777 70.4236 15.8224C71.3234 14.8671 72.4092 14.1059 73.614 13.5856C74.8189 13.0653 76.1174 12.7969 77.4298 12.7969C78.7422 12.7969 80.0407 13.0653 81.2456 13.5856C82.4504 14.1059 83.5362 14.8671 84.436 15.8224C85.3359 16.7777 86.0309 17.907 86.4783 19.1408C86.9257 20.3746 87.116 21.6868 87.0376 22.9969C87.0413 25.313 86.1977 27.5504 84.6657 29.2875C84.3143 29.5815 84.0302 29.9476 83.8326 30.361C83.6351 30.7744 83.5287 31.2255 83.5207 31.6836C83.5127 32.1417 83.6032 32.5962 83.7862 33.0163C83.9692 33.4363 84.2404 33.8122 84.5813 34.1183C84.9223 34.4244 85.325 34.6536 85.7623 34.7904C86.1996 34.9273 86.6612 34.9685 87.1158 34.9114C87.5704 34.8542 88.0074 34.7 88.3972 34.4592C88.787 34.2184 89.1205 33.8966 89.3751 33.5156C91.4178 31.2098 92.7522 28.3639 93.2186 25.3189C93.685 22.274 93.2636 19.1591 92.0047 16.3476C90.7459 13.536 88.7031 11.1471 86.1211 9.46704C83.5391 7.78697 80.5274 6.88701 77.447 6.875ZM58.197 96.6625H38.9814C38.9814 95.8146 39.3182 95.0015 39.9177 94.402C40.5172 93.8024 41.3304 93.4656 42.1782 93.4656H55.0001C55.848 93.4656 56.6611 93.8024 57.2606 94.402C57.8602 95.0015 58.197 95.8146 58.197 96.6625ZM71.0189 45.375C69.7549 45.375 68.5033 45.624 67.3355 46.1077C66.1678 46.5914 65.1067 47.3003 64.213 48.1941C63.3192 49.0879 62.6102 50.1489 62.1265 51.3167C61.6428 52.4844 61.3939 53.736 61.3939 55C61.3915 55.423 61.3052 55.8414 61.14 56.2309C60.9748 56.6203 60.7339 56.9731 60.4314 57.2687C60.1376 57.5715 59.7844 57.8102 59.394 57.97C59.0036 58.1297 58.5843 58.2069 58.1626 58.1969H38.9814C38.1335 58.1969 37.3204 57.8601 36.7208 57.2605C36.1213 56.661 35.7845 55.8479 35.7845 55C35.7754 52.4501 34.7585 50.0072 32.9554 48.2041C31.1523 46.401 28.7094 45.3841 26.1595 45.375C25.7362 45.3746 25.3172 45.2892 24.9275 45.1238C24.5378 44.9585 24.1852 44.7166 23.8907 44.4125C23.5922 44.1227 23.356 43.7751 23.1964 43.391C23.0368 43.0068 22.9573 42.5941 22.9626 42.1781H29.3907C30.2386 42.1781 31.0517 41.8413 31.6513 41.2418C32.2508 40.6423 32.5876 39.8291 32.5876 38.9813C32.5876 38.1334 32.2508 37.3202 31.6513 36.7207C31.0517 36.1212 30.2386 35.7844 29.3907 35.7844H22.9626V29.3906H31.9345L45.9251 50.3594C46.1204 50.7698 46.401 51.1338 46.7481 51.4272C47.0952 51.7206 47.5009 51.9367 47.938 52.0609C48.3752 52.1851 48.8339 52.2147 49.2834 52.1476C49.733 52.0806 50.163 51.9185 50.5449 51.6721C50.9269 51.4257 51.2518 51.1007 51.4982 50.7187C51.7446 50.3368 51.9067 49.9067 51.9737 49.4572C52.0408 49.0077 52.0112 48.549 51.8869 48.1118C51.7627 47.6746 51.5467 47.269 51.2532 46.9219L48.1251 42.2125H74.2501C74.2456 42.6323 74.1585 43.0472 73.9937 43.4333C73.8288 43.8195 73.5896 44.1693 73.2895 44.463C72.9895 44.7567 72.6345 44.9884 72.2449 45.1449C71.8553 45.3013 71.4387 45.3795 71.0189 45.375Z' fill='currentColor' />
            </svg>
            <h3>
              DRINK <br /> ESPECIAL
            </h3>
          </div>

          <div className='grid-3'>
            <svg width='110' height='110' viewBox='0 0 110 110' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M75.625 96.25C62.2187 100.719 47.7813 100.719 34.375 96.25L30.9375 34.375H79.0625L75.625 96.25Z' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
              <path d='M58.4375 34.375C58.4375 23.0313 67.7188 13.75 79.0625 13.75C90.4062 13.75 99.6875 23.0313 99.6875 34.375C99.6875 45.7187 90.4062 55 79.0625 55' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
              <path d='M34.375 65.3125H44C49.1563 65.3125 53.9688 64.2812 58.4375 61.875C62.9062 59.4688 68.0625 58.4375 72.875 58.4375H77.6875' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
              <circle cx='79.0625' cy='24.0625' r='3.4375' fill='currentColor' />
              <circle cx='89.375' cy='34.375' r='3.4375' fill='currentColor' />
              <path d='M24.0625 13.75H37.8125C41.5938 13.75 44.6875 16.8437 44.6875 20.625V34.375' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
              <path d='M44.6875 48.125V65.3125' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
            </svg>
            <h3>
              BAR DE <br />
              CAIPIRINHAS
            </h3>
          </div>

          <div className='grid-3'>
            <svg width='110' height='110' viewBox='0 0 110 110' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g clip-path='url(#clip0_21_57)'>
                <path d='M75.625 106.562H34.375L27.5 48.125H82.5L75.625 106.562Z' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
                <path d='M20.625 48.125H89.375' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
                <path d='M27.5 48.125C27.5 33 39.875 20.625 55 20.625C70.125 20.625 82.5 33 82.5 48.125' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
                <path d='M44.6875 3.4375H49.5C52.5937 3.4375 55 5.84375 55 8.9375V27.5' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
                <path d='M55 82.5C62.5939 82.5 68.75 77.8829 68.75 72.1875C68.75 66.4921 62.5939 61.875 55 61.875C47.4061 61.875 41.25 66.4921 41.25 72.1875C41.25 77.8829 47.4061 82.5 55 82.5Z' stroke='currentColor' stroke-width='7' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round' />
              </g>
              <defs>
                <clipPath id='clip0_21_57'>
                  <rect width='110' height='110' fill='currentColor' />
                </clipPath>
              </defs>
            </svg>
            <h3>
              SOFT <br /> DRINKS
            </h3>
          </div>
        </div>

        <div className='flexBoxGeral pt2'>
          <div className='grid-2'>
            <h3>ESPECIALISTAS PARA O SEU EVENTO</h3>
            <p>Oferecemos serviços profissionais para eventos e estabelecimentos. Contamos com uma equipe especializada, incluindo bartender, barbacks, cheffes, copeiras e coordenadores, prontos para garantir o sucesso do seu evento ou operação. Entre em contato e saiba como podemos atender às suas necessidades!</p>
            <div className='btn1'>SOLICITE UM ORÇAMENTO</div>
          </div>
          <div className='grid-2 fundo-lateral'>
            <p className='text-lateral'>BARTENDER</p>
            <img
              src='/elodrinks-frontend/src/images/imagem-cardapio1.png'
              alt='Equipe Bartender'
              style={{
                width: '100%',
                maxWidth: '500px'
              }}
            />
          </div>
        </div>
      </section>

      {/* ELEGÂNCIA E EMPRESAS ATENDIDAS */}
      <section className='empresas' style={{ padding: '2rem' }}>
        <h2>O SABOR DA ELEGÂNCIA EM CADA GOLE</h2>
        <div className='flexBoxGeral'>
          <div className='grid-3'>
            <h3>25</h3>
            <p>CIDADES ATENDIDAS</p>
          </div>
          <div className='grid-3'>
            <h3>1200</h3>
            <p>HORAS DE EVENTO</p>
          </div>
          <div className='grid-3'>
            <h3>56</h3>
            <p>EMPRESAS ATENDIDAS</p>
          </div>
        </div>

        <div className='flexBoxGeral'>
          <div className='grid-2'>
            <p>A Elo Drinks é especializada em serviços de coquetelaria para eventos sociais e eventos corporativos. Hoje ela vem sendo reconhecida no mercado de eventos corporativos e de wedding por indicações dos melhores assessores, decoradores e espaço de eventos da Grande São Paulo por terem ótimos profissionais e um excelente atendimento.</p>
          </div>
          <div className='grid-2'>
            <svg width='112' height='12' viewBox='0 0 112 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M0.226497 6L6 11.7735L11.7735 6L6 0.226497L0.226497 6ZM111.774 6L106 0.226497L100.227 6L106 11.7735L111.774 6ZM6 7H106V5H6V7Z' fill='#E0CEAA' />
            </svg>
            <p>Quando o assunto é Open Bar, a Elo Drinks vem se destacando a cada ano com inovações e personalizações para cada tipo de festa.</p>
          </div>
        </div>

        <h2>ALGUMAS EMPRES AS ATENDIDAS</h2>
        <Carousel />
      </section>
    </div>
  );
}
