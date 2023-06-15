import PageHeader from 'components/PageHeader';
import styled from 'styled-components';
import pxToRem from 'utils/helpers/pxToRem';

const OPozoristu = () => {
  return (
    <div>
      <PageHeader>O Pozoristu</PageHeader>
      <Body className="mt-5">
        <span>
          Niš je jedan od prvih gradova koji je ušao u istoriju srpskog
          pozorišta. Prvi poznati pozorišni događaj zabeležen je 1883. godine na
          plakatu, za jednu od predstava putujuće družine, koja je izvedena
          prigodno, povodom godišnjice stupanja u brak kralja Milana i kraljice
          Natalije Obrenović. Spajanjem pozorišnih družina D. Jovanovića i M.
          Dimića, početkom 1887 godine, osnovano je niško pozorište „Sinđelić“.
          Prva predstava bila je „Srpski ajduci“, J. Sterije Popovića, 11. marta
          1887. godine u gostionici “ Knez Mihajlo“. Inicijatori osnivanja
          pozorišta „Sinđelić“ bili su: Stevan Sremac – niški profesor, Milorad
          Petrović – učitelj, Stevan Nikšić – Lala, Henrih Liler i Špira Kalik.
          Prvi upravnik bio je Mihajlo Dimić. Igrani su komadi: „Ukroćena
          goropad“, „Mizantrop“, „Dva cvancika“, „Podvala“. Pozorište „Sinđelić“
          je ušlo u drugu etapu razvoja u periodu od 1890-1900 godine, u vreme
          velikih partijsko-političkih okršaja u poslednjoj deceniji vladavine
          dinastije Obrenović. Svoje predstave je davalo u gostionici „Evropa“.
          Godine 1892. pozorište je obustavilo svoj rad. 1893. konačno je
          osnovano niško pozorište „Sinđelić“. Tada je Niš postao treća srpska
          metropola. Iako se stalno govorilo o potrebi podizanja pozorišne
          zgrade, „Sinđelić“ je i dalje izvodio svoje predstave u gostionicama:
          „Evropa“, „Kruna“, bašti „Maćedonija“, „Pariz“, kasnije takozvanoj
          „Zelenoj gimnaziji“, „Bulevar“. 1906. godine sazidana je sala „Ruski
          car“. Posle dvogodišnjeg odsustva, Niš je ponovo dobio svoje pozorište
          pod upravom Koste Delinija (1904-1912).
        </span>

        <img src="http://www.narodnopozoristenis.rs/wp-content/uploads/2018/10/narodno-pozoriste-nis-zgrada-starog-pozorista.png" />

        <span>
          1915. godine obustavlja rad. Od 1921-1929 životari, skoro
          improvizovano pozorište. Zauzimanjem Branislava Nušića i udruženja
          glumaca, 1921. godine spojile su se družine „Sinđelić“ i „Gundulić“.
          Novo pozorište se zvalo povlašćeno gradsko pozorište. 1922. godine na
          sednici niške opštine, na predlog Dragiše Cvetkovića, odeređeno je
          zelljište za podizanje pozorišne zgrade. U periodu 1929-1930 godine
          pozorište radi pod imenom Pozorište Moravske banovine. U zgradi
          zanatskog doma bilo je 400 sedišta. 1931. godine pozorište je otvorilo
          sezonu u Nišu, izvođenjem komada „Smrt majke Jugovića“. Sedam godina
          pozorište je radilo u Zanatskom domu. 1936. godine prvi put je
          prenošena preko beogradskog radija predstava – drugi čin komada „Zona
          Zamfirova“, S. Sremca – Sime Bunića. Prvog januara 1939. godine u
          novosazidanoj zgradi na Sinđelićevom trgu, prikazana je prva predstava
          „Zidanje Ravanice“ ili „Zadužbina cara Lazara“, u režiji Dragoslava
          Kandića. Pozorište je imalo 687 sedišta. Prvo veliko obnavljanje
          pozorišne zgrade bilo je 1968. godine; drugo 1986. godine; treće
          2002/2003. godine.
        </span>
      </Body>
    </div>
  );
};

const Body = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  img {
    width: ${pxToRem(400)};
    height: ${pxToRem(400)};
    margin-bottom: 20px;
  }
`;

export default OPozoristu;
