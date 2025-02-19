import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';


import Lehrbetriebe from './pages/Lehrbetriebe/Lehrbetriebe';
import Lehrbetrieb from './pages/Lehrbetriebe/Lehrbetrieb';
import LehrbetriebErstellen from './pages/Lehrbetriebe/LehrbetriebErstellen';
import LehrbetriebAnpassen from './pages/Lehrbetriebe/LehrbetriebAnpassen';

import Dozenten from './pages/Dozenten/Dozenten';
import Dozent from './pages/Dozenten/Dozent';
import DozentErstellen from './pages/Dozenten/DozentErstellen';
import DozentAnpassen from './pages/Dozenten/DozentAnpassen';

import Lernende from './pages/Lernende/Lernende';
import Lernender from './pages/Lernende/Lernender';
import LernenderErstellen from './pages/Lernende/LernenderErstellen';
import LernenderAnpassen from './pages/Lernende/LernenderAnpassen';

import Laender from './pages/Laender/Laender';
import Land from './pages/Laender/Land';
import LandErstellen from './pages/Laender/LandErstellen';
import LandAnpassen from './pages/Laender/LandAnpassen';

import Kurse from './pages/Kurse/Kurse';
import Kurs from './pages/Kurse/Kurs';
import KursErstellen from './pages/Kurse/KursErstellen';
import KursAnpassen from './pages/Kurse/KursAnpassen';

import KurseLernende from './pages/KurseLernende/KurseLernende';
import KursLernender from './pages/KurseLernende/KursLernender';
import KursLernenderErstellen from './pages/KurseLernende/KursLernenderErstellen';
import KursLernenderAnpassen from './pages/KurseLernende/KursLernenderAnpassen';

import LehrbetriebLernende from './pages/LehrbetriebLernende/LehrbetriebLernende';
import LehrbetriebLernender from './pages/LehrbetriebLernende/LehrbetriebLernender';
import LehrbetriebLernenderErstellen from './pages/LehrbetriebLernende/LehrbetriebLernenderErstellen';
import LehrbetriebLernenderAnpassen from './pages/LehrbetriebLernende/LehrbetriebLernenderAnpassen';


function App() {
    return (
        <Router>
            <Routes>
                {/* Layout Component Wrapping Pages */}
                <Route path="/" element={<Layout />}>

                    <Route index element={<Home />} /> {/* Default route */}

                    <Route path="lehrbetriebe" element={<Lehrbetriebe />} />
                    <Route path="lehrbetriebe/:id" element={<Lehrbetrieb />} />
                    <Route path="lehrbetrieb-erstellen" element={<LehrbetriebErstellen />} />
                    <Route path="/lehrbetrieb-anpassen/:id" element={<LehrbetriebAnpassen />} />

                    <Route path="dozenten" element={<Dozenten />} />
                    <Route path="dozenten/:id" element={<Dozent />} />
                    <Route path="dozent-erstellen" element={<DozentErstellen />} />
                    <Route path="dozent-anpassen/:id" element={<DozentAnpassen />} />
                    

                    <Route path="lernende" element={<Lernende />} />
                    <Route path="lernende/:id" element={<Lernender />} />
                    <Route path="lernender-erstellen" element={<LernenderErstellen />} />
                    <Route path="lernender-anpassen/:id" element={<LernenderAnpassen />} />

                    <Route path="laender" element={<Laender />} />
                    <Route path="laender/:id" element={<Land />} />
                    <Route path="land-erstellen" element={<LandErstellen />} />
                    <Route path="land-anpassen/:id" element={<LandAnpassen />} />

                    <Route path="kurse" element={<Kurse />} />
                    <Route path="kurse/:id" element={<Kurs />} />
                    <Route path="kurs-erstellen" element={<KursErstellen />} />
                    <Route path="kurs-anpassen/:id" element={<KursAnpassen />} />

                    <Route path="kurse-lernende" element={<KurseLernende />} />
                    <Route path="kurse-lernende/:id" element={<KursLernender />} />
                    <Route path="kurs-lernender-erstellen" element={<KursLernenderErstellen />} />
                    <Route path="kurs-lernender-anpassen/:id" element={<KursLernenderAnpassen />} />

                    <Route path="lehrbetrieb-lernende" element={<LehrbetriebLernende />} />
                    <Route path="lehrbetrieb-lernende/:id" element={<LehrbetriebLernender />} />
                    <Route path="lehrbetrieb-lernender-erstellen" element={<LehrbetriebLernenderErstellen />} />
                    <Route path="lehrbetrieb-lernender-anpassen/:id" element={<LehrbetriebLernenderAnpassen />} />

                    {/* The 404 Route */}
                    <Route path="*" element={<NotFound />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App;
