import '@fontsource-variable/inter';
import { Particles } from './shared/Particles';
import { Divider } from './shared/Divider';
import { c } from './shared/tokens';
import { Cover } from './components/Cover';
import { ZielgruppeFilter } from './components/ZielgruppeFilter';
import { ZweiLager } from './components/ZweiLager';
import { ReportInhalt } from './components/ReportInhalt';
import { UmsatzpilotMethode } from './components/UmsatzpilotMethode';
import { RevOps } from './components/RevOps';
import { RevOpsToEngines } from './components/RevOpsToEngines';
import { DemandGenWorkflows } from './components/DemandGenWorkflows';
import { RevenueEngineWorkflows } from './components/RevenueEngineWorkflows';
import { Roadmap } from './components/Roadmap';
import { IstSituation } from './components/IstSituation';
import { SechsFehler } from './components/SechsFehler';
import { Wunschbild } from './components/Wunschbild';
import { UeberUns } from './components/UeberUns';
import { ConversionCTA } from './components/ConversionCTA';

const Spacer = () => <div style={{ paddingTop: '80px' }} />;

export default function App() {
  return (
    <div style={{ background: c.bg, minHeight: '100vh', position: 'relative', fontFamily: "'Inter Variable', Inter, -apple-system, BlinkMacSystemFont, sans-serif", overflowX: 'hidden' }}>
      <Particles />
      <div style={{ position: 'absolute', top: '-300px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)', pointerEvents: 'none', maxWidth: '100vw' }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(60px,10vw,100px) clamp(16px,4vw,28px) 80px', position: 'relative' }}>

        <Cover />
        <Divider />

        <Spacer />
        <ZielgruppeFilter />
        <Spacer />
        <Divider />

        <Spacer />
        <ZweiLager />
        <Spacer />
        <Divider />

        <Spacer />
        <ReportInhalt />
        <Spacer />
        <Divider />

        <Spacer />
        <IstSituation />
        <Divider />

        <Spacer />
        <SechsFehler />
        <Spacer />
        <Divider />

        <Spacer />
        <Wunschbild />
        <Spacer />
        <Divider />

        <Spacer />
        <UmsatzpilotMethode />
        <Spacer />
        <Divider />

        <Spacer />
        <RevOps />
        <Spacer />
        <Divider />

        <Spacer />
        <RevOpsToEngines />
        <Spacer />
        <Divider />

        <Spacer />
        <DemandGenWorkflows />
        <Spacer />
        <Divider />

        <Spacer />
        <RevenueEngineWorkflows />
        <Spacer />
        <Divider />

        <Spacer />
        <Roadmap />
        <Spacer />
        <Divider />

        <Spacer />
        <UeberUns />
        <Spacer />
        <Divider />

        <Spacer />
        <ConversionCTA />

      </div>
    </div>
  );
}
