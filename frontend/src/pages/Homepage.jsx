import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { AppFeatures, Dashboard, GetStarted, HowItWorks } from "../components/HomePageSections";

export default function HomePage() {
    const darkMode = useSelector(state=> state.mode.darkMode)
    return (
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen`}>
            
            <Navbar />

            <GetStarted />

            <AppFeatures />

            <HowItWorks />

            <Dashboard />
        </div>
    );
}
