const Home = () => {
    return (
        <>
            <h1>Herzlich Willkommen zur Kursverwaltung!</h1>
            <p>Diese Plattform ermöglicht eine einfache und effiziente Verwaltung von Kursen und deren Teilnehmern.</p>
            <p>Hier können Sie Lehrbetriebe, Lernende und Dozenten verwalten, Kurse organisieren und Teilnehmer zuweisen.</p>
            <p>Nutzen Sie die Navigation, um neue Kurse zu erstellen, bestehende Einträge zu bearbeiten oder Informationen zu aktuellen Kursen und Lernenden einzusehen.</p>
            <p>Wir wünschen Ihnen eine angenehme und erfolgreiche Nutzung!</p>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <img 
                    src="/public/kursverwaltung.jpg" 
                    alt="Willkommen" 
                    style={{ width: "100%", maxWidth: "800px", borderRadius: "10px" }} 
                />
            </div>
        </>
    )
}

export default Home
