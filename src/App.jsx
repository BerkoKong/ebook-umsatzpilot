import { lazy, Suspense } from 'react';
import '@fontsource-variable/inter';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-700.css';
import { Particles } from './shared/Particles';
import { Divider } from './shared/Divider';
import { ProgressBar } from './shared/ProgressBar';
import { NavMenu } from './shared/NavMenu';
import { c } from './shared/tokens';
import { Cover } from './components/Cover';
import { ZielgruppeFilter } from './components/ZielgruppeFilter';
import { ZweiLager } from './components/ZweiLager';
import { ReportInhalt } from './components/ReportInhalt';
import { IstSituation } from './components/IstSituation';
import { SechsFehler } from './components/SechsFehler';
import { Wunschbild } from './components/Wunschbild';
import { UmsatzpilotMethode } from './components/UmsatzpilotMethode';
import { RevOps } from './components/RevOps';
import { RevOpsToEngines } from './components/RevOpsToEngines';
import { Roadmap } from './components/Roadmap';
import { Testimonials } from './components/Testimonials';
import { UeberUns } from './components/UeberUns';
import { ConversionCTA } from './components/ConversionCTA';

const DemandGenWorkflows = lazy(() =>
  import('./components/DemandGenWorkflows').then(m => ({ default: m.DemandGenWorkflows }))
);
const RevenueEngineWorkflows = lazy(() =>
  import('./components/RevenueEngineWorkflows').then(m => ({ default: m.RevenueEngineWorkflows }))
);

const Spacer = () => <div style={{ paddingTop: '80px' }} />;

// Section anchor wrapper
const S = ({ id, children }) => (
  <div id={id} style={{ scrollMarginTop: '20px' }}>{children}</div>
);

export default function App() {
  return (
    <div style={{
      background: c.bg,
      minHeight: '100vh',
      position: 'relative',
      fontFamily: "'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <ProgressBar />
      <NavMenu />
      <Particles />
      <div style={{
        position: 'absolute', top: '-300px', left: '50%',
        transform: 'translateX(-50%)', width: '800px', height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)',
        pointerEvents: 'none', maxWidth: '100vw',
      }} />

      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: 'clamp(60px,10vw,100px) clamp(16px,4vw,28px) 80px',
        position: 'relative',
      }}>

        <S id="cover"><Cover /></S>
        <Divider />

        <Spacer />
        <S id="zielgruppe"><ZielgruppeFilter /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="zwei-lager"><ZweiLager /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="report-inhalt"><ReportInhalt /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="ist-situation"><IstSituation /></S>
        <Divider />

        <Spacer />
        <S id="sechs-fehler"><SechsFehler /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="wunschbild"><Wunschbild /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="methode"><UmsatzpilotMethode /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="revops"><RevOps /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="engines"><RevOpsToEngines /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="demand-gen">
          <Suspense fallback={null}>
            <DemandGenWorkflows />
          </Suspense>
        </S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="revenue-engine">
          <Suspense fallback={null}>
            <RevenueEngineWorkflows />
          </Suspense>
        </S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="roadmap"><Roadmap /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="testimonials"><Testimonials /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="ueber-uns"><UeberUns /></S>
        <Spacer />
        <Divider />

        <Spacer />
        <S id="cta"><ConversionCTA /></S>

      </div>
    </div>
  );
}
